import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPlanByIdQuery, useUpdatePlanMutation } from "@/redux/features/admin/plan/plan.api";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Switch } from "@/Components/ui/switch";
import { Textarea } from "@/Components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { toast } from "sonner";
import { Trash2, Plus } from "lucide-react";

type ServiceLineItem = {
  name: string;
  description: string;
  unit_price: number;
  quantity: number;
};

type FormState = {
  name: string;
  description: string;
  amount: number;
  interval: string;
  is_active: boolean;
  auto_renewal: boolean;
  discount: number;
  service_line_items: ServiceLineItem[];
};

const UpdatePlanForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: plan, isLoading, isError } = useGetPlanByIdQuery(id);
  const [updatePlan, { isLoading: isUpdating }] = useUpdatePlanMutation();

  const [formData, setFormData] = useState<FormState>({
    name: "",
    description: "",
    amount: 0,
    interval: "month",
    is_active: true,
    auto_renewal: true,
    discount: 0,
    service_line_items: [],
  });

  const [initialData, setInitialData] = useState<FormState | null>(null);

  useEffect(() => {
    if (plan) {
      const initial: FormState = {
        name: plan.name,
        description: plan.description,
        amount: plan.amount,
        interval: plan.interval,
        is_active: plan.is_active,
        auto_renewal: plan.auto_renewal,
        discount: plan.discount,
        service_line_items: plan.service_line_items.map((item: any) => ({
          name: item.name || "",
          description: item.description || "",
          unit_price: item.unit_price || 0,
          quantity: item.quantity || 0,
        })),
      };
      setFormData(initial);
      setInitialData(initial);
    }
  }, [plan]);

  const handleInputChange = (field: keyof Omit<FormState, 'service_line_items'>, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleServiceChange = (index: number, field: keyof ServiceLineItem, value: any) => {
    const updatedServices = [...formData.service_line_items];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    setFormData((prev) => ({ ...prev, service_line_items: updatedServices }));
  };

  const addService = () => {
    setFormData((prev) => ({
      ...prev,
      service_line_items: [
        ...prev.service_line_items,
        { name: "", description: "", unit_price: 0, quantity: 1 },
      ],
    }));
  };

  const removeService = (index: number) => {
    const updatedServices = formData.service_line_items.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, service_line_items: updatedServices }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!initialData) return;

    const changedData: Partial<FormState> = {};
    
    (Object.keys(formData) as Array<keyof FormState>).forEach(key => {
      if (key === 'service_line_items') {
        if (JSON.stringify(formData.service_line_items) !== JSON.stringify(initialData.service_line_items)) {
          changedData.service_line_items = formData.service_line_items;
        }
      } else {
        if (formData[key] !== initialData[key]) {
          changedData[key] = formData[key];
        }
      }
    });

    if (Object.keys(changedData).length === 0) {
      toast.info("No changes to update.");
      return;
    }

    try {
      await toast.promise(updatePlan({ id, ...changedData }).unwrap(), {
        loading: "Updating plan...",
        success: "Plan updated successfully!",
        error: "Failed to update plan.",
      });
      navigate("/subscription");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (isLoading) return <div>Loading plan details...</div>;
  if (isError) return <div>Error loading plan.</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-2xl font-semibold mb-6">Update Plan</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded-lg p-6 mb-6">
          <h2 className="text-base font-semibold mb-4">Basic Plan Information</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Plan Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>
        </div>
        <div className="border rounded-lg p-6 mb-6">
          <h2 className="text-base font-semibold mb-4">Pricing & Duration</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="interval">Interval</Label>
              <Select
                value={formData.interval}
                onValueChange={(value) => handleInputChange("interval", value)}
              >
                <SelectTrigger id="interval">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Monthly</SelectItem>
                  <SelectItem value="year">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => handleInputChange("amount", Number(e.target.value))}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="discount">Discount (%)</Label>
              <Input
                id="discount"
                type="number"
                value={formData.discount}
                onChange={(e) => handleInputChange("discount", Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Auto-renewal</Label>
              <Switch
                checked={formData.auto_renewal}
                onCheckedChange={(checked) => handleInputChange("auto_renewal", checked)}
              />
            </div>
          </div>
           <div className="space-y-2 mt-4">
              <Label>Active</Label>
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) => handleInputChange("is_active", checked)}
              />
            </div>
        </div>
      </div>
      
      {/* Services Included */}
      <div className="border rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold">Service Line Items</h2>
          <Button onClick={addService} size="sm" type="button">
            <Plus size={16} className="mr-1" />
            Add Service
          </Button>
        </div>
        <div className="overflow-x-auto">
          {formData.service_line_items.length === 0 ? (
            <p className="text-center text-sm text-gray-500">
              No services added. Click "Add Service" to include services.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2 font-medium text-gray-700">Service Name</th>
                  <th className="text-left py-2 px-2 font-medium text-gray-700">Description</th>
                  <th className="text-left py-2 px-2 font-medium text-gray-700">Unit Price</th>
                  <th className="text-left py-2 px-2 font-medium text-gray-700">Quantity</th>
                  <th className="text-left py-2 px-2 font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.service_line_items.map((service, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-2">
                      <Input
                        placeholder="Name"
                        value={service.name}
                        onChange={(e) => handleServiceChange(index, "name", e.target.value)}
                      />
                    </td>
                    <td className="py-2 px-2">
                      <Input
                        placeholder="Optional description"
                        value={service.description}
                        onChange={(e) => handleServiceChange(index, "description", e.target.value)}
                      />
                    </td>
                    <td className="py-2 px-2">
                      <Input
                        type="number"
                        step="0.01"
                        value={service.unit_price}
                        onChange={(e) => handleServiceChange(index, "unit_price", parseFloat(e.target.value) || 0)}
                      />
                    </td>
                    <td className="py-2 px-2">
                      <Input
                        type="number"
                        value={service.quantity}
                        onChange={(e) => handleServiceChange(index, "quantity", parseInt(e.target.value) || 0)}
                      />
                    </td>
                    <td className="py-2 px-2">
                      <button
                        type="button"
                        onClick={() => removeService(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => navigate("/subscription")}>
          Cancel
        </Button>
        <Button type="submit" disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Update Plan"}
        </Button>
      </div>
    </form>
  );
};

export default UpdatePlanForm;

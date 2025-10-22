// src/pages/add-new-plan.tsx
import React, { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";
import { Switch } from "@/Components/ui/switch";
import { Textarea } from "@/Components/ui/textarea";
import { useCreateAdminNewPlanMutation } from "@/redux/features/admin/subscription/subscription.api";
import { toast } from "sonner";

type ServiceRow = {
  id: number; // local row id
  serviceId?: number; // <-- backend PK for the service
  name: string;
  description: string;
  unitPrice: number;
  quantity: number;
  total: number;
};

const AddNewPlanForm = () => {
  const [autoRenewal, setAutoRenewal] = useState(true);

  const [services, setServices] = useState<ServiceRow[]>([
    {
      id: 1,
      serviceId: undefined,
      name: "Deep Cleaning",
      description: "",
      unitPrice: 150.0,
      quantity: 1,
      total: 150.0,
    },
    {
      id: 2,
      serviceId: undefined,
      name: "Carpet Cleaning",
      description: "",
      unitPrice: 75.0,
      quantity: 2,
      total: 150.0,
    },
  ]);

  const [formData, setFormData] = useState({
    planName: "",
    planCode: "", // required by backend as plan_code
    description: "",
    categoryId: "", // must be numeric PK string -> we'll cast to number
    billingCycle: "Monthly", // if your backend requires it elsewhere
    price: "0.00", // UI price; backend wants "amount"
    discount: "0",
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const [createAdminNewPlan, { isLoading: creating }] =
    useCreateAdminNewPlanMutation();

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addService = () => {
    setServices((s) => [
      ...s,
      {
        id: Date.now(),
        serviceId: undefined,
        name: "",
        description: "",
        unitPrice: 0,
        quantity: 1,
        total: 0,
      },
    ]);
  };

  const removeService = (id: number) => {
    setServices((s) => s.filter((row) => row.id !== id));
  };

  const updateService = (id: number, field: keyof ServiceRow, value: any) => {
    setServices((rows) =>
      rows.map((s) => {
        if (s.id === id) {
          const updated: ServiceRow = { ...s, [field]: value };
          if (field === "unitPrice" || field === "quantity") {
            const unit = Number(updated.unitPrice) || 0;
            const qty = Number(updated.quantity) || 0;
            updated.total = unit * qty;
          }
          return updated;
        }
        return s;
      })
    );
  };

  const resetForm = () => {
    setFormData({
      planName: "",
      planCode: "",
      description: "",
      categoryId: "",
      billingCycle: "Monthly",
      price: "0.00",
      discount: "0",
    });
    setServices([
      {
        id: 1,
        serviceId: undefined,
        name: "Deep Cleaning",
        description: "",
        unitPrice: 150.0,
        quantity: 1,
        total: 150.0,
      },
      {
        id: 2,
        serviceId: undefined,
        name: "Carpet Cleaning",
        description: "",
        unitPrice: 75.0,
        quantity: 2,
        total: 150.0,
      },
    ]);
    setAutoRenewal(true);
    setFormError(null);
    setFormSuccess(null);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    const name = formData.planName.trim();
    const plan_code = formData.planCode.trim();
    const amountNum = Number(formData.price);
    const categoryPK = Number(formData.categoryId || NaN);

    if (!name) return setFormError("Plan name is required.");
    if (!plan_code) return setFormError("Plan code is required.");
    if (!Number.isFinite(amountNum) || amountNum <= 0) {
      return setFormError("Amount must be a positive number.");
    }
    if (!Number.isInteger(categoryPK)) {
      return setFormError("Please select a valid Category (ID).");
    }

    // service_line_items must exist and each item should carry a service PK
    const items = services.map((s) => ({
      service: Number(s.serviceId), // <-- REQUIRED PK
      quantity: Number(s.quantity) || 0,
      unit_price: Number(s.unitPrice) || 0,
      description: s.description || "",
    }));

    // validate service PKs present
    const missingPk = items.some((i) => !Number.isInteger(i.service));
    if (missingPk) {
      return setFormError(
        "Each service line must include a valid Service ID (PK)."
      );
    }

    // Build exactly what the backend asked for
    const payload = {
      name, // if backend needs it
      plan_code, // ✅ required
      amount: amountNum, // ✅ required
      category: categoryPK, // ✅ PK required
      auto_renewal: autoRenewal, // if used on backend
      description: formData.description || undefined,
      discount: Number(formData.discount || 0),
      billing_cycle: formData.billingCycle, // include if backend uses it
      service_line_items: items, // ✅ required
    };

    toast.promise(createAdminNewPlan(payload).unwrap(), {
      success: "Plan created successfully.",
      error: "Failed to create plan",
    });
    resetForm();
  };

  return (
    <form onSubmit={onSubmit}>
      <h1 className="text-2xl font-semibold mb-6">Add New Plan</h1>

      {/* Basic Plan Information */}
      <div className="border rounded-lg p-6 mb-6">
        <h2 className="text-base font-semibold mb-4">Basic Plan Information</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="planName" className="text-sm">
              Plan Name
            </Label>
            <Input
              id="planName"
              placeholder="e.g. Standard Cleaning Package"
              value={formData.planName}
              onChange={(e) => handleInputChange("planName", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="planCode" className="text-sm">
              Plan Code
            </Label>
            <Input
              id="planCode"
              placeholder="PLAN-001"
              value={formData.planCode}
              onChange={(e) => handleInputChange("planCode", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <Label htmlFor="description" className="text-sm">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Short details about the plan..."
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        {/* Category expects a PK (number). Put your real IDs here. */}
        <div className="space-y-2">
          <Label htmlFor="categoryId" className="text-sm">
            Category (ID)
          </Label>
          <Select
            value={formData.categoryId}
            onValueChange={(value) => handleInputChange("categoryId", value)}
          >
            <SelectTrigger id="categoryId">
              <SelectValue placeholder="Select category ID..." />
            </SelectTrigger>
            <SelectContent>
              {/* 👇 Replace these with real category IDs from your backend */}
              <SelectItem value="1">1 — Cleaning</SelectItem>
              <SelectItem value="2">2 — Maintenance</SelectItem>
              <SelectItem value="3">3 — Security</SelectItem>
              <SelectItem value="4">4 — Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Pricing & Duration */}
      <div className="border rounded-lg p-6 mb-6">
        <h2 className="text-base font-semibold mb-4">Pricing &amp; Duration</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="billingCycle" className="text-sm">
              Billing Cycle
            </Label>
            <Select
              value={formData.billingCycle}
              onValueChange={(value) =>
                handleInputChange("billingCycle", value)
              }
            >
              <SelectTrigger id="billingCycle">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Monthly">Monthly</SelectItem>
                <SelectItem value="Yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price" className="text-sm">
              Amount (SAR)
            </Label>
            <div className="flex items-center gap-2">
              <div className="w-24 grid place-items-center border rounded-md h-10 text-sm">
                SAR
              </div>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                className="flex-1"
                min="0"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 items-end">
          <div className="space-y-2">
            <Label htmlFor="discount" className="text-sm">
              Discount (%)
            </Label>
            <Input
              id="discount"
              type="number"
              placeholder="0"
              value={formData.discount}
              onChange={(e) => handleInputChange("discount", e.target.value)}
              min="0"
              max="100"
            />
          </div>

          <div className="grid grid-cols-1 gap-2 items-center">
            <Label className="text-sm">Auto-renewal</Label>
            <div className="flex items-center w-fit gap-2">
              <Switch
                id="autoRenewal"
                checked={autoRenewal}
                onCheckedChange={setAutoRenewal}
              />
              <span className="text-sm text-gray-600">
                {autoRenewal ? "ON" : "OFF"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Services Included */}
      <div className="border rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold">Services Included</h2>
          <Button onClick={addService} size="sm" type="button">
            <Plus size={16} className="mr-1" />
            Add Service
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-2 font-medium text-gray-700">
                  Service ID (PK)
                </th>
                <th className="text-left py-2 px-2 font-medium text-gray-700">
                  Service Name
                </th>
                <th className="text-left py-2 px-2 font-medium text-gray-700">
                  Description
                </th>
                <th className="text-left py-2 px-2 font-medium text-gray-700">
                  Unit Price (SAR)
                </th>
                <th className="text-left py-2 px-2 font-medium text-gray-700">
                  Quantity
                </th>
                <th className="text-left py-2 px-2 font-medium text-gray-700">
                  Line Total (SAR)
                </th>
                <th className="text-left py-2 px-2 font-medium text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="border-b">
                  <td className="py-2 px-2">
                    <Input
                      type="number"
                      placeholder="e.g. 12"
                      value={service.serviceId ?? ""}
                      onChange={(e) =>
                        updateService(
                          service.id,
                          "serviceId",
                          e.target.value ? Number(e.target.value) : undefined
                        )
                      }
                      className="w-28"
                      min="1"
                      required
                    />
                  </td>
                  <td className="py-2 px-2">
                    <Input
                      placeholder="e.g. Deep Cleaning"
                      value={service.name}
                      onChange={(e) =>
                        updateService(service.id, "name", e.target.value)
                      }
                      className="w-48"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <Input
                      placeholder="Optional description"
                      value={service.description}
                      onChange={(e) =>
                        updateService(service.id, "description", e.target.value)
                      }
                      className="w-56"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={service.unitPrice}
                      onChange={(e) =>
                        updateService(
                          service.id,
                          "unitPrice",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-28"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <Input
                      type="number"
                      min="0"
                      value={service.quantity}
                      onChange={(e) =>
                        updateService(
                          service.id,
                          "quantity",
                          parseInt(e.target.value, 10) || 0
                        )
                      }
                      className="w-20"
                    />
                  </td>
                  <td className="py-2 px-2 font-medium">
                    SAR {(service.unitPrice * service.quantity || 0).toFixed(2)}
                  </td>
                  <td className="py-2 px-2">
                    <button
                      onClick={() => removeService(service.id)}
                      className="text-red-500 hover:text-red-700"
                      type="button"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Feedback */}
      {formError && <p className="text-red-600 text-sm mb-3">{formError}</p>}
      {formSuccess && (
        <p className="text-green-600 text-sm mb-3">{formSuccess}</p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div />
        <div className="flex gap-2">
          <Button variant="outline" type="button" disabled={creating}>
            Save Draft
          </Button>
          <Button type="submit" disabled={creating}>
            {creating ? "Creating…" : "Create Plan"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddNewPlanForm;

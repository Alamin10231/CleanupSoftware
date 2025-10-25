import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { Checkbox } from "@/Components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import MultipleSelector from "@/Components/ui/multiselect";
import { useGetregionsQuery } from "@/redux/features/admin/regions/regions.api";
import {
  useGetBuildingsByRegionQuery,
  useGetBuildingByIdQuery,
} from "@/redux/features/admin/buildings/building.api";
import { useGetAllClientsAdminQuery } from "@/redux/features/admin/users/clients.api";
import { useGetPlansQuery } from "@/redux/features/admin/plan/plan.api";
import { useGetAllServiceDataAdminQuery } from "@/redux/features/admin/services/services.api";
import { useAddInvoiceMutation } from "@/redux/features/admin/invoice/invoice.api";
import { toast } from "sonner";

const CreateInvoiceForm = () => {
  const [formData, setFormData] = useState<any>({
    invoice_id: "",
    type: "outgoing",
    date_issued: "",
    due_date: "",
    client: null,
    building: null,
    apartments: [],
    plan: null,
    note: "",
    status: "unpaid",
    line_items: [],
  });

  const [addInvoice, { isLoading: isAddingInvoice }] = useAddInvoiceMutation();

  const { data: regionsData } = useGetregionsQuery(undefined);
  const { data: buildingsData } = useGetBuildingsByRegionQuery(
    formData.region,
    { skip: !formData.region }
  );
  const { data: apartmentData } = useGetBuildingByIdQuery(formData.building, {
    skip: !formData.building,
  });
  const { data: clientsData } = useGetAllClientsAdminQuery(undefined);
  const { data: plansData } = useGetPlansQuery(undefined);
  const { data: servicesData } = useGetAllServiceDataAdminQuery(undefined);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleLineItemChange = (index: number, field: string, value: any) => {
    const updatedLineItems = [...formData.line_items];
    updatedLineItems[index] = { ...updatedLineItems[index], [field]: value };
    handleInputChange("line_items", updatedLineItems);
  };

  const addLineItem = () => {
    handleInputChange("line_items", [
      ...formData.line_items,
      {
        description: "",
        service: null,
        quantity: 1,
        unit_price: 0,
        discount: 0,
        tax: 0,
      },
    ]);
  };

  const removeLineItem = (index: number) => {
    const updatedLineItems = formData.line_items.filter(
      (_: any, i: number) => i !== index
    );
    handleInputChange("line_items", updatedLineItems);
  };

  const handleSave = async () => {
    const { region, ...rest } = formData;
    const payload = {
      ...rest,
      date_issued: new Date(formData.date_issued).toLocaleDateString("en-US"),
      due_date: new Date(formData.due_date).toLocaleDateString("en-US"),
      apartments: formData.apartments.map((apt: any) => apt.value),
    };
    console.log(payload);
    try {
      await toast.promise(addInvoice(payload).unwrap(), {
        loading: "Creating invoice...",
        success: "Invoice created successfully!",
        error: "Failed to create invoice.",
      });
    } catch (error) {
      console.error("Invoice creation failed:", error);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}
    >
      <h1 className="text-2xl font-semibold mb-6">Create Invoice</h1>

      {/* Invoice Information */}
      <div className="bg-white rounded-lg border p-6 mb-4">
        <h2 className="text-base font-semibold mb-4">Invoice Information</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="invoice_id">Invoice ID</Label>
            <Input
              id="invoice_id"
              value={formData.invoice_id}
              onChange={(e) => handleInputChange("invoice_id", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select
              onValueChange={(value) => handleInputChange("type", value)}
              value={formData.type}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="outgoing">Outgoing</SelectItem>
                <SelectItem value="incoming">Incoming</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="date_issued">Date Issued</Label>
            <Input
              id="date_issued"
              type="date"
              value={formData.date_issued}
              onChange={(e) => handleInputChange("date_issued", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="due_date">Due Date</Label>
            <Input
              id="due_date"
              type="date"
              value={formData.due_date}
              onChange={(e) => handleInputChange("due_date", e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label>Client</Label>
            <Select
              onValueChange={(value) =>
                handleInputChange("client", Number(value))
              }
              value={formData.client}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Client" />
              </SelectTrigger>
              <SelectContent>
                {clientsData?.results?.map((client: any) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Plan</Label>
            <Select
              onValueChange={(value) =>
                handleInputChange("plan", Number(value))
              }
              value={formData.plan}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Plan" />
              </SelectTrigger>
              <SelectContent>
                {plansData?.results?.map((plan: any) => (
                  <SelectItem key={plan.id} value={plan.id}>
                    {plan.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Region</Label>
            <Select
              onValueChange={(value) => handleInputChange("region", value)}
              value={formData.region}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Region" />
              </SelectTrigger>
              <SelectContent>
                {regionsData?.results?.map((region: any) => (
                  <SelectItem key={region.id} value={region.id.toString()}>
                    {region.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Building</Label>
            <Select
              onValueChange={(value) =>
                handleInputChange("building", Number(value))
              }
              value={formData.building?.toString()}
              disabled={!formData.region}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Building" />
              </SelectTrigger>
              <SelectContent>
                {
                buildingsData?.length > 0 ?
                buildingsData?.map((building: any) => (
                  <SelectItem key={building.id} value={building.id.toString()}>
                    {building.name}
                  </SelectItem>
                )) : <SelectItem value="none" disabled> No buildings available </SelectItem>}
              </SelectContent>{" "}
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Apartments</Label>
            <MultipleSelector
              value={formData.apartments}
              onChange={(value) => handleInputChange("apartments", value)}
              options={
                apartmentData?.apartments?.map((apt: any) => ({
                  value: apt.id,
                  label: apt.apartment_number,
                })) || []
              }
              placeholder="Select Apartments"
              disabled={!formData.building}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-4">
          <Checkbox
            checked={formData.status === "paid"}
            onCheckedChange={(checked) =>
              handleInputChange("status", checked ? "paid" : "unpaid")
            }
          />
          <Label>Paid</Label>
        </div>
      </div>

      {/* Services & Items */}
      <div className="bg-white rounded-lg border p-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold">Services & Items</h2>
          <Button type="button" onClick={addLineItem} size="sm">
            Add New Row
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th>Description</th>
                <th>Service</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Discount %</th>
                <th>Tax %</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {formData.line_items.map((item: any, index: number) => (
                <tr key={index} className="border-b">
                  <td>
                    <Input
                      value={item.description}
                      onChange={(e) =>
                        handleLineItemChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <Select
                      onValueChange={(value) =>
                        handleLineItemChange(index, "service", value)
                      }
                      value={item.service}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Service" />
                      </SelectTrigger>
                      <SelectContent>
                        {servicesData?.map((service: any) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleLineItemChange(index, "quantity", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Input
                      type="number"
                      value={item.unit_price}
                      onChange={(e) =>
                        handleLineItemChange(
                          index,
                          "unit_price",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <Input
                      type="number"
                      value={item.discount}
                      onChange={(e) =>
                        handleLineItemChange(index, "discount", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Input
                      type="number"
                      value={item.tax}
                      onChange={(e) =>
                        handleLineItemChange(index, "tax", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeLineItem(index)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notes & Attachments */}
      <div className="bg-white rounded-lg border p-6 mb-4">
        <h2 className="text-base font-semibold mb-4">Notes & Attachments</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="note">Invoice Notes</Label>
            <Textarea
              id="note"
              value={formData.note}
              onChange={(e) => handleInputChange("note", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={isAddingInvoice}>
          {isAddingInvoice ? "Creating..." : "Create Invoice"}
        </Button>
      </div>
    </form>
  );
};

export default CreateInvoiceForm;

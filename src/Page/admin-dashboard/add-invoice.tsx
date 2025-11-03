import { useState, useCallback } from "react";
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

// Types
type InvoiceType = "outgoing";
type InvoiceStatus = "paid" | "unpaid";

interface ApartmentOption {
  value: number;
  label: string;
}

interface LineItem {
  description: string;
  service: number | null;
  quantity: number;
  unit_price: number;
  discount: number;
  tax: number;
}

interface InvoiceFormData {
  invoice_id: string;
  type: InvoiceType;
  date_issued: string;
  due_date: string;
  client: number | null;
  building: number | null;
  apartments: ApartmentOption[];
  plan: number | null;
  note: string;
  status: InvoiceStatus;
  line_items: LineItem[];
  region?: string;
}

// Constants
const INITIAL_FORM_DATA: InvoiceFormData = {
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
};

const INITIAL_LINE_ITEM: LineItem = {
  description: "",
  service: null,
  quantity: 1,
  unit_price: 0,
  discount: 0,
  tax: 0,
};

const INVOICE_TYPES: { value: InvoiceType; label: string }[] = [
  { value: "outgoing", label: "Outgoing" },
];

// Utility Functions
const formatDateForAPI = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US");
};

// Components
interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

function FormSection({ title, children }: FormSectionProps) {
  return (
    <div className="bg-white rounded-lg border p-6 mb-4">
      <h2 className="text-base font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
}

function FormField({ label, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

interface LineItemRowProps {
  item: LineItem;
  index: number;
  services: any[];
  onChange: (index: number, field: keyof LineItem, value: any) => void;
  onRemove: (index: number) => void;
}

function LineItemRow({
  item,
  index,
  services,
  onChange,
  onRemove,
}: LineItemRowProps) {
  return (
    <tr className="border-b grid grid-cols-2 md:grid-cols-7 gap-2">
      <td className="p-2">
        <Input
          value={item.description}
          onChange={(e) => onChange(index, "description", e.target.value)}
          placeholder="Item description"
        />
      </td>
      <td className="p-2">
        <Select
          onValueChange={(value) => onChange(index, "service", Number(value))}
          value={item.service?.toString()}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Service" />
          </SelectTrigger>
                        <SelectContent>
            {Array.isArray(services) && services.length > 0 ? (
              services.map((service) => (
                <SelectItem key={service.id} value={service.id.toString()}>
                  {service.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="none" disabled>
                No services available
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </td>
      <td className="p-2">
        <Input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => onChange(index, "quantity", Number(e.target.value))}
        />
      </td>
      <td className="p-2">
        <Input
          type="number"
          min="0"
          step="0.01"
          value={item.unit_price}
          onChange={(e) =>
            onChange(index, "unit_price", Number(e.target.value))
          }
        />
      </td>
      <td className="p-2">
        <Input
          type="number"
          min="0"
          max="100"
          value={item.discount}
          onChange={(e) => onChange(index, "discount", Number(e.target.value))}
        />
      </td>
      <td className="p-2">
        <Input
          type="number"
          min="0"
          max="100"
          value={item.tax}
          onChange={(e) => onChange(index, "tax", Number(e.target.value))}
        />
      </td>
      <td className="p-2">
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={() => onRemove(index)}
        >
          <Trash2 size={16} />
        </Button>
      </td>
    </tr>
  );
}

// Main Component
export default function CreateInvoiceForm() {
  const [formData, setFormData] = useState<InvoiceFormData>(INITIAL_FORM_DATA);

  // API Hooks
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

  // Handlers
  const handleInputChange = useCallback(
    (field: keyof InvoiceFormData, value: any) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleLineItemChange = useCallback(
    (index: number, field: keyof LineItem, value: any) => {
      setFormData((prev) => {
        const updatedLineItems = [...prev.line_items];
        updatedLineItems[index] = { ...updatedLineItems[index], [field]: value };
        return { ...prev, line_items: updatedLineItems };
      });
    },
    []
  );

  const addLineItem = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      line_items: [...prev.line_items, { ...INITIAL_LINE_ITEM }],
    }));
  }, []);

  const removeLineItem = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      line_items: prev.line_items.filter((_, i) => i !== index),
    }));
  }, []);

  const handleSave = useCallback(async () => {
    // Validation
    if (!formData.invoice_id.trim()) {
      toast.error("Invoice ID is required");
      return;
    }
    if (!formData.date_issued) {
      toast.error("Date issued is required");
      return;
    }
    if (!formData.due_date) {
      toast.error("Due date is required");
      return;
    }
    if (!formData.client) {
      toast.error("Client is required");
      return;
    }

    const { region, ...rest } = formData;
    const payload = {
      ...rest,
      date_issued: formatDateForAPI(formData.date_issued),
      due_date: formatDateForAPI(formData.due_date),
      apartments: formData.apartments.map((apt) => apt.value),
    };

    try {
      await toast.promise(addInvoice(payload).unwrap(), {
        loading: "Creating invoice...",
        success: "Invoice created successfully!",
        error: "Failed to create invoice.",
      });
      // Reset form on success
      setFormData(INITIAL_FORM_DATA);
    } catch (error) {
      console.error("Invoice creation failed:", error);
    }
  }, [formData, addInvoice]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      handleSave();
    },
    [handleSave]
  );

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-2xl font-semibold mb-6">Create Invoice</h1>

      {/* Invoice Information */}
      <FormSection title="Invoice Information">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <FormField label="Invoice ID">
            <Input
              id="invoice_id"
              value={formData.invoice_id}
              onChange={(e) => handleInputChange("invoice_id", e.target.value)}
              placeholder="Enter invoice ID"
              required
            />
          </FormField>

          <FormField label="Type">
            <Select
              onValueChange={(value) =>
                handleInputChange("type", value as InvoiceType)
              }
              disabled={true}
              value={formData.type}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                {INVOICE_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <FormField label="Date Issued">
            <Input
              id="date_issued"
              type="date"
              value={formData.date_issued}
              onChange={(e) => handleInputChange("date_issued", e.target.value)}
              required
            />
          </FormField>

          <FormField label="Due Date">
            <Input
              id="due_date"
              type="date"
              value={formData.due_date}
              onChange={(e) => handleInputChange("due_date", e.target.value)}
              min={formData.date_issued}
              required
            />
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <FormField label="Client">
            <Select
              onValueChange={(value) =>
                handleInputChange("client", Number(value))
              }
              value={formData.client?.toString()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Client" />
              </SelectTrigger>
              <SelectContent>
                {clientsData?.results?.map((client) => (
                  <SelectItem key={client.id} value={client.id.toString()}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Plan">
            <Select
              onValueChange={(value) =>
                handleInputChange("plan", Number(value))
              }
              value={formData.plan?.toString()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Plan" />
              </SelectTrigger>
              <SelectContent>
                {plansData?.results?.map((plan) => (
                  <SelectItem key={plan.id} value={plan.id.toString()}>
                    {plan.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <FormField label="Region">
            <Select
              onValueChange={(value) => {
                handleInputChange("region", value);
                // Reset building and apartments when region changes
                handleInputChange("building", null);
                handleInputChange("apartments", []);
              }}
              value={formData.region}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Region" />
              </SelectTrigger>
              <SelectContent>
                {regionsData?.results?.map((region) => (
                  <SelectItem key={region.id} value={region.id.toString()}>
                    {region.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Building">
            <Select
              onValueChange={(value) => {
                handleInputChange("building", Number(value));
                // Reset apartments when building changes
                handleInputChange("apartments", []);
              }}
              value={formData.building?.toString()}
              disabled={!formData.region}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Building" />
              </SelectTrigger>
              <SelectContent>
                {buildingsData?.length > 0 ? (
                  buildingsData.map((building) => (
                    <SelectItem key={building.id} value={building.id.toString()}>
                      {building.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="none" disabled>
                    No buildings available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Apartments">
            <MultipleSelector
              value={formData.apartments}
              onChange={(value) => handleInputChange("apartments", value)}
              options={
                apartmentData?.apartments?.map((apt) => ({
                  value: apt.id,
                  label: apt.apartment_number,
                })) || []
              }
              placeholder="Select Apartments"
              disabled={!formData.building}
              emptyIndicator="No apartments available"
            />
          </FormField>
        </div>

        {/* <div className="flex items-center space-x-2">
          <Checkbox
            id="status"
            checked={formData.status === "paid"}
            onCheckedChange={(checked) =>
              handleInputChange("status", checked ? "paid" : "unpaid")
            }
          />
          <Label htmlFor="status">Paid</Label>
        </div> */}
      </FormSection>

      {/* Services & Items */}
      <FormSection title="Services & Items">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">
            Add line items for services and products
          </p>
          <Button type="button" onClick={addLineItem} size="sm">
            Add New Row
          </Button>
        </div>

        {formData.line_items.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b grid grid-cols-2 md:grid-cols-7 gap-2bg-gray-50">
                  <th className="p-2 text-left">Description</th>
                  <th className="p-2 text-left">Service</th>
                  <th className="p-2 text-left">Quantity</th>
                  <th className="p-2 text-left">Unit Price</th>
                  <th className="p-2 text-left">Discount %</th>
                  <th className="p-2 text-left">Tax %</th>
                  <th className="p-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.line_items.map((item, index) => (
                  <LineItemRow
                    key={index}
                    item={item}
                    index={index}
                    services={servicesData || []}
                    onChange={handleLineItemChange}
                    onRemove={removeLineItem}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No line items added. Click "Add New Row" to get started.
          </div>
        )}
      </FormSection>

      {/* Notes & Attachments */}
      <FormSection title="Notes & Attachments">
        <FormField label="Invoice Notes">
          <Textarea
            id="note"
            value={formData.note}
            onChange={(e) => handleInputChange("note", e.target.value)}
            placeholder="Add any additional notes or comments..."
            rows={4}
          />
        </FormField>
      </FormSection>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => setFormData(INITIAL_FORM_DATA)}
          disabled={isAddingInvoice}
        >
          Reset
        </Button>
        <Button type="submit" disabled={isAddingInvoice}>
          {isAddingInvoice ? "Creating..." : "Create Invoice"}
        </Button>
      </div>
    </form>
  );
}

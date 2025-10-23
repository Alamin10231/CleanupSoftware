import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Calendar, Upload, Trash2 } from "lucide-react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { Checkbox } from "@/Components/ui/checkbox";

const CreateInvoiceForm = () => {
  
  
  const { register, control, handleSubmit, watch } = useForm({
    defaultValues: {
      invoice_id: "INV-2025-002",
      type: "outgoing",
      date_issued: "2025-09-30",
      due_date: "2025-10-15",
      client: 1,
      building: 2,
      apartments: [1],
      plan: 1,
      vendor: 1,
      vendor_invoice_file: null,
      note: "Monthly service invoice",
      file: null,
      paid: true,
      line_items: [
        {
          description: "Laundry Service",
          quantity: 2,
          unit_price: 100,
          discount: 10,
          tax: 5,
        },
        {
          description: "House Cleaning",
          service: 2,
          quantity: 1,
          unit_price: 200,
          discount: 0,
        },
      ],
    },
  });
//   const [addInvoice, { isLoading, isError }] = useAdd
  const { fields, append, remove } = useFieldArray({
    control,
    name: "line_items",
  });

  const onSubmit = (data: any) => {
    console.log(data);
   //  addInvoice(data)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl font-semibold mb-6">Create Invoice</h1>

      {/* Invoice Information */}
      <div className="bg-white rounded-lg border p-6 mb-4">
        <h2 className="text-base font-semibold mb-4">Invoice Information</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="invoice_id" className="text-sm">
              Invoice ID
            </Label>
            <Input id="invoice_id" {...register("invoice_id")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date_issued" className="text-sm">
              Date Issued
            </Label>
            <div className="relative">
              <Input
                id="date_issued"
                type="date"
                {...register("date_issued")}
                className="pr-10"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="due_date" className="text-sm">
              Due Date
            </Label>
            <div className="relative">
              <Input
                id="due_date"
                type="date"
                {...register("due_date")}
                className="pr-10"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="client" className="text-sm">
              Client
            </Label>
            <select
              id="client"
              {...register("client")}
              className="w-full px-3 py-2 border rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Client</option>
              <option value="1">John Smith</option>
              <option value="2">Jane Doe</option>
              <option value="3">Acme Corporation</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="building" className="text-sm">
              Region/Building
            </Label>
            <select
              id="building"
              {...register("building")}
              className="w-full px-3 py-2 border rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Building</option>
              <option value="1">Building A - Downtown</option>
              <option value="2">Building B - Uptown</option>
              <option value="3">Building C - Suburbs</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="apartments" className="text-sm">
              Apartment
            </Label>
            <select
              id="apartments"
              {...register("apartments")}
              className="w-full px-3 py-2 border rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Apartment</option>
              <option value="1">Apartment 101</option>
              <option value="2">Apartment 102</option>
              <option value="3">Apartment 201</option>
            </select>
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-4">
          <Controller
            name="paid"
            control={control}
            render={({ field }) => <Checkbox {...field} />}
          />
          <Label htmlFor="paid">Paid</Label>
        </div>
      </div>

      {/* Services & Items */}
      <div className="bg-white rounded-lg border p-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold">Services & Items</h2>
          <Button
            type="button"
            onClick={() =>
              append({
                description: "",
                quantity: 1,
                unit_price: 0,
                discount: 0,
                tax: 0,
              })
            }
            size="sm"
          >
            Add New Row
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-2 font-medium text-gray-700">
                  Description
                </th>
                <th className="text-left py-2 px-2 font-medium text-gray-700">
                  Quantity
                </th>
                <th className="text-left py-2 px-2 font-medium text-gray-700">
                  Unit Price
                </th>
                <th className="text-left py-2 px-2 font-medium text-gray-700">
                  Discount %
                </th>
                <th className="text-left py-2 px-2 font-medium text-gray-700">
                  Tax %
                </th>
                <th className="text-left py-2 px-2 font-medium text-gray-700">
                  Line Total
                </th>
                <th className="text-left py-2 px-2 font-medium text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {fields.map((item, index) => {
                const quantity = watch(`line_items.${index}.quantity`);
                const unit_price = watch(`line_items.${index}.unit_price`);
                const discount = watch(`line_items.${index}.discount`);
                const tax = watch(`line_items.${index}.tax`);
                const lineTotal =
                  quantity *
                  unit_price *
                  (1 - discount / 100) *
                  (1 + tax / 100);

                return (
                  <tr key={item.id} className="border-b">
                    <td className="py-2 px-2">
                      <Input {...register(`line_items.${index}.description`)} />
                    </td>
                    <td className="py-2 px-2">
                      <Input
                        type="number"
                        {...register(`line_items.${index}.quantity`)}
                      />
                    </td>
                    <td className="py-2 px-2">
                      <Input
                        type="number"
                        {...register(`line_items.${index}.unit_price`)}
                      />
                    </td>
                    <td className="py-2 px-2">
                      <Input
                        type="number"
                        {...register(`line_items.${index}.discount`)}
                      />
                    </td>
                    <td className="py-2 px-2">
                      <Input
                        type="number"
                        {...register(`line_items.${index}.tax`)}
                      />
                    </td>
                    <td className="py-2 px-2 font-medium">
                      ${lineTotal.toFixed(2)}
                    </td>
                    <td className="py-2 px-2">
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notes & Attachments */}
      <div className="bg-white rounded-lg border p-6 mb-4">
        <h2 className="text-base font-semibold mb-4">Notes & Attachments</h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="note" className="text-sm">
              Invoice Notes
            </Label>
            <Textarea
              id="note"
              {...register("note")}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm">File Upload</Label>
            <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-gray-50 transition">
              <input
                id="file"
                type="file"
                {...register("file")}
                className="hidden"
              />
              <Upload className="mx-auto text-gray-400 mb-2" size={32} />
              <p className="text-sm text-gray-600 mb-1">
                Drag and drop files here or{" "}
                <button
                  type="button"
                  onClick={() => document.getElementById("file").click()}
                  className="text-blue-600 hover:underline"
                >
                  browse
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit" variant="outline">
          Save Draft
        </Button>
        <Button type="submit">Generate Invoice</Button>
      </div>
    </form>
  );
};

export default CreateInvoiceForm;

import React, { useState } from "react";
import { Upload, Edit2 } from "lucide-react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Checkbox } from "@/Components/ui/checkbox";
import { Button } from "@/Components/ui/button";
import { useGetServiceCategoriesQuery } from "@/redux/features/admin/services/services.api";

const AddNewServiceForm = () => {
  interface FormState {
    name: string;
    service_code: string;
    description: string;
    category: number | null;
    base_price: number;
    bill_cycle: string;
    discount: number | null;
    tax_rate: number | null;
    auto_renew_enable: boolean;
    building: number | null;
    apartment: number[];
    region: number | null;
    worker: number | null;
    service_icon: File | null;
    status: "started" | "pending" | "completed";
  }

  const initialFormState: FormState = {
    name: "",
    service_code: "",
    description: "",
    category: null,
    base_price: 0,
    bill_cycle: "Daily",
    discount: null,
    tax_rate: null,
    auto_renew_enable: false,
    building: null,
    apartment: [],
    region: null,
    worker: null,
    service_icon: null,
    status: "started",
  };

  const initialServicesState = {
    deepCleaning: false,
    pestControl: false,
    glassWashing: false,
  };

  const [categories, setCategories] = useState([
    { id: "cleaning", label: "Cleaning" },
    { id: "maintenance", label: "Maintenance" },
    { id: "security", label: "Security" },
  ]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [formData, setFormData] = useState(initialFormState);
  const [selectedServices, setSelectedServices] = useState(initialServicesState);
  const { data: categoryies, isLoading, isError } = useGetServiceCategoriesQuery(undefined)
  type FormField = keyof typeof initialFormState;
  console.log("Categories from API:", categoryies);
  const handleInputChange = (
    field: FormField,
    value: string | boolean | File | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleServiceToggle = (service: keyof typeof initialServicesState) => {
    setSelectedServices((prev) => ({ ...prev, [service]: !prev[service] }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, uploadedIcon: file }));
    }
  };

  const handleCancel = () => {
    setFormData(initialFormState);
    setSelectedServices(initialServicesState);
    setOtherCategory("");
    setCustomAutoFill("");
  };

  const handleSave = () => {
    // Resolve the category: if “other” is selected, save the typed text
    const categoryToSave =
      formData.category === "other" ? otherCategory.trim() : formData.category;

    const payload = {
      ...formData,
      category: categoryToSave,
    };

    console.log("Saving service:", payload, selectedServices);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Add New Service</h1>
        <p className="text-sm text-gray-500 mt-1">
          Create and configure a new service or subscription package
        </p>
      </div>

      {/* Basic Service Information */}
      <div className="bg-white border rounded-lg p-6 mb-4">
        <h2 className="text-base font-semibold mb-4">
          Basic Service Information
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm">
              Service Name
            </Label>
            <Input
              id="name"
              placeholder="e.g. Monthly Cleaning"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="service_code" className="text-sm">
              Service Code
            </Label>
            <div className="relative">
              <Input
                id="service_code"
                placeholder="SRV-2025-001"
                value={formData.service_code}
                onChange={(e) =>
                  handleInputChange("service_code", e.target.value)
                }
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                title="Edit"
              >
                <Edit2 size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <Label htmlFor="description" className="text-sm">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Short notes about the service"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category" className="text-sm">
            Category
          </Label>
          <div className="space-y-2">
            <Select
              value={formData.category}
              onValueChange={(value) => {
                handleInputChange("category", value);
                if (value === "add-new") {
                  setNewCategoryName("");
                }
              }}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.label}
                  </SelectItem>
                ))}
                <SelectItem value="add-new">+ Add New Category</SelectItem>
              </SelectContent>
            </Select>

            {formData.category === "add-new" && (
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Enter new category name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={() => {
                    if (newCategoryName.trim()) {
                      const newCategory = {
                        id: newCategoryName.toLowerCase().replace(/\s+/g, "-"),
                        label: newCategoryName.trim(),
                      };
                      setCategories((prev) => [...prev, newCategory]);
                      setFormData((prev) => ({
                        ...prev,
                        category: newCategory.id,
                      }));
                      setNewCategoryName("");
                    }
                  }}
                  disabled={!newCategoryName.trim()}
                  size="sm"
                >
                  Add
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, category: "" }));
                    setNewCategoryName("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pricing & Billing */}
      <div className="bg-white border rounded-lg p-6 mb-4">
        <h2 className="text-base font-semibold mb-4">Pricing & Billing</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="basePrice" className="text-sm">
              Base Price
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <Input
                id="basePrice"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.basePrice}
                onChange={(e) => handleInputChange("basePrice", e.target.value)}
                className="pl-7"
              />
            </div>
          </div>

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
                <SelectValue placeholder="Daily" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="discount" className="text-sm">
              Discount (optional)
            </Label>
            <div className="relative">
              <Input
                id="discount"
                type="number"
                placeholder="0"
                value={formData.discount}
                onChange={(e) => handleInputChange("discount", e.target.value)}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                %
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="taxRate" className="text-sm">
              Tax Rate (optional)
            </Label>
            <div className="relative">
              <Input
                id="taxRate"
                type="number"
                placeholder="0"
                value={formData.taxRate}
                onChange={(e) => handleInputChange("taxRate", e.target.value)}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                %
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="autoRenew"
            checked={formData.autoRenew}
            onCheckedChange={(checked) =>
              handleInputChange("autoRenew", !!checked)
            }
          />
          <Label htmlFor="autoRenew" className="text-sm cursor-pointer">
            Auto-renew Enabled
          </Label>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-base font-semibold mb-4">Special Services</h2>

          <div className="space-y-4">
            <div className="flex justify-between gap-4">
              <div className="space-y-2 w-full">
                <Label htmlFor="building" className="text-sm">
                  Building
                </Label>
                <Select
                  value={formData.building}
                  onValueChange={(value) =>
                    handleInputChange("building", value)
                  }
                >
                  <SelectTrigger id="building">
                    <SelectValue placeholder="Building A" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="building-a">Building A</SelectItem>
                    <SelectItem value="building-b">Building B</SelectItem>
                    <SelectItem value="building-c">Building C</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 w-full">
                <Label htmlFor="apartment" className="text-sm">
                  Apartment
                </Label>
                <Select
                  value={formData.apartment}
                  onValueChange={(value) =>
                    handleInputChange("apartment", value)
                  }
                >
                  <SelectTrigger id="apartment">
                    <SelectValue placeholder="All Units" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Units</SelectItem>
                    <SelectItem value="unit-1">Unit 1</SelectItem>
                    <SelectItem value="unit-2">Unit 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="region" className="text-sm">
                Assign to Region
              </Label>
              <Select
                value={formData.region}
                onValueChange={(value) => handleInputChange("region", value)}
              >
                <SelectTrigger id="region">
                  <SelectValue placeholder="North District" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="north">North District</SelectItem>
                  <SelectItem value="south">South District</SelectItem>
                  <SelectItem value="east">East District</SelectItem>
                  <SelectItem value="west">West District</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="defaultWorker" className="text-sm">
                Assign Default Worker
              </Label>
              <Select
                value={formData.defaultWorker}
                onValueChange={(value) =>
                  handleInputChange("defaultWorker", value)
                }
              >
                <SelectTrigger id="defaultWorker">
                  <SelectValue placeholder="John Smith" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john">John Smith</SelectItem>
                  <SelectItem value="jane">Jane Doe</SelectItem>
                  <SelectItem value="mike">Mike Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="iconUpload" className="text-sm">
                Upload Service Icon (Optional)
              </Label>
              <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 text-center">
                <Upload className="text-gray-400 mb-2" size={32} />
                <p className="text-xs text-gray-500 mb-2">
                  .JPG/.PNG/.SVG files only
                </p>
                <input
                  id="iconUpload"
                  type="file"
                  accept=".jpg,.jpeg,.png,.svg"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById("iconUpload")?.click()}
                >
                  Choose File
                </Button>
                {formData.uploadedIcon && (
                  <p className="text-xs text-gray-600 mt-2">
                    {formData.uploadedIcon.name}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-4 gap-4">
        <Button onClick={handleCancel} variant="outline">
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
};

export default AddNewServiceForm;

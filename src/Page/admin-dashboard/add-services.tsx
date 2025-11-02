import { useState } from "react";
import {
  Edit2,
  LoaderCircleIcon,
  Plus,
  SearchIcon,
  XCircle,
} from "lucide-react";
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
import {
  useAddServiceCategoryMutation,
  useAddServiceMutation,
  useGetServiceCategoriesQuery,
} from "@/redux/features/admin/services/services.api";
import { toast } from "sonner";
import { useGetregionsQuery } from "@/redux/features/admin/regions/regions.api";
import {
  useGetBuildingByIdQuery,
  useGetBuildingsByRegionQuery,
} from "@/redux/features/admin/buildings/building.api";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/Components/ui/tooltip";
import MultipleSelector from "@/Components/ui/multiselect";
import { useGetSearchAllEmpoloyeesQuery } from "@/redux/features/admin/users/employee.api";

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
    status: "started",
  };

  const [employee, setEmployee] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [showEmployee, setShowEmployee] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [addCategoryButton, setAddCategoryButton] = useState(false);

  const { data: categories, isLoading: isCategoriesLoading } =
    useGetServiceCategoriesQuery(undefined);
  const [addCategory, { isLoading: isAddingCategory }] =
    useAddServiceCategoryMutation();
  const { data: regionsData, isLoading: isRegionsLoading } =
    useGetregionsQuery(undefined);
  const { data: buildings, isLoading: isBuildingsLoading } =
    useGetBuildingsByRegionQuery(formData.region, { skip: !formData.region });
  const { data: apartments } = useGetBuildingByIdQuery(formData.building || 0, { skip: !formData.building });
  const { data: employees, isLoading: isEmployeesLoading } =
    useGetSearchAllEmpoloyeesQuery(employee ? `${employee}` : "");
  const [addService, { isLoading: addServiceLoading }] =
    useAddServiceMutation();

  const apartmentsData = apartments?.apartments.map((apt: any) => ({
    value: apt.id,
    label: apt.apartment_number,
  }));

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });

  type FormField = keyof typeof initialFormState;

  const handleInputChange = (
    field: FormField,
    value: string | boolean | File | Array<number> | number | null
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      // Clear dependent fields when region or building changes
      ...(field === "region" && { building: null, apartment: [] }),
      ...(field === "building" && { apartment: [] }),
    }));
  };

  const addNewCategory = async () => {
    try {
      await toast.promise(addCategory({ name: newCategory.name }).unwrap(), {
        loading: "Creating category...",
        success: "Category created successfully",
        error: (err) =>
          `Failed to create category: ${err.data?.message || "Unknown error"}`,
      });
      setNewCategory({ name: "", description: "" });
      setAddCategoryButton(false);
    } catch (error) {
      console.error("Category creation failed:", error);
    }
  };

  const handleCancel = () => {
    setFormData(initialFormState);
    setSelectedEmployee(""); // Reset employee search
    setShowEmployee(false); // Hide employee dropdown
    setAddCategoryButton(false); // Hide category input
    setNewCategory({ name: "", description: "" }); // Reset new category form
  };

  const handleSave = async () => {
    const payload = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      base_price: Number(formData.base_price),
      bill_cycle: formData.bill_cycle,
      discount: formData.discount ? Number(formData.discount) : null,
      tax_rate: formData.tax_rate ? Number(formData.tax_rate) : null,
      building: formData.building,
      auto_renew_enable: formData.auto_renew_enable,
      worker: formData.worker,
      status: formData.status,
      apartment: formData.apartment,
      service_code: formData.service_code,
      region: formData.region,
    };
    try {
      await addService(payload).unwrap()
      toast.success("Service created successfully");
      handleCancel();
    } catch (error) {
      toast.error(`${Object.keys(error.data)[0]}: ${error.data[Object.keys(error.data)[0]][0]}`);
      console.error("Service creation failed:", error);
    }
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
      <div className="grid md:grid-cols-2 gap-4 mb-4">
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
              <div className="flex gap-2">
                <Select
                  value={formData.category?.toString() || ""}
                  onValueChange={(value) => {
                    handleInputChange("category", Number(value));
                  }}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {isCategoriesLoading ? (
                      <SelectItem value="loading">Loading...</SelectItem>
                    ) : (
                      categories?.map(
                        (category: { id: number; name: string }) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            <div>{category.name}</div>
                          </SelectItem>
                        )
                      )
                    )}
                  </SelectContent>
                </Select>
                <Button
                  size={"sm"}
                  variant="outline"
                  onClick={() => setAddCategoryButton(true)}
                >
                  <Plus size={8} />
                </Button>
              </div>
              {addCategoryButton && (
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Enter new category name"
                    value={newCategory.name}
                    onChange={(e) =>
                      setNewCategory({
                        name: e.target.value,
                        description: "",
                      })
                    }
                    className="flex-1"
                  />
                  <Button
                    onClick={() => addNewCategory()}
                    disabled={isAddingCategory}
                    size="sm"
                  >
                    {isAddingCategory ? "Adding..." : "Add"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setAddCategoryButton(false);
                      setNewCategory({
                        name: "",
                        description: "",
                      });
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
                  value={formData.base_price}
                  onChange={(e) =>
                    handleInputChange("base_price", Number(e.target.value))
                  }
                  className="pl-7"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="billingCycle" className="text-sm">
                Billing Cycle
              </Label>
              <Select
                value={formData.bill_cycle}
                onValueChange={(value) =>
                  handleInputChange("bill_cycle", value)
                }
              >
                <SelectTrigger id="billingCycle">
                  <SelectValue placeholder="Select Billing Cycle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Daily">Daily</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Yearly">Yearly</SelectItem>
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
                  min="0"
                  max="100"
                  step="0.01"
                  placeholder="0"
                  value={formData.discount || ""}
                  onChange={(e) => {
                    const value =
                      e.target.value === "" ? null : Number(e.target.value);
                    handleInputChange("discount", value);
                  }}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  %
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tax_rate" className="text-sm">
                Tax Rate (optional)
              </Label>
              <div className="relative">
                <Input
                  id="tax_rate"
                  type="number"
                  placeholder="0"
                  value={formData.tax_rate || ""}
                  onChange={(e) => {
                    const value =
                      e.target.value === "" ? null : Number(e.target.value);
                    handleInputChange("tax_rate", value);
                  }}
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
              checked={formData.auto_renew_enable}
              onCheckedChange={(checked) =>
                handleInputChange("auto_renew_enable", !!checked)
              }
            />
            <Label htmlFor="autoRenew" className="text-sm cursor-pointer">
              Auto-renew Enabled
            </Label>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-base font-semibold mb-4">Special Services</h2>
          <div className="grid grid-cols-4 gap-4">
            {/* region */}
            <div className="space-y-2">
              <Label htmlFor="region" className="text-sm">
                Assign to Region
              </Label>
              <Select
                value={formData.region?.toString() || ""}
                onValueChange={(value) =>
                  handleInputChange(
                    "region",
                    value === "" ? null : Number(value)
                  )
                }
              >
                <SelectTrigger id="region">
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent>
                  {isRegionsLoading ? (
                    <SelectItem value="loading" disabled>
                      Loading...
                    </SelectItem>
                  ) : (
                    regionsData?.results?.map(
                      (region: { id: number; name: string }) => (
                        <SelectItem
                          key={region.id}
                          value={region.id.toString()}
                        >
                          <div>{region.name}</div>
                        </SelectItem>
                      )
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
            {/* building */}
            <div className="space-y-2 w-full">
              <Label htmlFor="building" className="text-sm">
                Building
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-full">
                    <Select
                      disabled={formData.region === null}
                      value={formData.building?.toString() || ""}
                      onValueChange={(value) =>
                        handleInputChange(
                          "building",
                          value === "" ? null : Number(value)
                        )
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Building" />
                      </SelectTrigger>
                      <SelectContent>
                        {isBuildingsLoading ? (
                          <SelectItem value="loading" disabled>
                            Loading...
                          </SelectItem>
                        ) : buildings && buildings.length > 0 ? (
                          buildings?.map((building) => (
                            <SelectItem
                              key={building.id}
                              value={String(building.id)}
                            >
                              {building.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="none" disabled>
                            No Buildings available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </TooltipTrigger>
                {formData.region === null && (
                  <TooltipContent>Please select a region first</TooltipContent>
                )}
              </Tooltip>
            </div>
            {/* apartment */}
            <div className="space-y-2 w-full">
              <Label htmlFor="apartment" className="text-sm">
                Apartment
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`w-full ${
                      formData.building == null && "cursor-not-allowed"
                    }`}
                  >
                    <MultipleSelector
                      value={
                        formData.apartment?.map((id) => ({
                          value: id,
                          label:
                            apartmentsData?.find((apt) => apt.value === id)
                              ?.label || "",
                        })) || []
                      }
                      options={apartmentsData || []}
                      placeholder="Select apartments"
                      hidePlaceholderWhenSelected
                      disabled={formData.building === null}
                      emptyIndicator={
                        <p className="text-center text-sm">No results found</p>
                      }
                      onChange={(selected) => {
                        handleInputChange(
                          "apartment",
                          selected?.map((item) => item.value) || []
                        );
                      }}
                    />
                  </div>
                </TooltipTrigger>
                {formData.building === null && (
                  <TooltipContent>
                    Please select a building first
                  </TooltipContent>
                )}
              </Tooltip>
            </div>
            {/* worker */}
            <div className="space-y-2">
              <Label htmlFor="defaultWorker" className="text-sm">
                Assign Worker
              </Label>
              <div className="relative">
                <Input
                  type="text"
                  value={selectedEmployee || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setEmployee(value);
                    setSelectedEmployee(value);
                    setShowEmployee(!!value);
                  }}
                  onFocus={() => {
                    if (!selectedEmployee) {
                      setShowEmployee(true);
                    }
                  }}
                  className="peer ps-9 pe-9"
                  placeholder="Search by name or email..."
                />
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                  {isEmployeesLoading ? (
                    <LoaderCircleIcon
                      className="animate-spin"
                      size={16}
                      role="status"
                      aria-label="Loading..."
                    />
                  ) : (
                    <SearchIcon size={16} aria-hidden="true" />
                  )}
                </div>
                {selectedEmployee && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedEmployee("");
                      handleInputChange("worker", null);
                      setShowEmployee(false);
                    }}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  >
                    <XCircle size={16} />
                  </button>
                )}
              </div>
              {showEmployee &&
                (employees?.results?.length > 0 ? (
                  <div className="absolute z-10 lg:w-94 md:w-64 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {employees.results.map((employee) => (
                      <div
                        key={employee.id}
                        className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100"
                        onClick={() => {
                          handleInputChange("worker", employee.id);
                          setSelectedEmployee(employee.name);
                          setEmployee("");
                          setShowEmployee(false);
                        }}
                      >
                        <div className="font-medium text-gray-900">
                          {employee.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {employee.email}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="absolute z-10 lg:w-94 md:w-64 mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto p-6">
                    No worker found
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex justify-end mt-4 gap-4">
        <Button onClick={handleCancel} variant="outline">
          Cancel
        </Button>
        <Button disabled={addServiceLoading} onClick={handleSave}>
          {addServiceLoading ? "Creating..." : "Create Service"}
        </Button>
      </div>
    </div>
  );
};

export default AddNewServiceForm;

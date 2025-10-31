import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ChevronDown, ChevronUp } from "lucide-react";
import BulkSalaryPayment from "./bulk-payments";
import { useAddEmployeeMutation } from "@/redux/features/admin/users/employee.api";
import { assets } from "@/assets/assets";

const ActionButton = () => {
  const [isPayrollExpanded, setIsPayrollExpanded] = useState(true);
  const [addEmployee, { isLoading }] = useAddEmployeeMutation();
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    prime_phone: "",
    role: "",
    department: "",
    nationalId: "",
    idExpiry: "",
    baseSalary: "",
    salaryDay: "27",
    contractEnd: "",
    group: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // clear error when typing
  };

  const handleSave = async () => {
    const newErrors: Record<string, string> = {};

    // Required field validation
    Object.entries(formData).forEach(([key, value]) => {
      if (
        [
          "name",
          "email",
          "prime_phone",
          "department",
          "role",
          "nationalId",
          "idExpiry",
          "baseSalary",
          "group",
        ].includes(key) &&
        !value
      ) {
        newErrors[key] = "This field is required";
      }
    });

    // Phone validation
    if (formData.prime_phone && formData.prime_phone.length > 15) {
      newErrors.prime_phone = "Phone number cannot exceed 15 characters";
    }

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    setErrors(newErrors);

   if(Object.keys(newErrors).length > 0) {
      console.log(newErrors)
      return;
   }
    console.log("submitting");
    const payload = {
      name: formData.name,
      email: formData.email,
      prime_phone: formData.prime_phone,
      employee_profile: {
        department: formData.department,
        role: formData.role,
        shift: "morning",
        national_id: formData.nationalId,
        id_expiry: formData.idExpiry,
        contact_number: formData.prime_phone,
        contract_end: formData.contractEnd,
        location: formData.group,
        is_on_leave: false,
        salary_day: 25,
        base_salary: formData.baseSalary,
      },
    };

    try {
      await addEmployee(payload).unwrap();
      toast.success("Employee added successfully!");
      setOpen(false); // Close dialog on success
    } catch (error) {
      // console.error("Error adding employee:", error.data.email[0]);
      if(error?.data?.email[0])
         toast.error("Email already exists!");
      else
         toast.error("Failed to add employee!");
    }
    setFormData({
      name: "",
      email: "",
      prime_phone: "",
      role: "",
      department: "",
      nationalId: "",
      idExpiry: "",
      baseSalary: "",
      salaryDay: "27",
      contractEnd: "",
      group: "",
    })
  };

  return (
    <div>
      <div className="flex gap-4">
        {/* <BulkSalaryPayment /> */}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <img src={assets.Add_Employee} alt="add" className="w-3 h-3" />
              Add Employee
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Add Employee</DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* --- Basic Info --- */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-4">
                  Basic Info
                </h3>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Abc..."
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="abc@gmail.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="prime_phone">Phone</Label>
                    <Input
                      id="prime_phone"
                      placeholder="+5635-45534"
                      value={formData.prime_phone}
                      onChange={(e) =>
                        handleInputChange("prime_phone", e.target.value)
                      }
                    />
                    {errors.prime_phone && (
                      <p className="text-xs text-red-500">
                        {errors.prime_phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="department">Department</Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) =>
                        handleInputChange("department", value)
                      }
                    >
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cleaner">Cleaning</SelectItem>
                        <SelectItem value="manager">Management</SelectItem>
                        <SelectItem value="security">Security</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.role && (
                      <p className="text-xs text-red-500">{errors.role}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value) =>
                        handleInputChange("role", value)
                      }
                    >
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cleaner">Cleaner</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="security">Security</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.role && (
                      <p className="text-xs text-red-500">{errors.role}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="nationalId">National ID</Label>
                    <Input
                      id="nationalId"
                      placeholder="af1312fgdcvss"
                      value={formData.nationalId}
                      onChange={(e) =>
                        handleInputChange("nationalId", e.target.value)
                      }
                    />
                    {errors.nationalId && (
                      <p className="text-xs text-red-500">
                        {errors.nationalId}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* --- Payroll Section --- */}
              <div>
                <button
                  onClick={() => setIsPayrollExpanded(!isPayrollExpanded)}
                  className="flex items-center gap-2 w-full text-sm font-semibold text-gray-700 mb-4"
                >
                  <span>Contract & Payroll</span>
                  {isPayrollExpanded ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>

                {isPayrollExpanded && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="baseSalary">Base Salary</Label>
                        <Input
                          id="baseSalary"
                          type="number"
                          value={formData.baseSalary}
                          onChange={(e) =>
                            handleInputChange("baseSalary", e.target.value)
                          }
                        />
                        {errors.baseSalary && (
                          <p className="text-xs text-red-500">
                            {errors.baseSalary}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="salaryDay">Salary Day</Label>
                        <Input
                          id="salaryDay"
                          type="number"
                          value={formData.salaryDay}
                          onChange={(e) =>
                            handleInputChange("salaryDay", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="idExpiry">ID Expiry</Label>
                        <Input
                          id="idExpiry"
                          type="date"
                          value={formData.idExpiry}
                          onChange={(e) =>
                            handleInputChange("idExpiry", e.target.value)
                          }
                        />
                        {errors.idExpiry && (
                          <p className="text-xs text-red-500">
                            {errors.idExpiry}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          ID/Residence: Expiry Date
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="contractEnd">Contract End</Label>
                        <Input
                          id="contractEnd"
                          type="date"
                          value={formData.contractEnd}
                          onChange={(e) =>
                            handleInputChange("contractEnd", e.target.value)
                          }
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Leave it blank if open
                        </p>
                      </div>

                      <div className="space-y-1 col-span-2">
                        <Label htmlFor="group">Location</Label>
                        <Input
                          id="group"
                          placeholder="Type or select the group"
                          value={formData.group}
                          onChange={(e) =>
                            handleInputChange("group", e.target.value)
                          }
                        />
                        {errors.group && (
                          <p className="text-xs text-red-500">{errors.group}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ActionButton;

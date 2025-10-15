import { useState } from "react";
import { assets } from "@/assets/assets";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ChevronDown, ChevronUp } from "lucide-react";
import BulkSalaryPayment from "./bulk-payments";
import { useAddEmployeeMutation, useEmployeeOverviewQuery } from "@/redux/api/apiSlice";

const ActionButton = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [isPayrollExpanded, setIsPayrollExpanded] = useState(true);

  const [addEmployee, { isLoading }] = useAddEmployeeMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    nationalId: "",
    idExpiry: "",
    baseSalary: "",
    salaryDay: "1",
    contractStart: "",
    contractEnd: "",
    group: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await addEmployee(formData).unwrap();
      console.log("✅ Employee added successfully:", response);
    } catch (error) {
      console.error("❌ Failed to add employee:", error);
    }
  };

  const handleRefresh = () => {
    setIsRotating(true);
    setRefreshKey((prev) => prev + 1);
    setTimeout(() => setIsRotating(false), 1000);
  };


  return (
    <div key={refreshKey}>
      <div className="flex gap-4">
        {/* Refresh Button */}
        <button
          onClick={handleRefresh}
          className="flex gap-2.5 bg-[#E5E5E5] py-2.5 px-5 rounded-full text-[#8E8E8E] cursor-pointer items-center"
        >
          <img
            src={assets.Refresh}
            alt="refresh"
            className={`w-5 h-5 ${isRotating ? "animate-spin" : ""}`}
          />
          Refresh
        </button>

        {/* Bulk Button */}
        <BulkSalaryPayment />

        {/* Add Employee Button */}
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex gap-2.5 text-white bg-[#2463EA] py-2.5 px-5 rounded-full cursor-pointer items-center">
              <img src={assets.Add_Employee} alt="add" className="w-5 h-5" />
              Add Employee
            </button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Employee</DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Basic Info Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-4">
                  Basic info
                </h3>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm text-gray-700">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Abc..."
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm text-gray-700">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="abc@gmail.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm text-gray-700">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      placeholder="+5635-45534"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-sm text-gray-700">
                      Role
                    </Label>
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
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="nationalId"
                      className="text-sm text-gray-700"
                    >
                      National ID
                    </Label>
                    <Input
                      id="nationalId"
                      placeholder="af1312fgdcvss"
                      value={formData.nationalId}
                      onChange={(e) =>
                        handleInputChange("nationalId", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idExpiry" className="text-sm text-gray-700">
                      ID Expiry
                    </Label>
                    <Input
                      id="idExpiry"
                      type="date"
                      value={formData.idExpiry}
                      onChange={(e) =>
                        handleInputChange("idExpiry", e.target.value)
                      }
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      ID/Residence: Expiry Date
                    </p>
                  </div>
                </div>
              </div>

              {/* Contract & Payroll Section */}
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
                      <div className="space-y-2">
                        <Label
                          htmlFor="baseSalary"
                          className="text-sm text-gray-700"
                        >
                          Base Salary
                        </Label>
                        <Input
                          id="baseSalary"
                          type="number"
                          value={formData.baseSalary}
                          onChange={(e) =>
                            handleInputChange("baseSalary", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="salaryDay"
                          className="text-sm text-gray-700"
                        >
                          Salary Day
                        </Label>
                        <Input
                          id="salaryDay"
                          type="number"
                          value={formData.salaryDay}
                          onChange={(e) =>
                            handleInputChange("salaryDay", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="contractStart"
                          className="text-sm text-gray-700"
                        >
                          Contract Start
                        </Label>
                        <Input
                          id="contractStart"
                          type="date"
                          value={formData.contractStart}
                          onChange={(e) =>
                            handleInputChange("contractStart", e.target.value)
                          }
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Contract start date
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="contractEnd"
                          className="text-sm text-gray-700"
                        >
                          Contract End
                        </Label>
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

                      <div className="space-y-2">
                        <Label
                          htmlFor="group"
                          className="text-sm text-gray-700"
                        >
                          Group (Area)
                        </Label>
                        <Input
                          id="group"
                          placeholder="Type or select the group"
                          value={formData.group}
                          onChange={(e) =>
                            handleInputChange("group", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <DialogClose>
              <DialogFooter className="gap-2">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleSave} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save"}
                </Button>
              </DialogFooter>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ActionButton;

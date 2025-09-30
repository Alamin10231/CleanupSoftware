import React, { useState } from "react";
import { FileText, Download, Edit2 } from "lucide-react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { assets } from "@/assets/assets";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";

const BulkSalaryPayment = () => {
    const [selectedEmployees, setSelectedEmployees] = useState(new Set());

    const employees = [
        {
            id: "EMP001",
            name: "Aaron Johnson",
            department: "Engineering",
            role: "Frontend Developer",
            region: "New York",
            baseSalary: 8500,
            deductions: 200,
            bonus: 500,
            finalPay: 8800,
            status: "Pending",
        },
        {
            id: "EMP002",
            name: "Michael Chen",
            department: "Marketing",
            role: "Marketing Manager",
            region: "London",
            baseSalary: 7200,
            deductions: 150,
            bonus: 300,
            finalPay: 7350,
            status: "Paid",
        },
        {
            id: "EMP003",
            name: "Sarah Rodriguez",
            department: "HR",
            role: "HR Specialist",
            region: "Tokyo",
            baseSalary: 6900,
            deductions: 180,
            bonus: 250,
            finalPay: 6970,
            status: "Failed",
        },
        {
            id: "EMP004",
            name: "Emma Williams",
            department: "Engineering",
            role: "Frontend Developer",
            region: "New York",
            baseSalary: 7500,
            deductions: 220,
            bonus: 400,
            finalPay: 7680,
            status: "Pending",
        },
    ];

    const toggleEmployee = (id) => {
        const newSelected = new Set(selectedEmployees);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedEmployees(newSelected);
    };

    const toggleAll = () => {
        if (selectedEmployees.size === employees.length) {
            setSelectedEmployees(new Set());
        } else {
            setSelectedEmployees(new Set(employees.map((e) => e.id)));
        }
    };

    const totalDeductions = employees
        .filter((e) => selectedEmployees.has(e.id))
        .reduce((sum, e) => sum + e.deductions, 0);

    const totalBonus = employees
        .filter((e) => selectedEmployees.has(e.id))
        .reduce((sum, e) => sum + e.bonus, 0);

    const finalNetPay = employees
        .filter((e) => selectedEmployees.has(e.id))
        .reduce((sum, e) => sum + e.finalPay, 0);

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-100 text-yellow-700";
            case "Paid":
                return "bg-green-100 text-green-700";
            case "Failed":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const getInitials = (name) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="flex gap-2.5 text-white bg-[#009608] py-2.5 px-5 rounded-full cursor-pointer items-center">
                    <img src={assets.Bulk} alt="bulk" className="w-5 h-5" />
                    Bulk
                </button>
            </DialogTrigger>

            <DialogContent className="flex flex-col p-0">
                <DialogHeader className="px-6 py-4 border-b">
                    <DialogTitle className="text-xl">
                        Bulk Salary Payment
                    </DialogTitle>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage and process employee salary payments efficiently
                    </p>
                </DialogHeader>

                <div className="flex-1 overflow-auto">
                    <div className="grid grid-cols-12 gap-6 p-6">
                        {/* Employee Salary Overview - Left Section */}
                        <div className="col-span-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-semibold text-gray-700">
                                    Employee Salary Overview
                                </h3>
                                <span className="text-sm text-gray-500">
                                    {employees.length} Employees
                                </span>
                            </div>

                            <div className="bg-white rounded-lg border overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead className="bg-gray-50 border-b">
                                            <tr>
                                                <th className="text-left p-3 font-medium text-gray-700">
                                                    <Checkbox
                                                        checked={
                                                            selectedEmployees.size ===
                                                            employees.length
                                                        }
                                                        onCheckedChange={
                                                            toggleAll
                                                        }
                                                    />
                                                </th>
                                                <th className="text-left p-3 font-medium text-gray-700">
                                                    Employee
                                                </th>
                                                <th className="text-left p-3 font-medium text-gray-700">
                                                    Department / Role
                                                </th>
                                                <th className="text-left p-3 font-medium text-gray-700">
                                                    Region
                                                </th>
                                                <th className="text-left p-3 font-medium text-gray-700">
                                                    Base Salary
                                                </th>
                                                <th className="text-left p-3 font-medium text-gray-700">
                                                    Deductions
                                                </th>
                                                <th className="text-left p-3 font-medium text-gray-700">
                                                    Bonus
                                                </th>
                                                <th className="text-left p-3 font-medium text-gray-700">
                                                    Final Pay
                                                </th>
                                                <th className="text-left p-3 font-medium text-gray-700">
                                                    Status
                                                </th>
                                                <th className="text-left p-3 font-medium text-gray-700">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {employees.map((employee) => (
                                                <tr
                                                    key={employee.id}
                                                    className="border-b hover:bg-gray-50"
                                                >
                                                    <td className="p-3">
                                                        <Checkbox
                                                            checked={selectedEmployees.has(
                                                                employee.id
                                                            )}
                                                            onCheckedChange={() =>
                                                                toggleEmployee(
                                                                    employee.id
                                                                )
                                                            }
                                                        />
                                                    </td>
                                                    <td className="p-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-medium">
                                                                {getInitials(
                                                                    employee.name
                                                                )}
                                                            </div>
                                                            <div>
                                                                <div className="font-medium text-gray-900">
                                                                    {
                                                                        employee.name
                                                                    }
                                                                </div>
                                                                <div className="text-xs text-gray-500">
                                                                    {
                                                                        employee.id
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-3">
                                                        <div className="text-gray-900">
                                                            {
                                                                employee.department
                                                            }
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            {employee.role}
                                                        </div>
                                                    </td>
                                                    <td className="p-3 text-gray-700">
                                                        {employee.region}
                                                    </td>
                                                    <td className="p-3 font-medium text-gray-900">
                                                        $
                                                        {employee.baseSalary.toLocaleString()}
                                                    </td>
                                                    <td className="p-3 text-gray-700">
                                                        ${employee.deductions}
                                                    </td>
                                                    <td className="p-3 text-gray-700">
                                                        ${employee.bonus}
                                                    </td>
                                                    <td className="p-3 font-semibold text-gray-900">
                                                        $
                                                        {employee.finalPay.toLocaleString()}
                                                    </td>
                                                    <td className="p-3">
                                                        <Badge
                                                            variant="outline"
                                                            className={getStatusColor(
                                                                employee.status
                                                            )}
                                                        >
                                                            {employee.status}
                                                        </Badge>
                                                    </td>
                                                    <td className="p-3">
                                                        <button className="text-gray-500 hover:text-gray-700">
                                                            <Edit2 size={16} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Payment Summary - Right Section */}
                        <div className="col-span-4">
                            <h3 className="text-sm font-semibold text-gray-700 mb-4">
                                Payment Summary
                            </h3>

                            <div className="bg-white rounded-lg border p-4 space-y-4">
                                <div className="flex justify-between items-center pb-3 border-b">
                                    <span className="text-sm text-gray-600">
                                        Total Employees Selected
                                    </span>
                                    <span className="text-2xl font-bold text-gray-900">
                                        {selectedEmployees.size
                                            .toString()
                                            .padStart(2, "0")}
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">
                                            Total Deductions
                                        </span>
                                        <span className="text-sm font-semibold text-red-600">
                                            -$
                                            {totalDeductions.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">
                                            Total Bonus
                                        </span>
                                        <span className="text-sm font-semibold text-green-600">
                                            +${totalBonus.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="pt-3 border-t">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-base font-semibold text-gray-900">
                                            Final Net Pay
                                        </span>
                                        <span className="text-2xl font-bold text-green-600">
                                            ${finalNetPay.toLocaleString()}
                                        </span>
                                    </div>

                                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                                        Process Bulk Payment
                                    </Button>

                                    <div className="flex gap-2 mt-3">
                                        <Button
                                            variant="outline"
                                            className="flex-1 text-sm"
                                        >
                                            <FileText
                                                size={16}
                                                className="mr-1"
                                            />
                                            PDF
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="flex-1 text-sm"
                                        >
                                            <Download
                                                size={16}
                                                className="mr-1"
                                            />
                                            CSV
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BulkSalaryPayment;

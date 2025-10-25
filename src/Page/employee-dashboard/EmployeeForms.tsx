// import { useEffect, useState } from "react";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
  
// } from "@/Components/ui/tabs";
// import { Dialog,  DialogContent,   DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";
// import { Label } from "@/Components/ui/label";
// import { Button } from "@/Components/ui/button";


// interface Invoice {
//   FormName: string;
//   Client: string;
//   Apartment: string;
//   Region: string;
//   Status: "Submitted" | "Draft";
//   LastUpdated: string;
// }

// const EmployeeForms = () => {
//   const [invoices, setInvoices] = useState<Invoice[]>([]);
//   const [tab, setTab] = useState("all");

//   useEffect(() => {
//     fetch("/FormData.json")
//       .then((res) => res.json())
//       .then((data) => setInvoices(data.FormData));
//   }, []);

//   const filteredInvoices = invoices.filter((fo) => {
//     const matchTab =
//       tab == "all"
//         ? true
//         : tab === "Submitted"
//         ? fo.Status === "Submitted"
//         : tab === "Draft"
//         ? fo.Status === "Draft"
//         : true;

//     return matchTab;
//   });

//   const statuscolor = {
//     Submitted: "text-green-500 bg-[#E2F5EC] px-4 py-2 rounded-md",
//     Draft: "text-[#F5A926] bg-[#F7F1E4] px-9 py-2 rounded-md",
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">Forms</h1>
//       </div>

//       {/* Tabs */}
//       <Tabs defaultValue="all" value={tab} onValueChange={setTab}>
//         <TabsList>
//           {["all", "Submitted", "Draft"].map((t) => (
//             <TabsTrigger key={t} value={t}>
//               {t === "all" ? "All" : t}
//             </TabsTrigger>
//           ))}
//         </TabsList>

//         {/* Table */}
//         <TabsContent value={tab} className="">
//           <div className="overflow-x-auto border rounded-lg mt-4 ">
//             <table className="w-full border-collapse text-md bg-[#F7FAFC]">
//               <thead className=" text-black ">
//                 <tr className="text-black  ">
//                   <th className="px-4 py-2 text-left">FormName</th>
//                   <th className="px-4 py-2 text-left">Client</th>
//                   <th className="px-4 py-2 text-left">Appartment</th>
//                   <th className="px-4 py-2 text-left">Region</th>
//                   <th className="px-4 py-2 text-left">Note</th>
//                   <th className="px-4 py-2 text-left">Last Updates</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-[#F7FAFC] text-gray-500">
//                 {filteredInvoices.map((invoice, index) => (
//                   <tr key={index} className="border-t hover:bg-gray-50">
//                     <td className="px-4 py-4 ">{invoice.FormName}</td>
//                     <td className="px-4 py-4 ">{invoice.Client}</td>
//                     <td className="px-4 py-4 ">{invoice.Apartment}</td>
//                     <td className="px-4 py-4 ">{invoice.Region}</td>
//                     <td
//                       className={`px-4 py-4 
//                       `}
//                     >
//                       {/* <span className={` ${statuscolor[invoice.Status] || ""}`}>
//                          {invoice.Status}

//                        </span> */}
//                       <span>
//                         <Dialog>
//       <form>
//         <DialogTrigger asChild>
//           <Button className="text-blue-600 bg-blue-100"  variant="outline"><span className="text-blue-600">+</span> Add Notes</Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[425px] ">
//           <DialogHeader>
//             <DialogTitle>Note</DialogTitle>
            
//           </DialogHeader>
//           <div className="grid gap-4 ">
//             <div className="grid gap-3 ">
//               <Label htmlFor="name-1">Name</Label>
//               <textarea  id="name-1" name="name" defaultValue="Notes..!" className="h-24 w-full text-gray-500" />
//             </div>
           
//           </div>
        
//         </DialogContent>
//       </form>
//     </Dialog>
                        
//                       </span>
//                     </td>
//                     <td className="px-4 py-4 ">{invoice.LastUpdated}</td>
//                     <td className="px-4 py-4  text-blue-600 cursor-pointer hover:underline"></td>
//                   </tr>
//                 ))}

//                 {filteredInvoices.length === 0 && (
//                   <tr>
//                     <td colSpan={9} className="text-center text-gray-500 py-4">
//                       No invoices found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default EmployeeForms;

import React, { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Textarea } from "@/Components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { useGetFormsQuery } from "@/redux/features/admin/DynamicForm/DynamicForm.api";
import { useSubmitFormMutation } from "@/redux/features/admin/DynamicForm/formSubmissionApi.api";

const EmployeeForms = () => {
  const [selectedFormId, setSelectedFormId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<{
    type: "success" | "error" | "";
    text: string;
  }>({
    type: "",
    text: "",
  });

  // Fetch all forms
  const { data: formsResponse, isLoading: loadingForms, error } = useGetFormsQuery({});
  
  // Submit form mutation
  const [submitForm, { isLoading: submitting }] = useSubmitFormMutation();

  // ✅ Handle different API response structures
  const formsData = Array.isArray(formsResponse) 
    ? formsResponse 
    : formsResponse?.results || formsResponse?.data || [];

  // Log the data structure for debugging
  React.useEffect(() => {
    console.log("📦 Forms API Response:", formsResponse);
    console.log("📋 Processed Forms Data:", formsData);
  }, [formsResponse]);

  // Get selected form
  const selectedForm = formsData?.find((form: any) => form.id === selectedFormId);

  // Handle form selection
  const handleFormSelect = (formId: string) => {
    setSelectedFormId(Number(formId));
    setFormValues({});
    setErrors({});
    setMessage({ type: "", text: "" });
  };

  // Handle input change
  const handleInputChange = (fieldLabel: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldLabel]: value,
    }));
    // Clear error for this field
    if (errors[fieldLabel]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldLabel];
        return newErrors;
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    selectedForm?.fields?.forEach((field: any) => {
      if (field.is_required && !formValues[field.field_label]?.trim()) {
        newErrors[field.field_label] = `${field.field_label} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      setMessage({ type: "error", text: "Please fill all required fields" });
      return;
    }

    // Format responses array
    const responses = selectedForm?.fields?.map((field: any) => ({
      field_label: field.field_label,
      value: formValues[field.field_label] || "",
    }));

    const submissionData = {
      form: selectedFormId,
      employee: 1, // Replace with actual employee ID from auth
      responses,
    };

    console.log(
      "%c📤 Submitting Form:",
      "color: #00bfff; font-weight: bold;",
      submissionData
    );

    try {
      const response = await submitForm(submissionData).unwrap();

      console.log(
        "%c✅ Submission Success:",
        "color: #22c55e; font-weight: bold;",
        response
      );

      setMessage({ type: "success", text: "Form submitted successfully!" });
      setFormValues({});
      setSelectedFormId(null);
    } catch (err: any) {
      console.error(
        "%c❌ Submission Error:",
        "color: #ef4444; font-weight: bold;",
        err
      );
      setMessage({
        type: "error",
        text: err?.data?.message || "Failed to submit form. Please try again.",
      });
    }
  };

  // Render field based on type
  const renderField = (field: any, index: number) => {
    const fieldValue = formValues[field.field_label] || "";
    const hasError = !!errors[field.field_label];

    switch (field.field_type) {
      case "text":
      case "email":
      case "number":
        return (
          <div key={index} className="space-y-2">
            <Label className="text-gray-700 font-medium">
              {field.field_label}
              {field.is_required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              type={field.field_type}
              placeholder={`Enter ${field.field_label.toLowerCase()}`}
              value={fieldValue}
              onChange={(e) => handleInputChange(field.field_label, e.target.value)}
              className={hasError ? "border-red-500" : ""}
            />
            {hasError && (
              <p className="text-red-500 text-sm">{errors[field.field_label]}</p>
            )}
          </div>
        );

      case "textarea":
        return (
          <div key={index} className="space-y-2">
            <Label className="text-gray-700 font-medium">
              {field.field_label}
              {field.is_required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Textarea
              placeholder={`Enter ${field.field_label.toLowerCase()}`}
              value={fieldValue}
              onChange={(e) => handleInputChange(field.field_label, e.target.value)}
              className={hasError ? "border-red-500" : ""}
              rows={4}
            />
            {hasError && (
              <p className="text-red-500 text-sm">{errors[field.field_label]}</p>
            )}
          </div>
        );

      case "select":
        const options = field.options?.split(",").map((opt: string) => opt.trim()) || [];
        return (
          <div key={index} className="space-y-2">
            <Label className="text-gray-700 font-medium">
              {field.field_label}
              {field.is_required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Select
              value={fieldValue}
              onValueChange={(value) => handleInputChange(field.field_label, value)}
            >
              <SelectTrigger className={hasError ? "border-red-500" : ""}>
                <SelectValue placeholder={`Select ${field.field_label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option: string, idx: number) => (
                  <SelectItem key={idx} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {hasError && (
              <p className="text-red-500 text-sm">{errors[field.field_label]}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  // Handle loading state
  if (loadingForms) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="text-center">
          <p className="text-gray-500">Loading forms...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="text-center">
          <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-3 rounded-md">
            <p className="font-medium">Error loading forms</p>
            <p className="text-sm mt-1">{(error as any)?.data?.message || "Please try again later"}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">📋 Fill Dynamic Form</h1>
        <p className="text-gray-500 text-sm">
          Select a form and complete all required fields
        </p>
      </div>

      {/* Message Display */}
      {message.text && (
        <div
          className={`text-center px-4 py-2 rounded-md font-medium ${
            message.type === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Form Selection */}
      <Card className="shadow-md border rounded-2xl">
        <CardHeader>
          <CardTitle>Select Form</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label className="text-gray-600 font-medium">Available Forms</Label>
            <Select
              value={selectedFormId?.toString() || ""}
              onValueChange={handleFormSelect}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a form to fill" />
              </SelectTrigger>
              <SelectContent>
                {formsData?.length > 0 ? (
                  formsData.map((form: any) => (
                    <SelectItem key={form.id} value={form.id.toString()}>
                      {form.form_name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-forms" disabled>
                    No forms available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Dynamic Form Fields */}
      {selectedForm && (
        <Card className="shadow-md border rounded-2xl">
          <CardHeader>
            <CardTitle>{selectedForm.form_name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {selectedForm.fields?.map((field: any, index: number) =>
              renderField(field, index)
            )}

            <div className="flex justify-center pt-4">
              <Button
                onClick={handleSubmit}
                disabled={submitting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-xl shadow"
              >
                {submitting ? "Submitting..." : "Submit Form"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {!selectedForm && formsData?.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No forms available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default EmployeeForms;


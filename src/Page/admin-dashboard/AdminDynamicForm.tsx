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
import { Checkbox } from "@/Components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { motion } from "framer-motion";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { useAddDynamicFormMutation } from "@/redux/features/admin/DynamicForm/DynamicForm.api";

const AdminDynamicForm = () => {
  const [formName, setFormName] = useState("");
  const [fields, setFields] = useState([
    { field_label: "", field_type: "text", is_required: false, options: "" },
  ]);
  const [message, setMessage] = useState<{
    type: "success" | "error" | "";
    text: string;
  }>({
    type: "",
    text: "",
  });

  const [addDynamicForm, { isLoading }] = useAddDynamicFormMutation();

  // 🟢 Add new field
  const handleAddField = () => {
    setFields([
      ...fields,
      { field_label: "", field_type: "text", is_required: false, options: "" },
    ]);
  };

  // ✏️ Update field
  const handleFieldChange = (index: number, key: string, value: any) => {
    const newFields = [...fields];
    newFields[index][key] = value;
    setFields(newFields);
  };

  // 🗑️ Remove field
  const handleRemoveField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  // 🚀 Submit form (includes console logs)
  const handleSubmit = async () => {
    if (!formName.trim()) {
      setMessage({ type: "error", text: "Form name is required!" });
      return;
    }

    const formData = {
      form_name: formName,
      admin: 1, // You can replace with dynamic admin ID
      fields,
    };

    console.log(
      "%c📤 Sending Form Data:",
      "color: #00bfff; font-weight: bold;",
      formData
    );

    try {
      const response = await addDynamicForm(formData).unwrap();

      console.log(
        "%c✅ API Response:",
        "color: #22c55e; font-weight: bold;",
        response
      );

      setMessage({ type: "success", text: "Form created successfully!" });
      setFormName("");
      setFields([
        { field_label: "", field_type: "text", is_required: false, options: "" },
      ]);
    } catch (err: any) {
      console.error(
        "%c❌ API Error:",
        "color: #ef4444; font-weight: bold;",
        err
      );
      setMessage({
        type: "error",
        text: "Failed to create form. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">🧩 Dynamic Form Builder</h1>
        <p className="text-gray-500 text-sm">
          Create flexible forms by adding custom fields. Configure type, label,
          and requirements.
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

      {/* Form Name */}
      <Card className="shadow-md border rounded-2xl">
        <CardHeader>
          <CardTitle>Form Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label className="text-gray-600 font-medium">Form Name</Label>
            <Input
              placeholder="Enter form name (e.g. Employee Feedback Form)"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="border-gray-300 focus:border-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Fields */}
      <div className="space-y-6">
        {fields.map((field, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl shadow-sm border bg-white p-5 space-y-4 relative"
          >
            <div className="absolute right-4 top-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:bg-red-50"
                onClick={() => handleRemoveField(index)}
              >
                <FiTrash2 />
              </Button>
            </div>

            <div>
              <Label className="text-gray-700 font-medium">Field Label</Label>
              <Input
                placeholder="e.g. Your Name"
                value={field.field_label}
                onChange={(e) =>
                  handleFieldChange(index, "field_label", e.target.value)
                }
              />
            </div>

            <div>
              <Label className="text-gray-700 font-medium">Field Type</Label>
              <Select
                value={field.field_type}
                onValueChange={(value) =>
                  handleFieldChange(index, "field_type", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select field type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="select">Select (Dropdown)</SelectItem>
                  <SelectItem value="textarea">Textarea</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {field.field_type === "select" && (
              <div>
                <Label className="text-gray-700 font-medium">
                  Options (comma separated)
                </Label>
                <Input
                  placeholder="e.g. Excellent, Good, Average, Poor"
                  value={field.options}
                  onChange={(e) =>
                    handleFieldChange(index, "options", e.target.value)
                  }
                />
              </div>
            )}

            <div className="flex items-center space-x-3 pt-2">
              <Checkbox
                checked={field.is_required}
                onCheckedChange={(checked) =>
                  handleFieldChange(index, "is_required", !!checked)
                }
              />
              <Label className="text-gray-700">Required Field</Label>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 pt-6">
        <Button
          onClick={handleAddField}
          variant="outline"
          className="flex items-center gap-2 px-5 py-2 border-blue-500 text-blue-600 hover:bg-blue-50"
        >
          <FiPlus /> Add New Field
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow"
        >
          {isLoading ? "Saving..." : "Save Form"}
        </Button>
      </div>
    </div>
  );
};

export default AdminDynamicForm;

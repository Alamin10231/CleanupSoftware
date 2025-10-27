import { useState } from "react";
import {
  Plus,
  Trash2,
  GripVertical,
  Type,
  Mail,
  Calendar,
  CheckSquare,
  List,
  AlignLeft,
  Hash,
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { toast } from "sonner";
import { useCreateFormMutation } from "@/redux/features/admin/custom-form/custome-form.api";

interface FormField {
  id: string;
  field_label: string;
  field_type: string;
  is_required: boolean;
  options: string;
}

interface FormData {
  form_name: string;
  admin: number;
  fields: FormField[];
}

const DynamicFormBuilder = () => {
  const [formData, setFormData] = useState<FormData>({
    form_name: "",
    admin: 1, // This should come from auth context
    fields: [],
  });

  const [currentField, setCurrentField] = useState<Omit<FormField, "id">>({
    field_label: "",
    field_type: "text",
    is_required: false,
    options: "",
  });
  const [createForm, { isLoading, isError }] = useCreateFormMutation();

  const fieldTypes = [
    { value: "text", label: "Text", icon: Type },
    { value: "email", label: "Email", icon: Mail },
    { value: "number", label: "Number", icon: Hash },
    { value: "textarea", label: "Textarea", icon: AlignLeft },
    { value: "select", label: "Select/Dropdown", icon: List },
    { value: "checkbox", label: "Checkbox", icon: CheckSquare },
    { value: "date", label: "Date", icon: Calendar },
  ];

  const getFieldIcon = (type: string) => {
    const fieldType = fieldTypes.find((ft) => ft.value === type);
    return fieldType?.icon || Type;
  };

  const addField = () => {
    if (!currentField.field_label.trim()) {
      toast.error("Field label is required");
      return;
    }

    if (
      (currentField.field_type === "select" ||
        currentField.field_type === "checkbox") &&
      !currentField.options.trim()
    ) {
      toast.error("Options are required for select/checkbox fields");
      return;
    }

    const newField: FormField = {
      id: `field_${Date.now()}`,
      ...currentField,
    };

    setFormData((prev) => ({
      ...prev,
      fields: [...prev.fields, newField],
    }));

    setCurrentField({
      field_label: "",
      field_type: "text",
      is_required: false,
      options: "",
    });

    toast.success("Field added successfully");
  };

  const removeField = (fieldId: string) => {
    setFormData((prev) => ({
      ...prev,
      fields: prev.fields.filter((field) => field.id !== fieldId),
    }));
    toast.success("Field removed");
  };

  const moveField = (index: number, direction: "up" | "down") => {
    const newFields = [...formData.fields];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newFields.length) return;

    [newFields[index], newFields[targetIndex]] = [
      newFields[targetIndex],
      newFields[index],
    ];

    setFormData((prev) => ({ ...prev, fields: newFields }));
  };

  const handleSubmit = async () => {
    if (!formData.form_name.trim()) {
      toast.error("Form name is required");
      return;
    }

    if (formData.fields.length === 0) {
      toast.error("Please add at least one field");
      return;
    }

    // Transform fields to match API format (remove id property)
    const payload = {
      form_name: formData.form_name,
      admin: formData.admin,
      fields: formData.fields.map(({ id, ...field }) => field),
    };

    try {
      // Replace with actual API call
      await toast.promise(createForm(payload).unwrap(), {
        loading: "Creating form...",
        success: "Form created successfully",
        error: "Failed to create form",
      });

      console.log("Form payload:", JSON.stringify(payload, null, 2));

      // Reset form
      setFormData({
        form_name: "",
        admin: 1,
        fields: [],
      });
    } catch (error) {
      console.error("Form creation failed:", error);
    }
  };

  const handleCancel = () => {
    setFormData({
      form_name: "",
      admin: 1,
      fields: [],
    });
    setCurrentField({
      field_label: "",
      field_type: "text",
      is_required: false,
      options: "",
    });
    toast.info("Form cleared");
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Dynamic Form Builder</h1>
        <p className="text-sm text-gray-500 mt-1">
          Create custom forms with dynamic fields for data collection
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - Form Configuration */}
        <div className="space-y-6">
          {/* Form Name */}
          <Card>
            <CardHeader>
              <CardTitle>Form Information</CardTitle>
              <CardDescription>
                Basic information about your form
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="form_name" className="text-sm">
                  Form Name *
                </Label>
                <Input
                  id="form_name"
                  placeholder="e.g., Employee Feedback Form"
                  value={formData.form_name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      form_name: e.target.value,
                    }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Add Field Section */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Field</CardTitle>
              <CardDescription>
                Configure and add a new field to your form
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Field Label */}
              <div className="space-y-2">
                <Label htmlFor="field_label" className="text-sm">
                  Field Label *
                </Label>
                <Input
                  id="field_label"
                  placeholder="e.g., Full Name"
                  value={currentField.field_label}
                  onChange={(e) =>
                    setCurrentField((prev) => ({
                      ...prev,
                      field_label: e.target.value,
                    }))
                  }
                />
              </div>

              {/* Field Type */}
              <div className="space-y-2">
                <Label htmlFor="field_type" className="text-sm">
                  Field Type *
                </Label>
                <Select
                  value={currentField.field_type}
                  onValueChange={(value) =>
                    setCurrentField((prev) => ({
                      ...prev,
                      field_type: value,
                      options:
                        value !== "select" && value !== "checkbox"
                          ? ""
                          : prev.options,
                    }))
                  }
                >
                  <SelectTrigger id="field_type">
                    <SelectValue placeholder="Select field type" />
                  </SelectTrigger>
                  <SelectContent>
                    {fieldTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <Icon size={14} />
                            {type.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Options (for select/checkbox) */}
              {(currentField.field_type === "select" ||
                currentField.field_type === "checkbox") && (
                <div className="space-y-2">
                  <Label htmlFor="options" className="text-sm">
                    Options * (comma-separated)
                  </Label>
                  <Textarea
                    id="options"
                    placeholder="e.g., Excellent,Good,Average,Poor"
                    value={currentField.options}
                    onChange={(e) =>
                      setCurrentField((prev) => ({
                        ...prev,
                        options: e.target.value,
                      }))
                    }
                    className="min-h-[80px]"
                  />
                  <p className="text-xs text-gray-500">
                    Enter options separated by commas
                  </p>
                </div>
              )}

              {/* Required Checkbox */}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="is_required"
                  checked={currentField.is_required}
                  onCheckedChange={(checked) =>
                    setCurrentField((prev) => ({
                      ...prev,
                      is_required: !!checked,
                    }))
                  }
                />
                <Label htmlFor="is_required" className="text-sm cursor-pointer">
                  Required Field
                </Label>
              </div>

              {/* Add Field Button */}
              <Button onClick={addField} className="w-full">
                <Plus size={16} className="mr-2" />
                Add Field
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Form Preview */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Form Preview</CardTitle>
              <CardDescription>
                Preview of your form with {formData.fields.length} field(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {formData.fields.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <List size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No fields added yet</p>
                  <p className="text-sm mt-1">
                    Add fields using the form on the left
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {formData.fields.map((field, index) => {
                    const Icon = getFieldIcon(field.field_type);
                    return (
                      <div
                        key={field.id}
                        className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex flex-col gap-1 mt-1">
                            <button
                              onClick={() => moveField(index, "up")}
                              disabled={index === 0}
                              className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <GripVertical size={16} />
                            </button>
                            <button
                              onClick={() => moveField(index, "down")}
                              disabled={index === formData.fields.length - 1}
                              className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <GripVertical size={16} />
                            </button>
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Icon size={16} className="text-gray-600" />
                              <span className="font-medium">
                                {field.field_label}
                              </span>
                              {field.is_required && (
                                <Badge
                                  variant="default"
                                  className="bg-red-500 text-xs"
                                >
                                  Required
                                </Badge>
                              )}
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <span className="capitalize">
                                {field.field_type}
                              </span>
                              {field.options && (
                                <>
                                  <span>•</span>
                                  <span className="text-xs">
                                    {field.options.split(",").length} options
                                  </span>
                                </>
                              )}
                            </div>

                            {field.options && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {field.options.split(",").map((opt, i) => (
                                  <Badge
                                    key={i}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {opt.trim()}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeField(field.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <Button onClick={handleCancel} variant="outline">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={formData.fields.length === 0 || !formData.form_name}
        >
          Create Form
        </Button>
      </div>
    </div>
  );
};

export default DynamicFormBuilder;

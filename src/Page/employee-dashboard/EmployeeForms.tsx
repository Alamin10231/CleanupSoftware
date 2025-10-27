import { useState } from "react";
import {
  FileText,
  Calendar,
  User,
  ChevronRight,
  Loader2,
  CheckCircle2,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Badge } from "@/Components/ui/badge";
import { toast } from "sonner";
import {
  useAddResponseMutation,
  useGetFormsQuery,
  useSubmitFormMutation,
} from "@/redux/features/admin/custom-form/custome-form.api";
import { useSelector } from "react-redux";
import type { RootState } from "@/Components/Navbar";

interface FormField {
  id: number;
  field_label: string;
  field_type: string;
  is_required: boolean;
  options: string;
  form: number;
}

interface DynamicForm {
  id: number;
  fields: FormField[];
  form_name: string;
  created_at: string;
  admin: number;
}

const EmployeeForms = () => {
  const {
    data: formData,
    isLoading: formLoading,
    isError: formError,
  } = useGetFormsQuery(undefined);
  const [addResponse, { isLoading: isSubmitting }] = useSubmitFormMutation();
  const { user } = useSelector((state: RootState) => state.auth);

  const forms = formData?.results || [];

  const [selectedForm, setSelectedForm] = useState<DynamicForm | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formResponses, setFormResponses] = useState<Record<string, any>>({});

  const handleFormClick = (form: DynamicForm) => {
    setSelectedForm(form);
    setFormResponses({});
    setIsDialogOpen(true);
  };

  const handleInputChange = (fieldId: number, value: any) => {
    setFormResponses((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const validateForm = () => {
    if (!selectedForm) return false;

    for (const field of selectedForm.fields) {
      if (field.is_required) {
        const value = formResponses[field.id];
        if (
          value === undefined ||
          value === null ||
          value === "" ||
          (field.field_type === "checkbox" && !value)
        ) {
          toast.error(`${field.field_label} is required`);
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const data = selectedForm?.fields.reduce((acc, field) => {
      acc[field.field_label] = formResponses[field.id] || "";
      return acc;
    }, {} as Record<string, any>);

    const payload = {
      form: selectedForm?.id,
      response_user: user?.id,
      data,
    };

    try {
      await toast.promise(addResponse(payload).unwrap(), {
        loading: "Submitting form...",
        success: "Form submitted successfully!",
        error: "Failed to submit form",
      });

      console.log("Form submission payload:", JSON.stringify(payload, null, 2));

      // Reset and close
      setFormResponses({});
      setIsDialogOpen(false);
      setSelectedForm(null);
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  };

  const renderFormField = (field: FormField) => {
    const value = formResponses[field.id] || "";

    switch (field.field_type) {
      case "text":
        return (
          <Input
            placeholder={`Enter ${field.field_label.toLowerCase()}`}
            value={value}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          />
        );

      case "email":
        return (
          <Input
            type="email"
            placeholder={`Enter ${field.field_label.toLowerCase()}`}
            value={value}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          />
        );

      case "number":
        return (
          <Input
            type="number"
            placeholder={`Enter ${field.field_label.toLowerCase()}`}
            value={value}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          />
        );

      case "date":
        return (
          <Input
            type="date"
            value={value}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          />
        );

      case "textarea":
        return (
          <Textarea
            placeholder={`Enter ${field.field_label.toLowerCase()}`}
            value={value}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className="min-h-[100px]"
          />
        );

      case "select":
        const options = field.options.split(",").map((opt) => opt.trim());
        return (
          <Select
            value={value}
            onValueChange={(val) => handleInputChange(field.id, val)}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={`Select ${field.field_label.toLowerCase()}`}
              />
            </SelectTrigger>
            <SelectContent>
              {options.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`checkbox-${field.id}`}
              checked={value || false}
              onCheckedChange={(checked) =>
                handleInputChange(field.id, checked)
              }
            />
            <label
              htmlFor={`checkbox-${field.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree
            </label>
          </div>
        );

      default:
        return (
          <Input
            placeholder={`Enter ${field.field_label.toLowerCase()}`}
            value={value}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          />
        );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Available Forms</h1>
        <p className="text-sm text-gray-500 mt-1">
          Select a form to fill out and submit
        </p>
      </div>

      {/* Loading State */}
      {formLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-gray-400" size={32} />
          <span className="ml-3 text-gray-500">Loading forms...</span>
        </div>
      )}

      {/* Error State */}
      {formError && (
        <div className="text-center py-12">
          <FileText className="mx-auto text-red-300 mb-4" size={64} />
          <p className="text-red-500">Failed to load forms</p>
        </div>
      )}

      {/* Forms Grid */}
      {!formLoading && !formError && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {forms.map((form) => (
            <Card
              key={form.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleFormClick(form)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {form.form_name}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <Calendar size={12} />
                        {formatDate(form.created_at)}
                      </CardDescription>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-400" size={20} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Total Fields:</span>
                    <Badge variant="outline">{form.fields.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Required Fields:</span>
                    <Badge variant="outline">
                      {form.fields.filter((f) => f.is_required).length}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <User size={12} />
                    <span>Admin ID: {form.admin}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!formLoading && !formError && forms.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto text-gray-300 mb-4" size={64} />
          <p className="text-gray-500">No forms available</p>
        </div>
      )}

      {/* Form Submission Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText size={20} />
              {selectedForm?.form_name}
            </DialogTitle>
            <DialogDescription>
              Please fill out all required fields marked with *
            </DialogDescription>
          </DialogHeader>

          {selectedForm && (
            <div className="space-y-6 py-4">
              {selectedForm.fields.map((field, index) => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={`field-${field.id}`} className="text-sm">
                    {field.field_label}
                    {field.is_required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </Label>
                  <div id={`field-${field.id}`}>{renderFormField(field)}</div>
                  {field.is_required && !formResponses[field.id] && (
                    <p className="text-xs text-gray-500">
                      This field is required
                    </p>
                  )}
                </div>
              ))}

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setFormResponses({});
                  }}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={16} />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2" size={16} />
                      Submit Form
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeForms;

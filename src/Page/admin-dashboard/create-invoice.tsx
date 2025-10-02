import React, { useState } from 'react';
import { Calendar, Upload, Trash2, Plus } from 'lucide-react';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Textarea } from '@/Components/ui/textarea';

const CreateInvoiceForm = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      service: '',
      description: '',
      quantity: 1,
      unitPrice: 100,
      tax: 0,
      discount: 0,
      lineTotal: 0
    }
  ]);

  const [formData, setFormData] = useState({
    invoiceId: 'INV-2025-001',
    dateIssued: '',
    dueDate: '',
    client: '',
    regionBuilding: '',
    apartment: '',
    notes: 'Payment due within 7 days...'
  });

  const [uploadedFile, setUploadedFile] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addService = () => {
    const newService = {
      id: Date.now(),
      service: '',
      description: '',
      quantity: 1,
      unitPrice: 100,
      tax: 0,
      discount: 0,
      lineTotal: 0
    };
    setServices([...services, newService]);
  };

  const removeService = (id) => {
    setServices(services.filter(s => s.id !== id));
  };

  const updateService = (id, field, value) => {
    setServices(services.map(s => {
      if (s.id === id) {
        const updated = { ...s, [field]: parseFloat(value) || 0 };

        // Calculate line total
        const subtotal = updated.quantity * updated.unitPrice;
        const taxAmount = subtotal * (updated.tax / 100);
        const discountAmount = subtotal * (updated.discount / 100);
        updated.lineTotal = subtotal + taxAmount - discountAmount;

        return updated;
      }
      return s;
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleSaveDraft = () => {
    console.log('Saving draft...', formData, services);
  };

  const handleGenerateInvoice = () => {
    console.log('Generating invoice...', formData, services);
  };

  const handleCancel = () => {
    console.log('Cancelling...');
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Create Invoice</h1>

      {/* Invoice Information */}
      <div className="bg-white rounded-lg border p-6 mb-4">
        <h2 className="text-base font-semibold mb-4">Invoice Information</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="invoiceId" className="text-sm">Invoice ID</Label>
            <Input
              id="invoiceId"
              value={formData.invoiceId}
              onChange={(e) => handleInputChange('invoiceId', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateIssued" className="text-sm">Date Issued</Label>
            <div className="relative">
              <Input
                id="dateIssued"
                type="date"
                placeholder="mm/dd/yyyy"
                value={formData.dateIssued}
                onChange={(e) => handleInputChange('dateIssued', e.target.value)}
                className="pr-10"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="dueDate" className="text-sm">Due Date</Label>
            <div className="relative">
              <Input
                id="dueDate"
                type="date"
                placeholder="mm/dd/yyyy"
                value={formData.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                className="pr-10"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="client" className="text-sm">Client</Label>
            <select
              id="client"
              value={formData.client}
              onChange={(e) => handleInputChange('client', e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Client</option>
              <option value="client1">John Smith</option>
              <option value="client2">Jane Doe</option>
              <option value="client3">Acme Corporation</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="regionBuilding" className="text-sm">Region/Building</Label>
            <select
              id="regionBuilding"
              value={formData.regionBuilding}
              onChange={(e) => handleInputChange('regionBuilding', e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Building</option>
              <option value="building1">Building A - Downtown</option>
              <option value="building2">Building B - Uptown</option>
              <option value="building3">Building C - Suburbs</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="apartment" className="text-sm">Apartment</Label>
            <select
              id="apartment"
              value={formData.apartment}
              onChange={(e) => handleInputChange('apartment', e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Apartment</option>
              <option value="apt1">Apartment 101</option>
              <option value="apt2">Apartment 102</option>
              <option value="apt3">Apartment 201</option>
            </select>
          </div>
        </div>
      </div>

      {/* Services & Items */}
      <div className="bg-white rounded-lg border p-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold">Services & Items</h2>
          <Button onClick={addService} size="sm">
            Add New Row
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-2 font-medium text-gray-700">Service/Package</th>
                <th className="text-left py-2 px-2 font-medium text-gray-700">Description</th>
                <th className="text-left py-2 px-2 font-medium text-gray-700">Quantity</th>
                <th className="text-left py-2 px-2 font-medium text-gray-700">Unit Price</th>
                <th className="text-left py-2 px-2 font-medium text-gray-700">Tax %</th>
                <th className="text-left py-2 px-2 font-medium text-gray-700">Discount %</th>
                <th className="text-left py-2 px-2 font-medium text-gray-700">Line Total</th>
                <th className="text-left py-2 px-2 font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="border-b">
                  <td className="py-2 px-2">
                    <select
                      value={service.service}
                      onChange={(e) => updateService(service.id, 'service', e.target.value)}
                      className="w-32 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Service</option>
                      <option value="cleaning">Cleaning Service</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="security">Security</option>
                    </select>
                  </td>
                  <td className="py-2 px-2">
                    <Input
                      placeholder="Optional description"
                      value={service.description}
                      onChange={(e) => updateService(service.id, 'description', e.target.value)}
                      className="w-40 text-sm"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <Input
                      type="number"
                      value={service.quantity}
                      onChange={(e) => updateService(service.id, 'quantity', e.target.value)}
                      className="w-16 text-sm"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <Input
                      type="number"
                      step="0.01"
                      value={service.unitPrice}
                      onChange={(e) => updateService(service.id, 'unitPrice', e.target.value)}
                      className="w-24 text-sm"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <Input
                      type="number"
                      value={service.tax}
                      onChange={(e) => updateService(service.id, 'tax', e.target.value)}
                      className="w-16 text-sm"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <Input
                      type="number"
                      value={service.discount}
                      onChange={(e) => updateService(service.id, 'discount', e.target.value)}
                      className="w-16 text-sm"
                    />
                  </td>
                  <td className="py-2 px-2 font-medium">
                    ${service.lineTotal.toFixed(2)}
                  </td>
                  <td className="py-2 px-2">
                    <button
                      onClick={() => removeService(service.id)}
                      className="text-red-500 hover:text-red-700"
                      disabled={services.length === 1}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notes & Attachments */}
      <div className="bg-white rounded-lg border p-6 mb-4">
        <h2 className="text-base font-semibold mb-4">Notes & Attachments</h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm">Invoice Notes</Label>
            <Textarea
              id="notes"
              placeholder={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm">File Upload</Label>
            <div
              className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-gray-50 transition"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                id="fileUpload"
                type="file"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Upload className="mx-auto text-gray-400 mb-2" size={32} />
              <p className="text-sm text-gray-600 mb-1">
                Drag and drop files here or{' '}
                <button
                  onClick={() => document.getElementById('fileUpload').click()}
                  className="text-blue-600 hover:underline"
                >
                  browse
                </button>
              </p>
              {uploadedFile && (
                <p className="text-sm text-green-600 mt-2">
                  Uploaded: {uploadedFile.name}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="outline" onClick={handleSaveDraft}>
          Save Draft
        </Button>
        <Button onClick={handleGenerateInvoice}>
          Generate Invoice
        </Button>
      </div>
    </div>
  );
};

export default CreateInvoiceForm;

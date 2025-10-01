import React, { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Button } from '@/Components/ui/button';
import { Switch } from '@/Components/ui/switch';
import { Textarea } from '@/Components/ui/textarea';

const AddNewPlanForm = () => {
  const [autoRenewal, setAutoRenewal] = useState(true);
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Deep...',
      description: '',
      unitPrice: 150.00,
      quantity: 1,
      total: 150.00
    },
    {
      id: 2,
      name: 'Carpet...',
      description: '',
      unitPrice: 75.00,
      quantity: 2,
      total: 150.00
    }
  ]);

  const [formData, setFormData] = useState({
    planName: '',
    planCode: '',
    description: '',
    category: '',
    billingCycle: 'Monthly',
    currency: 'USD',
    price: '0.00',
    discount: '0'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addService = () => {
    const newService = {
      id: Date.now(),
      name: '',
      description: '',
      unitPrice: 0,
      quantity: 1,
      total: 0
    };
    setServices([...services, newService]);
  };

  const removeService = (id) => {
    setServices(services.filter(s => s.id !== id));
  };

  const updateService = (id, field, value) => {
    setServices(services.map(s => {
      if (s.id === id) {
        const updated = { ...s, [field]: value };
        if (field === 'unitPrice' || field === 'quantity') {
          updated.total = (updated.unitPrice || 0) * (updated.quantity || 0);
        }
        return updated;
      }
      return s;
    }));
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Add New Plan</h1>

      {/* Basic Plan Information */}
      <div className="border rounded-lg p-6 mb-6">
        <h2 className="text-base font-semibold mb-4">Basic Plan Information</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="planName" className="text-sm">Plan Name</Label>
            <Input
              id="planName"
              placeholder="e.g. Standard Cleaning Package"
              value={formData.planName}
              onChange={(e) => handleInputChange('planName', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="planCode" className="text-sm">Plan Code</Label>
            <Input
              id="planCode"
              placeholder="PLAN-001"
              value={formData.planCode}
              onChange={(e) => handleInputChange('planCode', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <Label htmlFor="description" className="text-sm">Description</Label>
          <Textarea
            id="description"
            placeholder="Short details about the plan..."
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category" className="text-sm">Category / Type</Label>
          <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cleaning">Cleaning</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Pricing & Duration */}
      <div className="border rounded-lg p-6 mb-6">
        <h2 className="text-base font-semibold mb-4">Pricing & Duration</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="billingCycle" className="text-sm">Billing Cycle</Label>
            <Select value={formData.billingCycle} onValueChange={(value) => handleInputChange('billingCycle', value)}>
              <SelectTrigger id="billingCycle">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Monthly">Monthly</SelectItem>
                <SelectItem value="Quarterly">Quarterly</SelectItem>
                <SelectItem value="Yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price" className="text-sm">Price</Label>
            <div className="flex gap-2">
              <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 items-end">
          <div className="space-y-2">
            <Label htmlFor="discount" className="text-sm">Discount (%)</Label>
            <Input
              id="discount"
              type="number"
              placeholder="0"
              value={formData.discount}
              onChange={(e) => handleInputChange('discount', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-2 items-center">
            <Label className="text-sm">Auto-renewal</Label>
            <div className="flex items-center w-fit gap-2">
              <Switch
                id="autoRenewal"
                checked={autoRenewal}
                onCheckedChange={setAutoRenewal}
              />
              <span className="text-sm text-gray-600">{autoRenewal ? 'ON' : 'OFF'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Services Included */}
      <div className="border rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold">Services Included</h2>
          <Button onClick={addService} size="sm">
            <Plus size={16} className="mr-1" />
            Add Service
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-2 font-medium text-gray-700">Service Name</th>
                <th className="text-left py-2 px-2 font-medium text-gray-700">Description</th>
                <th className="text-left py-2 px-2 font-medium text-gray-700">Unit Price</th>
                <th className="text-left py-2 px-2 font-medium text-gray-700">Quantity</th>
                <th className="text-left py-2 px-2 font-medium text-gray-700">Line Total</th>
                <th className="text-left py-2 px-2 font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="border-b">
                  <td className="py-2 px-2">
                    <Select
                      value={service.name}
                      onValueChange={(value) => updateService(service.id, 'name', value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Deep...">Deep Cleaning</SelectItem>
                        <SelectItem value="Carpet...">Carpet Cleaning</SelectItem>
                        <SelectItem value="Window...">Window Cleaning</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="py-2 px-2">
                    <Input
                      placeholder="Optional description"
                      value={service.description}
                      onChange={(e) => updateService(service.id, 'description', e.target.value)}
                      className="w-40"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <Input
                      type="number"
                      step="0.01"
                      value={service.unitPrice}
                      onChange={(e) => updateService(service.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                      className="w-24"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <Input
                      type="number"
                      value={service.quantity}
                      onChange={(e) => updateService(service.id, 'quantity', parseInt(e.target.value) || 0)}
                      className="w-16"
                    />
                  </td>
                  <td className="py-2 px-2 font-medium">
                    ${service.total.toFixed(2)}
                  </td>
                  <td className="py-2 px-2">
                    <button
                      onClick={() => removeService(service.id)}
                      className="text-red-500 hover:text-red-700"
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

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Save Draft</Button>
          <Button>Create Plan</Button>
        </div>
      </div>
    </div>
  );
};

export default AddNewPlanForm;

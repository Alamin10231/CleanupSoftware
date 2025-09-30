import React, { useState } from 'react';
import { Camera, Mail, Bell, MessageSquare, Laptop, Smartphone, Shield } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Badge } from '@/Components/ui/badge';
import { Switch } from '@/Components/ui/switch';
import { Checkbox } from '@/Components/ui/checkbox';

const ProfileSettingsPage = () => {
  const [profileData, setProfileData] = useState({
    fullName: 'MR. Mosabbir',
    email: 'mosabbir@company.com',
    phone: '+1 (555) 123-4567',
    role: 'Admin'
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: false,
    whatsappUpdates: true,
    markAsRead: false
  });

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactor: false
  });

  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationToggle = (field) => {
    setNotifications(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSecurityChange = (field, value) => {
    setSecurity(prev => ({ ...prev, [field]: value }));
  };

  const handleVerifyPhone = () => {
    console.log('Verifying phone number...');
  };

  const handleUpdatePassword = () => {
    console.log('Updating password...');
  };

  const handleDeviceLogout = (device) => {
    console.log(`Logging out from ${device}...`);
  };

  return (
    <div className='space-y-6'>
      {/* Profile Settings */}
      <div className="bg-white rounded-lg border p-6">
        <div className="mb-6">
          <h1 className="text-xl font-semibold">Profile Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Update your personal information and account details.</p>
        </div>

        {/* Profile Picture */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mosabbir"
                alt="Profile"
                className="w-16 h-16 rounded-full"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-700">
              <Camera size={14} />
            </button>
          </div>
          <div>
            <Button size="sm">Change Picture</Button>
            <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF. Max size of 1MB</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm">Full Name</Label>
            <Input
              id="fullName"
              value={profileData.fullName}
              onChange={(e) => handleProfileChange('fullName', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={profileData.email}
              onChange={(e) => handleProfileChange('email', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm">Phone Number</Label>
            <div className="flex gap-2">
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) => handleProfileChange('phone', e.target.value)}
                className="flex-1"
              />
              <Button variant="outline" size="sm" onClick={handleVerifyPhone}>
                Verify
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm">Role</Label>
            <div className="flex items-center h-10">
              <Badge className="bg-green-100 text-green-700 border-green-200">
                <Shield size={14} className="mr-1" />
                {profileData.role}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold mb-4">Notification Preferences</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail size={20} className="text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-sm">Email Alerts</div>
                <div className="text-xs text-gray-500">Get notified about new updates via email</div>
              </div>
            </div>
            <Switch
              checked={notifications.emailAlerts}
              onCheckedChange={() => handleNotificationToggle('emailAlerts')}
            />
          </div>

          <div className="flex items-center justify-between py-3 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <MessageSquare size={20} className="text-green-600" />
              </div>
              <div>
                <div className="font-medium text-sm">WhatsApp Updates</div>
                <div className="text-xs text-gray-500">Get updates via WhatsApp messages</div>
              </div>
            </div>
            <Switch
              checked={notifications.whatsappUpdates}
              onCheckedChange={() => handleNotificationToggle('whatsappUpdates')}
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Checkbox
              id="markAsRead"
              checked={notifications.markAsRead}
              onCheckedChange={() => handleNotificationToggle('markAsRead')}
            />
            <Label htmlFor="markAsRead" className="text-sm text-gray-600 cursor-pointer">
              Mark all notifications as read automatically after 7 days
            </Label>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold mb-4">Security Settings</h2>

        <div className="space-y-4 mb-6">
          <h3 className="text-sm font-semibold">Change Password</h3>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-sm">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={security.currentPassword}
                onChange={(e) => handleSecurityChange('currentPassword', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-sm">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={security.newPassword}
                onChange={(e) => handleSecurityChange('newPassword', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={security.confirmPassword}
                onChange={(e) => handleSecurityChange('confirmPassword', e.target.value)}
              />
            </div>
          </div>

          <Button onClick={handleUpdatePassword}>Update Password</Button>
        </div>

        <div className="border-t pt-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">Two-Factor Authentication</h3>
              <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
            </div>
            <Switch
              checked={security.twoFactor}
              onCheckedChange={(checked) => handleSecurityChange('twoFactor', checked)}
            />
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-sm font-semibold mb-4">Active Devices</h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border">
                  <Laptop size={20} className="text-gray-600" />
                </div>
                <div>
                  <div className="font-medium text-sm">MacBook Pro</div>
                  <div className="text-xs text-gray-500">Currently active now</div>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                Current
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border">
                  <Smartphone size={20} className="text-gray-600" />
                </div>
                <div>
                  <div className="font-medium text-sm">iPhone 14</div>
                  <div className="text-xs text-gray-500">Safari • 5 hours ago</div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => handleDeviceLogout('iPhone 14')}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;

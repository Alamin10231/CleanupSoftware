import React, { useState, useEffect, ChangeEvent } from 'react';
import { Mail, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '@reduxjs/toolkit/query';
import { useUpdateProfileMutation } from '@/redux/features/Client/profile.api';

const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop";

interface FormData {
  firstName: string;
  email: string;
  country: string;
  phone: string;
  avatar: string;
}

const ClientProfile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const [formData, setFormData] = useState<FormData>({
    firstName: user?.name || '',
    email: user?.email || '',
    country: 'Saudi Arabia',
    phone: user?.prime_phone || '',
    avatar: user?.client_profile?.avatar || DEFAULT_AVATAR,
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.name,
        email: user.email,
        country: 'Saudi Arabia',
        phone: user.prime_phone || '',
        avatar: user.client_profile?.avatar || DEFAULT_AVATAR,
      });
    }
  }, [user]);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFormData({ ...formData, avatar: URL.createObjectURL(file) });
  };

  const handleSave = async () => {
    try {
      await updateProfile({
        id: user?.id,
        name: formData.firstName,
        email: formData.email,
        prime_phone: formData.phone,
        country: formData.country,
        avatar: formData.avatar,
      }).unwrap();

      alert('Profile updated successfully!');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  return (
    <div className="min-h-[80vh] p-6 bg-gray-50">
      <div className="w-full bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-2xl font-semibold text-blue-600 mb-8">Profile</h1>

        {/* Profile Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img src={formData.avatar || DEFAULT_AVATAR} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
            <div>
              <h2 className="text-lg font-medium text-gray-900">{formData.firstName}</h2>
              <p className="text-sm text-gray-500">{formData.email}</p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
          >
            Edit
          </button>
        </div>

        {/* Display Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <p className="text-gray-900">{formData.firstName || 'Not set'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
            <p className="text-gray-900">{formData.country}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <p className="text-gray-900">{formData.phone || 'Not set'}</p>
          </div>
        </div>

        {/* Email Section */}
        <div className="mt-8">
          <label className="block text-sm font-medium text-gray-900 mb-4">My Email Address</label>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md max-w-md">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-grow">
              <p className="text-sm font-medium text-gray-900">{formData.email}</p>
              <p className="text-xs text-gray-500">{new Date(user?.date_joined || Date.now()).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Edit Profile</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <img src={formData.avatar || DEFAULT_AVATAR} alt="avatar" className="w-20 h-20 rounded-full object-cover" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="border p-2 rounded-md"
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Read-only fields */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <input type="text" value={formData.country} disabled className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed" />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientProfile;

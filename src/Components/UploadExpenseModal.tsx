import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadExpenseModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0  backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-[600px] p-6 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Upload Expense</h2>
          <button onClick={onClose} className="text-gray-500 text-lg">✖</button>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Vendor Name" className="border rounded px-3 py-2 w-full" />
            <select className="border rounded px-3 py-2 w-full">
              <option value="">Expense Category</option>
              <option value="Travel">Travel</option>
              <option value="Supplies">Supplies</option>
              <option value="Utilities">Utilities</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input type="date" className="border rounded px-3 py-2 w-full" />
            <input type="number" placeholder="Amount" className="border rounded px-3 py-2 w-full" />
          </div>

          <textarea placeholder="Description/Notes" className="border rounded px-3 py-2 w-full h-24" />

          {/* File Upload */}
          <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center">
            <p className="text-gray-500">Attach Receipt</p>
            <p className="text-sm text-gray-400">Accepted formats: PDF, JPG, PNG. Max size: 5MB</p>
            <input type="file" className="hidden" id="fileUpload" />
            <label htmlFor="fileUpload" className="mt-2 inline-block px-4 py-2 bg-gray-100 rounded cursor-pointer">
              Upload File
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 cursor-pointer"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white cursor-pointer">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadExpenseModal;

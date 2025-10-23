import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";

interface UploadExpenseModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSubmit: (data: { vendor: string; category: string; amount: number; description: string; receiptFile: File | null }) => void;
}

const UploadExpenseModal = ({ isOpen, setIsOpen, onSubmit }: UploadExpenseModalProps) => {
  const [vendor, setVendor] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  const handleSave = () => {
    onSubmit({ vendor, category, amount, description, receiptFile });
    setVendor("");
    setCategory("");
    setAmount(0);
    setDescription("");
    setReceiptFile(null);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[825px] md:min-h-[600px]">
        <DialogHeader>
          <DialogTitle>Upload Expense</DialogTitle>
          <DialogDescription>Fill out the details to upload a new expense.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Label>Vendor Name</Label>
              <Input placeholder="Enter vendor name" value={vendor} onChange={(e) => setVendor(e.target.value)} />
            </div>
            <div className="grid gap-3">
              <Label>Expense Category</Label>
              <Input placeholder="Enter category" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
          </div>

          <div className="grid gap-3">
            <Label>Amount</Label>
            <Input type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value) || 0)} />
          </div>

          <div className="grid gap-3">
            <Label>Description/Notes</Label>
            <textarea
              placeholder="Enter description or notes"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-lg min-h-[150px]"
            />
          </div>

          <div className="grid gap-3 border-dotted border-gray-200 border-3 text-center py-4">
            <Label className="text-lg font-bold">Attach Receipt</Label>
            {receiptFile && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{receiptFile.name}</span>
                <button type="button" onClick={() => setReceiptFile(null)} className="text-sm text-red-600 hover:text-red-800">
                  Remove
                </button>
              </div>
            )}
            <div className="text-sm text-black mt-2">Accepted formats: PDF, JPG, PNG. Max size: 5MB</div>
            <input type="file" className="hidden" id="uploadFile" onChange={(e) => setReceiptFile(e.target.files?.[0] || null)} />
            <label htmlFor="uploadFile" className="cursor-pointer px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold">
              Upload File
            </label>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadExpenseModal;

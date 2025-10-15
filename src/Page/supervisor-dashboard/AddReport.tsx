import React from 'react';
import { useForm } from 'react-hook-form';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Textarea } from '@/Components/ui/textarea';

const AddReportForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl font-semibold mb-6">Add New Report</h1>

      <div className="bg-white rounded-lg border p-6 mb-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm">Report Title</Label>
            <Input id="title" {...register('title')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm">Description</Label>
            <Textarea id="description" {...register('description')} className="min-h-[100px]" />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit">Submit Report</Button>
      </div>
    </form>
  );
};

export default AddReportForm;

import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const ServiceForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    address: '',
    description: '',
    postalCode: '',
    locationCoordinates: {
      type: 'Point',
      coordinates: [0, 0]
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDescriptionChange = (content) => {
    setFormData(prev => ({
      ...prev,
      description: content
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      // Reset form
      setFormData({
        name: '',
        category: '',
        address: '',
        description: '',
        postalCode: '',
        locationCoordinates: {
          type: 'Point',
          coordinates: [0, 0]
        }
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Service Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Select a category</option>
          <option value="Food Banks">Food Banks</option>
          <option value="Shelters">Shelters</option>
          <option value="Legal Aid">Legal Aid</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Postal Code
        </label>
        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <Editor
          apiKey="your-tiny-mce-api-key"
          init={{
            height: 300,
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
              'preview', 'anchor', 'searchreplace', 'visualblocks', 'code',
              'fullscreen', 'insertdatetime', 'media', 'table', 'code', 'help',
              'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help'
          }}
          value={formData.description}
          onEditorChange={handleDescriptionChange}
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Service
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;
import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const ServiceForm = ({ editMode = false, serviceData = null }) => {
  const [formData, setFormData] = useState({
    name: editMode ? serviceData.name : '',
    category: editMode ? serviceData.category : '',
    address: editMode ? serviceData.address : '',
    description: editMode ? serviceData.description : '',
    postalCode: '',
    locationCoordinates: {
      type: 'Point',
      coordinates: [-123.2460, 49.2606] // UBC coordinates
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [editorRef, setEditorRef] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const dataToSubmit = {
        ...formData,
        locationCoordinates: {
          type: 'Point',
          coordinates: [-123.2460, 49.2606] // UBC coordinates
        }
      };

      const response = await fetch('http://localhost:5001/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        throw new Error('Failed to add service');
      }

      setSuccess(true);
      setFormData({
        name: '',
        category: '',
        address: '',
        description: '',
        postalCode: '',
        locationCoordinates: {
          type: 'Point',
          coordinates: [-123.2460, 49.2606]
        }
      });

      if (editorRef) {
        editorRef.setContent('');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Service</h2>
      
      {success && (
        <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
          Service added successfully!
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
            placeholder="Enter service name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Category</option>
            <option value="Food Banks">Food Banks</option>
            <option value="Shelters">Shelters</option>
            <option value="Legal Aid">Legal Aid</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
            placeholder="Enter full address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Postal Code
          </label>
          <input
            type="text"
            value={formData.postalCode}
            onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
            placeholder="Enter postal code"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <Editor
            apiKey="70u2lngv8ojlrncak4zniddsuhauj9cf69mnnwuqwmggxc2c"
            onInit={(evt, editor) => setEditorRef(editor)}
            initialValue=""
            init={{
              height: 300,
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                'preview', 'anchor', 'searchreplace', 'visualblocks',
                'fullscreen', 'insertdatetime', 'media', 'table', 'help',
                'wordcount'
              ],
              toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              branding: false,
              promotion: false
            }}
            onEditorChange={(content) => setFormData(prev => ({...prev, description: content}))}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
            ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        >
          {loading ? 'Adding Service...' : 'Add Service'}
        </button>
      </form>
    </div>
  );
};

export default ServiceForm;
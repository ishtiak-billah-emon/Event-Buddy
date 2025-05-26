"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { addEvent } from '../../../utils/localStorage';
import { compressImage } from '../../../utils/imageUtils';

export default function CreateEvent() {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
    location: '',
    capacity: '',
    tags: '',
    image: null,
    imagePreview: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user || user.role !== 'admin') {
    router.push('/login');
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Image size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          // Compress the image before storing
          const compressedImage = await compressImage(reader.result);
          setFormData(prev => ({
            ...prev,
            image: file,
            imagePreview: compressedImage
          }));
        } catch (error) {
          console.error('Error compressing image:', error);
          alert('Error processing image. Please try again.');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      handleImageFile(file);
    } else {
      alert('Please drop a valid image file (JPG or PNG)');
    }
  };

  const handleImageFile = (file) => {
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        // Compress the image before storing
        const compressedImage = await compressImage(reader.result);
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: compressedImage
        }));
      } catch (error) {
        console.error('Error compressing image:', error);
        alert('Error processing image. Please try again.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.date || !formData.time || !formData.location || !formData.capacity) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setIsSubmitting(true);

      // Convert capacity to number and validate
      const capacity = parseInt(formData.capacity);
      if (isNaN(capacity) || capacity <= 0) {
        alert('Please enter a valid capacity number');
        return;
      }

      const newEvent = {
        title: formData.title,
        date: formData.date,
        time: formData.time,
        description: formData.description || '',
        location: formData.location,
        capacity: capacity,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
        image: formData.imagePreview || ''
      };

      const createdEvent = addEvent(newEvent);
      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event. Please try again. Error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 max-w-4xl mx-auto w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-navy-700">
          Create New Event
        </h2>
        <button
          onClick={() => router.push("/admin/dashboard")}
          className="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time
            </label>
            <input
              type="text"
              name="time"
              placeholder="e.g. 09:00 AM - 11:00 AM"
              value={formData.time}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Capacity
            </label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
              min="1"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (comma separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="music, concert, live"
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image
          </label>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center"
          >
            {formData.imagePreview ? (
              <div className="relative">
                <img
                  src={formData.imagePreview}
                  alt="Preview"
                  className="max-h-40 mx-auto"
                />
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      image: null,
                      imagePreview: null,
                    }))
                  }
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  ×
                </button>
              </div>
            ) : (
              <>
                <div className="text-gray-600 mb-2">
                  Drag or upload the picture here
                </div>
                <div className="text-sm text-gray-500 mb-4">
                  Max 5MB | JPG, PNG
                </div>
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("imageInput").click()
                  }
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Browse
                </button>
              </>
            )}
            <input
              id="imageInput"
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => router.push("/admin/dashboard")}
            className="px-6 py-2 border rounded-md hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Event'}
          </button>
        </div>
      </form>
    </div>
  );
}

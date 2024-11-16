import React, { useState } from 'react';
import { createCause } from '../api/causes';
import useAuthStore from '../store/authStore';

const Dashboard = () => {
  const { user, token } = useAuthStore();
  const [showCauseModal, setShowCauseModal] = useState(false);
  const [newCause, setNewCause] = useState({
    title: '',
    description: '',
    goalAmount: '',
    category: '',
    endDate: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCause((prevCause) => ({
      ...prevCause,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await createCause(
        {
          title: newCause.title,
          description: newCause.description,
          goalAmount: parseInt(newCause.goalAmount),
          category: newCause.category,
          endDate: new Date(newCause.endDate).toISOString()
        },
        token
      );
      console.log('Cause created successfully:', response);
      setShowCauseModal(false);
      // Optionally, update the list of causes or show a success message
    } catch (error) {
      console.error("Error creating cause:", error.response?.data || error.message);
      setError(error.response?.data?.message || 'An error occurred while creating the cause');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">NGO Dashboard</h1>
        <button 
          onClick={() => setShowCauseModal(true)}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition flex items-center gap-2"
        >
          <span className="text-lg font-bold">+</span>
          Create New Cause
        </button>
      </div>

      {showCauseModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Add New Cause</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
              <label className="block mb-2">
                <span>Title</span>
                <input
                  type="text"
                  name="title"
                  value={newCause.title}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded mt-1"
                  required
                />
              </label>
              <label className="block mb-2">
                <span>Description</span>
                <textarea
                  name="description"
                  value={newCause.description}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded mt-1"
                  required
                ></textarea>
              </label>
              <label className="block mb-2">
                <span>Goal Amount (₹)</span>
                <input
                  type="number"
                  name="goalAmount"
                  value={newCause.goalAmount}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded mt-1"
                  required
                />
              </label>
              <label className="block mb-2">
                <span>Category</span>
                <select
                  name="category"
                  value={newCause.category}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded mt-1"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="environment">Environment</option>
                  <option value="disaster-relief">Disaster Relief</option>
                  <option value="poverty-alleviation">Poverty Alleviation</option>
                </select>
              </label>
              <label className="block mb-2">
                <span>End Date</span>
                <input
                  type="date"
                  name="endDate"
                  value={newCause.endDate}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded mt-1"
                  required
                />
              </label>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowCauseModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  Save Cause
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Rest of your dashboard content */}
    </div>
  );
};

export default Dashboard;
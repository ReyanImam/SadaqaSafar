import React, { useState, useEffect } from 'react';
import { createCause, getNGOCauses } from '../api/causes';
import useAuthStore from '../store/authStore';


const NGODashboard = () => {
  const { user, token } = useAuthStore();
  const [showCauseModal, setShowCauseModal] = useState(false);
  const [causes, setCauses] = useState([]);
  const [newCause, setNewCause] = useState({
    title: '',
    description: '',
    goalAmount: '',
    category: '',
    endDate: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCauses();
  }, [user._id]);

  const fetchCauses = async () => {
    if (!user || !user._id) return;
    try {
      setLoading(true);
      const fetchedCauses = await getNGOCauses(user._id);
      setCauses(fetchedCauses);
    } catch (error) {
      setError('Failed to fetch causes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCause(prevCause => ({
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
      setShowCauseModal(false);
      fetchCauses(); // Refresh the causes list
      setNewCause({ title: '', description: '', goalAmount: '', category: '', endDate: '' });
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while creating the cause');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">

        <h1 className="text-3xl font-bold text-gray-900">NGO Dashboard</h1>
        
        <button 
          onClick={() => setShowCauseModal(true)}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition flex items-center gap-2"
        >
          <span className="text-lg font-bold">+</span>
          Create New Cause
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <p className="text-center text-gray-600">Loading causes...</p>
      ) : causes.length === 0 ? (
        <p className="text-center text-gray-600">No causes found. Create your first cause!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {causes.map((cause) => (
            <div key={cause._id} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">{cause.title}</h2>
              <p className="text-gray-600 mb-4">{cause.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Goal: ₹{cause.goalAmount}</span>
                <span>Category: {cause.category}</span>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Ends on: {new Date(cause.endDate).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}

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
    </div>
  );
};

export default NGODashboard;
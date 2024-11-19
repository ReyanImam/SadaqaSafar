import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Building2, MapPin, Calendar, DollarSign } from 'lucide-react';
import { getNGOById } from '../api/ngo';
import { getNGOCauses } from '../api/causes';


const NGODetails = () => {
  const { id } = useParams();
  const [ngo, setNGO] = useState(null);
  const [causes, setCauses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNGOAndCauses = async () => {
      try {
        if (!id) {
          throw new Error('NGO ID is required');
        }

        console.log('Fetching NGO details for ID:', id);
        const ngoData = await getNGOById(id);
        console.log('Fetched NGO data:', ngoData);
        
        if (!ngoData) {
          throw new Error('NGO not found');
        }
        
        setNGO(ngoData);
        console.log('NGO Data ID:', ngoData._id);

        console.log('Fetching causes for NGO ID:', ngoData._id);
        const causesData = await getNGOCauses(ngoData._id);
        console.log('Fetched causes data:', causesData);
        
        if (Array.isArray(causesData)) {
          setCauses(causesData);
        } else {
          console.error('Causes data is not an array:', causesData);
          setCauses([]);
        }
      } catch (error) {
        console.error('Error fetching NGO details:', error);
        setError(error.message || 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchNGOAndCauses();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-2xl mt-8 text-red-600">{error}</div>;
  }

  if (!ngo) {
    return <div className="text-center text-2xl mt-8">NGO not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <img
          src={ngo.logo || 'https://via.placeholder.com/800x300'}
          alt={ngo.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{ngo.name}</h1>
          <div className="flex items-center text-gray-600 mb-4">
            <Building2 className="w-5 h-5 mr-2" />
            <span>{ngo.domain}</span>
            <MapPin className="w-5 h-5 ml-4 mr-2" />
            <span>{ngo.location}</span>
          </div>
          <p className="text-gray-700 mb-4">{ngo.description}</p>
          {ngo.verified && (
            <span className="bg-emerald-100 text-emerald-600 text-sm px-3 py-1 rounded-full">
              Verified
            </span>
          )}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Active Causes</h2>
      {causes.length === 0 ? (
        <p className="text-center text-gray-600">No active causes at the moment.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {causes.map((cause) => (
            <div key={cause._id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <img
                src={cause.images?.[0] || 'https://via.placeholder.com/800x300'}
                alt={cause.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{cause.title}</h3>
                <p className="text-gray-600 mb-4">{cause.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{new Date(cause.endDate).toLocaleDateString()}</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-600 text-sm px-2 py-1 rounded-full">
                    {cause.category}
                  </span>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{Math.round((cause.raisedAmount / cause.goalAmount) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-emerald-600 h-2.5 rounded-full"
                      style={{ width: `${(cause.raisedAmount / cause.goalAmount) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-gray-600">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    <span>{cause.raisedAmount || 0}</span> / <span>{cause.goalAmount}</span>
                  </div>
                  <Link
                    to={`/donate/${cause._id}`}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
                  >
                    Donate Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NGODetails;
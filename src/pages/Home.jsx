import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Building2, ArrowRight } from 'lucide-react';
import useAuthStore from '../store/authStore'; // Import auth store

const Home = () => {
  const { user } = useAuthStore();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 px-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Make a Difference with
          <span className="text-emerald-600"> SadaqaSafar</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Connect with verified NGOs and contribute to meaningful causes. Every donation brings hope and creates positive change.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/ngos"
            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
          >
            Explore NGOs
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          {/* Conditionally render these buttons based on whether a user is logged in */}
          {!user && (
            <>
              <Link
                to="/ngo-register"
                className="inline-flex items-center px-6 py-3 border-2 border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition"
              >
                Register as NGO
              </Link>
              <Link
                to="/ngo-login"
                className="inline-flex items-center px-6 py-3 border-2 border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition"
              >
                Login as NGO
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
            <Heart className="h-6 w-6 text-emerald-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Trusted Donations</h3>
          <p className="text-gray-600">
            Every NGO is verified to ensure your donations reach the right causes.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-emerald-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Direct Impact</h3>
          <p className="text-gray-600">
            Track your donations and see the real impact you're making.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
            <Building2 className="h-6 w-6 text-emerald-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Verified NGOs</h3>
          <p className="text-gray-600">
            Connect with legitimate organizations working for noble causes.
          </p>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-white p-8 rounded-xl shadow-sm">
        <h2 className="text-3xl font-bold text-center mb-8">Our Impact</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-emerald-600 mb-2">1000+</div>
            <div className="text-gray-600">Verified NGOs</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-emerald-600 mb-2">₹10M+</div>
            <div className="text-gray-600">Donations Facilitated</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-emerald-600 mb-2">100K+</div>
            <div className="text-gray-600">Lives Impacted</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

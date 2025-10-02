import { useState, useEffect } from 'react';
import { activitiesAPI } from '../services/api';

export default function ActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const data = await activitiesAPI.getActivities();
      setActivities(data);
    } catch (err) {
      setError('Failed to load activities');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalProgress = () => {
    if (activities.length === 0) return 0;
    const totalPrice = activities.reduce((sum, act) => sum + parseFloat(act.price), 0);
    const totalDonated = activities.reduce((sum, act) => sum + parseFloat(act.donated_amount), 0);
    return totalPrice > 0 ? (totalDonated / totalPrice) * 100 : 0;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading activities...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">{error}</p>
          <button 
            onClick={loadActivities}
            className="px-4 py-2 bg-wedding-primary text-white rounded hover:bg-wedding-accent"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const totalProgress = calculateTotalProgress();
  const totalPrice = activities.reduce((sum, act) => sum + parseFloat(act.price), 0);
  const totalDonated = activities.reduce((sum, act) => sum + parseFloat(act.donated_amount), 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-wedding-secondary to-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif text-wedding-accent mb-4">
            Honeymoon Adventures
          </h1>
          <p className="text-xl text-gray-600">
            Help us create unforgettable memories
          </p>
        </div>

        {/* Overall Progress */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-serif text-wedding-accent">Overall Progress</h2>
            <span className="text-3xl font-bold text-wedding-primary">
              {totalProgress.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
            <div 
              className="bg-wedding-primary h-6 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, totalProgress)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Raised: {formatCurrency(totalDonated)}</span>
            <span>Goal: {formatCurrency(totalPrice)}</span>
          </div>
        </div>

        {/* Activities Grid */}
        {activities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No activities available yet.</p>
            <p className="text-gray-500 mt-2">Please add activities in the Django admin panel.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity) => (
              <div 
                key={activity.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Activity Image */}
                {activity.image_url && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={activity.image_url}
                      alt={activity.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                {/* Activity Content */}
                <div className="p-6">
                  <h3 className="text-xl font-serif text-wedding-accent mb-2">
                    {activity.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {activity.description}
                  </p>
                  
                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Target</span>
                      <span className="font-semibold">{formatCurrency(activity.price)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Donated</span>
                      <span className="font-semibold text-wedding-primary">
                        {formatCurrency(activity.donated_amount)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-3">
                      <span>Remaining</span>
                      <span className="font-semibold">
                        {formatCurrency(activity.remaining_amount)}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className="bg-wedding-primary h-4 rounded-full transition-all duration-500 flex items-center justify-center text-xs text-white font-semibold"
                        style={{ width: `${Math.min(100, activity.donation_percentage)}%` }}
                      >
                        {activity.donation_percentage > 10 && `${activity.donation_percentage.toFixed(0)}%`}
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  {activity.donation_percentage >= 100 ? (
                    <div className="bg-green-100 text-green-800 text-center py-2 rounded font-semibold">
                      ✓ Fully Funded!
                    </div>
                  ) : (
                    <div className="bg-wedding-secondary text-wedding-accent text-center py-2 rounded">
                      {activity.donation_percentage.toFixed(1)}% Funded
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

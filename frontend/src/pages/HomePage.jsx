import { useState, useEffect } from 'react';
import { weddingAPI } from '../services/api';

export default function HomePage() {
  const [weddingInfo, setWeddingInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadWeddingInfo();
  }, []);

  const loadWeddingInfo = async () => {
    try {
      const data = await weddingAPI.getWeddingInfo();
      setWeddingInfo(data);
    } catch (err) {
      setError('Failed to load wedding information');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error || !weddingInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">{error || 'No wedding information available'}</p>
          <p className="text-gray-600">Please add wedding details in the Django admin panel</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-wedding-secondary to-white">
      {/* Hero Section */}
      <div className="relative h-96 bg-wedding-primary overflow-hidden">
        {weddingInfo.hero_image_url && (
          <img 
            src={weddingInfo.hero_image_url} 
            alt="Wedding" 
            className="w-full h-full object-cover opacity-30"
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-6xl font-serif mb-4">
              {weddingInfo.bride_name} & {weddingInfo.groom_name}
            </h1>
            <p className="text-2xl font-light">
              {formatDate(weddingInfo.wedding_date)}
            </p>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {weddingInfo.description && (
          <div className="text-center mb-16">
            <p className="text-xl text-gray-700 leading-relaxed">
              {weddingInfo.description}
            </p>
          </div>
        )}

        {/* Wedding Details Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Ceremony Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-wedding-primary">
            <h2 className="text-2xl font-serif mb-4 text-wedding-accent">Ceremony</h2>
            <div className="space-y-2 text-gray-700">
              <p className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-wedding-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatTime(weddingInfo.ceremony_time)}
              </p>
            </div>
          </div>

          {/* Reception Card */}
          {weddingInfo.reception_time && (
            <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-wedding-primary">
              <h2 className="text-2xl font-serif mb-4 text-wedding-accent">Reception</h2>
              <div className="space-y-2 text-gray-700">
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-wedding-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {formatTime(weddingInfo.reception_time)}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Venue Information */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-serif mb-4 text-wedding-accent">Venue</h2>
          <div className="text-gray-700">
            <p className="text-xl font-semibold mb-2">{weddingInfo.venue_name}</p>
            <p className="whitespace-pre-line">{weddingInfo.venue_address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

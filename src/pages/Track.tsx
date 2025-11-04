import { useState } from 'react';
import { Search, Package, MapPin, CheckCircle, Truck, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface TrackingEvent {
  id: string;
  status: string;
  location: string;
  description: string;
  created_at: string;
}

interface Shipment {
  id: string;
  tracking_number: string;
  status: string;
  sender_name: string;
  recipient_name: string;
  recipient_address: string;
  estimated_delivery: string | null;
  created_at: string;
}

export default function Track() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [events, setEvents] = useState<TrackingEvent[]>([]);
  const [error, setError] = useState('');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShipment(null);
    setEvents([]);

    try {
      const { data: shipmentData, error: shipmentError } = await supabase
        .from('shipments')
        .select('*')
        .eq('tracking_number', trackingNumber.toUpperCase())
        .maybeSingle();

      if (shipmentError) throw shipmentError;

      if (!shipmentData) {
        setError('Tracking number not found. Please check and try again.');
        return;
      }

      setShipment(shipmentData);

      const { data: eventsData, error: eventsError } = await supabase
        .from('tracking_events')
        .select('*')
        .eq('shipment_id', shipmentData.id)
        .order('created_at', { ascending: false });

      if (eventsError) throw eventsError;

      setEvents(eventsData || []);
    } catch (err) {
      setError('An error occurred while tracking your shipment.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'in_transit':
      case 'out_for_delivery':
        return <Truck className="h-6 w-6 text-blue-500" />;
      case 'pending':
        return <Clock className="h-6 w-6 text-amber-500" />;
      default:
        return <Package className="h-6 w-6 text-slate-500" />;
    }
  };

  const formatStatus = (status: string) => {
    return status
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Track Your Shipment</h1>
          <p className="text-xl text-slate-600">
            Enter your tracking number to see real-time updates
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter tracking number (e.g., SW123456789)"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 disabled:bg-slate-400"
            >
              {loading ? (
                <span>Tracking...</span>
              ) : (
                <>
                  <Search className="h-5 w-5" />
                  <span>Track</span>
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}
        </div>

        {shipment && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Tracking: {shipment.tracking_number}
                  </h2>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(shipment.status)}
                    <span className="text-lg font-semibold text-slate-700">
                      {formatStatus(shipment.status)}
                    </span>
                  </div>
                </div>
                {shipment.estimated_delivery && (
                  <div className="text-right">
                    <p className="text-sm text-slate-600">Estimated Delivery</p>
                    <p className="text-lg font-semibold text-slate-900">
                      {new Date(shipment.estimated_delivery).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t">
                <div>
                  <p className="text-sm text-slate-600 mb-1">From</p>
                  <p className="font-semibold text-slate-900">{shipment.sender_name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">To</p>
                  <p className="font-semibold text-slate-900">{shipment.recipient_name}</p>
                  <p className="text-sm text-slate-600 mt-1">{shipment.recipient_address}</p>
                </div>
              </div>
            </div>

            {events.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Tracking History</h3>
                <div className="space-y-6">
                  {events.map((event, index) => (
                    <div key={event.id} className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div className={`rounded-full p-2 ${index === 0 ? 'bg-blue-100' : 'bg-slate-100'}`}>
                          {index === 0 ? (
                            <MapPin className="h-5 w-5 text-blue-600" />
                          ) : (
                            <Package className="h-5 w-5 text-slate-600" />
                          )}
                        </div>
                        {index < events.length - 1 && (
                          <div className="w-0.5 h-full bg-slate-200 mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <p className="font-semibold text-slate-900">{event.description}</p>
                        <p className="text-sm text-slate-600 mt-1">{event.location}</p>
                        <p className="text-sm text-slate-500 mt-1">
                          {new Date(event.created_at).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

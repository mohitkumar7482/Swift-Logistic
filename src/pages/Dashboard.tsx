import { useState, useEffect } from 'react';
import { Plus, Package, Truck, Clock, CheckCircle, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

interface Shipment {
  id: string;
  tracking_number: string;
  status: string;
  recipient_name: string;
  recipient_address: string;
  estimated_delivery: string | null;
  price: number;
  created_at: string;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { user } = useAuth();
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    if (user) {
      loadShipments();
    }
  }, [user]);

  const loadShipments = async () => {
    try {
      const { data: customerData } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (customerData) {
        const { data: shipmentsData } = await supabase
          .from('shipments')
          .select('*')
          .eq('customer_id', customerData.id)
          .order('created_at', { ascending: false });

        setShipments(shipmentsData || []);
      }
    } catch (err) {
      console.error('Error loading shipments:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_transit':
      case 'out_for_delivery':
        return <Truck className="h-5 w-5 text-blue-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-500" />;
      default:
        return <Package className="h-5 w-5 text-slate-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'in_transit':
      case 'out_for_delivery':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const formatStatus = (status: string) => {
    return status
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const stats = [
    {
      label: 'Total Shipments',
      value: shipments.length,
      icon: <Package className="h-6 w-6 text-blue-600" />,
    },
    {
      label: 'In Transit',
      value: shipments.filter((s) => s.status === 'in_transit').length,
      icon: <Truck className="h-6 w-6 text-blue-600" />,
    },
    {
      label: 'Delivered',
      value: shipments.filter((s) => s.status === 'delivered').length,
      icon: <CheckCircle className="h-6 w-6 text-green-600" />,
    },
    {
      label: 'Pending',
      value: shipments.filter((s) => s.status === 'pending').length,
      icon: <Clock className="h-6 w-6 text-amber-600" />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600">Manage and track all your shipments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-600 text-sm">{stat.label}</span>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Recent Shipments</h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 font-semibold"
            >
              <Plus className="h-5 w-5" />
              <span>New Shipment</span>
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-slate-600 mt-4">Loading shipments...</p>
            </div>
          ) : shipments.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No shipments yet</h3>
              <p className="text-slate-600 mb-6">Create your first shipment to get started</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Create Shipment</span>
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-slate-600 font-semibold text-sm">
                      Tracking Number
                    </th>
                    <th className="text-left py-3 px-4 text-slate-600 font-semibold text-sm">
                      Recipient
                    </th>
                    <th className="text-left py-3 px-4 text-slate-600 font-semibold text-sm">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-slate-600 font-semibold text-sm">
                      Estimated Delivery
                    </th>
                    <th className="text-left py-3 px-4 text-slate-600 font-semibold text-sm">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {shipments.map((shipment) => (
                    <tr key={shipment.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(shipment.status)}
                          <span className="font-semibold text-slate-900">
                            {shipment.tracking_number}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-slate-900">{shipment.recipient_name}</div>
                        <div className="text-sm text-slate-600">{shipment.recipient_address}</div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            shipment.status
                          )}`}
                        >
                          {formatStatus(shipment.status)}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-700">
                        {shipment.estimated_delivery
                          ? new Date(shipment.estimated_delivery).toLocaleDateString()
                          : 'TBD'}
                      </td>
                      <td className="py-4 px-4 font-semibold text-slate-900">
                        ${shipment.price.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showCreateModal && (
        <CreateShipmentModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            loadShipments();
          }}
          userId={user?.id || ''}
        />
      )}
    </div>
  );
}

interface CreateShipmentModalProps {
  onClose: () => void;
  onSuccess: () => void;
  userId: string;
}

function CreateShipmentModal({ onClose, onSuccess, userId }: CreateShipmentModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    senderName: '',
    senderPhone: '',
    senderAddress: '',
    recipientName: '',
    recipientPhone: '',
    recipientAddress: '',
    packageWeight: '',
    packageDimensions: '',
    serviceType: 'standard',
    notes: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();

      let customerId = customerData?.id;

      if (!customerId) {
        const { data: newCustomer, error: createError } = await supabase
          .from('customers')
          .insert([
            {
              user_id: userId,
              full_name: formData.senderName,
              email: '',
              phone: formData.senderPhone,
              address: formData.senderAddress,
            },
          ])
          .select()
          .single();

        if (createError) throw createError;
        customerId = newCustomer.id;
      }

      const trackingNumber = `SW${Date.now().toString().slice(-9)}`;

      const price =
        formData.serviceType === 'express' ? 25 : formData.serviceType === 'overnight' ? 40 : 10;

      const estimatedDays =
        formData.serviceType === 'express' ? 1 : formData.serviceType === 'overnight' ? 0 : 5;

      const estimatedDelivery = new Date();
      estimatedDelivery.setDate(estimatedDelivery.getDate() + estimatedDays);

      const { error: shipmentError } = await supabase.from('shipments').insert([
        {
          tracking_number: trackingNumber,
          customer_id: customerId,
          sender_name: formData.senderName,
          sender_phone: formData.senderPhone,
          sender_address: formData.senderAddress,
          recipient_name: formData.recipientName,
          recipient_phone: formData.recipientPhone,
          recipient_address: formData.recipientAddress,
          package_weight: parseFloat(formData.packageWeight),
          package_dimensions: formData.packageDimensions,
          service_type: formData.serviceType,
          status: 'pending',
          estimated_delivery: estimatedDelivery.toISOString(),
          price: price,
          notes: formData.notes || null,
        },
      ]);

      if (shipmentError) throw shipmentError;

      onSuccess();
    } catch (err) {
      setError('Failed to create shipment. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-slate-900">Create New Shipment</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Sender Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
                <input
                  type="text"
                  name="senderName"
                  value={formData.senderName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                <input
                  type="tel"
                  name="senderPhone"
                  value={formData.senderPhone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Address</label>
              <input
                type="text"
                name="senderAddress"
                value={formData.senderAddress}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Recipient Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
                <input
                  type="text"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                <input
                  type="tel"
                  name="recipientPhone"
                  value={formData.recipientPhone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Address</label>
              <input
                type="text"
                name="recipientAddress"
                value={formData.recipientAddress}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Package Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="packageWeight"
                  value={formData.packageWeight}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Dimensions (LxWxH cm)
                </label>
                <input
                  type="text"
                  name="packageDimensions"
                  value={formData.packageDimensions}
                  onChange={handleChange}
                  placeholder="e.g., 30x20x15"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Service Type
              </label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="standard">Standard ($10 - 5 days)</option>
                <option value="express">Express ($25 - 1 day)</option>
                <option value="overnight">Overnight ($40 - Same day)</option>
              </select>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              ></textarea>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-400 font-semibold"
            >
              {loading ? 'Creating...' : 'Create Shipment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { Package, Zap, Clock, Shield, Truck, Globe } from 'lucide-react';

interface ServicesProps {
  onNavigate: (page: string) => void;
}

export default function Services({ onNavigate }: ServicesProps) {
  const services = [
    {
      icon: <Zap className="h-12 w-12 text-blue-600" />,
      title: 'Express Delivery',
      description: 'Same-day and next-day delivery options for your urgent shipments',
      features: ['Same-day delivery', 'Priority handling', 'Real-time tracking', 'Door-to-door service'],
      price: 'From $25',
    },
    {
      icon: <Package className="h-12 w-12 text-blue-600" />,
      title: 'Standard Shipping',
      description: 'Reliable delivery within 3-5 business days at affordable rates',
      features: ['3-5 day delivery', 'Package insurance', 'Online tracking', 'Signature confirmation'],
      price: 'From $10',
    },
    {
      icon: <Globe className="h-12 w-12 text-blue-600" />,
      title: 'International Shipping',
      description: 'Global shipping solutions with customs clearance support',
      features: ['Worldwide delivery', 'Customs handling', 'Multi-language support', 'Duty management'],
      price: 'From $50',
    },
  ];

  const additionalServices = [
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: 'Package Insurance',
      description: 'Comprehensive coverage for valuable items up to $10,000',
    },
    {
      icon: <Truck className="h-8 w-8 text-blue-600" />,
      title: 'Freight Services',
      description: 'Large shipment and pallet delivery options for businesses',
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: 'Scheduled Pickup',
      description: 'Convenient pickup scheduling at your preferred time and location',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Our Services</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Choose from our range of delivery options tailored to meet your specific needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
            >
              <div className="p-8">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>

                <div className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      <span className="text-sm text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-6">
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-2xl font-bold text-slate-900">{service.price}</span>
                    <span className="text-sm text-slate-600">per shipment</span>
                  </div>
                  <button
                    onClick={() => onNavigate('login')}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Additional Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-slate-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
            <p className="text-xl mb-8 text-blue-100">
              We offer tailored shipping solutions for businesses with unique requirements.
              Contact us to discuss your needs.
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

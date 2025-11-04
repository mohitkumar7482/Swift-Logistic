import { Truck, Clock, Shield, Globe, Package, Zap } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="bg-white">
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Fast, Reliable Courier Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Swift Logistics delivers your packages with speed and precision. Track in real-time,
              ship with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate('track')}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
              >
                Track Shipment
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-400 transition-all border-2 border-white"
              >
                View Services
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose Swift Logistics?</h2>
            <p className="text-xl text-slate-600">We go the extra mile to ensure your satisfaction</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Lightning Fast</h3>
              <p className="text-slate-600 leading-relaxed">
                Express delivery options with same-day and next-day service available for urgent
                shipments.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">100% Secure</h3>
              <p className="text-slate-600 leading-relaxed">
                Your packages are insured and handled with care. We guarantee safe delivery or full
                refund.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Real-Time Tracking</h3>
              <p className="text-slate-600 leading-relaxed">
                Monitor your shipment every step of the way with live GPS tracking and instant
                notifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Trusted by Thousands of Customers
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                With over a decade of experience, Swift Logistics has become the go-to choice for
                individuals and businesses who demand reliability, speed, and exceptional service.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
                  <div className="text-slate-600">Deliveries Monthly</div>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">99.8%</div>
                  <div className="text-slate-600">On-Time Delivery</div>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                  <div className="text-slate-600">Customer Support</div>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
                  <div className="text-slate-600">Service Locations</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="text-center text-white">
                  <Package className="h-32 w-32 mx-auto mb-4 opacity-80" />
                  <p className="text-xl font-semibold">Your Package, Our Priority</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Ship with Us?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of satisfied customers who trust Swift Logistics for their delivery needs.
          </p>
          <button
            onClick={() => onNavigate('login')}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
          >
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
}

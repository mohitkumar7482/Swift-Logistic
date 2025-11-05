import { ReactNode } from 'react';
import { Package, Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const navigation = [
    { name: 'Home', href: 'home' },
    { name: 'Track', href: 'track' },
    { name: 'Services', href: 'services' },
    { name: 'Contact', href: 'contact' },
  ];

  const handleSignOut = async () => {
    await signOut();
    onNavigate('home');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white shadow-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button onClick={() => onNavigate('home')} className="flex items-center space-x-2">
                <Package className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-slate-900">Swift Logistics</span>
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => onNavigate(item.href)}
                  className={`${
                    currentPage === item.href
                      ? 'text-blue-600 font-semibold'
                      : 'text-slate-600 hover:text-blue-600'
                  } transition-colors text-sm`}
                >
                  {item.name}
                </button>
              ))}
              {user ? (
                <>
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className={`${
                      currentPage === 'dashboard'
                        ? 'text-blue-600 font-semibold'
                        : 'text-slate-600 hover:text-blue-600'
                    } transition-colors text-sm`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors text-sm"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => onNavigate('login')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Sign In
                </button>
              )}
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-600 hover:text-blue-600"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    onNavigate(item.href);
                    setMobileMenuOpen(false);
                  }}
                  className={`${
                    currentPage === item.href
                      ? 'text-blue-600 font-semibold'
                      : 'text-slate-600'
                  } block w-full text-left px-3 py-2`}
                >
                  {item.name}
                </button>
              ))}
              {user ? (
                <>
                  <button
                    onClick={() => {
                      onNavigate('dashboard');
                      setMobileMenuOpen(false);
                    }}
                    className={`${
                      currentPage === 'dashboard'
                        ? 'text-blue-600 font-semibold'
                        : 'text-slate-600'
                    } block w-full text-left px-3 py-2`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="text-slate-600 block w-full text-left px-3 py-2"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    onNavigate('login');
                    setMobileMenuOpen(false);
                  }}
                  className="bg-blue-600 text-white w-full px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="pt-16">{children}</main>

      <footer className="bg-slate-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Package className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">Swift Logistics</span>
              </div>
              <p className="text-slate-400 mb-4">
                Your trusted partner for fast, reliable courier services. We deliver excellence with
                every package.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => onNavigate('track')} className="text-slate-400 hover:text-white">
                    Track Shipment
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('services')} className="text-slate-400 hover:text-white">
                    Our Services
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('contact')} className="text-slate-400 hover:text-white">
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-slate-400">
                <li>support@swiftlogistics.com</li>
                <li>1-800-SWIFT-00</li>
                <li>24/7 Customer Support</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 Swift Logistics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

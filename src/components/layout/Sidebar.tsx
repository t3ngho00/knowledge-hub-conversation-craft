
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  bot, 
  settings, 
  book-open, 
  message-square, 
  users, 
  folder,
  plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Dashboard', href: '/', icon: 'bot' },
  { name: 'Bots', href: '/bots', icon: 'message-square' },
  { name: 'Knowledge Hub', href: '/knowledge', icon: 'book-open' },
  { name: 'Answer Review', href: '/review', icon: 'users' },
  { name: 'Analytics', href: '/analytics', icon: 'folder' },
  { name: 'Channels', href: '/channels', icon: 'settings' },
  { name: 'Settings', href: '/settings', icon: 'settings' },
];

const iconMap = {
  'bot': bot,
  'message-square': message-square,
  'book-open': book-open,
  'users': users,
  'folder': folder,
  'settings': settings,
};

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo and Brand */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <span className="text-xl font-semibold text-gray-900">ChatBot Hub</span>
        </div>
      </div>

      {/* Quick Action */}
      <div className="p-4">
        <Button 
          onClick={() => navigate('/bots/new')}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium"
        >
          <plus className="w-4 h-4 mr-2" />
          Create New Bot
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 pb-4">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            const isActive = location.pathname === item.href;
            
            return (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.href)}
                  className={cn(
                    'w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  )}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <user className="w-4 h-4 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
            <p className="text-xs text-gray-500 truncate">john@company.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};


import React from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BotCard, Bot } from '@/components/dashboard/BotCard';
import { useNavigate } from 'react-router-dom';

const mockBots: Bot[] = [
  {
    id: '1',
    name: 'Customer Support Bot',
    description: 'Handles customer inquiries, order status, and general support questions',
    status: 'active',
    channels: ['zalo', 'messenger', 'web'],
    conversations: 1245,
    lastActive: '2 min ago',
  },
  {
    id: '2',
    name: 'Menu Q&A Bot',
    description: 'Answers questions about restaurant menu items, ingredients, and allergens',
    status: 'active',
    channels: ['web', 'messenger'],
    conversations: 567,
    lastActive: '5 min ago',
  },
  {
    id: '3',
    name: 'Delivery Tracker',
    description: 'Provides real-time delivery updates and tracking information',
    status: 'draft',
    channels: ['zalo'],
    conversations: 0,
    lastActive: 'Never',
  },
  {
    id: '4',
    name: 'Product Recommendations',
    description: 'Suggests products based on customer preferences and browsing history',
    status: 'inactive',
    channels: ['web'],
    conversations: 89,
    lastActive: '2 days ago',
  },
];

export const Bots: React.FC = () => {
  const navigate = useNavigate();

  const handleEditBot = (bot: Bot) => {
    navigate(`/bots/${bot.id}/edit`);
  };

  const handleViewBot = (bot: Bot) => {
    navigate(`/bots/${bot.id}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bots</h1>
          <p className="text-gray-600 mt-1">Manage your AI chatbots and their configurations</p>
        </div>
        <Button 
          onClick={() => navigate('/bots/new')}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Bot
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search bots..."
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Bots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockBots.map((bot) => (
          <BotCard
            key={bot.id}
            bot={bot}
            onEdit={handleEditBot}
            onView={handleViewBot}
          />
        ))}
      </div>
    </div>
  );
};

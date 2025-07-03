import React from 'react';
import { MessageSquare, Users, TrendingUp, AlertCircle } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { BotCard, Bot } from '@/components/dashboard/BotCard';
import { Button } from '@/components/ui/button';
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
];

export const Dashboard: React.FC = () => {
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
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor and manage your AI chatbots</p>
        </div>
        <Button 
          onClick={() => navigate('/bots/new')}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          Create New Bot
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Conversations"
          value="1,812"
          change="+12% from last week"
          changeType="positive"
          icon={MessageSquare}
        />
        <StatsCard
          title="Active Bots"
          value="2"
          change="1 draft pending"
          changeType="neutral"
          icon={Users}
        />
        <StatsCard
          title="Success Rate"
          value="94%"
          change="+2% from last week"
          changeType="positive"
          icon={TrendingUp}
        />
        <StatsCard
          title="Needs Review"
          value="23"
          change="3 high priority"
          changeType="negative"
          icon={AlertCircle}
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          <Button variant="outline" onClick={() => navigate('/activity')}>
            View All
          </Button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Customer Support Bot answered 15 questions in the last hour</span>
            <span className="text-xs text-gray-400 ml-auto">2 min ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600">5 questions flagged for review in Menu Q&A Bot</span>
            <span className="text-xs text-gray-400 ml-auto">15 min ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Knowledge base updated with 3 new documents</span>
            <span className="text-xs text-gray-400 ml-auto">1 hour ago</span>
          </div>
        </div>
      </div>

      {/* Bots Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Your Bots</h2>
          <Button variant="outline" onClick={() => navigate('/bots', { state: { from: 'dashboard' } })}>
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  );
};

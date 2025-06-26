
import React from 'react';
import { MoreVertical, MessageSquare, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface Bot {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'draft' | 'inactive';
  channels: ('zalo' | 'messenger' | 'web')[];
  conversations: number;
  lastActive: string;
}

interface BotCardProps {
  bot: Bot;
  onEdit: (bot: Bot) => void;
  onView: (bot: Bot) => void;
}

export const BotCard: React.FC<BotCardProps> = ({ bot, onEdit, onView }) => {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    draft: 'bg-yellow-100 text-yellow-800',
    inactive: 'bg-gray-100 text-gray-800',
  };

  const channelIcons = {
    zalo: '💬',
    messenger: '📘',
    web: '🌐',
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer" onClick={() => onView(bot)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{bot.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{bot.description}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(bot);
            }}
          >
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-4">
          <Badge className={statusColors[bot.status]} variant="secondary">
            {bot.status.charAt(0).toUpperCase() + bot.status.slice(1)}
          </Badge>
          <div className="flex space-x-1">
            {bot.channels.map((channel) => (
              <span key={channel} className="text-lg" title={channel}>
                {channelIcons[channel]}
              </span>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{bot.conversations} chats</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{bot.lastActive}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const notifications = [
  {
    id: 1,
    title: 'Bot Response Flagged',
    description: 'Customer Support Bot response needs review',
    time: '2 min ago',
  },
  {
    id: 2,
    title: 'Knowledge Base Updated',
    description: '3 new articles added to FAQ section',
    time: '1 hour ago',
  },
  {
    id: 3,
    title: 'High Traffic Alert',
    description: 'Menu Q&A Bot receiving high volume',
    time: '2 hours ago',
  },
];

export const NotificationsDropdown: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            3
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.map((notification) => (
          <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-4">
            <div className="font-medium text-sm">{notification.title}</div>
            <div className="text-sm text-gray-500 mb-1">{notification.description}</div>
            <div className="text-xs text-gray-400">{notification.time}</div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center text-blue-600 cursor-pointer">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

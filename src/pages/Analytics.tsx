
import React, { useState } from 'react';
import { Calendar, MessageSquare, TrendingUp, Users, AlertTriangle, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface UnansweredQuestion {
  id: string;
  question: string;
  frequency: number;
  lastAsked: string;
  category?: string;
}

const mockUnansweredQuestions: UnansweredQuestion[] = [
  {
    id: '1',
    question: 'Do you have gluten-free pasta options?',
    frequency: 15,
    lastAsked: '2024-06-21',
    category: 'Menu'
  },
  {
    id: '2',
    question: 'What are your delivery hours on Sunday?',
    frequency: 12,
    lastAsked: '2024-06-20',
    category: 'Delivery'
  },
  {
    id: '3',
    question: 'Can I modify my order after placing it?',
    frequency: 8,
    lastAsked: '2024-06-21',
    category: 'Orders'
  },
  {
    id: '4',
    question: 'Do you accept cryptocurrency payments?',
    frequency: 5,
    lastAsked: '2024-06-19',
    category: 'Payment'
  }
];

const mockConversations = [
  {
    id: '1',
    user: 'Anonymous User',
    channel: 'Web',
    messages: 8,
    startTime: '2024-06-21 14:30',
    status: 'Resolved'
  },
  {
    id: '2',
    user: 'Customer #1234',
    channel: 'Messenger',
    messages: 15,
    startTime: '2024-06-21 13:45',
    status: 'Escalated'
  },
  {
    id: '3',
    user: 'Anonymous User',
    channel: 'Zalo',
    messages: 3,
    startTime: '2024-06-21 12:20',
    status: 'Resolved'
  }
];

export const Analytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('7days');
  const [selectedBot, setSelectedBot] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Insights</h1>
          <p className="text-gray-600 mt-1">Track performance and identify improvement opportunities</p>
        </div>
        
        {/* Filters */}
        <div className="flex items-center space-x-4">
          <Select value={selectedBot} onValueChange={setSelectedBot}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select Bot" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Bots</SelectItem>
              <SelectItem value="support">Customer Support</SelectItem>
              <SelectItem value="menu">Menu Q&A</SelectItem>
              <SelectItem value="delivery">Delivery Tracker</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 3 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Conversations</p>
                <p className="text-2xl font-bold text-gray-900">2,847</p>
                <p className="text-sm text-green-600">+12% from last period</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Answer Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">89.3%</p>
                <p className="text-sm text-green-600">+5.2% improvement</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
                <p className="text-sm text-blue-600">+8% new users</p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg Response Time</p>
                <p className="text-2xl font-bold text-gray-900">1.2s</p>
                <p className="text-sm text-green-600">-0.3s faster</p>
              </div>
              <Calendar className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Conversation Volume</CardTitle>
            <CardDescription>Messages over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <TrendingUp className="w-12 h-12 mx-auto mb-2" />
                <p>Chart visualization</p>
                <p className="text-sm">Coming soon</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Channels</CardTitle>
            <CardDescription>Message distribution by platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span>Web Widget</span>
                </div>
                <span className="font-medium">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Facebook Messenger</span>
                </div>
                <span className="font-medium">35%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-purple-500 rounded"></div>
                  <span>Zalo</span>
                </div>
                <span className="font-medium">20%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Unanswered Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <span>Unanswered Questions</span>
          </CardTitle>
          <CardDescription>
            Most frequent questions your bot couldn't answer - prioritize these for knowledge base updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Question</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Last Asked</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUnansweredQuestions.map((question) => (
                <TableRow key={question.id}>
                  <TableCell className="font-medium max-w-md">
                    {question.question}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{question.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{question.frequency}x</Badge>
                  </TableCell>
                  <TableCell>{question.lastAsked}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      Add to Knowledge Base
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Conversation Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Conversations</CardTitle>
          <CardDescription>
            Detailed log of bot interactions for quality assurance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Messages</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockConversations.map((conversation) => (
                <TableRow key={conversation.id}>
                  <TableCell>{conversation.user}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{conversation.channel}</Badge>
                  </TableCell>
                  <TableCell>{conversation.messages}</TableCell>
                  <TableCell>{conversation.startTime}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={conversation.status === 'Resolved' ? 'default' : 'destructive'}
                    >
                      {conversation.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

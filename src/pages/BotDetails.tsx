
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, Play, Pause, Trash2, MessageSquare, Users, TrendingUp, Calendar, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const mockBotData = {
  id: '1',
  name: 'Customer Support Bot',
  description: 'Handles customer inquiries, order status, and general support questions',
  status: 'active' as const,
  channels: ['zalo', 'messenger', 'web'] as const,
  conversations: 1245,
  lastActive: '2 min ago',
  createdAt: '2024-06-15',
  updatedAt: '2024-06-26',
};

const mockConversations = [
  { id: '1', user: 'Customer #1', message: 'What are your opening hours?', timestamp: '2024-06-26 14:30', status: 'resolved' },
  { id: '2', user: 'Customer #2', message: 'I need help with my order', timestamp: '2024-06-26 14:25', status: 'active' },
  { id: '3', user: 'Customer #3', message: 'Do you have vegetarian options?', timestamp: '2024-06-26 14:20', status: 'resolved' },
  { id: '4', user: 'Customer #4', message: 'How can I cancel my subscription?', timestamp: '2024-06-26 14:15', status: 'needs_review' },
];

const mockMetrics = [
  { label: 'Total Conversations', value: '1,245', change: '+12%', icon: MessageSquare },
  { label: 'Active Users', value: '892', change: '+8%', icon: Users },
  { label: 'Success Rate', value: '94%', change: '+2%', icon: TrendingUp },
  { label: 'Avg Response Time', value: '1.2s', change: '-0.3s', icon: Calendar },
];

const channelNames = {
  zalo: 'Zalo',
  messenger: 'Messenger',
  web: 'Web Widget',
};

export const BotDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-4 lg:space-y-6 pb-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/bots')}
            className="flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900 truncate">{mockBotData.name}</h1>
            <p className="text-sm lg:text-base text-gray-600 mt-1">{mockBotData.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Badge variant={mockBotData.status === 'active' ? 'default' : 'secondary'} className="capitalize">
            {mockBotData.status}
          </Badge>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate(`/bots/${id}/edit`)}
            className="whitespace-nowrap"
          >
            <Settings className="w-4 h-4 mr-1" />
            Edit Bot
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            {mockBotData.status === 'active' ? (
              <>
                <Pause className="w-4 h-4 mr-1" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-1" />
                Activate
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {mockMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">{metric.label}</p>
                    <p className="text-lg lg:text-2xl font-bold text-gray-900">{metric.value}</p>
                    <p className="text-xs text-green-600">{metric.change}</p>
                  </div>
                  <Icon className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400 flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-4">
          <TabsTrigger value="overview" className="text-xs lg:text-sm">Overview</TabsTrigger>
          <TabsTrigger value="conversations" className="text-xs lg:text-sm">Conversations</TabsTrigger>
          <TabsTrigger value="channels" className="text-xs lg:text-sm">Channels</TabsTrigger>
          <TabsTrigger value="settings" className="text-xs lg:text-sm hidden lg:block">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Bot Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Created</p>
                  <p className="text-sm text-gray-600">{mockBotData.createdAt}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Last Updated</p>
                  <p className="text-sm text-gray-600">{mockBotData.updatedAt}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Last Active</p>
                  <p className="text-sm text-gray-600">{mockBotData.lastActive}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Total Conversations</p>
                  <p className="text-sm text-gray-600">{mockBotData.conversations.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Connected Channels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockBotData.channels.map((channel) => (
                    <div key={channel} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">{channelNames[channel]}</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Connected
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="conversations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Conversations</CardTitle>
              <CardDescription>Latest interactions with your bot</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead className="hidden lg:table-cell">Message</TableHead>
                      <TableHead className="hidden lg:table-cell">Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockConversations.map((conv) => (
                      <TableRow key={conv.id}>
                        <TableCell className="font-medium">{conv.user}</TableCell>
                        <TableCell className="hidden lg:table-cell max-w-xs truncate">{conv.message}</TableCell>
                        <TableCell className="hidden lg:table-cell text-sm text-gray-500">{conv.timestamp}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={conv.status === 'resolved' ? 'default' : conv.status === 'active' ? 'secondary' : 'destructive'}
                            className="text-xs"
                          >
                            {conv.status.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Channel Configuration</CardTitle>
              <CardDescription>Manage where your bot is deployed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockBotData.channels.map((channel) => (
                <div key={channel} className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border rounded-lg gap-3">
                  <div className="flex-1">
                    <h3 className="font-medium">{channelNames[channel]}</h3>
                    <p className="text-sm text-gray-600">Connected and active</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Active
                    </Badge>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Configure
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Bot Settings</CardTitle>
              <CardDescription>Configure your bot's behavior and appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <Button variant="outline" className="justify-start w-full lg:w-auto">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Bot Configuration
                </Button>
                <Button variant="outline" className="justify-start w-full lg:w-auto">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Manage Responses
                </Button>
                <Button variant="destructive" className="justify-start w-full lg:w-auto">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Bot
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

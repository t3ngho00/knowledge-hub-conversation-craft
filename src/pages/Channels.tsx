
import React, { useState } from 'react';
import { MessageCircle, Globe, Smartphone, Settings, CheckCircle, AlertCircle, Copy, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Channel {
  id: string;
  name: string;
  type: 'messenger' | 'zalo' | 'web';
  status: 'connected' | 'disconnected' | 'error';
  icon: React.ReactNode;
  description: string;
  botCount?: number;
}

interface ApiConnection {
  id: string;
  name: string;
  url: string;
  status: 'active' | 'inactive' | 'error';
  lastSync: string;
  description: string;
}

const channels: Channel[] = [
  {
    id: '1',
    name: 'Facebook Messenger',
    type: 'messenger',
    status: 'connected',
    icon: <MessageCircle className="w-6 h-6 text-blue-600" />,
    description: 'Connect your bots to Facebook Messenger for customer interactions',
    botCount: 2
  },
  {
    id: '2',
    name: 'Zalo Official Account',
    type: 'zalo',
    status: 'disconnected',
    icon: <Smartphone className="w-6 h-6 text-blue-500" />,
    description: 'Integrate with Zalo OA to reach Vietnamese customers',
    botCount: 0
  },
  {
    id: '3',
    name: 'Web Widget',
    type: 'web',
    status: 'connected',
    icon: <Globe className="w-6 h-6 text-green-600" />,
    description: 'Embed chat widgets directly into your website',
    botCount: 1
  }
];

const apiConnections: ApiConnection[] = [
  {
    id: '1',
    name: 'POS System API',
    url: 'https://api.restaurant-pos.com/v1',
    status: 'active',
    lastSync: '2024-06-21 15:30',
    description: 'Real-time menu and inventory data'
  },
  {
    id: '2',
    name: 'Delivery Tracking API',
    url: 'https://delivery.example.com/api',
    status: 'inactive',
    lastSync: '2024-06-20 09:15',
    description: 'Order status and delivery tracking'
  }
];

export const Channels: React.FC = () => {
  const [webhookUrl] = useState('https://your-bot.lovable.app/webhook');
  const [widgetCode] = useState(`<script src="https://your-bot.lovable.app/widget.js"></script>
<div id="chatbot-widget" data-bot-id="your-bot-id"></div>`);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Connected</Badge>;
      case 'disconnected':
      case 'inactive':
        return <Badge variant="secondary">Disconnected</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'disconnected':
      case 'inactive':
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Channels & Integrations</h1>
        <p className="text-gray-600 mt-1">Connect your bots to messaging platforms and external systems</p>
      </div>

      <Tabs defaultValue="channels" className="space-y-6">
        <TabsList>
          <TabsTrigger value="channels">Messaging Channels</TabsTrigger>
          <TabsTrigger value="apis">API Connectors</TabsTrigger>
        </TabsList>

        {/* Messaging Channels Tab */}
        <TabsContent value="channels" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {channels.map((channel) => (
              <Card key={channel.id} className="relative">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {channel.icon}
                      <CardTitle className="text-lg">{channel.name}</CardTitle>
                    </div>
                    {getStatusIcon(channel.status)}
                  </div>
                  <CardDescription>{channel.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Status:</span>
                    {getStatusBadge(channel.status)}
                  </div>
                  
                  {channel.botCount !== undefined && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Connected Bots:</span>
                      <span className="font-medium">{channel.botCount}</span>
                    </div>
                  )}

                  <div className="pt-2">
                    {channel.status === 'connected' ? (
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full">
                          <Settings className="w-4 h-4 mr-2" />
                          Configure
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full text-red-600">
                          Disconnect
                        </Button>
                      </div>
                    ) : (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full">Connect {channel.name}</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Connect {channel.name}</DialogTitle>
                            <DialogDescription>
                              Configure your {channel.name} integration
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-4">
                            {channel.type === 'web' ? (
                              <div className="space-y-4">
                                <div>
                                  <Label>Embed Code</Label>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <Input value={widgetCode} readOnly className="text-xs" />
                                    <Button size="sm" onClick={() => copyToClipboard(widgetCode)}>
                                      <Copy className="w-4 h-4" />
                                    </Button>
                                  </div>
                                  <p className="text-xs text-gray-500 mt-1">
                                    Copy this code to your website's HTML
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="app-id">App ID / Page ID</Label>
                                  <Input id="app-id" placeholder="Enter your app ID" />
                                </div>
                                <div>
                                  <Label htmlFor="app-secret">App Secret / Access Token</Label>
                                  <Input id="app-secret" type="password" placeholder="Enter your secret" />
                                </div>
                                <div>
                                  <Label>Webhook URL</Label>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <Input value={webhookUrl} readOnly />
                                    <Button size="sm" onClick={() => copyToClipboard(webhookUrl)}>
                                      <Copy className="w-4 h-4" />
                                    </Button>
                                  </div>
                                  <p className="text-xs text-gray-500 mt-1">
                                    Configure this URL in your {channel.name} settings
                                  </p>
                                </div>
                              </div>
                            )}
                            
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline">Cancel</Button>
                              <Button>Connect</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* API Connectors Tab */}
        <TabsContent value="apis" className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Connect external APIs to provide real-time data to your bots</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add New API</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add API Connection</DialogTitle>
                  <DialogDescription>
                    Configure a new REST API endpoint for your bots to use
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="api-name">API Name</Label>
                    <Input id="api-name" placeholder="e.g., Product Catalog API" />
                  </div>
                  <div>
                    <Label htmlFor="api-url">API URL</Label>
                    <Input id="api-url" placeholder="https://api.example.com/v1" />
                  </div>
                  <div>
                    <Label htmlFor="auth-type">Authentication</Label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="none">None</option>
                      <option value="bearer">Bearer Token</option>
                      <option value="apikey">API Key</option>
                      <option value="basic">Basic Auth</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="auth-value">Authentication Value</Label>
                    <Input id="auth-value" type="password" placeholder="Enter token/key" />
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Add API</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {apiConnections.map((api) => (
              <Card key={api.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{api.name}</CardTitle>
                    {getStatusIcon(api.status)}
                  </div>
                  <CardDescription>{api.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Status:</span>
                      {getStatusBadge(api.status)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Endpoint:</span>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm font-mono truncate max-w-48">{api.url}</span>
                        <Button size="sm" variant="ghost">
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Last Sync:</span>
                      <span className="text-sm">{api.lastSync}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                    <Button variant="outline" size="sm">
                      Test
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

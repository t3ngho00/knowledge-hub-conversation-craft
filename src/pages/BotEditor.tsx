
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Play, Eye, History, Plus, Trash2, Copy, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface BotResponse {
  id: string;
  trigger: string;
  response: string;
  category: string;
}

const mockResponses: BotResponse[] = [
  { id: '1', trigger: 'hello, hi, hey', response: 'Hello! How can I help you today?', category: 'greetings' },
  { id: '2', trigger: 'hours, opening, open', response: 'We are open Monday to Friday 9 AM to 6 PM, and weekends 10 AM to 4 PM.', category: 'hours' },
  { id: '3', trigger: 'menu, food, eat', response: 'You can find our full menu at www.restaurant.com/menu', category: 'menu' },
  { id: '4', trigger: 'order, status, tracking', response: 'I can help you check your order status. Please provide your order number.', category: 'orders' },
];

export const BotEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [botName, setBotName] = useState('Customer Support Bot');
  const [botDescription, setBotDescription] = useState('Handles customer inquiries, order status, and general support questions');
  const [responses, setResponses] = useState<BotResponse[]>(mockResponses);
  const [selectedResponse, setSelectedResponse] = useState<BotResponse | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveResponse = (response: BotResponse) => {
    if (selectedResponse) {
      setResponses(responses.map(r => r.id === response.id ? response : r));
    } else {
      setResponses([...responses, { ...response, id: Date.now().toString() }]);
    }
    setSelectedResponse(null);
    setIsEditing(false);
  };

  const handleDeleteResponse = (responseId: string) => {
    setResponses(responses.filter(r => r.id !== responseId));
  };

  const handleEditResponse = (response: BotResponse) => {
    setSelectedResponse(response);
    setIsEditing(true);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center space-x-4 min-w-0 flex-1">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(`/bots/${id}`)}
              className="flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="min-w-0 flex-1">
              <Input
                value={botName}
                onChange={(e) => setBotName(e.target.value)}
                className="text-lg lg:text-xl font-semibold border-none p-0 focus-visible:ring-0"
              />
              <Badge variant="outline" className="mt-1">Editing</Badge>
            </div>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <Button size="sm" variant="outline" className="whitespace-nowrap">
              <History className="w-4 h-4 mr-1" />
              <span className="hidden lg:inline">Version History</span>
            </Button>
            <Button size="sm" variant="outline" className="whitespace-nowrap">
              <Eye className="w-4 h-4 mr-1" />
              <span className="hidden lg:inline">Preview</span>
            </Button>
            <Button size="sm" variant="outline" className="whitespace-nowrap">
              <Play className="w-4 h-4 mr-1" />
              <span className="hidden lg:inline">Test</span>
            </Button>
            <Button size="sm" className="whitespace-nowrap">
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left panel - Response management */}
        <div className="lg:w-1/2 xl:w-2/3 border-r bg-white flex flex-col">
          <Tabs defaultValue="responses" className="flex-1 flex flex-col">
            <TabsList className="mx-4 mt-4">
              <TabsTrigger value="responses" className="flex-1">Responses</TabsTrigger>
              <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="responses" className="flex-1 flex flex-col p-4 space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                <h2 className="text-lg font-semibold">Bot Responses</h2>
                <Button 
                  size="sm" 
                  onClick={() => {
                    setSelectedResponse(null);
                    setIsEditing(true);
                  }}
                  className="whitespace-nowrap"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Response
                </Button>
              </div>

              <div className="flex-1 overflow-auto space-y-3">
                {responses.map((response) => (
                  <Card key={response.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="outline" className="text-xs">{response.category}</Badge>
                          </div>
                          <p className="text-sm font-medium mb-2">Triggers: {response.trigger}</p>
                          <p className="text-sm text-gray-600 line-clamp-2">{response.response}</p>
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          <Button size="sm" variant="ghost" onClick={() => handleEditResponse(response)}>
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleDeleteResponse(response.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="flex-1 p-4 space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bot-name" className="text-sm font-medium">Bot Name</Label>
                  <Input
                    id="bot-name"
                    value={botName}
                    onChange={(e) => setBotName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="bot-description" className="text-sm font-medium">Description</Label>
                  <Textarea
                    id="bot-description"
                    value={botDescription}
                    onChange={(e) => setBotDescription(e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Default Response</Label>
                  <Textarea
                    placeholder="I'm sorry, I didn't understand that. Could you please rephrase your question?"
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right panel - Response editor */}
        <div className="lg:w-1/2 xl:w-1/3 bg-gray-50 flex flex-col">
          {isEditing ? (
            <div className="flex-1 p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {selectedResponse ? 'Edit Response' : 'Add New Response'}
                </h3>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => {
                    setIsEditing(false);
                    setSelectedResponse(null);
                  }}
                >
                  Cancel
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="category" className="text-sm font-medium">Category</Label>
                  <Input
                    id="category"
                    defaultValue={selectedResponse?.category || ''}
                    placeholder="e.g., greetings, hours, menu"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="triggers" className="text-sm font-medium">Trigger Words</Label>
                  <Input
                    id="triggers"
                    defaultValue={selectedResponse?.trigger || ''}
                    placeholder="hello, hi, hey (separate with commas)"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter keywords that will trigger this response
                  </p>
                </div>
                <div>
                  <Label htmlFor="response" className="text-sm font-medium">Response</Label>
                  <Textarea
                    id="response"
                    defaultValue={selectedResponse?.response || ''}
                    placeholder="Enter the bot's response..."
                    className="mt-1"
                    rows={4}
                  />
                </div>
                <Button 
                  className="w-full"
                  onClick={() => {
                    // Mock save functionality
                    const formData = new FormData();
                    // In real app, would get values from form
                    handleSaveResponse({
                      id: selectedResponse?.id || Date.now().toString(),
                      category: 'mock',
                      trigger: 'mock',
                      response: 'mock response'
                    });
                  }}
                >
                  {selectedResponse ? 'Update Response' : 'Add Response'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="text-center text-gray-500">
                <Edit3 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-sm">Select a response to edit or create a new one</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

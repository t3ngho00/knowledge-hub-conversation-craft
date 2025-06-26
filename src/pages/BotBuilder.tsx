
import React, { useState, useCallback } from 'react';
import { Save, Play, Eye, History, Plus, Settings, MessageSquare, GitBranch, Database, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface FlowNode {
  id: string;
  type: 'start' | 'message' | 'condition' | 'knowledge' | 'api' | 'input';
  title: string;
  content?: string;
  position: { x: number; y: number };
}

const mockNodes: FlowNode[] = [
  { id: '1', type: 'start', title: 'Start', position: { x: 100, y: 100 } },
  { id: '2', type: 'message', title: 'Welcome Message', content: 'Hello! How can I help you today?', position: { x: 300, y: 100 } },
  { id: '3', type: 'condition', title: 'Intent Check', position: { x: 500, y: 100 } },
  { id: '4', type: 'knowledge', title: 'Knowledge Search', position: { x: 700, y: 50 } },
  { id: '5', type: 'api', title: 'Order Status API', position: { x: 700, y: 150 } },
];

const nodeTypeIcons = {
  start: Play,
  message: MessageSquare,
  condition: GitBranch,
  knowledge: Database,
  api: Zap,
  input: Plus,
};

const nodeTypeColors = {
  start: 'bg-green-100 border-green-300',
  message: 'bg-blue-100 border-blue-300',
  condition: 'bg-yellow-100 border-yellow-300',
  knowledge: 'bg-purple-100 border-purple-300',
  api: 'bg-orange-100 border-orange-300',
  input: 'bg-gray-100 border-gray-300',
};

export const BotBuilder: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null);
  const [botName, setBotName] = useState('Customer Support Bot');

  const handleNodeClick = (node: FlowNode) => {
    setSelectedNode(node);
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row">
      {/* Top toolbar - responsive */}
      <div className="lg:hidden bg-white border-b p-4">
        <div className="flex items-center justify-between mb-2">
          <Input
            value={botName}
            onChange={(e) => setBotName(e.target.value)}
            className="text-lg font-semibold border-none p-0 focus-visible:ring-0"
          />
          <Badge variant="outline" className="text-xs">Draft</Badge>
        </div>
        <div className="flex space-x-2 overflow-x-auto">
          <Button size="sm" className="whitespace-nowrap">
            <Save className="w-4 h-4 mr-1" />
            Save
          </Button>
          <Button size="sm" variant="outline" className="whitespace-nowrap">
            <Play className="w-4 h-4 mr-1" />
            Test
          </Button>
          <Button size="sm" variant="outline" className="whitespace-nowrap">
            <Eye className="w-4 h-4 mr-1" />
            Preview
          </Button>
        </div>
      </div>

      {/* Left sidebar - Node palette */}
      <div className="lg:w-80 bg-gray-50 border-r flex flex-col">
        {/* Desktop header */}
        <div className="hidden lg:block p-4 border-b bg-white">
          <div className="flex items-center justify-between mb-4">
            <Input
              value={botName}
              onChange={(e) => setBotName(e.target.value)}
              className="text-lg font-semibold border-none p-0 focus-visible:ring-0"
            />
            <Badge variant="outline">Draft</Badge>
          </div>
          <div className="flex space-x-2">
            <Button size="sm">
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
            <Button size="sm" variant="outline">
              <Play className="w-4 h-4 mr-1" />
              Test
            </Button>
            <Button size="sm" variant="outline">
              <Eye className="w-4 h-4 mr-1" />
              Preview
            </Button>
          </div>
        </div>

        <Tabs defaultValue="nodes" className="flex-1 flex flex-col">
          <TabsList className="mx-4 mt-4">
            <TabsTrigger value="nodes" className="text-xs lg:text-sm">Nodes</TabsTrigger>
            <TabsTrigger value="properties" className="text-xs lg:text-sm">Properties</TabsTrigger>
          </TabsList>

          <TabsContent value="nodes" className="flex-1 p-4 space-y-3">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Message Nodes</Label>
              <div className="space-y-2">
                <div className="p-3 bg-blue-100 border border-blue-300 rounded-lg cursor-pointer hover:bg-blue-200 flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="text-sm">Send Message</span>
                </div>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Logic Nodes</Label>
              <div className="space-y-2">
                <div className="p-3 bg-yellow-100 border border-yellow-300 rounded-lg cursor-pointer hover:bg-yellow-200 flex items-center">
                  <GitBranch className="w-4 h-4 mr-2 text-yellow-600" />
                  <span className="text-sm">Condition</span>
                </div>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Data Nodes</Label>
              <div className="space-y-2">
                <div className="p-3 bg-purple-100 border border-purple-300 rounded-lg cursor-pointer hover:bg-purple-200 flex items-center">
                  <Database className="w-4 h-4 mr-2 text-purple-600" />
                  <span className="text-sm">Knowledge Base</span>
                </div>
                <div className="p-3 bg-orange-100 border border-orange-300 rounded-lg cursor-pointer hover:bg-orange-200 flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-orange-600" />
                  <span className="text-sm">API Call</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="properties" className="flex-1 p-4">
            {selectedNode ? (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Node Type</Label>
                  <p className="text-sm text-gray-600 capitalize">{selectedNode.type}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Title</Label>
                  <Input value={selectedNode.title} className="mt-1" />
                </div>
                {selectedNode.content && (
                  <div>
                    <Label className="text-sm font-medium">Content</Label>
                    <textarea
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm"
                      rows={4}
                      value={selectedNode.content}
                    />
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Select a node to edit its properties</p>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Main canvas */}
      <div className="flex-1 bg-gray-50 relative overflow-auto">
        <div className="absolute inset-0 bg-gray-50" style={{ backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
          <div className="relative w-full h-full min-w-[800px] min-h-[600px]">
            {mockNodes.map((node) => {
              const Icon = nodeTypeIcons[node.type];
              return (
                <div
                  key={node.id}
                  className={`absolute w-40 p-3 rounded-lg border-2 cursor-pointer hover:shadow-md transition-shadow ${nodeTypeColors[node.type]} ${selectedNode?.id === node.id ? 'ring-2 ring-blue-500' : ''}`}
                  style={{ left: node.position.x, top: node.position.y }}
                  onClick={() => handleNodeClick(node)}
                >
                  <div className="flex items-center mb-2">
                    <Icon className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">{node.title}</span>
                  </div>
                  {node.content && (
                    <p className="text-xs text-gray-600 truncate">{node.content}</p>
                  )}
                  {/* Connection points */}
                  <div className="absolute -right-2 top-1/2 w-4 h-4 bg-white border-2 border-gray-400 rounded-full transform -translate-y-1/2" />
                  <div className="absolute -left-2 top-1/2 w-4 h-4 bg-white border-2 border-gray-400 rounded-full transform -translate-y-1/2" />
                </div>
              );
            })}
            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line x1="240" y1="115" x2="300" y2="115" stroke="#6b7280" strokeWidth="2" />
              <line x1="440" y1="115" x2="500" y2="115" stroke="#6b7280" strokeWidth="2" />
              <line x1="640" y1="100" x2="700" y2="65" stroke="#6b7280" strokeWidth="2" />
              <line x1="640" y1="130" x2="700" y2="165" stroke="#6b7280" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, X, Edit, MessageSquare, Clock, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ReviewItem {
  id: string;
  userQuestion: string;
  botAnswer: string;
  trustScore: number;
  reasoning: string[];
  sourceSnippet: string;
  conversationId: string;
  timestamp: string;
  channel: string;
  status: 'pending' | 'approved' | 'rejected';
}

const mockReviewQueue: ReviewItem[] = [
  {
    id: '1',
    userQuestion: 'Do you have any gluten-free pasta options available?',
    botAnswer: 'We offer several gluten-free pasta dishes including penne arrabbiata and spaghetti carbonara made with rice-based pasta.',
    trustScore: 65,
    reasoning: ['Source data is 6 months old', 'Limited menu information', 'High confidence match'],
    sourceSnippet: 'Our gluten-free menu includes: Rice pasta penne with tomato sauce...',
    conversationId: 'conv_001',
    timestamp: '2024-06-21 14:30',
    channel: 'Web',
    status: 'pending'
  },
  {
    id: '2',
    userQuestion: 'What are your delivery hours on Sunday?',
    botAnswer: 'Our delivery service operates from 11:00 AM to 10:00 PM on Sunday.',
    trustScore: 45,
    reasoning: ['Conflicting information found', 'Source: Unverified URL', 'Needs human verification'],
    sourceSnippet: 'Sunday delivery: 11 AM - 10 PM (subject to change during holidays)',
    conversationId: 'conv_002',
    timestamp: '2024-06-21 13:15',
    channel: 'Messenger',
    status: 'pending'
  },
  {
    id: '3',
    userQuestion: 'Can I modify my order after placing it online?',
    botAnswer: 'You can modify your order within 5 minutes of placing it by calling our support line.',
    trustScore: 80,
    reasoning: ['Recent policy update', 'High confidence source', 'Clear documentation'],
    sourceSnippet: 'Order modification policy: Customers have 5 minutes after order confirmation...',
    conversationId: 'conv_003',
    timestamp: '2024-06-21 12:45',
    channel: 'Zalo',
    status: 'pending'
  }
];

const getTrustScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-600 bg-green-100';
  if (score >= 60) return 'text-yellow-600 bg-yellow-100';
  return 'text-red-600 bg-red-100';
};

const getTrustScoreIcon = (score: number) => {
  if (score >= 80) return <CheckCircle className="w-4 h-4" />;
  if (score >= 60) return <AlertTriangle className="w-4 h-4" />;
  return <X className="w-4 h-4" />;
};

export const AnswerReview: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<ReviewItem | null>(null);
  const [editedAnswer, setEditedAnswer] = useState('');

  const handleSelectItem = (item: ReviewItem) => {
    setSelectedItem(item);
    setEditedAnswer(item.botAnswer);
  };

  const handleApprove = () => {
    if (selectedItem) {
      console.log('Approved answer for:', selectedItem.id);
      setSelectedItem(null);
    }
  };

  const handleSaveAndApprove = () => {
    if (selectedItem) {
      console.log('Saved and approved edited answer for:', selectedItem.id, editedAnswer);
      setSelectedItem(null);
    }
  };

  const handleReject = () => {
    if (selectedItem) {
      console.log('Rejected answer for:', selectedItem.id);
      setSelectedItem(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Answer Review</h1>
        <p className="text-gray-600 mt-1">Review flagged bot responses to ensure accuracy and trust</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending Review</p>
                <p className="text-2xl font-bold text-orange-600">12</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Approved Today</p>
                <p className="text-2xl font-bold text-green-600">8</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg Trust Score</p>
                <p className="text-2xl font-bold text-blue-600">72%</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Auto-Approved</p>
                <p className="text-2xl font-bold text-gray-600">156</p>
              </div>
              <MessageSquare className="w-8 h-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Review Queue */}
        <Card>
          <CardHeader>
            <CardTitle>Review Queue</CardTitle>
            <CardDescription>
              Answers flagged for human review due to low confidence scores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockReviewQueue.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedItem?.id === item.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleSelectItem(item)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{item.channel}</Badge>
                      <span className="text-xs text-gray-500">{item.timestamp}</span>
                    </div>
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getTrustScoreColor(item.trustScore)}`}>
                      {getTrustScoreIcon(item.trustScore)}
                      <span>{item.trustScore}%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Q: {item.userQuestion}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">A: {item.botAnswer}</p>
                    </div>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-1">
                    {item.reasoning.map((reason, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {reason}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Review */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Review</CardTitle>
            <CardDescription>
              {selectedItem ? 'Review and edit the selected answer' : 'Select an item from the queue to review'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedItem ? (
              <div className="space-y-6">
                {/* User Question */}
                <div>
                  <Label className="text-sm font-medium text-gray-700">User's Question</Label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm">{selectedItem.userQuestion}</p>
                  </div>
                </div>

                {/* Trust Score & Reasoning */}
                <div>
                  <Label className="text-sm font-medium text-gray-700">Trust Assessment</Label>
                  <div className="mt-1 space-y-2">
                    <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${getTrustScoreColor(selectedItem.trustScore)}`}>
                      {getTrustScoreIcon(selectedItem.trustScore)}
                      <span className="font-medium">{selectedItem.trustScore}% Trusted</span>
                    </div>
                    <div className="space-y-1">
                      {selectedItem.reasoning.map((reason, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                          <span className="text-sm text-gray-600">{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Source Information */}
                <div>
                  <Label className="text-sm font-medium text-gray-700">Source Information</Label>
                  <div className="mt-1 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <p className="text-sm text-blue-800">{selectedItem.sourceSnippet}</p>
                  </div>
                </div>

                {/* Editable Answer */}
                <div>
                  <Label className="text-sm font-medium text-gray-700">Bot's Answer</Label>
                  <Textarea
                    value={editedAnswer}
                    onChange={(e) => setEditedAnswer(e.target.value)}
                    className="mt-1"
                    rows={4}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button onClick={handleSaveAndApprove} variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Save & Approve
                  </Button>
                  <Button onClick={handleReject} variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                    <X className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </div>

                {/* Conversation Context */}
                <div className="pt-4 border-t">
                  <Label className="text-sm font-medium text-gray-700">Conversation Context</Label>
                  <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>ID: {selectedItem.conversationId}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>Channel: {selectedItem.channel}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{selectedItem.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Select an item from the review queue to begin</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { Upload, FileText, Globe, Trash2, RefreshCw, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DataSource {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'csv' | 'url' | 'api';
  status: 'processing' | 'ready' | 'error';
  dateAdded: string;
  size?: string;
}

const mockDataSources: DataSource[] = [
  {
    id: '1',
    name: 'Restaurant Menu 2024.pdf',
    type: 'pdf',
    status: 'ready',
    dateAdded: '2024-06-20',
    size: '2.3 MB'
  },
  {
    id: '2',
    name: 'FAQ Documentation.docx',
    type: 'docx',
    status: 'ready',
    dateAdded: '2024-06-19',
    size: '856 KB'
  },
  {
    id: '3',
    name: 'Product Catalog',
    type: 'url',
    status: 'processing',
    dateAdded: '2024-06-21'
  },
  {
    id: '4',
    name: 'Allergen Information.csv',
    type: 'csv',
    status: 'error',
    dateAdded: '2024-06-18',
    size: '145 KB'
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'ready':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'processing':
      return <Clock className="w-4 h-4 text-yellow-500" />;
    case 'error':
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    default:
      return null;
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'pdf':
    case 'docx':
    case 'csv':
      return <FileText className="w-4 h-4 text-blue-500" />;
    case 'url':
      return <Globe className="w-4 h-4 text-green-500" />;
    default:
      return <FileText className="w-4 h-4 text-gray-500" />;
  }
};

export const KnowledgeHub: React.FC = () => {
  const [dragOver, setDragOver] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    // Handle file drop logic here
    console.log('Files dropped:', e.dataTransfer.files);
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      console.log('URL submitted:', urlInput);
      setUrlInput('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Knowledge Hub</h1>
        <p className="text-gray-600 mt-1">Manage your bot's knowledge base and data sources</p>
      </div>

      {/* Upload Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* File Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>Upload Documents</span>
            </CardTitle>
            <CardDescription>
              Upload PDFs, Word documents, or CSV files to expand your bot's knowledge
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Drag and drop files here, or</p>
              <Button variant="outline">Browse Files</Button>
              <p className="text-sm text-gray-500 mt-2">
                Supported: PDF, DOCX, CSV (max 10MB)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* URL Ingestion */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Web Content</span>
            </CardTitle>
            <CardDescription>
              Add web pages or documentation URLs for the bot to learn from
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="https://example.com/documentation"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleUrlSubmit()}
                />
                <Button onClick={handleUrlSubmit}>Add URL</Button>
              </div>
              <p className="text-sm text-gray-500">
                The system will crawl and extract relevant content from the provided URL
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Sources Table */}
      <Card>
        <CardHeader>
          <CardTitle>Data Sources</CardTitle>
          <CardDescription>
            All knowledge sources currently loaded into your bot
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDataSources.map((source) => (
                <TableRow key={source.id}>
                  <TableCell className="flex items-center space-x-2">
                    {getTypeIcon(source.type)}
                    <span className="font-medium">{source.name}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {source.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(source.status)}
                      <span className="capitalize">{source.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>{source.dateAdded}</TableCell>
                  <TableCell>{source.size || '-'}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Knowledge Graph Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Knowledge Structure</CardTitle>
          <CardDescription>
            Visual representation of how your data is organized and connected
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <FileText className="w-8 h-8" />
              </div>
              <p className="font-medium">Knowledge Graph Visualization</p>
              <p className="text-sm">Interactive visualization coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

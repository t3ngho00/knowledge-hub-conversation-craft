
import React, { useState } from 'react';
import { User, Users, CreditCard, Bell, Shield, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface WorkspaceUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'builder' | 'reviewer';
  status: 'active' | 'pending' | 'inactive';
  lastActive: string;
}

const mockUsers: WorkspaceUser[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@company.com',
    role: 'admin',
    status: 'active',
    lastActive: '2024-06-21 15:30'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@company.com',
    role: 'builder',
    status: 'active',
    lastActive: '2024-06-21 14:20'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@company.com',
    role: 'reviewer',
    status: 'pending',
    lastActive: 'Never'
  }
];

const getRoleBadge = (role: string) => {
  switch (role) {
    case 'admin':
      return <Badge variant="default">Admin</Badge>;
    case 'builder':
      return <Badge variant="secondary">Builder</Badge>;
    case 'reviewer':
      return <Badge variant="outline">Reviewer</Badge>;
    default:
      return <Badge variant="secondary">{role}</Badge>;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-100 text-green-800">Active</Badge>;
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    case 'inactive':
      return <Badge variant="secondary">Inactive</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export const Settings: React.FC = () => {
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('builder');

  const handleInviteUser = () => {
    if (inviteEmail.trim()) {
      console.log('Inviting user:', inviteEmail, 'as', inviteRole);
      setInviteEmail('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your workspace, users, and account preferences</p>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="workspace">Workspace</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        {/* User Management Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>Manage users and their access permissions</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Invite User</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Invite Team Member</DialogTitle>
                      <DialogDescription>
                        Send an invitation to add a new member to your workspace
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="invite-email">Email Address</Label>
                        <Input
                          id="invite-email"
                          type="email"
                          placeholder="colleague@company.com"
                          value={inviteEmail}
                          onChange={(e) => setInviteEmail(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="invite-role">Role</Label>
                        <select 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          value={inviteRole}
                          onChange={(e) => setInviteRole(e.target.value)}
                        >
                          <option value="reviewer">Reviewer - Can review and approve bot answers</option>
                          <option value="builder">Builder - Can create and edit bots</option>
                          <option value="admin">Admin - Full access to all features</option>
                        </select>
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline">Cancel</Button>
                        <Button onClick={handleInviteUser}>Send Invitation</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{user.lastActive}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-red-600">Remove</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Workspace Tab */}
        <TabsContent value="workspace" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Workspace Settings</CardTitle>
              <CardDescription>Configure your workspace preferences and defaults</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="workspace-name">Workspace Name</Label>
                <Input id="workspace-name" defaultValue="My Restaurant Bots" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="workspace-domain">Custom Domain</Label>
                <Input id="workspace-domain" placeholder="bots.myrestaurant.com" />
                <p className="text-sm text-gray-500">Optional: Use your own domain for bot widgets</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-language">Default Language</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="en">English</option>
                  <option value="vi">Vietnamese</option>
                  <option value="zh">Chinese</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="UTC+7">UTC+7 (Ho Chi Minh)</option>
                  <option value="UTC+0">UTC+0 (London)</option>
                  <option value="UTC-5">UTC-5 (New York)</option>
                </select>
              </div>

              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Control when and how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Bot Performance Alerts</div>
                    <div className="text-sm text-gray-500">Get notified when bot performance drops</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">High Volume Conversations</div>
                    <div className="text-sm text-gray-500">Alert when conversation volume spikes</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Answer Review Queue</div>
                    <div className="text-sm text-gray-500">Notify when answers need human review</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Weekly Reports</div>
                    <div className="text-sm text-gray-500">Receive weekly performance summaries</div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">System Updates</div>
                    <div className="text-sm text-gray-500">Get notified about new features and updates</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notification-email">Notification Email</Label>
                <Input id="notification-email" type="email" defaultValue="john@company.com" />
              </div>

              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Manage your subscription and billing information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-blue-900">Professional Plan</div>
                    <div className="text-sm text-blue-700">Up to 10 bots, unlimited conversations</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-900">$49/month</div>
                    <div className="text-sm text-blue-700">Billed monthly</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Next billing date:</span>
                    <span className="font-medium">July 21, 2024</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Payment method:</span>
                    <span className="font-medium">•••• •••• •••• 4242</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline">Change Plan</Button>
                  <Button variant="outline">Update Payment</Button>
                  <Button variant="outline">Cancel Subscription</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usage This Month</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Bots Created</span>
                    <span className="text-sm font-medium">4 / 10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">API Calls</span>
                    <span className="text-sm font-medium">15.2K / 50K</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Storage Used</span>
                    <span className="text-sm font-medium">2.1 GB / 10 GB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: '21%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View your past invoices and payments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Jun 21, 2024</TableCell>
                    <TableCell>Professional Plan - Monthly</TableCell>
                    <TableCell>$49.00</TableCell>
                    <TableCell><Badge className="bg-green-100 text-green-800">Paid</Badge></TableCell>
                    <TableCell><Button variant="ghost" size="sm">Download</Button></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>May 21, 2024</TableCell>
                    <TableCell>Professional Plan - Monthly</TableCell>
                    <TableCell>$49.00</TableCell>
                    <TableCell><Badge className="bg-green-100 text-green-800">Paid</Badge></TableCell>
                    <TableCell><Button variant="ghost" size="sm">Download</Button></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Apr 21, 2024</TableCell>
                    <TableCell>Professional Plan - Monthly</TableCell>
                    <TableCell>$49.00</TableCell>
                    <TableCell><Badge className="bg-green-100 text-green-800">Paid</Badge></TableCell>
                    <TableCell><Button variant="ghost" size="sm">Download</Button></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

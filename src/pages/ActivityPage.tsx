
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle, AlertTriangle, Info, Users, FileText } from 'lucide-react';

const allActivities = [
  {
    id: '1',
    type: 'success',
    message: 'Customer Support Bot answered 15 questions in the last hour',
    timestamp: '2 min ago',
    icon: CheckCircle,
    color: 'green'
  },
  {
    id: '2',
    type: 'warning',
    message: '5 questions flagged for review in Menu Q&A Bot',
    timestamp: '15 min ago',
    icon: AlertTriangle,
    color: 'yellow'
  },
  {
    id: '3',
    type: 'info',
    message: 'Knowledge base updated with 3 new documents',
    timestamp: '1 hour ago',
    icon: Info,
    color: 'blue'
  },
  {
    id: '4',
    type: 'success',
    message: 'Delivery Tracker Bot successfully processed 28 delivery updates',
    timestamp: '2 hours ago',
    icon: CheckCircle,
    color: 'green'
  },
  {
    id: '5',
    type: 'info',
    message: 'New user registered and started conversation with Customer Support Bot',
    timestamp: '3 hours ago',
    icon: Users,
    color: 'blue'
  },
  {
    id: '6',
    type: 'warning',
    message: 'Menu Q&A Bot failed to answer 2 complex dietary questions',
    timestamp: '4 hours ago',
    icon: AlertTriangle,
    color: 'yellow'
  },
  {
    id: '7',
    type: 'success',
    message: 'Customer Support Bot resolved 12 support tickets automatically',
    timestamp: '5 hours ago',
    icon: CheckCircle,
    color: 'green'
  },
  {
    id: '8',
    type: 'info',
    message: 'System backup completed successfully',
    timestamp: '6 hours ago',
    icon: Info,
    color: 'blue'
  },
  {
    id: '9',
    type: 'warning',
    message: '3 conversations escalated to human support',
    timestamp: '7 hours ago',
    icon: AlertTriangle,
    color: 'yellow'
  },
  {
    id: '10',
    type: 'success',
    message: 'Weekly performance report generated for all bots',
    timestamp: '8 hours ago',
    icon: FileText,
    color: 'green'
  },
  {
    id: '11',
    type: 'info',
    message: 'Knowledge base search optimization completed',
    timestamp: '12 hours ago',
    icon: Info,
    color: 'blue'
  },
  {
    id: '12',
    type: 'success',
    message: 'Customer Support Bot achieved 96% satisfaction rate yesterday',
    timestamp: '1 day ago',
    icon: CheckCircle,
    color: 'green'
  },
  {
    id: '13',
    type: 'warning',
    message: 'Server response time increased by 15% during peak hours',
    timestamp: '1 day ago',
    icon: AlertTriangle,
    color: 'yellow'
  },
  {
    id: '14',
    type: 'info',
    message: 'Monthly analytics report generated and sent to admins',
    timestamp: '2 days ago',
    icon: FileText,
    color: 'blue'
  },
  {
    id: '15',
    type: 'success',
    message: 'All bots passed weekly health check',
    timestamp: '3 days ago',
    icon: CheckCircle,
    color: 'green'
  }
];

const getActivityIcon = (activity: typeof allActivities[0]) => {
  const Icon = activity.icon;
  const colorClasses = {
    green: 'text-green-500',
    yellow: 'text-yellow-500',
    blue: 'text-blue-500'
  };
  
  return <Icon className={`w-5 h-5 ${colorClasses[activity.color as keyof typeof colorClasses]}`} />;
};

const getActivityDotColor = (color: string) => {
  const colorClasses = {
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    blue: 'bg-blue-500'
  };
  return colorClasses[color as keyof typeof colorClasses] || 'bg-gray-500';
};

export const ActivityPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/')}
          className="p-2"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recent Activity</h1>
          <p className="text-gray-600 mt-1">Complete history of all bot activities and system events</p>
        </div>
      </div>

      {/* Activity List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">All Activities</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>Last 7 days</span>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {allActivities.map((activity) => (
            <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 mb-1">{activity.message}</p>
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${getActivityDotColor(activity.color)}`}></div>
                    <span className="text-xs text-gray-500">{activity.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="p-6 border-t border-gray-200 text-center">
          <Button variant="outline" className="w-full sm:w-auto">
            Load More Activities
          </Button>
        </div>
      </div>
    </div>
  );
};

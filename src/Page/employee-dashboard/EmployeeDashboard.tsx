import React from 'react';
import { Users, ClipboardCheck, Pause, AlertCircle, DollarSign, Share2, FileText, Building2, MessageSquare } from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';

const EmployeeDashboard = () => {





  const stats = [
    { label: 'Total Task', value: '120', icon: Users, bgColor: 'bg-green-100', iconColor: 'text-green-600' },
    { label: 'Completed', value: '80', icon: ClipboardCheck, bgColor: 'bg-green-100', iconColor: 'text-green-600' },
    { label: 'In Progress', value: '30', icon: Pause, bgColor: 'bg-yellow-100', iconColor: 'text-yellow-600' },
    { label: 'Pending', value: '10', icon: AlertCircle, bgColor: 'bg-red-100', iconColor: 'text-red-600' },
    { label: 'Revenue This Month', value: '$89.2K', icon: DollarSign, bgColor: 'bg-blue-100', iconColor: 'text-blue-600' }
  ];

  const currentTasks = [
    {
      id: 1,
      title: 'Apartment 4B - Maintenance Check',
      client: 'Sarah Johnson',
      scheduled: '2:00 PM',
      status: 'In Progress',
      statusColor: 'bg-yellow-100 text-yellow-700',
      dotColor: 'bg-yellow-500',
      action: 'Complete'
    },
    {
      id: 2,
      title: 'Apartment 7A - Installation',
      client: 'Mike Davis',
      scheduled: '4:30 PM',
      status: 'Not Started',
      statusColor: 'bg-gray-100 text-gray-700',
      dotColor: 'bg-gray-400',
      action: 'Start'
    },
    {
      id: 3,
      title: 'Apartment 2C - Inspection',
      client: 'Emily Wilson',
      scheduled: 'Completed: 11:30 AM',
      status: 'Completed',
      statusColor: 'bg-green-100 text-green-700',
      dotColor: 'bg-green-500',
      action: 'View Details'
    }
  ];

  const chartData = [
    { month: 'Jan', value: 100 },
    { month: 'Feb', value: 120 },
    { month: 'Mar', value: 180 },
    { month: 'Apr', value: 200 },
    { month: 'May', value: 190 },
    { month: 'June', value: 280 },
    { month: 'July', value: 340 },
    { month: 'August', value: 280 },
    { month: 'September', value: 320 },
    { month: 'October', value: 240 },
    { month: 'November', value: 260 },
    { month: 'December', value: 300 }
  ];

  const quickActions = [
    {
      title: 'Open Assigned Form',
      description: 'Complete pending forms',
      icon: FileText,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'View Apartment History',
      description: 'Check past visits and notes',
      icon: Building2,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      title: 'Send WhatsApp Reply',
      description: 'Quick client communication',
      icon: MessageSquare,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    }
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-semibold">Welcome, Sarah Miller</h1>
          <Badge className="bg-green-100 text-green-700 border-green-200">
            • Active
          </Badge>
        </div>
        <Button className="gap-2">
          <Share2 size={16} />
          Share
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="text-sm text-gray-600">{stat.label}</div>
              <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon size={20} className={stat.iconColor} />
              </div>
            </div>
            <div className="text-3xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Tasks Overview Chart */}
      <div className="bg-white rounded-lg border p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold mb-1">Tasks Overview</h2>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">310</span>
              <span className="text-sm text-green-600">+10.7% last year</span>
            </div>
          </div>

          <Select >
            <SelectTrigger className="px-4 w-[96px0px] py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
              />
              <YAxis
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
                domain={[0, 400]}
                ticks={[0, 100, 200, 300, 400]}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Current Tasks */}
      <div className="bg-white rounded-lg border mb-6">
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <h2 className="text-lg font-semibold">Current Tasks</h2>
          <button className="text-sm text-blue-600 hover:underline">View All</button>
        </div>

        <div>
          {currentTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between border-b border-gray-200 p-4 rounded-lg hover:bg-gray-100 transition">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${task.dotColor}`}></div>
                <div>
                  <div className="font-medium text-sm mb-1">{task.title}</div>
                  <div className="text-xs text-gray-500">
                    Client: {task.client} • Scheduled: {task.scheduled}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className={task.statusColor}>
                  {task.status}
                </Badge>
                <Button
                  size="sm"
                  variant={task.action === 'View Details' ? 'outline' : 'default'}
                >
                  {task.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <div key={index} className="bg-white rounded-lg border hover:shadow-md transition cursor-pointer flex gap-4 items-center p-4">
              <div className={`w-12 h-12 rounded-lg ${action.bgColor} flex items-center justify-center`}>
                <action.icon size={24} className={action.iconColor} />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">{action.title}</h3>
                <p className="text-xs text-gray-500">{action.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;

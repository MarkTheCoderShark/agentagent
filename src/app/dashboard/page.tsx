'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  Plus,
  Play,
  Pause,
  Settings,
  BarChart3,
  Clock,
  CheckCircle,
  Users,
  Zap,
  TrendingUp,
  Activity,
  MessageSquare,
  FileText,
  ArrowRight,
  MoreVertical,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [agents] = useState([
    {
      id: 1,
      name: "Alex",
      role: "Marketing Assistant",
      status: "active",
      tasksToday: 23,
      tasksWeek: 156,
      avatar: "🤖",
      lastActive: "2 minutes ago",
      efficiency: 94,
    },
    {
      id: 2,
      name: "Sarah",
      role: "Customer Support",
      status: "active",
      tasksToday: 41,
      tasksWeek: 287,
      avatar: "👩‍💼",
      lastActive: "5 minutes ago",
      efficiency: 98,
    },
    {
      id: 3,
      name: "Marcus",
      role: "Data Analyst",
      status: "paused",
      tasksToday: 12,
      tasksWeek: 89,
      avatar: "📊",
      lastActive: "1 hour ago",
      efficiency: 91,
    },
  ]);

  const [recentTasks] = useState([
    {
      id: 1,
      agent: "Alex",
      task: "Created social media post for product launch",
      status: "completed",
      time: "2 minutes ago",
      type: "content",
    },
    {
      id: 2,
      agent: "Sarah",
      task: "Responded to customer inquiry about pricing",
      status: "completed",
      time: "5 minutes ago",
      type: "support",
    },
    {
      id: 3,
      agent: "Alex",
      task: "Generated weekly newsletter content",
      status: "in_progress",
      time: "8 minutes ago",
      type: "content",
    },
    {
      id: 4,
      agent: "Marcus",
      task: "Analyzed sales data for Q4 report",
      status: "needs_review",
      time: "15 minutes ago",
      type: "analysis",
    },
    {
      id: 5,
      agent: "Sarah",
      task: "Updated customer database with new leads",
      status: "completed",
      time: "22 minutes ago",
      type: "data",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "offline":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600";
      case "in_progress":
        return "text-blue-600";
      case "needs_review":
        return "text-orange-600";
      case "failed":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "content":
        return <FileText className="w-4 h-4" />;
      case "support":
        return <MessageSquare className="w-4 h-4" />;
      case "analysis":
        return <BarChart3 className="w-4 h-4" />;
      case "data":
        return <Users className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="section-padding py-4 border-b border-white/20 backdrop-blur-sm bg-white/80 sticky top-0 z-50">
        <div className="container-width flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">AgentForce</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Hire Agent
            </Button>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </nav>

      <div className="section-padding py-8">
        <div className="container-width">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Agent Command Center
            </h1>
            <p className="text-gray-600">
              Monitor and manage your AI workforce
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Active Agents
                  </CardTitle>
                  <Bot className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">3</div>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Tasks Today
                  </CardTitle>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">76</div>
                <div className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12% from yesterday
                </div>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Time Saved
                  </CardTitle>
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">12.5h</div>
                <div className="text-xs text-gray-500">This week</div>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Cost Savings
                  </CardTitle>
                  <Zap className="w-5 h-5 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">$2,340</div>
                <div className="text-xs text-gray-500">This month</div>
              </CardHeader>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Agents Panel */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Your AI Agents
                </h2>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-purple-600 border-purple-200 hover:bg-purple-50"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Agent
                </Button>
              </div>

              <div className="space-y-4">
                {agents.map((agent) => (
                  <Card key={agent.id} className="border-0 shadow-lg hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-3xl">{agent.avatar}</div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {agent.name}
                            </h3>
                            <p className="text-sm text-gray-600">{agent.role}</p>
                            <p className="text-xs text-gray-500">
                              Last active: {agent.lastActive}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900">
                              {agent.tasksToday} tasks today
                            </div>
                            <div className="text-xs text-gray-500">
                              {agent.tasksWeek} this week
                            </div>
                            <div className="text-xs text-green-600">
                              {agent.efficiency}% efficiency
                            </div>
                          </div>

                          <Badge
                            className={`${getStatusColor(agent.status)} border-0`}
                          >
                            {agent.status}
                          </Badge>

                          <div className="flex items-center space-x-2">
                            {agent.status === "active" ? (
                              <Button size="sm" variant="outline">
                                <Pause className="w-4 h-4" />
                              </Button>
                            ) : (
                              <Button size="sm" variant="outline">
                                <Play className="w-4 h-4" />
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              <Settings className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recent Activity
                </h2>
                <Button size="sm" variant="ghost">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-100">
                    {recentTasks.map((task) => (
                      <div key={task.id} className="p-4">
                        <div className="flex items-start space-x-3">
                          <div
                            className={`p-2 rounded-lg bg-gray-100 ${getTaskStatusColor(
                              task.status
                            )}`}
                          >
                            {getTaskIcon(task.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {task.task}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs text-gray-500">
                                by {task.agent}
                              </span>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-500">
                                {task.time}
                              </span>
                            </div>
                            <div className="mt-2">
                              <Badge
                                variant="secondary"
                                className={`text-xs ${
                                  task.status === "completed"
                                    ? "bg-green-100 text-green-800"
                                    : task.status === "in_progress"
                                    ? "bg-blue-100 text-blue-800"
                                    : task.status === "needs_review"
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {task.status.replace("_", " ")}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 shadow-lg mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Workflow
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    size="sm"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    size="sm"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Manage Integrations
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client'

import { useEffect, useState } from "react";
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
  const [agents, setAgents] = useState<any[]>([]);
  const [recentTasks, setRecentTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [assignText, setAssignText] = useState<Record<string, string>>({});

  async function runDemoTask(agentId: string, agentName: string) {
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: `Intro message from ${agentName}`,
        description: `Introduce yourself and list 3 ways you can help as ${agentName}.`,
        type: 'demo',
        agentId,
      }),
    });
    // refresh tasks
    const res = await fetch('/api/tasks');
    if (res.ok) setRecentTasks(await res.json());
  }

  async function assignTask(agentId: string, agentName: string) {
    const description = assignText[agentId]?.trim();
    if (!description) return;
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: `Task for ${agentName}`,
        description,
        type: 'content',
        agentId,
        execute: true,
      }),
    });
    setAssignText(prev => ({ ...prev, [agentId]: '' }));
    const res = await fetch('/api/tasks');
    if (res.ok) setRecentTasks(await res.json());
  }

  async function updateTaskStatus(id: string, status: string) {
    await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    const res = await fetch('/api/tasks');
    if (res.ok) setRecentTasks(await res.json());
  }

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const [agentsRes, tasksRes] = await Promise.all([
          fetch("/api/agents"),
          fetch("/api/tasks"),
        ]);
        if (!mounted) return;
        if (agentsRes.ok) setAgents(await agentsRes.json());
        if (tasksRes.ok) setRecentTasks(await tasksRes.json());
      } catch {}
      finally { if (mounted) setLoading(false); }
    }
    load();
    return () => { mounted = false }
  }, []);

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
      {/* Header bar below global nav */}
      <div className="bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-white/40">
        <div className="container-width flex h-14 items-center justify-between">
          <h1 className="text-base md:text-lg font-semibold text-gray-800">Agent Command Center</h1>
          <Link href="/dashboard/hire-agent">
            <span>
              <Button size="sm" className="bg-gradient-to-r from-[#4527a4] to-[#6a4c93] hover:from-[#4527a4]/90 hover:to-[#6a4c93]/90">
                <Plus className="w-4 h-4 mr-1"/> Hire Agent
              </Button>
            </span>
          </Link>
        </div>
      </div>

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
                <Link href="/dashboard/hire-agent">
                  <span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-purple-600 border-purple-200 hover:bg-purple-50"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Agent
                    </Button>
                  </span>
                </Link>
              </div>

              <div className="space-y-4">
                {agents.map((agent) => (
                  <Card key={agent.id} className="border-0 shadow-lg hover-lift">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-3xl">{agent.avatar ?? '🤖'}</div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                            <p className="text-sm text-gray-600">{agent.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" onClick={() => runDemoTask(agent.id, agent.name)}>
                            <Play className="w-4 h-4 mr-1" /> Run Demo Task
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          value={assignText[agent.id] || ''}
                          onChange={(e) => setAssignText(prev => ({ ...prev, [agent.id]: e.target.value }))}
                          placeholder={`Ask ${agent.name} to do something...`}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <Button onClick={() => assignTask(agent.id, agent.name)} disabled={!assignText[agent.id]?.trim()}>
                          Assign
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Recent Activity
              </h2>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="divide-y">
                    {recentTasks.length === 0 && (
                      <div className="p-6 text-sm text-gray-500">{loading ? 'Loading...' : 'No recent tasks yet.'}</div>
                    )}
                    {recentTasks.map((task: any) => (
                        <div key={task.id} className="p-4 space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <div className="mt-1 text-purple-600">
                                {getTaskIcon(task.type)}
                              </div>
                              <div>
                                <p className="text-sm text-gray-900">
                                  <span className="font-medium">{task.agent?.name ?? 'Agent'}</span>{' '}
                                  {task.title}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {new Date(task.createdAt ?? Date.now()).toLocaleString()}
                                </p>
                                {task.output?.text && (
                                  <pre className="mt-2 text-xs bg-gray-50 p-2 rounded border border-gray-100 whitespace-pre-wrap">{task.output.text}</pre>
                                )}
                              </div>
                            </div>
                            <div className={`text-xs font-medium ${getTaskStatusColor(task.status)}`}>
                              {task.status}
                            </div>
                          </div>
                          {task.status === 'needs_review' && (
                            <div className="flex items-center gap-2 pt-1">
                              <Button size="sm" variant="outline" onClick={() => updateTaskStatus(task.id, 'approved')}>Approve</Button>
                              <Button size="sm" variant="outline" onClick={() => updateTaskStatus(task.id, 'rejected')}>Reject</Button>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

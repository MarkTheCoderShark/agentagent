'use client'

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bot,
  Plus,
  Play,
  BarChart3,
  Clock,
  CheckCircle,
  Users,
  Zap,
  TrendingUp,
  Activity,
  MessageSquare,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Agent {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  description?: string;
  tone?: string;
  status?: string;
}

interface Task {
  id: string;
  title: string;
  status: string;
  type: string;
  createdAt: string;
  agent?: { name: string };
  output?: { text: string };
}

export default function DashboardPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [recentTasks, setRecentTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [assignText, setAssignText] = useState<Record<string, string>>({});
  const { status, data } = useSession();
  const [isOpeningPortal, setIsOpeningPortal] = useState(false);
  const [usage, setUsage] = useState<{ agentCount: number; agentLimit: number | null; taskCountMonth: number; taskLimitMonth: number | null; subscriptionTier: string } | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const router = useRouter();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [agentForm, setAgentForm] = useState<{ name: string; role: string; description: string; tone: string; status: string; avatar: string }>({ name: '', role: '', description: '', tone: 'professional', status: 'active', avatar: '' });

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

  function openAgentSettings(agent: Agent) {
    setEditingAgent(agent);
    setAgentForm({
      name: agent.name || '',
      role: agent.role || '',
      description: agent.description || '',
      tone: agent.tone || 'professional',
      status: agent.status || 'active',
      avatar: (agent as any).avatar || '',
    });
    setSettingsOpen(true);
  }

  async function saveAgentSettings() {
    if (!editingAgent) return;
    const res = await fetch(`/api/agents/${editingAgent.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(agentForm),
    });
    if (res.ok) {
      const updated = await res.json();
      setAgents(prev => prev.map(a => a.id === updated.id ? { ...a, ...updated } : a));
      setSettingsOpen(false);
      setEditingAgent(null);
    } else {
      alert('Failed to update agent');
    }
  }

  async function assignTask(agentId: string, agentName: string) {
    const description = assignText[agentId]?.trim();
    if (!description) return;

    // Refresh usage and gate if monthly task limit reached
    try {
      const usageRes = await fetch('/api/usage');
      if (usageRes.ok) {
        const latest = await usageRes.json();
        setUsage(latest);
        const limit = latest.taskLimitMonth;
        if (limit !== null && latest.taskCountMonth >= limit) {
          setShowUpgrade(true);
          return;
        }
      }
    } catch {}

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

    // bump local usage count if we track a finite limit
    setUsage(prev => prev ? { ...prev, taskCountMonth: prev.taskCountMonth + 1 } : prev);
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

  async function openBillingPortal() {
    try {
      setIsOpeningPortal(true);
      const res = await fetch('/api/billing/portal');
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.url) {
        window.location.href = data.url as string;
      } else {
        throw new Error(data?.message || 'Unable to open billing portal');
      }
    } catch (_err) {
      alert('Billing portal is not available yet.');
    } finally {
      setIsOpeningPortal(false);
    }
  }

  async function startCheckout(plan: 'pro') {
    try {
      setLoadingPlan(plan);
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, mode: 'subscription' }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.url) {
        window.location.href = data.url as string;
      } else {
        router.push(`/pricing?plan=${plan}`);
      }
    } catch {
      router.push(`/pricing?plan=${plan}`);
    } finally {
      setLoadingPlan(null);
    }
  }

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const [agentsRes, tasksRes, usageRes] = await Promise.all([
          fetch("/api/agents"),
          fetch("/api/tasks"),
          fetch("/api/usage"),
        ]);
        if (!mounted) return;
        if (agentsRes.ok) setAgents(await agentsRes.json());
        if (tasksRes.ok) setRecentTasks(await tasksRes.json());
        if (usageRes.ok) setUsage(await usageRes.json());
      } catch {}
      finally { if (mounted) setLoading(false); }
    }
    load();
    return () => { mounted = false }
  }, []);

  const _getStatusColor = (status: string) => {
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

  const plan = (data?.user as any)?.subscriptionTier || usage?.subscriptionTier || 'free';
  const reachedAgentLimit = usage?.agentLimit !== null && (usage?.agentCount ?? 0) >= (usage?.agentLimit ?? 0);

  function onHireAgentClick() {
    if (reachedAgentLimit) {
      setShowUpgrade(true);
      return;
    }
    router.push('/dashboard/hire-agent');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Header bar below global nav */}
      <div className="bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-white/40">
        <div className="container-width flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-base md:text-lg font-semibold text-gray-800">Agent Command Center</h1>
            <span className="text-xs px-2 py-1 rounded-full border bg-white text-gray-700">
              Plan: {plan}
              {usage?.agentLimit !== null && (
                <span className="ml-2 text-gray-500">Agents {usage?.agentCount ?? 0}/{usage?.agentLimit}</span>
              )}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="bg-gradient-to-r from-[#4527a4] to-[#6a4c93] hover:from-[#4527a4]/90 hover:to-[#6a4c93]/90" onClick={onHireAgentClick}>
              <Plus className="w-4 h-4 mr-1"/> Hire Agent
            </Button>
            {status === 'authenticated' && (
              <Button size="sm" variant="outline" onClick={openBillingPortal} disabled={isOpeningPortal}>
                {isOpeningPortal ? 'Opening…' : 'Manage Billing'}
              </Button>
            )}
          </div>
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
                <div className="text-2xl font-bold text-gray-900">{usage?.agentCount ?? 3}</div>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Tasks This Month
                  </CardTitle>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{usage?.taskCountMonth ?? 76}{usage?.taskLimitMonth !== null ? `/${usage?.taskLimitMonth}` : ''}</div>
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
                  onClick={onHireAgentClick}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Agent
                </Button>
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
                          <Button size="sm" variant="outline" onClick={() => openAgentSettings(agent)}>Settings</Button>
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
                    {recentTasks.map((task) => (
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

      {/* Upgrade Modal (Sheet) */}
      <Sheet open={showUpgrade} onOpenChange={setShowUpgrade}>
        <SheetContent side="bottom" className="rounded-t-2xl">
          <SheetHeader>
            <SheetTitle>Upgrade your plan</SheetTitle>
            <SheetDescription>
              You’ve reached your current plan’s limit. Upgrade to Pro to add more agents and unlock higher task limits and advanced workflows.
            </SheetDescription>
          </SheetHeader>
          <div className="p-4 space-y-3">
            <ul className="text-sm text-gray-600 list-disc pl-5">
              <li>Up to 10 agents</li>
              <li>5,000 tasks/month per agent</li>
              <li>Advanced workflows & priority support</li>
            </ul>
          </div>
          <SheetFooter>
            <Button onClick={() => startCheckout('pro')} disabled={loadingPlan === 'pro'} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              {loadingPlan === 'pro' ? 'Starting…' : 'Upgrade to Pro'}
            </Button>
            <Button variant="outline" onClick={() => setShowUpgrade(false)}>Maybe later</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Agent Settings (Sheet) */}
      <Sheet open={settingsOpen} onOpenChange={setSettingsOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Edit Agent</SheetTitle>
            <SheetDescription>Update your agent's profile and preferences.</SheetDescription>
          </SheetHeader>
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="agent-name">Name</Label>
              <Input id="agent-name" value={agentForm.name} onChange={(e) => setAgentForm(prev => ({ ...prev, name: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="agent-role">Role</Label>
              <Input id="agent-role" value={agentForm.role} onChange={(e) => setAgentForm(prev => ({ ...prev, role: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="agent-desc">Description</Label>
              <Input id="agent-desc" value={agentForm.description} onChange={(e) => setAgentForm(prev => ({ ...prev, description: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="agent-tone">Tone</Label>
              <select id="agent-tone" value={agentForm.tone} onChange={(e) => setAgentForm(prev => ({ ...prev, tone: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="friendly">Friendly</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="agent-status">Status</Label>
              <select id="agent-status" value={agentForm.status} onChange={(e) => setAgentForm(prev => ({ ...prev, status: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="offline">Offline</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="agent-avatar">Avatar (emoji)</Label>
              <Input id="agent-avatar" value={agentForm.avatar} onChange={(e) => setAgentForm(prev => ({ ...prev, avatar: e.target.value }))} />
            </div>
          </div>
          <SheetFooter>
            <Button onClick={saveAgentSettings} disabled={!editingAgent}>Save Changes</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

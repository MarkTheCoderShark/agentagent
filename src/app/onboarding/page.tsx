'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Bot, ArrowRight, Sparkles, PlugZap, Gauge, CheckCircle2 } from 'lucide-react'

const tools = [
  'Gmail',
  'Google Sheets',
  'Slack',
  'Notion',
  'Trello',
  'HubSpot',
]

const roles = [
  { id: 'marketing', name: 'Marketing Assistant', desc: 'Creates social posts, drafts newsletters, analyzes ad performance' },
  { id: 'support', name: 'Customer Support', desc: 'Replies to emails, manages tickets, answers FAQs' },
  { id: 'analyst', name: 'Data Analyst', desc: 'Analyzes data, creates reports, identifies trends' },
  { id: 'operations', name: 'Operations Assistant', desc: 'Schedules, spreadsheets, admin tasks' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [industry, setIndustry] = useState('')
  const [companySize, setCompanySize] = useState('')
  const [goal, setGoal] = useState('')
  const [selectedTools, setSelectedTools] = useState<string[]>([])
  const [role, setRole] = useState<string>('')
  const [agentName, setAgentName] = useState('')
  const [loading, setLoading] = useState(false)

  const toggleTool = (t: string) => {
    setSelectedTools(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
  }

  const canNext = () => {
    if (step === 1) return industry && companySize && goal
    if (step === 2) return role && agentName
    return true
  }

  const finish = async () => {
    try {
      setLoading(true)
      // Create first agent based on selected role
      const res = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: agentName,
          role: roles.find(r => r.id === role)?.name || 'Custom Agent',
          description: roles.find(r => r.id === role)?.desc,
          tone: 'professional',
          template: role,
        }),
      })
      if (res.ok) {
        router.push('/dashboard')
      } else {
        router.push('/dashboard')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Hero */}
      <section className="relative -mt-16 overflow-hidden bg-gradient-to-br from-[#4527a4] via-[#6a4c93] to-[#8b5fbf] text-white">
        <div className="container-width pt-24 md:pt-28 pb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">Let’s set up your first AI Employee</h1>
          <p className="mt-4 text-lg md:text-xl text-white/90 max-w-3xl mx-auto">Answer a few quick questions and we’ll hire and configure your first agent.</p>
        </div>
        <div className="w-full overflow-hidden"><svg className="relative block w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,0 C200,80 400,0 600,60 C800,120 1000,40 1200,100 L1200,120 L0,120 Z" fill="#ffffff"/></svg></div>
      </section>

      <div className="section-padding py-8">
        <div className="container-width max-w-4xl mx-auto">
          <div className="mb-6 flex items-center justify-center gap-3 text-sm text-gray-600">
            <span className={`inline-flex items-center gap-2 ${step >= 1 ? 'text-[#4527a4]' : ''}`}><Sparkles className="w-4 h-4"/>Preferences</span>
            <span>›</span>
            <span className={`inline-flex items-center gap-2 ${step >= 2 ? 'text-[#4527a4]' : ''}`}><Bot className="w-4 h-4"/>Agent</span>
            <span>›</span>
            <span className={`inline-flex items-center gap-2 ${step >= 3 ? 'text-[#4527a4]' : ''}`}><PlugZap className="w-4 h-4"/>Tools</span>
            <span>›</span>
            <span className={`inline-flex items-center gap-2 ${step >= 4 ? 'text-[#4527a4]' : ''}`}><Gauge className="w-4 h-4"/>Finish</span>
          </div>

          {step === 1 && (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Tell us about your business</CardTitle>
                <CardDescription>We’ll tailor recommendations for your first agent.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                  <input value={industry} onChange={e => setIndustry(e.target.value)} placeholder="e.g., Agency, E‑commerce, Real Estate" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company size</label>
                  <select value={companySize} onChange={e => setCompanySize(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="">Select…</option>
                    <option value="1-10">1–10</option>
                    <option value="11-50">11–50</option>
                    <option value="51-200">51–200</option>
                    <option value=">200">200+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Main goal for your first agent</label>
                  <input value={goal} onChange={e => setGoal(e.target.value)} placeholder="e.g., Automate customer replies" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"/>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Pick a role and name your agent</CardTitle>
                <CardDescription>We’ll preconfigure workflows for this role.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {roles.map(r => (
                    <button key={r.id} onClick={() => setRole(r.id)} className={`text-left p-4 rounded-xl border-2 transition ${role === r.id ? 'border-[#4527a4] bg-purple-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <div className="font-medium">{r.name}</div>
                      <div className="text-sm text-gray-600 mt-1">{r.desc}</div>
                    </button>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Agent name</label>
                  <input value={agentName} onChange={e => setAgentName(e.target.value)} placeholder="e.g., Alex" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"/>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Connect the tools you use</CardTitle>
                <CardDescription>You can change these later. We’ll recommend workflows accordingly.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {tools.map(t => (
                    <button key={t} onClick={() => toggleTool(t)} className={`p-3 rounded-lg border-2 text-sm transition ${selectedTools.includes(t) ? 'border-[#4527a4] bg-purple-50 text-[#4527a4]' : 'border-gray-200 hover:border-gray-300'}`}>{selectedTools.includes(t) ? <span className="inline-flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/>{t}</span> : t}</button>
                  ))}
                </div>
                <div className="mt-4">
                  <Link href="/integrations">
                    <span>
                      <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">Connect Google</Button>
                    </span>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 4 && (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>All set!</CardTitle>
                <CardDescription>We’ll create your agent and take you to the Command Center.</CardDescription>
              </CardHeader>
              <CardContent className="text-gray-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Role: <strong>{roles.find(r => r.id === role)?.name || '—'}</strong></li>
                  <li>Agent name: <strong>{agentName || '—'}</strong></li>
                  <li>Tools: {selectedTools.length ? selectedTools.join(', ') : 'None yet'}</li>
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="mt-6 flex items-center justify-between">
            <Link href="/">
              <span className="text-sm text-gray-500 hover:text-gray-700">Cancel</span>
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>Back</Button>
              {step < 4 ? (
                <Button onClick={() => setStep(step + 1)} disabled={!canNext()} className="bg-gradient-to-r from-[#4527a4] to-[#6a4c93] hover:from-[#4527a4]/90 hover:to-[#6a4c93]/90">Next<ArrowRight className="ml-2 w-4 h-4"/></Button>
              ) : (
                <Button onClick={finish} disabled={loading} className="bg-gradient-to-r from-[#4527a4] to-[#6a4c93] hover:from-[#4527a4]/90 hover:to-[#6a4c93]/90">Create Agent<ArrowRight className="ml-2 w-4 h-4"/></Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/toast'
import { Mail, Sheet, PlugZap } from 'lucide-react'

export default function IntegrationsPage() {
  const { show } = useToast()
  const [gmail, setGmail] = useState({ to: '', subject: '', body: '' })
  const [sheets, setSheets] = useState({ spreadsheetId: '', range: '', values: '' })

  function connectGoogle() {
    show({ title: 'Connect Google', description: 'OAuth flow coming soon.' })
  }

  function draftGmail() {
    if (!gmail.to || !gmail.subject) {
      show({ title: 'Missing fields', description: 'Please provide To and Subject.' })
      return
    }
    show({ title: 'Gmail Draft', description: 'Draft created (stub).' })
  }

  function appendSheets() {
    if (!sheets.spreadsheetId || !sheets.range || !sheets.values) {
      show({ title: 'Missing fields', description: 'Please provide spreadsheetId, range and values.' })
      return
    }
    show({ title: 'Sheets', description: 'Row appended (stub).' })
  }

  return (
    <div className="section-padding py-8 bg-gradient-to-br from-slate-50 via-white to-purple-50 min-h-screen">
      <div className="container-width max-w-5xl mx-auto space-y-8">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><PlugZap className="w-5 h-5 text-purple-600"/>Google</CardTitle>
            <CardDescription>Connect your Google account to enable Gmail and Sheets actions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={connectGoogle} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">Connect Google</Button>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Mail className="w-5 h-5 text-purple-600"/>Gmail: Draft Email</CardTitle>
              <CardDescription>Create a draft email using Gmail.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <Label>To</Label>
                <Input value={gmail.to} onChange={e => setGmail(prev => ({ ...prev, to: e.target.value }))} placeholder="user@example.com" />
              </div>
              <div className="space-y-1">
                <Label>Subject</Label>
                <Input value={gmail.subject} onChange={e => setGmail(prev => ({ ...prev, subject: e.target.value }))} placeholder="Subject" />
              </div>
              <div className="space-y-1">
                <Label>Body</Label>
                <textarea value={gmail.body} onChange={e => setGmail(prev => ({ ...prev, body: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[120px]" placeholder="Message" />
              </div>
              <Button onClick={draftGmail}>Create Draft</Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Sheet className="w-5 h-5 text-purple-600"/>Google Sheets: Append Row</CardTitle>
              <CardDescription>Append a row to a Google Sheet.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <Label>Spreadsheet ID</Label>
                <Input value={sheets.spreadsheetId} onChange={e => setSheets(prev => ({ ...prev, spreadsheetId: e.target.value }))} placeholder="..." />
              </div>
              <div className="space-y-1">
                <Label>Range (e.g., Sheet1!A1:C1)</Label>
                <Input value={sheets.range} onChange={e => setSheets(prev => ({ ...prev, range: e.target.value }))} placeholder="Sheet1!A1:C1" />
              </div>
              <div className="space-y-1">
                <Label>Values (CSV)</Label>
                <Input value={sheets.values} onChange={e => setSheets(prev => ({ ...prev, values: e.target.value }))} placeholder="a,b,c" />
              </div>
              <Button onClick={appendSheets}>Append Row</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
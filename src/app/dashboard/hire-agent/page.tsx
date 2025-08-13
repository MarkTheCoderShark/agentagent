'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, ArrowLeft, ArrowRight, Sparkles, MessageSquare, BarChart3, FileText, Users, Zap, Clock } from "lucide-react";
import Link from "next/link";

const agentTemplates = [
  {
    id: "marketing",
    name: "Marketing Assistant",
    description: "Creates social posts, drafts newsletters, analyzes ad performance",
    icon: <Sparkles className="w-6 h-6" />,
    color: "bg-purple-100 text-purple-600",
    tasks: ["Social media content creation", "Email newsletter drafting", "Ad performance analysis", "Content calendar management"],
    timeSaved: "8-12 hours/week",
    avatar: "📈"
  },
  {
    id: "support",
    name: "Customer Support",
    description: "Replies to emails, manages tickets, answers FAQs",
    icon: <MessageSquare className="w-6 h-6" />,
    color: "bg-blue-100 text-blue-600",
    tasks: ["Email response automation", "Ticket management", "FAQ handling", "Customer satisfaction tracking"],
    timeSaved: "15-20 hours/week",
    avatar: "👩‍💼"
  },
  {
    id: "analyst",
    name: "Data Analyst",
    description: "Analyzes data, creates reports, identifies trends",
    icon: <BarChart3 className="w-6 h-6" />,
    color: "bg-green-100 text-green-600",
    tasks: ["Data analysis and reporting", "Trend identification", "Performance metrics", "Insight generation"],
    timeSaved: "10-15 hours/week",
    avatar: "📊"
  },
  {
    id: "content",
    name: "Content Creator",
    description: "Writes blog posts, creates copy, manages content",
    icon: <FileText className="w-6 h-6" />,
    color: "bg-orange-100 text-orange-600",
    tasks: ["Blog post writing", "Copy creation", "Content optimization", "SEO content planning"],
    timeSaved: "12-18 hours/week",
    avatar: "✍️"
  },
  {
    id: "operations",
    name: "Operations Assistant",
    description: "Manages schedules, updates spreadsheets, handles admin tasks",
    icon: <Users className="w-6 h-6" />,
    color: "bg-indigo-100 text-indigo-600",
    tasks: ["Schedule management", "Spreadsheet updates", "Admin task automation", "Process documentation"],
    timeSaved: "6-10 hours/week",
    avatar: "⚙️"
  },
  {
    id: "custom",
    name: "Custom Agent",
    description: "Build your own agent with specific skills and workflows",
    icon: <Bot className="w-6 h-6" />,
    color: "bg-gray-100 text-gray-600",
    tasks: ["Custom workflow creation", "Specific task automation", "Tailored integrations", "Personalized responses"],
    timeSaved: "Variable",
    avatar: "🤖"
  }
];

export default function HireAgentPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [agentName, setAgentName] = useState("");
  const [agentTone, setAgentTone] = useState("professional");
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const selectedAgent = agentTemplates.find(template => template.id === selectedTemplate);

  const handleNext = () => {
    if (currentStep === 1 && selectedTemplate) {
      setCurrentStep(2);
    } else if (currentStep === 2 && agentName) {
      handleCreateAgent();
    }
  };

  const handleCreateAgent = async () => {
    try {
      const response = await fetch("/api/agents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: agentName,
          role: selectedAgent?.name || "Custom Agent",
          description: selectedAgent?.description,
          tone: agentTone,
          template: selectedTemplate,
        }),
      });

      if (response.ok) {
        router.push("/dashboard");
      }
    } catch (_error) {
      // Error creating agent
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="section-padding py-4 border-b border-white/20 backdrop-blur-sm bg-white/80 sticky top-0 z-50">
        <div className="container-width flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <span className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600">Back to Dashboard</span>
            </span>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">AgentForce</span>
          </div>
        </div>
      </nav>

      <div className="section-padding py-8">
        <div className="container-width max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Hire Your AI Employee
            </h1>
            <p className="text-xl text-gray-600">
              Choose a role and customize your agent in minutes
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep >= 1 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"
              }`}>
                1
              </div>
              <span className={`text-sm ${currentStep >= 1 ? "text-purple-600" : "text-gray-500"}`}>
                Choose Role
              </span>
              <div className={`w-8 h-1 ${currentStep >= 2 ? "bg-purple-600" : "bg-gray-200"}`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep >= 2 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"
              }`}>
                2
              </div>
              <span className={`text-sm ${currentStep >= 2 ? "text-purple-600" : "text-gray-500"}`}>
                Customize
              </span>
            </div>
          </div>

          {currentStep === 1 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agentTemplates.map((template) => (
                <Card
                  key={template.id}
                  className={`cursor-pointer transition-all duration-200 hover-lift border-2 ${
                    selectedTemplate === template.id
                      ? "border-purple-500 shadow-lg"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${template.color}`}>
                        {template.icon}
                      </div>
                      <div className="text-2xl">{template.avatar}</div>
                    </div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {template.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm text-gray-700 mb-2">Key Tasks:</h4>
                        <ul className="space-y-1">
                          {template.tasks.slice(0, 3).map((task, index) => (
                            <li key={index} className="text-xs text-gray-600 flex items-center">
                              <Zap className="w-3 h-3 mr-2 text-purple-500" />
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          {template.timeSaved}
                        </div>
                        {selectedTemplate === template.id && (
                          <Badge className="bg-purple-100 text-purple-800">
                            Selected
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {currentStep === 2 && selectedAgent && (
            <div className="max-w-2xl mx-auto">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${selectedAgent.color}`}>
                      {selectedAgent.icon}
                    </div>
                    <div className="text-2xl">{selectedAgent.avatar}</div>
                  </div>
                  <CardTitle className="text-xl">{selectedAgent.name}</CardTitle>
                  <CardDescription>{selectedAgent.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="agentName" className="text-sm font-medium text-gray-700">
                      Agent Name
                    </label>
                    <input
                      id="agentName"
                      type="text"
                      placeholder="e.g., Alex, Sarah, Marcus"
                      value={agentName}
                      onChange={(e) => setAgentName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Communication Tone
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {["professional", "casual", "friendly"].map((tone) => (
                        <button
                          key={tone}
                          onClick={() => setAgentTone(tone)}
                          className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                            agentTone === tone
                              ? "border-purple-500 bg-purple-50 text-purple-700"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          {tone.charAt(0).toUpperCase() + tone.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-sm text-gray-700 mb-2">What your agent will do:</h4>
                    <ul className="space-y-1">
                      {selectedAgent.tasks.map((task, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <Zap className="w-3 h-3 mr-2 text-purple-500" />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !selectedTemplate) ||
                (currentStep === 2 && !agentName)
              }
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {currentStep === 1 ? (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Hire Agent
                  <Sparkles className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 
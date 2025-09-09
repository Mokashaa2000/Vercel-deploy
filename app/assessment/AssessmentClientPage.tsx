"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, ArrowLeft, CheckCircle, TrendingUp, AlertTriangle, Target } from "lucide-react"
import { ArticleHeader } from "@/components/article-header"

interface Question {
  id: string
  question: string
  type: "radio" | "range"
  options?: { value: string; label: string; score: number }[]
  min?: number
  max?: number
  step?: number
  scoreMultiplier?: number
}

const questions: Question[] = [
  {
    id: "monthly_revenue",
    question: "What's your average monthly revenue?",
    type: "radio",
    options: [
      { value: "under_10k", label: "Under $10,000", score: 1 },
      { value: "10k_50k", label: "$10,000 - $50,000", score: 2 },
      { value: "50k_100k", label: "$50,000 - $100,000", score: 3 },
      { value: "100k_500k", label: "$100,000 - $500,000", score: 4 },
      { value: "over_500k", label: "Over $500,000", score: 5 },
    ],
  },
  {
    id: "profit_margin",
    question: "What's your current net profit margin?",
    type: "radio",
    options: [
      { value: "negative", label: "Negative (losing money)", score: 1 },
      { value: "0_5", label: "0-5%", score: 2 },
      { value: "5_15", label: "5-15%", score: 3 },
      { value: "15_25", label: "15-25%", score: 4 },
      { value: "over_25", label: "Over 25%", score: 5 },
    ],
  },
  {
    id: "roas_trend",
    question: "How has your ROAS (Return on Ad Spend) changed in the last 6 months?",
    type: "radio",
    options: [
      { value: "declining_fast", label: "Declining rapidly (>30% drop)", score: 1 },
      { value: "declining", label: "Declining moderately (10-30% drop)", score: 2 },
      { value: "stable", label: "Relatively stable", score: 3 },
      { value: "improving", label: "Improving moderately", score: 4 },
      { value: "improving_fast", label: "Improving significantly", score: 5 },
    ],
  },
  {
    id: "cash_flow",
    question: "How predictable is your cash flow?",
    type: "radio",
    options: [
      { value: "very_unpredictable", label: "Very unpredictable, constant stress", score: 1 },
      { value: "somewhat_unpredictable", label: "Somewhat unpredictable", score: 2 },
      { value: "moderately_predictable", label: "Moderately predictable", score: 3 },
      { value: "mostly_predictable", label: "Mostly predictable", score: 4 },
      { value: "very_predictable", label: "Very predictable, 13+ weeks forecasted", score: 5 },
    ],
  },
  {
    id: "inventory_management",
    question: "How would you rate your inventory management?",
    type: "radio",
    options: [
      { value: "chaotic", label: "Chaotic - frequent stockouts and overstock", score: 1 },
      { value: "basic", label: "Basic - some issues but manageable", score: 2 },
      { value: "decent", label: "Decent - occasional issues", score: 3 },
      { value: "good", label: "Good - well-organized system", score: 4 },
      { value: "excellent", label: "Excellent - automated and optimized", score: 5 },
    ],
  },
  {
    id: "customer_acquisition",
    question: "What's your biggest challenge with customer acquisition?",
    type: "radio",
    options: [
      { value: "too_expensive", label: "Customer acquisition costs are too high", score: 1 },
      { value: "declining_performance", label: "Ad performance is declining", score: 2 },
      { value: "scaling_issues", label: "Can't scale profitably", score: 2 },
      { value: "attribution_problems", label: "Attribution and tracking issues", score: 3 },
      { value: "no_major_issues", label: "No major issues", score: 5 },
    ],
  },
  {
    id: "data_tracking",
    question: "How confident are you in your data and analytics?",
    type: "radio",
    options: [
      { value: "not_confident", label: "Not confident - data seems unreliable", score: 1 },
      { value: "somewhat_confident", label: "Somewhat confident", score: 2 },
      { value: "moderately_confident", label: "Moderately confident", score: 3 },
      { value: "very_confident", label: "Very confident in most metrics", score: 4 },
      { value: "completely_confident", label: "Completely confident - comprehensive tracking", score: 5 },
    ],
  },
  {
    id: "time_management",
    question: "How much time do you spend on manual, repetitive tasks?",
    type: "radio",
    options: [
      { value: "most_time", label: "Most of my time (70%+)", score: 1 },
      { value: "significant_time", label: "Significant time (40-70%)", score: 2 },
      { value: "moderate_time", label: "Moderate time (20-40%)", score: 3 },
      { value: "little_time", label: "Little time (10-20%)", score: 4 },
      { value: "minimal_time", label: "Minimal time (<10%)", score: 5 },
    ],
  },
]

interface FormData {
  email: string
  firstName: string
  businessName: string
  website: string
  answers: Record<string, string>
}

export default function AssessmentClientPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    email: "",
    firstName: "",
    businessName: "",
    website: "",
    answers: {},
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [score, setScore] = useState(0)

  const totalSteps = questions.length + 2 // +2 for contact info and results
  const progress = ((currentStep + 1) / totalSteps) * 100

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.email && formData.firstName) {
      setCurrentStep(1)
    }
  }

  const handleAnswerChange = (questionId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: value,
      },
    }))
  }

  const calculateScore = () => {
    let totalScore = 0
    let maxScore = 0

    questions.forEach((question) => {
      const answer = formData.answers[question.id]
      if (answer && question.options) {
        const option = question.options.find((opt) => opt.value === answer)
        if (option) {
          totalScore += option.score
        }
      }
      maxScore += 5 // Each question has a max score of 5
    })

    return Math.round((totalScore / maxScore) * 100)
  }

  const getScoreInsights = (score: number) => {
    if (score >= 80) {
      return {
        level: "Excellent",
        color: "text-green-600",
        icon: CheckCircle,
        message: "Your eCommerce business is performing well! You have strong fundamentals in place.",
        recommendations: [
          "Focus on scaling your successful strategies",
          "Consider advanced optimization techniques",
          "Explore new market opportunities",
        ],
      }
    } else if (score >= 60) {
      return {
        level: "Good",
        color: "text-blue-600",
        icon: TrendingUp,
        message: "Your business has solid foundations with room for improvement in key areas.",
        recommendations: [
          "Optimize your highest-impact profit leaks",
          "Implement better tracking and analytics",
          "Streamline your operations",
        ],
      }
    } else if (score >= 40) {
      return {
        level: "Needs Improvement",
        color: "text-yellow-600",
        icon: Target,
        message: "Your business has potential but several areas need immediate attention.",
        recommendations: [
          "Focus on cash flow stabilization",
          "Improve inventory management",
          "Optimize ad spend and ROAS",
        ],
      }
    } else {
      return {
        level: "Critical",
        color: "text-red-600",
        icon: AlertTriangle,
        message: "Your business needs urgent attention to prevent further profit loss.",
        recommendations: [
          "Immediately audit all expenses",
          "Fix cash flow issues",
          "Consider professional consultation",
        ],
      }
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const calculatedScore = calculateScore()
      setScore(calculatedScore)

      // Submit to database and send email
      const response = await fetch("/api/assessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          score: calculatedScore,
          submittedAt: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        setIsCompleted(true)
        setCurrentStep(totalSteps - 1)
      } else {
        throw new Error("Failed to submit assessment")
      }
    } catch (error) {
      console.error("Error submitting assessment:", error)
      alert("There was an error submitting your assessment. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentQuestion = questions[currentStep - 1]
  const insights = score > 0 ? getScoreInsights(score) : null

  return (
    <div className="min-h-screen bg-gray-50">
      <ArticleHeader />

      <main className="py-8 px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Contact Information Step */}
          {currentStep === 0 && (
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Free eCommerce Profit Assessment</CardTitle>
                <CardDescription>
                  Discover where your business is bleeding profit in just 5 minutes. Get personalized insights sent to
                  your email.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessName">Business Name (Optional)</Label>
                    <Input
                      id="businessName"
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, businessName: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website URL (Optional)</Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://yourstore.com"
                      value={formData.website}
                      onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#042a5c] hover:bg-[#042a5c]/90">
                    Start Assessment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Question Steps */}
          {currentStep > 0 && currentStep <= questions.length && currentQuestion && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                  <span>
                    Question {currentStep} of {questions.length}
                  </span>
                </div>
                <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentQuestion.type === "radio" && currentQuestion.options && (
                  <RadioGroup
                    value={formData.answers[currentQuestion.id] || ""}
                    onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                  >
                    {currentQuestion.options.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50"
                      >
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>

                  {currentStep === questions.length ? (
                    <Button
                      onClick={handleSubmit}
                      disabled={!formData.answers[currentQuestion.id] || isSubmitting}
                      className="bg-[#042a5c] hover:bg-[#042a5c]/90"
                    >
                      {isSubmitting ? "Calculating..." : "Get My Results"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setCurrentStep(currentStep + 1)}
                      disabled={!formData.answers[currentQuestion.id]}
                      className="bg-[#042a5c] hover:bg-[#042a5c]/90"
                    >
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results Step */}
          {isCompleted && insights && (
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Your eCommerce Profit Score</CardTitle>
                <CardDescription>Based on your responses, here's your personalized assessment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Score Display */}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 mb-4">
                    <span className="text-3xl font-bold text-[#042a5c]">{score}</span>
                  </div>
                  <div className={`text-xl font-semibold ${insights.color}`}>
                    <insights.icon className="inline-block w-5 h-5 mr-2" />
                    {insights.level}
                  </div>
                  <p className="text-gray-600 mt-2">{insights.message}</p>
                </div>

                {/* Recommendations */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-4">Your Priority Action Items:</h3>
                  <ul className="space-y-2">
                    {insights.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="bg-[#042a5c] text-white p-6 rounded-lg text-center">
                  <h3 className="text-xl font-semibold mb-2">Ready to Fix These Issues?</h3>
                  <p className="mb-4 opacity-90">Get a detailed action plan in a free 30-minute profit audit call.</p>
                  <a
                    href="https://calendly.com/mhdkashalo/business-diagnostic-call"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" className="bg-white text-[#042a5c] hover:bg-white/90">
                      Book My Free Audit Call
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>

                <div className="text-center text-sm text-gray-600">
                  <p>
                    📧 A detailed report has been sent to your email: <strong>{formData.email}</strong>
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

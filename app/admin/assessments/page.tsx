"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  BarChart3,
  Users,
  TrendingUp,
  Search,
  Download,
  Calendar,
  Mail,
  Building,
  ExternalLink,
  Eye,
  Loader2,
} from "lucide-react"
import type { Assessment } from "@/lib/supabase"

export default function AssessmentsAdminPage() {
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    fetchAssessments()
  }, [searchTerm])

  const fetchAssessments = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        limit: "50",
        offset: "0",
        ...(searchTerm && { search: searchTerm }),
      })

      console.log("Fetching assessments with URL:", `/api/assessment?${params}`)

      const response = await fetch(`/api/assessment?${params}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text()
        console.error("Non-JSON response:", text)
        throw new Error("Server returned non-JSON response")
      }

      const result = await response.json()
      console.log("API response:", result)

      if (result.success) {
        setAssessments(result.data || [])
        setTotalCount(result.total || 0)
      } else {
        console.error("API returned error:", result.message)
        throw new Error(result.message || "Failed to fetch assessments")
      }
    } catch (error) {
      console.error("Error fetching assessments:", error)
      // Set empty state on error
      setAssessments([])
      setTotalCount(0)

      // You could also show a toast notification here
      alert(`Error loading assessments: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800"
    if (score >= 60) return "bg-blue-100 text-blue-800"
    if (score >= 40) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const getScoreLevel = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    if (score >= 40) return "Needs Improvement"
    return "Critical"
  }

  const averageScore =
    assessments.length > 0
      ? Math.round(assessments.reduce((sum, assessment) => sum + assessment.score, 0) / assessments.length)
      : 0

  const criticalCount = assessments.filter((a) => a.score < 40).length
  const goodCount = assessments.filter((a) => a.score >= 60).length

  const exportData = () => {
    const csvContent = [
      ["ID", "Name", "Email", "Business", "Website", "Score", "Level", "Submitted Date", "Answers"].join(","),
      ...assessments.map((assessment) =>
        [
          assessment.id,
          assessment.first_name,
          assessment.email,
          assessment.business_name || "",
          assessment.website || "",
          assessment.score,
          getScoreLevel(assessment.score),
          new Date(assessment.submitted_at).toLocaleDateString(),
          JSON.stringify(assessment.answers).replace(/,/g, ";"), // Replace commas in JSON to avoid CSV issues
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `assessments-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  // Question labels for better display
  const questionLabels: Record<string, string> = {
    monthly_revenue: "Monthly Revenue",
    profit_margin: "Profit Margin",
    roas_trend: "ROAS Trend",
    cash_flow: "Cash Flow Predictability",
    inventory_management: "Inventory Management",
    customer_acquisition: "Customer Acquisition Challenge",
    data_tracking: "Data & Analytics Confidence",
    time_management: "Time on Manual Tasks",
  }

  const getAnswerLabel = (questionId: string, value: string) => {
    // You could create a mapping of all answer values to labels here
    // For now, we'll just format the value
    return value.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Assessment Dashboard</h1>
            <p className="text-gray-600">Monitor and analyze eCommerce profit assessments</p>
          </div>
          <Button onClick={exportData} className="bg-[#042a5c] hover:bg-[#042a5c]/90">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCount}</div>
              <p className="text-xs text-muted-foreground">All time submissions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageScore}/100</div>
              <p className="text-xs text-muted-foreground">Industry benchmark: 55</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Performers</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{goodCount}</div>
              <p className="text-xs text-muted-foreground">Score 60+ (Good/Excellent)</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Need Attention</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{criticalCount}</div>
              <p className="text-xs text-muted-foreground">Score below 40 (Critical)</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Assessment Results</CardTitle>
            <CardDescription>View and analyze individual assessment submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, business, or website..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contact</TableHead>
                    <TableHead>Business</TableHead>
                    <TableHead>Website</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                        <p className="mt-2 text-gray-500">Loading assessments...</p>
                      </TableCell>
                    </TableRow>
                  ) : assessments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <p className="text-gray-500">No assessments found</p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    assessments.map((assessment) => (
                      <TableRow key={assessment.id}>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-400" />
                              <span className="font-medium">{assessment.first_name}</span>
                            </div>
                            <span className="text-sm text-gray-600">{assessment.email}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-gray-400" />
                            <span>{assessment.business_name || "Not provided"}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {assessment.website ? (
                            <a
                              href={assessment.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#042a5c] hover:underline flex items-center gap-1"
                            >
                              <ExternalLink className="h-3 w-3" />
                              Visit Site
                            </a>
                          ) : (
                            <span className="text-gray-400">Not provided</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="text-lg font-semibold">{assessment.score}/100</span>
                        </TableCell>
                        <TableCell>
                          <Badge className={getScoreColor(assessment.score)}>{getScoreLevel(assessment.score)}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{new Date(assessment.submitted_at).toLocaleDateString()}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedAssessment(assessment)}>
                                <Eye className="h-4 w-4 mr-1" />
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Assessment Details</DialogTitle>
                                <DialogDescription>
                                  Detailed view of {assessment.first_name}'s assessment submission
                                </DialogDescription>
                              </DialogHeader>

                              {selectedAssessment && (
                                <div className="space-y-6">
                                  {/* Contact Info */}
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-semibold text-sm text-gray-600">Contact Information</h4>
                                      <p className="font-medium">{selectedAssessment.first_name}</p>
                                      <p className="text-sm text-gray-600">{selectedAssessment.email}</p>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-sm text-gray-600">Business Details</h4>
                                      <p className="font-medium">
                                        {selectedAssessment.business_name || "Not provided"}
                                      </p>
                                      {selectedAssessment.website && (
                                        <a
                                          href={selectedAssessment.website}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-sm text-[#042a5c] hover:underline flex items-center gap-1"
                                        >
                                          <ExternalLink className="h-3 w-3" />
                                          {selectedAssessment.website}
                                        </a>
                                      )}
                                    </div>
                                  </div>

                                  {/* Score */}
                                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <div className="text-3xl font-bold text-[#042a5c] mb-2">
                                      {selectedAssessment.score}/100
                                    </div>
                                    <Badge className={getScoreColor(selectedAssessment.score)}>
                                      {getScoreLevel(selectedAssessment.score)}
                                    </Badge>
                                  </div>

                                  {/* Answers */}
                                  <div>
                                    <h4 className="font-semibold text-lg mb-4">Assessment Answers</h4>
                                    <div className="space-y-3">
                                      {Object.entries(selectedAssessment.answers).map(([questionId, answer]) => (
                                        <div key={questionId} className="border-l-4 border-[#042a5c] pl-4">
                                          <h5 className="font-medium text-sm text-gray-700">
                                            {questionLabels[questionId] || questionId}
                                          </h5>
                                          <p className="text-gray-600">{getAnswerLabel(questionId, answer)}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Submission Date */}
                                  <div className="text-sm text-gray-500 border-t pt-4">
                                    Submitted on {new Date(selectedAssessment.submitted_at).toLocaleString()}
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

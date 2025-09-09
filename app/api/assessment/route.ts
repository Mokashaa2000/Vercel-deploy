import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import type { AssessmentInsert } from "@/lib/supabase"

interface AssessmentData {
  email: string
  firstName: string
  businessName: string
  website: string
  answers: Record<string, string>
  score: number
  submittedAt: string
}

export async function POST(request: NextRequest) {
  try {
    const data: AssessmentData = await request.json()

    // Prepare data for database insertion
    const assessmentData: AssessmentInsert = {
      email: data.email,
      first_name: data.firstName,
      business_name: data.businessName || null,
      website: data.website || null,
      score: data.score,
      answers: data.answers,
    }

    // Insert into Supabase
    const { data: insertedData, error } = await supabaseAdmin
      .from("assessments")
      .insert([assessmentData])
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      throw new Error(`Database insertion failed: ${error.message}`)
    }

    console.log("Assessment saved to database:", insertedData.id)

    // Send email with insights
    await sendAssessmentEmail(data)

    return NextResponse.json({
      success: true,
      message: "Assessment submitted successfully",
      id: insertedData.id,
    })
  } catch (error) {
    console.error("Error processing assessment:", error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to process assessment",
      },
      { status: 500 },
    )
  }
}

// GET endpoint to retrieve assessments (for admin dashboard)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Math.min(Number.parseInt(searchParams.get("limit") || "50"), 100) // Cap at 100
    const offset = Math.max(Number.parseInt(searchParams.get("offset") || "0"), 0)
    const search = searchParams.get("search")?.trim() || ""

    console.log("Fetching assessments with params:", { limit, offset, search })

    // Start with base query
    let query = supabaseAdmin
      .from("assessments")
      .select("*", { count: "exact" })
      .order("submitted_at", { ascending: false })

    // Add search functionality if search term provided
    if (search) {
      query = query.or(
        `email.ilike.%${search}%,first_name.ilike.%${search}%,business_name.ilike.%${search}%,website.ilike.%${search}%`,
      )
    }

    // Add pagination
    query = query.range(offset, offset + limit - 1)

    const { data, error, count } = await query

    if (error) {
      console.error("Supabase error:", error)
      throw new Error(`Database query failed: ${error.message}`)
    }

    console.log(`Successfully fetched ${data?.length || 0} assessments`)

    return NextResponse.json({
      success: true,
      data: data || [],
      total: count || 0,
      pagination: {
        limit,
        offset,
        hasMore: (count || 0) > offset + limit,
      },
    })
  } catch (error) {
    console.error("Error in GET /api/assessment:", error)

    // Return a more detailed error response
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
        error: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 },
    )
  }
}

async function sendAssessmentEmail(data: AssessmentData) {
  // This would typically use an email service like Resend, SendGrid, etc.
  // For now, we'll just log what would be sent

  const emailContent = generateEmailContent(data)

  console.log("Email would be sent to:", data.email)
  console.log("Email content:", emailContent)

  // Simulate email sending delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
}

function generateEmailContent(data: AssessmentData) {
  const getScoreInsights = (score: number) => {
    if (score >= 80) {
      return {
        level: "Excellent",
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
        message: "Your business needs urgent attention to prevent further profit loss.",
        recommendations: [
          "Immediately audit all expenses",
          "Fix cash flow issues",
          "Consider professional consultation",
        ],
      }
    }
  }

  const insights = getScoreInsights(data.score)

  return `
    Subject: Your eCommerce Profit Assessment Results - ${data.score}/100

    Hi ${data.firstName},

    Thank you for taking the eCommerce Profit Assessment! Here are your personalized results:

    📊 BUSINESS DETAILS:
    ${data.businessName ? `Business: ${data.businessName}` : ""}
    ${data.website ? `Website: ${data.website}` : ""}

    🎯 YOUR SCORE: ${data.score}/100 (${insights.level})

    ${insights.message}

    📋 YOUR PRIORITY ACTION ITEMS:
    ${insights.recommendations.map((rec, index) => `${index + 1}. ${rec}`).join("\n")}

    💡 NEXT STEPS:
    Based on your assessment, I recommend booking a free 30-minute profit audit call where we can:
    - Dive deeper into your specific challenges
    - Create a custom action plan for your business
    - Identify the quickest wins to increase your profits

    Book your free call here: https://calendly.com/mhdkashalo/business-diagnostic-call

    Best regards,
    MKProfit Team

    P.S. This assessment identified several areas where most eCommerce businesses lose 20-30% of their potential profits. Don't let these opportunities slip away!
  `
}

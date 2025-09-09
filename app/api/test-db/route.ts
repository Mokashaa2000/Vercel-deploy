import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET() {
  try {
    console.log("Testing database connection...")

    // Test basic connection
    const { data, error } = await supabaseAdmin.from("assessments").select("count", { count: "exact", head: true })

    if (error) {
      console.error("Database connection error:", error)
      return NextResponse.json(
        {
          success: false,
          message: "Database connection failed",
          error: error.message,
          details: error,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      totalRecords: data || 0,
    })
  } catch (error) {
    console.error("Test endpoint error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Test failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

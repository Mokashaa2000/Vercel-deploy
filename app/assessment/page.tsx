import type { Metadata } from "next"
import AssessmentClientPage from "./AssessmentClientPage"

export const metadata: Metadata = {
  title: "Free eCommerce Profit Assessment | MKProfit",
  description:
    "Take our 5-minute assessment to discover where your eCommerce business is bleeding profit and get personalized recommendations.",
}

export default function AssessmentPage() {
  return <AssessmentClientPage />
}

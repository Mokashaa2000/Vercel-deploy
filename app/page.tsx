import type { Metadata } from "next";
import LandingPageClient from "./landing-page-client"; // Import the new client component

// This file is now a SERVER COMPONENT
// It's responsible for things that must happen on the server, like metadata.

export const metadata: Metadata = {
  title: "MKProfit | Boost Your eCommerce Profits in 6 Months",
  description:
    "Discover where your eCommerce business is bleeding profit. increase your profits by 20-30% in 6 months, or your money back.",
  keywords:
    "eCommerce consulting, profit optimization, eCommerce profit, ROAS improvement, cash flow management, inventory management, eCommerce growth strategy, eCommerce audit service, reduce ad spend, increase online store profits, eCommerce business scaling, eCommerce performance optimization, shopify profit consulting, woocommerce growth expert, eCommerce KPIs improvement, customer acquisition strategy, eCommerce analytics expert, sales funnel optimization, eCommerce CRO, eCommerce profit audit, ecommerce data-driven marketing, ERPNext ecommerce integration, ecommerce AI consulting, data science for ecommerce, ecommerce profitability expert, ecommerce business intelligence, ecommerce automation strategy, ecommerce ROI improvement, ecommerce growth hacking, ecommerce funnel optimization, ecommerce machine learning strategy, ecommerce operational consulting, Shopify ERP integration, Woocommerce ERPNext setup, ecommerce analytics dashboard, ecommerce financial forecasting, ecommerce business transformation, ecommerce strategy consultant, ecommerce business efficiency, ecommerce profit recovery service, ecommerce sales acceleration",
    icons: {
    icon: "/iconss.png", // Path to your favicon in the /public folder
  },
  openGraph: {
    title: "MKProfit | Stop Bleeding Revenue — Boost Your eCommerce Profits in 6 Months",
    description:
      "Discover where your eCommerce business is bleeding profit. increase your profits by 20-30% in 6 months, or your money back.",
    type: "website",
  },
};

export default function Page() {
  // This server component now just renders the client component.
  return <LandingPageClient />;
}
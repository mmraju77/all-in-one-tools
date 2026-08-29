import { ReactNode } from "react";

export const metadata = {
  title: "Pricing | Multi Tools Engine",
  description: "Get unlimited access to 10,000+ Premium AI, SEO, and Developer tools.",
};

export default function PricingLayout({ children }: { children: ReactNode }) {
  return <section>{children}</section>;
}
import { Metadata } from "next";
import { Shield, Zap, HelpCircle, AlertCircle } from "lucide-react";
import RelatedTools from "@/components/shared/RelatedTools";
import ToolWorkspace from "@/components/tools/ToolWorkspace";
import { allToolsList } from "@/lib/all-tools";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || "tool";
  const toolName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  return {
    title: `${toolName} - Free Online Tool | Multi Tools Engine Platform`,
    description: `Use our free online ${toolName} to boost your productivity. No downloads required, 100% secure, and lightning fast.`,
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || "tool";
  
  const foundTool = allToolsList.find(t => t.slug.toLowerCase() === slug.toLowerCase());
  const toolName = foundTool ? foundTool.name : slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const toolCategory = foundTool ? foundTool.category : "AI Tools";

  // Dynamic Disclaimer Logic based on Category
  let disclaimerTitle = "General Tool Disclaimer";
  let disclaimerText = `The ${toolName.toLowerCase()} provides estimations, calculations, and AI-generated text/code. It is strictly NOT intended to replace professional advice, certified enterprise software, or human verification. Always verify critical data before use in production environments.`;

  if (toolCategory.includes("Medical") || toolCategory.includes("Health") || toolCategory.includes("Nutrition") || toolCategory.includes("Fitness") || toolCategory.includes("Parenting") || (toolCategory.includes("Healthcare") && !toolCategory.includes("Administration"))) {
      disclaimerTitle = "Health & Medical Disclaimer";
      disclaimerText = `This ${toolName.toLowerCase()} is for educational and utility purposes only. It is NOT a substitute for professional medical, clinical diagnosis, veterinary, pediatric, or certified fitness advice. Always consult a qualified professional.`;
  } else if (toolCategory.includes("Finance") || toolCategory.includes("Tax") || toolCategory.includes("Crypto") || toolCategory.includes("Stock") || toolCategory.includes("Banking") || toolCategory.includes("Insurance") || toolCategory.includes("Payroll") || toolCategory.includes("Compensation") || toolCategory.includes("Procurement") || toolCategory.includes("Purchasing")) {
      disclaimerTitle = "Financial, HR & Procurement Disclaimer";
      disclaimerText = `The calculations provided by the ${toolName.toLowerCase()} are for informational purposes only and do not constitute financial, investment, accounting, binding insurance offers, official payroll execution, or tax advice. Please consult a certified professional.`;
  } else if (toolCategory.includes("Legal") || toolCategory.includes("Compliance") || toolCategory.includes("Government") || toolCategory.includes("Governance")) {
      disclaimerTitle = "Legal & Compliance Disclaimer";
      disclaimerText = `The generated templates, frameworks, and compliance checks are for informational and guidance purposes only. They do NOT constitute legal advice. Please consult with a qualified attorney or legal counsel.`;
  } else if (toolCategory.includes("Cybersecurity") || toolCategory.includes("Security") || toolCategory.includes("Identity") || toolCategory.includes("Access")) {
      disclaimerTitle = "Security & IAM Disclaimer";
      disclaimerText = `The ${toolName.toLowerCase()} provides generic security assessments, IAM matrices, and compliance checks. It is NOT intended to replace certified penetration testing, enterprise auditing, or legal compliance checks.`;
  } else if (toolCategory.includes("Facility") || toolCategory.includes("Manufacturing") || toolCategory.includes("IoT") || toolCategory.includes("Engineering") || toolCategory.includes("Supply Chain") || toolCategory.includes("Logistics")) {
       disclaimerTitle = "Industrial & Operations Disclaimer";
       disclaimerText = `The ${toolName.toLowerCase()} provides generic estimations and planning metrics. It is strictly NOT intended to replace rigorous physical testing, certified ERP/WMS systems, or official equipment specifications.`;
  } else if (toolCategory.includes("Public Relations") || toolCategory.includes("Media")) {
       disclaimerTitle = "PR & Media Communications Disclaimer";
       disclaimerText = `The ${toolName.toLowerCase()} provides generic templates and strategies. Please review all communications for brand consistency and legal compliance before public or media distribution.`;
  } else if (toolCategory.includes("Product Management")) {
       disclaimerTitle = "Product Strategy Disclaimer";
       disclaimerText = `The ${toolName.toLowerCase()} provides product ideation, roadmapping, and estimations. All generated requirements or scores should be validated against actual user data and business capabilities before execution.`;
  } else if (toolCategory.includes("Project Management")) {
       disclaimerTitle = "Project Management & Delivery Disclaimer";
       disclaimerText = `The ${toolName.toLowerCase()} provides generic project timelines, effort estimations, and critical path calculations. It is intended for planning purposes and should be aligned with team velocity and actual constraints.`;
  } else if (toolCategory.includes("Consulting") || toolCategory.includes("Professional Services")) {
       disclaimerTitle = "Consulting & Professional Services Disclaimer";
       disclaimerText = `The ${toolName.toLowerCase()} provides generic business estimations, pricing models, and proposal frameworks. It is strictly NOT intended to replace formal legally-binding contracts or certified accounting/legal advice. Always review terms with a qualified professional.`;
  } else if (toolCategory.includes("Retail Operations")) {
       disclaimerTitle = "Retail & Store Operations Disclaimer";
       disclaimerText = `The ${toolName.toLowerCase()} provides generic store operations estimations, retail math calculations, and planning metrics. It is strictly NOT intended to replace certified point-of-sale (POS) systems, official inventory management software, or professional financial advice. Always verify data against actual store records.`;
  } else if (toolCategory.includes("Hospitality") || toolCategory.includes("Restaurant") || toolCategory.includes("Healthcare Administration")) {
       disclaimerTitle = "Hospitality & Operations Disclaimer";
       disclaimerText = `The ${toolName.toLowerCase()} provides generic operational estimations, recipe costing, and planning metrics. It is strictly NOT intended to replace certified point-of-sale (POS) systems, official inventory/medical administration software, or professional health/safety advice. Always verify data against actual operational records.`;
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">{toolName}</h1>
          <p className="text-slate-400 max-w-2xl mx-auto mb-6">
            Free, fast, and secure online {toolName.toLowerCase()}. Process your data locally in your browser.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-500 border-t border-slate-800/50 pt-6 max-w-lg mx-auto">
            <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-emerald-500" /> 100% Secure</span>
            <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-yellow-500" /> Lightning Fast</span>
            <span className="flex items-center gap-1.5 text-white font-medium">Rating: 4.9/5</span>
          </div>
        </div>

        {/* 🚀 New Tool Workspace (Contains the new Rating and How to Use sections) */}
        <ToolWorkspace toolName={toolName} slug={slug} category={toolCategory} />

        {/* Dynamic Disclaimer */}
        <div className="mb-12 p-6 bg-amber-500/10 border border-amber-500/20 rounded-3xl flex items-start gap-4">
          <AlertCircle className="h-6 w-6 text-amber-400 shrink-0 mt-1" />
          <div>
            <h4 className="text-amber-300 font-bold mb-2 text-lg">{disclaimerTitle}</h4>
            <p className="text-sm text-amber-200/80 leading-relaxed">
              {disclaimerText}
            </p>
          </div>
        </div>

        {/* 5 FAQs SECTION */}
        <div className="mb-16 bg-slate-900 border border-slate-800 p-8 rounded-3xl">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-blue-400" /> Frequently Asked Questions
          </h3>
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-5">
              <h4 className="text-lg font-semibold text-slate-200 mb-2">1. Is this {toolName} free to use?</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Yes, this tool is completely free to use with no hidden charges, mandatory sign-ups, or artificial limits.</p>
            </div>
            <div className="border-b border-slate-800 pb-5">
              <h4 className="text-lg font-semibold text-slate-200 mb-2">2. Do I need to download or install any software?</h4>
              <p className="text-sm text-slate-400 leading-relaxed">No, everything operates directly inside your web browser. No software installation, app download, or extension is required.</p>
            </div>
            <div className="border-b border-slate-800 pb-5">
              <h4 className="text-lg font-semibold text-slate-200 mb-2">3. Is my input data secure and private?</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Absolutely. All data processing and calculations are performed locally in your browser or through encrypted connections without storing your private data.</p>
            </div>
            <div className="border-b border-slate-800 pb-5">
              <h4 className="text-lg font-semibold text-slate-200 mb-2">4. How accurate are the results provided by {toolName}?</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Our platform uses verified algorithmic calculations, industry-standard formulas, and AI models to ensure high technical precision and accuracy.</p>
            </div>
            <div className="border-b border-slate-800 pb-5">
              <h4 className="text-lg font-semibold text-slate-200 mb-2">5. Can I copy or download my output results?</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Yes! You can instantly copy the calculated output to your clipboard or download it as a formatted file using the dedicated action buttons in the workspace.</p>
            </div>
          </div>
        </div>

        <RelatedTools category={toolCategory} currentSlug={slug} />
      </div>
    </div>
  );
}
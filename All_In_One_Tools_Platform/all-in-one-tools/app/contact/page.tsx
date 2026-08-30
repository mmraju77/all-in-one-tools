import { Mail, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Contact Us | Multi Tools Engine",
  description: "Get in touch with the Multi Tools Engine support team.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
            <Mail className="h-6 w-6 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Contact Support</h1>
        </div>
        
        <p className="text-slate-400 mb-10 text-lg">
          Have a question, feature request, or found a bug? We'd love to hear from you. Fill out the form below and our team will get back to you within 24 hours.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800">
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Your Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Message</label>
                <textarea 
                  rows={4}
                  placeholder="How can we help you?" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                ></textarea>
              </div>
              <Button type="button" className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-xl h-12 font-semibold shadow-lg shadow-blue-900/20 flex items-center gap-2">
                <Send className="h-4 w-4" /> Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800/50">
              <MessageSquare className="h-6 w-6 text-emerald-400 mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">Direct Email</h3>
              <p className="text-slate-400 mb-2">For general inquiries and support:</p>
              <a href="mailto:support@Multi Tools Engine.com" className="text-blue-400 hover:text-blue-300 font-medium">support@Multi Tools Engine.com</a>
            </div>

            <div className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800/50">
              <Mail className="h-6 w-6 text-purple-400 mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">Business & API</h3>
              <p className="text-slate-400 mb-2">For enterprise API access and partnerships:</p>
              <a href="mailto:business@Multi Tools Engine.com" className="text-blue-400 hover:text-blue-300 font-medium">business@Multi Tools Engine.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
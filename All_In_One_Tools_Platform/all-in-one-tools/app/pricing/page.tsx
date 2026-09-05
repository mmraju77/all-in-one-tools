"use client";

import { useState, useEffect } from "react";
import { Check, X, Sparkles, Zap, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Script from "next/script";
import { createClient } from "@/lib/supabase"; 

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Payment Success Automation (Database Update & Redirect)
  useEffect(() => {
    const handlePaymentSuccess = async () => {
      setIsProcessing(true);
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        // Update user to Pro in the database after payment
        if (user && user.email) {
          await supabase
            .from("User")
            .update({ isPro: true })
            .eq("email", user.email);
        }

        // Show Success Popup after update
        setIsProcessing(false);
        setIsSuccess(true);

        // Automatically redirect to categories page after 3.5 seconds
        setTimeout(() => {
          window.location.href = "/categories"; 
        }, 3500);

      } catch (error) {
        console.error("Pro Update Error:", error);
        setIsProcessing(false);
      }
    };

    // Listen for the signal from the Paddle Script
    window.addEventListener('paddle-checkout-success', handlePaymentSuccess);
    return () => window.removeEventListener('paddle-checkout-success', handlePaymentSuccess);
  }, []);

  return (
    <div className="min-h-screen bg-[#050b14] pt-24 pb-20 relative overflow-hidden">
      
      {/* SUCCESS POPUP ANIMATION */}
      {isSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-300 p-4">
          <div className="bg-slate-900 border-2 border-emerald-500 rounded-3xl p-8 max-w-md w-full text-center shadow-[0_0_80px_rgba(16,185,129,0.3)] animate-in zoom-in-95 duration-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-emerald-600 animate-pulse"></div>
            <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-emerald-500/20">
              <Check className="h-12 w-12 text-emerald-400" />
            </div>
            <h2 className="text-3xl font-black text-white mb-3">Payment Successful! 🎉</h2>
            <p className="text-slate-400 mb-8 text-base">Your account has been upgraded to Pro. All 10,000+ premium tools are now unlocked.</p>
            <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold bg-emerald-500/10 py-3 px-4 rounded-xl">
              <Loader2 className="h-5 w-5 animate-spin" /> Redirecting to Dashboard...
            </div>
          </div>
        </div>
      )}

      {/* Processing Loader */}
      {isProcessing && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
          <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
          <p className="text-white font-bold text-lg animate-pulse">Upgrading your workspace...</p>
        </div>
      )}

      {/* Paddle Payment Script */}
      <Script 
        src="https://cdn.paddle.com/paddle/v2/paddle.js" 
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== "undefined" && (window as any).Paddle) {
            (window as any).Paddle.Environment.set("sandbox");
            (window as any).Paddle.Initialize({ 
              token: "test_b2f1904f50111af44079f9d565c",
              eventCallback: function(data: any) {
                // Send signal to our React code once payment is successful
                if (data.name === "checkout.completed") {
                  window.dispatchEvent(new CustomEvent('paddle-checkout-success'));
                }
              }
            });
          }
        }}
      />

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            One Subscription. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">10,000+ Pro Tools.</span>
          </h1>
          <p className="text-lg text-slate-400 mb-10">
            Stop paying for 10 different subscriptions. Get unlimited access to our entire platform of AI, Finance, SEO, and Developer tools.
          </p>

          {/* Toggle Switch */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-bold ${!isYearly ? "text-white" : "text-slate-400"}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-16 h-8 bg-slate-800 rounded-full p-1 transition-colors hover:bg-slate-700"
            >
              <div className={`w-6 h-6 bg-blue-500 rounded-full shadow-md transform transition-transform ${isYearly ? "translate-x-8" : "translate-x-0"}`}></div>
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-bold ${isYearly ? "text-white" : "text-slate-400"}`}>Annually</span>
              <span className="bg-red-500/10 text-red-400 text-[10px] font-black px-2 py-1 rounded-md border border-red-500/20 uppercase">Save 50%</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* FREE PLAN */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col h-full">
            <h3 className="text-2xl font-bold text-white mb-2">Basic (Free)</h3>
            <p className="text-slate-400 text-sm mb-6">Perfect for quick, everyday tasks.</p>
            <div className="text-5xl font-extrabold text-white mb-2">$0<span className="text-lg font-medium text-slate-500">/forever</span></div>
            
            <div className="flex-grow my-8 space-y-4">
              <div className="flex items-start gap-3"><Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" /><span className="text-slate-300 text-sm">Access to Free Tier Tools</span></div>
              <div className="flex items-start gap-3"><Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" /><span className="text-slate-300 text-sm">Standard processing speed</span></div>
              <div className="flex items-start gap-3"><Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" /><span className="text-slate-300 text-sm">Ads supported experience</span></div>
              <div className="flex items-start gap-3 opacity-50"><X className="h-5 w-5 text-slate-500 shrink-0 mt-0.5" /><span className="text-slate-400 text-sm line-through">No access to Pro Tools</span></div>
            </div>

            <Link href="/category/ai-tools">
              <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white rounded-xl py-6 font-bold text-md">
                Explore Free Tools
              </Button>
            </Link>
          </div>

          {/* PRO PLAN */}
          <div className="bg-slate-900 border-2 border-blue-600 rounded-3xl p-8 flex flex-col h-full relative shadow-[0_0_40px_rgba(37,99,235,0.15)] transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-lg shadow-blue-900/50">
              <Sparkles className="h-3 w-3" /> Most Popular
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">Pro <Zap className="h-5 w-5 text-yellow-400" /></h3>
            <p className="text-slate-400 text-sm mb-6">For professionals who need unlimited power.</p>
            
            <div className="mb-2">
              <div className="text-5xl font-extrabold text-white mb-2">
                ${isYearly ? "4.99" : "9.99"}<span className="text-lg font-medium text-slate-500">/mo</span>
              </div>
              <div className="text-sm font-semibold text-emerald-400">
                {isYearly ? "Billed $59.88 once a year" : "Billed $9.99 every month"}
              </div>
            </div>
            
            <div className="flex-grow my-8 space-y-4">
              <div className="flex items-start gap-3"><Check className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" /><strong className="text-white text-sm">Unlimited access to ALL Premium Tools</strong></div>
              <div className="flex items-start gap-3"><Check className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" /><span className="text-slate-300 text-sm">Cloud history & auto-save features</span></div>
              <div className="flex items-start gap-3"><Check className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" /><span className="text-slate-300 text-sm">Priority server processing (10x faster)</span></div>
              <div className="flex items-start gap-3"><Check className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" /><span className="text-slate-300 text-sm">100% Ad-free clean experience</span></div>
            </div>

            {/* Payment Button */}
            <div
              onClick={() => {
                if (typeof window !== "undefined" && (window as any).Paddle) {
                  (window as any).Paddle.Checkout.open({
                    items: [{ 
                      priceId: isYearly ? "pri_01m12c704areedkhrqh5as8m4n" : "pri_01m12byc7759j6krwq452tceqr", 
                      quantity: 1 
                    }]
                  });
                } else {
                  alert("Payment system is loading, please try again in a moment.");
                }
              }}
              className="w-full cursor-pointer"
            >
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 transition-all shadow-lg shadow-blue-900/30">
                Upgrade to Pro &rarr;
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
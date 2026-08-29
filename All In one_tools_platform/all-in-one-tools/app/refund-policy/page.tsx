import React from 'react';

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#050b14] pt-32 pb-20 text-slate-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 prose prose-invert prose-blue">
        <h1 className="text-4xl font-extrabold text-white mb-8">Refund Policy</h1>
        <p>Last updated: August 2026</p>
        
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mt-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-white mb-3">1. 7-Day Money-Back Guarantee</h2>
            <p className="text-slate-400 leading-relaxed">
              We want you to be completely satisfied with Multi Tools Engine Pro. If you are not satisfied with your subscription for any reason, you may request a full refund within 7 days of your initial purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">2. Eligibility for Refund</h2>
            <ul className="list-disc pl-5 text-slate-400 space-y-2">
              <li>The refund request must be submitted within 7 days of the original purchase date.</li>
              <li>Refunds apply only to the first billing cycle (new subscriptions).</li>
              <li>Renewal payments are non-refundable, but you can cancel your subscription at any time to prevent future charges.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">3. How to Request a Refund</h2>
            <p className="text-slate-400 leading-relaxed">
              To request a refund, please contact us at <strong>support@Multi Tools Engine.com</strong> with your account email and the reason for your request. Our team will process your refund within 3-5 business days. The funds will be returned to your original payment method.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">4. Subscription Cancellations</h2>
            <p className="text-slate-400 leading-relaxed">
              You can cancel your subscription at any time from your account dashboard. Once canceled, you will not be charged again, and you will retain access to Pro features until the end of your current billing cycle.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
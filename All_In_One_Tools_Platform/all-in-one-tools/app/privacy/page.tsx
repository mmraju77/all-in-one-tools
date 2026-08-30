import { Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Multi Tools Engine",
  description: "Privacy Policy for Multi Tools Engine. Learn how we handle your data securely.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
            <Shield className="h-6 w-6 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Privacy Policy</h1>
        </div>
        
        <p className="text-slate-400 mb-10">Last updated: August 2026</p>

        <div className="space-y-8 text-base leading-relaxed text-slate-400">
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
            <p>At Multi Tools Engine, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Multi Tools Engine and how we use it. We do not require account creation for basic tool usage, ensuring maximum anonymity.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. File & Data Security</h2>
            <p><strong>Your files are yours.</strong> When using tools like PDF mergers, image compressors, or code formatters, files are either processed locally in your browser or uploaded to our secure servers and <strong>automatically deleted within 1 hour</strong> after processing. We do not read, look into, or mine any data from your uploaded files.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Log Files</h2>
            <p>Multi Tools Engine follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.</p>
          </section>

          <section className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
            <h2 className="text-2xl font-semibold text-white mb-4">4. Google AdSense & DoubleClick DART Cookie</h2>
            <p className="mb-3">Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet.</p>
            <p>However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://policies.google.com/technologies/ads</a></p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Our Advertising Partners</h2>
            <p>Some of advertisers on our site may use cookies and web beacons. Our advertising partners include Google. Each of our advertising partners has their own Privacy Policy for their policies on user data. Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Multi Tools Engine, which are sent directly to users' browser. They automatically receive your IP address when this occurs.</p>
            <p className="mt-3"><em>Note that Multi Tools Engine has no access to or control over these cookies that are used by third-party advertisers.</em></p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
            <p>Under the CCPA, among other rights, California consumers have the right to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
              <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
              <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
            </ul>
            <p className="mt-3">If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. GDPR Data Protection Rights</h2>
            <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
              <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
              <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}
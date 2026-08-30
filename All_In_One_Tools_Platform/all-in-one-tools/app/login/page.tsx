"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Zap } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          router.push("/");
          router.refresh();
        }
      }
    );
    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-4">
      <Link href="/" className="flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
        <div className="bg-blue-500 p-1.5 rounded-md shadow-lg shadow-blue-500/20">
          <Zap className="h-6 w-6 text-white" />
        </div>
        <span className="text-3xl font-bold text-white tracking-tight">Multi Tools Engine.</span>
      </Link>
      
      <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur-sm">
        <h1 className="text-2xl font-bold text-white mb-2 text-center">Welcome Back</h1>
        <p className="text-sm text-slate-400 text-center mb-8">Sign in to save your tools history</p>
        
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#3b82f6',
                  brandAccent: '#2563eb',
                  inputText: 'white',
                  inputBackground: '#1e293b',
                  inputBorder: '#334155',
                }
              }
            },
            className: {
              button: 'bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl py-2.5 transition-colors',
              input: 'bg-slate-950/50 border-slate-800 text-white rounded-xl focus:border-blue-500',
              label: 'text-slate-400 text-sm font-medium',
              anchor: 'text-blue-400 hover:text-blue-300 transition-colors'
            }
          }}
          theme="dark"
          providers={['google', 'github']}
        />
      </div>
    </div>
  );
}
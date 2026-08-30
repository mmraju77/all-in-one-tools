"use client";

import { useState } from "react";
import { Bookmark, Activity, Key, Clock, Settings, Plus, Play, Copy, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardClient() {
  // State for API Keys
  const [apiKeys, setApiKeys] = useState([
    { id: 1, key: "mt_live_8f92j7k39x2", active: true, name: "Production Key" }
  ]);

  // State for Saved Tools
  const [savedTools, setSavedTools] = useState([
    { id: "yt-thumb", name: "YouTube Thumbnail Downloader", slug: "youtube-thumbnail-downloader", category: "YouTube" },
    { id: "json-fmt", name: "JSON Formatter", slug: "json-formatter", category: "Developer" },
    { id: "tax-calc", name: "Tax Calculator", slug: "tax-calculator", category: "Finance" },
  ]);

  // State for Recent Activity Log (Dynamic)
  const [activityLog, setActivityLog] = useState([
    { id: 101, action: "Logged into dashboard", time: "1 hour ago" },
    { id: 102, action: "Formatted JSON data", time: "2 hours ago" },
  ]);

  // Helper function to add a new activity to the log
  const addActivity = (actionText: string) => {
    const newActivity = {
      id: Date.now(),
      action: actionText,
      time: "Just now"
    };
    // Add to top and keep only the latest 4 activities
    setActivityLog([newActivity, ...activityLog].slice(0, 4));
  };

  // Logic: Generate a new random API Key
  const generateNewKey = () => {
    const randomString = Math.random().toString(36).substring(2, 15);
    const newKeyName = `Project Key ${apiKeys.length + 1}`;
    const newKey = {
      id: Date.now(),
      key: `mt_live_${randomString}`,
      active: true,
      name: newKeyName
    };
    setApiKeys([...apiKeys, newKey]);
    addActivity(`Generated a new API key (${newKeyName})`); // Live update to activity!
  };

  // Logic: Copy Key to Clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    addActivity("Copied API key to clipboard"); // Live update to activity!
    alert("API Key copied to clipboard! ✅");
  };

  // Logic: Remove a saved tool
  const removeSavedTool = (id: string, toolName: string) => {
    const isConfirmed = window.confirm(`Are you sure you want to remove '${toolName}' from your saved tools?`);
    if (isConfirmed) {
      setSavedTools(savedTools.filter(tool => tool.id !== id));
      addActivity(`Removed '${toolName}' from saved tools`); // Live update to activity!
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Welcome back, Creator.</h1>
          <p className="text-slate-400">Manage your workspace, API keys, and saved projects here.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl flex items-center gap-2 shadow-lg shadow-blue-900/20">
          <Settings className="h-4 w-4" /> Account Settings
        </Button>
      </div>

      {/* Stats Overview (Live counts based on state) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center gap-4 shadow-lg">
          <div className="bg-blue-500/10 p-4 rounded-2xl border border-blue-500/20">
            <Activity className="h-7 w-7 text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-slate-400 font-medium">Total Tools Used</p>
            <p className="text-2xl font-bold text-white">124</p>
          </div>
        </div>
        
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center gap-4 shadow-lg">
          <div className="bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20">
            <Bookmark className="h-7 w-7 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm text-slate-400 font-medium">Saved Tools</p>
            <p className="text-2xl font-bold text-white">{savedTools.length}</p>
          </div>
        </div>
        
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center gap-4 shadow-lg">
          <div className="bg-purple-500/10 p-4 rounded-2xl border border-purple-500/20">
            <Key className="h-7 w-7 text-purple-400" />
          </div>
          <div>
            <p className="text-sm text-slate-400 font-medium">Active API Keys</p>
            <p className="text-2xl font-bold text-white">{apiKeys.length}</p>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid lg:grid-cols-3 gap-8 pt-4">
        
        {/* Left Column (Bookmarks & History) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 1. Saved Tools Grid with Logic */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Bookmark className="h-5 w-5 text-blue-400" /> Saved Tools
              </h2>
              <Link href="/" className="text-sm text-blue-400 hover:text-blue-300 font-medium">Explore more</Link>
            </div>
            
            {savedTools.length === 0 ? (
              <p className="text-slate-500 text-center py-8 bg-slate-950/50 rounded-2xl border border-slate-800 border-dashed">No tools saved yet. Go explore!</p>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {savedTools.map((tool) => (
                  <div key={tool.id} className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/50 transition-all flex items-center justify-between group">
                    <Link href={`/tool/${tool.slug}`} className="flex-grow">
                      <h3 className="font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">{tool.name}</h3>
                      <p className="text-xs text-slate-500 mt-1">{tool.category}</p>
                    </Link>
                    <div className="flex items-center gap-1">
                      <button onClick={() => removeSavedTool(tool.id, tool.name)} className="p-2 rounded-lg hover:bg-rose-500/10 hover:text-rose-400 text-slate-600 transition-colors" title="Remove Tool">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <Link href={`/tool/${tool.slug}`} className="bg-slate-900 p-2 rounded-lg group-hover:bg-blue-600 transition-colors">
                        <Play className="h-4 w-4 text-slate-400 group-hover:text-white" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 2. Usage History List (Dynamic) */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-400" /> Recent Activity
            </h2>
            <div className="space-y-4">
              {activityLog.length === 0 ? (
                <p className="text-slate-500">No recent activity.</p>
              ) : (
                activityLog.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/50 border border-slate-800 hover:border-slate-700 transition-colors">
                    <p className="text-sm text-slate-300">{activity.action}</p>
                    <span className="text-xs text-slate-500 font-medium bg-slate-900 px-3 py-1 rounded-full border border-slate-800">{activity.time}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column (API Keys Manager) */}
        <div className="space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Key className="h-5 w-5 text-purple-400" /> API Access Keys
            </h2>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">Manage your secret keys for programmatic access to our tools and APIs.</p>
            
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {apiKeys.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.name}</span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full uppercase">Active</span>
                  </div>
                  <div className="flex items-center justify-between bg-[#0d1117] p-2 rounded-lg border border-slate-800 mt-2">
                    <span className="font-mono text-sm text-slate-300 truncate mr-2">{item.key}</span>
                    <button onClick={() => copyToClipboard(item.key)} className="text-slate-500 hover:text-white p-1 rounded transition-colors" title="Copy API Key">
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <Button onClick={generateNewKey} className="w-full bg-slate-800 hover:bg-slate-700 text-white rounded-xl flex items-center justify-center gap-2 py-6 border border-slate-700 transition-all active:scale-95">
              <Plus className="h-4 w-4" /> Generate New Key
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
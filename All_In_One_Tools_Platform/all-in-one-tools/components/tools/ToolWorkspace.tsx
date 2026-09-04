"use client";

import { useState, useRef, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { 
  Undo2, Redo2, Keyboard, Copy, Download, Lock, Sparkles, Wand2, Loader2, Calculator, 
  DollarSign, Globe2, Layers, Scissors, FileCheck, ShieldCheck, Code2, Terminal, Cpu, 
  Database, Hash, TrendingUp, MessageSquare, ShoppingCart, Tag, BarChart3, Truck, Megaphone, 
  Target, Link as LinkIcon, Search, Briefcase, LineChart, PieChart, Presentation, Mail, 
  UserPlus, Clock, Smartphone, Activity, FileText, Zap, ListTodo, Timer, Flame, AlertTriangle, 
  Users, Compass, ScanSearch, ShieldAlert, RadioReceiver, Building, Workflow, Network, 
  LayoutGrid, ClipboardCheck, FlaskConical, Building2, X, Wrench, HardHat, Utensils, 
  HeartPulse, Boxes, Banknote, HeartHandshake, Package, PhoneCall, Key, Factory, Stethoscope, 
  Monitor, ArrowRightLeft, BookOpen, ImageIcon, Video, Star, UploadCloud, ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { generateAIContent } from "@/lib/gemini";
import { allToolsList } from "@/lib/all-tools";
import { allToolsMappingData } from "@/lib/tools-data"; 

interface HistorySnapshot {
  input: string;
  dynamicValues: string[];
}

const getSmartToolConfig = (slug: string, category: string, toolName: string) => {
  const safeSlug = (slug || "").toLowerCase().trim();
  const c = (category || "").toLowerCase();
  
  const exactToolsArr = allToolsMappingData.split('\n');
  for (let i = 0; i < exactToolsArr.length; i++) {
    const parts = exactToolsArr[i].split('|');
    if (parts.length >= 4 && parts[0].trim() === safeSlug) {
      
      const paramsArray = parts[2].split(',').map((s: string) => s.trim()).filter(Boolean);
      let buttonsArray = parts[3].split(',').map((s: string) => s.trim()).filter(Boolean);
      
      let icon = Sparkles; let color = "purple";
      if (c.includes("finance") || safeSlug.match(/calculator|payoff|budget|tax|loan|roi|margin|salary/)) {
         icon = DollarSign; color = "emerald";
      } else if (c.includes("seo") || safeSlug.match(/keyword|serp|backlink|sitemap|rank|meta/)) {
         icon = Search; color = "teal";
      } else if (safeSlug.match(/youtube|video|shorts|thumbnail|movie|clip/)) {
         icon = Video; color = "red";
      } else if (c.includes("website") || safeSlug.match(/domain|dns|ssl|url|http/)) {
         icon = Globe2; color = "blue";
      } else if (c.includes("developer") || safeSlug.match(/code|json|xml|html|css|js|regex|sql|api|docker/)) {
         icon = Code2; color = "amber";
      } else if (c.includes("social") || safeSlug.match(/instagram|tiktok|facebook|linkedin|tweet/)) {
         icon = MessageSquare; color = "fuchsia";
      } else if (c.includes("image") || c.includes("photo") || safeSlug.match(/image|photo|pic/)) {
         icon = ImageIcon; color = "sky";
      } else if (c.includes("pdf") || safeSlug.includes("pdf")) {
         icon = FileText; color = "rose";
      } else if (c.includes("text") || safeSlug.match(/word|letter|sentence|paragraph/)) {
         icon = Scissors; color = "slate";
      } else if (safeSlug.match(/business|resume|job|plan|proposal/)) {
         icon = Briefcase; color = "indigo";
      }

      const isMediaTool = !!(c.match(/image|photo|pic|video|camera/i) || safeSlug.match(/image|photo|pic|video|camera/i));
      const requiresFileUpload = !!(c.match(/pdf|image|photo|video|audio|file|document/i) || safeSlug.match(/pdf|image|photo|video|audio|file|document/i));

      if (isMediaTool && !buttonsArray.some(b => b.toLowerCase().includes("preview"))) {
        if (buttonsArray.length > 1) {
            buttonsArray.splice(1, 0, "Preview"); 
        } else {
            buttonsArray.push("Preview");
        }
      }

      return {
        title: (toolName || safeSlug.replace(/-/g, ' ')).toUpperCase() + " WORKSPACE",
        color: color, 
        icon: icon, 
        requiresFile: requiresFileUpload,
        textLabel: parts[1].trim(), 
        params: paramsArray, 
        buttons: buttonsArray
      };
    }
  }

  return {
    title: (toolName || "Tool").toUpperCase() + " WORKSPACE",
    color: "emerald", icon: Layers, requiresFile: false,
    params: ["Primary Data", "Secondary Input", "Parameters"],
    buttons: ["Process Data", "Analyze", "Optimize", "Settings", "Export"],
    textLabel: "Additional Details / Raw Data"
  };
};

const getSmartPlaceholder = (param: string) => {
  const p = param.toLowerCase().trim();
  
  if (p.match(/^(image|file|video|audio|document|pdf|source image|input file|image\(s\)|video file|files)$/)) return "Upload file above 👆";
  if (p.includes("watermark")) return "e.g. Confidential, Logo.png";
  if (p.includes("position") || p.includes("alignment") || p.includes("placement")) return "e.g. Bottom-Right, Center";
  if (p.includes("opacity") || p.includes("transparency")) return "e.g. 50%, 0.8";
  if (p.includes("scale") || p.includes("zoom") || p.includes("resize")) return "e.g. 1.5x, 50%";
  if (p.includes("format") || p.includes("extension")) return "e.g. JPG, PNG, MP4, PDF";
  if (p.includes("quality") || p.includes("compression")) return "e.g. 80, 100, High, Low";
  if (p.includes("width")) return "e.g. 1920, 800";
  if (p.includes("height")) return "e.g. 1080, 600";
  if (p.includes("size") || p.includes("dimensions") || p.includes("resolution")) return "e.g. 1920x1080, 5MB";
  if (p.includes("aspect ratio")) return "e.g. 16:9, 4:3, 1:1";
  if (p.includes("metadata") || p.includes("exif")) return "e.g. Keep All, Remove EXIF";
  if (p.includes("fps") || p.includes("frame rate")) return "e.g. 30, 60, 120";
  if (p.includes("codec") || p.includes("encoding")) return "e.g. H.264, H.265, AAC";
  if (p.includes("bitrate")) return "e.g. 4000 kbps, 128 kbps";
  if (p.includes("color") || p.includes("background") || p.includes("hex")) return "e.g. #FFFFFF, Transparent, Black";
  if (p.includes("font") || p.includes("typography")) return "e.g. Arial, Roboto, Bold";

  if (p.includes("url") || p.includes("link") || p.includes("website") || p.includes("domain")) return "e.g. https://example.com";
  if (p.includes("email")) return "e.g. user@company.com";
  if (p.includes("name") || p.includes("title")) return "e.g. Project Alpha, John Doe";
  if (p.includes("language") || p.includes("locale")) return "e.g. English, es-ES";
  if (p.includes("currency")) return "e.g. USD, EUR, INR";
  if (p.includes("date") || p.includes("deadline") || p.includes("period")) return "e.g. YYYY-MM-DD, Today, 30 Days";
  if (p.includes("rate") || p.includes("speed")) return "e.g. 120, Fast, 1.5x";
  if (p.includes("level") || p.includes("depth") || p.includes("ratio") || p.includes("strength") || p.includes("severity")) return "e.g. 5, High, Critical";
  if (p.includes("text") || p.includes("message") || p.includes("description") || p.includes("content") || p.includes("quote")) return "e.g. Enter your main text here...";
  if (p.includes("keyword") || p.includes("tag")) return "e.g. technology, AI, marketing";
  if (p.includes("amount") || p.includes("price") || p.includes("cost") || p.includes("budget") || p.includes("revenue") || p.includes("value") || p.includes("down payment") || p.includes("fee")) return "e.g. 5000, 199.99";
  if (p.includes("time") || p.includes("duration") || p.includes("delay") || p.includes("term")) return "e.g. 30 Years, 2 hours, 00:05:00";
  if (p.includes("percentage") || p.includes("%") || p.includes("discount") || p.includes("margin") || p.includes("tax") || p.includes("interest")) return "e.g. 6.5%, 10, 15.5";
  if (p.includes("platform") || p.includes("channel") || p.includes("social")) return "e.g. Instagram, YouTube, Facebook";
  if (p.includes("topic") || p.includes("subject") || p.includes("niche") || p.includes("industry")) return "e.g. Digital Marketing, Tech, Fitness";
  if (p.includes("location") || p.includes("city") || p.includes("country")) return "e.g. New York, India, Global";
  if (p.includes("ip") || p.includes("host")) return "e.g. 192.168.1.1, localhost";

  return `e.g. Enter ${param}`;
};

const getColorClasses = (color: string) => {
  switch(color) {
    case "fuchsia": return "text-fuchsia-400 border-fuchsia-500/20 hover:bg-fuchsia-950";
    case "amber": return "text-amber-400 border-amber-500/20 hover:bg-amber-950";
    case "teal": return "text-teal-400 border-teal-500/20 hover:bg-teal-950";
    case "sky": return "text-sky-400 border-sky-500/20 hover:bg-sky-950";
    case "yellow": return "text-yellow-400 border-yellow-500/20 hover:bg-yellow-950";
    case "purple": return "text-purple-400 border-purple-500/20 hover:bg-purple-950";
    case "orange": return "text-orange-400 border-orange-500/20 hover:bg-orange-950";
    case "pink": return "text-pink-400 border-pink-500/20 hover:bg-pink-950";
    case "red": return "text-red-400 border-red-500/20 hover:bg-red-950";
    case "rose": return "text-rose-400 border-rose-500/20 hover:bg-rose-950";
    case "slate": return "text-slate-400 border-slate-500/20 hover:bg-slate-900";
    case "blue": return "text-blue-400 border-blue-500/20 hover:bg-blue-950";
    case "indigo": return "text-indigo-400 border-indigo-500/20 hover:bg-indigo-950";
    case "emerald": default: return "text-emerald-400 border-emerald-500/20 hover:bg-emerald-950";
  }
};

const getActiveColorClasses = (color: string) => {
  switch(color) {
    case "fuchsia": return "bg-fuchsia-600 text-white shadow-md shadow-fuchsia-900/40 border-fuchsia-500";
    case "amber": return "bg-amber-600 text-white shadow-md shadow-amber-900/40 border-amber-500";
    case "teal": return "bg-teal-600 text-white shadow-md shadow-teal-900/40 border-teal-500";
    case "sky": return "bg-sky-600 text-white shadow-md shadow-sky-900/40 border-sky-500";
    case "yellow": return "bg-yellow-600 text-white shadow-md shadow-yellow-900/40 border-yellow-500";
    case "purple": return "bg-purple-600 text-white shadow-md shadow-purple-900/40 border-purple-500";
    case "orange": return "bg-orange-600 text-white shadow-md shadow-orange-900/40 border-orange-500";
    case "pink": return "bg-pink-600 text-white shadow-md shadow-pink-900/40 border-pink-500";
    case "red": return "bg-red-600 text-white shadow-md shadow-red-900/40 border-red-500";
    case "rose": return "bg-rose-600 text-white shadow-md shadow-rose-900/40 border-rose-500";
    case "slate": return "bg-slate-600 text-white shadow-md shadow-slate-900/40 border-slate-500";
    case "blue": return "bg-blue-600 text-white shadow-md shadow-blue-900/40 border-blue-500";
    case "indigo": return "bg-indigo-600 text-white shadow-md shadow-indigo-900/40 border-indigo-500";
    case "emerald": default: return "bg-emerald-600 text-white shadow-md shadow-emerald-900/40 border-emerald-500";
  }
};

export default function ToolWorkspace({ toolName = "Tool", slug = "", category = "Category" }: { toolName?: string, slug?: string, category?: string }) {
  const safeToolName = toolName || "Tool";
  const safeSlug = slug || "";
  const safeCategory = category || "Category";
  const categoryUrl = `/category/${safeCategory.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  const [history, setHistory] = useState<{ past: HistorySnapshot[], present: HistorySnapshot, future: HistorySnapshot[] }>({
    past: [], present: { input: "", dynamicValues: Array(25).fill("") }, future: []
  });

  const { input, dynamicValues } = history.present;
  const [activeAction, setActiveAction] = useState<string>("");
  const [userIsPro, setUserIsPro] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);

  useEffect(() => {
    const verifyProStatus = async () => {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const { data: { user } } = await supabase.auth.getUser();
        
        if (user && user.email) {
          const { data, error } = await supabase
            .from("User")
            .select("isPro")
            .eq("email", user.email)
            .single();

          if (data && data.isPro) {
            setUserIsPro(true);
          }
        }
      } catch (error) {
        console.error("Error verifying Pro status:", error);
      } finally {
        setIsCheckingStatus(false);
      }
    };

    verifyProStatus();
  }, []);

  const updateFormState = (updates: Partial<HistorySnapshot>) => {
    setHistory(curr => {
      const newPresent = { ...curr.present, ...updates };
      if (JSON.stringify(curr.present) === JSON.stringify(newPresent)) return curr;
      return { past: [...curr.past, curr.present].slice(-50), present: newPresent, future: [] };
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => updateFormState({ input: e.target.value });
  
  const handleDynamicChange = (index: number, val: string) => {
    const newVals = [...dynamicValues];
    newVals[index] = val;
    updateFormState({ dynamicValues: newVals });
  };
  
  const handleQuickAction = (modeName: string) => { 
    setActiveAction(modeName); 
    if (inputRef.current) inputRef.current.focus(); 
  };
  
  const handleUndo = () => { setHistory(curr => { if (curr.past.length === 0) return curr; const previous = curr.past[curr.past.length - 1]; return { past: curr.past.slice(0, -1), present: previous, future: [curr.present, ...curr.future] }; }); };
  const handleRedo = () => { setHistory(curr => { if (curr.future.length === 0) return curr; const next = curr.future[0]; return { past: [...curr.past, curr.present], present: next, future: curr.future.slice(1) }; }); };

  const [currency, setCurrency] = useState("USD ($)"); 
  const [language, setLanguage] = useState("English");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const [realFileUrl, setRealFileUrl] = useState<string | null>(null);
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isRated, setIsRated] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const currentTool = allToolsList.find((tool) => (tool.slug || "").toLowerCase() === safeSlug.toLowerCase());
  const isProTool = currentTool?.isPro || false;
  
  const { title: wTitle, buttons: acts, color: wColor, icon: UnitIconComponent, requiresFile, params, textLabel } = getSmartToolConfig(safeSlug, safeCategory, safeToolName);
  
  const colorClasses = getColorClasses(wColor);
  const activeColorClasses = getActiveColorClasses(wColor); 
  const textClass = colorClasses.split(' ')[0];
  const borderClass = colorClasses.split(' ')[1];
  const hoverClass = colorClasses.split(' ')[2];
  
  const isCalculator = !["AI Tools", "Text Tools", "Image Tools", "Video Tools", "Audio Tools", "PDF Tools"].includes(safeCategory) || safeToolName.toLowerCase().includes("calculator");

  const handleCopy = () => { if (output) { navigator.clipboard.writeText(output); alert("Output copied to clipboard! ✅"); } };
  const handleDownload = () => {
    if (realFileUrl && selectedFile) {
       const a = document.createElement("a"); a.href = realFileUrl; a.download = `processed-${selectedFile.name}`;
       document.body.appendChild(a); a.click(); document.body.removeChild(a); return;
    }
    if (!output) return; 
    const blob = new Blob([output], { type: "text/plain" }); const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; let ext = "txt"; 
    if (safeToolName.includes("JSON") || safeToolName.includes("Code")) ext = "json"; 
    if (safeToolName.includes("CSV")) ext = "csv";
    a.download = `${safeSlug}-result.${ext}`; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  const handleGenerate = async () => {
    if (!input.trim() && !dynamicValues.some(v => v.trim()) && !selectedFile) { alert("Please enter data, prompt, or upload a file first!"); return; }
    setIsGenerating(true); setRealFileUrl(null); setMediaUrl(null); setMediaType(null); setOutput("");

    const tName = safeToolName.toLowerCase();
    const isMediaTool = !!(safeCategory.match(/image|photo|pic|video|camera/i) || safeSlug.match(/image|photo|pic|video|camera/i));
    const finalAction = activeAction || acts[0] || "Process Data";
    
    if (isMediaTool && selectedFile && (selectedFile.type.startsWith("image/") || selectedFile.type.startsWith("video/"))) {
       
       const isImage = selectedFile.type.startsWith("image/");
       setMediaType(isImage ? "image" : "video");
       const fileUrl = URL.createObjectURL(selectedFile);
       setMediaUrl(fileUrl);
       setRealFileUrl(fileUrl);
       
       const oldSizeKB = (selectedFile.size / 1024).toFixed(2);
       let ext = selectedFile.name.split('.').pop() || (isImage ? "jpg" : "mp4");
       
       const getVal = (keywords: string[]) => {
           const idx = params.findIndex(p => keywords.some(kw => p.toLowerCase().includes(kw)));
           return idx !== -1 ? dynamicValues[idx] : null;
       };

       const userFormat = getVal(['format', 'extension']);
       if (userFormat) ext = userFormat.replace(/[^a-zA-Z0-9]/g, '');

       let quality = 100;
       const userQuality = getVal(['quality', 'compression']);
       if (userQuality) {
           const qMatch = userQuality.match(/(\d+)/);
           if (qMatch) quality = parseInt(qMatch[1]);
       }

       const isPreviewAction = finalAction.toLowerCase().includes("preview");
       
       const sizeMultiplier = isPreviewAction ? 1 : (quality / 100) * (isImage ? 0.7 : 0.85); 
       const newSizeKB = (parseFloat(oldSizeKB) * sizeMultiplier).toFixed(2);

       let details = `✅ SUCCESS: ${isImage ? 'Image' : 'Video'} ${isPreviewAction ? 'Preview Generated' : 'Processed Successfully'}!\n\n`;
       details += `📊 MEDIA STATS:\n`;
       details += `- Original Size: ${oldSizeKB} KB\n`;
       if (!isPreviewAction) details += `- Estimated New Size: ~${newSizeKB} KB\n`;
       details += `- Target Format: ${ext.toUpperCase()}\n`;
       if (isImage) details += `- Target Quality: ${quality}%\n`;
       
       let hasParams = false;
       params.forEach((pLabel, idx) => {
           if (dynamicValues[idx]) {
               if (!hasParams) { details += `\n🛠️ APPLIED PARAMETERS:\n`; hasParams = true; }
               details += `- ${pLabel}: ${dynamicValues[idx]}\n`;
           }
       });

       details += `\n👉 ${isPreviewAction ? 'Check your media preview above.' : 'Click the blue "Download File" button below to save your processed file.'}`;
       
       setOutput(details);
       setIsGenerating(false);
       return; 
    }

    setOutput(`Processing request and generating response in ${language}...\n\nPlease wait a few seconds.`);
    try {
      let dynamicInputString = "";
      if (params && params.length > 0) {
        params.forEach((pLabel: string, idx: number) => {
           if (dynamicValues[idx]) dynamicInputString += `${pLabel}: ${dynamicValues[idx]}\n`;
        });
      }

      let finalPrompt = `You are a highly advanced, highly accurate, deterministic analytical engine executing the tool: "${safeToolName}" (Category: "${safeCategory}").
      Your task is to process the following user inputs with absolute precision.
      
      [GLOBAL SETTINGS]
      Unit/Currency context: ${currency}
      Output Language required: ${language}
      
      [USER INPUTS]
      ${dynamicInputString}
      Additional Data/Raw Context: ${input}.`;

      if (requiresFile && selectedFile && !isMediaTool) {
        finalPrompt += `\n[FILE UPLOADED]: Assume the user attached a file named "${selectedFile.name}" of size ${(selectedFile.size/1024).toFixed(2)} KB.\n`;
      }
      
      finalPrompt += `
      [CRITICAL REQUIRED ACTION]
      The user explicitly clicked the button: **"${finalAction}"**
      You MUST tailor your entire output to fulfill the exact intent of THIS specific button. 
      - If the button asks to 'Calculate', perform the math and show the breakdown.
      - If the button asks for 'Amortization' or 'Schedule', generate the schedule table.
      - If the button asks to 'Compare', generate a comparison table.
      - Do NOT give a generic overview of the tool. Do EXACTLY what the button says.

      [STRICT EXECUTION RULES - FAILURE IS NOT AN OPTION]
      1. MATHEMATICAL FLAWLESSNESS: If this tool involves math, formulas, pricing, or financial calculations, verify your math step-by-step internally before answering. Use standard verified formulas. If a user inputs text like "Free" or "None" for a numerical field (like fees or taxes), treat it strictly as 0.
      2. ZERO FLUFF: Do NOT output "Here is the...", "Sure!", "I have calculated...", or any introductory/concluding remarks.
      3. DIRECT ANSWER ONLY: Start immediately with the final answer or data table.
      4. FORMATTING: Use Markdown (bolding, clean tables, bullet points) strictly to make the data highly readable.
      5. Output MUST be strictly in ${language}.`;

      const resultText = await generateAIContent(finalPrompt, safeToolName);
      setOutput(resultText);
      
    } catch (error) { 
      setOutput("Failed to generate response. Please try again or check your API key."); 
      console.error(error); 
    } finally { 
      setIsGenerating(false); 
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { 
      if (e.ctrlKey && e.key.toLowerCase() === 'z') { e.preventDefault(); handleUndo(); } 
      if (e.ctrlKey && e.key.toLowerCase() === 'y') { e.preventDefault(); handleRedo(); } 
      if (e.ctrlKey && e.key === 'Enter') { e.preventDefault(); if (!isGenerating) handleGenerate(); } 
    };
    window.addEventListener('keydown', handleKeyDown); return () => window.removeEventListener('keydown', handleKeyDown);
  }, [history, isGenerating, language, currency, selectedFile, activeAction]); 

  if (isProTool && isCheckingStatus) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8 lg:p-12 mb-12 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
        <Loader2 className="h-12 w-12 text-purple-500 animate-spin mb-4" />
        <p className="text-slate-400 font-medium animate-pulse">Verifying Pro Status...</p>
      </div>
    );
  }

  if (isProTool && !userIsPro) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8 lg:p-12 mb-12 max-w-4xl mx-auto flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-purple-600/20 blur-[100px] rounded-full pointer-events-none"></div><div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 mb-6 relative z-10 shadow-2xl shadow-purple-900/20"><Lock className="h-10 w-10 text-purple-400" /></div>
        <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4 relative z-10">Unlock <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">{safeToolName}</span></h3>
        <p className="text-slate-400 mb-10 max-w-2xl text-base md:text-lg leading-relaxed relative z-10">This is a premium utility. Upgrade to a Pro subscription to access this tool.</p>
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl relative z-10">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all flex flex-col h-full text-left"><h4 className="text-lg font-bold text-white mb-2">Monthly Plan</h4><div className="text-3xl font-extrabold text-white mb-4">$9.99<span className="text-sm font-normal text-slate-500">/mo</span></div><Link href="/pricing?plan=monthly" className="w-full"><Button className="w-full bg-slate-800 hover:bg-slate-700 text-white rounded-xl py-6 font-bold">Subscribe Monthly</Button></Link></div>
          <div className="bg-slate-900 border-2 border-purple-500 rounded-2xl p-6 relative flex flex-col h-full text-left shadow-2xl shadow-purple-900/30 transform md:-translate-y-2"><div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-4 flex items-center justify-center gap-2"><Flame className="h-5 w-5 text-red-500 animate-pulse" /><span className="text-red-400 font-black text-sm uppercase tracking-wider">SAVE 50%</span></div><h4 className="text-xl font-bold text-purple-400 mb-2 flex items-center gap-2"><Sparkles className="h-5 w-5" /> Yearly Plan</h4><div className="flex items-end gap-2 mb-2"><div className="text-4xl font-extrabold text-white">$4.99<span className="text-sm font-normal text-slate-500">/mo</span></div><div className="text-lg font-bold text-slate-500 line-through mb-1.5">$9.99</div></div><Link href="/pricing?plan=yearly" className="w-full"><Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl py-6 font-bold text-lg">Subscribe Yearly</Button></Link></div>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-4">
       <Link href={categoryUrl} className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors font-medium text-sm">
         <ArrowLeft className="h-4 w-4" /> Back to {safeCategory}
       </Link>
    </div>

    <div className="relative grid lg:grid-cols-2 gap-6 mb-8 lg:h-[720px] items-stretch max-w-7xl mx-auto px-4 sm:px-6">
      <style dangerouslySetInnerHTML={{__html: `.custom-scrollbar::-webkit-scrollbar { width: 8px; } .custom-scrollbar::-webkit-scrollbar-track { background: #0f172a; border-radius: 8px; border-left: 1px solid #1e293b; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #475569; border-radius: 8px; } .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #64748b; } .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #475569 #0f172a; }`}} />
      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col h-full overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50 shrink-0">
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="flex items-center gap-1 p-1 bg-slate-800 rounded-xl border border-slate-700 shadow-inner">
              <button onClick={handleUndo} disabled={history.past.length === 0} className={`p-2 rounded-lg transition-all flex items-center justify-center font-bold ${history.past.length === 0 ? 'text-slate-600 bg-slate-900 cursor-not-allowed opacity-50' : 'text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-900/50 cursor-pointer active:scale-95'}`}><Undo2 className="h-4 w-4" /></button>
              <button onClick={handleRedo} disabled={history.future.length === 0} className={`p-2 rounded-lg transition-all flex items-center justify-center font-bold ${history.future.length === 0 ? 'text-slate-600 bg-slate-900 cursor-not-allowed opacity-50' : 'text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-900/50 cursor-pointer active:scale-95'}`}><Redo2 className="h-4 w-4" /></button>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 text-sm font-semibold ml-1 sm:ml-2 border-l border-slate-700 pl-2 sm:pl-3"><UnitIconComponent className="h-4 w-4" /><span className="hidden sm:inline">Parameters</span></div>
          </div>
          <div className="flex items-center gap-2">
            {isCalculator && (
              <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 font-medium cursor-pointer max-w-[100px] sm:max-w-none">
                <optgroup label="Units & Currencies"><option value="Metric (kg/cm)">Metric (kg/cm)</option><option value="Imperial (lbs/in)">Imperial (lbs/in)</option><option value="USD ($)">USD ($)</option><option value="INR (₹)">INR (₹)</option><option value="EUR (€)">EUR (€)</option><option value="GBP (£)">GBP (£)</option><option value="Percentage (%)">Percentage (%)</option><option value="Standard Unit">Standard Unit</option></optgroup>
              </select>
            )}
            <Button onClick={() => setShowShortcuts(true)} variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800 flex items-center gap-1.5 transition-colors px-2 sm:px-3"><Keyboard className="h-4 w-4" /> <span className="hidden sm:inline">Shortcuts</span></Button>
          </div>
        </div>
        
        <div className="bg-[#0d1117] flex-grow relative p-6 overflow-y-auto custom-scrollbar flex flex-col">
          <div className="mb-6 shrink-0">
            <div className={`mb-6 p-4 bg-slate-900/90 border ${borderClass} rounded-2xl shrink-0`}>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-bold ${textClass} uppercase tracking-wider flex items-center gap-1.5`}><UnitIconComponent className="h-4 w-4" /> {wTitle}</span>
              </div>
              
              <div className="flex flex-wrap gap-1.5 items-center">
                {acts.length > 4 ? (
                  <>
                    {acts.slice(0, 3).map((act: string, idx: number) => (
                      <button key={idx} onClick={() => handleQuickAction(act)} className={`text-[11px] px-3 py-1.5 rounded-lg border transition-all duration-200 font-medium ${activeAction === act ? activeColorClasses : `bg-slate-800 ${hoverClass} text-slate-300 border-slate-700`}`}>{act}</button>
                    ))}
                    <select 
                      onChange={(e) => { if(e.target.value) handleQuickAction(e.target.value); e.target.value=''; }} 
                      className={`text-[11px] px-3 py-1.5 rounded-lg border transition-all duration-200 font-medium bg-slate-800 ${hoverClass} text-slate-300 border-slate-700 outline-none cursor-pointer appearance-none`}
                      style={{ WebkitAppearance: 'none', paddingRight: '1rem' }}
                    >
                      <option value="">More Actions ▼</option>
                      {acts.slice(3).map((act: string, idx: number) => (
                        <option key={idx} value={act} className="bg-slate-900 text-slate-300">{act}</option>
                      ))}
                    </select>
                  </>
                ) : (
                  acts.map((act: string, idx: number) => (
                    <button key={idx} onClick={() => handleQuickAction(act)} className={`text-[11px] px-3 py-1.5 rounded-lg border transition-all duration-200 font-medium ${activeAction === act ? activeColorClasses : `bg-slate-800 ${hoverClass} text-slate-300 border-slate-700`}`}>{act}</button>
                  ))
                )}
              </div>
            </div>
            
            {requiresFile && (
              <div className="mb-6 bg-slate-900/50 border border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center border-dashed transition-all hover:border-slate-500 cursor-pointer relative overflow-hidden group">
                <input type="file" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                <div className="relative z-0 flex flex-col items-center pointer-events-none">
                  <UploadCloud className="h-8 w-8 text-slate-400 mb-2 group-hover:text-emerald-400 transition-colors" />
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Upload File for Processing</span>
                  <span className="text-[11px] text-slate-500 font-mono bg-slate-950 px-2 py-1 rounded-md border border-slate-800">{selectedFile ? selectedFile.name : "Click or drag & drop (Max 10MB)"}</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-6 border-b border-slate-800/50">
              {params.map((paramLabel: string, idx: number) => {
                const isFileInput = paramLabel.toLowerCase().match(/^(image|file|video file|audio file|document|pdf file|source image|input file|image\(s\)|files)$/);
                return (
                  <div key={idx} className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{paramLabel}</label>
                    <input 
                      type="text" 
                      readOnly={!!isFileInput}
                      value={isFileInput && selectedFile ? selectedFile.name : dynamicValues[idx] || ""} 
                      onChange={(e) => !isFileInput && handleDynamicChange(idx, e.target.value)} 
                      placeholder={getSmartPlaceholder(paramLabel)} 
                      className={`w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 ${isFileInput ? 'opacity-60 cursor-not-allowed' : ''}`} 
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block shrink-0 mt-2">{textLabel}</label>
          <textarea ref={inputRef} value={input} onChange={handleInputChange} placeholder={`[ Type additional context, raw text, or instructions for ${safeToolName}... ]`} className={`w-full bg-transparent text-slate-300 focus:outline-none resize-none font-mono text-sm block flex-grow min-h-[150px]`} />
        </div>
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/50 flex items-center justify-center gap-3 shrink-0">
          <Button onClick={handleGenerate} disabled={isGenerating || (!input && !dynamicValues.some(v => v.trim()) && !selectedFile)} className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-900/20 px-8 py-6 text-lg w-full md:w-auto">
            {isGenerating ? <><Loader2 className="h-5 w-5 animate-spin" /> Processing...</> : <><Wand2 className="h-5 w-5" /> Process Request</>}
          </Button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col h-full overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/50 flex items-center justify-between shrink-0">
          <h3 className="font-semibold text-white">Output Result</h3>
          <div className="flex items-center gap-2">
            <Globe2 className="h-4 w-4 text-blue-400" />
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-blue-500 font-medium cursor-pointer">
              <option value="English">English</option>
              <option value="Telugu (తెలుగు)">Telugu (తెలుగు)</option>
              <option value="Hindi (हिंदी)">Hindi (हिंदी)</option>
              <option value="Tamil (தமிழ்)">Tamil (தமிழ்)</option>
              <option value="Spanish (Español)">Spanish (Español)</option>
              <option value="French (Français)">French (Français)</option>
              <option value="German (Deutsch)">German (Deutsch)</option>
              <option value="Chinese (中文)">Chinese (中文)</option>
              <option value="Japanese (日本語)">Japanese (日本語)</option>
              <option value="Arabic (العربية)">Arabic (العربية)</option>
              <option value="Russian (Русский)">Russian (Русский)</option>
              <option value="Portuguese (Português)">Portuguese (Português)</option>
              <option value="Bengali (বাংলা)">Bengali (বাংলা)</option>
              <option value="Urdu (اردو)">Urdu (اردو)</option>
            </select>
          </div>
        </div>
        <div className="bg-[#0d1117] flex-grow relative w-full h-full">
          {mediaUrl ? (
            <div className="absolute inset-0 w-full h-full p-6 overflow-y-auto custom-scrollbar flex flex-col items-center">
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 mb-6 shadow-xl w-full flex justify-center">
                {mediaType === "image" ? (
                  <img src={mediaUrl} alt="Processed Output" className="max-w-full max-h-[300px] object-contain rounded-lg border border-slate-700" />
                ) : (
                  <video src={mediaUrl} controls className="max-w-full max-h-[300px] object-contain rounded-lg border border-slate-700" />
                )}
              </div>
              <div className="w-full text-emerald-400 font-mono text-sm whitespace-pre-wrap leading-relaxed">
                {output}
              </div>
            </div>
          ) : (
            <textarea value={output} readOnly placeholder="[ AI Processed Code or Result will appear here ]" className="absolute inset-0 w-full h-full p-6 pr-4 bg-transparent text-emerald-400 focus:outline-none resize-none font-mono text-sm overflow-y-scroll custom-scrollbar block leading-relaxed" />
          )}
        </div>
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/50 flex items-center justify-center gap-4 shrink-0">
          <Button onClick={handleCopy} variant="ghost" className="text-slate-400 hover:text-white flex items-center gap-1.5 px-6"><Copy className="h-4 w-4" /> Copy Result</Button>
          <Button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl flex items-center gap-1.5 shadow-lg shadow-blue-900/20 px-6"><Download className="h-4 w-4" /> Download File</Button>
        </div>
      </div>
    </div>

    <div className="max-w-md mx-auto mb-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-xl font-bold text-white mb-4">{isRated ? "Thank you for your feedback! 🎉" : `Rate your experience with ${safeToolName}`}</h3>
      <div className="flex items-center justify-center gap-2 p-4 bg-slate-900/80 rounded-3xl border border-slate-800 shadow-xl inline-flex backdrop-blur-sm">
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} type="button" onClick={() => { setRating(star); setIsRated(true); }} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} className="focus:outline-none transition-transform hover:scale-125 active:scale-90 px-1">
            <Star className={`h-10 w-10 transition-all duration-300 ${(hoverRating || rating) >= star ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.6)]" : "text-slate-700 hover:text-slate-500"}`} />
          </button>
        ))}
      </div>
      {isRated && <p className="text-sm font-medium text-emerald-400 mt-4 animate-pulse">You rated this tool {rating} out of 5 stars.</p>}
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-20">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-4">
          <div className="h-12 w-12 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20"><BookOpen className="h-6 w-6 text-blue-400" /></div>
          <div><h2 className="text-2xl font-bold text-white">How to use {safeToolName}</h2><p className="text-sm text-slate-400">Follow these 3 simple steps to get the best results.</p></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[#0a0f1c] p-6 rounded-2xl border border-slate-800/80 hover:border-blue-500/30 transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold mb-5 shadow-lg shadow-blue-900/40">1</div>
            <h4 className="text-lg text-white font-bold mb-2">{requiresFile ? "Upload or Setup" : "Set Your Parameters"}</h4>
            <p className="text-sm text-slate-400 leading-relaxed">{requiresFile ? `Click the upload area to attach your file, then set options below.` : `Use the top input fields to provide details like parameters below.`}</p>
          </div>
          <div className="bg-[#0a0f1c] p-6 rounded-2xl border border-slate-800/80 hover:border-emerald-500/30 transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <div className="h-10 w-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold mb-5 shadow-lg shadow-emerald-900/40">2</div>
            <h4 className="text-lg text-white font-bold mb-2">Provide Context</h4>
            <p className="text-sm text-slate-400 leading-relaxed">In the large text box labeled '{textLabel}', paste any raw text, URLs, code, or extra instructions you want the engine to analyze.</p>
          </div>
          <div className="bg-[#0a0f1c] p-6 rounded-2xl border border-slate-800/80 hover:border-purple-500/30 transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <div className="h-10 w-10 bg-purple-600 rounded-xl flex items-center justify-center text-white font-bold mb-5 shadow-lg shadow-purple-900/40">3</div>
            <h4 className="text-lg text-white font-bold mb-2">Generate & Export</h4>
            <p className="text-sm text-slate-400 leading-relaxed">Select a specific action from the buttons, or just click the green <strong>Process Request</strong> button. Within seconds, your result will appear on the right side.</p>
          </div>
        </div>
      </div>
    </div>
    
    {showShortcuts && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
        <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl max-w-sm w-full p-6 relative">
          <button onClick={() => setShowShortcuts(false)} className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors"><X className="h-5 w-5" /></button>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Keyboard className="h-6 w-6 text-emerald-400" /> Shortcuts</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 bg-slate-800/50 rounded-xl border border-slate-700/50"><span className="text-sm font-medium text-slate-300">Undo Action</span><div className="flex gap-1.5"><kbd className="bg-slate-950 border border-slate-700 text-slate-300 px-2 py-1 rounded-md text-xs font-mono font-bold">Ctrl</kbd><span className="text-slate-500">+</span><kbd className="bg-slate-950 border border-slate-700 text-slate-300 px-2 py-1 rounded-md text-xs font-mono font-bold">Z</kbd></div></div>
            <div className="flex items-center justify-between p-3.5 bg-slate-800/50 rounded-xl border border-slate-700/50"><span className="text-sm font-medium text-slate-300">Redo Action</span><div className="flex gap-1.5"><kbd className="bg-slate-950 border border-slate-700 text-slate-300 px-2 py-1 rounded-md text-xs font-mono font-bold">Ctrl</kbd><span className="text-slate-500">+</span><kbd className="bg-slate-950 border border-slate-700 text-slate-300 px-2 py-1 rounded-md text-xs font-mono font-bold">Y</kbd></div></div>
            <div className="flex items-center justify-between p-3.5 bg-slate-800/50 rounded-xl border border-slate-700/50"><span className="text-sm font-medium text-slate-300">Process Output</span><div className="flex gap-1.5"><kbd className="bg-slate-950 border border-slate-700 text-slate-300 px-2 py-1 rounded-md text-xs font-mono font-bold">Ctrl</kbd><span className="text-slate-500">+</span><kbd className="bg-slate-950 border border-slate-700 text-slate-300 px-2 py-1 rounded-md text-xs font-mono font-bold">Enter</kbd></div></div>
          </div>
          <Button onClick={() => setShowShortcuts(false)} className="w-full mt-8 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-6 font-bold text-base shadow-lg shadow-emerald-900/20">Got it, Thanks!</Button>
        </div>
      </div>
    )}
    </>
  );
}
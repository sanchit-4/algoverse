// // "use client";

// // import { useState, useEffect } from "react";
// // import axios from "axios";
// // import { CodeEditor } from "@/components/CodeEditor";
// // import { 
// //   Play, Loader2, Timer, Pause, Square, 
// //   ThumbsUp, ThumbsDown, Terminal, CheckCircle 
// // } from "lucide-react";
// // import ReactMarkdown from "react-markdown";
// // import clsx from "clsx";

// // // 1. IMPORT & ALIAS TO MATCH YOUR DOCUMENTATION SYNTAX
// // import { 
// //   Panel, 
// //   Group, 
// //   Separator 
// // } from "react-resizable-panels";
// // import AuthModal from "@/components/AuthModal"; // Add this import

// // // --- API CONFIG ---
// // const API_URL = "http://localhost:3000";

// // export default function Algoverse() {
// //   // --- STATE ---
// //   const [token, setToken] = useState<string | null>(null);
// //   const [problem, setProblem] = useState<any>(null);
// //   const [submissions, setSubmissions] = useState<any[]>([]);
// //   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
// //   const [likes, setLikes] = useState({ count: 0, userLiked: false });
  
// //   // UI State
// //   const [activeTab, setActiveTab] = useState<"description" | "submissions">("description");
// //   const [code, setCode] = useState("");
// //   const [language, setLanguage] = useState("python");
// //   const [loading, setLoading] = useState(false);
// //   const [result, setResult] = useState<any>(null);
  
// //   // Timer State
// //   const [timer, setTimer] = useState(0);
// //   const [isTimerRunning, setIsTimerRunning] = useState(false);

// //   // --- INITIAL LOAD ---
// //   useEffect(() => {
// //     const storedToken = localStorage.getItem("token");
// //     setToken(storedToken);

// //     const fetchData = async () => {
// //       try {
// //         const res = await axios.get(`${API_URL}/problems/1`);

// //         setProblem(res.data);
// //         setLikes({ count: res.data.likes, userLiked: false });
// //         const defaults = res.data.defaultCode as any;
// //         setCode(defaults["python"] || "");
// //         if (storedToken) fetchSubmissions(storedToken);
// //       } catch (e) {
// //         console.error("Failed to load data", e);
// //       }
// //     };
// //     fetchData();
// //   }, []);

// //   // --- TIMER LOGIC ---
// //   useEffect(() => {
// //     let interval: NodeJS.Timeout;
// //     if (isTimerRunning) {
// //       interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
// //     }
// //     return () => clearInterval(interval);
// //   }, [isTimerRunning]);

// //   const toggleLike = async (isLike: boolean) => {
// //       if (!token) return alert("Login to vote");
// //       try {
// //           await axios.post(`${API_URL}/problems/${problem.id}/like`, { liked: isLike }, {
// //               headers: { Authorization: `Bearer ${token}` }
// //           });
// //           // Optimistic update
// //           setLikes(prev => ({ ...prev, count: prev.count + (isLike ? 1 : -1) }));
// //       } catch (e) { console.error("Like failed"); }
// //   };

// //   const formatTime = (s: number) => {
// //     const min = Math.floor(s / 60);
// //     const sec = s % 60;
// //     return `${min}:${sec < 10 ? '0' : ''}${sec}`;
// //   };

// //   // --- API ACTIONS ---
// //   const fetchSubmissions = async (userToken: string) => {
// //     try {
// //       const res = await axios.get(`${API_URL}/submissions/1`, {
// //         headers: { Authorization: `Bearer ${userToken}` }
// //       });
// //       setSubmissions(res.data);
// //     } catch (e) { console.error("Failed history"); }
// //   };

// //   const handleLanguageChange = (newLang: string) => {
// //     setLanguage(newLang);
// //     if (problem) {
// //       const defaults = problem.defaultCode as any;
// //       setCode(defaults[newLang] || "// Not supported");
// //     }
// //   };

// //   const handleLogin = async () => {
// //     const email = prompt("Enter Email (e.g., user1@test.com):");
// //     const password = prompt("Enter Password (e.g., password123):");
// //     if (!email || !password) return;
// //     try {
// //       const res = await axios.post(`${API_URL}/auth/login`, { email, password });
// //       localStorage.setItem("token", res.data.token);
// //       setToken(res.data.token);
// //       window.location.reload();
// //     } catch (e) { alert("Login Failed"); }
// //   };

// //   const runCode = async () => {
// //     if (!token) return alert("Please Login to Submit Code");
// //     setLoading(true);
// //     setResult(null);
// //     try {
// //       const response = await axios.post(`${API_URL}/submit`, 
// //         { problemId: problem.id, language, code },
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       pollStatus(response.data.submissionId);
// //     } catch (error) {
// //       setLoading(false);
// //       setResult({ status: "ERROR", error: "Network Error" });
// //     }
// //   };

// //   const handleLike = async (liked: boolean) => {
// //     if (!token) return alert("Login required");
// //     await axios.post(`${API_URL}/problems/${problem.id}/like`, { liked }, {
// //         headers: { Authorization: `Bearer ${token}` }
// //     });
// //     // Optimistic UI update or refetch
// //     alert(liked ? "Liked!" : "Disliked!");
// //   };

// //   const pollStatus = async (id: string) => {
// //     const interval = setInterval(async () => {
// //       try {
// //         const res = await axios.get(`${API_URL}/status/${id}`);
// //         if (res.data.status !== "PENDING") {
// //           clearInterval(interval);
// //           setLoading(false);
// //           setResult(res.data);
// //           if (token) fetchSubmissions(token);
// //         }
// //       } catch (e) { clearInterval(interval); setLoading(false); }
// //     }, 1000);
// //   };

// //   if (!problem) return <div className="h-screen bg-black text-gray-400 flex items-center justify-center">Loading...</div>;

// //   // --- CONTENT BLOCKS ---

// //   const DescriptionContent = (
// //     <div className="h-full flex flex-col bg-[#0d1117]">
// //        {/* Tabs */}
// //        <div className="flex border-b border-[#30363d] bg-[#161b22] shrink-0">
// //           {["description", "submissions"].map((tab) => (
// //              <button key={tab} onClick={() => setActiveTab(tab as any)}
// //                 className={clsx("px-4 py-3 text-xs font-bold uppercase tracking-wider", 
// //                 activeTab === tab ? "text-white border-b-2 border-green-500" : "text-gray-400")}
// //              >
// //                 {tab}
// //              </button>
// //           ))}
// //        </div>
// //        {/* Body */}
// //        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
// //            {activeTab === "description" && (
// //              <div className="space-y-6 animate-in fade-in">
// //                 <h1 className="text-2xl font-bold text-white">{problem.title}</h1>
// //                 <div className="flex gap-4 items-center">
// //                     <span className="bg-green-900/30 text-green-400 border border-green-800 px-3 py-1 rounded-full text-xs font-bold">{problem.difficulty}</span>
// //                     <div className="flex items-center gap-4 text-gray-400 text-sm">
// //                         <button onClick={() => toggleLike(true)} className="flex items-center gap-1 hover:text-green-400 transition-colors">
// //                             <ThumbsUp size={16}/> {likes.count}
// //                         </button>
// //                         <button onClick={() => toggleLike(false)} className="flex items-center gap-1 hover:text-red-400 transition-colors">
// //                             <ThumbsDown size={16}/>
// //                         </button>
// //                     </div>
// //                 </div>
// //                 <div className="prose prose-invert prose-sm text-gray-300">
// //                     <ReactMarkdown>{problem.description}</ReactMarkdown>
// //                 </div>
// //              </div>
// //            )}
// //            {activeTab === "submissions" && (
// //              <div className="space-y-2">
// //                  {!token && <div className="text-gray-500 text-center mt-10">Login to see history</div>}
// //                  {submissions.map((sub, i) => (
// //                     <div key={i} className="flex justify-between bg-[#161b22] p-3 rounded border border-[#30363d]">
// //                         <span className={clsx("font-bold text-sm", sub.status === "ACCEPTED" ? "text-green-500" : "text-red-500")}>
// //                            {sub.status.replace(/_/g, " ")}
// //                         </span>
// //                         <div className="text-right text-xs text-gray-400">
// //                            <div>{sub.time || "-"}</div>
// //                            <div>{new Date(sub.createdAt).toLocaleDateString()}</div>
// //                         </div>
// //                     </div>
// //                  ))}
// //              </div>
// //            )}
// //        </div>
// //     </div>
// //   );

// //   const EditorContent = (
// //     <div className="h-full flex flex-col bg-[#1e1e1e]">
// //         {/* Toolbar */}
// //         <div className="h-12 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between px-4 shrink-0">
// //              <select value={language} onChange={e => handleLanguageChange(e.target.value)}
// //                 className="bg-[#0d1117] text-gray-300 text-xs border border-[#30363d] rounded px-2 py-1"
// //              >
// //                 <option value="python">Python</option>
// //                 <option value="cpp">C++</option>
// //                 <option value="java">Java</option>
// //                 <option value="javascript">JavaScript</option>
// //                 <option value="go">Go</option>
// //              </select>
             
// //              <div className="flex items-center gap-3">
// //                  <div className="flex items-center gap-2 bg-[#0d1117] px-2 py-1 rounded border border-[#30363d]">
// //                      <Timer size={14} className="text-gray-400"/>
// //                      <span className="text-white font-mono text-sm w-12 text-center">{formatTime(timer)}</span>
// //                      {!isTimerRunning ? 
// //                         <Play size={14} className="cursor-pointer hover:text-green-400" onClick={() => setIsTimerRunning(true)}/> :
// //                         <Pause size={14} className="cursor-pointer hover:text-yellow-400" onClick={() => setIsTimerRunning(false)}/>
// //                      }
// //                      <Square size={14} className="cursor-pointer hover:text-red-400" onClick={() => { setIsTimerRunning(false); setTimer(0); }}/>
// //                  </div>
// //                  <button onClick={runCode} disabled={loading} className="bg-green-600 px-4 py-1 rounded text-xs text-white font-bold hover:bg-green-500 disabled:opacity-50">
// //                      {loading ? "Running..." : "Submit"}
// //                  </button>
// //              </div>
// //         </div>
// //         <div className="flex-1 relative">
// //             <CodeEditor language={language} code={code} setCode={setCode} />
// //         </div>
// //     </div>
// //   );

// //   const ConsoleContent = (
// //     <div className="h-full flex flex-col bg-[#0d1117]">
// //         <div className="h-8 bg-[#161b22] px-4 flex items-center border-b border-[#30363d] shrink-0">
// //             <span className="text-xs font-bold text-gray-400 uppercase">Console</span>
// //         </div>
// //         <div className="flex-1 p-4 font-mono text-sm overflow-y-auto custom-scrollbar">
// //              {!result && <div className="text-gray-600 text-center mt-4">Run code to see output</div>}
// //              {result && (
// //                  <div>
// //                      <span className={clsx("text-lg font-bold", result.status === "ACCEPTED" ? "text-green-500" : "text-red-500")}>
// //                         {result.status === "ACCEPTED" ? "Accepted" : result.status.replace(/_/g, " ")}
// //                      </span>
// //                      {result.metrics && <span className="text-xs text-gray-500 ml-3">{result.metrics.time} • {result.metrics.memory}</span>}
                     
// //                      {(result.status === "RUNTIME_ERROR" || result.status === "COMPILATION_ERROR") && (
// //                          <div className="text-red-400 mt-2 whitespace-pre-wrap text-xs">{result.error || result.details?.actual}</div>
// //                      )}
                     
// //                      {result.status === "WRONG_ANSWER" && result.details && (
// //                          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
// //                              <div className="bg-[#161b22] p-2 rounded"><div className="text-gray-500">Input</div>{result.details.input}</div>
// //                              <div className="bg-[#161b22] p-2 rounded"><div className="text-gray-500">Expected</div>{result.details.expected}</div>
// //                              <div className="bg-[#161b22] p-2 rounded col-span-2 border border-red-900"><div className="text-red-400">Actual</div>{result.details.actual}</div>
// //                          </div>
// //                      )}
// //                  </div>
// //              )}
// //         </div>
// //     </div>
// //   );

// //   // --- RENDER ---
// //   return (
// //     <div className="h-screen w-screen bg-black flex flex-col font-sans overflow-hidden">
// //         {/* HEADER */}
// //         <header className="h-14 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between px-6 shrink-0 z-10">
// //             <div className="flex items-center gap-2">
// //                 <div className="bg-white text-black font-bold px-2 py-0.5 rounded">AV</div>
// //                 <h1 className="text-white font-bold">Algoverse</h1>
// //             </div>
// //             {!token ? (
// //                 <button 
// //                     onClick={() => setIsAuthModalOpen(true)} // <--- CHANGE THIS
// //                     className="bg-[#238636] hover:bg-[#2ea043] text-white px-4 py-1.5 rounded text-xs font-bold transition-colors"
// //                 >
// //                     Sign In
// //                 </button>
// //             ) : (
// //                 <button 
// //                     onClick={() => { localStorage.removeItem("token"); window.location.reload(); }} 
// //                     className="text-gray-400 hover:text-white text-xs font-medium transition-colors"
// //                 >
// //                     Sign Out
// //                 </button>
// //             )}
// //         </header>

// //         {/* WORKSPACE (USING GROUP/PANEL/SEPARATOR) */}
// //         <div className="flex-1 overflow-hidden">
// //             <Group orientation="horizontal">
                
// //                 {/* LEFT PANEL */}
// //                 <Panel defaultSize={50} minSize={20}>
// //                     {DescriptionContent}
// //                 </Panel>
                
// //                 {/* SEPARATOR (Vertical) */}
// //                 <Separator className="w-1.5 bg-[#0d1117] hover:bg-blue-600 transition-colors border-l border-r border-[#30363d] cursor-col-resize flex items-center justify-center group">
// //                     <div className="h-8 w-0.5 bg-gray-600 group-hover:bg-white rounded-full"/>
// //                 </Separator>
                
// //                 {/* RIGHT PANEL */}
// //                 <Panel defaultSize={50} minSize={20}>
// //                     <Group orientation="vertical">
                        
// //                         {/* TOP: EDITOR */}
// //                         <Panel defaultSize={70} minSize={20}>
// //                             {EditorContent}
// //                         </Panel>

// //                         {/* SEPARATOR (Horizontal) */}
// //                         <Separator className="h-1.5 bg-[#0d1117] hover:bg-blue-600 transition-colors border-t border-b border-[#30363d] cursor-row-resize flex items-center justify-center group">
// //                             <div className="w-8 h-0.5 bg-gray-600 group-hover:bg-white rounded-full"/>
// //                         </Separator>

// //                         {/* BOTTOM: CONSOLE */}
// //                         <Panel defaultSize={30} minSize={10}>
// //                             {ConsoleContent}
// //                         </Panel>

// //                     </Group>
// //                 </Panel>

// //             </Group>
// //         </div>
// //         <AuthModal 
// //             isOpen={isAuthModalOpen} 
// //             onClose={() => setIsAuthModalOpen(false)} 
// //         />
// //     </div>
// //   );
// // }

// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Link from "next/link";

// export default function LandingPage() {
//   const [problems, setProblems] = useState<any[]>([]);

//   useEffect(() => {
//     axios.get("http://localhost:3000/problems").then(res => setProblems(res.data));
//   }, []);

//   return (
//     <div className="min-h-screen bg-black text-white font-sans p-10">
//       <header className="flex justify-between items-center mb-10">
//         <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Algoverse</h1>
//         <Link href="/admin" className="text-sm text-gray-400 hover:text-white">Admin CRM</Link>
//       </header>

//       <div className="max-w-4xl mx-auto space-y-4">
//         <h2 className="text-xl font-bold mb-6">Popular Problems</h2>
        
//         {problems.map(p => (
//           <Link href={`/problems/${p.id}`} key={p.id} className="block">
//             <div className="bg-[#161b22] border border-[#30363d] p-5 rounded-lg flex items-center justify-between hover:border-blue-500 transition-colors">
//               <div>
//                 <h3 className="font-bold text-lg">{p.title}</h3>
//                 <span className={`text-xs px-2 py-0.5 rounded border ${
//                     p.difficulty === 'Easy' ? 'bg-green-900/20 text-green-400 border-green-800' :
//                     p.difficulty === 'Medium' ? 'bg-yellow-900/20 text-yellow-400 border-yellow-800' :
//                     'bg-red-900/20 text-red-400 border-red-800'
//                 }`}>
//                     {p.difficulty}
//                 </span>
//               </div>
//               <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-bold text-sm">
//                 Solve Challenge
//               </button>
//             </div>
//           </Link>
//         ))}

//         {problems.length === 0 && <div className="text-gray-500 text-center">No problems found. Check the Admin CRM.</div>}
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { jwtDecode } from "jwt-decode"; // Decode token to check Role
import AuthModal from "@/components/AuthModal"; // Import your existing modal
import { Loader2, Shield, LogOut, User } from "lucide-react";
import clsx from "clsx";

interface Problem {
  id: number;
  title: string;
  difficulty: string;
  slug: string;
}

interface UserToken {
  userId: string;
  role: string; // "admin" or "user"
  exp: number;
}

export default function LandingPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Auth State
  const [user, setUser] = useState<UserToken | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    // 1. Check Auth & Role
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<UserToken>(token);
        setUser(decoded);
      } catch (e) {
        console.error("Invalid Token");
        localStorage.removeItem("token");
      }
    }

    // 2. Fetch Problems
    const fetchProblems = async () => {
      try {
        const res = await axios.get("http://localhost:3000/problems");
        setProblems(res.data);
      } catch (e) {
        console.error("Failed to fetch problems");
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30">
      
      {/* NAVBAR */}
      <nav className="h-16 border-b border-[#30363d] bg-[#0d1117]/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white font-bold p-1.5 rounded-lg text-sm shadow-lg shadow-blue-900/20">AV</div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Algoverse
            </h1>
        </div>

        <div className="flex items-center gap-4">
            {/* ADMIN BUTTON (Only visible if role === admin) */}
            {user?.role === "admin" && (
                <Link 
                    href="/admin" 
                    className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors bg-[#161b22] px-3 py-1.5 rounded-full border border-[#30363d] hover:border-gray-500"
                >
                    <Shield size={14} className="text-purple-400" />
                    Admin CRM
                </Link>
            )}

            {/* AUTH BUTTONS */}
            {!user ? (
                <button 
                    onClick={() => setIsAuthModalOpen(true)}
                    className="bg-[#238636] hover:bg-[#2ea043] text-white px-5 py-2 rounded-lg text-xs font-bold transition-all shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                >
                    Sign In
                </button>
            ) : (
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
                        <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-400 border border-blue-800">
                            <User size={16} />
                        </div>
                        {/* We don't store username in token for this simple demo, but you could */}
                        <span className="hidden sm:inline">Welcome Back</span>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="text-gray-500 hover:text-red-400 transition-colors"
                        title="Logout"
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            )}
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
                Master Your <span className="text-blue-500">Algorithms</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Join thousands of developers solving complex problems efficiently. 
                Track your progress, visualize metrics, and level up your coding skills.
            </p>
        </div>

        {/* PROBLEM LIST */}
        <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider px-4">
                <span>Problem</span>
                <span>Action</span>
            </div>

            {loading && (
                <div className="flex justify-center py-20">
                    <Loader2 size={40} className="animate-spin text-blue-500" />
                </div>
            )}

            {!loading && problems.map((p) => (
                <div 
                    key={p.id} 
                    className="group bg-[#161b22] border border-[#30363d] p-5 rounded-xl flex items-center justify-between hover:border-blue-500/50 hover:bg-[#1c2128] transition-all duration-200 shadow-sm"
                >
                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">
                            {p.title}
                        </h3>
                        
                        {/* DIFFICULTY BADGE - FIXED */}
                        <div className="flex gap-2">
                            <span className={clsx(
                                "text-xs px-2.5 py-0.5 rounded-full font-medium border",
                                p.difficulty === 'Easy' ? "bg-green-900/20 text-green-400 border-green-900/50" :
                                p.difficulty === 'Medium' ? "bg-yellow-900/20 text-yellow-400 border-yellow-900/50" :
                                "bg-red-900/20 text-red-400 border-red-900/50"
                            )}>
                                {p.difficulty || "Medium"}
                            </span>
                            <span className="text-xs text-gray-500 px-2 py-0.5 rounded border border-[#30363d]">
                                {p.slug}
                            </span>
                        </div>
                    </div>

                    <Link href={`/problems/${p.id}`}>
                        <button className="bg-[#21262d] hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all border border-[#30363d] group-hover:border-blue-500">
                            Solve Challenge
                        </button>
                    </Link>
                </div>
            ))}

            {!loading && problems.length === 0 && (
                <div className="text-center py-20 bg-[#161b22] rounded-xl border border-[#30363d] border-dashed">
                    <p className="text-gray-400 text-lg">No problems found yet.</p>
                    {user?.role === "admin" && (
                        <Link href="/admin" className="text-blue-400 hover:underline mt-2 inline-block">
                            Go to CRM to add one
                        </Link>
                    )}
                </div>
            )}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-[#30363d] mt-20 py-8 text-center text-gray-500 text-sm">
        <p>&copy; 2026 Algoverse. Built with Next.js, Docker & Microservices.</p>
      </footer>

      {/* AUTH MODAL */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
}
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

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "next/navigation"; // <--- IMPORT THIS
// import { CodeEditor } from "@/components/CodeEditor";
// import { 
//   Play, Loader2, Timer, Pause, Square, 
//   ThumbsUp, ThumbsDown, Terminal 
// } from "lucide-react";
// import ReactMarkdown from "react-markdown";
// import clsx from "clsx";

// // Import Resizable Components
// import { 
//   Panel, 
//   Group, 
//   Separator 
// } from "react-resizable-panels";

// const API_URL = "http://localhost:3000";

// export default function ProblemPage() {
//   const params = useParams();
//   const id = params.id; // <--- GET ID FROM URL

//   // --- STATE ---
//   const [token, setToken] = useState<string | null>(null);
//   const [problem, setProblem] = useState<any>(null);
//   const [submissions, setSubmissions] = useState<any[]>([]);
  
//   const [activeTab, setActiveTab] = useState<"description" | "submissions">("description");
//   const [code, setCode] = useState("");
//   const [language, setLanguage] = useState("python");
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState<any>(null);
  
//   const [timer, setTimer] = useState(0);
//   const [isTimerRunning, setIsTimerRunning] = useState(false);

//   // --- INITIAL LOAD ---
//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     setToken(storedToken);

//     if (id) {
//       fetchProblemData(id as string, storedToken);
//     }
//   }, [id]); // Re-run when ID changes

//   const fetchProblemData = async (problemId: string, userToken: string | null) => {
//     try {
//       // 1. Fetch Problem Details (Dynamic ID)
//       const res = await axios.get(`${API_URL}/problems/${problemId}`);
//       setProblem(res.data);
      
//       // 2. Set Default Code
//       const defaults = res.data.defaultCode as any;
//       setCode(defaults["python"] || "");

//       // 3. Fetch Submissions (Dynamic ID)
//       if (userToken) {
//         fetchSubmissions(problemId, userToken);
//       }
//     } catch (e) {
//       console.error("Failed to load data", e);
//     }
//   };

//   const fetchSubmissions = async (problemId: string, userToken: string) => {
//     try {
//       const res = await axios.get(`${API_URL}/submissions/${problemId}`, {
//         headers: { Authorization: `Bearer ${userToken}` }
//       });
//       setSubmissions(res.data);
//     } catch (e) { console.error("Failed history"); }
//   };

//   // --- ACTIONS ---
  
//   const handleLanguageChange = (newLang: string) => {
//     setLanguage(newLang);
//     if (problem) {
//       const defaults = problem.defaultCode as any;
//       setCode(defaults[newLang] || "// Not supported");
//     }
//   };

//   const handleLike = async (liked: boolean) => {
//     if (!token) return alert("Login required");
//     await axios.post(`${API_URL}/problems/${id}/like`, { liked }, {
//         headers: { Authorization: `Bearer ${token}` }
//     });
//     alert(liked ? "Liked!" : "Disliked!");
//   };

//   const runCode = async () => {
//     if (!token) return alert("Please Login to Submit Code");
//     setLoading(true);
//     setResult(null);
//     try {
//       const response = await axios.post(`${API_URL}/submit`, 
//         { problemId: Number(id), language, code }, // <--- Send Dynamic ID
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       pollStatus(response.data.submissionId);
//     } catch (error) {
//       setLoading(false);
//       setResult({ status: "ERROR", error: "Network Error" });
//     }
//   };

//   const pollStatus = async (submissionId: string) => {
//     const interval = setInterval(async () => {
//       try {
//         const res = await axios.get(`${API_URL}/status/${submissionId}`);
//         if (res.data.status !== "PENDING") {
//           clearInterval(interval);
//           setLoading(false);
//           setResult(res.data);
//           if (token && id) fetchSubmissions(id as string, token);
//         }
//       } catch (e) { clearInterval(interval); setLoading(false); }
//     }, 1000);
//   };

//   // --- TIMER ---
//   useEffect(() => {
//     let interval: NodeJS.Timeout;
//     if (isTimerRunning) {
//       interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
//     }
//     return () => clearInterval(interval);
//   }, [isTimerRunning]);

//   const formatTime = (s: number) => {
//     const min = Math.floor(s / 60);
//     const sec = s % 60;
//     return `${min}:${sec < 10 ? '0' : ''}${sec}`;
//   };

//   if (!problem) return <div className="h-screen bg-black text-gray-400 flex items-center justify-center">Loading Problem {id}...</div>;

//   // --- PANEL CONTENT (Same as before) ---

//   const DescriptionContent = (
//     <div className="h-full flex flex-col bg-[#0d1117]">
//        <div className="flex border-b border-[#30363d] bg-[#161b22] shrink-0">
//           {["description", "submissions"].map((tab) => (
//              <button key={tab} onClick={() => setActiveTab(tab as any)}
//                 className={clsx("px-4 py-3 text-xs font-bold uppercase tracking-wider", 
//                 activeTab === tab ? "text-white border-b-2 border-green-500" : "text-gray-400")}
//              >
//                 {tab}
//              </button>
//           ))}
//        </div>
//        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
//            {activeTab === "description" && (
//              <div className="space-y-6 animate-in fade-in">
//                 <h1 className="text-2xl font-bold text-white">{problem.title}</h1>
//                 <div className="flex gap-4 items-center">
//                     <span className={clsx("px-3 py-1 rounded-full text-xs font-bold capitalize border",
//                         problem.difficulty === "Easy" ? "bg-green-900/20 text-green-400 border-green-800" :
//                         problem.difficulty === "Medium" ? "bg-yellow-900/20 text-yellow-400 border-yellow-800" :
//                         "bg-red-900/20 text-red-400 border-red-800"
//                     )}>{problem.difficulty}</span>
                    
//                     <div className="flex gap-3 text-gray-400 text-sm">
//                         <button onClick={() => handleLike(true)} className="flex items-center gap-1 hover:text-green-400"><ThumbsUp size={14}/> {problem.likes?.length || 0}</button>
//                         <button onClick={() => handleLike(false)} className="flex items-center gap-1 hover:text-red-400"><ThumbsDown size={14}/> {problem.dislikes || 0}</button>
//                     </div>
//                 </div>
//                 <div className="prose prose-invert prose-sm text-gray-300">
//                     <ReactMarkdown>{problem.description}</ReactMarkdown>
//                 </div>
//              </div>
//            )}
//            {activeTab === "submissions" && (
//              <div className="space-y-2">
//                  {!token && <div className="text-gray-500 text-center mt-10">Login to see history</div>}
//                  {submissions.map((sub, i) => (
//                     <div key={i} className="flex justify-between bg-[#161b22] p-3 rounded border border-[#30363d]">
//                         <span className={clsx("font-bold text-sm", sub.status === "ACCEPTED" ? "text-green-500" : "text-red-500")}>
//                            {sub.status.replace(/_/g, " ")}
//                         </span>
//                         <div className="text-right text-xs text-gray-400">
//                            <div>{sub.time || "-"}</div>
//                            <div>{new Date(sub.createdAt).toLocaleDateString()}</div>
//                         </div>
//                     </div>
//                  ))}
//              </div>
//            )}
//        </div>
//     </div>
//   );

//   const EditorContent = (
//     <div className="h-full flex flex-col bg-[#1e1e1e]">
//         <div className="h-12 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between px-4 shrink-0">
//              <select value={language} onChange={e => handleLanguageChange(e.target.value)}
//                 className="bg-[#0d1117] text-gray-300 text-xs border border-[#30363d] rounded px-2 py-1"
//              >
//                 <option value="python">Python</option>
//                 <option value="cpp">C++</option>
//                 <option value="java">Java</option>
//                 <option value="javascript">JavaScript</option>
//                 <option value="go">Go</option>
//              </select>
             
//              <div className="flex items-center gap-3">
//                  <div className="flex items-center gap-2 bg-[#0d1117] px-2 py-1 rounded border border-[#30363d]">
//                      <Timer size={14} className="text-gray-400"/>
//                      <span className="text-white font-mono text-sm w-12 text-center">{formatTime(timer)}</span>
//                      {!isTimerRunning ? 
//                         <Play size={14} className="cursor-pointer hover:text-green-400" onClick={() => setIsTimerRunning(true)}/> :
//                         <Pause size={14} className="cursor-pointer hover:text-yellow-400" onClick={() => setIsTimerRunning(false)}/>
//                      }
//                      <Square size={14} className="cursor-pointer hover:text-red-400" onClick={() => { setIsTimerRunning(false); setTimer(0); }}/>
//                  </div>
//                  <button onClick={runCode} disabled={loading} className="bg-green-600 px-4 py-1 rounded text-xs text-white font-bold hover:bg-green-500 disabled:opacity-50">
//                      {loading ? "Running..." : "Submit"}
//                  </button>
//              </div>
//         </div>
//         <div className="flex-1 relative">
//             <CodeEditor language={language} code={code} setCode={setCode} />
//         </div>
//     </div>
//   );

//   const ConsoleContent = (
//     <div className="h-full flex flex-col bg-[#0d1117]">
//         <div className="h-8 bg-[#161b22] px-4 flex items-center border-b border-[#30363d] shrink-0">
//             <span className="text-xs font-bold text-gray-400 uppercase">Console</span>
//         </div>
//         <div className="flex-1 p-4 font-mono text-sm overflow-y-auto custom-scrollbar">
//              {!result && <div className="text-gray-600 text-center mt-4">Run code to see output</div>}
//              {loading && <div className="text-gray-400 text-center mt-4 flex flex-col items-center"><Loader2 className="animate-spin mb-2"/>Running...</div>}
             
//              {result && (
//                  <div>
//                      <span className={clsx("text-lg font-bold", result.status === "ACCEPTED" ? "text-green-500" : "text-red-500")}>
//                         {result.status === "ACCEPTED" ? "Accepted" : result.status.replace(/_/g, " ")}
//                      </span>
//                      {result.metrics && <span className="text-xs text-gray-500 ml-3">{result.metrics.time} • {result.metrics.memory}</span>}
                     
//                      {(result.status === "RUNTIME_ERROR" || result.status === "COMPILATION_ERROR") && (
//                          <div className="text-red-400 mt-2 whitespace-pre-wrap text-xs">{result.error || result.details?.actual}</div>
//                      )}
                     
//                      {result.status === "WRONG_ANSWER" && result.details && (
//                          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
//                              <div className="bg-[#161b22] p-2 rounded"><div className="text-gray-500">Input</div>{result.details.input}</div>
//                              <div className="bg-[#161b22] p-2 rounded"><div className="text-gray-500">Expected</div>{result.details.expected}</div>
//                              <div className="bg-[#161b22] p-2 rounded col-span-2 border border-red-900"><div className="text-red-400">Actual</div>{result.details.actual}</div>
//                          </div>
//                      )}
//                  </div>
//              )}
//         </div>
//     </div>
//   );

//   return (
//     <div className="h-screen w-screen bg-black flex flex-col font-sans overflow-hidden">
//         {/* HEADER */}
//         <header className="h-14 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between px-6 shrink-0 z-10">
//             <div className="flex items-center gap-2">
//                 <div className="bg-white text-black font-bold px-2 py-0.5 rounded">AV</div>
//                 <h1 className="text-white font-bold">Algoverse</h1>
//             </div>
//             <button onClick={() => window.location.href = "/"} className="text-xs text-gray-400 hover:text-white">Back to Problems</button>
//         </header>

//         {/* WORKSPACE */}
//         <div className="flex-1 overflow-hidden">
//             <Group orientation="horizontal">
//                 <Panel defaultSize={50} minSize={20}>{DescriptionContent}</Panel>
//                 <Separator className="w-1.5 bg-[#0d1117] hover:bg-blue-600 transition-colors border-l border-r border-[#30363d] cursor-col-resize flex items-center justify-center group">
//                     <div className="h-8 w-0.5 bg-gray-600 group-hover:bg-white rounded-full"/>
//                 </Separator>
//                 <Panel defaultSize={50} minSize={20}>
//                     <Group orientation="vertical">
//                         <Panel defaultSize={70} minSize={20}>{EditorContent}</Panel>
//                         <Separator className="h-1.5 bg-[#0d1117] hover:bg-blue-600 transition-colors border-t border-b border-[#30363d] cursor-row-resize flex items-center justify-center group">
//                             <div className="w-8 h-0.5 bg-gray-600 group-hover:bg-white rounded-full"/>
//                         </Separator>
//                         <Panel defaultSize={30} minSize={10}>{ConsoleContent}</Panel>
//                     </Group>
//                 </Panel>
//             </Group>
//         </div>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { CodeEditor } from "@/components/CodeEditor";
import { 
  Play, Loader2, Timer, Pause, Square, 
  ThumbsUp, ThumbsDown, Terminal, MessageSquare, 
  ChevronDown, ChevronUp, Copy, Send
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import clsx from "clsx";
import { 
  Panel, 
  Group, 
  Separator 
} from "react-resizable-panels";

const API_URL = "http://localhost:3000";

export default function ProblemPage() {
  const params = useParams();
  const id = params.id;

  // --- STATE ---
  const [token, setToken] = useState<string | null>(null);
  const [problem, setProblem] = useState<any>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);
  
  // UI State
  const [activeTab, setActiveTab] = useState<"description" | "submissions" | "discussions">("description");
  const [expandedSubmission, setExpandedSubmission] = useState<number | null>(null);
  const [newComment, setNewComment] = useState("");
  
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // --- INITIAL LOAD ---
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    if (id) {
      fetchProblemData(id as string, storedToken);
    }
  }, [id]);

  const fetchProblemData = async (problemId: string, userToken: string | null) => {
    try {
      const res = await axios.get(`${API_URL}/problems/${problemId}`);
      setProblem(res.data);
      
      // Only set code if it's the first load, don't overwrite user's work on re-fetch
      if (!code) {
        const defaults = res.data.defaultCode as any;
        setCode(defaults["python"] || "");
      }

      if (userToken) {
        fetchSubmissions(problemId, userToken);
      }
    } catch (e) {
      console.error("Failed to load data", e);
    }
  };

  const fetchSubmissions = async (problemId: string, userToken: string) => {
    try {
      const res = await axios.get(`${API_URL}/submissions/${problemId}`, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      setSubmissions(res.data);
    } catch (e) { console.error("Failed history"); }
  };

  // --- ACTIONS ---
  
  const handleLike = async (liked: boolean) => {
    if (!token) return alert("Login required");
    try {
        await axios.post(`${API_URL}/problems/${id}/like`, { liked }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        // Re-fetch to update counts accurately from backend
        fetchProblemData(id as string, token);
    } catch (e) { alert("Action failed"); }
  };

  const handlePostComment = async () => {
    if (!token) return alert("Login to comment");
    if (!newComment.trim()) return;

    try {
        await axios.post(`${API_URL}/problems/${id}/discuss`, { text: newComment }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setNewComment("");
        fetchProblemData(id as string, token); // Refresh comments
    } catch (e) { alert("Failed to post comment"); }
  };

  const runCode = async () => {
    if (!token) return alert("Please Login to Submit Code");
    setLoading(true);
    setResult(null);
    try {
      const response = await axios.post(`${API_URL}/submit`, 
        { problemId: Number(id), language, code }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      pollStatus(response.data.submissionId);
    } catch (error) {
      setLoading(false);
      setResult({ status: "ERROR", error: "Network Error" });
    }
  };

  const pollStatus = async (submissionId: string) => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`${API_URL}/status/${submissionId}`);
        if (res.data.status !== "PENDING") {
          clearInterval(interval);
          setLoading(false);
          setResult(res.data);
          if (token && id) fetchSubmissions(id as string, token);
        }
      } catch (e) { clearInterval(interval); setLoading(false); }
    }, 1000);
  };

  // --- TIMER ---
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  if (!problem) return <div className="h-screen bg-black text-gray-400 flex items-center justify-center">Loading Problem {id}...</div>;

  // --- PANEL CONTENT ---

  const DescriptionContent = (
    <div className="h-full flex flex-col bg-[#0d1117]">
       {/* TABS HEADER */}
       <div className="flex border-b border-[#30363d] bg-[#161b22] shrink-0">
          {[
            { id: "description", label: "Description" },
            { id: "submissions", label: `Submissions (${submissions.length})` },
            { id: "discussions", label: `Discussions (${problem.discussions?.length || 0})` }
          ].map((tab) => (
             <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
                className={clsx("px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors", 
                activeTab === tab.id ? "text-white border-b-2 border-green-500 bg-[#0d1117]" : "text-gray-400 hover:text-white")}
             >
                {tab.label}
             </button>
          ))}
       </div>

       {/* CONTENT AREA */}
       <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
           
           {/* 1. DESCRIPTION TAB */}
           {activeTab === "description" && (
             <div className="space-y-6 animate-in fade-in">
                <h1 className="text-2xl font-bold text-white">{problem.title}</h1>
                <div className="flex gap-4 items-center">
                    <span className={clsx("px-3 py-1 rounded-full text-xs font-bold capitalize border",
                        problem.difficulty === "Easy" ? "bg-green-900/20 text-green-400 border-green-800" :
                        problem.difficulty === "Medium" ? "bg-yellow-900/20 text-yellow-400 border-yellow-800" :
                        "bg-red-900/20 text-red-400 border-red-800"
                    )}>{problem.difficulty}</span>
                    
                    <div className="flex gap-3 text-gray-400 text-sm">
                        <button onClick={() => handleLike(true)} className="flex items-center gap-1 hover:text-green-400 transition-colors bg-[#21262d] px-2 py-1 rounded border border-[#30363d]">
                            <ThumbsUp size={14}/> {problem.likes || 0}
                        </button>
                        <button onClick={() => handleLike(false)} className="flex items-center gap-1 hover:text-red-400 transition-colors bg-[#21262d] px-2 py-1 rounded border border-[#30363d]">
                            <ThumbsDown size={14}/> {problem.dislikes || 0}
                        </button>
                    </div>
                </div>
                <div className="prose prose-invert prose-sm text-gray-300">
                    <ReactMarkdown>{problem.description}</ReactMarkdown>
                </div>
             </div>
           )}

           {/* 2. SUBMISSIONS TAB (With Code Expansion) */}
           {activeTab === "submissions" && (
             <div className="space-y-3">
                 {!token && <div className="text-gray-500 text-center mt-10">Login to see history</div>}
                 
                 {submissions.map((sub, i) => (
                    <div key={i} className="bg-[#161b22] border border-[#30363d] rounded-lg overflow-hidden">
                        {/* Header Row (Clickable) */}
                        <div 
                            onClick={() => setExpandedSubmission(expandedSubmission === i ? null : i)}
                            className="flex justify-between items-center p-3 cursor-pointer hover:bg-[#1f242c] transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                {expandedSubmission === i ? <ChevronUp size={16} className="text-gray-500"/> : <ChevronDown size={16} className="text-gray-500"/>}
                                <span className={clsx("font-bold text-sm", sub.status === "ACCEPTED" ? "text-green-500" : "text-red-500")}>
                                    {sub.status.replace(/_/g, " ")}
                                </span>
                            </div>
                            <div className="text-right text-xs text-gray-400 flex gap-4">
                                <span>{sub.time || "-"}</span>
                                <span>{new Date(sub.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>

                        {/* Expanded Code View */}
                        {expandedSubmission === i && (
                            <div className="border-t border-[#30363d] bg-[#0d1117] p-3 animate-in slide-in-from-top-2">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs text-gray-500 font-mono lowercase">{sub.language}</span>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigator.clipboard.writeText(sub.code);
                                            alert("Code copied!");
                                        }}
                                        className="text-gray-500 hover:text-white"
                                    >
                                        <Copy size={12}/>
                                    </button>
                                </div>
                                <pre className="text-xs font-mono text-gray-300 overflow-x-auto p-2 bg-black/50 rounded custom-scrollbar">
                                    {sub.code}
                                </pre>
                            </div>
                        )}
                    </div>
                 ))}
                 {submissions.length === 0 && token && <div className="text-gray-500 text-center">No submissions yet.</div>}
             </div>
           )}

           {/* 3. DISCUSSIONS TAB */}
           {activeTab === "discussions" && (
             <div className="flex flex-col h-full">
                 {/* List */}
                 <div className="flex-1 space-y-4 mb-4">
                     {problem.discussions?.map((d: any, i: number) => (
                         <div key={i} className="bg-[#161b22] border border-[#30363d] p-3 rounded-lg">
                             <div className="flex justify-between items-center mb-2">
                                 <div className="flex items-center gap-2">
                                     <div className="w-6 h-6 rounded bg-blue-900/30 text-blue-400 flex items-center justify-center text-xs font-bold">
                                         {d.user?.username?.[0]?.toUpperCase() || "U"}
                                     </div>
                                     <span className="text-sm font-bold text-gray-300">{d.user?.username || "Unknown"}</span>
                                 </div>
                                 <span className="text-xs text-gray-600">{new Date(d.createdAt).toLocaleDateString()}</span>
                             </div>
                             <p className="text-sm text-gray-400">{d.text}</p>
                         </div>
                     ))}
                     {(!problem.discussions || problem.discussions.length === 0) && (
                         <div className="text-center text-gray-500 mt-10">No comments yet. Be the first!</div>
                     )}
                 </div>

                 {/* Input Area */}
                 <div className="bg-[#161b22] p-3 rounded-lg border border-[#30363d] flex gap-2 mt-auto">
                     <input 
                        className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-gray-600"
                        placeholder="Type a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handlePostComment()}
                     />
                     <button onClick={handlePostComment} className="text-blue-500 hover:text-blue-400">
                         <Send size={16}/>
                     </button>
                 </div>
             </div>
           )}
       </div>
    </div>
  );

  const EditorContent = (
    <div className="h-full flex flex-col bg-[#1e1e1e]">
        <div className="h-12 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between px-4 shrink-0">
             <select value={language} onChange={e => setLanguage(e.target.value)} // set language logic needs simple setter here as editor handles defaults via prop if needed
                className="bg-[#0d1117] text-gray-300 text-xs border border-[#30363d] rounded px-2 py-1"
             >
                <option value="python">Python</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
                <option value="javascript">JavaScript</option>
                <option value="go">Go</option>
             </select>
             
             <div className="flex items-center gap-3">
                 <div className="flex items-center gap-2 bg-[#0d1117] px-2 py-1 rounded border border-[#30363d]">
                     <Timer size={14} className="text-gray-400"/>
                     <span className="text-white font-mono text-sm w-12 text-center">{formatTime(timer)}</span>
                     {!isTimerRunning ? 
                        <Play size={14} className="cursor-pointer hover:text-green-400" onClick={() => setIsTimerRunning(true)}/> :
                        <Pause size={14} className="cursor-pointer hover:text-yellow-400" onClick={() => setIsTimerRunning(false)}/>
                     }
                     <Square size={14} className="cursor-pointer hover:text-red-400" onClick={() => { setIsTimerRunning(false); setTimer(0); }}/>
                 </div>
                 <button onClick={runCode} disabled={loading} className="bg-green-600 px-4 py-1 rounded text-xs text-white font-bold hover:bg-green-500 disabled:opacity-50">
                     {loading ? "Running..." : "Submit"}
                 </button>
             </div>
        </div>
        <div className="flex-1 relative">
            <CodeEditor language={language} code={code} setCode={setCode} />
        </div>
    </div>
  );

  const ConsoleContent = (
    <div className="h-full flex flex-col bg-[#0d1117]">
        <div className="h-8 bg-[#161b22] px-4 flex items-center border-b border-[#30363d] shrink-0">
            <span className="text-xs font-bold text-gray-400 uppercase">Console</span>
        </div>
        <div className="flex-1 p-4 font-mono text-sm overflow-y-auto custom-scrollbar">
             {!result && <div className="text-gray-600 text-center mt-4">Run code to see output</div>}
             {loading && <div className="text-gray-400 text-center mt-4 flex flex-col items-center"><Loader2 className="animate-spin mb-2"/>Running...</div>}
             
             {result && (
                 <div>
                     <span className={clsx("text-lg font-bold", result.status === "ACCEPTED" ? "text-green-500" : "text-red-500")}>
                        {result.status === "ACCEPTED" ? "Accepted" : result.status.replace(/_/g, " ")}
                     </span>
                     {result.metrics && <span className="text-xs text-gray-500 ml-3">{result.metrics.time} • {result.metrics.memory}</span>}
                     
                     {(result.status === "RUNTIME_ERROR" || result.status === "COMPILATION_ERROR") && (
                         <div className="text-red-400 mt-2 whitespace-pre-wrap text-xs">{result.error || result.details?.actual}</div>
                     )}
                     
                     {result.status === "WRONG_ANSWER" && result.details && (
                         <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                             <div className="bg-[#161b22] p-2 rounded"><div className="text-gray-500">Input</div>{result.details.input}</div>
                             <div className="bg-[#161b22] p-2 rounded"><div className="text-gray-500">Expected</div>{result.details.expected}</div>
                             <div className="bg-[#161b22] p-2 rounded col-span-2 border border-red-900"><div className="text-red-400">Actual</div>{result.details.actual}</div>
                         </div>
                     )}
                 </div>
             )}
        </div>
    </div>
  );

  return (
    <div className="h-screen w-screen bg-black flex flex-col font-sans overflow-hidden">
        <header className="h-14 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between px-6 shrink-0 z-10">
            <div className="flex items-center gap-2">
                <div className="bg-white text-black font-bold px-2 py-0.5 rounded">AV</div>
                <h1 className="text-white font-bold">Algoverse</h1>
            </div>
            <button onClick={() => window.location.href = "/"} className="text-xs text-gray-400 hover:text-white">Back to Problems</button>
        </header>

        <div className="flex-1 overflow-hidden">
            <Group orientation="horizontal">
                <Panel defaultSize={50} minSize={20}>{DescriptionContent}</Panel>
                <Separator className="w-1.5 bg-[#0d1117] hover:bg-blue-600 transition-colors border-l border-r border-[#30363d] cursor-col-resize flex items-center justify-center group">
                    <div className="h-8 w-0.5 bg-gray-600 group-hover:bg-white rounded-full"/>
                </Separator>
                <Panel defaultSize={50} minSize={20}>
                    <Group orientation="vertical">
                        <Panel defaultSize={70} minSize={20}>{EditorContent}</Panel>
                        <Separator className="h-1.5 bg-[#0d1117] hover:bg-blue-600 transition-colors border-t border-b border-[#30363d] cursor-row-resize flex items-center justify-center group">
                            <div className="w-8 h-0.5 bg-gray-600 group-hover:bg-white rounded-full"/>
                        </Separator>
                        <Panel defaultSize={30} minSize={10}>{ConsoleContent}</Panel>
                    </Group>
                </Panel>
            </Group>
        </div>
    </div>
  );
}
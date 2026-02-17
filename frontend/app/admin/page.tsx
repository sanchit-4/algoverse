// // "use client";
// // import { useState } from "react";
// // import axios from "axios";

// // export default function AdminCRM() {
// //   const [form, setForm] = useState({
// //     title: "", description: "", slug: "", difficulty: "Easy",
// //     defaultCode: { python: "", cpp: "" },
// //     testCases: [{ input: "", expectedOutput: "" }]
// //   });

// //   const handleSubmit = async () => {
// //     const token = localStorage.getItem("token");
// //     await axios.post("http://localhost:3000/admin/problem", form, {
// //       headers: { Authorization: `Bearer ${token}` }
// //     });
// //     alert("Problem Created!");
// //   };

// //   return (
// //     <div className="p-10 bg-black text-white min-h-screen">
// //       <h1 className="text-3xl font-bold mb-5">Admin CRM</h1>
// //       <div className="space-y-4 max-w-2xl">
// //         <input placeholder="Title" className="w-full p-2 bg-gray-800" onChange={e => setForm({...form, title: e.target.value})} />
// //         <textarea placeholder="Description (Markdown)" className="w-full p-2 bg-gray-800" onChange={e => setForm({...form, description: e.target.value})} />
// //         {/* Add inputs for boilerplate and testcases here similarly */}
// //         <button onClick={handleSubmit} className="bg-green-600 px-4 py-2 rounded">Create Problem</button>
// //       </div>
// //     </div>
// //   );
// // }


// "use client";

// import { useState } from "react";
// import axios from "axios";
// import { Plus, Trash } from "lucide-react";

// export default function AdminPage() {
//   const [form, setForm] = useState({
//     title: "",
//     slug: "",
//     description: "",
//     difficulty: "Easy",
//     defaultCode: { python: "", cpp: "", java: "", javascript: "" },
//     testCases: [{ input: "", expectedOutput: "" }]
//   });

//   const handleSubmit = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) return alert("Login as Admin first");

//     try {
//       await axios.post("http://localhost:3000/admin/problem", form, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       alert("Problem Created Successfully!");
//     } catch (e: any) {
//       alert("Error: " + (e.response?.data?.error || e.message));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black text-white p-10 font-sans">
//       <h1 className="text-3xl font-bold mb-8 text-blue-500">Algoverse CRM</h1>
      
//       <div className="grid grid-cols-2 gap-8 max-w-5xl">
//         {/* Left Column: Details */}
//         <div className="space-y-4">
//           <input 
//             placeholder="Problem Title (e.g. Two Sum)" 
//             className="w-full bg-[#161b22] border border-[#30363d] p-3 rounded"
//             onChange={e => setForm({...form, title: e.target.value})}
//           />
//           <input 
//             placeholder="Slug (e.g. two-sum)" 
//             className="w-full bg-[#161b22] border border-[#30363d] p-3 rounded"
//             onChange={e => setForm({...form, slug: e.target.value})}
//           />
//           <select 
//             className="w-full bg-[#161b22] border border-[#30363d] p-3 rounded"
//             onChange={e => setForm({...form, difficulty: e.target.value})}
//           >
//             <option>Easy</option>
//             <option>Medium</option>
//             <option>Hard</option>
//           </select>
//           <textarea 
//             placeholder="Description (Markdown supported)" 
//             className="w-full h-40 bg-[#161b22] border border-[#30363d] p-3 rounded"
//             onChange={e => setForm({...form, description: e.target.value})}
//           />
//         </div>

//         {/* Right Column: Code & Tests */}
//         <div className="space-y-4">
//           <h3 className="font-bold text-gray-400">Boilerplate Code</h3>
//           <textarea 
//             placeholder="Python Boilerplate" 
//             className="w-full h-20 bg-[#161b22] border border-[#30363d] p-3 rounded font-mono text-xs"
//             onChange={e => setForm({...form, defaultCode: {...form.defaultCode, python: e.target.value}})}
//           />
//           <textarea 
//             placeholder="C++ Boilerplate" 
//             className="w-full h-20 bg-[#161b22] border border-[#30363d] p-3 rounded font-mono text-xs"
//             onChange={e => setForm({...form, defaultCode: {...form.defaultCode, cpp: e.target.value}})}
//           />
          
//           <div className="border-t border-[#30363d] pt-4">
//             <h3 className="font-bold text-gray-400 mb-2">Test Cases</h3>
//             {form.testCases.map((tc, i) => (
//               <div key={i} className="flex gap-2 mb-2">
//                 <input 
//                   placeholder="Input" 
//                   className="w-1/2 bg-[#161b22] p-2 rounded text-xs"
//                   onChange={e => {
//                     const newTC = [...form.testCases];
//                     newTC[i].input = e.target.value;
//                     setForm({...form, testCases: newTC});
//                   }}
//                 />
//                 <input 
//                   placeholder="Output" 
//                   className="w-1/2 bg-[#161b22] p-2 rounded text-xs"
//                   onChange={e => {
//                     const newTC = [...form.testCases];
//                     newTC[i].expectedOutput = e.target.value;
//                     setForm({...form, testCases: newTC});
//                   }}
//                 />
//               </div>
//             ))}
//             <button 
//               onClick={() => setForm({...form, testCases: [...form.testCases, {input: "", expectedOutput: ""}]})}
//               className="text-xs text-blue-400 flex items-center gap-1 mt-2"
//             >
//               <Plus size={14}/> Add Test Case
//             </button>
//           </div>
//         </div>
//       </div>

//       <button 
//         onClick={handleSubmit} 
//         className="mt-8 bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-lg"
//       >
//         Publish Problem
//       </button>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Trash, Save, Code, FileText, Settings, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminCRM() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  // Form State
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    difficulty: "Easy",
    defaultCode: { python: "", cpp: "", java: "", javascript: "" } as any,
    testCases: [{ input: "", expectedOutput: "" }]
  });

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) {
        alert("Access Denied: Please Login first");
        router.push("/");
    }
    setToken(t);
  }, []);

  const handleSubmit = async () => {
    if (!token) return;
    try {
      await axios.post("http://localhost:3000/admin/problem", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("✅ Problem Created Successfully!");
      // Reset form or redirect
    } catch (e: any) {
      alert("Error: " + (e.response?.data?.error || e.message));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Settings className="text-blue-500" />
            Algoverse CRM
            <span className="text-sm font-normal text-gray-500 ml-auto bg-[#161b22] px-3 py-1 rounded">Admin Mode</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* LEFT: Metadata */}
            <div className="space-y-6">
                <div className="bg-[#161b22] p-6 rounded-xl border border-[#30363d] space-y-4">
                    <h2 className="text-xl font-bold flex items-center gap-2"><FileText size={20}/> Problem Details</h2>
                    
                    <div>
                        <label className="text-xs text-gray-400 uppercase font-bold">Title</label>
                        <input 
                            className="w-full bg-[#0d1117] border border-[#30363d] p-3 rounded text-white focus:border-blue-500 outline-none"
                            placeholder="e.g. Two Sum"
                            value={form.title}
                            onChange={e => setForm({...form, title: e.target.value})}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-gray-400 uppercase font-bold">Slug</label>
                            <input 
                                className="w-full bg-[#0d1117] border border-[#30363d] p-3 rounded text-white focus:border-blue-500 outline-none"
                                placeholder="two-sum"
                                value={form.slug}
                                onChange={e => setForm({...form, slug: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 uppercase font-bold">Difficulty</label>
                            <select 
                                className="w-full bg-[#0d1117] border border-[#30363d] p-3 rounded text-white focus:border-blue-500 outline-none"
                                value={form.difficulty}
                                onChange={e => setForm({...form, difficulty: e.target.value})}
                            >
                                <option>Easy</option>
                                <option>Medium</option>
                                <option>Hard</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs text-gray-400 uppercase font-bold">Description (Markdown)</label>
                        <textarea 
                            className="w-full h-40 bg-[#0d1117] border border-[#30363d] p-3 rounded text-white focus:border-blue-500 outline-none font-mono text-sm"
                            placeholder="# Problem Description..."
                            value={form.description}
                            onChange={e => setForm({...form, description: e.target.value})}
                        />
                    </div>
                </div>

                {/* TEST CASES */}
                <div className="bg-[#161b22] p-6 rounded-xl border border-[#30363d] space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold flex items-center gap-2"><CheckCircle size={20}/> Test Cases</h2>
                        <button 
                            onClick={() => setForm({...form, testCases: [...form.testCases, {input: "", expectedOutput: ""}]})}
                            className="text-xs bg-blue-600 px-3 py-1 rounded hover:bg-blue-500 transition-colors flex items-center gap-1"
                        >
                            <Plus size={14}/> Add Case
                        </button>
                    </div>

                    <div className="space-y-3">
                        {form.testCases.map((tc, i) => (
                            <div key={i} className="flex gap-2 items-start">
                                <div className="grid grid-cols-2 gap-2 flex-1">
                                    <textarea 
                                        placeholder="Input" 
                                        className="bg-[#0d1117] border border-[#30363d] p-2 rounded text-xs font-mono h-16 resize-none"
                                        value={tc.input}
                                        onChange={e => {
                                            const newTC = [...form.testCases];
                                            newTC[i].input = e.target.value;
                                            setForm({...form, testCases: newTC});
                                        }}
                                    />
                                    <textarea 
                                        placeholder="Expected Output" 
                                        className="bg-[#0d1117] border border-[#30363d] p-2 rounded text-xs font-mono h-16 resize-none"
                                        value={tc.expectedOutput}
                                        onChange={e => {
                                            const newTC = [...form.testCases];
                                            newTC[i].expectedOutput = e.target.value;
                                            setForm({...form, testCases: newTC});
                                        }}
                                    />
                                </div>
                                <button 
                                    onClick={() => {
                                        const newTC = form.testCases.filter((_, idx) => idx !== i);
                                        setForm({...form, testCases: newTC});
                                    }}
                                    className="p-2 text-red-500 hover:bg-red-900/20 rounded"
                                >
                                    <Trash size={16}/>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* RIGHT: Boilerplate Code */}
            <div className="space-y-6">
                <div className="bg-[#161b22] p-6 rounded-xl border border-[#30363d] space-y-4 h-full flex flex-col">
                    <h2 className="text-xl font-bold flex items-center gap-2"><Code size={20}/> Boilerplate Code</h2>
                    
                    {["python", "cpp", "java", "javascript"].map((lang) => (
                        <div key={lang} className="flex-1">
                            <label className="text-xs text-gray-400 uppercase font-bold mb-1 block">{lang}</label>
                            <textarea 
                                className="w-full h-32 bg-[#0d1117] border border-[#30363d] p-3 rounded text-green-400 focus:border-blue-500 outline-none font-mono text-xs"
                                placeholder={`Enter ${lang} starter code...`}
                                value={form.defaultCode[lang]}
                                onChange={e => setForm({
                                    ...form, 
                                    defaultCode: { ...form.defaultCode, [lang]: e.target.value }
                                })}
                            />
                        </div>
                    ))}
                </div>
            </div>

        </div>

        <button 
            onClick={handleSubmit}
            className="fixed bottom-8 right-8 bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-8 rounded-full shadow-2xl flex items-center gap-2 transition-transform hover:scale-105"
        >
            <Save size={20}/> Publish Problem
        </button>
      </div>
    </div>
  );
}
"use client";

import React from "react";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  language: string;
  code: string;
  setCode: (code: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ language, code, setCode }) => {
  return (
    <div className="h-full w-full border border-gray-700 rounded-lg overflow-hidden shadow-2xl">
      <Editor
        height="100%"
        language={language} // "python", "cpp", "javascript"
        value={code}
        theme="vs-dark" // The classic VS Code Dark theme
        onChange={(value) => setCode(value || "")}
        options={{
          minimap: { enabled: false }, // Hide the mini-map to save space
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};
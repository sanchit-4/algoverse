// // export interface LanguageConfig {
// //     image: string;
// //     fileName: string; // e.g., "Main.java" or "main.cpp"
// //     runCommand: (filePath: string) => string; // Function to generate the command
// // }

// // export const LANGUAGE_MAP: Record<string, LanguageConfig> = {
// //     // 1. Python
// //     "python": {
// //         image: "python:3.9-alpine",
// //         fileName: "main.py",
// //         runCommand: (file) => `python ${file}`
// //     },

// //     // 2. JavaScript (Node.js)
// //     "javascript": {
// //         image: "node:18-alpine",
// //         fileName: "main.js",
// //         runCommand: (file) => `node ${file}`
// //     },

// //     // 3. C++ (GCC)
// //     // We compile to 'output' binary, then run it
// //     "cpp": {
// //         image: "gcc:latest", // A bit heavy, but standard
// //         fileName: "main.cpp",
// //         runCommand: (file) => `g++ ${file} -o /app/output && /app/output`
// //     },

// //     // 4. Java (OpenJDK)
// //     // Java is strict. The file MUST be Main.java and class MUST be Main.
// //     "java": {
// //         image: "eclipse-temurin:17-jdk-alpine",
// //         fileName: "Main.java",
// //         runCommand: (file) => `javac ${file} && java -cp /app Main`
// //     },

// //     // 5. Go (Golang)
// //     "go": {
// //         image: "golang:1.19-alpine",
// //         fileName: "main.go",
// //         runCommand: (file) => `go run ${file}`
// //     }
// // };

// // export const SUPPORTED_LANGUAGES = Object.keys(LANGUAGE_MAP);

// export interface LanguageConfig {
//     image: string;
//     fileName: string; // "main.cpp", "Main.java"
//     compileCommand?: string; // Optional (Python doesn't need it)
//     runCommand: string;
// }

// export const LANGUAGE_MAP: Record<string, any> = {
//     "python": {
//         image: "python:3.9-alpine",
//         fileName: "main.py",
//         // No compile command for Python
//         runCommand: "python /app/main.py" 
//     },
//     "javascript": {
//         image: "node:18-alpine",
//         fileName: "main.js",
//         runCommand: "node /app/main.js"
//     },
//     "cpp": {
//         image: "gcc:latest",
//         fileName: "main.cpp",
//         // Compile to 'main' binary
//         compileCommand: "g++ /app/main.cpp -o /app/main",
//         runCommand: "/app/main"
//     },
//     "java": {
//         image: "eclipse-temurin:17-jdk-alpine",
//         fileName: "Main.java",
//         // Compile to Main.class
//         compileCommand: "javac /app/Main.java",
//         // Run with classpath set to /app
//         runCommand: "java -cp /app Main"
//     },
//     "go": {
//         image: "golang:1.19-alpine",
//         fileName: "main.go",
//         // Go is special: 'go run' compiles and runs, but for speed we should 'go build'
//         compileCommand: "go build -o /app/main /app/main.go",
//         runCommand: "/app/main"
//     }
// };

export interface LanguageConfig {
    image: string;
    fileName: string;
    compileCommand?: string;
    runCommand: string;
}

export const LANGUAGE_MAP: Record<string, any> = {
    "python": {
        image: "python:3.9-alpine",
        fileName: "main.py",
        runCommand: "python /app/main.py" 
    },
    "javascript": {
        image: "node:18-alpine",
        fileName: "main.js",
        runCommand: "node /app/main.js"
    },
    "cpp": {
        image: "gcc:latest", // Uses standard GCC image
        fileName: "main.cpp",
        // CRITICAL FIX: Add 'chmod +x' to ensure the binary is executable
        compileCommand: "g++ /app/main.cpp -o /app/main && chmod +x /app/main",
        runCommand: "/app/main"
    },
    "java": {
        image: "eclipse-temurin:17-jdk-alpine",
        fileName: "Main.java",
        compileCommand: "javac /app/Main.java",
        runCommand: "java -cp /app Main"
    },
    "go": {
        image: "golang:1.19-alpine",
        fileName: "main.go",
        // Go needs a specific environment to build output to a different folder
        compileCommand: "go build -o /app/main /app/main.go",
        runCommand: "/app/main"
    }
};
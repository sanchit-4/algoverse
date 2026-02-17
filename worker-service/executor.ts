import Docker from "dockerode";
import fs from "fs";
import path from "path";
import { LANGUAGE_MAP } from "./languages";

const docker = new Docker({ 
    socketPath: process.platform === "win32" 
        ? "//./pipe/docker_engine" 
        : "/var/run/docker.sock" 
});

const TEMP_DIR = path.join(__dirname, "temp");

// --- 1. SETUP PHASE ---
export async function initializeSubmission(code: string, language: string): Promise<string | null> {
    const config = LANGUAGE_MAP[language];
    if (!config) return null;

    if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR);

    const uniqueId = `sub-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const uniquePath = path.join(TEMP_DIR, uniqueId);
    
    fs.mkdirSync(uniquePath);
    fs.writeFileSync(path.join(uniquePath, config.fileName), code);

    return uniqueId; 
}

// --- 2. COMPILATION PHASE ---
export async function compileCode(uniqueId: string, language: string): Promise<{ success: boolean; error?: string }> {
    const config = LANGUAGE_MAP[language];
    // Check if compileCommand exists (interpreted langs like Python return undefined here)
    if (!config.compileCommand) {
        return { success: true }; 
    }

    const uniquePath = path.join(TEMP_DIR, uniqueId);
    let container: Docker.Container | null = null;

    try {
        console.log(`[Compile] Starting compilation for ${language}...`);
        
        container = await docker.createContainer({
            Image: config.image,
            // FIX 1: Ensure compileCommand is treated as a string command
            Cmd: ["sh", "-c", config.compileCommand], 
            Tty: false,
            HostConfig: {
                Binds: [`${uniquePath}:/app:rw`], 
                NetworkMode: "none",
                Memory: 512 * 1024 * 1024, 
                NanoCpus: 2000000000      
            }
        });

        await container.start();
        const result = await container.wait();

        if (result.StatusCode !== 0) {
            // FIX 2: Cast to Buffer so .toString() works
            const logs = await container.logs({ stderr: true, stdout: true }) as Buffer;
            const errorMsg = logs.toString("utf8").replace(/[\x00-\x08]/g, "").trim();
            return { success: false, error: errorMsg };
        }

        return { success: true };

    } catch (error) {
        console.error("Compilation System Error:", error);
        return { success: false, error: "System Error during compilation" };
    } finally {
        if (container) try { await container.remove(); } catch(e) {}
    }
}
export type ExecutionResult = {
    output: string;
    status: "COMPLETED" | "TIMEOUT" | "ERROR";
    executionTime: number; // in milliseconds
    memoryUsed: number;    // in bytes
};
// --- 3. EXECUTION PHASE ---
export async function runCode(uniqueId: string, language: string, input: string): Promise<ExecutionResult> {
    const config = LANGUAGE_MAP[language];
    const uniquePath = path.join(TEMP_DIR, uniqueId);
    
    fs.writeFileSync(path.join(uniquePath, "input.txt"), input);

    let container: Docker.Container | null = null;
    let timer: NodeJS.Timeout | null = null;

    try {
        // FIX 3: Handle runCommand properly. 
        // If runCommand is a function in languages.ts, we call it. If it's a string, we use it.
        const runCmd = typeof config.runCommand === 'function' 
            ? config.runCommand(`/app/${config.fileName}`) 
            : config.runCommand;

        // Redirect input.txt into the command
        const fullCmd = `sh -c "${runCmd} < /app/input.txt"`;
        const startTime = process.hrtime();
        container = await docker.createContainer({
            Image: config.image,
            Cmd: ["sh", "-c", fullCmd],
            Tty: false,
            HostConfig: {
                Binds: [`${uniquePath}:/app:ro`], 
                NetworkMode: "none",
                Memory: 128 * 1024 * 1024, 
                NanoCpus: 1000000000,
                PidsLimit: 20
            }
        });

        await container.start();

        let isTimedOut = false;
        const timeoutPromise = new Promise((_, reject) => {
            timer = setTimeout(() => {
                isTimedOut = true;
                if (container) container.kill().catch(() => {});
                reject(new Error("TLE"));
            }, 2000);
        });

        try {
            // FIX 4: TypeScript knows container is not null here because we awaited createContainer
            await Promise.race([container.wait(), timeoutPromise]);
        } catch (err) {
            if (isTimedOut) {
                const diff = process.hrtime(startTime);
                const executionTime = (diff[0] * 1000) + (diff[1] / 1e6);
                return { output: "Time Limit Exceeded", status: "TIMEOUT", executionTime, memoryUsed: 0 };
            }
            throw err;
        } finally {
            if (timer) clearTimeout(timer);
        }
        const diff = process.hrtime(startTime);
        const executionTime = (diff[0] * 1000) + (diff[1] / 1e6); // Convert to ms
        const stats = await container.inspect();
        // Note: This is an approximation. Docker doesn't always give peak memory easily without stream stats.
        // We will assume a baseline or mock it for now if stats.HostConfig isn't sufficient.
        // A pro approach uses a wrapper script inside docker like '/usr/bin/time -v'
        // For this tutorial, we will rely on executionTime heavily and mock memory slightly based on chars.
        const memoryUsed = 1024 * 1024 * (Math.random() * 5 + 1); // Mocking Memory for now (Hard to get from Dockerode directly without stream)
        const data = await container.inspect();
        // FIX 5: Cast to Buffer
        const logs = await container.logs({ stdout: true, stderr: true }) as Buffer;
        const output = logs.toString("utf8").replace(/[\x00-\x08]/g, "").trim();

        if (data.State.ExitCode !== 0) {
            return { output: output, status: "ERROR", executionTime: executionTime, memoryUsed: memoryUsed };
        }

        return { output: output, status: "COMPLETED",
            executionTime: executionTime,
            memoryUsed: memoryUsed  };

    } catch (error) {
        console.error("Execution Error:", error);
        return { output: "System Error", status: "ERROR", executionTime: 0, memoryUsed: 0 };
    } finally {
        if (container) try { await container.remove({ force: true }); } catch(e) {}
    }
}

// --- 4. CLEANUP PHASE ---
export function cleanupSubmission(uniqueId: string) {
    const uniquePath = path.join(TEMP_DIR, uniqueId);
    if (fs.existsSync(uniquePath)) {
        try {
            fs.rmSync(uniquePath, { recursive: true, force: true });
            console.log(`[Cleanup] Deleted ${uniqueId}`);
        } catch (e) {
            console.error("Cleanup Error:", e);
        }
    }
}
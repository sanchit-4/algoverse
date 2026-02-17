// // // import amqp from "amqplib";
// // // import Redis from "ioredis";
// // // import { prisma } from "./lib/prisma"; 
// // // import { initializeSubmission, compileCode, runCode, cleanupSubmission } from "./executor"; 

// // // const RABBITMQ_URL = "amqp://user:password@localhost:5672";
// // // const QUEUE_NAME = "submission_queue";

// // // // Redis connection
// // // const redis = new Redis("redis://localhost:6379");

// // // async function startWorker() {
// // //     try {
// // //         const connection = await amqp.connect(RABBITMQ_URL);
// // //         const channel = await connection.createChannel();
// // //         await channel.assertQueue(QUEUE_NAME, { durable: true });
        
// // //         // Critical: Ensure worker only processes 1 submission at a time
// // //         channel.prefetch(1); 

// // //         console.log("👷 Worker Service Online (Optimized Mode)...");

// // //         channel.consume(QUEUE_NAME, async (msg) => {
// // //             if (msg === null) return;

// // //             const submission = JSON.parse(msg.content.toString());
// // //             const submissionId = submission.submissionId;
// // //             let buildId: string | null = null;

// // //             try {
// // //                 console.log(`\nProcessing: ${submissionId}`);

// // //                 // 1. Fetch Problem Data
// // //                 const problem = await prisma.problem.findUnique({
// // //                     where: { id: submission.problemId },
// // //                     include: { testCases: true } 
// // //                 });

// // //                 if (!problem) {
// // //                     console.error("❌ Problem not found");
// // //                     // We return here, but 'finally' will still run to ACK the message
// // //                     return;
// // //                 }

// // //                 // --- STEP 1: INITIALIZE ---
// // //                 buildId = await initializeSubmission(submission.code, submission.language);
                
// // //                 if (!buildId) {
// // //                     console.error("❌ Language not supported");
// // //                     await redis.set(`submission:${submissionId}`, "ERROR: Unsupported Language", 'EX', 3600);
// // //                     return; 
// // //                 }

// // //                 // --- STEP 2: COMPILE (Once) ---
// // //                 const compileResult = await compileCode(buildId, submission.language);
                
// // //                 if (!compileResult.success) {
// // //                     console.log("❌ Compilation Failed");
                    
// // //                     // Save Compilation Error to DB
// // //                     await prisma.submission.create({
// // //                         data: {
// // //                             id: submissionId,
// // //                             problemId: submission.problemId,
// // //                             userId: "user-123", // Mock User
// // //                             code: submission.code,
// // //                             language: submission.language,
// // //                             status: "COMPILATION_ERROR"
// // //                         }
// // //                     });
                    
// // //                     // Notify Frontend via Redis
// // //                     await redis.set(`submission:${submissionId}`, `COMPILATION_ERROR: ${compileResult.error}`, 'EX', 3600);
                    
// // //                     // Stop processing. 'finally' block handles cleanup and ack.
// // //                     return; 
// // //                 }

// // //                 // --- STEP 3: RUN TEST CASES (Loop) ---
// // //                 console.log("Running Test Cases...");
// // //                 let finalStatus = "ACCEPTED";
                
// // //                 for (const testCase of problem.testCases) {
// // //                     const result = await runCode(buildId, submission.language, testCase.input);

// // //                     if (result.status === "TIMEOUT") {
// // //                         finalStatus = "TIME_LIMIT_EXCEEDED";
// // //                         break; // Fail fast
// // //                     }
// // //                     if (result.status === "ERROR") {
// // //                         finalStatus = "RUNTIME_ERROR";
// // //                         break;
// // //                     }
// // //                     if (result.output.trim() !== testCase.expectedOutput.trim()) {
// // //                         finalStatus = "WRONG_ANSWER";
// // //                         break;
// // //                     }
// // //                 }

// // //                 console.log(`🏁 Final Verdict: ${finalStatus}`);

// // //                 // Save Final Result to DB
// // //                 await prisma.submission.create({
// // //                     data: {
// // //                         id: submissionId,
// // //                         problemId: submission.problemId,
// // //                         userId: "user-123",
// // //                         code: submission.code,
// // //                         language: submission.language,
// // //                         status: finalStatus
// // //                     }
// // //                 });

// // //                 // Notify Frontend
// // //                 await redis.set(`submission:${submissionId}`, finalStatus, 'EX', 3600);

// // //             } catch (error) {
// // //                 console.error("⚠️ Worker Error:", error);
// // //                 await redis.set(`submission:${submissionId}`, "SYSTEM_ERROR", 'EX', 3600);
            
// // //             } finally {
// // //                 // --- STEP 4: CLEANUP & ACK ---
// // //                 // This block runs NO MATTER WHAT (Success, Failure, or Crash)
                
// // //                 // 1. Delete Docker containers and temp files
// // //                 if (buildId) {
// // //                     cleanupSubmission(buildId);
// // //                 }
                
// // //                 // 2. Acknowledge message to RabbitMQ (Prevention of "Double Ack" crash)
// // //                 channel.ack(msg);
// // //             }
// // //         });

// // //     } catch (error) {
// // //         console.error("Startup Error:", error);
// // //     }
// // // }

// // // startWorker();


// // import amqp from "amqplib";
// // import Redis from "ioredis";
// // import Docker from "dockerode";
// // import { prisma } from "./lib/prisma"; 
// // import { initializeSubmission, compileCode, runCode, cleanupSubmission } from "./executor"; 
// // import { LANGUAGE_MAP } from "./languages";

// // const RABBITMQ_URL = "amqp://user:password@localhost:5672";
// // const QUEUE_NAME = "submission_queue";
// // const redis = new Redis("redis://localhost:6379");
// // const docker = new Docker({ socketPath: process.platform === "win32" ? "//./pipe/docker_engine" : "/var/run/docker.sock" });

// // // --- 1. AUTO-PULL IMAGES ON STARTUP ---
// // async function initDockerImages() {
// //     console.log("🐳 Checking Docker Images...");
// //     const images = new Set(Object.values(LANGUAGE_MAP).map(c => c.image));
    
// //     for (const image of images) {
// //         try {
// //             // Check if image exists locally
// //             const imageInfos = await docker.listImages({ filters: { reference: [image] } });
// //             if (imageInfos.length === 0) {
// //                 console.log(`⬇️ Pulling ${image}... (This may take a while)`);
// //                 // Pull request
// //                 await new Promise((resolve, reject) => {
// //                     docker.pull(image, (err: any, stream: any) => {
// //                         if (err) return reject(err);
// //                         docker.modem.followProgress(stream, onFinished, onProgress);
// //                         function onFinished(err: any) { if (err) reject(err); else resolve(true); }
// //                         function onProgress(event: any) { /* Optional: Log progress */ }
// //                     });
// //                 });
// //                 console.log(`✅ Pulled ${image}`);
// //             }
// //         } catch (error) {
// //             console.error(`❌ Failed to pull ${image}:`, error);
// //         }
// //     }
// // }

// // async function startWorker() {
// //     await initDockerImages(); // Wait for images before starting worker

// //     try {
// //         const connection = await amqp.connect(RABBITMQ_URL);
// //         const channel = await connection.createChannel();
// //         await channel.assertQueue(QUEUE_NAME, { durable: true });
// //         channel.prefetch(1);

// //         console.log("⚡ Algoverse Worker Online...");

// //         channel.consume(QUEUE_NAME, async (msg) => {
// //             if (msg === null) return;
// //             const submission = JSON.parse(msg.content.toString());
// //             const submissionId = submission.submissionId;
// //             let buildId: string | null = null;

// //             try {
// //                 console.log(`\nProcessing: ${submissionId} (${submission.language})`);
// //                 const problem = await prisma.problem.findUnique({
// //                     where: { id: submission.problemId },
// //                     include: { testCases: true } 
// //                 });

// //                 if (!problem) { 
// //                     channel.ack(msg); return; 
// //                 }

// //                 // 1. Initialize
// //                 buildId = await initializeSubmission(submission.code, submission.language);
// //                 if (!buildId) {
// //                     await redis.set(`submission:${submissionId}`, JSON.stringify({ status: "ERROR", error: "Language not supported" }), 'EX', 3600);
// //                     channel.ack(msg); return;
// //                 }

// //                 // 2. Compile
// //                 const compileResult = await compileCode(buildId, submission.language);
// //                 if (!compileResult.success) {
// //                     console.log("❌ Compilation Failed");
// //                     // Save detailed error to Redis
// //                     await redis.set(`submission:${submissionId}`, JSON.stringify({ 
// //                         status: "COMPILATION_ERROR", 
// //                         error: compileResult.error 
// //                     }), 'EX', 3600);
                    
// //                     cleanupSubmission(buildId);
// //                     channel.ack(msg); return;
// //                 }

// //                 // 3. Run Test Cases
// //                 let finalStatus = "ACCEPTED";
// //                 let failedCaseDetails = null;
                
// //                 for (const testCase of problem.testCases) {
// //                     const result = await runCode(buildId, submission.language, testCase.input);

// //                     if (result.status === "TIMEOUT") {
// //                         finalStatus = "TIME_LIMIT_EXCEEDED";
// //                         failedCaseDetails = { input: testCase.input, expected: testCase.expectedOutput, actual: "Timeout" };
// //                         break;
// //                     }
// //                     if (result.status === "ERROR") {
// //                         finalStatus = "RUNTIME_ERROR";
// //                         failedCaseDetails = { input: testCase.input, expected: testCase.expectedOutput, actual: result.output }; // Send the Error Log!
// //                         break;
// //                     }
// //                     if (result.output.trim() !== testCase.expectedOutput.trim()) {
// //                         finalStatus = "WRONG_ANSWER";
// //                         failedCaseDetails = { input: testCase.input, expected: testCase.expectedOutput, actual: result.output };
// //                         break;
// //                     }
// //                 }

// //                 console.log(`🏁 Verdict: ${finalStatus}`);

// //                 // Save Result to DB
// //                 await prisma.submission.create({
// //                     data: {
// //                         id: submissionId,
// //                         problemId: submission.problemId,
// //                         userId: "user-123",
// //                         code: submission.code,
// //                         language: submission.language,
// //                         status: finalStatus
// //                     }
// //                 });

// //                 // Save Result to Redis (with details!)
// //                 await redis.set(`submission:${submissionId}`, JSON.stringify({ 
// //                     status: finalStatus, 
// //                     details: failedCaseDetails 
// //                 }), 'EX', 3600);

// //             } catch (error) {
// //                 console.error("Worker Error:", error);
// //                 await redis.set(`submission:${submissionId}`, JSON.stringify({ status: "SYSTEM_ERROR" }), 'EX', 3600);
// //             } finally {
// //                 if (buildId) cleanupSubmission(buildId);
// //                 channel.ack(msg);
// //             }
// //         });

// //     } catch (error) {
// //         console.error("Startup Error:", error);
// //     }
// // }

// // startWorker();


// import amqp from "amqplib";
// import Redis from "ioredis";
// import Docker from "dockerode";
// import { prisma } from "./lib/prisma"; 
// import { initializeSubmission, compileCode, runCode, cleanupSubmission } from "./executor"; 
// import { LANGUAGE_MAP } from "./languages";

// const RABBITMQ_URL = "amqp://user:password@localhost:5672";
// const QUEUE_NAME = "submission_queue";
// const redis = new Redis("redis://localhost:6379");
// const docker = new Docker({ socketPath: process.platform === "win32" ? "//./pipe/docker_engine" : "/var/run/docker.sock" });

// // --- 1. AUTO-PULL IMAGES ON STARTUP ---
// async function initDockerImages() {
//     console.log("🐳 Checking Docker Images...");
//     const images = new Set(Object.values(LANGUAGE_MAP).map(c => c.image));
    
//     for (const image of images) {
//         try {
//             const imageInfos = await docker.listImages({ filters: { reference: [image] } });
//             if (imageInfos.length === 0) {
//                 console.log(`⬇️ Pulling ${image}... (This may take a while)`);
//                 await new Promise((resolve, reject) => {
//                     docker.pull(image, (err: any, stream: any) => {
//                         if (err) return reject(err);
//                         docker.modem.followProgress(stream, onFinished, onProgress);
//                         function onFinished(err: any) { if (err) reject(err); else resolve(true); }
//                         function onProgress(event: any) { /* Optional: Log progress */ }
//                     });
//                 });
//                 console.log(`✅ Pulled ${image}`);
//             }
//         } catch (error) {
//             console.error(`❌ Failed to pull ${image}:`, error);
//         }
//     }
// }

// async function startWorker() {
//     await initDockerImages(); 

//     try {
//         const connection = await amqp.connect(RABBITMQ_URL);
//         const channel = await connection.createChannel();
//         await channel.assertQueue(QUEUE_NAME, { durable: true });
//         channel.prefetch(1);

//         console.log("⚡ Algoverse Worker Online...");

//         channel.consume(QUEUE_NAME, async (msg) => {
//             if (msg === null) return;
//             const submission = JSON.parse(msg.content.toString());
//             const submissionId = submission.submissionId;
//             let buildId: string | null = null;

//             try {
//                 console.log(`\nProcessing: ${submissionId} (${submission.language})`);
//                 const problem = await prisma.problem.findUnique({
//                     where: { id: submission.problemId },
//                     include: { testCases: true } 
//                 });

//                 if (!problem) { 
//                     // 🛑 FIX: No manual ack here
//                     return; 
//                 }

//                 // 1. Initialize
//                 buildId = await initializeSubmission(submission.code, submission.language);
//                 if (!buildId) {
//                     await redis.set(`submission:${submissionId}`, JSON.stringify({ status: "ERROR", error: "Language not supported" }), 'EX', 3600);
//                     // 🛑 FIX: No manual ack here
//                     return;
//                 }

//                 // 2. Compile
//                 const compileResult = await compileCode(buildId, submission.language);
//                 if (!compileResult.success) {
//                     console.log("❌ Compilation Failed");
//                     await redis.set(`submission:${submissionId}`, JSON.stringify({ 
//                         status: "COMPILATION_ERROR", 
//                         error: compileResult.error 
//                     }), 'EX', 3600);
                    
//                     // 🛑 FIX: No manual ack here, No manual cleanup (finally handles it)
//                     return;
//                 }

//                 // 3. Run Test Cases
//                 let finalStatus = "ACCEPTED";
//                 let failedCaseDetails = null;
//                 let totalTime = 0;
//                 let maxMemory = 0;
                
//                 for (const testCase of problem.testCases) {
//                     const result = await runCode(buildId, submission.language, testCase.input);
//                     totalTime += result.executionTime;
//                     maxMemory = Math.max(maxMemory, result.memoryUsed);

//                     if (result.status === "TIMEOUT") {
//                         finalStatus = "TIME_LIMIT_EXCEEDED";
//                         failedCaseDetails = { input: testCase.input, expected: testCase.expectedOutput, actual: "Timeout" };
//                         break;
//                     }
//                     if (result.status === "ERROR") {
//                         finalStatus = "RUNTIME_ERROR";
//                         failedCaseDetails = { input: testCase.input, expected: testCase.expectedOutput, actual: result.output }; 
//                         break;
//                     }
//                     if (result.output.trim() !== testCase.expectedOutput.trim()) {
//                         finalStatus = "WRONG_ANSWER";
//                         failedCaseDetails = { input: testCase.input, expected: testCase.expectedOutput, actual: result.output };
//                         break;
//                     }
//                 }

//                 console.log(`🏁 Verdict: ${finalStatus}`);

//                 // Save Result to DB
//                 await prisma.submission.create({
//                     data: {
//                         id: submissionId,
//                         problemId: submission.problemId,
//                         userId: submission.userId,
//                         code: submission.code,
//                         language: submission.language,
//                         status: finalStatus,
//                         time: result.metrics?.time || "0ms",   // Save metrics too
//                         memory: result.metrics?.memory || "0MB"
//                     }
//                 });

//                 // Save Result to Redis
//                 await redis.set(`submission:${submissionId}`, JSON.stringify({ 
//                     status: finalStatus, 
//                     details: failedCaseDetails ,
//                     metrics: {
//                         time: `${Math.round(totalTime / problem.testCases.length)}ms`,
//                         memory: `${(maxMemory / 1024 / 1024).toFixed(2)}MB`
//                     }
//                 }), 'EX', 3600);

//             } catch (error) {
//                 console.error("Worker Error:", error);
//                 await redis.set(`submission:${submissionId}`, JSON.stringify({ status: "SYSTEM_ERROR" }), 'EX', 3600);
//             } finally {
//                 // ✅ THIS RUNS EVERY TIME
//                 if (buildId) cleanupSubmission(buildId);
                
//                 // ✅ This is the ONLY place we ack
//                 channel.ack(msg);
//             }
//         });

//     } catch (error) {
//         console.error("Startup Error:", error);
//     }
// }

// startWorker();

import amqp from "amqplib";
import Redis from "ioredis";
import Docker from "dockerode";
import { prisma } from "./lib/prisma"; 
import { initializeSubmission, compileCode, runCode, cleanupSubmission } from "./executor"; 
import { LANGUAGE_MAP } from "./languages";

const RABBITMQ_URL = "amqp://user:password@localhost:5672";
const QUEUE_NAME = "submission_queue";
const redis = new Redis("redis://localhost:6379");
const docker = new Docker({ socketPath: process.platform === "win32" ? "//./pipe/docker_engine" : "/var/run/docker.sock" });

// --- 1. AUTO-PULL IMAGES ON STARTUP ---
async function initDockerImages() {
    console.log("🐳 Checking Docker Images...");
    const images = new Set(Object.values(LANGUAGE_MAP).map(c => c.image));
    
    for (const image of images) {
        try {
            const imageInfos = await docker.listImages({ filters: { reference: [image] } });
            if (imageInfos.length === 0) {
                console.log(`⬇️ Pulling ${image}... (This may take a while)`);
                await new Promise((resolve, reject) => {
                    docker.pull(image, (err: any, stream: any) => {
                        if (err) return reject(err);
                        docker.modem.followProgress(stream, onFinished, onProgress);
                        function onFinished(err: any) { if (err) reject(err); else resolve(true); }
                        function onProgress(event: any) { /* Optional: Log progress */ }
                    });
                });
                console.log(`✅ Pulled ${image}`);
            }
        } catch (error) {
            console.error(`❌ Failed to pull ${image}:`, error);
        }
    }
}

async function startWorker() {
    // await initDockerImages(); // Uncomment if you want auto-pull

    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME, { durable: true });
        channel.prefetch(1);

        console.log("⚡ Worker Online...");

        channel.consume(QUEUE_NAME, async (msg) => {
            if (msg === null) return;
            const submission = JSON.parse(msg.content.toString());
            const submissionId = submission.submissionId;
            let buildId: string | null = null;

            try {
                console.log(`\nProcessing: ${submissionId}`);
                const problem = await prisma.problem.findUnique({
                    where: { id: submission.problemId },
                    include: { testCases: true } 
                });

                if (!problem) { channel.ack(msg); return; }

                // 1. Initialize
                buildId = await initializeSubmission(submission.code, submission.language);
                if (!buildId) {
                    await redis.set(`submission:${submissionId}`, JSON.stringify({ status: "ERROR", error: "Language not supported" }), 'EX', 3600);
                    channel.ack(msg); return;
                }

                // 2. Compile
                const compileResult = await compileCode(buildId, submission.language);
                if (!compileResult.success) {
                    await prisma.submission.create({
                        data: {
                            id: submissionId,
                            problemId: submission.problemId,
                            userId: submission.userId, // Ensure this exists from queue
                            code: submission.code,
                            language: submission.language,
                            status: "COMPILATION_ERROR"
                        }
                    });
                    await redis.set(`submission:${submissionId}`, JSON.stringify({ status: "COMPILATION_ERROR", error: compileResult.error }), 'EX', 3600);
                    cleanupSubmission(buildId);
                    channel.ack(msg); return;
                }

                // 3. Run Test Cases
                let finalStatus = "ACCEPTED";
                let failedCaseDetails = null;
                
                // --- FIX: Track Metrics Outside Loop ---
                let maxTime = 0;
                let maxMemory = 0;

                for (const testCase of problem.testCases) {
                    const result = await runCode(buildId, submission.language, testCase.input);
                    
                    // Update Metrics
                    maxTime = Math.max(maxTime, result.executionTime || 0);
                    maxMemory = Math.max(maxMemory, result.memoryUsed || 0);

                    if (result.status === "TIMEOUT") {
                        finalStatus = "TIME_LIMIT_EXCEEDED";
                        failedCaseDetails = { input: testCase.input, expected: testCase.expectedOutput, actual: "Timeout" };
                        break;
                    }
                    if (result.status === "ERROR") {
                        finalStatus = "RUNTIME_ERROR";
                        failedCaseDetails = { input: testCase.input, expected: testCase.expectedOutput, actual: result.output };
                        break;
                    }
                    if (result.output.trim() !== testCase.expectedOutput.trim()) {
                        finalStatus = "WRONG_ANSWER";
                        failedCaseDetails = { input: testCase.input, expected: testCase.expectedOutput, actual: result.output };
                        break;
                    }
                }

                console.log(`🏁 Verdict: ${finalStatus}`);

                // 4. Save to DB (Now we have access to maxTime and maxMemory)
                await prisma.submission.create({
                    data: {
                        id: submissionId,
                        problemId: submission.problemId,
                        userId: submission.userId,
                        code: submission.code,
                        language: submission.language,
                        status: finalStatus,
                        time: `${maxTime.toFixed(2)}ms`,       // Save Time
                        memory: `${(maxMemory / 1024 / 1024).toFixed(2)}MB` // Save Memory
                    }
                });

                // Update Redis
                await redis.set(`submission:${submissionId}`, JSON.stringify({ 
                    status: finalStatus, 
                    details: failedCaseDetails,
                    metrics: { 
                        time: `${maxTime.toFixed(2)}ms`, 
                        memory: `${(maxMemory / 1024 / 1024).toFixed(2)}MB` 
                    }
                }), 'EX', 3600);

            } catch (error) {
                console.error("Worker Error:", error);
                await redis.set(`submission:${submissionId}`, JSON.stringify({ status: "SYSTEM_ERROR" }), 'EX', 3600);
            } finally {
                if (buildId) cleanupSubmission(buildId);
                channel.ack(msg);
            }
        });
    } catch (error) { console.error("Startup Error:", error); }
}

startWorker();
// // // // import express from "express";
// // // // import amqp from "amqplib";

// // // // const app = express();
// // // // app.use(express.json());

// // // // const PORT = 3000;
// // // // const RABBITMQ_URL = "amqp://user:password@localhost:5672";
// // // // const QUEUE_NAME = "submission_queue";

// // // // let channel: amqp.Channel;

// // // // // 1. Connect to RabbitMQ on startup
// // // // async function connectQueue() {
// // // //     try {
// // // //         const connection = await amqp.connect(RABBITMQ_URL);
// // // //         channel = await connection.createChannel();
// // // //         // durable: true means queue survives if RabbitMQ restarts
// // // //         await channel.assertQueue(QUEUE_NAME, { durable: true }); 
// // // //         console.log("✅ Connected to RabbitMQ");
// // // //     } catch (error) {
// // // //         console.error("❌ RabbitMQ Connection Error:", error);
// // // //     }
// // // // }

// // // // connectQueue();

// // // // // 2. The Endpoint
// // // // app.post("/submit", async (req, res) => {
// // // //     const { problemId, code, language } = req.body;

// // // //     if (!code || !language) {
// // // //          return res.status(400).send("Code and language are required");
// // // //     }

// // // //     const submission = {
// // // //         problemId,
// // // //         code,
// // // //         language,
// // // //         submissionId: Math.random().toString(36).substring(7) // Mock ID
// // // //     };

// // // //     // 3. Send to Queue
// // // //     try {
// // // //         // RabbitMQ expects a Buffer
// // // //         channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(submission)));
// // // //         console.log(`📤 Sent submission ${submission.submissionId} to queue`);
// // // //         res.json({ message: "Submission queued", submissionId: submission.submissionId });
// // // //     } catch (error) {
// // // //         res.status(500).send("Failed to queue submission");
// // // //     }
// // // // });

// // // // app.listen(PORT, () => {
// // // //     console.log(`🚀 API Server running on port ${PORT}`);
// // // // });

// // // import express from "express";
// // // import amqp from "amqplib";
// // // import Redis from "ioredis";
// // // import { v4 as uuidv4 } from "uuid"; // Professional ID generation


// // // const app = express();
// // // app.use(express.json());

// // // const PORT = 3000;
// // // const RABBITMQ_URL = "amqp://user:password@localhost:5672";
// // // const QUEUE_NAME = "submission_queue";

// // // const redis = new Redis("redis://localhost:6379");
// // // let channel: amqp.Channel;

// // // async function connectQueue() {
// // //     try {
// // //         const connection = await amqp.connect(RABBITMQ_URL);
// // //         channel = await connection.createChannel();
// // //         await channel.assertQueue(QUEUE_NAME, { durable: true }); 
// // //         console.log("✅ Connected to RabbitMQ");
// // //     } catch (error) {
// // //         console.error("❌ RabbitMQ Connection Error:", error);
// // //     }
// // // }

// // // connectQueue();

// // // // 1. Submit Endpoint
// // // app.post("/submit", async (req, res) => {
// // //     const { problemId, code, language } = req.body;

// // //     if (!code || !language) {
// // //          return res.status(400).send("Code and language are required");
// // //     }

// // //     // Generate a unique ID for this submission
// // //     const submissionId = uuidv4();

// // //     const submission = {
// // //         submissionId, // Pass this ID to the worker
// // //         problemId,
// // //         code,
// // //         language,
// // //     };

// // //     try {
// // //         // Set Initial Status in Redis
// // //         // This ensures if the user checks status immediately, they see "PENDING"
// // //         await redis.set(`submission:${submissionId}`, "PENDING", 'EX', 3600);

// // //         channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(submission)));
        
// // //         console.log(`📤 Sent submission ${submissionId}`);
// // //         res.json({ message: "Submission queued", submissionId });
// // //     } catch (error) {
// // //         res.status(500).send("Failed to queue submission");
// // //     }
// // // });

// // // // 2. Status Check Endpoint (Polling)
// // // app.get("/status/:id", async (req, res) => {
// // //     const submissionId = req.params.id;
// // //     const data = await redis.get(`submission:${submissionId}`);

// // //     if (data) {
// // //         // Try parsing because worker saves it as JSON now
// // //         try {
// // //             const parsed = JSON.parse(data);
// // //             res.json(parsed);
// // //         } catch (e) {
// // //             // Fallback for old simple strings
// // //             res.json({ status: data });
// // //         }
// // //     } else {
// // //         res.status(404).json({ error: "Submission not found" });
// // //     }
// // // });

// // // app.listen(PORT, () => {
// // //     console.log(`🚀 API Server running on port ${PORT}`);
// // // });


// // import express from "express";
// // import amqp from "amqplib";
// // import Redis from "ioredis";
// // import cors from "cors"; // Allow Frontend
// // import { v4 as uuidv4 } from "uuid";
// // import { PrismaClient } from "@prisma/client";

// // const app = express();
// // const PORT = 3000;

// // // Enable CORS so localhost:3001 (Frontend) can hit localhost:3000 (Backend)
// // app.use(cors());
// // app.use(express.json());

// // // Initialize Infrastructure
// // const prisma = new PrismaClient();
// // const redis = new Redis("redis://localhost:6379");

// // const RABBITMQ_URL = "amqp://user:password@localhost:5672";
// // const QUEUE_NAME = "submission_queue";
// // let channel: amqp.Channel;

// // // Connect to RabbitMQ
// // async function connectQueue() {
// //     try {
// //         const connection = await amqp.connect(RABBITMQ_URL);
// //         channel = await connection.createChannel();
// //         await channel.assertQueue(QUEUE_NAME, { durable: true }); 
// //         console.log("✅ Connected to RabbitMQ");
// //     } catch (error) {
// //         console.error("❌ RabbitMQ Connection Error:", error);
// //     }
// // }
// // connectQueue();

// // // --- ENDPOINTS ---

// // /**
// //  * 1. GET PROBLEM
// //  * Fetches problem details, default code, and discussions from DB.
// //  */
// // app.get("/problems/:id", async (req, res) => {
// //     try {
// //         const id = parseInt(req.params.id);
        
// //         const problem = await prisma.problem.findUnique({
// //             where: { id },
// //             include: { 
// //                 discussions: {
// //                     orderBy: { createdAt: 'desc' } // Newest comments first
// //                 } 
// //             }
// //         });

// //         if (!problem) {
// //             return res.status(404).json({ error: "Problem not found" });
// //         }

// //         res.json(problem);
// //     } catch (error) {
// //         console.error("Database Error:", error);
// //         res.status(500).json({ error: "Internal Server Error" });
// //     }
// // });

// // /**
// //  * 2. SUBMIT CODE
// //  * Pushes the code to RabbitMQ for processing.
// //  */
// // app.post("/submit", async (req, res) => {
// //     const { problemId, code, language } = req.body;

// //     if (!code || !language || !problemId) {
// //          return res.status(400).send("Missing required fields");
// //     }

// //     const submissionId = uuidv4();

// //     const submission = {
// //         submissionId,
// //         problemId,
// //         code,
// //         language,
// //     };

// //     try {
// //         // Set Initial Status in Redis
// //         await redis.set(`submission:${submissionId}`, JSON.stringify({ status: "PENDING" }), 'EX', 3600);

// //         // Push to Queue
// //         channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(submission)));
        
// //         console.log(`📤 Queued: ${submissionId}`);
// //         res.json({ message: "Submission queued", submissionId });
// //     } catch (error) {
// //         res.status(500).send("Failed to queue submission");
// //     }
// // });

// // /**
// //  * 3. STATUS CHECK (Polling)
// //  * Frontend calls this every 1s to check results.
// //  */
// // app.get("/status/:id", async (req, res) => {
// //     const submissionId = req.params.id;
// //     const data = await redis.get(`submission:${submissionId}`);

// //     if (data) {
// //         // Redis stores data as a stringified JSON object now
// //         try {
// //             const parsed = JSON.parse(data);
// //             res.json(parsed);
// //         } catch (e) {
// //             res.json({ status: data }); // Fallback
// //         }
// //     } else {
// //         res.status(404).json({ error: "Submission not found or expired" });
// //     }
// // });

// // app.listen(PORT, () => {
// //     console.log(`🚀 API Gateway running on http://localhost:${PORT}`);
// // });

// import express from "express";
// import cors from "cors";
// import amqp from "amqplib";
// import Redis from "ioredis";
// import { v4 as uuidv4 } from "uuid";
// import { prisma } from "../worker-service/lib/prisma"; // <--- IMPORTING SINGLETON

// const app = express();
// const PORT = 3000;

// app.use(cors()); // Allow Frontend access
// app.use(express.json());

// const redis = new Redis("redis://localhost:6379");
// const RABBITMQ_URL = "amqp://user:password@localhost:5672";
// const QUEUE_NAME = "submission_queue";

// let channel: amqp.Channel;

// // --- RabbitMQ Connection ---
// async function connectQueue() {
//     try {
//         const connection = await amqp.connect(RABBITMQ_URL);
//         channel = await connection.createChannel();
//         await channel.assertQueue(QUEUE_NAME, { durable: true });
//         console.log("✅ API Connected to RabbitMQ");
//     } catch (error) {
//         console.error("❌ RabbitMQ Error:", error);
//     }
// }
// connectQueue();

// // --- ENDPOINTS ---

// /**
//  * 1. GET PROBLEM
//  * Fetches problem details dynamically
//  */
// // app.get("/problems/:id", async (req, res) => {
// //     try {
// //         const id = parseInt(req.params.id);
// //         const problem = await prisma.problem.findUnique({
// //             where: { id },
// //             include: { 
// //                 discussions: true 
// //             }
// //         });

// //         if (!problem) return res.status(404).json({ error: "Problem not found" });
// //         res.json(problem);
// //     } catch (error) {
// //         res.status(500).json({ error: "Internal Server Error" });
// //     }
// // });

// app.get("/test-db", async (req, res) => {
//     try {
//         const count = await prisma.problem.count();
//         res.json({ message: "DB Connection Successful", problemCount: count });
//     } catch (error: any) {
//         console.error("❌ DB Connection Failed:", error);
//         res.status(500).json({ error: error.message });
//     }
// });

// app.get("/problems/:id", async (req, res) => {
//     try {
//         const id = parseInt(req.params.id);
//         console.log(`🔍 Fetching Problem ID: ${id}`);

//         const problem = await prisma.problem.findUnique({
//             where: { id },
//             include: { discussions: true }
//         });

//         if (!problem) {
//             console.log("❌ Problem not found in DB");
//             return res.status(404).json({ error: "Problem not found" });
//         }

//         console.log("✅ Problem found:", problem.title);
//         res.json(problem);
//     } catch (error: any) {
//         console.error("❌ CRITICAL DATABASE ERROR:", error);
//         res.status(500).json({ error: error.message });
//     }
// });

// /**
//  * 2. SUBMIT CODE
//  */
// app.post("/submit", async (req, res) => {
//     const { problemId, code, language } = req.body;
//     const submissionId = uuidv4();

//     try {
//         await redis.set(`submission:${submissionId}`, JSON.stringify({ status: "PENDING" }), 'EX', 3600);
        
//         channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify({
//             submissionId,
//             problemId,
//             code,
//             language
//         })));
        
//         res.json({ message: "Submission queued", submissionId });
//     } catch (error) {
//         res.status(500).json({ error: "Failed to queue submission" });
//     }
// });

// /**
//  * 3. CHECK STATUS
//  */
// app.get("/status/:id", async (req, res) => {
//     const data = await redis.get(`submission:${req.params.id}`);
//     if (!data) return res.status(404).json({ error: "Not found" });
//     res.json(JSON.parse(data));
// });

// // Start Server
// app.listen(PORT, () => {
//     console.log(`🚀 API Server running on http://localhost:${PORT}`);
// });



import express from "express";
import cors from "cors";
import amqp from "amqplib";
import Redis from "ioredis";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "./lib/prisma";

const app = express();
const PORT = 3000;
const JWT_SECRET = "super_secret_key_change_this_in_prod";

app.use(cors({ origin: "http://localhost:3001" }));
app.use(express.json());

const redis = new Redis("redis://localhost:6379");
const RABBITMQ_URL = "amqp://user:password@localhost:5672";
const QUEUE_NAME = "submission_queue";
let channel: amqp.Channel;

// --- AUTH MIDDLEWARE ---
const authenticate = (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, "super_secret_key_change_this_in_prod");
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ error: "Invalid Token" });
    }
};

// --- RABBITMQ ---
async function connectQueue() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME, { durable: true });
        console.log("✅ API Connected to RabbitMQ");
    } catch (error) { console.error("❌ RabbitMQ Error:", error); }
}
connectQueue();

// --- AUTH ENDPOINTS ---

app.post("/auth/signup", async (req, res) => {
    const { email, password, username } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { email, password: hashedPassword, username }
        });
        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET);
        res.json({ token, username: user.username, role: user.role });
    } catch (e) { res.status(400).json({ error: "User already exists" }); }
});

app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET);
    res.json({ token, username: user.username, role: user.role });
});

// --- ADMIN CRM ENDPOINT (Add Problem) ---
app.post("/admin/problem", authenticate, async (req: any, res) => {
    if (req.user.role !== "admin") return res.status(403).json({ error: "Admins only" });
    
    const { title, description, slug, difficulty, defaultCode, testCases } = req.body;
    
    try {
        const problem = await prisma.problem.create({
            data: {
                title, description, slug, difficulty, defaultCode,
                testCases: { create: testCases }
            }
        });
        res.json(problem);
    } catch (e) { res.status(500).json({ error: "Failed to create problem" }); }
});

// --- PUBLIC API ---

// List all problems (For the landing page)
app.get("/problems", async (req, res) => {
    const problems = await prisma.problem.findMany({
        select: { id: true, title: true, difficulty: true, slug: true }
    });
    res.json(problems);
});

// Get Single Problem with Likes/Discussions/Submissions
app.get("/problems/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const problem = await prisma.problem.findUnique({
        where: { id },
        include: { 
            discussions: { include: { user: { select: { username: true } } } },
            likes: true
        }
    });
    if (!problem) return res.status(404).json({ error: "Not found" });
    
    // Calculate likes/dislikes count manually
    const likes = problem.likes.filter(l => l.liked).length;
    const dislikes = problem.likes.filter(l => !l.liked).length;

    res.json({ ...problem, likes, dislikes });
});

app.post("/problems/:id/like", authenticate, async (req: any, res) => {
    const problemId = parseInt(req.params.id);
    const userId = req.user.userId;
    const { liked } = req.body; // true = like, false = dislike

    try {
        // Upsert: Create if not exists, Update if exists
        await prisma.like.upsert({
            where: { userId_problemId: { userId, problemId } },
            update: { liked },
            create: { userId, problemId, liked }
        });
        res.json({ success: true });
    } catch (e) {
        res.status(500).json({ error: "Failed to like" });
    }
});

app.post("/problems/:id/discuss", authenticate, async (req: any, res) => {
    const problemId = parseInt(req.params.id);
    const userId = req.user.userId;
    const { text } = req.body;

    try {
        const comment = await prisma.discussion.create({
            data: { text, userId, problemId }
        });
        res.json(comment);
    } catch (e) {
        res.status(500).json({ error: "Failed to post comment" });
    }
});

app.post("/admin/problem", authenticate, async (req: any, res) => {
    // Check role (Ensure your DB user has role="admin")
    if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
    }

    const { title, slug, description, difficulty, defaultCode, testCases } = req.body;

    try {
        const problem = await prisma.problem.create({
            data: {
                title, slug, description, difficulty,
                defaultCode, // JSON object
                testCases: {
                    create: testCases // Array of {input, expectedOutput}
                }
            }
        });
        res.json(problem);
    } catch (e: any) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
});

// Submit Code (Now Authenticatted)
app.post("/submit", authenticate, async (req: any, res) => {
    try {
        const { problemId, code, language } = req.body;
        const submissionId = uuidv4();
        const userId = req.user.userId; // <--- Extract User ID from Token

        if (!userId) {
            return res.status(400).json({ error: "User ID missing" });
        }

        await redis.set(`submission:${submissionId}`, JSON.stringify({ status: "PENDING" }), 'EX', 3600);
        
        if (!channel) await connectQueue();

        // Pass userId to the Worker via RabbitMQ
        channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify({
            submissionId,
            problemId,
            code,
            language,
            userId // <--- PASS IT HERE
        })));
        
        res.json({ message: "Submission queued", submissionId });
    } catch (error) {
        console.error("Submit Error:", error);
        res.status(500).json({ error: "Failed to queue" });
    }
});

// Get User Submissions for a Problem
app.get("/submissions/:problemId", authenticate, async (req: any, res) => {
    const problemId = parseInt(req.params.problemId);
    const userId = req.user.userId;
    
    const submissions = await prisma.submission.findMany({
        where: { problemId, userId },
        orderBy: { createdAt: "desc" },
        take: 10
    });
    res.json(submissions);
});

/**
 * 3. CHECK STATUS
 */
app.get("/status/:id", async (req, res) => {
    const data = await redis.get(`submission:${req.params.id}`);
    if (!data) return res.status(404).json({ error: "Not found" });
    res.json(JSON.parse(data));
});

app.listen(PORT, () => console.log(`🚀 API running on ${PORT}`));
// // // // // // import { PrismaClient } from "./generated/prisma"; // Adjust path if needed

// // // // // // const prisma = new PrismaClient();

// // // // // // async function main() {
// // // // // //   // Create a problem where the user must add two numbers provided via Stdin
// // // // // //   const problem = await prisma.problem.create({
// // // // // //     data: {
// // // // // //       title: "Add Two Numbers",
// // // // // //       slug: "add-two-numbers",
// // // // // //       description: "Read two numbers from input and print their sum.",
// // // // // //       testCases: {
// // // // // //         create: [
// // // // // //             // Test Case 1: 1 + 2 = 3
// // // // // //             { input: "1\n2", expectedOutput: "3" }, 
// // // // // //             // Test Case 2: 10 + 20 = 30
// // // // // //             { input: "10\n20", expectedOutput: "30" } 
// // // // // //         ]
// // // // // //       }
// // // // // //     }
// // // // // //   });

// // // // // //   console.log("🌱 Seeded Problem:", problem);
// // // // // // }

// // // // // // main()
// // // // // //   .catch((e) => console.error(e))
// // // // // //   .finally(async () => await prisma.$disconnect());

// // // // // // UPDATE: Import the shared instance
// // // // // import { prisma } from "./lib/prisma.ts";

// // // // // async function main() {
// // // // //   // Create a problem where the user must add two numbers provided via Stdin
// // // // //   const problem = await prisma.problem.create({
// // // // //     data: {
// // // // //       title: "Add Two Numbers",
// // // // //       slug: "add-two-numbers",
// // // // //       description: "Read two numbers from input and print their sum.",
// // // // //       testCases: {
// // // // //         create: [
// // // // //             // Test Case 1: 1 + 2 = 3
// // // // //             { input: "1\n2", expectedOutput: "3" }, 
// // // // //             // Test Case 2: 10 + 20 = 30
// // // // //             { input: "10\n20", expectedOutput: "30" } 
// // // // //         ]
// // // // //       }
// // // // //     }
// // // // //   });

// // // // //   console.log("🌱 Seeded Problem:", problem);
// // // // // }

// // // // // main()
// // // // //   .catch((e) => {
// // // // //       console.error(e);
// // // // //       process.exit(1);
// // // // //   })
// // // // //   .finally(async () => {
// // // // //       // We explicitly close the connection when the script finishes
// // // // //       await prisma.$disconnect();
// // // // //   });


// // // // import { prisma } from "./lib/prisma"; // We usually drop .ts in imports

// // // // async function main() {
// // // //   console.log("🌱 Starting Seeding...");

// // // //   // 1. Clean up old data to prevent conflicts 
// // // //   // (Order matters: Delete children first)
// // // //   await prisma.submission.deleteMany();
// // // //   await prisma.discussion.deleteMany();
// // // //   await prisma.testCase.deleteMany();
// // // //   await prisma.problem.deleteMany();

// // // //   // 2. Create the "Add Two Numbers" problem
// // // //   const problem = await prisma.problem.create({
// // // //     data: {
// // // //       title: "1. Add Two Numbers",
// // // //       slug: "add-two-numbers",
// // // //       difficulty: "Easy",
// // // //       description: "Given two integers input as separate lines, return their sum.\n\n**Example:**\n```\nInput:\n1\n2\nOutput:\n3\n```",
      
// // // //       // Store boilerplate for all languages here
// // // //       defaultCode: {
// // // //         python: "import sys\n\n# Read input from stdin\nline1 = sys.stdin.readline()\nline2 = sys.stdin.readline()\n\nif line1 and line2:\n    print(int(line1) + int(line2))",
// // // //         cpp: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    if (cin >> a >> b) {\n        cout << a + b;\n    }\n    return 0;\n}",
// // // //         java: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int a = sc.nextInt();\n            int b = sc.nextInt();\n            System.out.print(a + b);\n        }\n    }\n}",
// // // //         javascript: "const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n\nif (input.length >= 2) {\n    const a = parseInt(input[0]);\n    const b = parseInt(input[1]);\n    console.log(a + b);\n}",
// // // //         go: "package main\nimport \"fmt\"\n\nfunc main() {\n    var a, b int\n    fmt.Scan(&a, &b)\n    fmt.Println(a + b)\n}"
// // // //       },
      
// // // //       // Add Test Cases
// // // //       testCases: {
// // // //         create: [
// // // //             { input: "1\n2", expectedOutput: "3" },
// // // //             { input: "10\n20", expectedOutput: "30" },
// // // //             { input: "-5\n5", expectedOutput: "0" }
// // // //         ]
// // // //       },

// // // //       // Add Mock Discussions
// // // //       discussions: {
// // // //         create: [
// // // //             { userId: "dev_king", text: "Be careful with integer overflow in C++ if inputs are large!" },
// // // //             { userId: "python_fan", text: "Python handles large integers automatically, easiest language for this." }
// // // //         ]
// // // //       }
// // // //     }
// // // //   });

// // // //   console.log("✅ Seeded Problem:", problem.title);
// // // // }

// // // // main()
// // // //   .catch((e) => {
// // // //       console.error(e);
// // // //       process.exit(1);
// // // //   })
// // // //   .finally(async () => {
// // // //       await prisma.$disconnect();
// // // //   });


// // // // Ensure you have a 'lib/prisma.ts' in worker-service too, or adjust path
// // // import { prisma } from "./lib/prisma"; 

// // // async function main() {
// // //   console.log("🌱 Seeding Database...");

// // //   // 1. Cleanup
// // //   await prisma.submission.deleteMany();
// // //   await prisma.discussion.deleteMany();
// // //   await prisma.testCase.deleteMany();
// // //   await prisma.problem.deleteMany();

// // //   // 2. Create Problem
// // //   const problem = await prisma.problem.create({
// // //     data: {
// // //       title: "1. Add Two Numbers",
// // //       slug: "add-two-numbers",
// // //       difficulty: "Easy",
// // //       description: "Given two integers input as separate lines, return their sum.\n\n**Example:**\n```\nInput:\n1\n2\nOutput:\n3\n```",
      
// // //       defaultCode: {
// // //         python: "import sys\n\n# Read input from stdin\nline1 = sys.stdin.readline()\nline2 = sys.stdin.readline()\n\nif line1 and line2:\n    print(int(line1) + int(line2))",
// // //         cpp: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    if (cin >> a >> b) {\n        cout << a + b;\n    }\n    return 0;\n}",
// // //         java: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int a = sc.nextInt();\n            int b = sc.nextInt();\n            System.out.print(a + b);\n        }\n    }\n}",
// // //         javascript: "const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n\nif (input.length >= 2) {\n    const a = parseInt(input[0]);\n    const b = parseInt(input[1]);\n    console.log(a + b);\n}",
// // //         go: "package main\nimport \"fmt\"\n\nfunc main() {\n    var a, b int\n    fmt.Scan(&a, &b)\n    fmt.Println(a + b)\n}"
// // //       },
      
// // //       testCases: {
// // //         create: [
// // //             { input: "1\n2", expectedOutput: "3" },
// // //             { input: "10\n20", expectedOutput: "30" },
// // //             { input: "-5\n5", expectedOutput: "0" }
// // //         ]
// // //       },

// // //       discussions: {
// // //         create: [
// // //             { userId: "dev_king", text: "Be careful with integer overflow in C++!" },
// // //             { userId: "python_fan", text: "Python handles large integers automatically." }
// // //         ]
// // //       }
// // //     }
// // //   });

// // //   console.log("✅ Seeded Problem:", problem.title);
// // // }

// // // main()
// // //   .then(async () => {
// // //     await prisma.$disconnect();
// // //   })
// // //   .catch(async (e) => {
// // //     console.error(e);
// // //     await prisma.$disconnect();
// // //     process.exit(1);
// // //   });


// // import { prisma } from "./lib/prisma";
// // import bcrypt from "bcryptjs";

// // async function main() {
// //   console.log("🌱 Starting Database Seed...");

// //   // 1. Cleanup (Order is crucial to avoid Foreign Key constraints)
// //   // Delete children first, then parents
// //   await prisma.like.deleteMany();
// //   await prisma.discussion.deleteMany();
// //   await prisma.submission.deleteMany();
// //   await prisma.testCase.deleteMany();
// //   await prisma.problem.deleteMany();
// //   await prisma.user.deleteMany();

// //   console.log("🧹 Database cleared.");

// //   // 2. Create Users (We need these IDs for discussions)
// //   const salt = await bcrypt.genSalt(10);
// //   const hashedPassword = await bcrypt.hash("password123", salt);

// //   const admin = await prisma.user.create({
// //     data: {
// //       username: "admin_user",
// //       email: "admin@algoverse.com",
// //       password: hashedPassword,
// //       role: "admin"
// //     }
// //   });

// //   const user1 = await prisma.user.create({
// //     data: {
// //       username: "algo_master",
// //       email: "user1@test.com",
// //       password: hashedPassword,
// //       role: "user"
// //     }
// //   });

// //   const user2 = await prisma.user.create({
// //     data: {
// //       username: "python_fan",
// //       email: "user2@test.com",
// //       password: hashedPassword,
// //       role: "user"
// //     }
// //   });

// //   console.log("👤 Users created.");

// //   // 3. Create Problem
// //   const problem = await prisma.problem.create({
// //     data: {
// //       title: "1. Add Two Numbers",
// //       slug: "add-two-numbers",
// //       difficulty: "Easy",
// //       description: "Given two integers input as separate lines, return their sum.\n\n**Example:**\n```\nInput:\n1\n2\nOutput:\n3\n```",
      
// //       defaultCode: {
// //         python: "import sys\n\n# Read input from stdin\nline1 = sys.stdin.readline()\nline2 = sys.stdin.readline()\n\nif line1 and line2:\n    print(int(line1) + int(line2))",
// //         cpp: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    if (cin >> a >> b) {\n        cout << a + b;\n    }\n    return 0;\n}",
// //         java: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int a = sc.nextInt();\n            int b = sc.nextInt();\n            System.out.print(a + b);\n        }\n    }\n}",
// //         javascript: "const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n\nif (input.length >= 2) {\n    const a = parseInt(input[0]);\n    const b = parseInt(input[1]);\n    console.log(a + b);\n}",
// //         go: "package main\nimport \"fmt\"\n\nfunc main() {\n    var a, b int\n    fmt.Scan(&a, &b)\n    fmt.Println(a + b)\n}"
// //       },
      
// //       testCases: {
// //         create: [
// //             { input: "1\n2", expectedOutput: "3" },
// //             { input: "10\n20", expectedOutput: "30" },
// //             { input: "-5\n5", expectedOutput: "0" }
// //         ]
// //       },

// //       // Create Discussions linked to the users we just created
// //       discussions: {
// //         create: [
// //             { 
// //               text: "Be careful with integer overflow in C++! Use long long.", 
// //               userId: user1.id 
// //             },
// //             { 
// //               text: "This is super easy in Python.", 
// //               userId: user2.id 
// //             }
// //         ]
// //       },

// //       // Add a mock Like
// //       likes: {
// //         create: [
// //             { userId: user1.id, liked: true }
// //         ]
// //       }
// //     }
// //   });

// //   console.log("✅ Seeded Problem:", problem.title);
// //   console.log("✨ Seeding Complete!");
// // }

// // main()
// //   .then(async () => {
// //     await prisma.$disconnect();
// //   })
// //   .catch(async (e) => {
// //     console.error(e);
// //     await prisma.$disconnect();
// //     process.exit(1);
// //   });


// import { prisma } from "./lib/prisma";
// import bcrypt from "bcryptjs";

// async function main() {
//   console.log("🌱 Starting Database Seed...");

//   // 1. Cleanup existing data
//   await prisma.like.deleteMany();
//   await prisma.discussion.deleteMany();
//   await prisma.submission.deleteMany();
//   await prisma.testCase.deleteMany();
//   await prisma.problem.deleteMany();
//   await prisma.user.deleteMany();

//   console.log("🧹 Database cleared.");

//   // 2. Create Users
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash("password123", salt);

//   const user1 = await prisma.user.create({
//     data: {
//       username: "algo_master",
//       email: "user1@test.com",
//       password: hashedPassword,
//       role: "user"
//     }
//   });

//   const user2 = await prisma.user.create({
//     data: {
//       username: "python_fan",
//       email: "user2@test.com",
//       password: hashedPassword,
//       role: "user"
//     }
//   });

//   console.log("👤 Users created.");

//   // 3. Create Problem with Explicit ID = 1
//   const problem = await prisma.problem.create({
//     data: {
//       id: 1, // <--- FORCE ID TO 1
//       title: "1. Add Two Numbers",
//       slug: "add-two-numbers",
//       difficulty: "Easy",
//       description: "Given two integers input as separate lines, return their sum.\n\n**Example:**\n```\nInput:\n1\n2\nOutput:\n3\n```",
      
//       defaultCode: {
//         python: "import sys\n\n# Read input from stdin\nline1 = sys.stdin.readline()\nline2 = sys.stdin.readline()\n\nif line1 and line2:\n    print(int(line1) + int(line2))",
//         cpp: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    if (cin >> a >> b) {\n        cout << a + b;\n    }\n    return 0;\n}",
//         java: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int a = sc.nextInt();\n            int b = sc.nextInt();\n            System.out.print(a + b);\n        }\n    }\n}",
//         javascript: "const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n\nif (input.length >= 2) {\n    const a = parseInt(input[0]);\n    const b = parseInt(input[1]);\n    console.log(a + b);\n}",
//         go: "package main\nimport \"fmt\"\n\nfunc main() {\n    var a, b int\n    fmt.Scan(&a, &b)\n    fmt.Println(a + b)\n}"
//       },
      
//       testCases: {
//         create: [
//             { input: "1\n2", expectedOutput: "3" },
//             { input: "10\n20", expectedOutput: "30" },
//             { input: "-5\n5", expectedOutput: "0" }
//         ]
//       },

//       discussions: {
//         create: [
//             { text: "Be careful with integer overflow in C++!", userId: user1.id },
//             { text: "Python is so easy for this.", userId: user2.id }
//         ]
//       },

//       likes: {
//         create: [
//             { userId: user1.id, liked: true }
//         ]
//       }
//     }
//   });

//   console.log("✅ Seeded Problem:", problem.title);
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });


import { prisma } from "./lib/prisma.ts";
import bcrypt from "bcryptjs";

// Helper to generate a random ID to ensure uniqueness if needed, 
// though we use autoincrement for most.
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@algoverse.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

async function main() {
  console.log("🌱 Starting Database Seed...");
  console.log("⚠️  This will clear all existing data!");

  // 1. Cleanup existing data (Order matters for Foreign Keys)
  await prisma.like.deleteMany();
  await prisma.discussion.deleteMany();
  await prisma.submission.deleteMany();
  await prisma.testCase.deleteMany();
  await prisma.problem.deleteMany();
  await prisma.user.deleteMany();

  console.log("🧹 Database cleared.");

  // 2. Create Users (Admin + Normal Users)
  const salt = await bcrypt.genSalt(10);
  const adminHash = await bcrypt.hash(ADMIN_PASSWORD, salt);
  const userHash = await bcrypt.hash("password123", salt);

  const admin = await prisma.user.create({
    data: {
      username: "admin",
      email: ADMIN_EMAIL,
      password: adminHash,
      role: "admin"
    }
  });

  const user1 = await prisma.user.create({
    data: {
      username: "code_warrior",
      email: "user1@test.com",
      password: userHash,
      role: "user"
    }
  });

  console.log(`👤 Admin created: ${ADMIN_EMAIL}`);

  // --- PROBLEM DATA COLLECTION ---
  // We define problems here to loop through them
  
  const problems = [
    {
      id: 1, // Explicit ID for the landing page link
      title: "Add Two Numbers",
      slug: "add-two-numbers",
      difficulty: "Easy",
      description: "Given two integers input as separate lines, return their sum.\n\n**Example:**\n```\nInput:\n1\n2\nOutput:\n3\n```",
      defaultCode: {
        python: "import sys\n\na = int(sys.stdin.readline())\nb = int(sys.stdin.readline())\nprint(a + b)",
        cpp: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << a + b;\n    return 0;\n}",
        java: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.print(a + b);\n    }\n}",
        javascript: "const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nconsole.log(parseInt(input[0]) + parseInt(input[1]));",
        go: "package main\nimport \"fmt\"\n\nfunc main() {\n    var a, b int\n    fmt.Scan(&a, &b)\n    fmt.Println(a + b)\n}"
      },
      testCases: [
        { input: "1\n2", expectedOutput: "3" },
        { input: "10\n20", expectedOutput: "30" },
        { input: "-5\n5", expectedOutput: "0" },
        { input: "100\n-50", expectedOutput: "50" },
        { input: "0\n0", expectedOutput: "0" }
      ]
    },
    {
      title: "Palindrome Number",
      slug: "palindrome-number",
      difficulty: "Easy",
      description: "Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise.\n\n**Example:**\n```\nInput: 121\nOutput: true\n```\n```\nInput: -121\nOutput: false\n```",
      defaultCode: {
        python: "import sys\n\nx = sys.stdin.readline().strip()\n# Implement logic here\nprint('true' if x == x[::-1] else 'false')",
        cpp: "#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    string s;\n    cin >> s;\n    string r = s;\n    reverse(r.begin(), r.end());\n    cout << (s == r ? \"true\" : \"false\");\n    return 0;\n}",
        java: "import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        String r = new StringBuilder(s).reverse().toString();\n        System.out.print(s.equals(r) ? \"true\" : \"false\");\n    }\n}",
        javascript: "const fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').trim();\nconst r = s.split('').reverse().join('');\nconsole.log(s === r ? 'true' : 'false');",
        go: "package main\nimport \"fmt\"\n\nfunc main() {\n    var s string\n    fmt.Scan(&s)\n    // logic\n}"
      },
      testCases: [
        { input: "121", expectedOutput: "true" },
        { input: "-121", expectedOutput: "false" },
        { input: "10", expectedOutput: "false" },
        { input: "12321", expectedOutput: "true" },
        { input: "0", expectedOutput: "true" }
      ]
    },
    {
      title: "Reverse String",
      slug: "reverse-string",
      difficulty: "Easy",
      description: "Write a function that reverses a string. The input string is given as a line of text.\n\n**Example:**\n```\nInput: hello\nOutput: olleh\n```",
      defaultCode: {
        python: "import sys\ns = sys.stdin.readline().strip()\nprint(s[::-1])",
        cpp: "#include <iostream>\n#include <algorithm>\nusing namespace std;\nint main() {\n    string s;\n    cin >> s;\n    reverse(s.begin(), s.end());\n    cout << s;\n    return 0;\n}",
        java: "import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        System.out.print(new StringBuilder(s).reverse());\n    }\n}",
        javascript: "const fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').trim();\nconsole.log(s.split('').reverse().join(''));",
        go: "package main\nimport \"fmt\"\nfunc main() {}"
      },
      testCases: [
        { input: "hello", expectedOutput: "olleh" },
        { input: "Hannah", expectedOutput: "hannaH" },
        { input: "a", expectedOutput: "a" },
        { input: "racecar", expectedOutput: "racecar" }
      ]
    },
    {
      title: "Fibonacci Number",
      slug: "fibonacci-number",
      difficulty: "Easy",
      description: "The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. Given `n`, calculate `F(n)`.\n\n**Example:**\n```\nInput: 2\nOutput: 1\n```",
      defaultCode: {
        python: "import sys\nn = int(sys.stdin.readline())\n# logic here\nif n <= 1: print(n)\nelse:\n    a, b = 0, 1\n    for _ in range(2, n + 1):\n        a, b = b, a + b\n    print(b)",
        cpp: "#include <iostream>\nusing namespace std;\nint main() {\n    int n;\n    cin >> n;\n    if(n<=1) { cout << n; return 0; }\n    int a=0, b=1, c;\n    for(int i=2; i<=n; i++) { c=a+b; a=b; b=c; }\n    cout << b;\n    return 0;\n}",
        java: "import java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); if(n<=1) System.out.print(n); else { int a=0,b=1; for(int i=2; i<=n; i++) { int c=a+b; a=b; b=c; } System.out.print(b); } } }",
        javascript: "const fs = require('fs'); const n = parseInt(fs.readFileSync(0, 'utf-8')); if(n<=1) console.log(n); else { let a=0, b=1; for(let i=2; i<=n; i++) { let c=a+b; a=b; b=c; } console.log(b); }",
        go: "package main\nimport \"fmt\"\nfunc main() {}"
      },
      testCases: [
        { input: "0", expectedOutput: "0" },
        { input: "1", expectedOutput: "1" },
        { input: "2", expectedOutput: "1" },
        { input: "3", expectedOutput: "2" },
        { input: "4", expectedOutput: "3" },
        { input: "10", expectedOutput: "55" },
        { input: "20", expectedOutput: "6765" }
      ]
    },
    {
      title: "Valid Anagram",
      slug: "valid-anagram",
      difficulty: "Easy",
      description: "Given two strings `s` and `t` input on separate lines, return `true` if `t` is an anagram of `s`, and `false` otherwise.\n\n**Example:**\n```\nInput:\nanagram\nnagaram\nOutput:\ntrue\n```",
      defaultCode: {
        python: "import sys\ns = sys.stdin.readline().strip()\nt = sys.stdin.readline().strip()\nprint('true' if sorted(s) == sorted(t) else 'false')",
        cpp: "#include <iostream>\n#include <algorithm>\nusing namespace std;\nint main() { string s, t; cin >> s >> t; sort(s.begin(), s.end()); sort(t.begin(), t.end()); cout << (s == t ? \"true\" : \"false\"); return 0; }",
        java: "import java.util.*; public class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); char[] s = sc.next().toCharArray(); char[] t = sc.next().toCharArray(); Arrays.sort(s); Arrays.sort(t); System.out.print(Arrays.equals(s, t) ? \"true\" : \"false\"); } }",
        javascript: "const fs = require('fs'); const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n'); console.log(lines[0].split('').sort().join('') === lines[1].split('').sort().join('') ? 'true' : 'false');",
        go: "package main\nimport \"fmt\"\nfunc main() {}"
      },
      testCases: [
        { input: "anagram\nnagaram", expectedOutput: "true" },
        { input: "rat\ncar", expectedOutput: "false" },
        { input: "a\na", expectedOutput: "true" },
        { input: "ab\na", expectedOutput: "false" }
      ]
    },
    {
      title: "Single Number",
      slug: "single-number",
      difficulty: "Easy",
      description: "Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one. Input is given as space-separated integers.\n\n**Example:**\n```\nInput: 2 2 1\nOutput: 1\n```",
      defaultCode: {
        python: "import sys\nnums = list(map(int, sys.stdin.read().split()))\nres = 0\nfor n in nums:\n    res ^= n\nprint(res)",
        cpp: "#include <iostream>\nusing namespace std;\nint main() { int n, res=0; while(cin >> n) res ^= n; cout << res; return 0; }",
        java: "import java.util.Scanner; public class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int res = 0; while(sc.hasNextInt()) res ^= sc.nextInt(); System.out.print(res); } }",
        javascript: "const fs = require('fs'); const nums = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).map(Number); console.log(nums.reduce((a,b) => a^b));",
        go: "package main\nimport \"fmt\"\nfunc main() {}"
      },
      testCases: [
        { input: "2 2 1", expectedOutput: "1" },
        { input: "4 1 2 1 2", expectedOutput: "4" },
        { input: "1", expectedOutput: "1" }
      ]
    },
    {
      title: "Climbing Stairs",
      slug: "climbing-stairs",
      difficulty: "Easy",
      description: "You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?\n\n**Example:**\n```\nInput: 2\nOutput: 2\n```",
      defaultCode: {
        python: "import sys\nn = int(sys.stdin.read())\nif n <= 2: print(n)\nelse:\n    a, b = 1, 2\n    for _ in range(3, n + 1):\n        a, b = b, a + b\n    print(b)",
        cpp: "#include <iostream>\nusing namespace std;\nint main() { int n; cin >> n; if(n<=2) cout<<n; else { int a=1,b=2,c; for(int i=3;i<=n;i++){c=a+b;a=b;b=c;} cout<<b; } return 0; }",
        java: "import java.util.Scanner; public class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); if(n<=2) System.out.print(n); else { int a=1,b=2; for(int i=3;i<=n;i++) { int c=a+b; a=b; b=c; } System.out.print(b); } } }",
        javascript: "const fs = require('fs'); const n = parseInt(fs.readFileSync(0, 'utf-8')); if(n<=2) console.log(n); else { let a=1, b=2; for(let i=3;i<=n;i++) { let c=a+b; a=b; b=c; } console.log(b); }",
        go: ""
      },
      testCases: [
        { input: "2", expectedOutput: "2" },
        { input: "3", expectedOutput: "3" },
        { input: "4", expectedOutput: "5" },
        { input: "5", expectedOutput: "8" }
      ]
    },
    {
      title: "Power of Two",
      slug: "power-of-two",
      difficulty: "Easy",
      description: "Given an integer `n`, return `true` if it is a power of two. Otherwise, return `false`.\n\n**Example:**\n```\nInput: 1\nOutput: true\n```",
      defaultCode: {
        python: "import sys\nn = int(sys.stdin.read())\nprint('true' if n > 0 and (n & (n - 1)) == 0 else 'false')",
        cpp: "#include <iostream>\nusing namespace std;\nint main() { int n; cin >> n; cout << (n > 0 && (n & (n - 1)) == 0 ? \"true\" : \"false\"); return 0; }",
        java: "import java.util.Scanner; public class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(); System.out.print(n > 0 && (n & (n - 1)) == 0 ? \"true\" : \"false\"); } }",
        javascript: "const fs = require('fs'); const n = parseInt(fs.readFileSync(0, 'utf-8')); console.log(n > 0 && (n & (n - 1)) === 0 ? 'true' : 'false');",
        go: ""
      },
      testCases: [
        { input: "1", expectedOutput: "true" },
        { input: "16", expectedOutput: "true" },
        { input: "3", expectedOutput: "false" },
        { input: "0", expectedOutput: "false" },
        { input: "-16", expectedOutput: "false" }
      ]
    },
    {
      title: "Missing Number",
      slug: "missing-number",
      difficulty: "Easy",
      description: "Given an array containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array. Input is space separated integers.\n\n**Example:**\n```\nInput: 3 0 1\nOutput: 2\n```",
      defaultCode: {
        python: "import sys\nnums = list(map(int, sys.stdin.read().split()))\nn = len(nums)\nprint((n * (n + 1) // 2) - sum(nums))",
        cpp: "#include <iostream>\nusing namespace std;\nint main() { int n, sum=0, count=0; while(cin >> n) { sum+=n; count++; } cout << (count*(count+1)/2) - sum; return 0; }",
        java: "import java.util.Scanner; public class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int sum=0, count=0; while(sc.hasNextInt()) { sum+=sc.nextInt(); count++; } System.out.print((count*(count+1)/2) - sum); } }",
        javascript: "const fs = require('fs'); const nums = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).map(Number); const n = nums.length; console.log((n*(n+1)/2) - nums.reduce((a,b)=>a+b, 0));",
        go: ""
      },
      testCases: [
        { input: "3 0 1", expectedOutput: "2" },
        { input: "0 1", expectedOutput: "2" },
        { input: "9 6 4 2 3 5 7 0 1", expectedOutput: "8" },
        { input: "0", expectedOutput: "1" }
      ]
    },
    {
      title: "Majority Element",
      slug: "majority-element",
      difficulty: "Medium",
      description: "Given an array of size `n`, return the majority element. The majority element is the element that appears more than `⌊n / 2⌋` times. Input is space separated.\n\n**Example:**\n```\nInput: 3 2 3\nOutput: 3\n```",
      defaultCode: {
        python: "import sys\nnums = sys.stdin.read().split()\ncand, count = None, 0\nfor n in nums:\n    if count == 0: cand = n\n    count += (1 if n == cand else -1)\nprint(cand)",
        cpp: "#include <iostream>\nusing namespace std;\nint main() { int n, cand, count=0; while(cin >> n) { if(count==0) cand=n; count += (n==cand ? 1 : -1); } cout << cand; return 0; }",
        java: "import java.util.Scanner; public class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int cand=0, count=0; while(sc.hasNextInt()) { int n = sc.nextInt(); if(count==0) cand=n; count += (n==cand ? 1 : -1); } System.out.print(cand); } }",
        javascript: "",
        go: ""
      },
      testCases: [
        { input: "3 2 3", expectedOutput: "3" },
        { input: "2 2 1 1 1 2 2", expectedOutput: "2" }
      ]
    },
    {
      title: "Length of Last Word",
      slug: "length-of-last-word",
      difficulty: "Easy",
      description: "Given a string `s` consisting of words and spaces, return the length of the last word in the string. Input is a single line.\n\n**Example:**\n```\nInput: Hello World\nOutput: 5\n```",
      defaultCode: {
        python: "import sys\nwords = sys.stdin.readline().split()\nprint(len(words[-1]) if words else 0)",
        cpp: "#include <iostream>\n#include <sstream>\nusing namespace std;\nint main() { string s, word; getline(cin, s); stringstream ss(s); while(ss >> word); cout << word.length(); return 0; }",
        java: "import java.util.Scanner; public class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String word = \"\"; while(sc.hasNext()) word = sc.next(); System.out.print(word.length()); } }",
        javascript: "const fs = require('fs'); const words = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/); console.log(words[words.length-1].length);",
        go: ""
      },
      testCases: [
        { input: "Hello World", expectedOutput: "5" },
        { input: "   fly me   to   the moon  ", expectedOutput: "4" },
        { input: "luffy is still joyboy", expectedOutput: "6" }
      ]
    },
    {
      title: "Find Pivot Index",
      slug: "find-pivot-index",
      difficulty: "Easy",
      description: "Given an array of integers, calculate the pivot index of this array. The pivot index is the index where the sum of all the numbers strictly to the left of the index is equal to the sum of all the numbers strictly to the index's right. If no such index exists, return -1. Input is space separated.\n\n**Example:**\n```\nInput: 1 7 3 6 5 6\nOutput: 3\n```",
      defaultCode: {
        python: "import sys\nnums = list(map(int, sys.stdin.read().split()))\ntotal = sum(nums)\nleft = 0\nfor i, x in enumerate(nums):\n    if left == total - left - x:\n        print(i)\n        sys.exit()\n    left += x\nprint(-1)",
        cpp: "#include <iostream>\n#include <vector>\n#include <numeric>\nusing namespace std;\nint main() { vector<int> nums; int n; while(cin >> n) nums.push_back(n); int total = 0; for(int x : nums) total += x; int left = 0; for(int i=0; i<nums.size(); ++i) { if(left == total - left - nums[i]) { cout << i; return 0; } left += nums[i]; } cout << -1; return 0; }",
        java: "",
        javascript: "",
        go: ""
      },
      testCases: [
        { input: "1 7 3 6 5 6", expectedOutput: "3" },
        { input: "1 2 3", expectedOutput: "-1" },
        { input: "2 1 -1", expectedOutput: "0" }
      ]
    },
    {
      title: "Valid Parentheses",
      slug: "valid-parentheses",
      difficulty: "Easy",
      description: "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\n**Example:**\n```\nInput: ()[]{}\nOutput: true\n```",
      defaultCode: {
        python: "import sys\ns = sys.stdin.read().strip()\nstack = []\nmap = {')':'(', '}':'{', ']':'['}\nfor c in s:\n    if c in map:\n        if stack and stack[-1] == map[c]: stack.pop()\n        else: print('false'); sys.exit()\n    else: stack.append(c)\nprint('true' if not stack else 'false')",
        cpp: "#include <iostream>\n#include <stack>\nusing namespace std;\nint main() { string s; cin >> s; stack<char> st; for(char c : s) { if(c=='(' || c=='{' || c=='[') st.push(c); else { if(st.empty()) { cout << \"false\"; return 0; } if((c==')' && st.top()!='(') || (c=='}' && st.top()!='{') || (c==']' && st.top()!='[')) { cout << \"false\"; return 0; } st.pop(); } } cout << (st.empty() ? \"true\" : \"false\"); return 0; }",
        java: "",
        javascript: "",
        go: ""
      },
      testCases: [
        { input: "()", expectedOutput: "true" },
        { input: "()[]{}", expectedOutput: "true" },
        { input: "(]", expectedOutput: "false" },
        { input: "([)]", expectedOutput: "false" },
        { input: "{[]}", expectedOutput: "true" }
      ]
    },
    {
      title: "Contains Duplicate",
      slug: "contains-duplicate",
      difficulty: "Easy",
      description: "Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.\n\n**Example:**\n```\nInput: 1 2 3 1\nOutput: true\n```",
      defaultCode: {
        python: "import sys\nnums = sys.stdin.read().split()\nprint('true' if len(nums) != len(set(nums)) else 'false')",
        cpp: "",
        java: "",
        javascript: "",
        go: ""
      },
      testCases: [
        { input: "1 2 3 1", expectedOutput: "true" },
        { input: "1 2 3 4", expectedOutput: "false" },
        { input: "1 1 1 3 3 4 3 2 4 2", expectedOutput: "true" }
      ]
    },
    {
      title: "Move Zeroes",
      slug: "move-zeroes",
      difficulty: "Easy",
      description: "Given an integer array `nums`, move all 0's to the end of it while maintaining the relative order of the non-zero elements. Print the result space separated.\n\n**Example:**\n```\nInput: 0 1 0 3 12\nOutput: 1 3 12 0 0\n```",
      defaultCode: {
        python: "import sys\nnums = list(map(int, sys.stdin.read().split()))\nnon_zero = [n for n in nums if n != 0]\nzeros = [0] * (len(nums) - len(non_zero))\nprint(*(non_zero + zeros))",
        cpp: "",
        java: "",
        javascript: "",
        go: ""
      },
      testCases: [
        { input: "0 1 0 3 12", expectedOutput: "1 3 12 0 0" },
        { input: "0", expectedOutput: "0" }
      ]
    }
  ];

  // --- SEEDING LOOP ---
  for (const p of problems) {
    await prisma.problem.create({
      data: {
        ...(p.id ? { id: p.id } : {}), // Only add ID if explicitly defined
        title: p.title,
        slug: p.slug,
        difficulty: p.difficulty,
        description: p.description,
        defaultCode: p.defaultCode,
        testCases: {
          create: p.testCases
        },
        discussions: {
          create: [
            { text: `Any tips for ${p.title}?`, userId: admin.id }
          ]
        },
        likes: {
          create: [{ userId: admin.id, liked: true }]
        }
      }
    });
    console.log(`✅ Seeded: ${p.title}`);
  }

  console.log("✨ Seeding Complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
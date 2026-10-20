require("dotenv").config();
const { MongoClient } = require("mongodb");

const express = require("express");
const cors = require("cors");
const path = require("path");
const OpenAI = require("openai");

const app = express();
const mongoUri = process.env.MONGODB_URI;
const mongoOptions = {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000
};
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});
let db;
let connecting;

async function connectMongoDB() {
    if (db) return db;
    if (!mongoUri) throw new Error("MONGODB_URI is not configured.");
    if (connecting) return connecting;

    connecting = (async function () {
        const client = new MongoClient(mongoUri, mongoOptions);
        try {
            await client.connect();
            db = client.db("healthconnect");
            console.log("MongoDB connected successfully");
            return db;
        } catch (error) {
            await client.close().catch(() => {});
            const detail = String(error?.message || "").split("\n")[0];
            console.error(`MongoDB connection failed (${error.name}): ${detail}`);
            throw error;
        }
    })();

    try {
        return await connecting;
    } finally {
        connecting = undefined;
    }
}

connectMongoDB().catch(() => {
    if (!mongoUri) console.warn("Database saves are disabled until MONGODB_URI is configured.");
    else console.warn("The planner is available, but MongoDB saves will retry on the next request.");
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, "../public")));

// Test API
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "HealthCONNECT server is running!"
    });
});

app.get("/api/db/status", (req, res) => {
    res.set("Cache-Control", "no-store");
    res.json({ configured: Boolean(mongoUri), connected: Boolean(db) });
});

// Public readiness check; never return the secret or full configuration.
app.get("/api/ai/status", (req, res) => {
    res.set("Cache-Control", "no-store");
    res.json({ configured: Boolean(process.env.OPENAI_API_KEY) });
});

// Save diet customization data
app.post("/api/diet", async (req, res) => {
    try {
        const activeDb = db || await connectMongoDB();
        const dietData = req.body;

        const result = await activeDb.collection("dietPlans").insertOne({
            ...dietData,
            createdAt: new Date()
        });

        res.json({
            success: true,
            message: "Diet plan saved successfully!",
            id: result.insertedId
        });

    } catch (error) {
        console.error("Error saving diet plan:", error);

        res.status(503).json({
            success: false,
            message: "Database unavailable. Check the MongoDB URI, cluster status, and Atlas network access list, then try again."
        });
    }
});

// Module 6: AI wellness assistant. Keep the API key on the server.
app.post("/api/ai/ask", async (req, res) => {
    const question = typeof req.body?.question === "string" ? req.body.question.trim() : "";
    if (!question || question.length > 1200) {
        return res.status(400).json({ success: false, message: "Enter a question up to 1,200 characters." });
    }
    if (!process.env.OPENAI_API_KEY) {
        return res.status(503).json({ success: false, message: "AI is not configured yet. Add OPENAI_API_KEY to the server environment." });
    }

    try {
        const health = req.body?.health && typeof req.body.health === "object" ? req.body.health : {};
        const context = [
            Number.isFinite(Number(health.age)) ? `Age: ${Number(health.age)}` : null,
            Number.isFinite(Number(health.bmi)) && Number(health.bmi) > 0 ? `BMI: ${Number(health.bmi)}` : null,
            Number.isFinite(Number(health.targetCalories)) && Number(health.targetCalories) > 0 ? `Estimated calorie target: ${Number(health.targetCalories)} kcal/day` : null,
            typeof health.goal === "string" ? `Goal: ${health.goal.slice(0, 40)}` : null
        ].filter(Boolean).join("; ");

        const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: process.env.OPENAI_MODEL || "gpt-4o-mini",
                temperature: 0.5,
                max_tokens: 500,
                messages: [
                    { role: "system", content: "You are a careful general wellness assistant. Give practical, concise nutrition, movement, and habit suggestions. Do not diagnose, prescribe treatment, or claim BMI/calorie estimates are medical advice. Encourage professional care for medical concerns. If user context is supplied, use it cautiously. If context is absent, answer generally." },
                    { role: "user", content: `${context ? `Planner context (self-reported): ${context}\n\n` : ""}${question}` }
                ]
            }),
            signal: AbortSignal.timeout(30000)
        });
        const result = await upstream.json().catch(() => ({}));
        if (!upstream.ok) {
            console.error("AI provider returned status", upstream.status);
            return res.status(502).json({ success: false, message: "The AI service could not answer right now. Please try again." });
        }
        const answer = result.choices?.[0]?.message?.content?.trim();
        if (!answer) throw new Error("AI provider returned an empty response");
        return res.json({ success: true, answer });
    } catch (error) {
        console.error("AI request failed:", error.message);
        return res.status(502).json({ success: false, message: "The AI service could not answer right now. Please try again." });
    }
});
// Start server
app.listen(PORT, () => {
    console.log(`HealthCONNECT server running at http://localhost:${PORT}`);
});

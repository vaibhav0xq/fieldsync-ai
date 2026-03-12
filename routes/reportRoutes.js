const express = require("express");
const router = express.Router();
const supabase = require("../database/supabaseClient");
const OpenAI = require("openai");


// =======================
// POST /report
// Save report + AI analysis
// =======================

router.post("/report", async (req, res) => {
  const { type, category, location, description } = req.body;

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  try {

    // Run AI analysis
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert assistant helping diagnose agriculture, infrastructure, or disaster-related issues."
        },
        {
          role: "user",
          content: `Analyze this report and suggest possible causes and actions: ${description}`
        }
      ]
    });

    const aiResult = completion.choices[0].message.content;

    // Store report + AI result in Supabase
    const { data, error } = await supabase
      .from("reports")
      .insert([
        {
          type,
          category,
          location,
          description,
          ai_analysis: aiResult
        }
      ])
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).json({
        error: "Database insert failed"
      });
    }

    res.json({
      status: "success",
      report: data,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "AI analysis failed"
    });
  }
});


// =======================
// GET /reports
// Fetch reports
// =======================

router.get("/reports", async (req, res) => {
  try {

    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return res.status(500).json({
        error: "Failed to fetch reports"
      });
    }

    res.json({
      status: "success",
      count: data.length,
      data: data
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Unexpected server error"
    });
  }
});


module.exports = router;
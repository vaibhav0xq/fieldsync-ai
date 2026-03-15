const express = require("express")
const router = express.Router()
const multer = require("multer")
const OpenAI = require("openai")
const supabase = require("../database/supabaseClient")

const storage = multer.memoryStorage()
const upload = multer({ storage })

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})


// =======================
// POST REPORT
// =======================

router.post("/report", upload.single("image"), async (req, res) => {

  try {

    const { type, category, location, description } = req.body

    let imageUrl = null

    // =======================
    // Upload image to Supabase
    // =======================

    if (req.file) {

      const fileName = `reports/${Date.now()}_${req.file.originalname}`

      const { error } = await supabase.storage
        .from("report-images")
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype
        })

      if (!error) {

        const { data } = supabase.storage
          .from("report-images")
          .getPublicUrl(fileName)

        imageUrl = data.publicUrl

      }

    }


    // =======================
    // AI ANALYSIS
    // =======================

    let aiAnalysis = "AI analysis unavailable."

    try {

      const messages = [
        {
          role: "system",
          content: "You are an agriculture expert helping farmers diagnose crop problems. Focus strongly on what is visible in the image."
        }
      ]


      if (imageUrl) {

        messages.push({
          role: "user",
          content: [
            {
              type: "text",
              text: `
Analyze this crop problem reported by a farmer.

Type: ${type}
Category: ${category}
Location: ${location}
Description: ${description}

Respond exactly in this format:

Risk Level: (Low / Medium / High)

Advice:
Maximum 80 words. Provide practical steps farmers should take.
`
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl
              }
            }
          ]
        })

      } else {

        messages.push({
          role: "user",
          content: `
Analyze this crop problem reported by a farmer.

Type: ${type}
Category: ${category}
Location: ${location}
Description: ${description}

Respond exactly in this format:

Risk Level: (Low / Medium / High)

Advice:
Maximum 80 words. Provide practical steps farmers should take.
`
        })

      }


      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: messages
      })

      aiAnalysis = completion.choices[0].message.content

    } catch (aiError) {

      console.error("AI ERROR:", aiError.message)

    }


    // =======================
    // SAVE REPORT
    // =======================

    const { data, error } = await supabase
      .from("reports")
      .insert([
        {
          type,
          category,
          location,
          description,
          image_url: imageUrl,
          ai_analysis: aiAnalysis
        }
      ])
      .select()

    if (error) {

      console.error("Database error:", error)

      return res.status(500).json({
        error: "Failed to store report"
      })

    }

    res.json({
      success: true,
      report: data[0]
    })

  } catch (err) {

    console.error("Server error:", err)

    res.status(500).json({
      error: "Unexpected server error"
    })

  }

})


// =======================
// GET REPORTS
// =======================

router.get("/reports", async (req, res) => {

  try {

    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {

      console.error(error)

      return res.status(500).json({
        error: "Failed to fetch reports"
      })

    }

    res.json({
      data
    })

  } catch (err) {

    console.error(err)

    res.status(500).json({
      error: "Unexpected server error"
    })

  }

})

module.exports = router
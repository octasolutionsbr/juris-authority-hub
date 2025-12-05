import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const { memberId, title, bio, education, publications } = await req.json();

    if (!memberId) {
      throw new Error("memberId is required");
    }

    // Build content to translate
    const contentToTranslate = {
      title: title || "",
      bio: bio || "",
      education: education || [],
      publications: publications || [],
    };

    const prompt = `Translate the following lawyer profile content from Portuguese to English. Maintain professional legal terminology and formal tone. Return ONLY a valid JSON object with the translated content, no additional text or markdown.

Content to translate:
${JSON.stringify(contentToTranslate, null, 2)}

Return the translation in this exact JSON format:
{
  "title_en": "translated title",
  "bio_en": "translated bio",
  "education_en": ["translated education item 1", "translated education item 2"],
  "publications_en": ["translated publication 1", "translated publication 2"]
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You are a professional legal translator specializing in Portuguese to English translations. Always respond with valid JSON only, no markdown formatting or additional text.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required. Please add credits to your workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const translatedContent = data.choices?.[0]?.message?.content;

    if (!translatedContent) {
      throw new Error("No translation received from AI");
    }

    // Parse the JSON response - handle potential markdown wrapping
    let parsedTranslation;
    try {
      // Remove potential markdown code blocks
      const cleanedContent = translatedContent
        .replace(/```json\s*/gi, "")
        .replace(/```\s*/g, "")
        .trim();
      parsedTranslation = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error("Failed to parse translation:", translatedContent);
      throw new Error("Failed to parse translation response");
    }

    // Update the database with translations
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { error: updateError } = await supabase
      .from("team_members")
      .update({
        title_en: parsedTranslation.title_en || null,
        bio_en: parsedTranslation.bio_en || null,
        education_en: parsedTranslation.education_en || null,
        publications_en: parsedTranslation.publications_en || null,
      })
      .eq("id", memberId);

    if (updateError) {
      console.error("Database update error:", updateError);
      throw new Error(`Failed to update database: ${updateError.message}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        memberId,
        translations: parsedTranslation,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Translation error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

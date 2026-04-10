import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { brand, size, condition, notes } = await req.json();

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const prompt = `You are a resale listing assistant. Generate a listing for the following item:
Brand: ${brand || "Unknown"}
Size: ${size || "Unknown"}
Condition: ${condition || "Unknown"}
Notes: ${notes || "None"}

Respond with JSON in this exact format:
{
  "title": "a short, catchy listing title under 80 characters",
  "description": "a 2-3 sentence description highlighting key details",
  "tags": "comma separated list of 5 relevant search tags"
}`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  const result = JSON.parse(response.choices[0].message.content ?? "{}");

  return NextResponse.json(result);
}

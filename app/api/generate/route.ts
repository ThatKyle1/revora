import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { brand, size, condition, notes } = await req.json();

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const prompt = `You are a resale listing assistant. Generate a listing for the following item:
Brand: ${brand || "Unknown"}
Size: ${size || "Unknown"}
Condition: ${condition || "Unknown"}
Notes: ${notes || "None"}

Respond with JSON in this exact format, no other text:
{
  "title": "a short, catchy listing title under 80 characters",
  "description": "a 2-3 sentence description highlighting key details",
  "tags": "comma separated list of 5 relevant search tags"
}`;

  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 512,
    messages: [{ role: "user", content: prompt }],
  });

  const raw = response.content[0].type === "text" ? response.content[0].text : "";
  const text = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  const result = JSON.parse(text);

  return NextResponse.json(result);
}
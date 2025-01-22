import { auth } from "@/providers/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { checkApiLimit, increaseApiLimit } from "../actions/route";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
  baseURL: "https://api.aimlapi.com",
  dangerouslyAllowBrowser: true,
});

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      {
        message: "method not allowed",
      },
      { status: 405 }
    );
  }

  const session = await getServerSession(auth);

  if (!session) {
    return NextResponse.json(
      {
        message: "unauthorized",
      },
      { status: 401 }
    );
  }
  try {
    // Parse the request body
    const body = await req.json();
    const { prompt } = body;

    // Validate the input
    if (!prompt) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const res = await checkApiLimit();

    if (res) {
      return NextResponse.json(
        {
          message: "free tire completed",
        },
        { status: 403 }
      );
    }

    // Call the OpenAI API using the `chat.completions.create` method
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Use the desired model, e.g., 'gpt-4' or 'gpt-3.5-turbo'
      messages: [{ role: "user", content: prompt }],
      max_tokens: 50,
      temperature: 0.5,
    });

    // Extract and return the generated text
    const generatedText = response.choices[0]?.message?.content?.trim();
    if (!generatedText) {
      return NextResponse.json(
        { error: "No response from OpenAI API." },
        { status: 500 }
      );
    }

    await increaseApiLimit();

    return NextResponse.json({ result: generatedText });
  } catch (error: any) {
    console.error("OpenAI API Error:", error);

    return NextResponse.json(
      { error: error.message || "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

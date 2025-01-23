import { auth } from "@/providers/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
  baseURL: "https://api.aimlapi.com",
  dangerouslyAllowBrowser: true,
});

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      {
        message: "Method not allowed",
      },
      { status: 405 }
    );
  }

  const session = await getServerSession(auth);

  if (!session) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { prompt, amount, resolution } = body;

    // Validate input
    const allowedResolutions = ["512x512", "1024x1024", "2048x2048"];
    if (
      !prompt ||
      !amount ||
      !resolution ||
      !allowedResolutions.includes(resolution)
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid input. Please check your prompt, amount, and resolution.",
        },
        { status: 400 }
      );
    }

    const response: any = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    const generatedImages = response.data.map(
      (item: { url: string }) => item.url
    );

    return NextResponse.json({ images: generatedImages });
  } catch (error: any) {
    console.log("OpenAI API Error:", error.message);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

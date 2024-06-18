import OpenAi from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

const openai = new OpenAi({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const prompt =
      "Create a list of threee open ended and engaging questions formatted as a single string. each question should be seprated by || .  These messages are for anonymous social messaging platform like Qooh.me, and should be suitable for diverse audience avoid personal or sensative topics. for example your oytput should be structured like this: Whats the hobby you have recently started || if you could have dinner with any historical figure, who would it be? whats simple thing that makes you happy. ensure the questions are intriguing and contribute to a positive and welcoming conversational environment";
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      max_tokens: 100,
      stream: true,
      prompt,
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    if (error instanceof OpenAi.APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json(
        {
          name,
          status,
          headers,
          message,
        },
        { status }
      );
    } else {
      console.log("An unexpected error occured");
      throw error;
    }
  }
}

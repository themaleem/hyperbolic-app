import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { word1, word2 } = await req.json();

    const apiKey = process.env.HYPERBOLIC_API_KEY;
    const url = "https://api.hyperbolic.xyz/v1/chat/completions";

    const prompt = `You're in a free style rap battle competition and you've made to the finals where only the best 4 rappers remain, each finalist is given 2 words each to do a freestyle with, your words are "${word1}" are "${word2}" and "silver", what bars are you spitting?  
    `;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: prompt }],
        model: "meta-llama/Meta-Llama-3.1-8B-Instruct",
        max_tokens: 150,
        temperature: 0.7,
        top_p: 0.9,
      }),
    });

    const data = await response.json();

    return NextResponse.json({ rap: data.choices[0].message.content });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate rap" },
      { status: 500 }
    );
  }
}

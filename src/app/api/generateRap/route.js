import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { word1, word2 } = await req.json();

    const apiKey = process.env.HYPERBOLIC_API_KEY;
    const url = "https://api.hyperbolic.xyz/v1/chat/completions";

    const prompt = `You're in a free style rap battle competition and you've made to the finals where only the best 4 rappers remain, each finalist is given 2 words each to do a freestyle with, your words are "${word1}" are "${word2}" and "silver", what witty bars are you spitting champ? 
    
    Rules:
    - Return ONLY 4 punchlines of the rap, NOTHING MORE, NOTHING LESS. nothing else is needed.
    - Ensure the punchline are quick and direct, at most 6-8 words per line.
    - END EACH LINE WITH A "." (also known as a fullstop, period, dot, point). This is absolutely needed because i am feeding the response into a text-to-speech api,and it needs to be accurate!
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

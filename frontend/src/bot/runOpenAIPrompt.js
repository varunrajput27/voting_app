export const runOpenAIPrompt = async (userInput) => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Use "gpt-4" only if your key supports it
        messages: [{ role: "user", content: userInput }],
      }),
    });

    const data = await response.json();
    console.log("OpenAI response:", data); // helpful for debugging

    if (!response.ok) {
      return `API Error: ${data.error?.message || "Unknown error"}`;
    }

    return data.choices?.[0]?.message?.content ?? "No response from AI.";
  } catch (err) {
    console.error("Request error:", err);
    return "free api limit exceed";
  }
};

export async function generateText(systemPrompt: string, userPrompt: string): Promise<string> {
	const apiKey = process.env.OPENAI_API_KEY;
	if (!apiKey) {
		return `LLM disabled. System: ${systemPrompt.slice(0, 60)}... User: ${userPrompt.slice(0, 80)}...`;
	}
	try {
		const res = await fetch("https://api.openai.com/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify({
				model: "gpt-4o-mini",
				messages: [
					{ role: "system", content: systemPrompt },
					{ role: "user", content: userPrompt },
				],
				temperature: 0.7,
			}),
		});
		if (!res.ok) {
			return `LLM error ${res.status}. Falling back for: ${userPrompt.slice(0, 80)}...`;
		}
		const json = await res.json();
		const content = json?.choices?.[0]?.message?.content?.trim();
		return content || "(no content)";
	} catch (_err) {
		return "LLM request failed; using fallback output.";
	}
} 
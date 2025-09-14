// import "dotenv/config";

export interface DeepSeekMessage {
	role: "user" | "assistant" | string;
	content: string;
}

export interface DeepSeekResponse {
	choices: {
		message: {
			content: string;
		};
	}[];
}

export async function callDeepSeekAPI(query: string): Promise<string> {
	const DEEPSEEK_API_KEY =
		"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";
	const DEEPSEEK_API_URL = "https://openrouter.ai/api/v1/chat/completions";

	const response = await fetch(DEEPSEEK_API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
		},
		body: JSON.stringify({
			model: "openai/gpt-4o",
			messages: [
				{
					role: "user",
					content: query,
				},
			],
			temperature: 0.7,
			max_tokens: 2000,
		}),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(
			errorData.error?.code + errorData.error?.message || "API request failed"
		);
	}

	const data: DeepSeekResponse = await response.json();
	return data.choices[0].message.content;
}

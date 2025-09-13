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
			model: "deepseek/deepseek-chat:free",
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
		throw new Error(errorData.error?.message || "API request failed");
	}

	const data: DeepSeekResponse = await response.json();
	console.log("Result: ", data.choices[0].message.content);
	return data.choices[0].message.content;
}

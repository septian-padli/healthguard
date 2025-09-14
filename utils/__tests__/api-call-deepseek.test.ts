import { callDeepSeekAPI } from "../api-call-deepseek";

// Mock fetch globally
global.fetch = jest.fn();

describe("callDeepSeekAPI", () => {
	it("returns content on success", async () => {
		const mockResponse = {
			ok: true,
			json: async () => ({
				choices: [{ message: { content: "Hello!" } }],
			}),
		};
		(global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

		const result = await callDeepSeekAPI("Hi");
		expect(result).toBe("Hello!");
	});

	it("throws error on API failure", async () => {
		const mockResponse = {
			ok: false,
			json: async () => ({
				error: { message: "API error" },
			}),
		};
		(global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

		await expect(callDeepSeekAPI("Hi")).rejects.toThrow("API error");
	});
});

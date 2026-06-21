"use server"
const baseUrl = process.env.NEXT_PUBLIC_URL;

export const createPrompt = async (newPromptData) => {
    const res = await fetch(`${baseUrl}/api/prompts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPromptData),
    });

    return res.json();
}
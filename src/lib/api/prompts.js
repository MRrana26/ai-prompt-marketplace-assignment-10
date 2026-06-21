"use server"
const baseUrl = process.env.NEXT_PUBLIC_URL;

export const getUserPrompts = async () => {
    try {
        const res = await fetch(`${baseUrl}/api/prompts`, { cache: 'no-store' });

        if (!res.ok) throw new Error("Failed to fetch");
        return await res.json();
        
    } catch (error) {
        console.error("Error loading prompts:", error);
        return [];
    }
}
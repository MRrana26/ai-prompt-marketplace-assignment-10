export const getCreatorPrompts = async (email) => {
  const res = await fetch(`http://localhost:5000/api/creator-prompts?email=${email}`, { cache: "no-store" });
  if (!res.ok) return [];
  return await res.json();
};

export const getUserPrompts = async (email) => {
  const res = await fetch(`http://localhost:5000/api/user-prompts?email=${email}`, { cache: "no-store" });
  if (!res.ok) return [];
  return await res.json();
};
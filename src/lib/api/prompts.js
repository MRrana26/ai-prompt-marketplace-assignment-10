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






export const getAllPrompts = async () => {
  const res = await fetch(`http://localhost:5000/api/admin/prompts`, { cache: "no-store" });
  if (!res.ok) return [];
  return await res.json();
};

export const updatePromptStatus = async (id, status) => {
  const res = await fetch(`http://localhost:5000/api/admin/prompts/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) return null;
  return await res.json();
};

export const deletePrompt = async (id) => {
  const res = await fetch(`http://localhost:5000/api/admin/prompts/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) return null;
  return await res.json();
};




export const getFeaturedPrompts = async () => {
  const res = await fetch(`http://localhost:5000/api/featured-prompts`, { cache: "no-store" });
  if (!res.ok) return [];
  return await res.json();
};





export const getPromptById = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/api/prompts/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching prompt:", error);
    return null;
  }
};
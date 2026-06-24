const baseUrl = process.env.NEXT_PUBLIC_URL;

export const getCreatorPrompts = async (email) => {
  const res = await fetch(`${baseUrl}/api/creator-prompts?email=${email}`, { cache: "no-store" });
  if (!res.ok) return [];
  return await res.json();
};

export const getUserPrompts = async (email) => {
  const res = await fetch(`${baseUrl}/api/user-prompts?email=${email}`, { cache: "no-store" });
  if (!res.ok) return [];
  return await res.json();
};






export const getAllPrompts = async () => {
  const res = await fetch(`${baseUrl}/api/admin/prompts`, { cache: "no-store" });
  if (!res.ok) return [];
  return await res.json();
};

export const updatePromptStatus = async (id, status) => {
  const res = await fetch(`${baseUrl}/api/admin/prompts/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) return null;
  return await res.json();
};

export const deletePrompt = async (id) => {
  const res = await fetch(`${baseUrl}/api/admin/prompts/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) return null;
  return await res.json();
};




export const getFeaturedPrompts = async () => {
  const res = await fetch(`${baseUrl}/api/featured-prompts`, { cache: "no-store" });
  if (!res.ok) return [];
  return await res.json();
};





export const getPromptById = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/api/prompts/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching prompt:", error);
    return null;
  }
};




export const incrementCopyCount = async (id) => {
  const res = await fetch(`${baseUrl}/api/prompts/${id}/copy`, {
    method: "PATCH",
  });
  if (!res.ok) return null;
  return await res.json();
};

export const reportPrompt = async (id, data) => {
  const res = await fetch(`${baseUrl}/api/prompts/${id}/report`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) return null;
  return await res.json();
};

export const toggleBookmark = async (promptId, userEmail) => {
  const res = await fetch(`${baseUrl}/api/bookmarks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ promptId, userEmail }),
  });
  if (!res.ok) return null;
  return await res.json();
};

export const checkBookmark = async (userEmail, promptId) => {
  const res = await fetch(`${baseUrl}/api/bookmarks/${userEmail}/${promptId}`, { cache: "no-store" });
  if (!res.ok) return { bookmarked: false };
  return await res.json();
};




export const getAllReports = async () => {
  const res = await fetch(`${baseUrl}/api/admin/reports`, { cache: "no-store" });
  if (!res.ok) return [];
  return await res.json();
};

export const dismissReport = async (reportId) => {
  const res = await fetch(`${baseUrl}/api/admin/reports/${reportId}`, {
    method: "DELETE",
  });
  return res.ok;
};

export const warnCreator = async (id, creatorEmail) => {
  const res = await fetch(`${baseUrl}/api/admin/reports/${id}/warn`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ creatorEmail }),
  });
  return res.ok;
};

export const removePromptAndReport = async (promptId, reportId) => {
  const res = await fetch(`${baseUrl}/api/admin/prompts/${promptId}/report/${reportId}`, {
    method: "DELETE",
  });
  return res.ok;
};


export const getReviews = async (id) => {
  const res = await fetch(`${baseUrl}/api/prompts/${id}/reviews`, { cache: "no-store" });
  if (!res.ok) return [];
  return await res.json();
};

export const submitReview = async (id, data) => {
  const res = await fetch(`${baseUrl}/api/prompts/${id}/review`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) return null;
  return await res.json();
};


export const getSavedPrompts = async (userEmail) => {
  const res = await fetch(`${baseUrl}/api/bookmarks/${userEmail}`, { cache: "no-store" });
  if (!res.ok) return [];
  return await res.json();
};

export const getUserReviews = async (userEmail) => {
  const res = await fetch(`${baseUrl}/api/reviews/${userEmail}`, { cache: "no-store" });
  if (!res.ok) return [];
  return await res.json();
};




export const updatePrompt = async (id, data) => {
  const res = await fetch(`${baseUrl}/api/prompts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) return null;
  return await res.json();
};

export const deleteUserPrompt = async (id) => {
  const res = await fetch(`${baseUrl}/api/prompts/${id}`, { method: "DELETE" });
  if (!res.ok) return null;
  return await res.json();
};



export const getPromptAnalytics = async (id) => {
  const res = await fetch(`${baseUrl}/api/prompts/${id}/analytics`, { cache: "no-store" });
  if (!res.ok) return null;
  return await res.json();
};

export const getLatestReviews = async () => {
  const res = await fetch(`${baseUrl}/api/reviews`, { cache: "no-store" });
  if (!res.ok) return [];
  return await res.json();
};

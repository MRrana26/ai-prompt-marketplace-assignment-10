const baseUrl = process.env.NEXT_PUBLIC_URL;

export const getAllUsers = async () => {
  const res = await fetch(`${baseUrl}/api/admin/users`, { cache: "no-store" });
  if (!res.ok) return [];
  return await res.json();
};

export const updateUserRole = async (id, role) => {
  const res = await fetch(`${baseUrl}/api/admin/users/${id}/role`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role }),
  });
  if (!res.ok) return null;
  return await res.json();
};

export const deleteUser = async (id) => {
  const res = await fetch(`${baseUrl}/api/admin/users/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) return null;
  return await res.json();
};
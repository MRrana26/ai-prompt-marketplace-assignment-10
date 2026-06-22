export const getAllUsers = async () => {
  const res = await fetch(`http://localhost:5000/api/admin/users`, { cache: "no-store" });
  if (!res.ok) return [];
  return await res.json();
};

export const updateUserRole = async (id, role) => {
  const res = await fetch(`http://localhost:5000/api/admin/users/${id}/role`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role }),
  });
  if (!res.ok) return null;
  return await res.json();
};

export const deleteUser = async (id) => {
  const res = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) return null;
  return await res.json();
};

const baseUrl = process.env.NEXT_PUBLIC_URL;

export const getAdminStats = async () => {
  const res = await fetch(`${baseUrl}/api/admin/stats`, { cache: "no-store" });
  if (!res.ok) return null;
  return await res.json();
};


export const getAllPayments = async () => {
  const res = await fetch(`${baseUrl}/api/admin/payments`, { cache: "no-store" });
  if (!res.ok) return [];
  return await res.json();
};
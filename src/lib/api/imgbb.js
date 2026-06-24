export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_API_URL}`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) return null;
  const data = await res.json();
  return data.data.url;
};
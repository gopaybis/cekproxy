export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { ip, port } = req.body;
  if (!ip || !port) {
    return res.status(400).json({ error: "IP dan Port wajib diisi" });
  }

  try {
    const url = `https://api-proxy-checker.vercel.app/api/v1?ip=${encodeURIComponent(ip)}&port=${encodeURIComponent(port)}`;
    const response = await fetch(url);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("Error saat cek proxy:", err);
    return res.status(500).json({ error: true });
  }
}

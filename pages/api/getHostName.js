import os from "os";

export default function handler(req, res) {
  if (req.method === "GET") {
    const hostName = os.hostname(); // Obtiene el nombre del equipo
    res.status(200).json({ hostName });
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}

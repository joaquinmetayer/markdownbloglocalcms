import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const dataPath = path.join(process.cwd(), "assets", "data.json");
    try {
      fs.writeFileSync(dataPath, JSON.stringify(req.body, null, 2));
      res.status(200).json({ message: "Data saved successfully" });
    } catch (error) {
      console.error("Error saving data:", error);
      res.status(500).json({ message: "Error saving data", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

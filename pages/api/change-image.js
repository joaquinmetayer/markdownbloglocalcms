import { promises as fs } from "fs";
import path from "path";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const form = formidable({
    uploadDir: path.join(process.cwd(), "public/images"),
    keepExtensions: true,
    maxFiles: 1,
    maxFileSize: 20 * 1024 * 1024,
    filter: ({ mimetype }) => mimetype && mimetype.startsWith("image/"),
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing form:", err);
      return res.status(500).json({ error: "Error uploading file" });
    }
    const file = files.image ? files.image[0] : null;
    if (!file) {
      console.error("No file received");
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("File received:", file);

    const originalFilename = file.originalFilename;
    const newFilePath = path.join(form.uploadDir, originalFilename);
    console.log("File will be saved to:", newFilePath);

    try {
      await fs.rename(file.filepath, newFilePath);
      console.log("File moved to:", newFilePath);

      const jsonFilePath = path.join(process.cwd(), "assets", "data.json");
      const json = await fs.readFile(jsonFilePath, "utf-8");
      const data = JSON.parse(json);
      data.heroImage = originalFilename;
      data.heroWidth = fields.heroWidth;
      await fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2), "utf-8");
      console.log("JSON file updated with new URL and heroWidth:", data);

      return res.status(200).json({ message: "File uploaded and data updated successfully" });
    } catch (error) {
      console.error("Error handling file upload or updating data:", error);
      return res.status(500).json({ error: "Error handling file upload or updating data" });
    }
  });
}

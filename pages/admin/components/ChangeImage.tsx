"use client";
import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function HeroImage() {
  const [image, setImage] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string>("");
  const [heroWidth, setHeroWidth] = useState<string>("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    if (/\.(png|jpe?g)$/i.test(file.name)) {
      const newImageName = `${uuidv4()}.${file.name.split(".").pop()}`;
      setImage(file);
      setImageName(newImageName);
    } else {
      setMessage("Please select a valid image file (png or jpg/jpeg)");
    }
  };

  const handleWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHeroWidth(e.target.value);
  };

  const handleUpload = async () => {
    if (!image) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", image, imageName);
    formData.append("heroWidth", heroWidth);

    try {
      const uploadResponse = await axios.post("/api/change-image", formData);
      if (uploadResponse.status !== 200) {
        throw new Error("Error uploading image");
      }
      await handleCommit(`new hero image ${imageName}`);
      setMessage("Image uploaded and URL updated successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage("Error uploading image");
    } finally {
      setIsLoading(false);
      window.location.reload()
    }
  };

  const handleCommit = async (gitMessage: string) => {
    await fetch("/api/git-commit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gitMessage }),
    });
  };

  return (
    <>
      <p>
        <label
          htmlFor="imageUpload"
          style={{ cursor: "pointer", textDecoration: "underline" }}
        >
          Select hero image
        </label>
        <input
          type="file"
          id="imageUpload"
          onChange={handleImageChange}
          style={{ display: "none" }}
          disabled={isLoading}
        />
      </p>
      {image && <p>Selected image: {imageName}</p>}
      <p>
        <input
          placeholder="Hero width in pixels or %"
          type="text"
          id="heroWidth"
          value={heroWidth}
          onChange={handleWidthChange}
          disabled={isLoading}
        />
      </p>
      <p>
        <button onClick={handleUpload} disabled={isLoading || !image}>
          Upload Hero Image
        </button>
      </p>
      {message.length > 0 && <p>{message}</p>}
    </>
  );
}

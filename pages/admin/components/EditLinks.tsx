import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import data from "../../../assets/data.json";

interface Link {
  platform: string;
  url: string;
}

const EditLinks: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [linkList, setLinkList] = useState<Link[]>([]);

  useEffect(() => {
    setLinkList(
      Array.from(
        { length: 10 },
        (_, i) => data.links[i] || { platform: "", url: "" }
      )
    );
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedLinks = [...linkList];
    updatedLinks[index] = { ...updatedLinks[index], [name]: value };
    setLinkList(updatedLinks);
  };

  const handleSaveLinks = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const filteredLinks = linkList.filter((link) => link.platform && link.url);
    try {
      await axios.post("/api/save-data", {
        ...data,
        links: filteredLinks
      });
      await handleCommit("edit links");
      setMessage("Links saved successfully");
    } catch (error) {
      console.error("Error saving links:", error);
      setMessage("Error saving links");
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
      {linkList.map((link, index) => (
        <span key={index}>
          <p>
            <input
              type="text"
              name="platform"
              placeholder="Link title"
              value={link.platform}
              onChange={(e) => handleInputChange(e, index)}
              disabled={isLoading}
            />
          </p>
          <p>
            <input
              type="text"
              name="url"
              placeholder="URL"
              value={link.url}
              onChange={(e) => handleInputChange(e, index)}
              disabled={isLoading}
            />
          </p>
        </span>
      ))}
      <p>
        <button onClick={handleSaveLinks} disabled={isLoading}>
          Save Links
        </button>
      </p>
      {message.length > 0 && <p>{message}</p>}
    </>
  );
};

export default EditLinks;

"use client";
import React, { useState } from "react";
import axios from "axios";

export default function DeletePost() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [deleteTitle, setDeleteTitle] = useState("");

  const handleDeletePost = async () => {
    setIsLoading(true);
    try {
      await axios.request({
        url: "/api/delete-post",
        method: "DELETE",
        data: { title: deleteTitle },
      });
      await handleCommit(`delete post ${deleteTitle}`);
      setMessage("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting the post:", error);
      setMessage("Error deleting the post");
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
        <input
          type="text"
          placeholder="Filename of the post to delete"
          value={deleteTitle}
          onChange={(e) => setDeleteTitle(e.target.value)}
          disabled={isLoading}
        />
      </p>
      <p>
        <button onClick={handleDeletePost} disabled={isLoading}>
          Delete post
        </button>
      </p>
      {message.length > 0 && <p> {message}</p>}
    </>
  );
}

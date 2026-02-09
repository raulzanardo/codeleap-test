// removed generated route types import (may be created by react-router typegen)
import { useEffect, useState } from "react";
import { Header } from "../components/header";
import Card from "../components/card";
import Post from "../components/post";
import TextInput from "../components/textInput";
import Button from "../components/button";

type Post = {
  id: number;
  username: string;
  created_datetime: string;
  title: string;
  content: string;
  author_ip?: string;
};

export function meta() {
  return [
    { title: "CodeLeap - Home" },
    { name: "description", content: "Home page" },
  ];
}

export default function Home() {
  const [username, setUsername] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    try {
      const name = localStorage.getItem("username");
      setUsername(name);
    } catch (e) {
      setUsername(null);
    }
  }, []);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("https://dev.codeleap.co.uk/careers/");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        // reverse results so newest posts show first
        setPosts((data.results ?? []).slice().reverse());
      } catch (e) {
        setPosts([]);
      }
    }

    fetchPosts();
  }, []);

  async function createPost() {
    if (title.trim().length === 0 || content.trim().length === 0) return;
    try {
      const payload = {
        username: username ?? "",
        created_datetime: new Date().toISOString(),
        title: title.trim(),
        content: content.trim(),
        author_ip: "",
      };

      const res = await fetch("https://dev.codeleap.co.uk/careers/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create post");

      const created = await res.json();
      // API returns created object; prepend to posts
      setPosts((prev) => [created, ...prev]);
      setTitle("");
      setContent("");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      <Header />
      <main className="max-w-3xl mx-auto p-6 bg-white ">
        <Card title="What’s on your mind?">
          <TextInput
            value={title}
            onChange={setTitle}
            placeholder="Hello world"
            ariaLabel="Post title"
            title="Title"
          />

          <TextInput
            value={content}
            onChange={setContent}
            placeholder="Content here"
            ariaLabel="Post content"
            title="Content"
            multiline
            rows={6}
          />

          <div className="flex justify-end ">
            <Button
              variant="primary"
              onClick={createPost}
              ariaLabel="Publish post"
              disabled={
                title.trim().length === 0 || content.trim().length === 0
              }
            >
              Publish
            </Button>
          </div>
        </Card>

        {posts.length > 0 && (
          <div className="mt-6 space-y-4">
            {posts.map((p) => (
              <Post
                key={p.id}
                id={p.id}
                title={p.title}
                username={p.username}
                created_datetime={p.created_datetime}
                content={p.content}
                onEdit={(id) => console.log("edit", id)}
                onDelete={(id) => console.log("delete", id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

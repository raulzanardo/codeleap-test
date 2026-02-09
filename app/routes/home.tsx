// removed generated route types import (may be created by react-router typegen)
import { useEffect, useState } from "react";
import { Header } from "../components/header";
import Card from "../components/card";
import Post from "../components/post";
import TextInput from "../components/textInput";
import Button from "../components/button";
import Modal from "~/components/modal";

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
  const baseUrl = "https://dev.codeleap.co.uk/careers/?limit=10";
  const [currentUrl, setCurrentUrl] = useState<string>(baseUrl);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [reloadKey, setReloadKey] = useState<number>(0);

  useEffect(() => {
    try {
      const name = localStorage.getItem("username");
      setUsername(name);
    } catch (e) {
      setUsername(null);
    }
  }, []);

  useEffect(() => {
    async function fetchPosts(url: string) {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        // store pagination links and total count
        setNextUrl(data.next ?? null);
        setPrevUrl(data.previous ?? null);
        setTotalCount(typeof data.count === "number" ? data.count : null);
        // use API order (do not reverse)
        setPosts(data.results ?? []);
      } catch (e) {
        setPosts([]);
        setNextUrl(null);
        setPrevUrl(null);
        setTotalCount(null);
      }
    }

    fetchPosts(currentUrl);
  }, [currentUrl, reloadKey]);

  // handlers for pagination controls
  function handleNext() {
    if (!nextUrl) return;
    setCurrentUrl(nextUrl);
    setPageNumber((p) => p + 1);
  }

  function handlePrev() {
    if (!prevUrl) return;
    setCurrentUrl(prevUrl);
    setPageNumber((p) => Math.max(1, p - 1));
  }

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
      // after creating, refresh first page so the new post appears
      setTitle("");
      setContent("");
      setCurrentUrl(baseUrl);
      setPageNumber(1);
      setReloadKey((k) => k + 1);
    } catch (e) {
      console.error(e);
    }
  }

  async function deletePost(id?: number | string) {
    if (!id) return;
    try {
      const res = await fetch(`https://dev.codeleap.co.uk/careers/${id}/`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete post");
      // after delete, refresh first page so newest posts are shown first
      setCurrentUrl(baseUrl);
      setPageNumber(1);
      setReloadKey((k) => k + 1);
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
            rows={3}
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
                onEdit={() => setReloadKey((k) => k + 1)}
                onDelete={(id) => deletePost(id)}
              />
            ))}

            <div className="flex items-center justify-between mt-4">
              <div>
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  ariaLabel="Previous page"
                  disabled={!prevUrl}
                >
                  Previous
                </Button>
              </div>

              <div className="text-sm text-gray-600">
                Page {pageNumber}
                {totalCount
                  ? ` of ${Math.max(1, Math.ceil(totalCount / 10))}`
                  : ""}
              </div>

              <div>
                <Button
                  variant="outline"
                  onClick={handleNext}
                  ariaLabel="Next page"
                  disabled={!nextUrl}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

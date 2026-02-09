import { useState, useEffect, useRef } from "react";
import Modal from "./modal";
import TextInput from "./textInput";

type PostProps = {
  id?: number | string;
  title: string;
  username?: string | null;
  created_datetime?: string;
  content: string;
  onEdit?: (id?: number | string) => void;
  onDelete?: (id?: number | string) => void;
  onComment?: (id?: number | string, comment?: string) => void;
  className?: string;
};

function formatTime(created_datetime?: string) {
  if (!created_datetime) return "";
  const then = new Date(created_datetime).getTime();
  const now = Date.now();
  const diffMs = now - then;
  const diffMinutes = Math.floor(diffMs / 60000);
  if (diffMinutes < 1) return "just now";
  if (diffMinutes < 60)
    return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24)
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  // older than a day: show local date
  try {
    return new Date(created_datetime).toLocaleDateString();
  } catch (e) {
    return created_datetime;
  }
}

export default function Post({
  id,
  title,
  username,
  created_datetime,
  content,
  onEdit,
  onDelete,
  className = "",
}: PostProps) {
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [loggedUser, setLoggedUser] = useState<string | null>(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const toastTimer = useRef<number | null>(null);
  const [likeLoading, setLikeLoading] = useState(false);

  useEffect(() => {
    try {
      const u = localStorage.getItem("username");
      setLoggedUser(u);
    } catch (e) {
      setLoggedUser(null);
    }
  }, []);

  useEffect(() => {
    if (!toastOpen) return;
    toastTimer.current = window.setTimeout(() => setToastOpen(false), 2800);
    return () => {
      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
        toastTimer.current = null;
      }
    };
  }, [toastOpen]);

  async function saveEdit() {
    if (!id) return;
    try {
      const payload = { title: editTitle.trim(), content: editContent.trim() };
      const res = await fetch(`https://dev.codeleap.co.uk/careers/${id}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to update post");
      onEdit?.(id);
      setEditOpen(false);
      setToastMessage("Post edited");
      setToastOpen(true);
    } catch (e) {
      console.error(e);
    }
  }

  async function onComment(id?: number | string, comment?: string) {
    if (!id || !comment) return;
    try {
      // Fake comment submission: simulate network latency then succeed
      await new Promise((res) => setTimeout(res, 400));
      // In a real integration we'd POST to the API. Here we simulate success.
      setToastMessage("Comment added (simulated)");
      setToastOpen(true);
    } catch (e) {
      console.error(e);
    }
  }

  async function onLiked(id?: number | string) {
    if (!id) return;
    try {
      setLikeLoading(true);
      await new Promise((res) => setTimeout(res, 350));
      setToastMessage("Post liked (simulated)");
      setToastOpen(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLikeLoading(false);
    }
  }

  return (
    <article className={`bg-white rounded-2xl overflow-hidden ${className}`}>
      <header className="bg-primary text-white pl-6 pr-3 py-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="flex items-center gap-3">
          {username && loggedUser && username.trim() === loggedUser.trim() ? (
            <>
              <button
                aria-label="Delete"
                onClick={() => setConfirmDeleteOpen(true)}
                className="p-2 rounded hover:bg-white/20"
              >
                <svg
                  width="32"
                  height="30"
                  viewBox="0 0 19 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.30014 20C1.30014 21.375 2.47026 22.5 3.90041 22.5H14.3015C15.7317 22.5 16.9018 21.375 16.9018 20V5H1.30014V20ZM4.49848 11.1L6.33167 9.3375L9.10097 11.9875L11.8573 9.3375L13.6905 11.1L10.9342 13.75L13.6905 16.4L11.8573 18.1625L9.10097 15.5125L6.34468 18.1625L4.51148 16.4L7.26777 13.75L4.49848 11.1ZM13.6515 1.25L12.3513 0H5.85062L4.55048 1.25H0V3.75H18.2019V1.25H13.6515Z"
                    fill="white"
                  />
                </svg>
              </button>
              <button
                aria-label="Edit"
                onClick={() => {
                  setEditTitle(title);
                  setEditContent(content);
                  setEditOpen(true);
                }}
                className="p-2 rounded hover:bg-white/20"
              >
                <svg
                  width="32"
                  height="30"
                  viewBox="0 0 32 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.10107 21.2663L14.8386 21.2475L27.3615 9.3225C27.853 8.85 28.1234 8.2225 28.1234 7.555C28.1234 6.8875 27.853 6.26 27.3615 5.7875L25.2995 3.805C24.3166 2.86 22.6017 2.865 21.6266 3.80125L9.10107 15.7288V21.2663ZM23.4611 5.5725L25.527 7.55125L23.4507 9.52875L21.3887 7.5475L23.4611 5.5725ZM11.7014 16.7713L19.5412 9.305L21.6032 11.2875L13.7647 18.7513L11.7014 18.7575V16.7713Z"
                    fill="white"
                  />
                  <path
                    d="M6.50067 26.25H24.7026C26.1367 26.25 27.3029 25.1287 27.3029 23.75V12.915L24.7026 15.415V23.75H10.6065C10.5727 23.75 10.5376 23.7625 10.5038 23.7625C10.4609 23.7625 10.418 23.7512 10.3738 23.75H6.50067V6.25H15.4027L18.003 3.75H6.50067C5.06661 3.75 3.90039 4.87125 3.90039 6.25V23.75C3.90039 25.1287 5.06661 26.25 6.50067 26.25Z"
                    fill="white"
                  />
                </svg>
              </button>
            </>
          ) : (
            <>
              <button
                aria-label="Like"
                onClick={() => onLiked(id)}
                disabled={likeLoading}
                className={`p-2 rounded hover:bg-white/20 ${likeLoading ? "opacity-60 pointer-events-none" : ""}`}
              >
                <svg
                  width="32"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 21s-7.33-4.868-9.2-7.08C-0.24 10.9 2.12 6 6.6 6c2.04 0 3.43 1.01 4.4 2.09C11.97 7.01 13.36 6 15.4 6 19.88 6 22.24 10.9 21.2 13.92 19.33 16.132 12 21 12 21z"
                    fill="white"
                  />
                </svg>
              </button>
              <button
                aria-label="Comment"
                onClick={() => {
                  setCommentText("");
                  setCommentOpen(true);
                }}
                className="p-2 rounded hover:bg-white/20"
              >
                <svg
                  width="32"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 6.5C21 5.119 19.88 4 18.5 4h-13C3.119 4 2 5.119 2 6.5v7C2 15.881 3.119 17 4.5 17H7v3l3.5-3h8c1.38 0 2.5-1.119 2.5-2.5v-7z"
                    fill="white"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      </header>

      <div className="p-6 border border-[#999999] border-t-0 rounded-2xl rounded-tl-none rounded-tr-none">
        <div className="flex items-start justify-between">
          <div className="text-lg text-gray-500 font-bold">
            @{username ?? "Anonymous"}
          </div>
          <div className="text-lg text-gray-500">
            {formatTime(created_datetime)}
          </div>
        </div>

        <div className="mt-2 text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">
          {content}
        </div>
      </div>
      <Modal
        open={confirmDeleteOpen}
        title="Are you sure you want to delete this item?"
        width="w-2xl"
        onClose={() => setConfirmDeleteOpen(false)}
        actions={[
          {
            key: "cancel",
            label: "Cancel",
            variant: "outlineBlack",
            onClick: () => setConfirmDeleteOpen(false),
          },
          {
            key: "delete",
            label: "Delete",
            variant: "danger",
            onClick: () => {
              onDelete?.(id);
              setConfirmDeleteOpen(false);
            },
          },
        ]}
      />
      <Modal
        open={editOpen}
        title="Edit post"
        width="w-2xl"
        onClose={() => setEditOpen(false)}
        actions={[
          {
            key: "cancel",
            label: "Cancel",
            variant: "outlineBlack",
            onClick: () => setEditOpen(false),
          },
          {
            key: "save",
            label: "Save",
            variant: "success",
            disabled:
              editTitle.trim().length === 0 || editContent.trim().length === 0,
            onClick: () => saveEdit(),
          },
        ]}
      >
        <div className="space-y-3">
          <TextInput
            value={editTitle}
            onChange={setEditTitle}
            title="Title"
            ariaLabel="Edit title"
          />

          <TextInput
            value={editContent}
            onChange={setEditContent}
            title="Content"
            ariaLabel="Edit content"
            multiline
            rows={4}
          />
        </div>
      </Modal>

      <Modal
        open={commentOpen}
        title="Add comment"
        width="w-2xl"
        onClose={() => setCommentOpen(false)}
        actions={[
          {
            key: "cancel",
            label: "Cancel",
            variant: "outlineBlack",
            onClick: () => setCommentOpen(false),
          },
          {
            key: "add",
            label: "Add comment",
            variant: "primary",
            onClick: () => {
              onComment?.(id, commentText);
              setCommentOpen(false);
            },
          },
        ]}
      >
        <div className="space-y-3">
          <TextInput
            value={commentText}
            onChange={setCommentText}
            placeholder="Write your comment..."
            ariaLabel="Comment input"
          />
        </div>
      </Modal>
      {toastOpen && (
        <div className="fixed right-6 bottom-6 z-50" aria-live="polite">
          <div
            role="status"
            className="bg-[#47B960] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 cursor-pointer transform transition duration-300"
            onClick={() => {
              setToastOpen(false);
              if (toastTimer.current) {
                clearTimeout(toastTimer.current);
                toastTimer.current = null;
              }
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
            >
              <path
                d="M8.5 13.5L4 9l1.2-1.2L8.5 11.1l6.3-6.3L16 6l-7.5 7.5z"
                fill="white"
              />
            </svg>
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        </div>
      )}
    </article>
  );
}

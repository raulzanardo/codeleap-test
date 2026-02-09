type PostProps = {
  id?: number | string;
  title: string;
  username?: string | null;
  created_datetime?: string;
  content: string;
  onEdit?: (id?: number | string) => void;
  onDelete?: (id?: number | string) => void;
  className?: string;
};

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
  return (
    <article
      className={`bg-white rounded-2xl border border-[#999999] overflow-hidden ${className}`}
    >
      <header className="bg-primary text-white px-6 py-4 flex items-center justify-between border-b border-primary">
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="flex items-center gap-3">
          <button
            aria-label="Delete"
            onClick={() => onDelete?.(id)}
            className="p-2 rounded hover:bg-white/20"
          >
            {/* simple trash icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22"
              />
            </svg>
          </button>
          <button
            aria-label="Edit"
            onClick={() => onEdit?.(id)}
            className="p-2 rounded hover:bg-white/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"
              />
            </svg>
          </button>
        </div>
      </header>

      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="text-sm text-gray-500">
            @{username ?? "Anonymous"}
          </div>
          <div className="text-xs text-gray-500">
            {created_datetime
              ? new Date(created_datetime).toLocaleString()
              : ""}
          </div>
        </div>

        <div className="mt-4 text-gray-800 text-base leading-relaxed whitespace-pre-wrap">
          {content}
        </div>
      </div>
    </article>
  );
}

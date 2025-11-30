import { motion } from "framer-motion";

function ForumPostCard({ post }) {
  return (
    <motion.div
      layout
      whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(0,0,0,0.08)" }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="card flex flex-col gap-3"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-forest-light to-forest-main flex items-center justify-center text-lg">
          👤
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold text-forest-dark">
            {post.authorName}
          </p>
          <p className="text-[11px] text-gray-600">
            {post.campus} • {post.city}
          </p>
        </div>
        <p className="text-[11px] text-gray-500">{post.createdAtRelative}</p>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-forest-dark mb-1 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-xs text-gray-700 line-clamp-3">{post.content}</p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 rounded-full bg-forest-pale text-[10px] font-semibold text-forest-dark"
          >
            #{tag}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-4 text-[11px] text-gray-600 pt-2 border-t border-gray-200">
        <span className="flex items-center gap-1">❤️ {post.likes}</span>
        <span className="flex items-center gap-1">
          💬 {post.commentsCount} komentar
        </span>
      </div>
    </motion.div>
  );
}

export default ForumPostCard;

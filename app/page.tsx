"use client";

import { useEffect, useState } from "react";

interface Blog {
  _id: string;
  title: string;
  subtitle: string;
}

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blog");
        if (res.ok) {
          const data = await res.json();
          setBlogs(data);
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Latest Blogs</h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="grid gap-6">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog._id} className="p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold">{blog.title}</h2>
                <p className="text-gray-600">{blog.subtitle}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No blogs found.</p>
          )}
        </div>
      )}
    </div>
  );
}
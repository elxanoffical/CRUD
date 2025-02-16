import React from 'react';

interface BlogCardProps {
  title: string;
  subtitle: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, subtitle }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition duration-300">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <p className="text-gray-600 mt-2">{subtitle}</p>
    </div>
  );
};

export default BlogCard;
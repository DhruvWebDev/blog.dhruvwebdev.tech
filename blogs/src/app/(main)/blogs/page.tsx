'use client'
import { BlogCard } from '@/components/blog-card';
import { useEffect, useState } from 'react';

interface BlogPost {
  id: string;
  icon: string | null;
  cover: string | null;
  created_time: string;
  title: string;
  description: string;
  category: string;
}

interface ApiResponse {
  data: BlogPost[];
}

const BlogsPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        console.log('Fetching started...');
        
        const res = await fetch('/api/v1/blogs');
        const responseData: ApiResponse = await res.json();
        console.log('Parsed response:', responseData);
        
        if (!responseData.data || !Array.isArray(responseData.data)) {
          throw new Error('Invalid response format');
        }

        console.log('Setting posts state with:', responseData.data);
        setPosts(responseData.data);
        
      } catch (err) {
        console.error('Error in fetchContent:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
        <p>No posts available</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          Latest Insights ({posts.length} posts)
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default BlogsPage;
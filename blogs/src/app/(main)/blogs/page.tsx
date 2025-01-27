'use client'
import { useEffect, useState } from 'react';

const BlogsPage = () => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response1 = await fetch('/api/v1/blogs');
        if (!response1.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response1.json();
        setResponse(data);
        console.log(response)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <div>${response}</div>;
};

export default BlogsPage;


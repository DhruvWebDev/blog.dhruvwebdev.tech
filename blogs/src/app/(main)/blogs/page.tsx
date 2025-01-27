
import { useEffect, useState } from 'react';

const BlogsPage = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/v1/blogs');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        setHtmlContent(response);
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

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default BlogsPage;


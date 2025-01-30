'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const BlogPage = () => {
  const { id } = useParams<{ id: string }>();
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`/api/v1/blogs/${id}`);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setHtmlContent(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchContent();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">Error</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <div 
        className="prose dark:prose-invert prose-lg max-w-none
          prose-headings:font-bold prose-headings:text-foreground
          prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
          prose-p:text-muted-foreground prose-p:leading-relaxed
          prose-a:text-primary hover:prose-a:text-primary/80 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-foreground prose-strong:font-semibold
          prose-ul:text-muted-foreground prose-ol:text-muted-foreground
          prose-blockquote:border-l-4 prose-blockquote:border-muted
          prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground
          prose-code:text-foreground prose-code:bg-muted/50 prose-code:px-1 prose-code:rounded
          prose-pre:bg-muted prose-pre:text-muted-foreground prose-pre:p-4 prose-pre:rounded-lg
          prose-img:rounded-lg prose-img:shadow-md
          prose-table:border-collapse prose-table:w-full
          prose-th:border prose-th:border-border prose-th:p-2 prose-th:bg-muted
          prose-td:border prose-td:border-border prose-td:p-2
          [&_.notion-callout]:bg-card [&_.notion-callout]:p-4 [&_.notion-callout]:rounded-lg
          [&_.notion-page-cover]:w-full [&_.notion-page-cover]:h-64 [&_.notion-page-cover]:object-cover
          [&_.notion-collection]:overflow-x-auto
          [&_.notion-code]:font-mono [&_.notion-code]:text-sm
          [&_.notion-bookmark]:border [&_.notion-bookmark]:border-border [&_.notion-bookmark]:rounded-lg [&_.notion-bookmark]:p-4
          [&_.notion-column_list]:flex [&_.notion-column_list]:gap-4 [&_.notion-column_list]:flex-wrap
          [&_.notion-column]:flex-1 [&_.notion-column]:min-w-[250px]
          selection:bg-primary/20"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
};

export default BlogPage;
import { NextApiRequest, NextApiResponse } from 'next';
import { notion } from '../../../../../lib/notion/client';
import { NotionRenderer } from '@notion-render/client';
import { getPageContent, getSubPagesWithContent } from '@/lib/utils';

const renderer = new NotionRenderer({ client: notion });

interface SubPage {
  id: string;
  title: string;
  url: string;
  content: string;
  children: SubPage[];
}


export async function GET(req: NextApiRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Get main page content
    const mainContent = await getPageContent(id);

    // Get sub-pages with their content
    const subPages = await getSubPagesWithContent(id);

    // Create a complete response
    const response = {
      content: mainContent,
      subPages: subPages,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

// Ex
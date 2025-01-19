import { NextApiRequest, NextApiResponse } from 'next';
import { notion } from '../../../../../lib/notion/client';

export async function GET(req: NextApiRequest, { params }: { params: { id: string } }) {
  try {
    // Extract the pageId from the URL params (like /blogs/1234)
    const { id } = params;

    // Retrieve the specific page by its ID
    const myPage = await notion.pages.retrieve({
      page_id: id,  // Use the id from the URL
    });

    // Return the page details to the client using new Response()
    return new Response(JSON.stringify(myPage), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    if (error?.code === APIErrorCode.ObjectNotFound) {
      // Handle page not found error
      return new Response(
        JSON.stringify({ error: 'Page not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      // Handle other errors
      console.error(error);
      return new Response(
        JSON.stringify({ error: 'Internal Server Error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }
}

'use server'
import { NextRequest } from 'next/server';
import { getPageContent } from '@/lib/utils';

// For [...id] route
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const blogId = params?.id;
    console.log(params.id)  // No need to await params.id
    
    // Fetch the main content using the blogId
    const mainContent = await getPageContent(blogId);
    // console.log('Main Content:', JSON.stringify(mainContent));
    // Stringify the mainContent before returning
    return new Response(JSON.stringify(mainContent), {
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

import { NextRequest } from "next/server"; // Changed from NextApiRequest
import { notion } from "@/lib/notion/client";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const databaseId = process.env.NEXT_DATABASE_URL;

    if (!databaseId) {
      throw new Error("Database ID is not configured");
    }

    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const parseResponse = response.results.map((p: any) => {
      try {
        const { id, properties, icon, cover, created_time } = p;
        
        // Safely access nested properties with null checks
        return {
          redirectUrl: `/${id}`,
          id,
          icon: icon?.emoji || null,
          cover: cover?.external?.url || cover?.file?.url || null,
          created_time,
          title: properties.Title?.rich_text[0]?.plain_text || 'Untitled',
          description: properties.Description?.rich_text[0]?.plain_text || '',
          category: properties.category?.multi_select[0]?.name || 'Uncategorized'
        };
      } catch (err) {
        console.error('Error parsing page:', err);
        // Return a default object if parsing fails for a specific item
        return {
          redirectUrl: id,
          id,
          icon: null,
          cover: null,
          created_time: null,
          title: 'Error parsing page',
          description: '',
          category: 'Uncategorized'
        };
      }
    });

    console.log(parseResponse);
    return new Response(JSON.stringify(parseResponse), {
      status: 200
    })

  } catch (error) {
    console.error('Failed to fetch from Notion:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from Notion' }, 
      { status: 500 }
    );
  }
}
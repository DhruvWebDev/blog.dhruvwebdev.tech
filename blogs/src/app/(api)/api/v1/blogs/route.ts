import { NextRequest } from "next/server";
import { notion } from "@/lib/notion/client";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const databaseId = process.env.NEXT_DATABASE_URL;

    if (!databaseId) {
      return NextResponse.json(
        { error: "Database ID is not configured" },
        { status: 400 }
      );
    }

    const response = await notion.databases.query({
      database_id: databaseId,
    });
    

    const parseResponse = response.results.map((p: any) => {
      try {
        const { id, properties, icon, cover, created_time } = p;
        
        return {
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
        return {
          id: 'error',
          icon: null,
          cover: null,
          created_time: null,
          title: 'Error parsing page',
          description: '',
          category: 'Uncategorized'
        };
      }
    });
    return NextResponse.json(
      { data: parseResponse },
      { status: 200 }
    );

  } catch (error) {
    console.error('Failed to fetch from Notion:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from Notion' }, 
      { status: 500 }
    );
  }
}
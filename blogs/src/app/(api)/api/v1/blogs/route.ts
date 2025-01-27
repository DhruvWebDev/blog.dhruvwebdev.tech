import { NextApiRequest } from "next";
import { notion } from "../../../../lib/notion/client";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  try {
    const databaseId = process.env.NEXT_DATABASE_URL;

    const response = await notion.databases.query({
      database_id: databaseId as string,
    });

    const htmlContent = await renderer.render(...results);
    console.log(htmlContent);

    // Return the sorted pages to the client using NextResponse
    return NextResponse.json(htmlContent, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

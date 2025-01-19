import { notion } from "../../../../lib/notion/client";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req:NextApiRequest, res:NextApiResponse){
    try {
        // Replace with your database ID
        const databaseId = process.env.NEXT_DATABASE_URL;
    
        // Query the database and sort by timestamp (e.g., 'Date' property)
        const response = await notion.databases.query({
          database_id: databaseId as string,
          sorts: [
            {
              property: 'Created', // The name of your timestamp property
              direction: 'ascending', // or 'descending'
            },
          ],
        });
    
        // Return the sorted pages to the client
        return res.status(200).json(response.results);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }
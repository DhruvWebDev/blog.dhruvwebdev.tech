import { Client } from "@notionhq/client";

export const notion = new Client({ auth: process.env.NEXT_NOTION_SECRET });

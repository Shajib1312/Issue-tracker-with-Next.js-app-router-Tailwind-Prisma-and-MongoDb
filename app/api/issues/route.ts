import { connectToDb } from "@utils";
import { z } from "zod";
import prisma from "../../../prisma/index";

const createIssueSchema = z.object({
  title: z.string().min(1).max(360),
  description: z.string().min(1),
});

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);

    if (!validation.success) {
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 400,
      });
    }

    await connectToDb();

    const newIssue = await prisma.issue.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return new Response(JSON.stringify(newIssue), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
};

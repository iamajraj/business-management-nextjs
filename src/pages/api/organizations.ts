import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name } = req.body;

    const organization = await prisma.organization.create({
      data: {
        name,
      },
    });

    return res.status(201).json(organization);
  } else if (req.method === "GET") {
    const organizations = await prisma.organization.findMany();
    return res.status(200).json(organizations);
  }
}

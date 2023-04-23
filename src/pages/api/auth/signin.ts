import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/db";
import { setCookie } from "cookies-next";
import { sign } from "../../../lib/jwtService";
import bcryptjs from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password, loginFor } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide your credentials",
      });
    }

    let user;
    let user_type;

    if (loginFor === "admin") {
      user = await prisma.admin.findUnique({
        where: {
          email,
        },
      });
      user_type = "admin";
    } else if (loginFor === "employee") {
      user = await prisma.employee.findUnique({
        where: {
          email,
        },
      });
      user_type = user?.user_type;
    } else {
      return res.status(400).json({ message: "Bad request" });
    }

    if (!user || !user_type)
      return res.status(404).json({ message: "User not found" });

    const passwordMatched = await bcryptjs.compare(password, user.password);

    if (!passwordMatched)
      return res.status(401).json({ message: "Invalid credentials" });

    user = {
      id: user.id,
      name: user.name,
      email: user.email,
      user_type: user_type,
    };

    const token = await sign(user);

    setCookie("token", token, {
      req,
      res,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
      secure: process.env.NODE_ENV === "production",
    });
    return res.json(user);
  }
}

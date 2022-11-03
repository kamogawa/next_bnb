import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import Data from "../../../lib/data";
import { StoredUserType } from "../../../types/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const accessToken = req.headers.cookie;
      if (!accessToken) {
        res.statusCode = 404;
        return res.send("access_tokenがありません。");
      }
      const userId = jwt.verify(accessToken, "test_secret");
      const user = await Data.user.find({ id: Number(userId) });
      if (!user) {
        res.statusCode = 404;
        return res.send("ユーザーがありません");
      }
      const userWithoutPassword: Partial<Pick<StoredUserType, "password">> = user;
      delete userWithoutPassword.password;
      res.statusCode = 200;
      return res.send(userWithoutPassword);
    } catch (e) {
      res.statusCode = 500;
      return res.send(e);
    }
  }
  res.statusCode = 405;

  return res.end();
};

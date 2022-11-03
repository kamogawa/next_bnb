import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Data from "../../../lib/data";
import { StoredUserType } from "../../../types/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.statusCode = 400;
        return res.send("必須パラメーターがありません。");
      }

      const user = Data.user.find({ email });

      if (!user || !bcrypt.compareSync(password, user.password)) {
        res.statusCode = 404;
        return res.send("パスワードの不一致または、一致するユーザーがありません");
      }

      const token = jwt.sign(String(user.id), "test_secret");

      res.setHeader(
        "Set-Cookie",
        `access_token=${token}; Path=/; Expires=${new Date(
          Date.now() + 60 * 60 * 24 * 1000 * 3 //3일
        ).toUTCString()}; HttpOnly`
      );

      const userWithoutPassword: Partial<Pick<StoredUserType, "password">> = user;

      delete userWithoutPassword.password;
      res.statusCode = 200;
      return res.send(user);
    } catch (e) {
      console.log(e);
      res.statusCode = 500;
      return res.send(e);
    }
  }

  return res.end();
};

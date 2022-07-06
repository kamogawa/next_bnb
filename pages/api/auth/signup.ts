import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import Data from "../../../lib/data";
import { SingUpAPIBody } from "../../../types/api/auth";
import { StoredUserType } from "../../../types/user";

export default async (req: NextApiRequest, res:NextApiResponse) => {
  if (req.method === "POST") {
    const {
      body,
    }: {
      body: SingUpAPIBody;
    } = req;
    const { email, firstname, lastname, password, birthday } = body;
    if (!email || !firstname || !lastname || !password || !birthday) {
      res.statusCode = 400;
      return res.send("필수 데이터가 없습니다.");
    }
    if (Data.user.exist({ email })) {
      res.statusCode = 409;
      res.send("同録されたユーザーです。");
    }
    const hashedPassword = bcrypt.hashSync(password, 8);

    const users = Data.user.getList();
    let userId;

    if (users.length === 0) {
      userId = 1;
    } else {
      userId = users[users.length - 1].id + 1;
    }

    const newUser: StoredUserType = {
      id: userId,
      email,
      firstname,
      lastname,
      password: hashedPassword,
      birthday,
      profileImage: "/static/image/default_user_profile_image.jpg"
    };

    Data.user.write([...users, newUser]);

    return res.end();
  }
  res.statusCode = 405;

  return res.end();
};

import axios from "axios";
import { SingUpAPIBody } from "../../types/api/auth";
import { UserType } from "../../types/user";

export const signupAPI = (body: SingUpAPIBody) => {
  axios.post<UserType>("/api/auth/signup", body);
};

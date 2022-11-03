import axios from "axios";
import { SingUpAPIBody } from "../../types/api/auth";
import { UserType } from "../../types/user";

export const signupAPI = (body: SingUpAPIBody) => {
  return axios.post<UserType>("/api/auth/signup", body);
};

export const loginAPI = (body: { email: string; password: string }) => {
  return axios.post<UserType>("/api/auth/login", body);
};

export const meAPI = () => axios.get<UserType>("http://localhost:3000/api/auth/me");

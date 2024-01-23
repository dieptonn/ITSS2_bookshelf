import { LoginPayload, RegisterPayload } from "../models/auth";
import { axiosClient } from "./axios-cilent";

export const authApi = {
  login(payload: LoginPayload) {
    return axiosClient.post(`/auth/authenticate`, payload);
  },
  register(payload: RegisterPayload) {
    return axiosClient.post(`/auth/register`, payload);
  },
};

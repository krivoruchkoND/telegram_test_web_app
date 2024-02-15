import camelcaseKeys from "camelcase-keys";

import baseInstance from "./baseInstance";

export const auth = async (initData: string) => {
  const response = await baseInstance.post<{
    access_token: string;
    token_type: "Bearer";
  }>(`/auth/jwt/telegram/${initData}`);

  baseInstance.defaults.headers.common["Authorization"] =
    `Bearer ${response.data.access_token}`;

  return camelcaseKeys(response.data);
};

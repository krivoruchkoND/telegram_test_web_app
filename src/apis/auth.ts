import camelcaseKeys from "camelcase-keys";

import baseInstance, { updateBearer } from "./baseInstance";

export const auth = async (initData: string) => {
  const response = await baseInstance.post<{
    access_token: string;
    token_type: "Bearer";
  }>(`/auth/jwt/telegram/${initData}`);

  updateBearer(response.data.access_token);

  return camelcaseKeys(response.data);
};

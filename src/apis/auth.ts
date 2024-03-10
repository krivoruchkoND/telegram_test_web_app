import camelcaseKeys from "camelcase-keys";

// import buildMockResponse from "@/utils/buildMockResponse";

import baseInstance, { updateBearer } from "./baseInstance";

export const auth = async (initData: string) => {
  const response = await baseInstance.post<{
    access_token: string;
    token_type: "Bearer";
  }>(`/auth/jwt/telegram/${initData}`);

  // const mockResponse = await buildMockResponse(
  //   {
  //     access_token: "access_token",
  //   },
  //   "/auth/jwt/",
  // );

  updateBearer(response.data.access_token);

  return camelcaseKeys(response.data);
};

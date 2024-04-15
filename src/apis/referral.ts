import camelcaseKeys from "camelcase-keys";

import baseInstance from "./baseInstance";

type Referral = {
  url: string;
  invitees_count: number;
  reward: number;
  total_claimed_reward: number;
};

type ReferralReward = {
  transaction: {
    signature: string;
    url_scanner: string;
    create_at: string;
  };
  referral_data: Referral;
  message: string;
};

export const getReferral = async () => {
  const response = await baseInstance.get<Referral>(`/referral/`);
  return camelcaseKeys(response.data, { deep: true });
};

export const claimReferralReward = async () => {
  const response = await baseInstance.post<ReferralReward>(
    `/referral/claim_referral_reward`,
  );
  return camelcaseKeys(response.data, { deep: true });
};

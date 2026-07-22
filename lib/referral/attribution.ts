const REFERRAL_CODE_KEY = "meuse-referral-code";

export function saveReferralCode(code: string) {
  if (typeof window === "undefined") return;
  const trimmed = code.trim();
  if (!trimmed) return;
  localStorage.setItem(REFERRAL_CODE_KEY, trimmed);
}

export function getReferralCode(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(REFERRAL_CODE_KEY);
  } catch {
    return null;
  }
}

export function clearReferralCode() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(REFERRAL_CODE_KEY);
}

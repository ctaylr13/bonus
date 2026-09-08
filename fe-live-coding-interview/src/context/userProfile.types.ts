export type Locale = "UK" | "US" | "AU";
export type Theme = "light" | "dark" | "system";

export type UserProfile = {
  locale: Locale;
  theme: Theme;
};

export type UserProfileContextValue = {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  localeConfig: { locale: string; timeZone: string; label: string };
};

export const LOCALE_CONFIG: Record<
  Locale,
  { locale: string; timeZone: string; label: string }
> = {
  UK: { locale: "en-GB", timeZone: "Europe/London", label: "United Kingdom" },
  US: { locale: "en-US", timeZone: "America/New_York", label: "United States" },
  AU: { locale: "en-AU", timeZone: "Australia/Sydney", label: "Australia" },
};

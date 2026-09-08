import { useState, useEffect } from "react";
import { UserProfileContext } from "./userProfile.context";
import {
  LOCALE_CONFIG,
  type Locale,
  type Theme,
  type UserProfile,
} from "./userProfile.types";

const STORAGE_KEY = "userProfile";
const VALID_LOCALES: Locale[] = ["UK", "US", "AU"];
const VALID_THEMES: Theme[] = ["light", "dark", "system"];

function loadProfile(): UserProfile {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as UserProfile;
      if (
        VALID_LOCALES.includes(parsed.locale) &&
        VALID_THEMES.includes(parsed.theme)
      ) {
        return parsed;
      }
    }
  } catch {
    return { locale: "UK", theme: "system" };
  }
  return { locale: "UK", theme: "system" };
}

function applyTheme(theme: Theme) {
  if (theme === "system") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", theme);
  }
}

export function UserProfileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, setProfile] = useState<UserProfile>(loadProfile);

  useEffect(() => {
    applyTheme(profile.theme);
  }, [profile.theme]);

  function updateProfile(updates: Partial<UserProfile>) {
    setProfile((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  return (
    <UserProfileContext.Provider
      value={{
        profile,
        updateProfile,
        localeConfig: LOCALE_CONFIG[profile.locale],
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}

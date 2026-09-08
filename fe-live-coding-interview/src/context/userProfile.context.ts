import { createContext } from "react";
import type { UserProfileContextValue } from "./userProfile.types";

export const UserProfileContext = createContext<UserProfileContextValue | null>(
  null,
);

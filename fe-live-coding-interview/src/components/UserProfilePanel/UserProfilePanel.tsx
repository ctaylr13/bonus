import { useUserProfile } from "../../context/useUserProfile";
import {
  LOCALE_CONFIG,
  type Locale,
  type Theme,
} from "../../context/userProfile.types";
import styles from "./UserProfilePanel.module.css";

type UserProfilePanelProps = {
  onClose: () => void;
};

const THEME_OPTIONS: { value: Theme; label: string; icon: string }[] = [
  { value: "light", label: "Light", icon: "☀️" },
  { value: "dark", label: "Dark", icon: "🌙" },
  { value: "system", label: "System", icon: "💻" },
];

export function UserProfilePanel({ onClose }: UserProfilePanelProps) {
  const { profile, updateProfile } = useUserProfile();

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <aside className={styles.panel} aria-label="User profile">
        <div className={styles.header}>
          <h2 className={styles.title}>User Profile</h2>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close profile"
          >
            ✕
          </button>
        </div>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Appearance</h3>
          <p className={styles.sectionDescription}>
            Choose the color theme for the app.
          </p>
          <div className={styles.themeOptions}>
            {THEME_OPTIONS.map(({ value, label, icon }) => (
              <label key={value} className={styles.themeOption}>
                <input
                  type="radio"
                  name="theme"
                  value={value}
                  checked={profile.theme === value}
                  onChange={() => updateProfile({ theme: value })}
                  className={styles.radio}
                />
                <span className={styles.themeIcon}>{icon}</span>
                <span className={styles.themeLabel}>{label}</span>
              </label>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Locale</h3>
          <p className={styles.sectionDescription}>
            Sets the timezone and date format for flight times.
          </p>
          <div className={styles.options}>
            {(Object.keys(LOCALE_CONFIG) as Locale[]).map((key) => (
              <label key={key} className={styles.option}>
                <input
                  type="radio"
                  name="locale"
                  value={key}
                  checked={profile.locale === key}
                  onChange={() => updateProfile({ locale: key })}
                  className={styles.radio}
                />
                <span className={styles.optionLabel}>
                  <span className={styles.optionKey}>{key}</span>
                  <span className={styles.optionName}>
                    {LOCALE_CONFIG[key].label}
                  </span>
                  <span className={styles.optionTz}>
                    {LOCALE_CONFIG[key].timeZone}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </section>
      </aside>
    </>
  );
}

import styles from "./Avatar.module.css";

interface AvatarProps {
  onClick: () => void;
}

export function Avatar({ onClick }: AvatarProps) {
  return (
    <button
      className={styles.avatar}
      onClick={onClick}
      aria-label="Open user profile"
    >
      U
    </button>
  );
}

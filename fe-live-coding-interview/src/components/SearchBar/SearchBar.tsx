import { useState, useEffect, useRef } from "react";
import { useKeyDown } from "../../hooks/useKeyDown";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSearch: (flightId: string) => void;
  onClear: () => void;
  isLoading: boolean;
  focusWhenReady?: boolean;
}

export function SearchBar({
  onSearch,
  onClear,
  isLoading,
  focusWhenReady,
}: SearchBarProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focusWhenReady && !isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focusWhenReady, isLoading]);

  useKeyDown("Escape", () => {
    setValue("");
    onClear();
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) {
      onSearch(trimmed);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter flight ID (e.g. AA123)"
        disabled={isLoading}
      />
      <button className={styles.button} type="submit" disabled={isLoading}>
        {isLoading ? "Searching…" : "Search"}
      </button>
    </form>
  );
}

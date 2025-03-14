/** @format */

import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./Filter.module.css";

export default function Filter() {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    if (inputValue) {
      router.push(`/?q=${inputValue}`);
    }
  };

  return (
    <div className={styles.filter}>
      <input
        type="text"
        placeholder="Type a name and press search..."
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

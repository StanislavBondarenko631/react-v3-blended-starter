import { FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";

import style from "./Form.module.css";

import { useState } from "react";

interface FormProps {
  onSubmit: (query: string) => void;
}

export default function Form({ onSubmit }: FormProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (query.trim() === "") {
      toast.error("Please enter your search query.");
      return;
    }

    onSubmit(query);
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className={style.input}
        placeholder="What do you want to write?"
        name="search"
        autoFocus
      />

      <button className={style.button} type="submit">
        <FiSearch size="16px" />
      </button>
    </form>
  );
}

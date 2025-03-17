/** @format */

import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { User } from "../types";
import Filter from "@/components/Filter/Filter";
import { useSearchParams } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import UserCard from "@/components/UserCard/UserCard";

import "react-loading-skeleton/dist/skeleton.css";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const params = useSearchParams();

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      let url = "https://api.github.com/users";
      const query = params.get("q");
      if (query) {
        url = `https://api.github.com/search/users?q=${query}`;
      }
      try {
        const response = await fetch(url);
        const data = await response.json();

        //This is to handle the case when the query is present, response model is different
        setUsers(query ? data.items : data);
        setLoading(false);
      } catch (error) {
        console.error("An error occurred", error);
        setLoading(false);
      }
    };

    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);

    init();
  }, [params]);

  const toggleFavorite = (userId: string) => {
    let updatedFavorites;
    if (favorites.includes(userId)) {
      updatedFavorites = favorites.filter((id) => id !== userId);
    } else {
      updatedFavorites = [...favorites, userId];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className={styles.body}>
      <h1 className={styles.heading}>GitHub Users</h1>
      <Filter />
      {loading ? (
        <div className={styles.grid}>
          {Array.from({ length: 12 }).map((_, index) => (
            <Skeleton
              key={index}
              count={1}
              height={150}
              className={styles.skeleton}
            />
          ))}
        </div>
      ) : (
        <div className={styles.grid}>
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              isFavorite={favorites.includes(user.id.toString())}
              onToggleFavorite={() => toggleFavorite(user.id.toString())}
            />
          ))}
        </div>
      )}
    </div>
  );
}

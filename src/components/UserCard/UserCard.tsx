/** @format */

import React from "react";
import Image from "next/image";
import styles from "./UserCard.module.css";
import { User } from "@/types";
import { FaStar, FaRegStar } from "react-icons/fa";
import Link from "next/link";

interface UserCardProps {
  user: User;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <div className={styles.card}>
      <Image
        src={user.avatar_url}
        alt={user.login}
        width={250}
        height={250}
        className={styles.avatar}
      />
      <div className={styles.cardBody}>
        <h2>{user.login}</h2>
        <Link href={`/${user.id}`}>View profile</Link>
        <button onClick={onToggleFavorite} className={styles.favoriteButton}>
          {isFavorite ? <FaStar /> : <FaRegStar />}
        </button>
      </div>
    </div>
  );
};

export default UserCard;

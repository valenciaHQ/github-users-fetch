/** @format */

import { User } from "@/types";
import Image from "next/image";

import styles from "./UserCard.module.css";
import Link from "next/link";

export default function UserCard({ user }: { user: User }) {
  return (
    <div key={user.id} className={styles.card}>
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
      </div>
    </div>
  );
}

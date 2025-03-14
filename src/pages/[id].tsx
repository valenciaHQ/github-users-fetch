/** @format */

import Image from "next/image";
import { User } from "../types";
import Link from "next/link";
import styles from "@/styles/UserDetail.module.css";

export default function Page({ data }: { data: User }) {
  return (
    <main className={styles.container}>
      <Link href={"/"}>Back to list</Link>
      <section className={styles.body}>
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <h1>{data.login}</h1>
            <h2>{data.name}</h2>
          </div>

          <p>Now working in : {data.company}</p>
          <p>{data.bio}</p>
          <Image
            src={data.avatar_url}
            alt={data.login}
            className={styles.avatar}
            width={200}
            height={200}
          />
          <p>Living in {data.location}</p>
          <div>
            <p>Followers: {data.followers}</p>
            <p>Following: {data.following}</p>
            <p>Public Repos: {data.public_repos}</p>
          </div>
        </div>
      </section>
    </main>
  );
}

// This gets called on every request
export async function getServerSideProps({
  params,
}: {
  params: { id: string };
}) {
  console.log(params);
  // Fetch data from external API
  const res = await fetch(`https://api.github.com/users/${params.id}`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

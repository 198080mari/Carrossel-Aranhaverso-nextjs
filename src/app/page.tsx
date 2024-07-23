import HeroesList from "@/components/HeroesList/index";
import { IHeroData } from "@/interfaces/heroes";
import styles from "./page.module.scss";

async function getData(): Promise<IHeroData[]> {
  try {
    const res = await fetch(
      "https://669972c62069c438cd7251e5.mockapi.io/api/heroes"
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation: ", error);
    return [];
  }
}

export default async function Home() {
  const heroes = await getData();

  return (
    <main className={styles.main}>
      <HeroesList heroes={heroes} />
    </main>
  );
}

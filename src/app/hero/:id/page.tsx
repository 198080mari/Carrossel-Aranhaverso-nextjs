"use client";

import Carousel from "@/components/Carousel";
import { IHeroData } from "@/interfaces/heroes";

interface IProps {
  params: {
    id: string;
  };
}

async function getData(): Promise<{ data: IHeroData[] }> {
  try {
    const res = await fetch(
      "https://669972c62069c438cd7251e5.mockapi.io/api/heroes"
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return { data };
  } catch (error) {
    console.error("There was a problem with the fetch operation: ", error);
    return { data: [] };
  }
}
export default async function Hero({ params: { id } }: IProps) {
  //async para fazer requisição da função anterior
  const heroes = await getData();

  return (
    <div>
      <Carousel heroes={heroes.data} activeId={id} />
    </div>
  );
}

//params é objeto

/*export default function Hero({ params: { id } }: IProps) {
 return <h1>carosel: {id}</h1>;
}*/

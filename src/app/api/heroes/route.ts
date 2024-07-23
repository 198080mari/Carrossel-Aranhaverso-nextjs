//route.ts
/*import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://669972c62069c438cd7251e5.mockapi.io/api/heroes"
  );
  /*const res = await fetch(
    "https://669972c62069c438cd7251e5.mockapi.io/api/heroes"
  );*/

/*const data = await res.json();

  return NextResponse.json({ data }); //retornar informações heroi,  ({ data: data[0] }) retornaria só primeiro
}*/

/*import { NextResponse } from "next/server";

import JSONData from "./heroes.json";

export async function GET() {
  let res = await fetch(`${process.env.API_URL}/api/heroes`);
  let data = await res.json();

  if (!data) {
    data = JSONData;
  }

  return NextResponse.json({ data });
}*/

import { NextResponse } from "next/server";
import data from "./heroes.json";

export async function GET() {
  //get para listagem da função

  return NextResponse.json({ data }); //retornar informações heroi,  ({ data: data[0] }) retornaria só primeiro
}

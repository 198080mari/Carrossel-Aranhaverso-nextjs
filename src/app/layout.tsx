/*import type { Metadata } from "next";
import Image from "next/image";
import "./globals.scss";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aranhaverso",
  description: "Carrossel do aranhaverso com react, nextjs e framer motion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <header>
          <Image src="../icons/menu.svg" alt="Menu" width={36} height={25} />

          <Link href="/">
            <Image
              src="../spider-logo.svg"
              alt="Spiderman"
              width={260}
              height={70}
            />
          </Link>
          <Image src="../icons/user.svg" alt="Login" width={36} height={36} />
        </header>
        {children}
      </body>
    </html>
  );
}*/

import "./globals.scss";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Spider-Verse",
  description:
    "Criando um carrossel parallax do Aranhaverso com React, Next.js 13 e Framer Motion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <header>
          <Image
            src="/icons/menu.svg"
            alt="Menu options"
            width={36}
            height={25}
            priority
          />
          <Link href="/">
            <Image
              src="/spider-logo.svg"
              alt="Spiderman"
              width={260}
              height={70}
              priority
            />
          </Link>
          <Image src="/icons/user.svg" alt="Login" width={36} height={36} />
        </header>
        {children}
      </body>
    </html>
  );
}

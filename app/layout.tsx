import type { Metadata } from "next"
import { M_PLUS_1 } from "next/font/google"
import "./global.css"
import Link from "next/link"
import React from "react"

const font = M_PLUS_1({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rag bot",
  description: "",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body style={{ ...font.style }}>
        <header
          style={{
            background: "#003f82",
            color: "#ffc000",
            fontWeight: "bold",
            padding: ".5rem",
            position: "fixed",
            width: "100%",
            zIndex: "2000",
          }}
        >
          <Link href={"/"}>RAG bot</Link>
        </header>
        <main
          style={{
            height: "100%",
            minHeight: "100dvh",
            paddingTop: "2rem",
          }}
        >
          <>{children}</>
        </main>
      </body>
    </html>
  )
}

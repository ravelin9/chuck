import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {Providers} from "@/app/providers";
import Navbar from "@/app/Navbar/Navbar";
import React from "react";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chuck Norris jokes',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={'light'}>
      <body className={inter.className}>
      <Providers>
          <Navbar />
          {children}
      </Providers>
      </body>
    </html>
  )
}

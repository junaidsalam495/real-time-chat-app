import { ThemeProvider } from "@/components/theme-provider"
import { Roboto } from 'next/font/google'
import "./globals.css"
import { Toaster } from "react-hot-toast"
import ReduxProvider from "@/providers/redux-providers"

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata = {
  title: "ChatApp - Connect with friends",
  description: "A modern chat application built with Next.js",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        <ReduxProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
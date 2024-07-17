import NavbarHeader from "@/components/navbar/navbar";
import { ThemeProvider } from "@/components/themeProvider";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <NavbarHeader />
        <Component {...pageProps} />
        <Toaster />
        <ScrollToTop />
      </ThemeProvider>
    </>
  );
}

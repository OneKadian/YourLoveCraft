import { Inter } from "next/font/google";
import "./globals.css";
import "./global.scss";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./components/Header";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Your Love Craft",
  description: "Nobody can write stories for you, better than you",
};
export default function RootLayout({ children}) {
  return (
    <ClerkProvider>
      <html lang="en">

        <body
          className={inter.className}
          // style={{ backgroundColor: "#F3F5F8" }}
        >
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

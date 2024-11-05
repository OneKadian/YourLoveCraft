import { Inter } from "next/font/google";
import "./globals.css";
import "./global.scss";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./components/Header";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Your Love Craft",
  description: "If you can believe, you can achieve",
};

export default function RootLayout({ children, className = "" }) {
  return (
    <ClerkProvider
      signInForceRedirectUrl="/gallery"
      signUpForceRedirectUrl="/onboarding"
    >
      <html lang="en">
        {/* <main className={`main relative overflow-hidden ${className}`}> */}

        {/* <main className={`main relative overflow-hidden`}> */}
        <body
          className={inter.className}
          // style={{ backgroundColor: "#F3F5F8" }}
        >
          <Header />
          {children}
        </body>
        {/* </main> */}
      </html>
    </ClerkProvider>
  );
}

import "./globals.css";
// import "../styles/css/styles.css";
// import "../styles/css/colors.css";
import Header from "@/components/ui/Header";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/ui/footer";
// import "@/lib/disableConsole";
export const metadata = {
  title: "Unicorn Real Estate",
  description: "Find properties in Qatar - Buy, Rent, Sell",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
       
        suppressHydrationWarning
      >
          <ToastContainer position="top-right" />
        <Suspense fallback={null}>
          <Header />
        </Suspense>
        {children}
       <Footer/>
      </body>
    </html>
  );
}

import "./globals.css";
import "../styles/css/styles.css";
import "../styles/css/colors.css";
import Header from "@/components/ui/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const metadata = {
  title: "Unicorn Real Estate",
  description: "Find properties in Qatar - Buy, Rent, Sell",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
       
        suppressHydrationWarning
      >
          <ToastContainer position="top-right" />
        <Header />
        {children}
       
      </body>
    </html>
  );
}

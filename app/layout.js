
import "./globals.css";
import Navbar from "./components/Navbar";
import { Providers } from "./provider";
import Footer from "./components/Footer";


export const metadata = {
  title: "Shop Kart",
  description: "Shop Kart",
};

export default function RootLayout({ children }) {
  return (
   
      <html lang="en">
        <head>
    
        {/* Corrected favicon path */}
        <link rel="icon" href="/img/logo.webp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
       
        </head>
        <body
         
        >
           <Providers>
          <Navbar />

          {children}
          <Footer />
          </Providers>
        </body>
      </html>
    
  );
}

import "./index.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "React App",
  description: "Web site created with Next.js.",
};
// <head>
//   <meta charSet="UTF-8" />
//   <link rel="icon" href="%PUBLIC_URL%/vite.ico" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//   <title>Vite + React + TS</title>
// </head>

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}

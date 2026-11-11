import type { Metadata, Viewport } from "next";
import {
  Instrument_Serif,
  Inter,
  JetBrains_Mono,
  Syne,
} from "next/font/google";
import "./styles/globals.scss";
import "@/app/case-study-tailwind.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://mahanteshpatil1214.github.io/mahanteshpatil/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Mahantesh Patil — Software Engineer & AI Systems Builder",
  description:
    "Portfolio of Mahantesh Patil — a software engineer architecting resilient distributed backends, LLM agents, and end-to-end products from data layer to interface.",
  keywords: [
    "Mahantesh Patil",
    "software engineer",
    "AI systems engineer",
    "distributed systems",
    "Spring Boot",
    "Java 21",
    "LangGraph",
    "Spring AI",
    "PostgreSQL",
    "PostGIS",
    "Neo4j",
    "Kafka",
    "Next.js",
    "portfolio",
  ],
  authors: [
    {
      name: "Mahantesh Patil",
      url: "https://github.com/MahanteshPatil1214",
    },
  ],
  creator: "Mahantesh Patil",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    title: "Mahantesh Patil — Software Engineer & AI Systems Builder",
    description:
      "Resilient distributed backends, LLM agents, and end-to-end products from data layer to interface.",
    siteName: "Mahantesh Patil",
    images: [
      {
        url: "portrait.jpg",
        width: 1024,
        height: 1024,
        alt: "Mahantesh Patil",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahantesh Patil — Software Engineer & AI Systems Builder",
    description:
      "Resilient distributed backends, LLM agents, and end-to-end products from data layer to interface.",
    images: ["portrait.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0e1013",
  colorScheme: "dark",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mahantesh Patil",
  jobTitle: "Software Engineer & AI Systems Builder",
  description:
    "Software engineer working across distributed backends, AI agents, and product engineering.",
  email: "mailto:patilmahantesh642@gmail.com",
  url: siteUrl,
  image: `${siteUrl.replace(/\/$/, "")}/portrait.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kalaburagi",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  sameAs: [
    "https://github.com/MahanteshPatil1214",
    "https://www.linkedin.com/in/mahanteshpatil642/",
  ],
  knowsAbout: [
    "Java",
    "Spring Boot",
    "Spring Cloud",
    "Kafka",
    "PostgreSQL",
    "PostGIS",
    "Neo4j",
    "Redis",
    "LangGraph",
    "Spring AI",
    "pgvector",
    "React",
    "Next.js",
    "Distributed systems",
    "AI agents",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js");`,
          }}
        />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}

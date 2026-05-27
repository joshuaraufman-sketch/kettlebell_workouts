import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kettlebell Workout Generator",
  description:
    "Generate practical, time-boxed kettlebell workouts tailored to your level, duration, and goal.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

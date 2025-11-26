import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Kuzi Sport",
    template: "%s | Kuzi Sport",
  },
  description: "Kuzi Sport.",
  icons: { icon: "/icon.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}

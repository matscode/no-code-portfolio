import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NCP Admin',
  description: 'Manage my portfolio',
};

export default function KeystaticLayout({
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

import Link from 'next/link';
export default function Navbar() {
  return (
    <nav className="mb-6">
      <Link href="/" className="text-lg font-medium">Home</Link>
    </nav>
  );
}
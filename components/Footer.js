import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#eceeff] py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#27187E] font-medium"
          >
            <span className="text-xl">🎫</span>
            Event buddy.
          </Link>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">
              Home
            </Link>
            <Link href="/about" className="hover:text-gray-900">
              About
            </Link>
            <Link href="/signup" className="hover:text-gray-900">
              Sign up
            </Link>
            <Link href="/policy" className="hover:text-gray-900">
              Privacy Policy
            </Link>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500 mt-6">
          © 2024 Event buddy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

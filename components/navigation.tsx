import Link from "next/link";

export const Navigation = () => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-black">
            RSC Demo
          </Link>
          <div className="flex space-x-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-black transition-colors"
            >
              Home
            </Link>
            <Link
              href="/posts"
              className="text-gray-600 hover:text-black transition-colors"
            >
              Posts
            </Link>
            <Link
              href="/users"
              className="text-gray-600 hover:text-black transition-colors"
            >
              Users
            </Link>
            <Link
              href="/boundary"
              className="text-gray-600 hover:text-black transition-colors"
            >
              RSC Boundary
            </Link>
            <Link
              href="/performance"
              className="text-gray-600 hover:text-black transition-colors"
            >
              Performance
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

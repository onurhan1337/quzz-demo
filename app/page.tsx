import { Navigation } from "@/components/navigation";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="container mx-auto px-6 py-12">
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-6 text-black">
            RSC Demo
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A comprehensive demonstration of React Server Components with
            advanced tracing, debugging, and performance monitoring using the
            quzz library.
          </p>

          <div className="bg-yellow-50 border border-yellow-200 p-4 max-w-2xl mx-auto">
            <div className="flex items-start space-x-3">
              <div className="text-yellow-600 text-xl">⚠️</div>
              <div>
                <h3 className="font-semibold text-yellow-800 mb-1">
                  Development Only
                </h3>
                <p className="text-sm text-yellow-700">
                  The quzz library works only in development mode. In production
                  builds, all tracing functionality is automatically disabled
                  for optimal performance.
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray-50 border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-4 text-black">
                Posts Feed
              </h2>
              <p className="text-gray-600 mb-4">
                Advanced posts RSC with comments integration, performance
                tracking, and configurable limits.
              </p>
              <Link
                href="/posts"
                className="inline-block bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors"
              >
                View Posts Demo
              </Link>
            </div>

            <div className="bg-gray-50 border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-4 text-black">
                Users Directory
              </h2>
              <p className="text-gray-600 mb-4">
                User management RSC with sorting options, post integration, and
                comprehensive user data display.
              </p>
              <Link
                href="/users"
                className="inline-block bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors"
              >
                View Users Demo
              </Link>
            </div>

            <div className="bg-gray-50 border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-4 text-black">
                RSCBoundary
              </h2>
              <p className="text-gray-600 mb-4">
                Fine-grained tracing control with RSCBoundary components, nested
                hierarchies, and custom performance thresholds.
              </p>
              <Link
                href="/boundary"
                className="inline-block bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors"
              >
                View Boundary Demo
              </Link>
            </div>

            <div className="bg-gray-50 border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-4 text-black">
                Performance Testing
              </h2>
              <p className="text-gray-600 mb-4">
                RSC performance benchmarks, memory usage analysis, and load
                testing with different complexity levels.
              </p>
              <Link
                href="/performance"
                className="inline-block bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors"
              >
                View Performance Demo
              </Link>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold mb-6 text-black">
              Features Demonstrated
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-black">
                  RSC Capabilities
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Server-side data fetching</li>
                  <li>• Multiple API orchestration</li>
                  <li>• Error handling and recovery</li>
                  <li>• Performance monitoring</li>
                  <li>• Memory usage tracking</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-black">
                  Quzz Tracing
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Component-level tracing</li>
                  <li>• Props and state logging</li>
                  <li>• API call monitoring</li>
                  <li>• Performance metrics</li>
                  <li>• Nested component hierarchies</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

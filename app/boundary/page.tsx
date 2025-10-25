import { RSCBoundaryExample } from "@/components/rsc-boundary-example";
import { Navigation } from "@/components/navigation";

export default function BoundaryPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="container mx-auto px-6 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-black">
            RSCBoundary Examples
          </h1>
          <p className="text-gray-600 text-lg">
            Fine-grained tracing control with RSCBoundary components
          </p>
        </header>

        <RSCBoundaryExample />
      </div>
    </div>
  );
}

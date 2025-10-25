import { PerformanceRSCWithTrace } from "@/components/performance-rsc";
import { Navigation } from "@/components/navigation";

export default function PerformancePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="container mx-auto px-6 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-black">
            Performance Testing
          </h1>
          <p className="text-gray-600 text-lg">
            RSC performance benchmarks and memory usage analysis
          </p>
        </header>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-6 tracking-tight text-black">
              Light Load Test
            </h2>
            <PerformanceRSCWithTrace testType="light" iterations={3} />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 tracking-tight text-black">
              Medium Load Test
            </h2>
            <PerformanceRSCWithTrace testType="medium" iterations={2} />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 tracking-tight text-black">
              Heavy Load Test
            </h2>
            <PerformanceRSCWithTrace testType="heavy" iterations={1} />
          </section>
        </div>
      </div>
    </div>
  );
}

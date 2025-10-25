import { UsersRSCWithTrace } from "@/components/users-rsc";
import { Navigation } from "@/components/navigation";

export default function UsersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="container mx-auto px-6 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-black">
            Users Directory
          </h1>
          <p className="text-gray-600 text-lg">
            User management RSC with sorting and post integration
          </p>
        </header>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-6 tracking-tight text-black">
              All Users (Sorted by Name)
            </h2>
            <UsersRSCWithTrace limit={9} includePosts={true} sortBy="name" />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 tracking-tight text-black">
              Users by City
            </h2>
            <UsersRSCWithTrace limit={6} includePosts={false} sortBy="city" />
          </section>
        </div>
      </div>
    </div>
  );
}

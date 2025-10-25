import { PostsRSCWithTrace } from "@/components/posts-rsc";
import { Navigation } from "@/components/navigation";

export default function PostsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="container mx-auto px-6 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-black">
            Posts Feed
          </h1>
          <p className="text-gray-600 text-lg">
            Advanced posts RSC with comments and performance tracking
          </p>
        </header>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-6 tracking-tight text-black">
              All Posts
            </h2>
            <PostsRSCWithTrace
              category="all"
              limit={15}
              includeComments={true}
            />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 tracking-tight text-black">
              Tech Posts
            </h2>
            <PostsRSCWithTrace
              category="tech"
              limit={8}
              includeComments={false}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

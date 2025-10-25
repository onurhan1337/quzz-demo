import { withRSCTrace } from "quzz";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const ExampleRSC = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );
  const posts: Post[] = await response.json();

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <article
          key={post.id}
          className="bg-white border border-gray-200 p-6 hover:border-gray-300 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-3 text-black tracking-tight">
            {post.title}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">{post.body}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Post #{post.id}</span>
            <span>User #{post.userId}</span>
          </div>
        </article>
      ))}
    </div>
  );
};

export const ExampleRSCWithTrace = withRSCTrace(ExampleRSC);

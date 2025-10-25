import { withRSCTrace } from "quzz";
import { Post } from "./example-rsc";

interface PostsRSCProps {
  category?: string;
  limit?: number;
  includeComments?: boolean;
}

export const PostsRSC = async ({
  category = "all",
  limit = 10,
  includeComments = false,
}: PostsRSCProps) => {
  const startTime = Date.now();

  const postsResponse = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`
  );
  const posts: Post[] = await postsResponse.json();

  let postsWithComments = posts;

  if (includeComments) {
    postsWithComments = await Promise.all(
      posts.slice(0, 5).map(async (post) => {
        const commentsResponse = await fetch(
          `https://jsonplaceholder.typicode.com/comments?postId=${post.id}&_limit=3`
        );
        const comments = await commentsResponse.json();
        return { ...post, comments };
      })
    );
  }

  const processingTime = Date.now() - startTime;

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-black">Posts Feed</h3>
          <span className="text-sm text-gray-500">
            {processingTime}ms • {posts.length} posts
          </span>
        </div>
        <div className="text-sm text-gray-600">
          Category: {category} • Comments:{" "}
          {includeComments ? "Enabled" : "Disabled"}
        </div>
      </div>

      <div className="grid gap-6">
        {postsWithComments.map((post: any) => (
          <article
            key={post.id}
            className="bg-white border border-gray-200 p-6 hover:border-gray-300 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-xl font-semibold text-black tracking-tight flex-1">
                {post.title}
              </h2>
              <span className="text-sm text-gray-500 ml-4">#{post.id}</span>
            </div>

            <p className="text-gray-600 leading-relaxed mb-4">{post.body}</p>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>User #{post.userId}</span>
              <span>Category: {category}</span>
            </div>

            {post.comments && post.comments.length > 0 && (
              <div className="border-t border-gray-100 pt-4">
                <h4 className="text-sm font-medium text-black mb-3">
                  Comments ({post.comments.length})
                </h4>
                <div className="space-y-3">
                  {post.comments.map((comment: any) => (
                    <div key={comment.id} className="bg-gray-50 p-3">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-black">
                          {comment.name}
                        </p>
                        <p className="text-xs text-gray-500">{comment.email}</p>
                      </div>
                      <p className="text-sm text-gray-600">{comment.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
};

export const PostsRSCWithTrace = withRSCTrace(PostsRSC);

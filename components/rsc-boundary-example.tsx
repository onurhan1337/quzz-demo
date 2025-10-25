import { RSCBoundary } from "quzz";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    city: string;
  };
  company: {
    name: string;
  };
}

interface Comment {
  id: number;
  name: string;
  body: string;
  email: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const UserCard = async ({ userId }: { userId: number }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  const user: User = await response.json();

  return (
    <div className="bg-white border border-gray-200 p-4">
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 bg-black text-white flex items-center justify-center text-sm font-bold">
          {user.name.charAt(0)}
        </div>
        <div>
          <h3 className="font-semibold text-black">{user.name}</h3>
          <p className="text-sm text-gray-600">@{user.username}</p>
        </div>
      </div>
      <div className="text-sm space-y-1">
        <p>
          <span className="text-gray-500">Email:</span> {user.email}
        </p>
        <p>
          <span className="text-gray-500">City:</span> {user.address.city}
        </p>
        <p>
          <span className="text-gray-500">Company:</span> {user.company.name}
        </p>
      </div>
    </div>
  );
};

const PostsList = async ({ userId }: { userId: number }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}&_limit=3`
  );
  const posts: Post[] = await response.json();

  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <div key={post.id} className="bg-white border border-gray-200 p-3">
          <h4 className="font-medium text-black text-sm mb-1">{post.title}</h4>
          <p className="text-xs text-gray-600 line-clamp-2">{post.body}</p>
        </div>
      ))}
    </div>
  );
};

const CommentsList = async ({ postId }: { postId: number }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}&_limit=2`
  );
  const comments: Comment[] = await response.json();

  return (
    <div className="space-y-2">
      {comments.map((comment: Comment) => (
        <div key={comment.id} className="bg-gray-50 p-2">
          <p className="text-xs font-medium text-black">{comment.name}</p>
          <p className="text-xs text-gray-600">{comment.body}</p>
        </div>
      ))}
    </div>
  );
};

export const RSCBoundaryExample = () => {
  return (
    <div className="space-y-8">
      <div className="bg-gray-50 border border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-black mb-2">
          RSCBoundary Examples
        </h3>
        <p className="text-sm text-gray-600">
          These components use RSCBoundary for fine-grained tracing control
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h4 className="text-lg font-semibold text-black mb-4">
            User Profile
          </h4>
          <RSCBoundary
            label="user-profile"
            tags={["user", "profile"]}
            logProps={true}
            performance={{ enabled: true, warnThreshold: 100 }}
          >
            <UserCard userId={1} />
          </RSCBoundary>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-black mb-4">User Posts</h4>
          <RSCBoundary
            label="user-posts"
            tags={["posts", "content"]}
            logProps={true}
            performance={{ enabled: true, warnThreshold: 200 }}
          >
            <PostsList userId={1} />
          </RSCBoundary>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-black mb-4">
          Nested Boundaries
        </h4>
        <RSCBoundary
          label="nested-example"
          tags={["nested", "complex"]}
          logProps={true}
          performance={{ enabled: true, warnThreshold: 300 }}
        >
          <div className="space-y-6">
            <div>
              <h5 className="font-medium text-black mb-2">User 2 Profile</h5>
              <RSCBoundary
                label="user-2-profile"
                tags={["user", "profile", "nested"]}
                logProps={true}
              >
                <UserCard userId={2} />
              </RSCBoundary>
            </div>

            <div>
              <h5 className="font-medium text-black mb-2">User 2 Posts</h5>
              <RSCBoundary
                label="user-2-posts"
                tags={["posts", "content", "nested"]}
                logProps={true}
              >
                <PostsList userId={2} />
              </RSCBoundary>
            </div>

            <div>
              <h5 className="font-medium text-black mb-2">Post Comments</h5>
              <RSCBoundary
                label="post-comments"
                tags={["comments", "nested"]}
                logProps={true}
              >
                <CommentsList postId={1} />
              </RSCBoundary>
            </div>
          </div>
        </RSCBoundary>
      </div>

      <div className="bg-white border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-black mb-4">
          Boundary Features
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-black mb-2">Individual Tracing</p>
            <p className="text-gray-600">
              Each boundary can have its own trace settings
            </p>
          </div>
          <div>
            <p className="font-medium text-black mb-2">Nested Hierarchies</p>
            <p className="text-gray-600">
              Boundaries can be nested for complex tracing
            </p>
          </div>
          <div>
            <p className="font-medium text-black mb-2">Custom Labels</p>
            <p className="text-gray-600">
              Meaningful labels for better debugging
            </p>
          </div>
          <div>
            <p className="font-medium text-black mb-2">
              Performance Thresholds
            </p>
            <p className="text-gray-600">
              Different thresholds for different components
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

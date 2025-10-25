import { withRSCTrace } from "quzz";
import { Post } from "./example-rsc";

interface UserProfileProps {
  userId: number;
  showEmail?: boolean;
  theme?: "light" | "dark";
}

export const UserProfileRSC = async ({
  userId,
  showEmail = false,
  theme = "light",
}: UserProfileProps) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  const user = await response.json();

  const postsResponse = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}&_limit=3`
  );
  const userPosts = await postsResponse.json();

  const themeClasses =
    theme === "dark"
      ? "bg-gray-900 text-white border-gray-700"
      : "bg-white text-black border-gray-200";

  return (
    <div className={`max-w-2xl mx-auto p-8 border ${themeClasses}`}>
      <div className="flex items-center space-x-6 mb-8">
        <div className="w-20 h-20 bg-black text-white flex items-center justify-center text-2xl font-bold">
          {user.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{user.name}</h2>
          <p className="text-gray-500 text-lg">@{user.username}</p>
          {showEmail && <p className="text-sm text-gray-600">{user.email}</p>}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 tracking-tight">
          Contact Info
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p className="font-medium text-gray-500">Phone</p>
            <p className="text-black">{user.phone}</p>
          </div>
          <div className="space-y-1">
            <p className="font-medium text-gray-500">Website</p>
            <a
              href={`http://${user.website}`}
              className="text-black hover:underline"
            >
              {user.website}
            </a>
          </div>
          <div className="space-y-1">
            <p className="font-medium text-gray-500">City</p>
            <p className="text-black">{user.address.city}</p>
          </div>
          <div className="space-y-1">
            <p className="font-medium text-gray-500">Company</p>
            <p className="text-black">{user.company.name}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 tracking-tight">
          Recent Posts ({userPosts.length})
        </h3>
        <div className="space-y-4">
          {userPosts.map((post: Post) => (
            <div
              key={post.id}
              className={`p-4 border ${
                theme === "dark"
                  ? "bg-gray-900 border-gray-700"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <h4 className="font-semibold text-sm mb-2 tracking-tight">
                {post.title}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                {post.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const UserProfileRSCWithTrace = withRSCTrace(UserProfileRSC);

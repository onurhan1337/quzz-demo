import { withRSCTrace } from "quzz";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    city: string;
    street: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase: string;
  };
}

interface UsersRSCProps {
  limit?: number;
  includePosts?: boolean;
  sortBy?: "name" | "id" | "city";
}

export const UsersRSC = async ({
  limit = 6,
  includePosts = true,
  sortBy = "name",
}: UsersRSCProps) => {
  const startTime = Date.now();

  const usersResponse = await fetch(
    `https://jsonplaceholder.typicode.com/users?_limit=${limit}`
  );
  let users: User[] = await usersResponse.json();

  if (sortBy === "name") {
    users.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "city") {
    users.sort((a, b) => a.address.city.localeCompare(b.address.city));
  }

  let usersWithPosts = users;

  if (includePosts) {
    usersWithPosts = await Promise.all(
      users.map(async (user) => {
        const postsResponse = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${user.id}&_limit=2`
        );
        const posts = await postsResponse.json();
        return { ...user, posts };
      })
    );
  }

  const processingTime = Date.now() - startTime;

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-black">Users Directory</h3>
          <span className="text-sm text-gray-500">
            {processingTime}ms • {users.length} users
          </span>
        </div>
        <div className="text-sm text-gray-600">
          Sorted by: {sortBy} • Posts: {includePosts ? "Included" : "Excluded"}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {usersWithPosts.map((user: any) => (
          <div
            key={user.id}
            className="bg-white border border-gray-200 p-6 hover:border-gray-300 transition-colors"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center text-lg font-bold">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-black">
                  {user.name}
                </h3>
                <p className="text-gray-600">@{user.username}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm mb-4">
              <p>
                <span className="font-medium text-gray-500">Email:</span>{" "}
                <span className="text-black">{user.email}</span>
              </p>
              <p>
                <span className="font-medium text-gray-500">Phone:</span>{" "}
                <span className="text-black">{user.phone}</span>
              </p>
              <p>
                <span className="font-medium text-gray-500">City:</span>{" "}
                <span className="text-black">{user.address.city}</span>
              </p>
              <p>
                <span className="font-medium text-gray-500">Company:</span>{" "}
                <span className="text-black">{user.company.name}</span>
              </p>
            </div>

            {user.posts && user.posts.length > 0 && (
              <div className="border-t border-gray-100 pt-4">
                <h4 className="text-sm font-medium text-black mb-2">
                  Recent Posts ({user.posts.length})
                </h4>
                <div className="space-y-2">
                  {user.posts.map((post: any) => (
                    <div key={post.id} className="bg-gray-50 p-2">
                      <p className="text-xs font-medium text-black line-clamp-1">
                        {post.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const UsersRSCWithTrace = withRSCTrace(UsersRSC);

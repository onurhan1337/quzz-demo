import { withRSCTrace } from "quzz";
import Image from "next/image";

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

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
  postId: number;
}

interface Album {
  id: number;
  title: string;
  userId: number;
}

interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  albumId: number;
}

interface ComplexRSCProps {
  userId: number;
  includePhotos?: boolean;
  maxPosts?: number;
  maxComments?: number;
}

export const ComplexRSC = async ({
  userId,
  includePhotos = true,
  maxPosts = 5,
  maxComments = 3,
}: ComplexRSCProps) => {
  const startTime = Date.now();

  try {
    const [userResponse, postsResponse, albumsResponse] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
      fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}&_limit=${maxPosts}`
      ),
      includePhotos
        ? fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
        : null,
    ]);

    if (!userResponse.ok) {
      throw new Error(`Failed to fetch user: ${userResponse.status}`);
    }

    const user: User = await userResponse.json();
    const posts: Post[] = await postsResponse.json();

    let albums: Album[] = [];
    let photos: Photo[] = [];

    if (includePhotos && albumsResponse) {
      albums = await albumsResponse.json();

      if (albums.length > 0) {
        const photosResponse = await fetch(
          `https://jsonplaceholder.typicode.com/photos?albumId=${albums[0].id}&_limit=6`
        );
        photos = await photosResponse.json();
      }
    }

    const postsWithComments = await Promise.all(
      posts.slice(0, 2).map(async (post) => {
        const commentsResponse = await fetch(
          `https://jsonplaceholder.typicode.com/comments?postId=${post.id}&_limit=${maxComments}`
        );
        const comments: Comment[] = await commentsResponse.json();
        return { ...post, comments };
      })
    );

    const processingTime = Date.now() - startTime;
    const totalApiCalls =
      3 + (includePhotos ? 2 : 0) + postsWithComments.length * 1;

    return (
      <div className="space-y-8">
        <div className="bg-gray-50 border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-black">
              Performance Metrics
            </h3>
            <span className="text-sm text-gray-500">Complex RSC Demo</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Processing Time</p>
              <p className="font-mono text-black">{processingTime}ms</p>
            </div>
            <div>
              <p className="text-gray-500">API Calls</p>
              <p className="font-mono text-black">{totalApiCalls}</p>
            </div>
            <div>
              <p className="text-gray-500">Posts</p>
              <p className="font-mono text-black">{posts.length}</p>
            </div>
            <div>
              <p className="text-gray-500">Photos</p>
              <p className="font-mono text-black">{photos.length}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-black">
              User Profile
            </h3>
            <div className="bg-white border border-gray-200 p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center text-lg font-bold">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-black">
                    {user.name}
                  </h4>
                  <p className="text-gray-600">@{user.username}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium text-gray-500">Email:</span>{" "}
                  {user.email}
                </p>
                <p>
                  <span className="font-medium text-gray-500">Phone:</span>{" "}
                  {user.phone}
                </p>
                <p>
                  <span className="font-medium text-gray-500">City:</span>{" "}
                  {user.address.city}
                </p>
                <p>
                  <span className="font-medium text-gray-500">Company:</span>{" "}
                  {user.company.name}
                </p>
                <p className="text-gray-600 italic">
                  &quot;{user.company.catchPhrase}&quot;
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-black">
              Recent Posts
            </h3>
            <div className="space-y-4">
              {postsWithComments.map((post) => (
                <div
                  key={post.id}
                  className="bg-white border border-gray-200 p-4"
                >
                  <h4 className="font-semibold text-black mb-2">
                    {post.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {post.body}
                  </p>

                  {post.comments && post.comments.length > 0 && (
                    <div className="border-t border-gray-100 pt-3">
                      <p className="text-xs text-gray-500 mb-2">
                        Comments ({post.comments.length})
                      </p>
                      <div className="space-y-2">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="bg-gray-50 p-2">
                            <p className="text-xs font-medium text-black">
                              {comment.name}
                            </p>
                            <p className="text-xs text-gray-600">
                              {comment.body}
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
        </div>

        {includePhotos && photos.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-black">
              Photo Gallery
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="bg-white border border-gray-200 p-2"
                >
                  <Image
                    width={100}
                    height={100}
                    src={photo.thumbnailUrl}
                    alt={photo.title}
                    className="w-full h-20 object-cover mb-2"
                  />
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {photo.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-gray-50 border border-gray-200 p-4">
          <h3 className="text-lg font-semibold mb-2 text-black">
            Data Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Total Posts</p>
              <p className="font-mono text-black">{posts.length}</p>
            </div>
            <div>
              <p className="text-gray-500">Posts with Comments</p>
              <p className="font-mono text-black">{postsWithComments.length}</p>
            </div>
            <div>
              <p className="text-gray-500">Total Comments</p>
              <p className="font-mono text-black">
                {postsWithComments.reduce(
                  (acc, post) => acc + (post.comments?.length || 0),
                  0
                )}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Albums</p>
              <p className="font-mono text-black">{albums.length}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="bg-red-50 border border-red-200 p-6">
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          Error Loading Data
        </h3>
        <p className="text-red-600 text-sm">
          {error instanceof Error ? error.message : "An unknown error occurred"}
        </p>
        <p className="text-red-500 text-xs mt-2">
          User ID: {userId} | Processing Time: {Date.now() - startTime}ms
        </p>
      </div>
    );
  }
};

export const ComplexRSCWithTrace = withRSCTrace(ComplexRSC);

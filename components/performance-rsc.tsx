import { withRSCTrace } from "quzz";

interface PerformanceRSCProps {
  testType: "light" | "medium" | "heavy";
  iterations?: number;
}

export const PerformanceRSC = async ({
  testType,
  iterations = 1,
}: PerformanceRSCProps) => {
  const startTime = Date.now();
  const memoryStart = process.memoryUsage();

  let apiCalls = 0;
  let totalDataSize = 0;

  const performTest = async () => {
    switch (testType) {
      case "light":
        const lightResponse = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=5"
        );
        apiCalls++;
        const lightData = await lightResponse.json();
        totalDataSize += JSON.stringify(lightData).length;
        return lightData;

      case "medium":
        const [mediumPosts, mediumUsers] = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/posts?_limit=10"),
          fetch("https://jsonplaceholder.typicode.com/users?_limit=5"),
        ]);
        apiCalls += 2;
        const [mediumPostsData, mediumUsersData] = await Promise.all([
          mediumPosts.json(),
          mediumUsers.json(),
        ]);
        totalDataSize +=
          JSON.stringify(mediumPostsData).length +
          JSON.stringify(mediumUsersData).length;
        return { posts: mediumPostsData, users: mediumUsersData };

      case "heavy":
        const [heavyPosts, heavyUsers, heavyComments, heavyAlbums] =
          await Promise.all([
            fetch("https://jsonplaceholder.typicode.com/posts?_limit=20"),
            fetch("https://jsonplaceholder.typicode.com/users?_limit=10"),
            fetch("https://jsonplaceholder.typicode.com/comments?_limit=30"),
            fetch("https://jsonplaceholder.typicode.com/albums?_limit=15"),
          ]);
        apiCalls += 4;
        const [
          heavyPostsData,
          heavyUsersData,
          heavyCommentsData,
          heavyAlbumsData,
        ] = await Promise.all([
          heavyPosts.json(),
          heavyUsers.json(),
          heavyComments.json(),
          heavyAlbums.json(),
        ]);
        totalDataSize +=
          JSON.stringify(heavyPostsData).length +
          JSON.stringify(heavyUsersData).length +
          JSON.stringify(heavyCommentsData).length +
          JSON.stringify(heavyAlbumsData).length;
        return {
          posts: heavyPostsData,
          users: heavyUsersData,
          comments: heavyCommentsData,
          albums: heavyAlbumsData,
        };

      default:
        return [];
    }
  };

  const results = [];
  for (let i = 0; i < iterations; i++) {
    const result = await performTest();
    results.push(result);
  }

  const processingTime = Date.now() - startTime;
  const memoryEnd = process.memoryUsage();
  const memoryUsed = memoryEnd.heapUsed - memoryStart.heapUsed;

  const getTestDescription = () => {
    switch (testType) {
      case "light":
        return "Light load test with 5 posts";
      case "medium":
        return "Medium load test with 10 posts + 5 users";
      case "heavy":
        return "Heavy load test with 20 posts + 10 users + 30 comments + 15 albums";
      default:
        return "Unknown test type";
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-black mb-4">
          Performance Test Results
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Test Type</p>
            <p className="font-mono text-black capitalize">{testType}</p>
          </div>
          <div className="bg-white p-4 border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Processing Time</p>
            <p className="font-mono text-black">{processingTime}ms</p>
          </div>
          <div className="bg-white p-4 border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">API Calls</p>
            <p className="font-mono text-black">{apiCalls * iterations}</p>
          </div>
          <div className="bg-white p-4 border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Memory Used</p>
            <p className="font-mono text-black">
              {(memoryUsed / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-600">{getTestDescription()}</div>
      </div>

      <div className="bg-white border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-black mb-4">Data Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-500 mb-1">Iterations</p>
            <p className="font-mono text-black">{iterations}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Data Size</p>
            <p className="font-mono text-black">
              {(totalDataSize / 1024).toFixed(2)} KB
            </p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Avg Time/Iteration</p>
            <p className="font-mono text-black">
              {(processingTime / iterations).toFixed(2)}ms
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-black mb-4">Memory Usage</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 mb-1">Heap Used</p>
            <p className="font-mono text-black">
              {(memoryEnd.heapUsed / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Heap Total</p>
            <p className="font-mono text-black">
              {(memoryEnd.heapTotal / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PerformanceRSCWithTrace = withRSCTrace(PerformanceRSC);

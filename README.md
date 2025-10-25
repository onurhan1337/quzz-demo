# RSC Demo with Quzz Tracing

A comprehensive demonstration of **React Server Components (RSC)** with advanced tracing, debugging, and performance monitoring using the [quzz](https://github.com/onurhan1337/quzz) library.

## Features

### React Server Components

- **Server-side data fetching** with multiple API orchestration
- **Error handling and recovery** with user-friendly error states
- **Performance monitoring** with timing and memory usage tracking
- **Complex data processing** with nested API calls and data transformation

### Quzz Tracing & Debugging

- **Component-level tracing** with detailed execution logs
- **Props and state logging** for debugging complex data flows
- **API call monitoring** with timing and performance metrics
- **RSCBoundary components** for fine-grained tracing control
- **Nested component hierarchies** with parent-child trace relationships

## Project Structure

```
├── app/
│   ├── page.tsx              # Homepage with navigation
│   ├── posts/page.tsx        # Posts feed examples
│   ├── users/page.tsx        # User directory examples
│   ├── boundary/page.tsx     # RSCBoundary demonstrations
│   └── performance/page.tsx  # Performance testing
├── components/
│   ├── navigation.tsx        # Site navigation
│   ├── example-rsc.tsx       # Basic RSC example
│   ├── user-profile-rsc.tsx  # User profile with props
│   ├── posts-rsc.tsx         # Advanced posts with comments
│   ├── users-rsc.tsx         # User directory with sorting
│   ├── complex-rsc.tsx       # Complex multi-API orchestration
│   ├── performance-rsc.tsx   # Performance benchmarking
│   └── rsc-boundary-example.tsx # RSCBoundary examples
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd quzz-demo
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Demo Pages

### Homepage (`/`)

- Overview of all demo features
- Navigation to different RSC examples
- Feature highlights and capabilities

### Posts Feed (`/posts`)

- **Advanced posts RSC** with comments integration
- **Configurable limits** and category filtering
- **Performance tracking** with timing metrics
- **Nested data structures** with posts and comments

### Users Directory (`/users`)

- **User management RSC** with sorting options
- **Post integration** showing user activity
- **Sort by name, ID, or city** with different data views
- **Grid layout** with comprehensive user cards

### RSCBoundary (`/boundary`)

- **Fine-grained tracing control** with RSCBoundary components
- **Nested hierarchies** with parent-child relationships
- **Custom labels and tags** for better debugging
- **Different performance thresholds** per component

### Performance Testing (`/performance`)

- **Load testing** with light, medium, and heavy scenarios
- **Memory usage analysis** with heap monitoring
- **API call counting** and data size measurements
- **Processing time analysis** with iteration tracking

## Configuration

### Quzz Configuration

The tracing is configured in `app/layout.tsx`:

```typescript
import { configure } from "quzz";

configure({
  logLevel: "debug",
  outputFormat: "pretty",
  performance: {
    enabled: true,
    warnThreshold: 50,
    trackMemory: true,
  },
  logProps: true,
  contextTracking: true,
});
```

### Component Tracing

Components are wrapped with `withRSCTrace`:

```typescript
import { withRSCTrace } from "quzz";

export const MyRSC = async () => {
  // Component logic
};

export const MyRSCWithTrace = withRSCTrace(MyRSC);
```

### RSCBoundary Usage

For fine-grained control:

```typescript
import { RSCBoundary } from "quzz";

<RSCBoundary
  label="my-component"
  tags={["api", "data"]}
  logProps={true}
  performance={{ enabled: true, warnThreshold: 100 }}
>
  <MyComponent />
</RSCBoundary>;
```

## What You'll See

### Console Logs

- **Component execution** with start/end timestamps
- **Props logging** showing passed parameters
- **API call tracking** with request/response timing
- **Performance metrics** with memory usage
- **Error handling** with detailed error information

### Example Log Output

```
Server  INFO MyRSC Rendering started
Server  INFO MyRSC Props: { userId: 1, includePosts: true }
Server  INFO MyRSC API call: GET /users/1 (45ms)
Server  INFO MyRSC API call: GET /posts?userId=1 (32ms)
Server  INFO MyRSC Rendering completed in 89ms
```

## Learning Objectives

This demo helps you understand:

1. **RSC Patterns** - Different approaches to server-side data fetching
2. **API Orchestration** - Managing multiple API calls and data dependencies
3. **Error Handling** - Graceful error states and recovery
4. **Performance Monitoring** - Tracking and optimizing RSC performance
5. **Debugging Tools** - Using quzz for comprehensive RSC debugging
6. **Component Architecture** - Building maintainable RSC applications

## Technologies Used

- **Next.js 16** - React framework with App Router
- **React 19** - Latest React with Server Components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Quzz** - RSC tracing and debugging library
- **JSONPlaceholder** - Mock API for data fetching

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Server Components](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023)
- [Quzz Library](https://github.com/quzz-io/quzz)
- [Tailwind CSS](https://tailwindcss.com/docs)

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve this demo!

## License

This project is open source and available under the [MIT License](LICENSE).

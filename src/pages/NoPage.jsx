export default function NotFoundPage() {
    return (
      <main className="grid min-h-screen place-items-center bg-gray-50 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-48 w-48 sm:h-64 sm:w-64 items-center justify-center rounded-lg ">
            <img
              src="/404.png"
              alt="A delicious meal"
              className="h-40 w-40 rounded-full object-cover shadow-lg sm:h-64 sm:w-64"
              loading="lazy"
              width="256"
              height="256"
              style={{ objectFit: "cover" }}
              
            />
          </div>
          <p className="text-base font-semibold text-red-600">404</p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
            Oops! This page wandered off
          </h1>
          <p className="mt-6 text-lg font-medium text-gray-500 sm:text-xl">
            No worries—your next khaja is just a click away! Why not explore this week’s menu?
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/"
              className="rounded-md bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              Go to Homepage
            </a>
            <a
              href="/menus"
              className="rounded-md border border-orange-600 px-4 py-2.5 text-sm font-semibold text-orange-600 hover:bg-orange-50"
            >
              Explore Menus
            </a>
          </div>
        </div>
      </main>
    );
  }

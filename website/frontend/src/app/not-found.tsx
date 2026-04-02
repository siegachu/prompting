export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
      <div className="text-center">
        <p className="text-6xl font-bold text-gray-600 mb-4">404</p>
        <p className="text-lg font-semibold text-gray-300 mb-1">Page not found</p>
        <p className="text-sm text-gray-500 mb-4">The page you're looking for doesn't exist.</p>
        <a
          href="/"
          className="text-sm text-[#f59e0b] hover:text-[#d97706] hover:underline py-3 px-4 inline-block"
        >
          Back to AI Prompting Guide
        </a>
      </div>
    </div>
  );
}

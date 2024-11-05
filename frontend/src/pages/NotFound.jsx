const NotFound = () => {
    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
                <h1 className="text-6xl font-bold text-gray-100 mb-4">404</h1>
                <h2 className="text-2xl text-gray-200 mb-8">Page Not Found</h2>
                <p className="text-gray-400 mb-8">The page you are looking for doesn't exist or has been moved.</p>
                <a href="/" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Return Home
                </a>
            </div>
        </div>
    );
}

export default NotFound;
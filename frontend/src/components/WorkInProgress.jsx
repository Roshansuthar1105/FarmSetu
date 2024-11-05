import MyNavbar from "./MyNavbar";
import Footer from "./Footer";

const WorkInProgress = () => {
    return (
        <div className="min-h-screen bg-gray-800">
            <MyNavbar />
            <div className="flex flex-col items-center justify-center min-h-[80vh]">
                <div className="text-center p-8">
                    <h1 className="text-4xl font-bold text-gray-200 mb-4">
                        Work in Progress
                    </h1>
                    <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-green-500 mx-auto mb-8"></div>
                    <p className="text-xl text-gray-300 mb-6">
                        We're working hard to bring you something amazing!
                    </p>
                    <p className="text-gray-400 max-w-md mx-auto">
                        This page is currently under construction. Please check back later for updates.
                    </p>
                    <a 
                        href="/"
                        className="inline-block mt-8 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Return Home
                    </a>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default WorkInProgress;

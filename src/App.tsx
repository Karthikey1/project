import React from 'react';
import Layout from './components/layout/Layout';
import Feed from './components/feed/Feed';
import ConfessionFeed from './components/confessions/ConfessionFeed';
import ModerateConfessions from './components/confessions/ModerateConfessions';
import { useAuthStore } from './store/authStore';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Importing React Router components
import AuthModal from './components/auth/AuthModal';  // Import the AuthModal (login/register)

function App() {
  const { user } = useAuthStore();  // Access user state from authStore
  const isModOrAdmin = user && ['admin', 'moderator'].includes(user.role);

  return (
    <Router> {/* Wrapping the whole app inside BrowserRouter */}
      <Layout>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar - Left */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="font-semibold text-lg mb-4">Categories</h2>
              <ul className="space-y-2">
                <li className="text-gray-700 hover:text-indigo-600 cursor-pointer">All Posts</li>
                <li className="text-gray-700 hover:text-indigo-600 cursor-pointer">Events</li>
                <li className="text-gray-700 hover:text-indigo-600 cursor-pointer">Projects</li>
                <li className="text-gray-700 hover:text-indigo-600 cursor-pointer">Announcements</li>
                <li className="text-gray-700 hover:text-indigo-600 cursor-pointer">Best Memories</li>
                <li className="text-gray-700 hover:text-indigo-600 cursor-pointer">Confessions</li>
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-6">
            <div className="space-y-6">
              {/* Define routes for your components */}
              <Routes>
                <Route path="/" element={<ConfessionFeed />} />  {/* Home page route */}
                <Route path="/feed" element={<Feed />} />  {/* Feed page route */}
                {/* Add more routes as needed */}
              </Routes>
            </div>
          </main>

          {/* Sidebar - Right */}
          <aside className="hidden lg:block lg:col-span-3">
            {isModOrAdmin && <ModerateConfessions />}  {/* Show moderation if user is admin or moderator */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="font-semibold text-lg mb-4">Upcoming Events</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-indigo-600 pl-3">
                  <p className="font-medium">Department Meeting</p>
                  <p className="text-sm text-gray-500">Tomorrow, 10:00 AM</p>
                </div>
                <div className="border-l-4 border-indigo-600 pl-3">
                  <p className="font-medium">Tech Workshop</p>
                  <p className="text-sm text-gray-500">Friday, 2:00 PM</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* AuthModal for login/register */}
        {/* If the user is not logged in, show the login/register modal */}
        {!user && <AuthModal isOpen={true} onClose={() => {}} />}
      </Layout>
    </Router>
  );
}

export default App;

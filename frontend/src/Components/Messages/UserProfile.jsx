import React, { useEffect, useState } from 'react'
import useConversation from '../../zustand/useConversation';
import axios from '../../api/axios';

const UserProfile = () => {
  const { selectedConversation } = useConversation();
  const [activeTab, setActiveTab] = useState('info');
  const [sharedMedia, setSharedMedia] = useState([]);

  useEffect(() => {
    // Fetch shared media when component mounts
    const fetchSharedMedia = async () => {
      try {
        const response = await axios.get(`/messages/media/${selectedConversation._id}`);
        setSharedMedia(response.data);
      } catch (error) {
        console.error("Error fetching shared media:", error);
      }
    };
    
    if (selectedConversation) {
      fetchSharedMedia();
    }
  }, [selectedConversation]);

  if (!selectedConversation) {
    return <div className="flex items-center justify-center h-full">
      <p>No user selected</p>
    </div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      {/* Profile Header */}
      <div className="flex flex-col items-center py-6">
        <img
          src={selectedConversation.profilePicture || '/default-avatar.png'}
          alt={selectedConversation.fullName}
          className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
        />
        <h2 className="text-2xl font-bold mt-4 text-gray-800 dark:text-white">
          {selectedConversation.fullName}
        </h2>
        <p className="text-gray-500 dark:text-gray-300">
          {selectedConversation.username}
        </p>
        <div className="flex gap-4 mt-4">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
            Online
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('info')}
            className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'info' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            Information
          </button>
          <button
            onClick={() => setActiveTab('media')}
            className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'media' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            Shared Media
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="py-6">
        {activeTab === 'info' ? (
          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-500 dark:text-gray-400">Email</span>
              <span className="text-gray-800 dark:text-gray-200">
                {selectedConversation.email || 'Not available'}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-500 dark:text-gray-400">Phone</span>
              <span className="text-gray-800 dark:text-gray-200">
                {selectedConversation.phoneNumber || 'Not available'}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-500 dark:text-gray-400">Member Since</span>
              <span className="text-gray-800 dark:text-gray-200">
                {new Date(selectedConversation.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {sharedMedia.length > 0 ? (
              sharedMedia.map((media, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-lg">
                  <img
                    src={media.url}
                    alt={`Shared media ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                  />
                </div>
              ))
            ) : (
              <div className="col-span-3 py-8 text-center text-gray-500 dark:text-gray-400">
                No media shared yet
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


export default UserProfile
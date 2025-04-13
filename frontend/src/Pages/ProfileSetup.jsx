import { useState, useRef } from 'react';
import { Camera, Mail, User } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';
import axios from '../api/axios';
import toast from 'react-hot-toast';

const ProfileSetup = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsLoading(true);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append('profilePicture', file);

      const { data } = await axios.put(
        '/auth/update_profile',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setAuthUser(data.user); // Adjust based on backend response
      localStorage.setItem('chat-user', JSON.stringify(data.user));
      toast.success('Profile picture updated!');
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile picture');
      setPreviewImage(''); // Reset preview on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full pt-20 bg-white">
      <div className="max-w-2xl mx-auto p-4 py-2">
        <div className="bg-base-300 rounded-xl p-6 space-y-5">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={previewImage || authUser?.profilePicture || '/avatar.png'}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isLoading ? 'animate-pulse pointer-events-none' : ''}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isLoading}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isLoading ? 'Uploading...' : 'Click the camera icon to update your photo'}
            </p>
          </div>

          {/* Profile Information */}
          <div className="">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullName}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email || 'N/A'}</p>
            </div>
          </div>

          {/* Account Information */}
          <div className="mt-2 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>
                  {authUser?.createdAt ? new Date(authUser.createdAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
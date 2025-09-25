import React from 'react';
import { Button } from '../ui/button';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut } from 'lucide-react';

const UserProfile: React.FC = () => {
  const { currentUser, balance, signOut } = useAuth();

  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
      {/* User Avatar */}
      <div className="flex-shrink-0">
        {currentUser.photoURL ? (
          <img
            src={currentUser.photoURL}
            alt={currentUser.displayName || 'User'}
            className="w-12 h-12 rounded-full border-2 border-[#FFD43B]"
          />
        ) : (
          <div className="w-12 h-12 bg-gradient-to-br from-[#FFD43B] to-[#34A853] rounded-full flex items-center justify-center">
            <span className="text-white text-lg font-medium">
              {currentUser.displayName?.charAt(0) || 'U'}
            </span>
          </div>
        )}
      </div>

      {/* User Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-medium text-gray-900 truncate">
          {currentUser.displayName || 'User'}
        </h3>
        <p className="text-sm text-gray-500 truncate">
          {currentUser.email}
        </p>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-sm font-medium text-gray-700">Balance:</span>
          <span className="text-lg font-bold text-[#FFD43B]">
            {balance.toLocaleString()} SLR
          </span>
        </div>
      </div>

      {/* Sign Out Button */}
      <Button
        onClick={handleSignOut}
        variant="ghost"
        size="sm"
        className="text-gray-500 hover:text-gray-700 p-2"
        title="Sign Out"
      >
        <LogOut className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default UserProfile;
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  onSnapshot,
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db } from '../firebase';

// Types
interface AuthContextType {
  currentUser: User | null;
  balance: number;
  signInWithGoogle: () => Promise<User>;
  signOut: () => Promise<void>;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Create Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // Sign in with Google
  const signInWithGoogle = async (): Promise<User> => {
    // Commenting out the actual Google login implementation
    /*
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Check if user document exists
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        // Create new user document
        await setDoc(userDocRef, {
          displayName: user.displayName,
          email: user.email,
          balance: 0,
          tier: "silver",
          createdAt: serverTimestamp()
        });
      }
      
      return user;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
    */
    
    // Mock implementation for demo purposes
    try {
      // Create a mock user object
      const mockUser = {
        uid: 'mock-user-123',
        displayName: 'Demo User',
        email: 'demo@example.com',
        photoURL: null,
        providerData: []
      } as unknown as User;
      
      // Set the mock user
      setCurrentUser(mockUser);
      
      // Set a default balance for demo
      setBalance(1000);
      
      return mockUser;
    } catch (error) {
      console.error('Error in mock sign in:', error);
      throw error;
    }
  };

  // Sign out
  const signOut = async (): Promise<void> => {
    // Commenting out the actual Firebase sign out
    /*
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
    */
    
    // Mock sign out implementation
    setCurrentUser(null);
    setBalance(0);
  };

  // Listen to auth state changes
  // Commenting out the actual Firebase listener for demo purposes
  /*
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);
  */
  
  // Mock implementation - simulate loading and then finish loading
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Listen to user balance changes from Firestore
  // Commenting out the actual Firestore listener for demo purposes
  /*
  useEffect(() => {
    let unsubscribeBalance: (() => void) | null = null;

    if (currentUser) {
      const userDocRef = doc(db, 'users', currentUser.uid);
      
      unsubscribeBalance = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          setBalance(userData.balance || 0);
        }
      }, (error) => {
        console.error('Error listening to balance changes:', error);
      });
    } else {
      setBalance(0);
    }

    return () => {
      if (unsubscribeBalance) {
        unsubscribeBalance();
      }
    };
  }, [currentUser]);
  */
  
  // Mock implementation for balance
  // This effect is kept but simplified for the demo
  useEffect(() => {
    // In a real implementation, this would come from Firestore
    // For demo, we'll just ensure the balance is set correctly
    if (currentUser && balance === 0) {
      setBalance(1000); // Set a default balance for demo
    }
  }, [currentUser, balance]);

  const value: AuthContextType = {
    currentUser,
    balance,
    signInWithGoogle,
    signOut,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
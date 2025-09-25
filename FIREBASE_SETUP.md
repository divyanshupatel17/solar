# Firebase Integration Setup Guide

This guide explains how to set up Firebase Authentication and Firestore for your Solar Token System Platform.

## 🔧 Prerequisites

1. A Firebase project created at [Firebase Console](https://console.firebase.google.com/)
2. Firebase Authentication enabled with Google provider
3. Firestore Database created in your Firebase project

## 📋 Setup Steps

### 1. Firebase Console Configuration

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Create a project" or select existing project

2. **Enable Authentication**
   - Go to Authentication → Sign-in method
   - Enable "Google" provider
   - Add your domain to authorized domains if needed

3. **Set up Firestore Database**
   - Go to Firestore Database
   - Create database in production mode (or test mode for development)
   - Choose a location for your database

4. **Get Firebase Configuration**
   - Go to Project Settings → General
   - Scroll down to "Your apps"
   - Click on the Web app icon or "Add app"
   - Copy the Firebase configuration object

### 2. Local Environment Configuration

1. **Create Environment File**
   ```bash
   cp .env.example .env
   ```

2. **Update Environment Variables**
   Edit the `.env` file with your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your-actual-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
   ```

3. **Alternative: Direct Configuration**
   If you prefer not to use environment variables, update `src/firebase.ts` directly:
   ```typescript
   const firebaseConfig = {
     apiKey: "your-actual-api-key",
     authDomain: "your-project-id.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project-id.appspot.com",
     messagingSenderId: "your-messaging-sender-id",
     appId: "your-app-id",
     measurementId: "your-measurement-id"
   };
   ```

### 3. Firestore Security Rules

Set up security rules in your Firestore Database:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Add other collection rules as needed
  }
}
```

## 🚀 Features Implemented

### ✅ Firebase Authentication
- **Google Sign-In**: One-click authentication with Google accounts
- **Auth State Management**: Real-time authentication state tracking
- **Automatic User Creation**: Creates user document on first login
- **Secure Sign-Out**: Proper authentication cleanup

### ✅ Firestore Integration
- **User Profiles**: Stores user data in `users/{uid}` collection
- **Real-time Balance**: Live balance updates using Firestore listeners
- **User Data Structure**:
  ```typescript
  {
    displayName: string,
    email: string,
    balance: number,
    tier: "silver" | "gold" | "platinum",
    createdAt: serverTimestamp()
  }
  ```

### ✅ React Context & Hooks
- **useAuth Hook**: Provides authentication state and functions
- **AuthProvider**: Wraps the app with authentication context
- **Real-time Updates**: Balance changes are reflected immediately

## 🔑 Key Components

### Authentication Context (`src/contexts/AuthContext.tsx`)
Provides:
- `currentUser`: Firebase User object or null
- `balance`: Live balance from Firestore
- `signInWithGoogle()`: Google authentication function
- `signOut()`: Sign out function
- `loading`: Authentication state loading indicator

### Firebase Configuration (`src/firebase.ts`)
- Initializes Firebase app
- Exports `auth` and `db` instances
- Supports environment variables

### UI Components
- **SignInWithGoogle**: Styled Google sign-in button
- **UserProfile**: User info display with balance and sign-out
- **Protected Routes**: Shows sign-in prompt for authenticated pages

## 🎯 Usage Examples

### Using Authentication in Components

```typescript
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { currentUser, balance, signInWithGoogle, signOut } = useAuth();

  if (!currentUser) {
    return <button onClick={signInWithGoogle}>Sign In</button>;
  }

  return (
    <div>
      <p>Welcome, {currentUser.displayName}!</p>
      <p>Balance: {balance} SLR</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

### Updating User Balance

```typescript
import { updateUserBalance } from '../utils/firestore';

// Add 100 tokens to user balance
await updateUserBalance(currentUser.uid, 100);

// Subtract 50 tokens from user balance  
await updateUserBalance(currentUser.uid, -50);

// Set balance to specific amount
await setUserBalance(currentUser.uid, 500);
```

## 🛡️ Security Considerations

1. **Environment Variables**: Never commit `.env` files to version control
2. **Firestore Rules**: Always set up proper security rules
3. **API Keys**: Firebase API keys can be public (they're designed to be)
4. **Domain Authorization**: Add your production domain to Firebase Auth settings

## 🐛 Troubleshooting

### Common Issues

1. **"Firebase not configured"**
   - Check that your `.env` file exists and has correct values
   - Verify environment variable names start with `VITE_`

2. **"Google Sign-In Failed"**
   - Ensure Google provider is enabled in Firebase Console
   - Check that your domain is authorized

3. **"Permission Denied" on Firestore**
   - Verify Firestore security rules allow user access
   - Check that user is authenticated

4. **Balance not updating**
   - Ensure user document exists in Firestore
   - Check browser console for errors

### Development Tips

1. **Testing**: Use Firebase Emulator Suite for local development
2. **Debugging**: Enable Firebase debug logging:
   ```typescript
   import { connectAuthEmulator } from 'firebase/auth';
   import { connectFirestoreEmulator } from 'firebase/firestore';
   ```

3. **Performance**: The real-time balance listener automatically cleans up when user signs out

## 📚 Next Steps

1. **Add More User Fields**: Extend user profile with additional data
2. **Transaction History**: Store transaction records in Firestore
3. **Real-time Notifications**: Use Firebase Cloud Messaging
4. **Analytics**: Integrate Firebase Analytics for user insights
5. **Storage**: Add Firebase Storage for file uploads

## 🔗 Useful Links

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [React Firebase Hooks](https://github.com/CSFrequency/react-firebase-hooks)

---

**Happy Coding! 🚀** Your Solar Token System now has robust Firebase authentication and real-time data synchronization!
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Firebase utility functions for user balance management
 */

/**
 * Update user balance in Firestore
 * @param userId - The user's UID
 * @param amount - Amount to add (positive) or subtract (negative)
 */
export const updateUserBalance = async (userId: string, amount: number): Promise<void> => {
  try {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, {
      balance: increment(amount)
    });
  } catch (error) {
    console.error('Error updating user balance:', error);
    throw error;
  }
};

/**
 * Set user balance to a specific value
 * @param userId - The user's UID  
 * @param newBalance - The new balance value
 */
export const setUserBalance = async (userId: string, newBalance: number): Promise<void> => {
  try {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, {
      balance: newBalance
    });
  } catch (error) {
    console.error('Error setting user balance:', error);
    throw error;
  }
};

/**
 * Update user tier
 * @param userId - The user's UID
 * @param tier - New tier value ('silver', 'gold', 'platinum', etc.)
 */
export const updateUserTier = async (userId: string, tier: string): Promise<void> => {
  try {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, {
      tier: tier
    });
  } catch (error) {
    console.error('Error updating user tier:', error);
    throw error;
  }
};
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  lastLogin: Date;
}

export const userService = {
  // Vytvorenie/aktualizácia používateľa pri prihlásení
  async saveUser(userData: User) {
    try {
      const userRef = doc(db, 'users', userData.uid);
      await setDoc(userRef, {
        ...userData,
        lastLogin: new Date()
      }, { merge: true });
      return true;
    } catch (error) {
      console.error('Error saving user:', error);
      return false;
    }
  },

  // Získanie údajov o používateľovi
  async getUser(uid: string) {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        return userSnap.data() as User;
      }
      return null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }
}; 
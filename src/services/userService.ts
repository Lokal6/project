import { db } from '../firebase';
import { collection, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import type { User } from '../types/user';

const USERS_COLLECTION = 'users';

export const userService = {
  // Vytvorenie/aktualizácia používateľa pri prihlásení
  async saveUser(user: User) {
    const userRef = doc(db, USERS_COLLECTION, user.uid);
    try {
      await setDoc(userRef, {
        ...user,
        lastLogin: new Date()
      }, { merge: true });
      console.log('Používateľ uložený:', user.email);
    } catch (error) {
      console.error('Chyba pri ukladaní používateľa:', error);
    }
  },

  // Získanie údajov o používateľovi
  async getUser(uid: string) {
    const userRef = doc(db, USERS_COLLECTION, uid);
    try {
      const userSnap = await getDoc(userRef);
      return userSnap.exists() ? userSnap.data() as User : null;
    } catch (error) {
      console.error('Chyba pri získavaní používateľa:', error);
      return null;
    }
  }
}; 
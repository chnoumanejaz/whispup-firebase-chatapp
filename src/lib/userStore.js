import { doc, getDoc } from 'firebase/firestore';
import { create } from 'zustand';
import { db } from './firebase';

export const useUserStore = create(set => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async uid => {
    if (!uid) return set({ currentUser: null, isLoading: false });

    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      const user = userDoc.data();

      if (user) return set({ currentUser: user, isLoading: false });

      return set({ currentUser: null, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch user info', error);
      return set({ currentUser: null, isLoading: false });
    }
  },
}));

/* eslint-disable react-hooks/exhaustive-deps */
import { useAuthStore, useHasHydrated } from '@/stores/useAuthStore';
import { auth } from '@/untility/firebase';
import { Redirect } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  const hasHydrated = useHasHydrated();
  const { user, setUser } = useAuthStore();
  const [firebaseChecked, setFirebaseChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || '',
        });
      }
      setFirebaseChecked(true);
    });

    return () => unsubscribe();
  }, []);

  if (!hasHydrated || !firebaseChecked) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Redirect href={user ? '/(tabs)/Home' : '/(auth)/Login'} />;
}

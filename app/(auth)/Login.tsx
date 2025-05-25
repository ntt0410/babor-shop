/* eslint-disable @typescript-eslint/no-unused-vars */
import { ButtonComponent, ColComponent, ContainerComponent, InputComponent, RowComponent, SpaceComponent, TextComponent } from '@/components';
import appColors from '@/constants/appColors';
import { useAuthStore } from '@/stores/useAuthStore';
import { auth, fs } from '@/untility/firebase';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Alert, ScrollView } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ các trường');
      return;
    }

    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(fs, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setUser({
            uid: user.uid,
            email: user.email,
            photoUrl: userData.photoUrl || null,
            username: userData.username || '',
        });
        } else {
        setUser({
            uid: user.uid,
            email: user.email,
            photoUrl: user.photoURL,
            username: user.displayName || '',
        });
        }

      router.replace('/(tabs)/Home');
    } catch (error: any) {
      let errorMessage = 'Đã xảy ra lỗi. Vui lòng thử lại.';
      if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email không hợp lệ.';
      } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Email hoặc mật khẩu không đúng.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Quá nhiều lần thử đăng nhập. Vui lòng thử lại sau.';
      }
      Alert.alert('Đăng nhập thất bại', errorMessage);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ContainerComponent style={{ backgroundColor: appColors.primary }}>
      <SpaceComponent height={140}/>
      <ScrollView>
        <RowComponent styles={{
          backgroundColor: appColors.white,
          height: 160,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
        }}>
          <ColComponent style={{ alignItems: 'center' }}>
            <TextComponent text='Babor Shop' size={36} color={appColors.primary} styles={{ fontWeight: 'bold' }} />
            <SpaceComponent height={20} />
            <TextComponent text='Đăng Nhập' size={24} />
          </ColComponent>
        </RowComponent>
        <RowComponent styles={{ backgroundColor: appColors.white }}>
          <ColComponent>
            <TextComponent text='Email :' styles={{ marginLeft: 10 }} />
            <RowComponent styles={{ padding: 10 }}>
              <InputComponent 
                placeholder='Email'
                affix={<AntDesign name="user" size={20} color={appColors.gray} />}
                value={email}
                onChange={setEmail}
              />
            </RowComponent>
            <TextComponent text='Mật khẩu :' styles={{ marginLeft: 10 }} />
            <RowComponent styles={{ padding: 10 }}>
              <InputComponent 
                placeholder='Mật khẩu'
                affix={<EvilIcons name="lock" size={26} color={appColors.gray} />}
                isPassword
                value={password}
                onChange={setPassword}
              />
            </RowComponent>
            <RowComponent styles={{justifyContent: 'flex-end', marginRight: 20, marginBottom: 10}}>
              <ButtonComponent text='Quên mật khẩu?' onPress={() => router.push('/(auth)/Forgot-password')} />
            </RowComponent>
            <ButtonComponent 
              type='primary' 
              text='Đăng nhập' 
              onPress={handleLogin}
              styles={{ width: '60%' }}
            />
            <RowComponent>
              <TextComponent text='Chưa có tài khoản? ' />
              <ButtonComponent 
                type='text' 
                text='Đăng ký' 
                onPress={() => router.push('/(auth)/Register')}
              />
            </RowComponent>
            <SpaceComponent height={30} />
            <RowComponent styles={{ justifyContent: 'space-around' }}>
              <ButtonComponent 
                type='primary' 
                color={appColors.white}
                icon={<AntDesign name="facebook-square" size={40} color={appColors.primary} />} 
                styles={{
                  borderRadius: 40,
                  width: 80,
                  height: 80,
                }}
              />
              <ButtonComponent 
                type='primary' 
                color={appColors.white}
                icon={<AntDesign name="google" size={40} color={appColors.primary} />} 
                styles={{
                  borderRadius: 40,
                  width: 80,
                  height: 80,
                }}
              />
              <ButtonComponent 
                type='primary' 
                color={appColors.white}
                icon={<AntDesign name="apple1" size={40} color={appColors.primary} />} 
                styles={{
                  borderRadius: 40,
                  width: 80,
                  height: 80,
                }}
              />
            </RowComponent>
            <RowComponent styles={{ height: 100 }}>
              <TextComponent text='_~.~_Design by Thanh Tu_~.~_' />
            </RowComponent>
          </ColComponent>
        </RowComponent>
      </ScrollView>
    </ContainerComponent>
  );
}
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SpaceComponent, TextComponent } from '@/components';
import appColors from '@/constants/appColors';
import { auth } from '@/untility/firebase';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert } from 'react-native';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');

  const handleReset = async () => {
    if (!email) {
      Alert.alert('Lỗi', 'Vui lòng nhập email');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Thành công', 'Hãy kiểm tra email của bạn để đặt lại mật khẩu');
      router.back();
    } catch (error: any) {
      console.error(error);
      Alert.alert('Lỗi', error.message);
    }
  };

  return (
    <ContainerComponent style={{backgroundColor: 'white'}}>
      <SpaceComponent height={70}/>
      <RowComponent styles={{justifyContent: 'flex-start'}}>
        <ButtonComponent 
          type='primary'
          color={appColors.white}
          onPress={() => router.replace('/(auth)/Login')} 
          icon={<Ionicons name="arrow-back" size={24} color="black"/>}
          styles={{
            width: 60,
            borderRadius: 30,
            margin: 15}}/>
      <TextComponent text="Quên mật khẩu" styles={{fontWeight: 'bold',  marginLeft: 40}} />
      </RowComponent>
      <SpaceComponent height={40}/>
      <RowComponent styles={{margin: 20}}>
      <InputComponent
        placeholder="Nhập email"
        value={email}
        onChange={setEmail}
      />
      </RowComponent>
      <ButtonComponent type='primary' text="Gửi yêu cầu đặt lại mật khẩu" onPress={handleReset} />
    </ContainerComponent>
  );
}

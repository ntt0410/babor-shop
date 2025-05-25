import { ButtonComponent, ColComponent, ContainerComponent, InputComponent, RowComponent, SpaceComponent, TextComponent } from '@/components';
import appColors from '@/constants/appColors';
import { auth, fs } from '@/untility/firebase';
import { AntDesign, EvilIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Alert, ScrollView } from 'react-native';

export default function RegisterScreen() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const router = useRouter();

    const handleRegister = () => {
        if (!email || !password || !confirmPassword) {
            Alert.alert('Vui lòng nhập đủ thông tin');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Vui lòng nhập email hợp lệ');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Mật khẩu không khớp');
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredentials) => {
            const user = userCredentials.user;
            console.log(user);

            try {
                await setDoc(doc(fs, "users", user.uid), {
                    email: user.email,
                    createdAt: new Date(),
                });

                Alert.alert('Đăng ký thành công!');
                router.push('/Login');
            } catch (error: any) {
                const errorMsg = error?.message || 'Lỗi không xác định';
                Alert.alert('Lỗi khi lưu thông tin vào Firestore', errorMsg);
            }
        })
        .catch((error: Error) => {
            const errorMsg = error?.message || 'Lỗi không xác định';
            Alert.alert('Lỗi khi đăng ký', errorMsg);
        });
    };



  return (
    <ContainerComponent style={{backgroundColor: appColors.primary}}>
        <RowComponent styles={{ justifyContent: 'flex-start', height: 140}}>
            <ButtonComponent 
                type='primary' 
                onPress={() => router.back()} 
                icon={<Ionicons name="arrow-back" size={24} color="black"/>}
                styles={{
                    width: 60,
                    borderRadius: 30,
                    margin: 25}}/>
        </RowComponent>
        <ScrollView>
        <RowComponent styles={{
                backgroundColor: appColors.white,
                height: 160,
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
            }}>
                <ColComponent style={{alignItems: 'center'}}>
                    <TextComponent text='Babor Shop' size={36} color={appColors.primary} styles={{fontWeight: 'bold'}}/>
                    <SpaceComponent height={20}/>
                    <TextComponent text='Đăng Ký' size={24}/>
                </ColComponent>
        </RowComponent>
        <RowComponent styles={{backgroundColor: appColors.white}}>
            <ColComponent>
            <TextComponent text='Email :' styles={{marginLeft: 10}}/>
                <RowComponent styles={{padding: 10}}>
                    <InputComponent 
                        placeholder='Email'
                        affix={<AntDesign name="user" size={20} color={appColors.gray} />}
                        value={email}
                        onChange={setEmail}
                        />
                </RowComponent>
                <TextComponent text='Mật khẩu :' styles={{marginLeft: 10}}/>
                <RowComponent styles={{padding: 10}}>
                    <InputComponent 
                        placeholder='Mật khẩu'
                        affix={<EvilIcons name="lock" size={26} color={appColors.gray} />}
                        isPassword
                        value={password}
                        onChange={setPassword}
                        />
                </RowComponent>
                <TextComponent text='Nhập lại khẩu :' styles={{marginLeft: 10}}/>
                <RowComponent styles={{padding: 10}}>
                    <InputComponent 
                        placeholder='Nhập lại khẩu'
                        affix={<EvilIcons name="lock" size={26} color={appColors.gray} />}
                        isPassword
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                        />
                </RowComponent>
                <ButtonComponent type='primary' text='Đăng ký' styles={{width: '60%'}} onPress={handleRegister}/>
                <RowComponent>
                    <TextComponent text='Đã có tài khoản? '/>
                    <ButtonComponent type='text' text='Đăng nhập' onPress={() => router.back()}/>
                </RowComponent>
                <SpaceComponent height={30}/>
                <RowComponent styles={{justifyContent: 'space-around'}}>
                    <ButtonComponent 
                        type='primary' 
                        color={appColors.white}
                        icon={<AntDesign name="facebook-square" size={40} color={appColors.primary} />} 
                        styles={{
                            borderRadius: 40,
                            width: 80,
                            height: 80,
                        }}/>
                        <ButtonComponent 
                        type='primary' 
                        color={appColors.white}
                        icon={<AntDesign name="google" size={40} color={appColors.primary} />} 
                        styles={{
                            borderRadius: 40,
                            width: 80,
                            height: 80,
                        }}/>
                        <ButtonComponent 
                        type='primary' 
                        color={appColors.white}
                        icon={<AntDesign name="apple1" size={40} color={appColors.primary} />} 
                        styles={{
                            borderRadius: 40,
                            width: 80,
                            height: 80,
                        }}/>
                </RowComponent>
                <RowComponent styles={{height: 100}}>
                    <TextComponent text='_~.~_Design by Thanh Tu_~.~_'/>
                </RowComponent>
            </ColComponent>
        </RowComponent>
        </ScrollView>
    </ContainerComponent>
  )
}
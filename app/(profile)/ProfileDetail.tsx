import { ButtonComponent, ContainerComponent, RowComponent, SpaceComponent, TextComponent } from '@/components';
import appColors from '@/constants/appColors';
import { useAuthStore } from '@/stores/useAuthStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, View } from 'react-native';

export default function ProfileDetailScreen() {
    const { user } = useAuthStore();
    const router = useRouter();
    
  return (
    <ContainerComponent>
        <SpaceComponent height={50}/>
        <RowComponent styles={{justifyContent: 'flex-start'}}>
            <ButtonComponent 
                type='primary'
                color={appColors.white}
                onPress={() => router.replace('/(tabs)/Profile')} 
                icon={<Ionicons name="arrow-back" size={24} color="black"/>}
                styles={{
                    width: 60,
                    borderRadius: 30,
                    margin: 15}}/>
            <TextComponent text='Thông tin tài khoản' styles={{fontWeight: 'bold', marginLeft: 20}}/>
        </RowComponent>
        <ScrollView>
            <RowComponent>
                <Image source={{uri: user.photoUrl}} style={{width: 80, height: 80}}/>
            </RowComponent>
            <TextComponent text='THÔNG TIN CÁ NHÂN' size={12} styles={{margin: 20, fontWeight: 'bold'}}/>
            <RowComponent styles={{justifyContent: 'space-between', margin: 20}}>
                <TextComponent text='Họ và tên' color={appColors.gray4}/>
                <TextComponent text={user.username}/>
            </RowComponent>
            <View style={{height: 1, backgroundColor: 'black', marginLeft: 20, marginRight: 20}} />
            <RowComponent styles={{justifyContent: 'space-between', margin: 20}}>
                <TextComponent text='Email' color={appColors.gray4}/>
                <TextComponent text={user.email}/>
            </RowComponent>
            <View style={{height: 1, backgroundColor: 'black', marginLeft: 20, marginRight: 20}} />
            <RowComponent styles={{justifyContent: 'space-between', margin: 20}}>
                <TextComponent text='Ngày sinh' color={appColors.gray4}/>
                <TextComponent text={user?.birthday ? user.birthday : 'Chưa có thông tin'}/>
            </RowComponent>
            <View style={{height: 1, backgroundColor: 'black', marginLeft: 20, marginRight: 20}} />
            <RowComponent styles={{justifyContent: 'space-between', margin: 20}}>
                <TextComponent text='Số điện thoại' color={appColors.gray4}/>
                <TextComponent text={user?.phoneNumber ? user.phoneNumber : 'Chưa có thông tin'}/>
            </RowComponent>
            <View style={{height: 1, backgroundColor: 'black', marginLeft: 20, marginRight: 20}} />
            <RowComponent styles={{justifyContent: 'flex-end', margin: 20}}>
                <ButtonComponent text='Chỉnh sửa' type='primary' color={appColors.gray4} styles={{width: 120}}/>
            </RowComponent>
        </ScrollView>
    </ContainerComponent>
  )
}
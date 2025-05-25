import { ButtonComponent, ColComponent, ContainerComponent, RowComponent, TextComponent } from '@/components';
import appColors from '@/constants/appColors';
import { useAuthStore } from '@/stores/useAuthStore';
import { globalStyles } from '@/styles/globalStyles';
import { AntDesign, Entypo, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, View } from 'react-native';

const menuItems = [
  { id: '1', label: 'Thông tin tài khoản', icon: <Ionicons name="person-circle-outline" size={24} color="black" />, route: '/ProfileDetail' },
  { id: '2', label: 'Địa chỉ nhà', icon: <Entypo name="location-pin" size={24} color="black" />, route: '' },
  { id: '3', label: 'Ưu đãi', icon: <MaterialIcons name="local-offer" size={24} color="black" />, route: '' },
  { id: '4', label: 'Lịch sử cắt tóc', icon: <FontAwesome5 name="history" size={24} color="black" />, route: '/History' },
  { id: '5', label: 'Hệ thống cửa hàng babor', icon: <Entypo name="shop" size={24} color="black" />, route: '' },
  { id: '6', label: 'Chính sách hỗ trợ khách hàng', icon: <MaterialIcons name="support-agent" size={24} color="black" />, route: '' },
  { id: '7', label: 'Đăng xuất', icon: <MaterialIcons name="logout" size={24} color="black" />, route: '/Login' },
];

export default function ProfileScreen() {
    const { user, logout } = useAuthStore();
    const router = useRouter();

    const renderItem = ({ item }: any) => (
        <RowComponent 
          styles={{justifyContent: 'space-between', margin: 20}}
          onPress={() => {
            if (item.id === '7') {
              logout();
              router.replace(item.route);
            } else {
              router.push(item.route);
            }
          }}>
          <RowComponent>
          {item.icon}
          <TextComponent text={item.label} styles={{marginLeft: 20}}/>
          </RowComponent>
          <Entypo name="chevron-right" size={24} color="gray" />
        </RowComponent>
    );

  return (
    <ContainerComponent>
      <RowComponent styles={{justifyContent: 'flex-start' ,marginTop: 70, marginLeft: 20}}>
        <Image source={{uri: user.photoUrl}} style={{height: 80, width: 80, borderRadius: 50}}/>
        <ColComponent style={{marginLeft: 10}}>
          <TextComponent text={user.username} styles={{fontWeight: 'bold'}}/>
          <TextComponent text={`Xin chào ${user.username}`} size={12} color={appColors.gray4}/>
        </ColComponent>
        <ButtonComponent 
          type='primary' 
          color={appColors.white} 
          styles={{
            width: 60,
            marginLeft: 80,
            borderRadius: 30
          }}
          onPress={() => router.push('/(profile)/ProfileDetail')}
          icon={<AntDesign name="right" size={24} color="black" />}/>
      </RowComponent>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={[globalStyles.separator]} />}
        contentContainerStyle={{ paddingVertical: 10 }}
        showsVerticalScrollIndicator={false}
      />
    </ContainerComponent>
  )
}
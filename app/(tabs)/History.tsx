import { CardComponent, ColComponent, ContainerComponent, RowComponent, SpaceComponent, TextComponent } from '@/components';
import appColors from '@/constants/appColors';
import { useAuthStore } from '@/stores/useAuthStore';
import { fs } from '@/untility/firebase';
import Entypo from '@expo/vector-icons/Entypo';
import { collection, doc, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

export default function HistoryScreen() {
  const { user } = useAuthStore();
  const [history, setHistory] = useState<any[]>([]);
  const [salons, setSalons] = useState<any[]>([]);

  useEffect(() => {
  const fetchHistory = async () => {
    try {
      const userRef = doc(fs, 'users', user.uid);
      const appointmentsRef = collection(userRef, 'appointments');

      const q = query(appointmentsRef, orderBy('createdAt', 'desc'));

      const snapshot = await getDocs(q);

      const result = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const salonsSnap = await getDocs(collection(fs, 'baborShops'));
      const salonsList = salonsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setHistory(result);
      setSalons(salonsList);

    } catch (error) {
      console.error('Lỗi khi lấy lịch sử:', error);
    }
  };

  fetchHistory();
}, [user.uid]);

  return (
    <ContainerComponent>
      <SpaceComponent height={70}/>
      <RowComponent>
        <TextComponent text='Lịch sử cắt' styles={{fontWeight: 'bold'}}/>
      </RowComponent>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const matchedSalon = salons.find(s => s.id === item.salonId);
          return (
            <CardComponent>
              <RowComponent styles={{justifyContent: 'flex-start'}}>
                <Entypo name="home" size={30} color="black" />
                  <ColComponent>
                    <TextComponent text={matchedSalon?.name} styles={{marginLeft: 10}}/>
                    <RowComponent>
                      <TextComponent text={`${new Date(item.createdAt.seconds * 1000).toLocaleDateString('vi-VN')}`} styles={{marginLeft: 10}} color={appColors.gray4}/>
                      <TextComponent text={item.timeSlot} styles={{marginLeft: 10}} color={appColors.gray4}/>
                    </RowComponent>
                  </ColComponent>
              </RowComponent>
              <RowComponent styles={{justifyContent: 'flex-start'}}>
                <TextComponent text='Địa chỉ:  ' color={appColors.gray4} />
                <TextComponent text={matchedSalon?.address} />
              </RowComponent>
              <RowComponent styles={{justifyContent: 'flex-start'}}>
                <TextComponent text='Kiểu tóc:  ' color={appColors.gray4} />
                <TextComponent text={item.styleDetail} />
              </RowComponent>
              <RowComponent styles={{justifyContent: 'flex-start'}}> 
                <TextComponent text='Trạng thái:  ' color={appColors.gray4} />
                <TextComponent 
                  text={item.status} 
                  color={item.status === 'Đã cắt' ? 'green' : 'orange'} 
                />
              </RowComponent>
            </CardComponent>
          );
        }}
      />
    </ContainerComponent>
  )
}
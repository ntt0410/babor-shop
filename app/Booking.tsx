import { ButtonComponent, ColComponent, ContainerComponent, InputComponent, RowComponent, SpaceComponent, TextComponent } from "@/components";
import appColors from "@/constants/appColors";
import { useAuthStore } from "@/stores/useAuthStore";
import { fs } from "@/untility/firebase";
import Entypo from '@expo/vector-icons/Entypo';
import { router } from "expo-router";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, ScrollView, TouchableOpacity } from "react-native";

export default function BookingScreen() {

  const [salons, setSalons] = useState<any[]>([]);
  const [selectedSalon, setSelectedSalon] = useState<string | null>(null);
  const [styleDetail, setStyleDetail] = useState('');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const { user } = useAuthStore();

  useEffect(() => {
    const fetchSalons = async () => {
      const ref = collection(fs, 'baborShops');
      const snap = await getDocs(ref);
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSalons(data);
    };
    fetchSalons();
  }, []);

  const currentTime = new Date().toLocaleString('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const chooseTime = () => {
  const slots: string[] = [];
  for (let hour = 8; hour <= 20; hour++) {
    const time = `${hour.toString().padStart(2, '0')}:00`;
    slots.push(time);
  }
  return slots;
};

const timeSlots = chooseTime();

const handleSubmit = async () => {
  try {
    if (!selectedSalon || !styleDetail || !selectedTime) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    const userRef = doc(fs, 'users', user.uid);
    const appointmentsRef = collection(userRef, 'appointments');

    await addDoc(appointmentsRef, {
      userId: user.uid,
      salonId: selectedSalon,
      styleDetail: styleDetail,
      timeSlot: selectedTime,
      status: 'Chưa cắt',
      createdAt: new Date(),
    });

    alert('Đặt lịch thành công!');
    router.push('/(tabs)/History')
  } catch (error) {
    console.error("Lỗi khi đặt lịch:", error);
  }
};

  return (
    <ContainerComponent style={{backgroundColor: appColors.white}}>
      <RowComponent styles={{justifyContent: 'flex-start' ,margin: 20, marginTop: 70}}>
        <ButtonComponent 
          type="primary" 
          color={appColors.white} 
          styles={{
            width: 70,
            borderRadius: 35
          }}
          icon={<Entypo name="home" size={30} color="black"/>}
          onPress={() => router.back()}
          />
          <TextComponent text="ĐẶT LỊCH" styles={{marginLeft: 60, fontWeight: 'bold', marginBottom: 10}}/>
      </RowComponent>
      <ScrollView>
        <TextComponent text="1. Chọn salon" styles={{margin: 15, fontWeight: '500'}}/>
        <FlatList
          horizontal
          data={salons}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedSalon(item.id)}>
              <ColComponent
                style={{
                  backgroundColor: selectedSalon === item.id ? appColors.primary : appColors.gray4,
                  padding: 10,
                  margin: 5,
                  borderRadius: 10,
                  width: 200,
                }}
              >
                <TextComponent
                  text={item.name}
                  numberOfLine={1}
                  styles={{
                    fontWeight: 'bold',
                    marginBottom: 5,
                    color: selectedSalon === item.id ? appColors.white : appColors.text
                  }}
                />
                <TextComponent
                  text={item.address}
                  numberOfLine={1}
                  size={12}
                  color={selectedSalon === item.id ? appColors.white : appColors.text}
                />
                <TextComponent
                  text={`SĐT: ${item.phone}`}
                  size={12}
                  color={selectedSalon === item.id ? appColors.white : appColors.text}
                />
              </ColComponent>
            </TouchableOpacity>
          )}
        />
        <TextComponent text="2. Chi tiết kiểu tóc hoặc uốn, nhuộm" styles={{margin: 15, fontWeight: '500'}}/>
        <RowComponent styles={{margin: 20}}>
          <InputComponent
            placeholder="Mô tả kiểu tóc bạn muốn"
            value={styleDetail}
            onChange={setStyleDetail}
          />
        </RowComponent>
        <TextComponent text="3. Chọn thời gian cắt" styles={{margin: 15, fontWeight: '500'}}/>
                <TextComponent
          text={`Hôm nay: ${currentTime}`}
          styles={{ marginLeft: 10, fontWeight: '600' }}
          color={appColors.danger}
        />
        <FlatList
          data={timeSlots}
          keyExtractor={(item) => item}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedTime(item)}>
              <TextComponent
                text={item}
                styles={{
                  backgroundColor: selectedTime === item ? appColors.primary : appColors.gray4,
                  padding: 10,
                  margin: 5,
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
          )}
        />
        <SpaceComponent height={20}/>
        <ButtonComponent text="Chốt giờ cắt" type="primary" onPress={handleSubmit} />
      </ScrollView>
    </ContainerComponent>
  );
}

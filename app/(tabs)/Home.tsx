import { AvatarComponent, ButtonComponent, ContainerComponent, ProductItem, RowComponent, SpaceComponent, TextComponent } from "@/components";
import ColComponent from "@/components/ColComponet";
import appColors from "@/constants/appColors";
import { useAuthStore } from "@/stores/useAuthStore";
import { fs } from "@/untility/firebase";
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { FlatList, ImageBackground, ScrollView, ViewStyle } from "react-native";

const featureButtons = [
  {
    icon: <MaterialIcons name="local-offer" size={28} color={appColors.primary} />,
    label: "Ưu đãi",
    marginLeft: 12,
  },
  {
    icon: <MaterialIcons name="card-membership" size={28} color={appColors.primary} />,
    label: "Babor Member",
    marginLeft: 2,
  },
  {
    icon: <MaterialIcons name="privacy-tip" size={28} color={appColors.primary} />,
    label: "Cam kết",
    marginLeft: 8,
  },
  {
    icon: <AntDesign name="earth" size={28} color={appColors.primary} />,
    label: "Hệ thống",
    marginLeft: 5,
  },
];

const data = [
  {
    id: "1",
    title: "Cắt tóc",
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuaNp7QZBZqye7moCxb91LNQxkiKbauv2Vtg&s',
  },
  {
    id: "2",
    title: "Uốn định hình ",
    imageUrl: 'https://sapvuottocnam.com/wp-content/uploads/2020/05/UON-TOC-NAM-DEP-1.jpg',
  },
  {
    id: "3",
    title: "Nhuộm tóc",
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpfX-sGcGcYYblvwt-PCYryqzTkrRqrNqpzA&s',
  },
];


const sharedButtonStyle = {
  width: 60,
  height: 60,
  borderRadius: 30,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 6,
  elevation: 5,
};

export default function HomeScreen() {

  const { user } = useAuthStore();
  useEffect(() => {
    const fetchUser = async () => {
      if (user?.uid) {
        try {
          const userDoc = await getDoc(doc(fs, 'users', user.uid));
          const userData = userDoc.data();

          if (userData && userData.photoUrl) {
          } else {
          }
        } catch (error) {
          console.error('Lỗi lấy avatar từ Firestore:', error); 
        }
      }
    };

    fetchUser();
  }, [user?.uid]);

  return (
    <ContainerComponent style={{backgroundColor: appColors.primary}}>
      <RowComponent styles={{marginTop: 70, justifyContent: 'space-between'}}>
        <RowComponent>
          <AvatarComponent source={user.photoUrl}/>
            <ColComponent style={{marginLeft: 10}}>
              <TextComponent
                text={
                  !user
                    ? "GUEST"
                    : user.username?.trim() === ""
                    ? "Chưa đặt tên"
                    : user.username
                }
                styles={{ fontWeight: "600" }}
                color={appColors.white}
              />
              <TextComponent text={!user ? "Đăng nhập ngay!" : "Xin chào bạn!"} color={appColors.white} size={12}/>
            </ColComponent>
        </RowComponent>
          <RowComponent>
            <ButtonComponent type="primary" icon={<AntDesign name="shoppingcart" size={30} color="white" />} styles={{width: 60, borderRadius: 30}} onPress={() => router.push('/(tabs)/Shop')}/>
            <ButtonComponent type="primary" icon={<Ionicons name="notifications" size={30} color="white" />} styles={{width: 60, marginLeft: 10, marginRight: 20, borderRadius: 30}}/>
          </RowComponent>
      </RowComponent>
      <SpaceComponent height={30}/>
      <ScrollView>
      <RowComponent
        styles={{
          justifyContent: 'space-around',
          backgroundColor: appColors.white,
          height: 130,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}
      >
        <FlatList
          data={featureButtons}
          horizontal
          keyExtractor={(_, index) => `feature-${index}`}
          contentContainerStyle={{ gap: 20, marginTop: 20, marginLeft: 30 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <ColComponent>
              <ButtonComponent
                type="primary"
                icon={item.icon}
                styles={sharedButtonStyle as ViewStyle}
                color="white"
              />
              <TextComponent
                text={item.label}
                size={10}
                styles={{ marginLeft: item.marginLeft }}
              />
            </ColComponent>
          )}
        />
      </RowComponent>
      <RowComponent 
        styles={{
          backgroundColor: appColors.white, 
          height: 140,
          }}>
        <RowComponent styles={{
            justifyContent: 'flex-start',
            borderRadius: 10,
            height: 100,
            width: '90%',
            borderWidth: 2,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            }}
             onPress={() => router.push('/(tabs)/History')}
             > 
          <ImageBackground 
            source={{uri: 'data:image/jpeg;base64,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'}}
            resizeMode="cover"
            style={{
              marginLeft: 10,
              height: 60,
              width: 60, 
            }}/>
            <RowComponent>
              <ColComponent style={{ width: '85%'}}>
                <TextComponent text="MỜI ĐÁNH GIÁ CHẤT LƯỢNG PHỤC VỤ" size={10} styles={{fontWeight: 'bold'}}/>
                <SpaceComponent height={10}/>
                <TextComponent text="Phản hồi của anh sẽ giúp chúng em cải thiện chất lượng dịch vụ tốt hơn." size={10} numberOfLine={2}/>
              </ColComponent>
            </RowComponent>
        </RowComponent>
      </RowComponent>
      <RowComponent styles={{backgroundColor: appColors.white, justifyContent: 'flex-start'}}>
        <TextComponent text=" DỊCH VỤ TÓC" size={18} styles={{margin: 10, fontWeight: 'bold'}}/>
      </RowComponent>
      <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{backgroundColor: appColors.white}}
          renderItem={({ item }) => (
            <RowComponent
              styles={{
                borderRadius: 10,
                borderWidth: 2,
                margin: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ColComponent style={{alignItems: 'center', margin: 10}}>
                <ImageBackground
                  source={{ uri: item.imageUrl }}
                  resizeMode="cover"
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                />
                <SpaceComponent height={10} />
                <TextComponent text={item.title} styles={{ fontWeight: "bold" }} />
                <SpaceComponent height={10} />
                <TextComponent text="Tìm hiểu thêm >>" size={12} color={appColors.primary} />
              </ColComponent>
            </RowComponent>
          )}
        />
        <RowComponent styles={{justifyContent: 'flex-start' ,backgroundColor: appColors.white}}>
          <TextComponent text="TOP SẢN PHẨM NỔI BẬT" styles={{margin: 10, fontWeight: 'bold'}}/>
        </RowComponent>
        <RowComponent>
          <ProductItem/>
        </RowComponent>
      </ScrollView>
    </ContainerComponent>
  );
}
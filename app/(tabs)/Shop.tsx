/* eslint-disable @typescript-eslint/no-unused-vars */
import { ButtonComponent, ColComponent, ContainerComponent, RowComponent, TextComponent } from '@/components';
import appColors from '@/constants/appColors';
import { fs } from '@/untility/firebase';
import AntDesign from '@expo/vector-icons/AntDesign';
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView } from 'react-native';

interface ProductData {
  productName: string;
  price: string;
  productImage: string;
  subProducts: string[];
}

export default function ShopScreen() {

  const [products, setProducts] = useState<ProductData[]>([]);
  const [newProducts, setNewProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const topSearchProducts = async () => {
      try {
        const productCollectionRef = collection(fs, 'products');
        const topSearchQuery = query(
          productCollectionRef,
          where('searchCount', '>', 100),
          orderBy('searchCount', 'desc'),
          limit(10)
        );

        const productSnapshot = await getDocs(topSearchQuery);

        const productsList: ProductData[] = [];
        productSnapshot.forEach((doc) => {
          const productData = doc.data() as ProductData;
          productsList.push(productData);
        });

        setProducts(productsList);
      } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error);
      } finally {
        setLoading(false);
      }
    };

    topSearchProducts();
  }, []);

  useEffect(() => {
  const fetchNewProducts = async () => {
    try {
      const productCollectionRef = collection(fs, 'products');

      const newProductsQuery = query(
        productCollectionRef,
        where('isNew', '==', true)
      );

      const productSnapshot = await getDocs(newProductsQuery);

      const productsList: ProductData[] = [];
      productSnapshot.forEach((doc) => {
        const productData = doc.data() as ProductData;
        productsList.push(productData);
      });

      setNewProducts(productsList);
    } catch (error) {
      console.error('Lỗi khi lấy sản phẩm mới:', error);
    }
  };

  fetchNewProducts();
}, []);


  return (
    <ContainerComponent>
      <ScrollView>
      <RowComponent styles={{justifyContent: 'space-between', marginTop: 70}}>
        <TextComponent text='Babor Shop' size={20} styles={{marginLeft: 20, fontWeight: 'bold'}}/>
        <ButtonComponent 
          type='primary' 
          styles={{
            marginRight: 20,
            width: 60,
            borderRadius: 30,
            backgroundColor: appColors.white
          }}
          icon={<AntDesign name="search1" size={24} color="black" />}/>
      </RowComponent>
      <RowComponent styles={{justifyContent: 'flex-start', marginLeft: 20}}>
        <ButtonComponent text='Địa chỉ' type='primary' color={appColors.gray4} styles={{borderRadius: 40, width: 100, marginRight: 10}}/>
        <ButtonComponent text='Đơn hàng' type='primary' color={appColors.gray4} styles={{borderRadius: 40,  width: 120}}/>
      </RowComponent>
      <RowComponent styles={{justifyContent: 'flex-start'}}>
        <TextComponent text='TOP TÌM KIẾM' styles={{margin: 20, fontWeight: 'bold'}}/>
      </RowComponent>
        <FlatList
        data={products}
        keyExtractor={(item, index) => `product-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{backgroundColor: appColors.white}}
        renderItem={({ item }) => (
          <RowComponent 
            styles={{
              margin: 20,
              height: 300,
              width: 250,
              borderRadius: 10,
              borderWidth: 2,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.1,
              shadowRadius: 3.5,
              elevation: 3,
              }}>
            <ColComponent style={{margin: 20}}>
              <Image resizeMode='cover' source={{uri: item.productImage}} style={{height: 200, width: 200}}/>
              <TextComponent text={item.productName} numberOfLine={2} styles={{fontWeight: 'bold'}}/>
              <TextComponent text={`${item.price} VND`} color={appColors.gray4}/>
            </ColComponent>
          </RowComponent>
        )}
      />
    <TextComponent text='SẢN PHẨM MỚI' styles={{margin: 20, fontWeight: 'bold'}} />
    <FlatList
        data={newProducts}
        keyExtractor={(item, index) => `product-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{backgroundColor: appColors.white}}
        renderItem={({ item }) => (
          <RowComponent 
            styles={{
              margin: 20,
              height: 300,
              width: 250,
              borderRadius: 10,
              borderWidth: 2,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.1,
              shadowRadius: 3.5,
              elevation: 3,
              }}>
            <ColComponent style={{margin: 20}}>
              <Image resizeMode='cover' source={{uri: item.productImage}} style={{height: 200, width: 200}}/>
              <TextComponent text={item.productName} numberOfLine={2} styles={{fontWeight: 'bold'}}/>
              <TextComponent text={`${item.price} VND`} color={appColors.gray4}/>
            </ColComponent>
          </RowComponent>
        )}
      />
    </ScrollView>
    </ContainerComponent>
  )
}
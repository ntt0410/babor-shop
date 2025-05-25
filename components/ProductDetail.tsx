import appColors from '@/constants/appColors';
import { fs } from '@/untility/firebase';
import { AntDesign } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import ButtonComponent from './ButtonComponent';
import RowComponent from './RowComponent';


interface ProductData {
  productID: number;
  productName: string;
  price: string;
  productImage: string;
  subProducts: string[];
  isNew?: boolean;
  searchCount?: number;
}

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const q = query(collection(fs, 'products'), where('productID', '==', Number(id)));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          setProduct(snapshot.docs[0].data() as ProductData);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#007AFF" style={styles.centered} />;
  }

  if (!product) {
    return (
      <View style={styles.centered}>
        <Text>Không tìm thấy sản phẩm</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <RowComponent styles={{justifyContent: 'flex-start'}}>
      <ButtonComponent 
          type='primary' 
          color={appColors.white} 
          styles={{
            width: 60,
            borderRadius: 30
          }}
          onPress={() => router.back()}
          icon={<AntDesign name="left" size={24} color="black" />}/>
          </RowComponent>
      <Image source={{ uri: product.productImage }} style={styles.mainImage} />
      <Text style={styles.productName}>{product.productName}</Text>
      <Text style={styles.price}>{product.price} VND</Text>

      {product.isNew && <Text style={styles.newLabel}>Sản phẩm mới</Text>}

      {product.subProducts && product.subProducts.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Ảnh chi tiết</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.subImagesContainer}>
            {product.subProducts.map((url, idx) => (
              <Image key={idx} source={{ uri: url }} style={styles.subImage} />
            ))}
          </ScrollView>
        </>
      )}

      <Text style={styles.searchCount}>Đã được tìm kiếm {product.searchCount ?? 0} lần</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: '#e91e63',
    marginBottom: 10,
  },
  newLabel: {
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  subImagesContainer: {
    marginBottom: 20,
  },
  subImage: {
    width: 120,
    height: 120,
    marginRight: 10,
    borderRadius: 10,
  },
  searchCount: {
    marginTop: 20,
    fontStyle: 'italic',
    color: '#888',
  },
});

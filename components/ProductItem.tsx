import appColors from "@/constants/appColors";
import { fs } from "@/untility/firebase";
import { useRouter } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


interface ProductData {
  productID: number,
  productName: string;
  price: string;
  productImage: string;
  subProducts: string[];
}

const ProductItem: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const productCollectionRef = collection(fs, 'products');
      const productSnapshot = await getDocs(productCollectionRef);

      const productsList: ProductData[] = productSnapshot.docs.map((doc) => {
          const data = doc.data() as ProductData;
          return data;
        });

      setProducts(productsList);
    } catch (error) {
      console.error('Lỗi khi lấy sản phẩm:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);



  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!products) {
    return <Text>Không có dữ liệu sản phẩm</Text>;
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item, index) => `product-${index}`}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{backgroundColor: appColors.white}}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: '/(product)/[id]',
              params: { id: String(item.productID) },
            })
          }
        >
          <View style={styles.productContainer}>
            <Image source={{ uri: item.productImage }} resizeMode="cover" style={styles.productImage} />
            <Text numberOfLines={2} style={styles.productName}>{item.productName}</Text>
            <Text style={styles.productPrice}>{item.price} VND</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  productContainer: {
    marginBottom: 100,
    marginLeft: 20,
    marginTop: 10,
    borderWidth: 2,
    width: 250,
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 3.5,
    elevation: 3,
  },
  productImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  subProductImage: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 10,
  },
});

export default ProductItem;

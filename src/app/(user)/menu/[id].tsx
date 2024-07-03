import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { defaultPizzaImage } from '@/components/ProductListItem';
import { useState } from 'react';
import Button from '@components/Button';
import { useCart } from '@/providers/CartProvider';
import { PizzaSize } from '@/types';
import { useProduct } from '@/api/products';
import RemoteImage from '@/components/RemoteImage';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0] ?? '');
  const { data: product, error, isLoading } = useProduct(id);

  const { addItem } = useCart();

  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

  const addToCart = () => {
    if(!product) return;
    addItem(product, selectedSize);
    router.push('/cart');
  };

  if(isLoading) {
    return <ActivityIndicator  />
  }

  if(error) {
    return <Text>Failed to fecth data</Text>
  }

  return (
    <View style={styles.container}>
      <Stack.Screen  options={{ title: product?.name }}/>
      <RemoteImage 
        path={product?.image}
        fallback={defaultPizzaImage}
         style={styles.image}/>

      <Text >Select Size</Text>

      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => setSelectedSize(size)}
            style={[
              styles.size, 
              { 
                backgroundColor: selectedSize === size ? 'gainsboro' : 'white', 
              },
            ]} 
            key={size}
       >
            <Text 
              style={[
                styles.sizeText, 
                { 
                  color: selectedSize === size ? 'black' : 'gray' 
                },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={ styles.price }>${product?.price} </Text>
      <Button onPress={addToCart} text="Add to Cart"/>
    </View>
  );
};
const styles = StyleSheet.create({
  container:{
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  price:{
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 'auto',
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  size:{
    backgroundColor: 'gainboro',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText:{
    fontSize: 20,
    fontWeight: '500',
  },
});
export default ProductDetailScreen;
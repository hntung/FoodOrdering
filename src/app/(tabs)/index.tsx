import { View } from 'react-native';
import products from '@/assets/data/products';
import ProductListItem from '@/src/components/ProductListItem';

export default function MenuScreen() {
  return (
    <View>
      <ProductListItem product={products[5]}/>
      <ProductListItem product={products[6]}/>
    </View>
  );
}
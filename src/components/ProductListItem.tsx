import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import { Product } from '@/types'; 
import { Link } from 'expo-router';

const defaultPizzaImage = 
  'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png';

type ProductListItemProps = {
  product: Product;

};


const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    <Link href={`/${product.id}`} asChild>
      <Pressable style={styles.container}>
       <Image source={{uri: product.image || defaultPizzaImage}} 
        style={styles.image} 
        resizeMode="contain"
        />

        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
}

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth : '50%',

  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  }
});

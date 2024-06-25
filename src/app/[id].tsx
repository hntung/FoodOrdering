import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text style={ {fontSize: 20} }>Product Detail Screen for id: {id} </Text>
    </View>
  );
};

export default ProductDetailScreen;
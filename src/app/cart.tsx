import { View, Text, Platform, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useCart } from '@/providers/CartProvider';
import CartListItem from '@/components/CartListIten';
const CartScreen = () => {
    const { items } = useCart();
    return (
        <View>
            <FlatList
                data={items} 
                renderItem={({ item }) => <CartListItem cartItem={item} />}
                contentContainerStyle={{ gap: 10, padding: 10 }}
            />
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    );
};

export default CartScreen;

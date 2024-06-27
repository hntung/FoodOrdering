import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View, FlatList } from "react-native";
import orders from "@assets/data/orders";
import OrderListItem from "@/components/OrderListItem";
import OrderItemListItem from "@/components/OrderItemListItem";

export default function OrderDatailScreen() {
    const { id } = useLocalSearchParams();
    const order = orders.find((order) => order.id.toString() === id);

    if (!order) {
        return <Text>Not found</Text>;
    }
    console.log(order);
    return (
        <View style={{ padding: 10, gap: 20, flex: 1 }}>
            <Stack.Screen options={{ title: `Order #${id}` }} />

            <FlatList 
                data={order.order_items}
                renderItem={({ item }) => <OrderItemListItem item={item}/>}
                contentContainerStyle={{ gap: 10 }}
                ListHeaderComponent={<OrderListItem order={order}/>}
            />
        </View>
    );
};
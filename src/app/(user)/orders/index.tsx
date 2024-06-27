import orders from "@assets/data/orders";
import { Text, FlatList, View } from "react-native";
import OderListItem from "@/components/OrderListItem";

export default function OrdersScreen() {
    return (
        <FlatList 
            data={orders} 
            renderItem={({ item }) => <OderListItem order={item}/>}
            contentContainerStyle={{ gap: 10, padding: 10 }}
        />
    );
}
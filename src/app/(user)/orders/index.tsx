import { Text, FlatList, ActivityIndicator } from "react-native";
import OderListItem from "@/components/OrderListItem";
import { useMyProductList } from "@/api/orders";

export default function OrdersScreen() {

    const { data: orders, isLoading, error } = useMyProductList();

    if (isLoading) {
        return <ActivityIndicator  />
    }

    if (error) {
        return <Text>Failed to fecth</Text>
    }

    return (
        <FlatList 
            data={orders} 
            renderItem={({ item }) => <OderListItem order={item}/>}
            contentContainerStyle={{ gap: 10, padding: 10 }}
        />
    );
}
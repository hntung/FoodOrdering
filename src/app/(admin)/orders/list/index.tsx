import { ActivityIndicator, FlatList, Text } from "react-native";
import OderListItem from "@/components/OrderListItem";
import { useAdminProductList } from "@/api/orders";

export default function OrdersScreen() {

    const { data: orders, isLoading, error } = useAdminProductList({archived: false});

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
import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View, FlatList, Pressable, ActivityIndicator } from "react-native";
import OrderListItem from "@/components/OrderListItem";
import OrderItemListItem from "@/components/OrderItemListItem";
import Colors from "@/constants/Colors";
import { OrderStatusList } from "@/types";
import { useOrderDetails, useUpdateOrder } from "@/api/orders";
import { notifyUserAboutOrderUpdate } from '@/lib/notifications';
export default function OrderDatailScreen() {
    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0] ?? '');

    const { data: order, isLoading, error } = useOrderDetails(id);
    const {mutate: updateOrder} = useUpdateOrder();
   
    const updateStatus = async (status: string) => {
        await updateOrder({id: id , updatedFields: {status} });
        console.log('Notify: ',order?.user_id);
        if(order){
            notifyUserAboutOrderUpdate({...order, status});
        }
    };
    if(isLoading) {
        return <ActivityIndicator  />
      }
    
    if(error || !order) {
        return <Text>Failed to fecth data</Text>
    }

    return (
        <View style={{ padding: 10, gap: 20, flex: 1 }}>
            <Stack.Screen options={{ title: `Order #${id}` }} />

            <FlatList 
                data={order.order_items}
                renderItem={({ item }) => <OrderItemListItem item={item}/>}
                contentContainerStyle={{ gap: 10 }}
                ListHeaderComponent={<OrderListItem order={order}/>}
                ListFooterComponent={
                    <>
                        <Text style={{ fontWeight: 'bold' }}>Status</Text>
                        <View style={{ flexDirection: 'row', gap: 5 }}>
                            {OrderStatusList.map((status) => (
                                <Pressable
                                    key={status}
                                    onPress={() => updateStatus(status)}
                                    style={{
                                        borderColor: Colors.light.tint,
                                        borderWidth: 1,
                                        padding: 10,
                                        borderRadius: 5,
                                        marginVertical: 10,
                                        backgroundColor:
                                            order.status === status
                                            ? Colors.light.tint
                                            : 'transparent',
                                    }}
                        >
                            <Text
                                style={{
                                    color:
                                        order.status === status ? 'white' : Colors.light.tint,
                                }}
                            >
                                {status}
                            </Text>
                                </Pressable>
    ))}
  </View>
</>

                }
            />
        </View>
    );
};
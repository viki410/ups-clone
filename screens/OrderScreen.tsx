import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useTailwind } from 'tailwind-rn/dist';
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { TabStackParamList } from '../navigator/TabNavigator'
import { RootStackParamList } from '../navigator/RootNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Deliverycard from '../components/Deliverycard';

type Props = {
    item: Order;
};

type OrderScreenRouteProp = RouteProp<RootStackParamList, "Order">;

export type OrdersScreenNavigationProp = CompositeNavigationProp<
BottomTabNavigationProp<TabStackParamList, "Orders">,
NativeStackNavigationProp<RootStackParamList>
>


const OrderScreen = () => {
    const tw = useTailwind();
    const navigation = useNavigation<OrdersScreenNavigationProp>();
    const { params: {order }} = useRoute<OrderScreenRouteProp>();

    useLayoutEffect(() => {
        navigation.setOptions({
             headerTitle: order.trackingItems.customer?.name,   
             headerBackTitle: "Deliveries",
             headerTintColor: "#EB6A7C",
             headerTitleStyle: {color: "black"}
        });
    }, [order])

  return (
    <View style={tw('-mt-2')}>
      <Deliverycard order={order} fullWidth={true}/>
    </View>
  )
}

export default OrderScreen
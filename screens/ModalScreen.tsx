import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import { Icon } from '@rneui/themed';
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import useCustomerOrders from '../hooks/useCustomerOrders';
import Deliverycard from '../components/Deliverycard';

type ModalScreenNavigationProp = CompositeNavigationProp<
BottomTabNavigationProp<TabStackParamList>,
NativeStackNavigationProp<RootStackParamList, "MyModal">
>;

type ModalScreenRouteProp = RouteProp<RootStackParamList, "MyModal">

const ModalScreen = () => {
    const tw= useTailwind();
    const navigation = useNavigation<ModalScreenNavigationProp>();
    const {params: {name, userId}} = useRoute<ModalScreenRouteProp>();

    const {loading, error, orders } = useCustomerOrders(userId);
  return (
    <View>
      <TouchableOpacity onPress={navigation.goBack} style={tw('absolute right-5 top-5 z-10')}>
        <Icon name='closecircle' type='antdesign' />
      </TouchableOpacity>
      <View style={{ marginTop: 10}}>
        <View style={[tw('py-5 border-b'), {borderColor: "#59C1CC"}]}>
        <Text style={[tw('text-center text-xl font-bold'), {color: "#59C1CC"}]}>{name}</Text>
        <Text style={[tw('text-center italic'), {}]}>Deliveries Scheduled</Text>
        </View>
      </View>

      <FlatList 
        data={orders}
        keyExtractor={order => order.trackingId}
        renderItem={({item: order}) => <Deliverycard order={order}/>} />
    </View>
  )
}

export default ModalScreen
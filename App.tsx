import { StyleSheet, Text, View } from 'react-native';
import {TailwindProvider} from 'tailwind-rn';
import CustomersScreen from './screens/CustomersScreen';
import utilities from './tailwind.json';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigator/RootNavigator';
import { ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";

const client = new ApolloClient ({
  uri: "http://10.0.0.162:5001/api/halting-tuatara",
  cache: new InMemoryCache(),
})


export default function App() {
  return (
    //@ts-ignore
    
      <TailwindProvider utilities={utilities}>
        <ApolloProvider client={client}>
          <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </TailwindProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import { AppContext, AppContextProvider } from './context/app-context';
import LoginScreen from './screens/loginScreen';
import RegisterScreen from './screens/registerScreen';
import HomeScreen from './screens/homeScreen';
import SearchScreen from './screens/searchScreen';
import InfoScreen from './screens/infoScreen';
import { useContext, useState } from 'react';
import StoreInfoScreen from './screens/storeinfoscreen';
import StoreSearch from './components/StoreSearch';
import { RegisterContextProvider } from './context/register-context';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function GuestStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="login" component={LoginScreen} options={{ title: "로그인" }} />
      <Stack.Screen name="register" component={RegisterScreen} options={{ title: "회원가입" }} />
      <Stack.Screen name='storeSearch' component={StoreSearch} options={{ title: "점포 검색", presentation: "modal" }} />
    </Stack.Navigator>
  )
}

function MemberStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="info" component={InfoScreen} options={{ title: "마이페이지" }} />
    </Stack.Navigator>
  )
}

function AccountStackNavigator() {
  console.log("로그인 네비게이터 실행됨!");
  const ctx = useContext(AppContext);
  console.log(ctx)
  return (
    <Stack.Navigator>
      <Stack.Screen name='accountStack' component={ctx.auth ? MemberStackNavigator : GuestStackNavigator} options={{title:"마이페이지", headerShown: false,}}/>
    </Stack.Navigator>
  )
}

function SearchStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='home' component={SearchScreen} options={{ title: "검색" }} />
    </Stack.Navigator>
  )
}

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='home' component={HomeScreen} options={{ title: "맛집탐색" }} />
    </Stack.Navigator>
  )
}

function RootNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='homeStack' component={HomeStackNavigator}
        options={{
          title: "홈", // 메인 타이틀 이름
          tabBarLabel: "홈", // 탭 바 라벨 이름
          tabBarLabelStyle: { fontSize: 14 },
          headerShown: false,
          tabBarIcon: ({ color }) =>
            <Ionicons name='home' color={color} size={24} />
        }} />
      <Tab.Screen name='searchStack' component={SearchStackNavigator}
        options={{
          title: "검색",
          tabBarLabel: "검색",
          tabBarLabelStyle: { fontSize: 14 },
          headerShown: false,
          tabBarIcon: ({ color }) =>
            <Ionicons name='search' color={color} size={24} />
        }} />
      <Tab.Screen name='account' component={AccountStackNavigator}
        options={{
          title: "마이페이지",
          tabBarLabel: "마이페이지",
          tabBarLabelStyle: { fontSize: 14 },
          headerShown: false,
          tabBarIcon: ({ color }) =>
            <Ionicons name='person' color={color} size={24} />
        }} />
    </Tab.Navigator>
  );
}

export default function App() {

  return (
    <>
      <StatusBar style='auto' />
      <AppContextProvider>
        <RegisterContextProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </RegisterContextProvider>
      </AppContextProvider>
    </>
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

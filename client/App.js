import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
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
import CategorySelectScreen from './screens/categorySelect';
import FavoritesStore from './screens/favoritesStore';
import Reservation from './screens/reservationScreen';
import ReservationConfirm from './screens/reservationConfirmScreen';
import ReservationHistoryScreen from './screens/reservationHistoryScreen';
import WriteStoreReview from './screens/writeStoreReview';
import Test_Calendar_Agenda from './screens/calendarAgendaScreen';
import SellerCalenderScreen from './screens/sellerCalenderScreen';
import ConsumerCalenderScreen from './screens/consumerCalenderScreen';


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
      <Stack.Screen name="favorites" component={FavoritesStore} options={{ title: "즐겨찾기", presentation: "modal" }} />
      <Stack.Screen name="history" component={ReservationHistoryScreen} options={{ title: "이용내역", presentation: "modal" }} />
      <Stack.Screen name="writeReview" component={WriteStoreReview} options={{ title: "리뷰 작성", presentation: "modal" }} />
      <Stack.Screen name="sellerCalender" component={SellerCalenderScreen} options={{ title: "판매자 캘린더" }} />
      <Stack.Screen name="consumerCalender" component={ConsumerCalenderScreen} options={{ title: "예약 캘린더" }} />
    </Stack.Navigator>
  )
}

function AccountStackNavigator() {
  console.log("로그인 네비게이터 실행됨!");
  const ctx = useContext(AppContext);
  console.log(ctx, "app")
  return (
    <Stack.Navigator>
      <Stack.Screen name='accountStack' component={ctx.auth ? MemberStackNavigator : GuestStackNavigator} options={{ title: "마이페이지", headerShown: false, }} />
    </Stack.Navigator>
  )
}

function SearchStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='search' component={SearchScreen} options={{ title: "검색" }} />
      <Stack.Screen name='categorySelect' component={CategorySelectScreen} options={{ title: "카테고리" }} />
    </Stack.Navigator>
  )
}

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='home' component={HomeScreen} options={{ title: "맛집탐색" }} />
      <Stack.Screen name='storeInfo' component={StoreInfoScreen} options={{ title: "맛집탐색", presentation: "modal" }} />
      <Stack.Screen name="reservation" component={Reservation} options={{ title: "예약하기" }} />
      <Stack.Screen name="reservationConfirm" component={ReservationConfirm} options={{ title: "예약완료" }} />
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

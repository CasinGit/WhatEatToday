import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { AppContextProvider } from './context/app-context';
import LoginScreen from './screens/loginScreen';
import RegisterScreen from './screens/registerScreen';
import InfoScreen from './screens/infoScreen';
import HomeScreen from './screens/homeScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function GuestStackScreen() {
  return (
    <Stack.Navigator screenOptions={
      {
        headerTitleStyle: {
          fontSize: 32
        },
      }
    }>
      <Stack.Screen name="login" component={LoginScreen} options={{ title: "로그인" }} />
      <Stack.Screen name="register" component={RegisterScreen} options={{ title: "회원가입" }} />
    </Stack.Navigator>
  )
}

function MemberStackScreen() {
  return (
    <>
      <Stack.Screen name="info" component={InfoScreen} options={{ title: "마이페이지" }} />
    </>
  )
}

// function AccountStackNavigator() {
//   console.log("로그인 네비게이터 실행됨!");
//   const ctx = useContext(AppContext);
//   console.log(ctx)
//   return (
//     <Stack.Navigator>
//       {ctx.auth ?
//         MemberStackScreen()
//         :
//         GuestStackScreen()
//       }
//     </Stack.Navigator>
//   )
// }

function SearchStackNavigator() {

}

function HomeStackNavigator() {
  <Stack.Navigator>
    <Stack.Screen name='home' component={HomeScreen} options={{ title: "홈"}}/>
  </Stack.Navigator>
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
      <Tab.Screen name='account' component={GuestStackScreen}
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
        <NavigationContainer >
          <RootNavigator />
        </NavigationContainer>
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

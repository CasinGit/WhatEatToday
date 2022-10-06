import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, TabRouter } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { AppContext, AppContextProvider } from './context/app-context';
import { useContext } from 'react';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function GuestStackScreen() {
  return (
    <>
      <Stack.Screen name="login" component={LoginScreen} options={{ title: "로그인" }} />
      <Stack.Screen name="register" component={RegisterScreen} options={{ title: "회원가입" }} />
    </>
  )
}

function MemberStackScreen() {
  return (
    <>
      <Stack.Screen name="info" component={InfoScreen} options={{ title: "인포" }} />
    </>
  )
}

function AccountStackNavigator() {
  console.log("로그인 네비게이터 실행됨!");
  const ctx = useContext(AppContext);
  console.log(ctx)
  return (
    <Stack.Navigator>
      {ctx.auth ?
        MemberStackScreen()
        :
        GuestStackScreen()
      }
    </Stack.Navigator>
  )
}

function PostStackNavigator() {

}

function HomeStackNavigator() {

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
      <Tab.Screen name='postStack' component={PostStackNavigator}
        options={{
          title: "게시글",
          tabBarLabel: "게시글",
          tabBarLabelStyle: { fontSize: 14 },
          headerShown: false,
          tabBarIcon: ({ color }) =>
            <Ionicons name='alert' color={color} size={24} />
        }} />
      <Tab.Screen name='account' component={AccountStackNavigator}
        options={{
          title: "계정",
          tabBarLabel: "계정",
          tabBarLabelStyle: { fontSize: 14 },
          headerShown: false,
          tabBarIcon: ({ color }) =>
            <Ionicons name='person' color={color} size={24} />
        }} />
    </Tab.Navigator>
  );
}

export default function App() {
//zzzz
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

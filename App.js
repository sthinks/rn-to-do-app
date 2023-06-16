import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IntroScreen from "./screens/IntroScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import LogoTitle from "./components/LogoTitle";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TasksScreen from "./screens/TasksScreen";
import { Ionicons } from "@expo/vector-icons";
import AddScreen from "./screens/AddScreen";
import { useEffect } from "react";
import { store } from "./store/index";
import { Provider, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { checkStoredUser } from "./store/userSlice";
import HeaderRight from "./components/HeaderRight";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View } from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ navigation, route }) => ({
          headerLeft: (props) => <LogoTitle {...props} />,
          headerRight: (props) => <HeaderRight {...props} />,
          headerStyle: {
            backgroundColor: "transparent",
            borderBottomWidth: 0,
          },
          headerTitleStyle: { display: "none" },
          tabBarActiveTintColor: "#1A2744",
          tabBarInactiveTintColor: "#81C5FF",
          tabBarLabelStyle: {
            display: "none",
          },
          tabBarStyle: {
            backgroundColor: "rgb(215 206 242)",
            zIndex: 0,
            height: 90,
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          component={AddScreen}
          options={{
            tabBarIcon: ({ size }) => (
              <View
                style={{
                  width: 65,
                  height: 65,
                  backgroundColor: "white",
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 60,
                }}
              >
                <View
                  style={{
                    width: 55,
                    height: 55,
                    backgroundColor: "#1A2744",
                    borderRadius: "50%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 0,
                  }}
                >
                  <Ionicons name="add" size={25} color="#fff" />
                </View>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Tasks"
          component={TasksScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="document" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    dispatch(checkStoredUser());
  }, [dispatch]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          {isLoggedIn ? (
            <Stack.Screen
              name="HomeScreen"
              component={TabNavigator}
              options={{
                headerShown: false,
              }}
            />
          ) : (
            <>
              <Stack.Screen
                name="Intro"
                component={IntroScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{
                  headerShown: false,
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

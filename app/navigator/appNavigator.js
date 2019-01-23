import {
    createStackNavigator,
    createAppContainer,
    createBottomTabNavigator,
    Dimensions,
    StackNavigator,
    DrawerNavigator,
} from 'react-navigation';
import SignUp from '../component/Signup'
import Login from '../component/Signin'
import Productapp from '../component/productAdd'
import ProductView from '../component/ProductView';
import Profile from'../component/Setting'
import IconI from "react-native-vector-icons/Ionicons";
import IconF from "react-native-vector-icons/FontAwesome";
import Home from '../component/Home.js'
import React from "react";
const AdminTabNavigator = createBottomTabNavigator({
    Product:{screen:Productapp},
    ProductView:{screen:ProductView},
    Profile:{screen:Profile}
},{
    initialRouteName:'ProductView',
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let IconComponent;
            let iconName;
            if (routeName === 'Product') {
                IconComponent= IconI;
                iconName = 'ios-home';

            }else if(routeName ==='ProductView'){
                IconComponent = IconF;
                iconName = 'shopping-cart';
            }
            else if(routeName ==='Profile'){
                IconComponent = IconF;
                iconName = 'ios-settings';
            }
            return <IconComponent name={iconName} size={25} color={tintColor} />;
        },
    }),
    tabBarOptions: {
        activeTintColor: '#ECB953',
        inactiveTintColor: '#FFFFFF',
        style: {
            height: 60,
            paddingVertical: 5,
            backgroundColor: "#475766"
        },
        labelStyle: {
            fontSize: 12,
            lineHeight: 20,

        }
    }});

const UserTabNavigator = createBottomTabNavigator({
    Home:{screen:Home},
    Profile:{screen:Setting}
},{
    initialRouteName:'Home',
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let IconComponent;
            let iconName;
            if (routeName === 'Home') {
                IconComponent= IconI;
                iconName = 'ios-home';
            }
            else if(routeName ==='Profile'){
                IconComponent = IconF;
                iconName = 'ios-settings';
            }
            return <IconComponent name={iconName} size={25} color={tintColor} />;
        },
    }),
    tabBarOptions: {
        activeTintColor: '#ECB953',
        inactiveTintColor: '#FFFFFF',
        style: {
            height: 60,
            paddingVertical: 5,
            backgroundColor: "#475766"
        },
        labelStyle: {
            fontSize: 12,
            lineHeight: 20,

        }
    }});
const primary = createStackNavigator({
    Login:{screen:Login},
    SignUp: {screen: SignUp},
    AdminTabBar : AdminTabNavigator,
    UserTabBar:UserTabNavigator
},{
    initialRouteName:'Login',
    headerMode:'none'

})
export default createAppContainer(primary)



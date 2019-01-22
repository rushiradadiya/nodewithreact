import {
    createStackNavigator,
    createAppContainer,
    createBottomTabNavigator,
    Dimensions,
    StackNavigator,
    DrawerNavigator,
} from 'react-navigation';
import Userdetails from '../component/userDetails';
import SignUp from '../component/Signup'
import Login from '../component/Signin'
import Productapp from '../component/productAdd'
import ProductView from '../component/ProductView';
import ProductDetails from '../component/ProductDetails'
import ProductItemDetails from '../component/ProductItemDetails'
import IconI from "react-native-vector-icons/Ionicons";
import IconF from "react-native-vector-icons/FontAwesome";
import Home from '../component/Home.js'
import React from "react";
const TabNavigator = createBottomTabNavigator({
    Home:{screen:Home},
    Product:{screen:ProductView},
    // ProductDetails:{screen:ProductDetails}
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

            }else if(routeName ==='Product'){
                IconComponent = IconF;
                iconName = 'shopping-cart';
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

    Product: { screen: Productapp}, // MainTab is itself a TabNavigator now
    SignUp: {screen: SignUp},
    ProductView:{screen:ProductView},
    ProductDetails:{screen:ProductDetails},
    ProductItem:{screen:ProductItemDetails},
     TabBar : TabNavigator,
},{
    initialRouteName:'Product',
    headerMode:'none'

})
export default createAppContainer(primary)



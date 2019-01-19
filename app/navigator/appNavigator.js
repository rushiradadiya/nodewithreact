import {createStackNavigator,createAppContainer,createBottomTabNavigator,createMaterialTopTabNavigator,Dimensions} from 'react-navigation';
import Userdetails from '../component/userDetails';
import SignUp from '../component/Signup'
import Login from '../component/Signin'
import Productapp from '../component/productAdd'
import Home from '../component/Home'

// const TabNavigation = createBottomTabNavigator({
//         SignUp:SignUp,
//         Login:Login,
//         Product:Productapp
//     },
//     {
//         initialRouteName:'Product',
//     },
//     {
//         headerMode: 'float',
//         navigationOptions: {
//             headerStyle: {backgroundColor: 'orange'},
//             title: 'Product'
//         }
//     }
// );
const AppNavigator = createStackNavigator({
    Product: { screen: Productapp}, // MainTab is itself a TabNavigator now
    SignUp: {screen: SignUp},
},{
    initialRouteName: "SignUp",
    navigationOptions:{
        title:'home',
        headerStyle:{backgroundColor:'red'},
    }

});

const MainTab = createMaterialTopTabNavigator(
    {
        Home: Home,
        Product: Productapp,
        SignUp:SignUp
    },
    {
        headerMode:'float',
        tabBarOptions: {
            scrollEnabled: true,
            labelStyle: {
                fontSize: 12,
            },
            style: {
                backgroundColor: 'tomato',
            },
            indicatorStyle: {
                backgroundColor: '#fff'
            }
        }


    },

);


const primary = createStackNavigator({
    Product: { screen: Productapp}, // MainTab is itself a TabNavigator now
    SignUp: {screen: SignUp},
   // AppNavigator:AppNavigator,
    MainTab : MainTab,
    // TabBar : TabNavigation,
},{
    initialRouteName:'MainTab',
    navigationOptions:{

        headerStyle:{backgroundColor:'red'},

    }
})
export default createAppContainer(primary)


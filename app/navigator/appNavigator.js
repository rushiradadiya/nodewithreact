import {createStackNavigator,createAppContainer,createBottomTabNavigator} from 'react-navigation';
import Userdetails from '../component/userDetails';
import SignUp from '../component/Signup'
import Login from '../component/Signin'
import Product from '../component/productAdd'

const TabNavigation = createBottomTabNavigator({
        SignUp:SignUp,
        Login:Login,
        Product:Product
    },
    {
        initialRouteName:'Product'
    },
);
const primary = createStackNavigator({
    SignUp:SignUp,
    Login: Login,
    TabBar : TabNavigation,
},{
    initialRouteName:'TabBar'
})
export default createAppContainer(primary)


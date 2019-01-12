import {createStackNavigator,createAppContainer} from 'react-navigation';
import Userdetails from '../component/userDetails';
import Reg from '../component/registration'

const appNavigation=createStackNavigator({
    registration : Reg,
    Users:Userdetails,

},
    {
        initialRouteName:'Users'
    },
);

export default createAppContainer(appNavigation)
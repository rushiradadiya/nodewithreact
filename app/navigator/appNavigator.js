import {createStackNavigator,createAppContainer} from 'react-navigation';
import Userdetails from '../component/userDetails';
import Reg from '../component/registration'

const appNavigation=createStackNavigator({
    registration : Reg,
    Users:Userdetails,

},
    {
        initialRouteName:'registration'
    },
);

export default createAppContainer(appNavigation)
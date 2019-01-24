import React, { Component } from 'react';
import { Container, View, Left, Right, Button, Icon, Item, Input } from 'native-base';
import {ScrollView, Text, TouchableOpacity, ImageBackground,Image, Animated,AsyncStorage} from 'react-native';
import {NavigationActions, StackActions} from "react-navigation";

import {connect} from "react-redux";
import {userLogin} from "../actions/userAction";
import Constant from '../helper/themeHelper';


class Login extends Component {
    static navigationOptions = {
        title: 'Pronóstico Actual',
        header: () => ({
            titleStyle: {
                color: '#FFFFFF',
            },
            tintColor: '#0087B7',
        }),
    }
    componentDidMount(): void {
        AsyncStorage.getItem('@LOGIN').then((data) => {
            const type = JSON.parse(data).type
debugger
            if(data)
            {
                debugger
                if(type==true) {

                    const {navigation} = this.props;
                    navigation.dispatch(StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({routeName: 'AdminTabBar'})],
                    }));
                }
                else {
                    const {navigation} = this.props;
                    alert("user")
                    navigation.dispatch(StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({routeName: 'UserTabBar'})],
                    }));
                }
            }
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            hasError: false,
            errorText: '',
            avatarSource : null,
        };
        this.animatedValue = new Animated.ValueXY(0, 0);
    }
    register = () =>{
        //validation here...

        if(!this.login()) {

            const {email, password} = this.state;

            this.props.userLogin({ email, password}).then(result => {
                const type = JSON.stringify(result.type)
                alert(JSON.stringify(result))

                try {
                    AsyncStorage.setItem("@LOGIN", JSON.stringify(result));
                } catch (error) {

                    console.log("Error while saving data");
                }


                if(result)
                {
                    debugger
                    if(type=="true") {
                        const {navigation} = this.props;
                        navigation.dispatch(StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({routeName: 'AdminTabBar'})],
                        }));
                    }
                    else {
                        const {navigation} = this.props;
                        alert("user")
                        navigation.dispatch(StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({routeName: 'UserTabBar'})],
                        }));
                    }
                }
                else {
                    alert("Email and Password Wrong");
                }

            }).catch(err => {
                alert("catch" + res)

                alert("Registration failed")
            })
        }
    };

    render() {

        return(
            <Container >

                <ImageBackground source={require('../image/background.jpg')}
                                 resizeMode={"repeat"}
                                 style={{
                                     width: Constant.screenWidth,
                                     height: Constant.screenWidth * 10.67,
                                     opacity: 0.9,
                                     flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 50, paddingRight: 50
                                 }}>

                    <View style={{marginBottom: 35, width: '100%',alignItems:"center",justifyContent:"center"}}>
                        <Text style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center', width: '100%', color: "#687373",fontFamily:"Zapfino"}}>First Cart </Text>
                        <Text style={{fontSize: 18, textAlign: 'center', width: '100%', color: '#030303'}}>Login to continue </Text>
                    </View>
                    <Item>
                        <Icon active name='ios-person' style={{color: "#687373"}}  />
                        <Input placeholder='Username' onChangeText={(text) => this.setState({email: text})} placeholderTextColor="#687373" />
                    </Item>
                    <Item>
                        <Icon active name='ios-lock' style={{color: "#687373"}} />
                        <Input placeholder='Password' onChangeText={(text) => this.setState({password: text})} secureTextEntry={true} placeholderTextColor="#687373" />
                    </Item>
                    {this.state.hasError?<Text style={{color: "#c0392b", textAlign: 'center', marginTop: 10}}>{this.state.errorText}</Text>:null}
                    <View style={{alignItems: 'center',width:"100%",justifyContent:"center"}}>
                        <TouchableOpacity onPress={() => this.register()} style={{backgroundColor: "#5a3e42", margin: 20,width:'100%',height:30,alignItems: 'center',justifyContent:'center',
                            shadowColor: 'black',
                            shadowOffset: {
                                width: 3,
                                height: 3
                            },
                            shadowRadius: 5,
                            shadowOpacity: 5.0}}>
                            <Text style={{color: '#fdfdfd',textAlign: 'center',paddingTop: 5}}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => {
                        const {navigate} = this.props.navigation;
                        navigate('SignUp');


                    }} style={{ marginTop: 20,width:"100%",height:30,textAlign: 'center'}}>

                        <Text style={{color: 'black',textAlign: "center"}}>Create new Account</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </Container>
        );
    }

    login() {
        if(this.state.email===""||this.state.password==="") {
            this.setState({hasError: true, errorText: 'Please fill all fields !'});
            return true;
        }
        this.setState({hasError: false, errorText: 'Invalid username or password !'});
    }


}
const mapStateToProps = (state) => {
    const {loading} = state.user;
    return {
        loading
    };
};

export default connect(mapStateToProps,{
    userLogin
})(Login);


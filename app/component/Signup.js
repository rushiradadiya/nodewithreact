import React, { Component } from 'react';
import { ScrollView,Text ,TouchableOpacity,Switch} from 'react-native';
import { Container, View, Left, Right, Button, Icon, Item, Input ,Radio,ListItem} from 'native-base';
import * as Animatable from 'react-native-animatable';
import IconM from 'react-native-vector-icons/MaterialIcons';
import {NavigationActions, StackActions} from "react-navigation";
import {connect} from "react-redux";
import {userRegistration, userUpdate} from "../actions/userAction";




 class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            password: '',
            rePassword: '',
            hasError: false,
            errorText: '',
            type: false,

        };
    }
    register = () =>{
        //validation here...
        if(!this.signup()) {

            const {name, email, password, type} = this.state;

            this.props.userRegistration({name, email, password, type}).then(res => {
                debugger
                alert(res)
                const {navigation} = this.props;
                navigation.dispatch(StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({routeName: 'Login'})],
                }));

            }).catch(err => {
                alert("catch" + res)

                alert("Registration failed")
            })
        }
    };

    render() {
        // animation
        const {cart} = this.state
        let red="rgba(245,60,60,0.8)"
        let light="rgba(255,255,255,0.5)"
        return(
            <Container style={{backgroundColor: '#fdfdfd'}}>

                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 50, paddingRight: 50}}>

                        <Animatable.View animation="swing" iterationCount={100} direction="alternate">
                            <IconM active name='shopping-cart' style={{color: '#687373'}} size={100}/>
                        </Animatable.View>


                        <View style={{marginBottom: 35,alignItems:"center", width: '100%'}}>
                            <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center', width: '100%', color: "#2c3e50"}}>Create your account </Text>

                        </View>
                        <Item>
                            <Icon active name='ios-mail' style={{color: '#687373'}} />
                            <Input placeholder='Email' onChangeText={(email) => this.setState({email: email})} keyboardType="email-address" placeholderTextColor="#687373" />
                        </Item>
                        <Item>
                            <Icon active name='ios-man' style={{color: '#687373'}} />
                            <Input placeholder='Name' onChangeText={(name) => this.setState({name: name})} placeholderTextColor="#687373" />
                        </Item>

                        <Item>
                            <Icon active name='ios-lock' style={{color: '#687373'}} />
                            <Input placeholder='Password' onChangeText={(password) => this.setState({password: password})} secureTextEntry={true} placeholderTextColor="#687373" />
                        </Item>
                        <Item>
                            <Icon active name='ios-lock' style={{color: '#687373'}} />
                            <Input placeholder='Repeat your password' onChangeText={(rePassword) => this.setState({rePassword: rePassword})} secureTextEntry={true} placeholderTextColor="#687373" />
                        </Item>

                        <Item>
                            <Icon active name='ios-person' style={{color: '#687373'}} />
                            <Input placeholder='Admin' disabled={true} secureTextEntry={true} placeholderTextColor="#687373" />
                                <Switch
                                    onValueChange = {(type) => this.setState({type:type})}
                                    value = {this.state.type}/>

                        </Item>

                        {this.state.hasError?<Text style={{color: "#c0392b", textAlign: 'center', marginTop: 10}}>{this.state.errorText}</Text>:null}
                        <View style={{alignItems: 'center',width:"100%",justifyContent:"center"}}>
                            <TouchableOpacity onPress={() => this.register()} style={{backgroundColor: "#2c3e50", marginTop: 20,width:"100%",height:30,textAlign: 'center'}}>
                                <Text style={{color: '#fdfdfd',textAlign: 'center',paddingTop: 5}}>Signup</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </Container>
        );
    }

    signup() {
        if(this.state.email===""||this.state.name===""||this.state.password===""||this.state.rePassword==="") {
            this.setState({hasError: true, errorText: 'Please fill all fields !'});
            return true;
        }
        if(!this.verifyEmail(this.state.email)) {
            this.setState({hasError: true, errorText: 'Please enter a valid email address !'});
            return true;
        }

        if(this.state.password.length < 6) {
            this.setState({hasError: true, errorText: 'Passwords must contains at least 6 characters !'});
            return true;
        }
        if(this.state.password !== this.state.rePassword) {
            this.setState({hasError: true, errorText: 'Passwords does not match !'});
            return true;
        }
        return false;
        this.setState({hasError: false});
      //  Actions.home();
    }

    verifyEmail(email) {
        var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(email);
    }


}

const mapStateToProps = (state) => {
    const {loading} = state.user;
    return {
        loading
    };
};

export default connect(mapStateToProps,{
    userRegistration,userUpdate
})(Signup);

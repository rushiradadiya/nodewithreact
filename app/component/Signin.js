import React, { Component } from 'react';
import { Container, View, Left, Right, Button, Icon, Item, Input } from 'native-base';
import { ScrollView,Text ,TouchableOpacity,Image} from 'react-native';
import {NavigationActions, StackActions} from "react-navigation";

import {connect} from "react-redux";
import {userLogin} from "../actions/userAction";
import ImagePicker from "react-native-image-picker";



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            hasError: false,
            errorText: '',
            avatarSource : null

        };
    }



    register = () =>{
        //validation here...

        if(!this.login()) {

            const {email, password} = this.state;

            this.props.userLogin({ email, password}).then(result => {

                alert(JSON.stringify(result.type))
               if(result)
               {
                   if(JSON.stringify(result.type)) {
                       alert("admin")
                       const {navigation} = this.props;
                       navigation.dispatch(StackActions.reset({
                           index: 0,
                           actions: [NavigationActions.navigate({routeName: 'TabBar'})],
                       }));
                   }
                   else {
                       const {navigation} = this.props;
                       navigation.dispatch(StackActions.reset({
                           index: 0,
                           actions: [NavigationActions.navigate({routeName: 'Users'})],
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
            <Container style={{backgroundColor: '#fdfdfd'}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 50, paddingRight: 50}}>
                    <View style={{marginBottom: 35, width: '100%',alignItems:"center",justifyContent:"center"}}>
                        <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center', width: '100%', color: "#2c3e50"}}>Welcome </Text>
                        <Text style={{fontSize: 18, textAlign: 'center', width: '100%', color: '#687373'}}>Login to continue </Text>
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
                        <TouchableOpacity onPress={() => this.register()} style={{backgroundColor: "#2c3e50", marginTop: 20,width:"100%",height:30,textAlign: 'center'}}>
                            <Text style={{color: '#fdfdfd',textAlign: 'center',paddingTop: 5}}>SignIn</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.productImage()} style={{backgroundColor: "#2c3e50", marginTop: 20,width:"100%",height:30,textAlign: 'center'}}>
                            <Text style={{color: '#fdfdfd',textAlign: 'center',paddingTop: 5}}>click</Text>
                        </TouchableOpacity>

                        <Image source={this.state.avatarSource} style={{width:'100%',height:300,margin:10,backgroundColor:"black"}}/>

                    </View>
                </View>
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


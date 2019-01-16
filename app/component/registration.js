import React, { Component } from 'react';
import { StyleSheet, View, TextInput,Animated,Easing, Button, Text, ActivityIndicator,TouchableOpacity ,Dimensions} from 'react-native';
import {connect} from 'react-redux';
import { userRegistration ,userUpdate} from "../actions/userAction";

import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationActions, StackActions } from 'react-navigation';
import * as Animatable from 'react-native-animatable';
const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');


class Registration extends Component<Props> {

    constructor(props) {
        super(props);
        this.fadeValue = new Animated.Value(0)
        this.state = {
            email: '',
            password: '',
            userData: this.props.navigation.getParam("userData","NO DATA"),

        }
    }
    componentDidMount() {

        this.setState(
            { email: this.state.userData.email},
        )
        this.setState(
            { password: this.state.userData.password}
        )
        this.animate()
    }

    register = () =>{
        //validation here...

        debugger
        const {email, password} = this.state;
        if (this.state.userData !== "NO DATA") {
            debugger
            this.props.userUpdate({email, password},this.state.userData.id).then(res=>{

                const {navigation} = this.props;
                navigation.dispatch(StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Users' })],
                }));

            }).catch(err=>{
                alert(err+"  Registration failed")
            })
        }else {
            debugger
            this.props.userRegistration({email, password}).then(res=>{
            alert(res)
                const {navigation} = this.props;
                navigation.dispatch(StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Users' })],
                }));

            }).catch(err=>{
                alert("catch"+res)

                alert("Registration failed")
            })
        }

    };
    handleTextChange = (newText) => this.setState({ value: newText });

    // Animated.timing(
    //     someValue,
    //     {
    //         toValue: number,
    //         duration: number,
    //         easing: easingFunction,
    //         delay: number
    //     }
    // )

    animate () {
        this.animatedValue.setValue(0)
        Animated.timing(
            this.fadeValue,
            {
                toValue: SCREEN_WIDTH -100,
                duration: 2000,
                easing: Easing.linear
            }
        ).start(() =>{Animated.timing(
            this.fadeValue,
            {
                toValue: SCREEN_WIDTH -100,
                duration: 2000,
                easing: Easing.back()
            }).start(() => {
            this.animate();
        });
        });
    }
    render() {
        const { loading } = this.props;



        return (

           <Animatable.View animation="flipInX" style={styles.MainContainer}  >


                       <Animatable.View animation="flipInX" style={{ transform: [{scale: this.animate}],alignItems:'center',width:'100%',justifyContent:'center',marginTop: 60}}>

                           <Animatable.Icon animation="flipInX" name="shopping-cart" size={50} color="#000"style={[styles.searchIcon,{height:100, width:100,tintColor: "#ffff",transform: [{scale: this.animate}]}]}/>

                       </Animatable.View>


                   {/*<View style={styles.searchSection}>*/}
                   {/*<Icon style={styles.searchIcon} name="shopping-cart" size={10} color="#000"/>*/}
                      {/*<TextInput*/}
                       {/*style={styles.input}*/}
                       {/*placeholder="User Nickname"*/}
                       {/*onChangeText={(searchString) => {this.setState({searchString})}}*/}
                       {/*underlineColorAndroid="transparent"*/}
                   {/*/>*/}
                   {/*</View>*/}



                {/*<TextInput*/}
                    {/*placeholder="Phone"*/}
                    {/*onChangeText={password => this.setState({password})}*/}
                    {/*underlineColorAndroid='transparent'*/}
                    {/*style={styles.TextInputStyleClass}*/}
                    {/*value={this.state.password}*/}
                {/*/>*/}
                {/*<TextInput*/}
                    {/*placeholder="Email"*/}
                    {/*onChangeText={email => this.setState({email})}*/}
                    {/*style={styles.TextInputStyleClass}*/}
                    {/*value={this.state.email}*/}

                {/*/>*/}

                {/*<TextInput*/}
                    {/*placeholder="Password"*/}
                    {/*onChangeText={password => this.setState({password})}*/}
                    {/*underlineColorAndroid='transparent'*/}
                    {/*style={styles.TextInputStyleClass}*/}
                    {/*value={this.state.password}*/}
                    {/*secureTextEntry = {true}*/}
                {/*/>*/}


                {/*<Button title="Coutiune"*/}
                        {/*onPress={this.register}*/}
                        {/*disabled={loading}*/}
                        {/*color="#2196F3" />*/}
                {/*{*/}
                    {/*loading &&*/}
                    {/*<View style={{top:0, left:0, bottom:0, right:0}}>*/}
                        {/*<ActivityIndicator animating={true}/>*/}
                    {/*</View>*/}
                {/*}*/}

            </Animatable.View>
        );
    }
}
const styles = StyleSheet.create({

    MainContainer :{
        justifyContent: 'center',
        flex:1,
        backgroundColor :"#E0FFFF",

    },
    searchIcon: {
        paddingLeft: 20,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        color: '#424242',
        borderBottomWidth: 2,
        width: SCREEN_WIDTH-50,
        marginRight: 20
    },
    TextInputStyleClass: {
        textAlign: 'center',
        marginBottom: 7,
        height: 40,
        borderBottomWidth: 1,

    },

    title:{
        fontSize: 22,
        color: "#009688",
        textAlign: 'center',
        marginBottom: 15
    },searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
});

const mapStateToProps = (state) => {
    const {loading} = state.user;
    return {
        loading
    };
};

export default connect(mapStateToProps,{
    userRegistration,userUpdate
})(Registration);

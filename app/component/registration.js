import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, Text, ActivityIndicator } from 'react-native';
import {connect} from 'react-redux';
import { userRegistration } from "../actions/userAction";
import { NavigationActions, StackActions } from 'react-navigation';

class Registration extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    register = () =>{
        //validation here...

        const {email, password} = this.state;
        this.props.userRegistration({email, password}).then(res=>{

            const {navigation} = this.props;
            navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Users' })],
            }));

        }).catch(err=>{
            alert("Registration failed")
        })
    };

    render() {
        const { loading } = this.props;
        return (
            <View style={styles.MainContainer}>

                <Text style= {styles.title}>User Registration Form</Text>

                <TextInput
                    placeholder="Email"
                    onChangeText={firstName => this.setState({firstName})}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                />

                <TextInput
                    placeholder="Password"
                    onChangeText={lastName => this.setState({lastName})}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                />

                <Button title="Register"
                        onPress={this.register}
                        disabled={loading}
                        color="#2196F3" />
                {
                    loading &&
                    <View style={{top:0, left:0, bottom:0, right:0}}>
                        <ActivityIndicator animating={true}/>
                    </View>
                }
            </View>
        );
    }
}
const styles = StyleSheet.create({

    MainContainer :{
        justifyContent: 'center',
        flex:1,
        margin: 10
    },

    TextInputStyleClass: {
        textAlign: 'center',
        marginBottom: 7,
        height: 40,
        borderWidth: 1,
        borderColor: '#2196F3',
        borderRadius: 5 ,
    },

    title:{
        fontSize: 22,
        color: "#009688",
        textAlign: 'center',
        marginBottom: 15
    }
});

const mapStateToProps = (state) => {
    const {loading} = state.user;
    return {
        loading
    };
};

export default connect(mapStateToProps,{
    userRegistration
})(Registration);

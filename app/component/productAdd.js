import React, { Component } from 'react';
import { ScrollView,Text ,TouchableOpacity,Image} from 'react-native';
import { Container, View, Left, Right, Button, Icon, Item, Input ,Picker} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import {NavigationActions, StackActions} from "react-navigation";
import {connect} from "react-redux";
import {getproduct} from "../actions/productAction"

 class productAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
           name:'',
           cid:'',
           scid:'',
           qty :0,
           prize:0,
           image:'',
           detail:'',
           selected: 0,
           productList: [],
           avatarSource : null
    };
    }
    componentDidMount() {
        this.props.getproduct();
        alert(this.state.productList)
    }

    productImage = () =>{
        debugger
        try{
            ImagePicker.showImagePicker({}, (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    const source = { uri: response.uri };
                     // alert(JSON.stringify(response.data))
                    // You can also display the image using data:
                    // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                    this.setState({
                        avatarSource: source,
                    });
                }
            });

        }catch (e) {
            debugger
            console.log(e)
        }
    }
    register = () =>{
        //validation here...
        if(!this.signup()) {

            const {name, email, password, type} = this.state;

            this.props.userRegistration({name, email, password, type}).then(res => {
                debugger
             //   alert(res)
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

        return(
            <Container style={{backgroundColor: '#fdfdfd'}}>

                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 50, paddingRight: 50}}>
                        <View style={{marginBottom: 20,alignItems:"center", width: '100%'}}>
                            {/*<Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center', width: '100%', color: "#2c3e50"}}>Product </Text>*/}

                        </View>
                        <View style={{alignItems:"center", width: '100%'}}>
                            <TouchableOpacity onPress={() => this.productImage()} >
                            <Image source={this.state.avatarSource}  style={{borderRadius:50,width:100,height:100,marginLeft:20,backgroundColor:"#475766"}}/>
                            </TouchableOpacity>
                        </View>

                        <Item>
                            <Icon active name='ios-basket' style={{color: '#687373'}} />
                            <Input placeholder='name' onChangeText={(email) => this.setState({email: email})} keyboardType="number-pad" placeholderTextColor="#687373" />
                        </Item>
                        <Item>
                            <Icon active name='ios-add-circle' style={{color: '#687373'}} />
                            <Input placeholder='Quantity' onChangeText={(name) => this.setState({name: name})} key placeholderTextColor="#687373" />
                        </Item>

                        <Item>
                            <Icon active name='ios-lock' style={{color: '#687373'}} />
                            <Input placeholder='Price' onChangeText={(password) => this.setState({password: password})}  placeholderTextColor="#687373" />
                        </Item>
                        <Item>
                            <Icon active name='ios-create' style={{color: '#687373'}} />
                            <Input placeholder='Detail' onChangeText={(rePassword) => this.setState({rePassword: rePassword})}  placeholderTextColor="#687373" />
                        </Item>

                        <Item >
                            <Icon active name='ios-list' style={{color: '#687373'}} />

                            <Input placeholder='Category' disabled={true} secureTextEntry={true} placeholderTextColor="#687373" />
                            <Picker
                                iosIcon={<Icon name="arrow-down" />}
                                textStyle={{ color: "#687373" }}
                                mode="dropdown"
                                selectedValue={this.state.selected}
                                onValueChange= {(value) => {
                                    this.setState({ selected: value });
                                }}>
                                {this.state.productList.map((item, index) => {
                                    return (<Picker.Item label={item} value={index} key={index}/>)
                                })}
                            </Picker>

                        </Item>


                        {this.state.hasError?<Text style={{color: "#c0392b", textAlign: 'center', marginTop: 10}}>{this.state.errorText}</Text>:null}
                        <View style={{alignItems: 'center',width:"100%",justifyContent:"center"}}>
                            <TouchableOpacity onPress={() => this.productImage()} style={{backgroundColor: "#2c3e50", marginTop: 20,width:"100%",height:30,textAlign: 'center'}}>
                                <Text style={{color: '#fdfdfd',textAlign: 'center',paddingTop: 5}}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </Container>
        );
    }

    // signup() {
    //     if(this.state.email===""||this.state.name===""||this.state.password===""||this.state.rePassword==="") {
    //         this.setState({hasError: true, errorText: 'Please fill all fields !'});
    //         return true;
    //     }
    //     if(!this.verifyEmail(this.state.email)) {
    //         this.setState({hasError: true, errorText: 'Please enter a valid email address !'});
    //         return true;
    //     }
    //
    //     if(this.state.password.length < 6) {
    //         this.setState({hasError: true, errorText: 'Passwords must contains at least 6 characters !'});
    //         return true;
    //     }
    //     if(this.state.password !== this.state.rePassword) {
    //         this.setState({hasError: true, errorText: 'Passwords does not match !'});
    //         return true;
    //     }
    //     return false;
    //     this.setState({hasError: false});
    //     //  Actions.home();
    // }
    //
    // verifyEmail(email) {
    //     var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     return reg.test(email);
    // }


}

const mapStateToProps = (state) => {
    const {productList} = state.product;
    return {
        productList
    };
};

export default connect(mapStateToProps,{
    getproduct
})(productAdd);

import React, { Component } from 'react';
import { ScrollView,Text ,TouchableOpacity,Switch} from 'react-native';
import { Container, View, Left, Right, Button, Icon, Item, Input ,Picker} from 'native-base';
import * as Animatable from 'react-native-animatable';
import IconM from 'react-native-vector-icons/MaterialIcons';
import {NavigationActions, StackActions} from "react-navigation";
import {connect} from "react-redux";
import {userRegistration, userUpdate} from "../actions/userAction";




class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
           name:'',
           cid:'',
           s_c_id:'',
           qty :0,
           prize:0,
           image:'',
           detail:'',
           selected: "key1",
           userList: ["rushita","krupali"]

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

    onValueChange(value: string) {
        this.setState({
            selected: value
        });
    }
    getData =()=>{
        debugger
        const {userList} = this.state
        for(var i=0 ;i<this.state.userList.length;i++) {
            <Picker.Item label={userList} value={userList}/>
        }
    }
    render() {
        // animation
        const {cart} = this.state
        let red="rgba(245,60,60,0.8)"
        let light="rgba(255,255,255,0.5)"
        return(
            <Container style={{backgroundColor: '#fdfdfd'}}>

                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 50, paddingRight: 50}}>




                        <View style={{marginBottom: 35,alignItems:"center", width: '100%'}}>
                            <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center', width: '100%', color: "#2c3e50"}}>Product </Text>

                        </View>
                        <Item>
                            <Picker
                                note
                                mode="dropdown"
                                style={{ width: 120 }}
                                selectedValue={this.state.selected}
                                onValueChange={this.onValueChange.bind(this)}
                            >
                                {this.getData()}

                            </Picker>
                        </Item>


                        <Item>
                            <Icon active name='ios-mail' style={{color: '#687373'}} />
                            <Input placeholder='name' onChangeText={(email) => this.setState({email: email})} keyboardType="number-pad" placeholderTextColor="#687373" />
                        </Item>
                        <Item>
                            <Icon active name='ios-man' style={{color: '#687373'}} />
                            <Input placeholder='Quantity' onChangeText={(name) => this.setState({name: name})} key placeholderTextColor="#687373" />
                        </Item>

                        <Item>
                            <Icon active name='ios-lock' style={{color: '#687373'}} />
                            <Input placeholder='Price' onChangeText={(password) => this.setState({password: password})}  placeholderTextColor="#687373" />
                        </Item>
                        <Item>
                            <Icon active name='ios-lock' style={{color: '#687373'}} />
                            <Input placeholder='Detail' onChangeText={(rePassword) => this.setState({rePassword: rePassword})}  placeholderTextColor="#687373" />
                        </Item>


                        {this.state.hasError?<Text style={{color: "#c0392b", textAlign: 'center', marginTop: 10}}>{this.state.errorText}</Text>:null}
                        <View style={{alignItems: 'center',width:"100%",justifyContent:"center"}}>
                            <TouchableOpacity onPress={() => this.register()} style={{backgroundColor: "#2c3e50", marginTop: 20,width:"100%",height:30,textAlign: 'center'}}>
                                <Text style={{color: '#fdfdfd',textAlign: 'center',paddingTop: 5}}>Submit</Text>
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
/*
var multer = require('multer');
//var upload = multer({ dest: 'userimage/' });

const storage = storageDest =>multer.diskStorage({
destination: function (req, file, cb) {
cb(null, storageDest)
},
filename: function (req, file, cb) {
let extArray = file.originalname.split(".");
let extension = extArray[extArray.length - 1];
//console.log(file);
cb(null, file.originalname + '-' + Date.now()+ '.' +extension)
}
});

const upload = storageDest=>multer({ storage: storage(storageDest) });

module.exports = upload
const upload = require('../Config/multer');
let UPLOAD_PATH = 'ProductImages/';

router.post('/uploadproduct', upload(UPLOAD_PATH).single('img'),product.uploadProduct);
xports.uploadProduct = (req, res) => {
if(res) {
// const {body:{product_name, product_image,category_type,sub_type,price}} = req;
let newProduct= {
product_name:req.body.product_name,
product_image: req.file.filename,
category_type:req.body.category_type,
sub_type:req.body.sub_type,
price:req.body.price
};
Product.create(newProduct)
.then(() => res.send({newProduct}))
.catch((error) => {
console.log(error)
return res.status(500).send(error)
});
}
};

 */
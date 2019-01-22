import React, { Component } from 'react';
import { ScrollView,Text ,TouchableOpacity,Image} from 'react-native';
import {Container, View, Left, Title, Header, Icon, Item, Input, Picker, Button, Right} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import {NavigationActions, StackActions} from "react-navigation";
import Navbar from '../component/Navbar';

import {connect} from "react-redux";
import {getCategory,getSubCategory,productAdd} from "../actions/productAction"

class productadd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            qty :0,
            price:0,
            detail:'',
            cid: 0,
            scid: 0,
            image : null
        };
    }

    componentDidMount() {
        this.props.getCategory();

    }

    productImage = () =>{

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
                    const data = response.data;
                    this.setState({
                        image: source,
                    });
                }
            });

        }catch (e) {
            debugger
            console.log(e)
        }
    }

    register = () =>{
        // //validation here...
        debugger
        if(!(this.state.name===""||this.state.qty===""||this.state.price===""||this.state.detail===""||this.state.cid===0||this.state.scid===0))
        {

            debugger
            const {name, qty, price, detail,cid,scid,image} = this.state;

            const formData = new FormData();
            formData.append('image',{
                uri: image,
                type: 'image/jpeg',
                name: 'photo.jpg',
            });
            formData.append("name",name);
            formData.append("cid",cid);
            formData.append("scid",scid);
            formData.append("qty",qty);
            formData.append("price",price);
            formData.append("detail",detail);


            this.props.productAdd(formData).then(res => {
                debugger
                   alert(res)
                // const {navigation} = this.props;
                // navigation.dispatch(StackActions.reset({
                //     index: 0,
                //     actions: [NavigationActions.navigate({routeName: 'Login'})],
                // }));

            }).catch(err => {
                alert("catch" + res)

                alert("Registration failed")
            })
        }
        else
        {
            this.setState({hasError: true, errorText: 'Please fill all fields !'});
        }
    };


    render() {
        const {categoryList,subcategoryList} = this.props;

        var right = (
            <Right style={{flex:1}}>

                <Button onPress={() => Actions.cart()} transparent>
                    <Icon name='ios-cart' style={{color: '#FFF'}}/>
                </Button>
            </Right>)
        return(
            <Container style={{backgroundColor: '#fdfdfd'}}>
                <Navbar right={right} title="SIGN UP" />
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 50, paddingRight: 50}}>
                        <View style={{marginBottom: 20,alignItems:"center", width: '100%'}}>
                            {/*<Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center', width: '100%', color: "#2c3e50"}}>Product </Text>*/}

                        </View>
                        <View style={{alignItems:"center", width: '100%'}}>
                            <TouchableOpacity onPress={() => this.productImage()} >
                                <Image source={this.state.image}  style={{borderRadius:50,width:200,height:200,marginLeft:20,backgroundColor:"#475766"}}/>
                            </TouchableOpacity>
                        </View>

                        <Item>
                            <Icon active name='ios-basket' style={{color: '#687373'}} />
                            <Input placeholder='name' onChangeText={(text) => this.setState({name: text})} keyboardType="number-pad" placeholderTextColor="#687373" />
                        </Item>
                        <Item>
                            <Icon active name='ios-add-circle' style={{color: '#687373'}} />
                            <Input placeholder='Quantity' onChangeText={(text) => this.setState({qty: text})} key placeholderTextColor="#687373" />
                        </Item>

                        <Item>
                            <Icon active name='ios-lock' style={{color: '#687373'}} />
                            <Input placeholder='Price' onChangeText={(text) => this.setState({price: text})}  placeholderTextColor="#687373" />
                        </Item>
                        <Item>
                            <Icon active name='ios-create' style={{color: '#687373'}} />
                            <Input placeholder='Detail' onChangeText={(text) => this.setState({detail: text})}  placeholderTextColor="#687373" />
                        </Item>

                        <Item >
                            <Icon active name='ios-list' style={{color: '#687373'}} />

                            <Input placeholder='Category' disabled={true} secureTextEntry={true} placeholderTextColor="#687373" />
                            <Picker
                                iosIcon={<Icon name="arrow-down" />}
                                textStyle={{ color: "#687373" }}
                                mode="dropdown"
                                selectedValue={this.state.cid}
                                onValueChange= {(value) => {
                                    this.setState({ cid: value });

                                    console.log(value)
                                    this.props.getSubCatrgory(value);

                                }}>
                                {categoryList.map((item,index) => {
                                    return (<Picker.Item label={item.name} value={item.id} key={index}/>)
                                })}
                            </Picker>

                        </Item>

                        <Item >
                            <Icon active name='ios-list' style={{color: '#687373'}} />

                            <Input placeholder='Sub Category' disabled={true} secureTextEntry={true} placeholderTextColor="#687373" />
                            <Picker
                                iosIcon={<Icon name="arrow-down" />}
                                textStyle={{ color: "#687373" }}
                                mode="dropdown"
                                selectedValue={this.state.scid}
                                onValueChange= {(value) => {
                                    this.setState({ scid: value });
                                }}>
                                {
                                    subcategoryList.map((item,index) => {
                                        return (<Picker.Item label={item.name} value={item.id} key={index}/>)
                                    })
                                }
                            </Picker>

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
}

const mapStateToProps = (state) => {
    const {categoryList} = state.product;
    const {subcategoryList} = state.product;
    return {
        categoryList,
        subcategoryList
    };
};

export default connect(mapStateToProps,{
    getCategory,
    getSubCategory,
    productAdd

})(productadd);

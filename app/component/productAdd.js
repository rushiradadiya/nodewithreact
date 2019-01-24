import React, { Component } from 'react';
import { ScrollView,Text ,TouchableOpacity,Image} from 'react-native';
import {Container, View, Left, Title, Header, Icon, Item, Input, Picker, Button, Right} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import Spinner from 'react-native-gifted-spinner';
import Navbar from '../component/Navbar';
import ImageResizer from 'react-native-image-resizer';
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
                    debugger
                   // alert(source.uri)
                    this.resize()
                }
            });

        }catch (e) {
            debugger
            console.log(e)
        }
    }
    resize() {

        ImageResizer.createResizedImage(this.state.image.uri, 8, 6, 'JPEG', 80)
            .then(({ uri }) => {
                this.setState({
                    resizedImageUri: uri,
                });

            })
            .catch(err => {
                console.log(err);
                return alert(err+'  Unable to resize the photo', 'Check the console for full the error message'+(source));
            });
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
    reset = () =>{
        this.setState({
            image: null,
        });
    }

    render() {
        const {categoryList,subcategoryList} = this.props;

        return(
            <Container style={{backgroundColor: '#fdfdfd'}}>
                <Navbar  title="Product Add" />
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 50, paddingRight: 50}}>
                        <View style={{marginBottom: 20,alignItems:"center", width: '100%'}}>
                            {/*<Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center', width: '100%', color: "#2c3e50"}}>Product </Text>*/}

                        </View>
                        <View style={{alignItems:"baseline", width: '100%',flexDirection:"row"}}>
                            <TouchableOpacity onPress={() => this.productImage()} >
                                 <Image source={this.state.image}  style={{borderRadius:50,width:150,height:150,marginLeft:20,backgroundColor:"#e5e3e9", shadowColor: 'black',
                                     shadowOffset: {
                                         width: 3,
                                         height: 3
                                     },
                                     shadowRadius: 5,
                                     shadowOpacity: 5.0}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.reset()} style={{backgroundColor: "#5a3e42", margin: 20,width:80,height:30,alignItems: 'center',justifyContent:'center',
                                shadowColor: 'black',
                                shadowOffset: {
                                    width: 3,
                                    height: 3
                                },
                                shadowRadius: 5,
                                shadowOpacity: 5.0}}>

                            <Text style={{color: '#fdfdfd',textAlign: 'center',paddingTop: 5}}>Reset</Text>
                            </TouchableOpacity>
                            {/*<Image source={this.state.resizedImageUri}  style={{borderRadius:50,width:100,height:100,marginLeft:20,backgroundColor:"#475766"}}/>*/}
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
                            <TouchableOpacity onPress={() => this.register()} style={{backgroundColor: "#5a3e42", margin: 20,width:'100%',height:30,alignItems: 'center',justifyContent:'center',
                                shadowColor: 'black',
                                shadowOffset: {
                                    width: 3,
                                    height: 3
                                },
                                shadowRadius: 5,
                                shadowOpacity: 5.0}}>
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

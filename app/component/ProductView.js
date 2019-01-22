import React, { Component } from 'react';
import {FlatList, ScrollView, TouchableOpacity, View, Image, StyleSheet, Alert,TouchableHighlight} from 'react-native';
import {Container, Right, Text,   Picker, Left, Content} from 'native-base';
import {connect} from "react-redux";
import {getProduct, getSubCategory,getSubCategoryId,getCategory,getProductID} from "../actions/productAction"
import Navbar from '../component/Navbar';
import Constant from "../helper/themeHelper";
import {Card, ListItem, Button, Icon} from 'react-native-elements'
class Home extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Product List'
        };
    };
    constructor() {
        super()
        this.state = {
            isLoading: false,
        };
    }
    componentDidMount() {
        debugger
        this.props.getProduct();
    }


    render() {
        const {productData} = this.props
        return (
            <Container>
                <Navbar  title="MY STORE" />
                <Content>
                        {
                            productData.map((item, index) => {
                                const {rowContainer} = styles;
                                var imageUrl = item.image.split("/");
                                var url = "http://localhost:4000/"+imageUrl[imageUrl.length-1].toString();
                                return (<Card>
                                    <TouchableOpacity onPress={()=>{
                                      //  this.getSubCategoryId(item);
                                        debugger
                                        alert(item)
                                        // this.props.navigation.navigate('ProductDetails',{productDetail: item});

                                    }}>
                                        <View key={index} style={rowContainer} >
                                            <Image source={{uri:url}} style={{ width:100,height:100,backgroundColor:"#475766"}}/>
                                            <Text>{item.name}</Text>
                                            <Button title="View" onPress={()=>{
                                                this.props.navigation.navigate('ProductDetail',{item: item});
                                            }


                                            }/>
                                        </View>

                                    </TouchableOpacity>
                                    </Card>
                                );
                            })
                        }
                </Content>
            </Container>




        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constant.appColor,
        justifyContent:'center',
    },
    titleText: {
        fontSize: 12,
        alignSelf: 'center',
        marginBottom: 20
    },
    rowContainer: {

        marginLeft:10,
        marginRight:10,
        justifyContent: 'center',
        alignItems:'center'
    },
    imageThumbnail: {
        backgroundColor:"orange",
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        width:100
    },
});

const mapStateToProps = (state) => {
    const {productData} = state.product;

    return {
        productData,


    };
};

export default connect(mapStateToProps,{
    getProduct,
})(Home);
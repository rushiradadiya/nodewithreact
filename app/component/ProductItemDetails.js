import React, { Component } from 'react';
import {FlatList, ScrollView, TouchableOpacity, View, Image, StyleSheet, Alert,TouchableHighlight,Dimensions} from 'react-native';
import {Container, Right, Text,   Picker, Left, Content} from 'native-base';
import Navbar from '../component/Navbar';
import Constant from "../helper/themeHelper";
import LinearGradient from 'react-native-linear-gradient'
const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');
export default class Home extends Component {
    constructor() {
        super()
        this.state = {
            isLoading: false,
            productDetail :[]
        };
    }
       render() {
        const {navigation} = this.props;
        const  productDetail  = navigation.getParam('productDetail', 'NO-ID')
        var imageUrl = productDetail.image.split("/");
        var url = "http://localhost:4000/" + imageUrl[imageUrl.length - 1].toString();
        return (
            <Container>
                <Navbar  title="First Cart" />

                <LinearGradient
                    colors={['#ffe4e9', '#ffccd2', '#bb888e']}
                    style={{  borderRadius: 5 ,height:SCREEN_HEIGHT}}>

                    <Image source={{uri: url}} style={styles.imageThumbnail}/>
                    <Text style={{fontSize: 20,margin:10}}>Name:{productDetail.name}</Text>
                    <Text style={{fontSize: 15,margin:10}}>M.R.P:₹ {productDetail.price}</Text>
                    <Text style={{fontSize: 15,margin:10}}>Detail:{productDetail.detail}</Text>
                    <TouchableOpacity style={{backgroundColor: "#5a3e42", margin: 20,height:30,alignItems: 'center',justifyContent:'center',
                        shadowColor: 'black',
                        shadowOffset: {
                            width: 3,
                            height: 3
                        },
                        shadowRadius: 5,
                        shadowOpacity: 5.0}}>
                        <Text style={{color: '#fdfdfd',textAlign: 'center'}}>Add to Cart</Text>
                    </TouchableOpacity>
                </LinearGradient>


            </Container>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"green",
        justifyContent:'center',
    },
    titleText: {
        fontSize: 12,
        alignSelf: 'center',
        marginBottom: 20
    },
    imageThumbnail: {
        backgroundColor:"orange",
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height:(SCREEN_HEIGHT*30)/100
    },
});

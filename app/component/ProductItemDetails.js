import React, { Component } from 'react';
import {FlatList, ScrollView, TouchableOpacity, View, Image, StyleSheet, Alert,TouchableHighlight,Dimensions} from 'react-native';
import {Container, Right, Text,   Picker, Left, Content} from 'native-base';
import Navbar from '../component/Navbar';
import Constant from "../helper/themeHelper";
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
    componentDidMount() {
        debugger

    }
    onRowClick = ({item}) => {
        const {navigate} = this.props.navigation;
        alert(item.name)
        // navigate('ProductDetails',{productDetail: item});
    };
    renderItem = ({item,index}) => {
        const {rowContainer} = styles;
        var imageUrl = item.image.split("/");
        var url = "http://localhost:4000/" + imageUrl[imageUrl.length - 1].toString();
        return (
            <TouchableOpacity onPress={() => this.onRowClick({item})} style={{width: 150,
                height:150,margin:20 }}>
                <View style={{rowContainer}}>

                    <Image source={{uri: url}} style={styles.imageThumbnail}/>
                </View>
            </TouchableOpacity>
        )
    };
    render() {
        const {navigation} = this.props;
        const  productDetail  = navigation.getParam('productDetail', 'NO-ID')
        var imageUrl = productDetail.image.split("/");
        var url = "http://localhost:4000/" + imageUrl[imageUrl.length - 1].toString();
        return (
            <Container>
                <Navbar  title="MY STORE" />
                <Content>

                    <ScrollView>
                        <View style={{alignItems: 'center'}}>
                            <Image source={{uri: url}} style={styles.imageThumbnail}/>
                            <Text style={{fontSize: 25}}>Name:{productDetail.name}</Text>
                            <Text style={{fontSize: 25}}>Price:{productDetail.price}</Text>
                            <Text style={{fontSize: 25}}>Detail:{productDetail.detail}</Text>
                        </View>
                    </ScrollView>

                </Content>
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
    rowContainer: {
        flexDirection: 'column',
        margin:10,
        backgroundColor:"pink",
        width: 100,
        height:200
    },
    imageThumbnail: {
        backgroundColor:"orange",
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height:(SCREEN_HEIGHT*50)/100
    },
});

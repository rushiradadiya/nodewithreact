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
        };
    }
    onRowClick = ({item}) => {
        const {navigate} = this.props.navigation;
        navigate('ProductItem',{productDetail: item});
    };
    renderItem = ({item,index}) => {
            const {rowContainer} = styles;
            var imageUrl = item.image.split("/");
            var url = "http://localhost:4000/" + imageUrl[imageUrl.length - 1].toString();
            return (
                <TouchableOpacity onPress={()=>this.onRowClick({item})} style={styles.rowContainer}>
                    <View style={{ flex: 1,  margin: 1,alignItems:'center',shadowColor: '#5a3e42'}}>
                        <Image source={{ uri: url}}  style={styles.imageThumbnail}/>
                    </View>
                    <Text style={{fontSize:20}}>{item.name}</Text>
                    <Text>₹ {item.price}</Text>
                </TouchableOpacity>

            )
    };
    render() {
        const {navigation} = this.props;
        const  productDetail  = navigation.getParam('productDetail', 'NO-ID')
        return (
            <Container>
                <Navbar  title="First Cart" style={{fontFamily:"Zapfino"}} />
                <LinearGradient
                    colors={['#ffe4e9', '#ffccd2', '#bb888e']}
                    style={{  alignItems: 'center', borderRadius: 5 ,height:SCREEN_HEIGHT}}>
                    <ScrollView>
                        <FlatList data={productDetail}
                                  numColumns={2}
                                  contentContainerStyle={{top:20}}
                                  automaticallyAdjustContentInsets={false}
                                  renderItem={this.renderItem}
                                  keyExtractor={this.keyExtractor}
                                  ItemSeparatorComponent={this.renderSeparator}
                                  ListEmptyComponent={this.renderEmpty}
                                  ListFooterComponent={<View style={{ height: 50}}/>}
                        />
                    </ScrollView>

                </LinearGradient>
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
        fontSize:20,
        marginLeft:10,
        marginRight:10,
        marginBottom:10,
        justifyContent: 'center',
        alignItems:'center',
        shadowColor: '#5a3e42',
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 5.0
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        width:130,

    },
});

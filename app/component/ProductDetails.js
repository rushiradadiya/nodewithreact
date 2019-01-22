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
                <TouchableOpacity onPress={() => this.onRowClick({item})} style={{width: 150,
                    height:150,margin:20,alignItems:'center' }}>
                    <View style={{rowContainer}}>

                        <Image source={{uri: url}} style={styles.imageThumbnail}/>

                        </View>
                    <Text>{item.name}</Text>
                </TouchableOpacity>
            )
    };
    render() {
        const {navigation} = this.props;
        const  productDetail  = navigation.getParam('productDetail', 'NO-ID')
        return (
            <Container>
                <Navbar  title="MY STORE" />
                <Content>
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
        margin:20,
        backgroundColor:"pink",
        width: 100,
        height:200,
        alignItems: "center"
    },
    imageThumbnail: {
        backgroundColor:"orange",
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height:150
    },
});

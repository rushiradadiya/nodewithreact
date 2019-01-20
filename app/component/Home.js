import React, { Component } from 'react';
import {FlatList, ScrollView, TouchableOpacity, View, Image, StyleSheet, Alert} from 'react-native';
import {Container, Right, Card, CardItem, Text, Button, Icon, Picker} from 'native-base';
import {connect} from "react-redux";
import {getProduct, getSubCatrgory} from "../actions/productAction"
import Navbar from '../component/Navbar';
import Constant from "../helper/themeHelper";


class Home extends Component {

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
    onRowClick = ({item}) => {
debugger
    alert(item.name)
        this.props.getSubCatrgory(item.cid);
    };


    renderItem = ({item, index}) => {

        debugger
        const {rowContainer} = styles;
        var imageUrl = item.image.split("/");
        var url = "http://localhost:4000/"+imageUrl[imageUrl.length-1].toString();
        return(
            <TouchableOpacity onPress={()=>this.onRowClick({item})}>
                <View key={index} style={rowContainer}>
                    <Image source={{uri:url}} style={{ borderRadius:10,width:100,height:100,backgroundColor:"#475766"}}/>
                </View>
                <Text>{item.name}</Text>
            </TouchableOpacity>

        )
    };
    render() {

        var right = (
            <Right style={{flex:1}}>
                <Button onPress={() => {
                    //Actions.search()
                alert("search")
                }} transparent>
                    <Icon name='ios-search' style={{color: '#FFF'}}/>
                </Button>
                <Button onPress={() => {
                    //Actions.cart()
                    alert('cart')
                }} transparent>
                    <Icon name='ios-cart' style={{color: '#FFF'}}/>
                </Button>
            </Right>)
        const {productData,subcategoryList} = this.props;
        return (
            <Container >
            <Navbar right={right} title="Home" />
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <Card>
                        <CardItem header style={{backgroundColor:"#ffa48e"}} >
                            <Icon name='ios-basket' style={{color: '#475766'}}/>
                            <Text>Category</Text>
                        </CardItem>
                        <CardItem style={{backgroundColor:"#ffe1d2"}}>
                            {
                                <ScrollView horizontal={true}>
                                    {
                                        productData.map((item,index) => {
                                            const {rowContainer} = styles;
                                            var imageUrl = item.image.split("/");
                                            var url = "http://localhost:4000/"+imageUrl[imageUrl.length-1].toString();
                                            return ( <TouchableOpacity onPress={()=>this.onRowClick({item})}>
                                                <View key={index} style={rowContainer}>
                                                    <Image source={{uri:url}} style={{ borderRadius:5,width:100,height:100,backgroundColor:"#475766"}}/>
                                                    <Text>{item.name}</Text>
                                                </View>

                                            </TouchableOpacity>)
                                        })
                                    }

                                </ScrollView>
                            }
                        </CardItem>


                        <CardItem header style={{backgroundColor:"#ffa48e"}} >
                            <Icon name='ios-basket' style={{color: '#475766'}}/>
                            <Text>Sub Category</Text>
                        </CardItem>
                        <CardItem style={{backgroundColor:"#ffe1d2"}}>
                            {

                                <ScrollView horizontal={true}>
                                    {
                                        subcategoryList.map((item,index) => {
                                            const {rowContainer} = styles;
                                            // var imageUrl = item.image.split("/");
                                            // var url = "http://localhost:4000/"+imageUrl[imageUrl.length-1].toString();
                                            return ( <TouchableOpacity onPress={()=>this.onRowClick({item})}>
                                                <View key={index} style={rowContainer}>

                                                    <Text>{item.name}</Text>
                                                </View>

                                            </TouchableOpacity>)
                                        })
                                    }

                                </ScrollView>
                            }
                        </CardItem>
                    </Card>
            {/*<View>*/}
                {/*<FlatList data={productData}*/}
                          {/*horizontal={true}*/}
                          {/*contentContainerStyle={{top:20}}*/}
                          {/*automaticallyAdjustContentInsets={false}*/}
                          {/*renderItem={this.renderItem}*/}
                          {/*keyExtractor={this.keyExtractor}*/}
                          {/*ItemSeparatorComponent={this.renderSeparator}*/}
                          {/*ListEmptyComponent={this.renderEmpty}*/}
                          {/*onRefresh={this.onRefresh}*/}
                          {/*// refreshing={refreshing}*/}
                          {/*// ListFooterComponent={<View style={{ height: 100}}/>}*/}
                {/*/>*/}
            {/*</View>*/}
                </ScrollView>
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
        borderRadius:10,
        borderWidth:2,
        marginLeft:10,
        marginRight:10,
        justifyContent: 'center',
        alignItems:'center'
    }
});

const mapStateToProps = (state) => {
    const {productData,subcategoryList} = state.product;

    return {
        productData,
        subcategoryList
    };
};

export default connect(mapStateToProps,{
    getProduct,
    getSubCatrgory
})(Home);
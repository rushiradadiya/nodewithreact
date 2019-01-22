import React, { Component } from 'react';
import {FlatList, ScrollView, TouchableOpacity, View, Image, StyleSheet, Alert,TouchableHighlight} from 'react-native';
import {Container, Right, Card, CardItem, Text, Button, Icon, Picker, Left, Content} from 'native-base';
import {connect} from "react-redux";
import {getProduct, getSubCategory,getSubCategoryId,getCategory,getProductID} from "../actions/productAction"
import Navbar from '../component/Navbar';
import Constant from "../helper/themeHelper";
import GridLayout from 'react-native-layout-grid';


class Home extends Component {
    constructor() {
        super()
        this.state = {
            isLoading: false,
        };
    }
    componentDidMount() {
        debugger
        this.props.getCategory();
        this.props.getSubCategory();
        this.props.getProduct();
    }
    onCatRowClick = ({item}) => {
        this.props.getSubCategoryId(item.id);
    };
    onSubCatRowClick = ({item}) => {
        const {navigate} = this.props.navigation;
        this.props.getProductID(item.id).then(res => {
            if(res) {
                navigate('ProductDetails', {productDetail: this.props.productData});
            }
        })
    };

    renderItem = ({item, index}) => {

        const {rowContainer} = styles;
        var imageUrl = item.image.split("/");
        var url = "http://localhost:4000/"+imageUrl[imageUrl.length-1].toString();
        return(
            <TouchableOpacity onPress={()=>this.onRowClick({item})} style={styles.rowContainer}>
                <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>

                    <Image source={{ uri: url}}  style={styles.imageThumbnail}/>
                </View>
            </TouchableOpacity>
        )
    };

    render() {
        var left = (
            <Left style={{flex:1}}>
                <Button onPress={() => this._sideMenuDrawer.open()} transparent>
                    <Icon name='ios-menu' style={{color: '#FFF'}}/>
                </Button>
            </Left>
        );
        var right = (
            <Right style={{flex:1}}>
                <Button onPress={() => {
                    alert("search")
                }} transparent>
                    <Icon name='ios-search' style={{color: '#FFF'}}/>
                </Button>
                <Button onPress={() => {

                    alert('cart')
                }} transparent>
                    <Icon name='ios-cart' style={{color: '#FFF'}}/>
                </Button>
            </Right>)
        const {productData,subcategoryList,categoryList} = this.props;

        return (

                <Container>
                    <Navbar left={left} right={right} title="MY STORE" />
                    <Content>
                        <Card style={{backgroundColor:"yellow"}}>
                            <CardItem header style={{backgroundColor:"#9ca7a7"}} >
                                <Icon name='ios-basket' style={{color: '#475766'}}/>
                                <Text>Category</Text>
                            </CardItem>
                            <CardItem >
                                {
                                    <ScrollView horizontal={true}>
                                        {
                                            categoryList.map((item,index) => {
                                                const {rowContainer} = styles;
                                                var imageUrl = item.image.split("/");
                                                var url = "http://localhost:4000/"+imageUrl[imageUrl.length-1].toString();
                                                return ( <TouchableOpacity onPress={()=>this.onCatRowClick({item})}>
                                                    <View key={index} style={rowContainer} >
                                                        <Image source={{uri:url}} style={{ width:50,height:50,backgroundColor:"#475766"}}/>
                                                        <Text>{item.name}</Text>
                                                    </View>

                                                </TouchableOpacity>)
                                            })
                                        }

                                    </ScrollView>
                                }
                            </CardItem>


                            <CardItem header style={{backgroundColor:"#9ca7a7"}} >
                                <Icon name='ios-basket' style={{color: '#475766'}}/>
                                <Text>Sub Category</Text>
                            </CardItem>
                            <CardItem>
                                {
                                    <ScrollView horizontal={true}>
                                        {
                                            subcategoryList.map((item,index) => {
                                                const {rowContainer} = styles;
                                                var imageUrl = item.image.split("/");
                                                var url = "http://localhost:4000/"+imageUrl[imageUrl.length-1].toString();
                                                return ( <TouchableOpacity onPress={()=>this.onSubCatRowClick({item})}>
                                                    <View key={index} style={rowContainer}>
                                                        <Image source={{uri:url}} style={{width:50,height:50,backgroundColor:"#475766"}}/>
                                                        <Text>{item.name}</Text>
                                                    </View>

                                                </TouchableOpacity>)
                                            })
                                        }
                                    </ScrollView>
                                }
                            </CardItem>
                            <CardItem header style={{backgroundColor:"#9ca7a7"}} >
                                <Icon name='ios-basket' style={{color: '#475766'}}/>
                                <Text>Product</Text>
                            </CardItem>


                        </Card>
                        <ScrollView>
                            <FlatList data={productData}
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
    const {productData,subcategoryList,categoryList} = state.product;

    return {
        productData,
        subcategoryList,
        categoryList

    };
};

export default connect(mapStateToProps,{
    getProduct,
    getSubCategoryId,
    getSubCategory,
    getCategory,
    getProductID
})(Home);
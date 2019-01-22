import React, { Component } from 'react';
import {FlatList, ScrollView, TouchableOpacity, View, Image, StyleSheet, Alert,TouchableHighlight} from 'react-native';
import {Container, Right, Card, CardItem, Text, Button, Icon, Picker, Left} from 'native-base';
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
    }
    onCatRowClick = ({item}) => {
        this.props.getSubCategoryId(item.id);
    };
    onSubCatRowClick = ({item}) => {
        this.props.getProductID(item.id);
    };

    renderGridItem = (item) => (
        <View style={styles.item}>
            <View style={styles.flex} />
            <Text style={styles.name}>
                MAN
            </Text>
        </View>
    );

    // renderGridItem = () => {
    //     const {productData} = this.props
    //     productData.map((item,index) => {
    //         const {rowContainer} = styles;
    //         var imageUrl = item.image.split("/");
    //         var url = "http://localhost:4000/"+imageUrl[imageUrl.length-1].toString();
    //         return ( <TouchableHighlight onPress={()=>{
    //             this.getSubCategoryId(item.id);
    //
    //         }}>
    //             <View key={index} style={{height:50,width:50,backgroundColor:"black"}} >
    //                 <Image source={{uri:url}} style={{ width:50,height:50,backgroundColor:"#475766"}}/>
    //                 <Text>{item.name}</Text>
    //             </View>
    //
    //         </TouchableHighlight>)
    //     })
    //     }

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
                <Container >
                    <Navbar right={right} left={left} title="Home" />
                    <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
                                                return ( <TouchableHighlight onPress={()=>{
                                                    this.getSubCategoryId(item);

                                                }}>
                                                    <View key={index} style={rowContainer} >
                                                        <Image source={{uri:url}} style={{ width:50,height:50,backgroundColor:"#475766"}}/>
                                                        <Text>{item.name}</Text>
                                                    </View>

                                                </TouchableHighlight>)
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
                        <CardItem>

                        </CardItem>
                            <GridLayout
                                items={productData}
                                itemsPerRow={3}
                                style={{backgroundColor:"pink"}}
                                renderItem={this.renderGridItem}
                            />
                        </Card>



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

        marginLeft:10,
        marginRight:10,
        justifyContent: 'center',
        alignItems:'center'
    },
    flex: {
        flex: 1,
    },
    item: {
        height: 150,
        backgroundColor: '#CCCCCC',
        padding: 10,
    },
    name: {
        fontSize: 12,
        textAlign: 'center',
        color: '#000000'
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
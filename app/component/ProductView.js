import React, { Component } from 'react';
import {
    FlatList,
    ScrollView,
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
    Alert,
    TouchableHighlight,
    Dimensions
} from 'react-native';
import {Container, Right, Text,   Card, CardItem, Button} from 'native-base';
import {connect} from "react-redux";
import {getProduct, getSubCategory,getSubCategoryId,getCategory,getProductID} from "../actions/productAction"
import Navbar from '../component/Navbar';
import Constant from "../helper/themeHelper";
import LinearGradient from 'react-native-linear-gradient'
const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');
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
    renderItem = ({item,index}) => {
        const {rowContainer} = styles;
        var imageUrl = item.image.split("/");
        var url = "http://localhost:4000/" + imageUrl[imageUrl.length - 1].toString();
        return (
            <TouchableOpacity  style={styles.rowContainer}>
                <View style={{ flex: 1,  margin: 10,alignItems:'center',shadowColor: '#5a3e42'}}>
                    <Image source={{ uri: url}}  style={styles.imageThumbnail}/>

                    <Text style={{fontSize:20}}>{item.name}</Text>
                    <Text>M.R.P. : ₹ {item.price}</Text>

                </View>
                <TouchableOpacity onPress={() => this.reset()} style={{backgroundColor: "#5a3e42", margin: 20,width:80,height:30,alignItems: 'center',justifyContent:'center',
                    shadowColor: 'black',
                    shadowOffset: {
                        width: 3,
                        height: 3
                    },
                    shadowRadius: 5,
                    shadowOpacity: 5.0}}>

                    <Text style={{color: '#fdfdfd',textAlign: 'center',paddingTop: 5}}>Edit</Text>
                </TouchableOpacity>
            </TouchableOpacity>

        )
    };

    render() {
        const {productData} = this.props
        return (
            <Container>
                <Navbar  title="Product List" />
                <LinearGradient
                    colors={['#ffe4e9', '#ffccd2', '#bb888e']}
                    style={{ height:SCREEN_HEIGHT}}>
                    <ScrollView>
                        <FlatList data={productData}

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
        borderWidth:1,
        fontSize:20,
        marginLeft:10,
        marginRight:10,
        marginBottom:10,
        justifyContent: 'center',
        alignItems:'center',
            shadowColor: '#ffa48e',
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 5.0
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
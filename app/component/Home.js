import React, { Component } from 'react';
import {View} from 'react-native';
import { Card, ListItem, Button, Icon ,Text } from 'react-native-elements'
import {connect} from "react-redux";
import {getProduct} from "../actions/productAction"
import {Picker} from "native-base";


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

    getData() {
        const {page, seed} = this.state;
        this.setState({isLoading: true});
        const url = 'rest api url';
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    data: responseJson,
                    isLoading: false,
                });
            })
            .catch((error) => {
                console.error(error);
            });

    }
    // setData = ({item, index}) =>{
    //
    //     {productData.map((item,index) =>
    //     {
    //         return (<Card
    //             containerStyle={{width:'90%',height:300,alignItems:"center"}}
    //             title='MAN'
    //             image={require(item.image)}
    //             imageStyle={{width:100,height:100}}
    //         >
    //             <Text style={{marginBottom: 10}}>
    //                 {item.name}
    //             </Text>
    //             <Button
    //                 icon={<Icon name='code' color='#ffffff' />}
    //                 backgroundColor='#03A9F4'
    //                 buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
    //                 title='VIEW NOW' />
    //         </Card>)
    //
    //     })}
    //
    //
    //
    // }
    render() {

        const {productData} = this.props;
        return (

            <Card containerStyle={{padding: 0}} >
                {
                    productData.map((u, i) => {
                        return (
                            <ListItem
                                key={i}
                                roundAvatar
                                title={u.name}
                                avatar={{uri:u.image}}
                            />
                        );
                    })
                }
            </Card>

        );

    }
}
const mapStateToProps = (state) => {
    const {productData} = state.product;

    return {
        productData,

    };
};

export default connect(mapStateToProps,{
    getProduct

})(Home);
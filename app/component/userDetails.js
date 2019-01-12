import React, {PureComponent} from 'react';
import {FlatList, StyleSheet,
    Text, View, Button,Alert,
    TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import {getUser} from "../actions/userAction";
class user extends PureComponent {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'User List'
        };
    };

    constructor(props){
        super(props);
        this.state={
            refreshing: false,
            userList: []
        }
    }

    componentDidMount() {

        this.props.getUser();
        console.log(this.state.userList)
        debugger
    }

    componentWillReceiveProps(nextProps, nextState){
        console.log("componentWillReceiveProps");
        console.log(nextProps);
    }

    keyExtractor = (item) => {
        return item.id + "";
    };

    renderSeparator = ({leadingItem, section})=>{
        return <View style={{height:10}}/>;
    };

    renderEmpty = () => {
        return <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text style={{fontSize:15}}>
                {"No data found"}
            </Text>
        </View>
    };

    onRefresh = () => {

        this.setState({refreshing: true});
        this.props.getUser().then(res=>{
            this.setState({refreshing: false});
        });
    };
    renderItem = ({item, index}) => {
        const {rowContainer} = styles;

        console.log(this.state.userList)
        return(

                <View key={index} style={rowContainer}>
                    <Text  style={{fontSize: 30}}>
                        {item.email}</Text>

                </View>

        )
    };

    render() {
        const {refreshing} = this.state;
        const {userList} = this.props;
        console.log(userList)
        alert(JSON.stringify(userList))
        return (
            <View style={styles.container}>

                <FlatList data={userList}
                          contentContainerStyle={{top:20}}
                          automaticallyAdjustContentInsets={false}
                          renderItem={this.renderItem}
                          keyExtractor={this.keyExtractor}
                          ItemSeparatorComponent={this.renderSeparator}
                          ListEmptyComponent={this.renderEmpty}
                          onRefresh={this.onRefresh}
                          refreshing={refreshing}
                          ListFooterComponent={<View style={{ height: 50}}/>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
        justifyContent:'center',
    },
    titleText: {
        fontSize: 12,
        alignSelf: 'center',
        marginBottom: 20
    },
    rowContainer: {
        borderRadius:5,
        padding:10,
        borderWidth:1,
        backgroundColor:'lightblue',
        borderColor:'red',
        marginLeft:10,
        marginRight:10
    }
});

const mapStateToProps = (state) => {
    const {userList} =state.user;
    debugger;
    return {
        userList,
    };
};

export default connect(mapStateToProps,{
    getUser
})(user);
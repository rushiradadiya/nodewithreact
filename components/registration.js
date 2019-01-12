import React, {Component} from 'react';
import {

    StyleSheet,
    TextInput,
    View,
    TouchableOpacity,
    Alert,
    Text

} from 'react-native';


export default class Login extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            task: '',
            status:'',
        };

    }
    registerApi=(value)=>
    {
        Alert.alert("-------enter-----")
        fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                task: this.state.task,
                status :this.state.status,

            }),
        }).then((response) => response.json())
            .then((responseJson) => {
            //return responseJson;
                this.setState({data:responseJson});
            })
            .catch((error) => {
                console.error(error);
            });

    }





    render() {
        return (


                <View style={styles.container} >
                    <TextInput style ={{width: '100%'}}
                               placeholder = "Task"
                               onChangeText={task => this.setState({task})}
                    />
                    <TextInput style ={{width: '100%'}}
                               placeholder = "Status"
                               onChangeText={status => this.setState({status})}
                    />

                    <TouchableOpacity  onPress={this.registerApi} style={{borderWidth: 2}}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>



        );
    }
}
var styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        color : '#ffff',
        alignItems: "center"
    },

});

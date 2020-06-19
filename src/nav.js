import  React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "./pages/account/login";
import Demo from "./pages/Demo";
import UserInfo from "./pages/account/userinfo";
import Tabbar from "./tabbar";
import TanHua from "./pages/friend/tanhua";
import Search from "./pages/friend/search";
import TestSoul from "./pages/friend/testSoul";
import TestQA from "./pages/friend/testSoul/testQA";
import TestResult from "./pages/friend/testSoul/testResult";
import Detail from "./pages/friend/detail";
import Chat from "./pages/message/chat";
import Comment from "./pages/group/home/recommend/comment";
import {inject,observer  } from "mobx-react";
const Stack = createStackNavigator();

@inject("RootStore")
@observer
class Nav extends React.Component {
  constructor(props){
    super(props);
    this.state={
      initialRouteName:this.props.RootStore.token?"Tabbar":"Login"
    }
  }
  render() { 
    const {initialRouteName}=this.state;
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none" initialRouteName={initialRouteName}>
          <Stack.Screen name="Comment" component={Comment} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Detail" component={Detail} />
          <Stack.Screen name="TestResult" component={TestResult} />
          <Stack.Screen name="TestQA" component={TestQA} />
          <Stack.Screen name="TestSoul" component={TestSoul} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="TanHua" component={TanHua} />
          <Stack.Screen name="Tabbar" component={Tabbar} />
          <Stack.Screen name="UserInfo" component={UserInfo} />
          <Stack.Screen name="Demo" component={Demo} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
 
export default Nav;


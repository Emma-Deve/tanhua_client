import React, { Component } from 'react';
import { View, Text,StatusBar } from 'react-native';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import { pxToDp } from '../../../utils/stylesKits';
import FriendHead from "./components/FriendHead";
import Visitors from "./components/Visitors";
class Index extends Component {
  render() {
    return (
      <HeaderImageScrollView
        maxHeight={pxToDp(130)}
        minHeight={pxToDp(44)}
        headerImage={require("../../../res/headfriend.png")}
        renderForeground={() => (
          <View style={{ height: pxToDp(130), justifyContent: "center", alignItems: "center" }} >
           <StatusBar backgroundColor={"transparent"} translucent={true}  />
           <FriendHead/>
          </View>
        )}
      >
        <View style={{ height: 1000 }}>
         {/* 1.0 访客 开始 */}
         <Visitors/>
         {/* 1.0 访客 结束 */}
        </View>
      </HeaderImageScrollView>
    );
  }
}
export default Index;
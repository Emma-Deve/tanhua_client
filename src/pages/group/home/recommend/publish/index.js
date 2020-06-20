import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import THNav from "../../../../../components/THNav";
import { pxToDp } from "../../../../../utils/stylesKits";
import IconFont from "../../../../../components/IconFont";
import Geo from "../../../../../utils/Geo";
import ImagePicker from 'react-native-image-picker';
import Toast from '../../../../../utils/Toast';
class Index extends Component {
  state = {
    textContent: "",
    // 经度
    longitude: "",
    // 纬度
    latitude: "",
    // 详细地址
    location: "",
    imageContent: [
      {
        "headImgShortPath": "/upload/album/18665711978/1576633170560_0.9746430185850421.jpg"
      }
    ],
    // 临时图片数组
    tmpImgList: []
  }
  constructor() {
    super();
    this.refInput = React.createRef();
  }

  // 设置输入框获得焦点
  handleSetInputFocus = () => {
    // console.log(this.refInput);
    if (!this.refInput.isFocused()) {
      // 设置获得焦点
      this.refInput.focus();
    }
  }

  // 输入框的值改变事件
  onChangeText = (textContent) => {
    this.setState({ textContent });
  }

  // 获取当前定位
  getCurrentPosition = async () => {
    const res = await Geo.getCityByLocation();
    const { province, city, district, township, streetNumber } = res.regeocode.addressComponent;
    this.setState({
      location: province + city + district + township,
      longitude: streetNumber.location.split(",")[0],
      latitude: streetNumber.location.split(",")[1]
    });
  }

  // 选择图片 拍摄或者选择相册中
  handleSelectImage = () => {

    const options = {
      title: '选择图片',
      cancelButtonTitle: "取消",
      takePhotoButtonTitle: "拍照",
      chooseFromLibraryButtonTitle: "相册",
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log("===============");
      console.log(response);
      console.log("===============");

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // 图片的数量不能超过9

        const { tmpImgList } = this.state;
        if (tmpImgList.length >= 9) {
          Toast.message("图片的数量不能超过9");
          return;
        }
        tmpImgList.push(response);
        this.setState({ tmpImgList });
      }
    });
  }

  render() {
    const { textContent, location, tmpImgList } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <THNav title="发动态" rightText="发帖"
          onRightPress={() => console.log("发帖了")}
        />
        {/* 1.0 输入框 开始 */}
        <TouchableOpacity
          style={{ height: "40%" }}
          onPress={this.handleSetInputFocus}
        >
          <TextInput
            ref={ref => this.refInput = ref}
            placeholder="请填写动态(140字以内)"
            multiline
            value={textContent}
            onChangeText={this.onChangeText}
          />
        </TouchableOpacity>
        {/* 1.0 输入框 结束 */}
        {/* 2.0 定位 开始 */}
        <View style={{ alignItems: "flex-end", height: pxToDp(40), justifyContent: "center" }}>
          <TouchableOpacity
            onPress={this.getCurrentPosition}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <IconFont style={{ color: "#666", fontSize: pxToDp(16) }} name="iconlocation" />
            <Text style={{ fontSize: pxToDp(12), color: "#aaa", marginLeft: pxToDp(5), marginRight: pxToDp(5) }} >{location || "你在哪里?"}</Text>
          </TouchableOpacity>
        </View>
        {/* 2.0 定位 结束 */}

        {/* 3.0 相册 开始 */}
        <View style={{ paddingTop: pxToDp(5), paddingBottom: pxToDp(5) }}>
          <ScrollView horizontal>
            {tmpImgList.map((v, i) => <Image
              source={{ uri: v.uri }}
              style={{ marginLeft: pxToDp(5), marginRight: pxToDp(5), width: pxToDp(50), height: pxToDp(50) }}
            />)}
          </ScrollView>
        </View>
        {/* 3.0 相册 结束 */}
        {/* 4.0 工具栏 开始 */}
        <View style={{ height: pxToDp(50), flexDirection: "row", alignItems: "center", backgroundColor: "#eee" }}>
          <TouchableOpacity
            onPress={this.handleSelectImage}
            style={{ marginLeft: pxToDp(40), marginRight: pxToDp(40) }}
          >
            <IconFont style={{ fontSize: pxToDp(30), color: "#666" }} name="icontupian" />
          </TouchableOpacity>
          <TouchableOpacity>
            <IconFont style={{ fontSize: pxToDp(30), color: "#666" }} name="iconbiaoqing" />
          </TouchableOpacity>
        </View>
        {/* 4.0 工具栏 结束 */}

      </View>
    );
  }
}
export default Index;
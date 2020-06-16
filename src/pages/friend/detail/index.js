import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import request from "../../../utils/request";
import { FRIENDS_PERSONALINFO, BASE_URI } from "../../../utils/pathMap";
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
// teaset 
import { Carousel } from "teaset";
import { pxToDp } from "../../../utils/stylesKits";
import IconFont from "../../../components/IconFont";
import LinearGradient from "react-native-linear-gradient";
import ImageViewer from 'react-native-image-zoom-viewer';
class Index extends Component {
  state = {
    userDetail: {},
    // 控制 图片放大组件 是否显示
    showAlbum: false,
    // 放大显示的图片的索引
    currentIndex: 0,
    // 放大图片的路径数组
    imgUrls: []
  }
  params = {
    page: 1,
    pagesize: 5
  }

  componentDidMount() {
    this.getDetail();
  }

  // 获取朋友详情
  getDetail = async () => {
    const url = FRIENDS_PERSONALINFO.replace(":id", this.props.route.params.id);
    const res = await request.privateGet(url, this.params);
    this.setState({ userDetail: res.data });
  }


  // 点击 显示相册大图
  handleShowAlbum=(i,ii)=>{
    const imgUrls=this.state.userDetail.trends[i].album.map(v=>({url:BASE_URI+v.thum_img_path}));
    const currentIndex=ii;
    const showAlbum=true;
    this.setState({ imgUrls,currentIndex,showAlbum  });

  }

  render() {
    // console.log(this.props.route.params);
    const { userDetail,imgUrls,currentIndex,showAlbum  } = this.state;
    if (!userDetail.silder) return <></>
    return (
      <HeaderImageScrollView
        maxHeight={pxToDp(220)}
        minHeight={pxToDp(40)}
        renderForeground={() => (
          <Carousel control style={{ height: pxToDp(220) }}>
            {userDetail.silder.map((v, i) => <Image key={i}
              source={{ uri: BASE_URI + v.thum_img_path }}
              style={{ width: "100%", height: pxToDp(220) }}
            />)}
          </Carousel>
        )}
      >
        <View style={{ backgroundColor: "#fff" }} >
          {/* 1.0 用户个人信息 开始 */}
          <View style={{ flexDirection: "row", padding: pxToDp(5), borderBottomWidth: pxToDp(1), borderColor: "#ccc" }}>
            <View style={{ flex: 2, justifyContent: "space-around" }} >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#555" }} >{userDetail.nick_name}</Text>
                <IconFont style={{ marginLeft: pxToDp(5), marginRight: pxToDp(5), fontSize: pxToDp(18), color: userDetail.gender === "女" ? "#b564bf" : "red" }}
                  name={userDetail.gender === "女" ? "icontanhuanv" : "icontanhuanan"} />
                <Text style={{ color: "#555" }} >{userDetail.age}岁</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "#555", marginRight: pxToDp(5) }} >{userDetail.marry}</Text>
                <Text style={{ color: "#555", marginRight: pxToDp(5) }} >|</Text>
                <Text style={{ color: "#555", marginRight: pxToDp(5) }} >{userDetail.xueli}</Text>
                <Text style={{ color: "#555", marginRight: pxToDp(5) }} >|</Text>
                <Text style={{ color: "#555", marginRight: pxToDp(5) }} >{userDetail.agediff < 10 ? "年龄相仿" : "有点代沟"}</Text>
              </View>
            </View>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <View style={{ position: "relative", alignItems: "center", justifyContent: "center" }}>
                <IconFont name="iconxihuan" style={{ fontSize: pxToDp(50), color: "red" }} />
                <Text style={{ position: "absolute", color: "#fff", fontSize: pxToDp(13), fontWeight: "bold" }} >{userDetail.fateValue}</Text>
              </View>
              <Text style={{ color: "red", fontSize: pxToDp(13) }} >缘分值</Text>
            </View>
          </View>
          {/* 1.0 用户个人信息 结束 */}
          {/* 2.0 动态 开始 */}
          <View>
            {/* 2.1 标题 开始 */}
            <View style={{ padding: pxToDp(10), flexDirection: "row", justifyContent: 'space-between', borderBottomWidth: pxToDp(1), borderColor: "#ccc" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#666" }} >动态</Text>
                <View style={{
                  backgroundColor: "red", width: pxToDp(16), height: pxToDp(16),
                  borderRadius: pxToDp(8), alignItems: "center", justifyContent: 'center',
                  marginLeft: pxToDp(5)
                }} >
                  <Text style={{ color: "#fff" }} >3</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{ marginRight: pxToDp(8) }}
                >
                  <LinearGradient
                    colors={["#f2ab5a", "#ec7c50"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      width: pxToDp(100), height: pxToDp(30), borderRadius: pxToDp(15),
                      flexDirection: "row", alignItems: 'center', justifyContent: "space-evenly"
                    }}
                  >
                    <IconFont style={{ color: "#fff" }} name="iconliaotian" ></IconFont>
                    <Text style={{ color: "#fff" }}>聊一下</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginRight: pxToDp(8) }}
                >
                  <LinearGradient
                    colors={["#6d47f8", "#e56b7f"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      width: pxToDp(100), height: pxToDp(30), borderRadius: pxToDp(15),
                      flexDirection: "row", alignItems: 'center', justifyContent: "space-evenly"
                    }}
                  >
                    <IconFont style={{ color: "#fff" }} name="iconxihuan-o" ></IconFont>
                    <Text style={{ color: "#fff" }}>喜欢</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
            {/* 2.1 标题 结束 */}
            {/* 2.2 列表 开始 */}
            <View>
              {
                userDetail.trends.map((v, i) => <View
                  key={i}
                  style={{ padding: pxToDp(10), borderBottomColor: "#ccc", borderBottomWidth: pxToDp(1) }}
                >
                  {/* 2.2.1 用户信息 开始 */}
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{ paddingRight: pxToDp(15) }}
                    ><Image
                        style={{ width: pxToDp(40), height: pxToDp(40), borderRadius: pxToDp(20) }}
                        source={{ uri: BASE_URI + userDetail.header }} /></View>

                    <View style={{ flex: 2, justifyContent: "space-around" }} >
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ color: "#555" }} >{userDetail.nick_name}</Text>
                        <IconFont style={{ marginLeft: pxToDp(5), marginRight: pxToDp(5), fontSize: pxToDp(18), color: userDetail.gender === "女" ? "#b564bf" : "red" }}
                          name={userDetail.gender === "女" ? "icontanhuanv" : "icontanhuanan"} />
                        <Text style={{ color: "#555" }} >{userDetail.age}岁</Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: "#555", marginRight: pxToDp(5) }} >{userDetail.marry}</Text>
                        <Text style={{ color: "#555", marginRight: pxToDp(5) }} >|</Text>
                        <Text style={{ color: "#555", marginRight: pxToDp(5) }} >{userDetail.xueli}</Text>
                        <Text style={{ color: "#555", marginRight: pxToDp(5) }} >|</Text>
                        <Text style={{ color: "#555", marginRight: pxToDp(5) }} >{userDetail.agediff < 10 ? "年龄相仿" : "有点代沟"}</Text>
                      </View>
                    </View>

                  </View>
                  {/* 2.2.1 用户信息 结束 */}

                  {/* 2.3 动态内容 开始 */}
                  <View style={{ marginTop: pxToDp(8) }}>
                    <Text style={{ color: "#666" }} >{v.content}</Text>
                  </View>
                  {/* 2.3 动态内容 结束 */}
                  {/* 2.4 相册 开始 */}
                  <View style={{ flexWrap: "wrap", flexDirection: "row", paddingTop: pxToDp(5), paddingBottom: pxToDp(5) }}>
                    {v.album.map((vv, ii) => <TouchableOpacity
                    onPress={()=>this.handleShowAlbum(i,ii)}
                      key={ii}><Image
                      style={{ width: pxToDp(70), height: pxToDp(70), marginRight: pxToDp(5) }}
                      source={{ uri: BASE_URI + vv.thum_img_path }} />
                    </TouchableOpacity>
                    )}
                  </View>
                  {/* 2.4 相册 结束 */}
                </View>)
              }
            </View>
            {/* 2.2 列表 结束 */}
          </View>
          {/* 2.0 动态 结束 */}

          <Modal visible={showAlbum} transparent={true}>
            <ImageViewer 
            onClick={()=>this.setState({ showAlbum:false  })}
            imageUrls={imgUrls} index={currentIndex} />
          </Modal>
        </View>
      </HeaderImageScrollView>
    );
  }
}
export default Index;
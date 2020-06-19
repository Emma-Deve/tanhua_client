
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import THNav from "../../../../../components/THNav";
import IconFont from "../../../../../components/IconFont";
import { BASE_URI, QZ_DT_PL,QZ_DT_PL_DZ } from "../../../../../utils/pathMap";
import { pxToDp } from "../../../../../utils/stylesKits";
import date from "../../../../../utils/date";
import THButton from "../../../../../components/THButton";
import request from "../../../../../utils/request";
import Toast from '../../../../../utils/Toast';
class Index extends Component {
  
  params = {
    page: 1,
    pagesize: 5
  }
  state = {
    list: [],
    counts:0
  }
  componentDidMount() {
    this.getList();
  }

  // 获取评论列表
  getList = async () => {
    const url = QZ_DT_PL.replace(":id", this.props.route.params.tid);
    const res = await request.privateGet(url, this.params);
    // console.log(res);
    this.setState({ list: res.data ,counts:res.counts});
  }

  // 给评论点赞
  handleSetStar=async(id)=>{
    const url=QZ_DT_PL_DZ.replace(":id",id);
    const res=await request.privateGet(url);
    console.log(res);
    Toast.smile("点赞成功");
    this.params.page=1;
    this.getList();
  }

  render() {
    const item = this.props.route.params;
    const { list,counts } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <THNav title="最新评论" />
        {/* 1.0 用户信息 开始 */}
        <View style={{ padding: pxToDp(10) }}>
          {/* 2.2.1 用户信息 开始 */}
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <View
              style={{ paddingRight: pxToDp(15) }}
            ><Image
                style={{ width: pxToDp(40), height: pxToDp(40), borderRadius: pxToDp(20) }}
                source={{ uri: BASE_URI + item.header }} /></View>

            <View style={{ flex: 2, justifyContent: "space-around" }} >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#555" }} >{item.nick_name}</Text>
                <IconFont style={{ marginLeft: pxToDp(5), marginRight: pxToDp(5), fontSize: pxToDp(18), color: item.gender === "女" ? "#b564bf" : "red" }}
                  name={item.gender === "女" ? "icontanhuanv" : "icontanhuanan"} />
                <Text style={{ color: "#555" }} >{item.age}岁</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "#555", marginRight: pxToDp(5) }} >{item.marry}</Text>
                <Text style={{ color: "#555", marginRight: pxToDp(5) }} >|</Text>
                <Text style={{ color: "#555", marginRight: pxToDp(5) }} >{item.xueli}</Text>
                <Text style={{ color: "#555", marginRight: pxToDp(5) }} >|</Text>
                <Text style={{ color: "#555", marginRight: pxToDp(5) }} >{item.agediff < 10 ? "年龄相仿" : "有点代沟"}</Text>
              </View>
            </View>
          </View>
          {/* 2.2.1 用户信息 结束 */}

          {/* 2.3 动态内容 开始 */}
          <View style={{ marginTop: pxToDp(8) }}>
            <Text style={{ color: "#666" }} >{item.content}</Text>
          </View>
          {/* 2.3 动态内容 结束 */}
          {/* 2.4 相册 开始 */}
          <View style={{ flexWrap: "wrap", flexDirection: "row", paddingTop: pxToDp(5), paddingBottom: pxToDp(5) }}>
            {item.images.map((vv, ii) => <TouchableOpacity
              key={ii}><Image
                style={{ width: pxToDp(70), height: pxToDp(70), marginRight: pxToDp(5) }}
                source={{ uri: BASE_URI + vv.thum_img_path }} />
            </TouchableOpacity>
            )}
          </View>
          {/* 2.4 相册 结束 */}
          {/* 2.5 距离时间 开始 */}
          <View style={{ flexDirection: "row", paddingTop: pxToDp(5), paddingBottom: pxToDp(5) }}>
            <View><Text style={{ color: "#666" }} >距离 {item.dist} m</Text></View>
            <View><Text style={{ color: "#666", marginLeft: pxToDp(8) }} >{date(item.create_time).fromNow()}</Text></View>
          </View>
          {/* 2.5 距离时间 结束 */}
          {/* 2.6 最新评论 发表评论 开始 */}
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "#666" }} >最新评论</Text>
              <View style={{
                backgroundColor: "red", height: pxToDp(20), width: pxToDp(20),
                borderRadius: pxToDp(10), marginLeft: pxToDp(5), alignItems: "center", justifyContent: "center"
              }}><Text style={{ color: "#fff" }} >{counts}</Text></View>
            </View>
            <View>
              <THButton
                textStyle={{ fontSize: pxToDp(10) }}
                style={{ width: pxToDp(80), height: pxToDp(20), borderRadius: pxToDp(10) }}
              >发表评论</THButton>
            </View>
          </View>
          {/* 2.6 最新评论 发表评论 结束 */}
          {/* 2.7 评论列表 开始 */}
          <View>
            {list.map((v, i) => <View
              key={i}
              style={{
                flexDirection: "row", paddingTop: pxToDp(5), paddingBottom: pxToDp(5),
                borderBottomColor: "#ccc", borderBottomWidth: pxToDp(1),alignItems:"center"
              }}
            >
              <View style={{paddingRight:pxToDp(10)}}>
                <Image style={{ width: pxToDp(40), height: pxToDp(40), borderRadius: pxToDp(20) }} source={{ uri: BASE_URI + v.header }} />
              </View>
              <View>
                <Text style={{color:"#666"}}>{v.nick_name}</Text>
                <Text style={{color:"#666",fontSize:pxToDp(13),marginTop:pxToDp(5),marginBottom:pxToDp(5)}}>{date(v.create_time).format("YYYY-MM-DD HH:mm:ss")}</Text>
                <Text>{v.content}</Text>
              </View>
              <TouchableOpacity 
              onPress={this.handleSetStar.bind(this,v.cid)}
              style={{flexDirection:"row",flex:1,justifyContent:"flex-end",alignItems:"center"}}>
                <IconFont style={{color:"#666",fontSize:pxToDp(13)}}  name="icondianzan-o" />
                <Text style={{color:"#666"}}>{v.star}</Text>
              </TouchableOpacity>
            </View>)}
          </View>
          {/* 2.7 评论列表 结束 */}
        </View>
        {/* 1.0 用户信息 结束 */}
      </View>
    );
  }
}
export default Index;
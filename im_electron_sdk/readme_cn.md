# 腾讯云即时通信IM Electron API
<img src="https://web.sdk.qcloud.com/im/demo/latest/img/logo.680f9833.svg" width="365" height="182" data-canonical-src="https://web.sdk.qcloud.com/im/demo/latest/img/logo.680f9833.svg" style="max-width: 100%;">

更多语言 ：[English](./readme.md) | 简体中文

## 关于腾讯云即时通信
腾讯云即时通信提供全球互联的聊天API、多平台SDK和UIKit组件，帮助您快速将一对一聊天、群聊、聊天室、系统通知等消息传递能力带入您的应用和网站。

通过官方 electron SDK im_electron_sdk，您可以高效地将实时聊天集成到您的客户端应用程序中。

您可以在[这里](https://www.tencentcloud.com/en/account/login?s_url=https%3A%2F%2Fconsole.tencentcloud.com%2Fim)注册腾讯云账号。

探索更多关于[腾讯云即时通信](https://www.tencentcloud.com/en/products/im)的文档。

Electron SDK 基于腾讯云即时通信IM跨平台 C接口封装，接口与C接口保持一致。

## 支持平台
目前支持 Macos和Windows两个平台

## 环境要求 
|平台|版本|
|---|---|
|Electron|13.1.5 及以上版本|
|Node.js|v14.2.0 及以上版本|

## 选择适合的方法集成 Electron SDK
IM 提供了两种方式来即成，您可以选择最合适的方案来即成：

|继承方式|	适用场景|
|---|---|
|使用 DEMO|	IM Demo包含完整的聊天功能，代码已开源，如果您需要实现聊天类似场景，可以使用 Demo进行二次开发。可立即体验 [Demo](https://cloud.tencent.com/document/product/269/36852)。|
|自实现	|如果 Demo 不能满足您应用的功能界面需求，可以使用该方法。|
为帮助您更好的理解 IM SDK 的各 API，我们还提供了 [API 文档](https://comm.qq.com/im/doc/electron/zh/)。

## 体验 Demo
您可以通过以下演示体验我们的聊天和语音/视频通话模块。
以下演示是由同一个 Electron 项目使用我们的 SDK 和扩展构建。 您可以通过demo下载体验我们的SDK。

- [Windows](https://comm.qq.com/im_demo_download/index.html#/pc-windows)
- [MacOS](https://comm.qq.com/im_demo_download/index.html#/pc)

您也可以通过 Git 下载 Demo:
```
git clone https://github.com/tencentyun/im_electron_demo.git
```
## 下载 SDK
``` javascript
  npm install im_electron_sdk
```

## 使用

**前提条件**
1. 您已 [注册腾讯云](https://www.tencentcloud.com/zh/document/product/378/17985) 帐号，并完成 [实名认证](https://www.tencentcloud.com/zh/document/product/378/3629)。
2. 参照 [创建并升级应用](https://www.tencentcloud.com/zh/document/product/1047/34577) 创建应用，并记录好SDKAppID。

**初始化**
``` javascript
// 主进程
const TimMain = require('im_electron_sdk/dist/main')

const sdkappid = 0;// 可以去腾讯云即时通信IM控制台申请
const tim = new TimMain({
  sdkappid:sdkappid
})

//渲染进程

const TimRender = require('im_electron_sdk/dist/render')
const timRender = new TimRender();
// 初始化
timRender.TIMInit()
```

**登录**
```javascript
// 登录
timRender.TIMLogin({
  userID:"userID",
  userSig:"userSig" // 参考userSig生成
}).then(()=>{
  // success
}).catch(err=>{
  // error
})
```
>? 该账户仅限开发测试使用，应用上线前，正确的UserSig 签发方式是将UserSig的计算代码集成到您的服务端，并提供面向 APP的接口。在需要 UserSig时由您的 APP 向业务服务器发起请求获取动态 UserSig。更多详情请参见 [服务端生成UserSig](https://cloud.tencent.com/document/product/269/32688#GeneratingdynamicUserSig)。

**发送消息**
下面示例代码为发送简单文本消息。您可以通过此消息发送接口发送图片、地理位置、语音、视频、自定义等其他类型的消息。具体内容请参考[API 文档](https://comm.qq.com/im/doc/electron/zh/)。
```javascript
let param:MsgSendMessageParamsV2 = {
    conv_id: "conv_id",
    conv_type: 1, // 请参考 enum [TIMConvType]
    params: {
        message_elem_array: [{
            elem_type: 0, // 请参考 enum [TIMElemType]
            text_elem_content:'Hello Tencent!',
        }],
    },
    callback: (data) => {}
  }
let data = await timRender.TIMMsgSendMessageV2(param); // if(data.code == 0),success
```
>？ 如果发送失败，可能是由于您的 sdkAppID 不支持陌生人发送消息，您可至控制台开启，用于测试。[请点击此链接](https://console.cloud.tencent.com/im/login-message)，关闭好哟关系链检查。

**获取会话列表**
若消息发送成功，则会在会话中显示发送成功的消息。获取会话列表的示例代码如下：
```javascript
let param:getConvList = {
    userData:'',
  }
let {code,json_params} = await timRenderInstance.TIMConvGetConvList(param)
if(code == 0){
  // 成功， "json_params" 包含会话列表相关信息。详细的返回值请参考 SDK文档
}
```

**接受消息**
常见应用场景为：
1. 界面进入新的会话后，首先一次性请求一定数量的历史消息，用于展示历史消息列表。
2. 监听长链接，实时接收新的消息，将其添加进历史消息列表中。

一次性请求历史消息列表
```javascript
let param:MsgGetMsgListParams = {
        conv_id: conv_id,
        conv_type: conv_type,
        params: {
            msg_getmsglist_param_last_msg: msg,
            msg_getmsglist_param_count: 20,
            msg_getmsglist_param_is_remble: true,
        },
        user_data: user_data
    }
    let msgList:commonResult<Json_value_msg[]> = await timRenderInstance.TIMMsgGetMsgList(param);
```
监听实时获取新消息
绑定 callback 示例代码如下：
```javascript
let param : TIMRecvNewMsgCallbackParams = {
            callback: (...args)=>{},
            user_data: user_data
        }
timRenderInstance.TIMAddRecvNewMsgCallback(param);
```
此时，您已基本完成 IM 模块开发，可以发送接收消息，也可以进入不同的会话。
您可以继续完成 群组，用户资料，关系链，离线推送，本地搜索 等相关功能开发。
详情可查看 [API 文档](https://comm.qq.com/im/doc/electron/zh/)

**使用更多插件丰富 IM 使用体验**
除 SDK 基础功能外，我们还提供了选装插件，帮助您丰富 IM 能力。
- [音视频通话插件](https://cloud.tencent.com/document/product/647)：支持一对一/群组 音视频 通话。
- [地理位置消息插件](https://cloud.tencent.com/document/product/269/80881) ：提供选取位置/发送位置及解析展示位置消息的能力。
- [自定义表情插件](https://cloud.tencent.com/document/product/269/80882) ：快速便捷集成表情能力。

### 注意
1、多渲染进程使用sdk不能重复初始化和登录

## 常见问题
- 使用vue-cli-plugin-electron-builder 构建的项目使用native modules 请参考[No native build was found for platform = xxx](https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/1492)
- 自己使用webpack 构建的项目使用native modules 请参考[Windows 下常见问题](https://blog.csdn.net/Yoryky/article/details/106780254)
- Dynamic Linking Error. electron-builder 配置
``` javascript
   extraFiles:[
    {
      "from": "./node_modules/im_electron_sdk/lib/",
      "to": "./Resources",
      "filter": [
        "**/*"
      ]
    }
  ]
```
## API 文档和更新日志
如果您想了解更多关于 im_electron_sdk 的 API 文档，请前往 [文档](https://comm.qq.com/im/doc/electron/zh/)。

如需查看SDK版本记录，请前往[更新日志](https://www.tencentcloud.com/zh/document/product/1047/34281)。

#### 关于文档
右侧manger/xxx 是各个API的文档 右侧interface/xxx 是各个API方法的interface，其中有各个参数的提醒注意事项

## 其他
底层sdk版本：mac(5.7.1445)、windows(5.7.1445)、Linux(5.7.1445)
## 联系方式
- 开发群 
<img src="https://qcloudimg.tencent-cloud.cn/raw/f3f531d942ec13eb2184d853db7a56c0.jpg" width="50%" alt="二维码"/>
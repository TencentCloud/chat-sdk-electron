# 腾讯云即时通信IM Electron API
<img src="https://camo.githubusercontent.com/c1e070dc8b0a68158dbc5fd476a1a35158f5f62fea16964e82beeaa9ee28094b/68747470733a2f2f7765622e73646b2e71636c6f75642e636f6d2f696d2f64656d6f2f6c61746573742f696d672f6c6f676f2e36383066393833332e737667" width="365" height="182" data-canonical-src="https://web.sdk.qcloud.com/im/demo/latest/img/logo.680f9833.svg" style="max-width: 100%;">

## 关于腾讯云即时通信
腾讯云即时通信提供全球互联的聊天API、多平台SDK和UIKit组件，帮助您快速将一对一聊天、群聊、聊天室、系统通知等消息传递能力带入您的应用和网站。

通过官方 electron SDK im_electron_sdk，您可以高效地将实时聊天集成到您的客户端应用程序中。

您可以在[这里](https://www.tencentcloud.com/en/account/login?s_url=https%3A%2F%2Fconsole.tencentcloud.com%2Fim)注册腾讯云账号。

探索更多关于[腾讯云即时通信](https://www.tencentcloud.com/en/products/im)的文档。

Electron SDK 基于腾讯云即时通信IM跨平台 C接口封装，接口与C接口保持一致。

## 支持平台
Windows、Mac、Linux（uos）

## 下载
``` javascript
  npm install im_electron_sdk --save
```

## 使用
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
// 登录
timRender.TIMLogin({
  userID:"userID",
  userSig:"userSig" // 参考userSig生成
}).then(()=>{
  // success
}).catch(err=>{
  // error
})
// 其他api
```
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
如果您想了解更多关于 im_electron_sdk 的 API 文档，请前往 [文档](https://comm.qq.com/im/doc/electron/en/)。

如需查看SDK版本记录，请前往[更新日志](https://www.tencentcloud.com/zh/document/product/1047/34281)。

#### 关于文档
右侧manger/xxx 是各个API的文档 右侧interface/xxx 是各个API方法的interface，其中有各个参数的提醒注意事项

## 其他
底层sdk版本：mac(5.7.1445)、windows(5.7.1445)、Linux(5.7.1445)
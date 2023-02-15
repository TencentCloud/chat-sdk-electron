// import { TIMConvType, TIMDownloadType, TIMElemType, TIMReceiveMessageOpt } from "../../../im_electron_sdk/dist/enums";
import TimRender from "../../../im_electron_sdk/dist/renderer";
import { MsgBatchSendParams, MsgCancelSendParams, MsgClearHistoryMessageParams, MsgDeleteParams, MsgDownloadElemToPathParams, MsgDownloadMergerMessageParams, MsgFindByMsgLocatorListParams, MsgFindMessagesParams, MsgGetC2CReceiveMessageOptParams, MsgGetMsgListParams, MsgImportMsgListParams, MsgListDeleteParams, MsgModifyMessageParams, MsgReportReadedParams, MsgRevokeParams, MsgSaveMsgParams, MsgSearchLocalMessagesParams, MsgSendMessageParamsV2, MsgSendReplyMessage, MsgSetC2CReceiveMessageOptParams, MsgSetGroupReceiveMessageOptParams, OfflinePushToken, TIMMsgDeleteMessageExtensionsParam, TIMMsgElemUploadProgressCallbackParams, TIMMsgGetMessageExtensionsParam, TIMMsgReadedReceiptCallbackParams, TIMMsgRevokeCallbackParams, TIMMsgSetMessageExtensionsParam, TIMMsgUpdateCallbackParams, TIMRecvNewMsgCallbackParams, TIMSetMsgExtensionsChangedCallbackParam, TIMSetMsgExtensionsDeletedCallbackParam } from "../../../im_electron_sdk/dist/interfaces";


// import TimRender from "im_electron_sdk/dist/renderer";
const timRenderInstance = new TimRender();

const advanceMessageManager = {
    TIMMsgSendMessage:() => {
        let param:MsgSendMessageParamsV2 = {
            // conv_id: "@TGS#14Q5ONCJC",
            // conv_id: "@TGS#1DS5WDSOBM",
            // conv_id: "3e56df7704234f83b195e6b25a5ba665",
            conv_id: "10045363",
            conv_type: 1,
            params: {
                // @ts-ignore
                message_elem_array: [{
                    // elem_type: 0,
                    elem_type: 1,
                    image_elem_orig_path: "/Users/xingchenhe/Downloads/wecom-temp-92200-0376ddb4082b0a7f8c2a96ec822a924b.jpg",
                    // text_elem_content: `\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\u0008\u0009\u000a\u000b\u000c\u000d\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f\u0020\u0021\u0022\u0023\u0024\u0025\u0026\u0027\u0028\u0029\u002a\u002b\u002c\u002d\u002e\u002f\u0030\u0031\u0032\u0033\u0034\u0035\u0036\u0037\u0038\u0039\u003a\u003b\u003c\u003d\u003e\u003f\u0040\u0041\u0042\u0043\u0044\u0045\u0046\u0047\u0048\u0049\u004a\u004b\u004c\u004d\u004e\u004f\u0050\u0051\u0052\u0053\u0054\u0055\u0056\u0057\u0058\u0059\u005a\u005b\u005c\u005d\u005e\u005f\u0060\u0061\u0062\u0063\u0064\u0065\u0066\u0067\u0068\u0069\u006a\u006b\u006c\u006d\u006e\u006f\u0070\u0071\u0072\u0073\u0074\u0075\u0076\u0077\u0078\u0079\u007a\u007b\u007c\u007d\u007e\u007f\u0080\u0081\u0082\u0083\u0084\u0085\u0086\u0087\u0088\u0089\u008a\u008b\u008c\u008d\u008e\u008f\u0090\u0091\u0092\u0093\u0094\u0095\u0096\u0097\u0098\u0099\u009a\u009b\u009c\u009d\u009e\u009f\u00a0\u00a1\u00a2\u00a3\u00a4\u00a5\u00a6\u00a7\u00a8\u00a9\u00aa\u00ab\u00ac\u00ad\u00ae\u00af\u00b0\u00b1\u00b2\u00b3\u00b4\u00b5\u00b6\u00b7\u00b8\u00b9\u00ba\u00bb\u00bc\u00bd\u00be\u00bf\u00c0\u00c1\u00c2\u00c3\u00c4\u00c5\u00c6\u00c7\u00c8\u00c9\u00ca\u00cb\u00cc\u00cd\u00ce\u00cf\u00d0\u00d1\u00d2\u00d3\u00d4\u00d5\u00d6\u00d7\u00d8\u00d9\u00da\u00db\u00dc\u00dd\u00de\u00df\u00e0\u00e1\u00e2\u00e3\u00e4\u00e5\u00e6\u00e7\u00e8\u00e9\u00ea\u00eb\u00ec\u00ed\u00ee\u00ef\u00f0\u00f1\u00f2\u00f3\u00f4\u00f5\u00f6\u00f7\u00f8\u00f9\u00fa\u00fb\u00fc\u00fd\u00fe\u00ff`
                    // text_elem_content:'最新',
                    // text_elem_content:`abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,./;'[]=-0987654321<>，。、‘；【】？》《：“|+——）（\n\b/n/b`
                    // image_elem_orig_path: "/home/lexuslin/sucai/111.png",
                    // image_elem_level: 0
                    // file_elem_file_path: "/home/lexuslin/sucai/15.zip",
                    // file_elem_file_name: "xxxx",
                    // file_elem_file_size: 23150412 
                }],
                message_cloud_custom_str: "test electron sdk cloud field",
                message_need_read_receipt:true,
                // message_sender: "1400726412",
            },
            // user_data: "123",
            callback: (data) => {
                // const {code, json_params, desc } = data;
                
                var d = data[0].json_params;
                
                // d = d.replace(rx_escapable, function (a) {
                //     var c = meta[a];
                //     return typeof c === "string"
                //         ? c
                //         : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                // })
                
                // d = d.replace(rx_dangerous,"")
                // for(let i in meta){
                //     d = d.replace(i,meta[i])
                // }
                
            }
        }
        return timRenderInstance.TIMMsgSendMessageV2(param);
    },
    TIMMsgSendReplyMessage: () => {
        let param:MsgSendReplyMessage = {
            conv_id: "121405",
            conv_type: 1,
            params: {
                message_elem_array: [{
                    elem_type: 0,
                    text_elem_content: "123"
                }],
                message_sender: "3708",
            },
            user_data: "123",
            replyMsg: {
                message_elem_array: [{ elem_type: 0, text_elem_content: "ffff" }],
                message_msg_id: "144115234938202258-1640588749-1866690926",
            },
            callback: (data)=>{}
        }
        return timRenderInstance.TIMMsgSendReplyMessage(param);
    },
    TIMMsgCancelSend:() => {
        let param:MsgCancelSendParams = {
            conv_id: "lexuslin3",
            conv_type: 1,
            message_id: "144115225971632901-1625125460-3998758148",
            user_data: "123"
        }
        return timRenderInstance.TIMMsgCancelSend(param);
    },
    TIMMsgModifyMessage:async () => { 
        var message = await advanceMessageManager.TIMMsgGetMsgList(null);
        var message1;
        if(message.json_params!==undefined){
            message1 =message.json_params[0];
        }
       message1.message_elem_array[0].text_elem_content ="久";
       let param:MsgModifyMessageParams = {
         params: message1 ,
         user_data: "123"
       }
       return timRenderInstance.TIMMsgModifyMessage(param)
    },
    TIMMsgFindMessages:() => {
        let param:MsgFindMessagesParams = {
            json_message_id_array: ["144115225971632901-1625125460-3998758148"],
            user_data: "123"
        }
        return timRenderInstance.TIMMsgFindMessages(param);
    },
    TIMMsgReportReaded:() => {
        let param : MsgReportReadedParams = {
            conv_id: "lexuslin3",
            conv_type: 1,
            message_id: "144115225971632901-1625125460-3998758148",
            user_data: "123"
        }
        return timRenderInstance.TIMMsgReportReaded(param);
    },
    TIMMsgRevoke:() => {
        let param:MsgRevokeParams = {
            conv_id: "lexuslin3",
            conv_type: 1,
            message_id: "144115225971632901-1625125460-3998758148",
            user_data: "123"
        }
        return timRenderInstance.TIMMsgRevoke(param);
    },
    TIMMsgFindByMsgLocatorList:() => {
        let param:MsgFindByMsgLocatorListParams = {
            conv_id: "lexuslin3",
            conv_type: 1,
            params: [{
                message_locator_is_revoked: false,
                message_locator_time: 123,
                message_locator_seq: 123,
                message_locator_is_self: true,
                message_locator_rand: 123,
                message_locator_unique_id: 123
            }],
            user_data: "123"
        }
        return timRenderInstance.TIMMsgFindByMsgLocatorList(param);
    },
    TIMMsgImportMsgList:() => {
        let param:MsgImportMsgListParams = {
            conv_id: "lexuslin3",
            conv_type: 1,
            params: [{
                message_elem_array: [{
                    elem_type: 0,
                    text_elem_content: "这是特殊字符\u0014\ufffd"
                }],
                message_sender: "lexuslin3"
            }],
            user_data: "123"
        }
        return timRenderInstance.TIMMsgImportMsgList(param);
    },
    TIMMsgSaveMsg:() => {
        let param :MsgSaveMsgParams = {
            conv_id: "@TGS#1AC5PRWHY",
            conv_type: 2,
            params: {
                message_elem_array: [{
                    elem_type: 0,
                    text_elem_content: "123"
                }],
                message_sender: "3708"
            },
            user_data: "123"
        }
        return timRenderInstance.TIMMsgSaveMsg(param);
    },
    TIMMsgGetMsgList:(msg) => {
        let param:MsgGetMsgListParams = {
            // conv_id:"@TGS#13E6NP7IJ",
            conv_id: "10045363",
            conv_type: 1,
            params: {
                msg_getmsglist_param_last_msg: msg,
                msg_getmsglist_param_count: 20,
                msg_getmsglist_param_is_remble: true,
            },
            user_data: "123"
        }
        return timRenderInstance.TIMMsgGetMsgList(param);
    },
    TIMMsgDelete:() => {
        let param :MsgDeleteParams = {
            conv_id: "lexuslin3",
            conv_type: 1,
            params: {
                msg_delete_param_msg: "144115225971632901-1625125460-3998758148",
                msg_delete_param_is_remble: true
            },
            user_data: "123"
        }
        return timRenderInstance.TIMMsgDelete(param);
    },
    TIMMsgListDelete:() => {
        let param : MsgListDeleteParams = {
            conv_id: "lexuslin3",
            conv_type: 1,
            params: ["144115225971632901-1625125460-3998758148"],
            user_data: "123"
        }
        return timRenderInstance.TIMMsgListDelete(param);
    },
    TIMMsgClearHistoryMessage:() => {
        let param:MsgClearHistoryMessageParams = {
            conv_id: "lexuslin3",
            conv_type: 1,
            user_data: "123"
        }
        return timRenderInstance.TIMMsgClearHistoryMessage(param);
    },
    TIMMsgSetC2CReceiveMessageOpt:() => {
        let param:MsgSetC2CReceiveMessageOptParams = {
            params: ["lexuslin3"],
            opt: 0,
            user_data: "123"
        }
        return timRenderInstance.TIMMsgSetC2CReceiveMessageOpt(param);
    },
    TIMMsgGetC2CReceiveMessageOpt:() => {
        let param:MsgGetC2CReceiveMessageOptParams = {
            params: ["lexuslin3"],
            user_data: "123"
        }
        return timRenderInstance.TIMMsgGetC2CReceiveMessageOpt(param);
    },
    TIMMsgSetGroupReceiveMessageOpt:() => {
        let param:MsgSetGroupReceiveMessageOptParams = {
            group_id: "1lexuslin127",
            opt: 1,
            user_data: "123"
        }
        return timRenderInstance.TIMMsgSetGroupReceiveMessageOpt(param);
    },
    TIMMsgDownloadElemToPath:() => {
        let param:MsgDownloadElemToPathParams = {
            params: {
                msg_download_elem_param_flag: 2,
                msg_download_elem_param_type: 0,
                msg_download_elem_param_id: "1400187352_lexuslin3_c3b94cee5c318b590b5cff79a712af23.MOV",
                msg_download_elem_param_business_id: 0,
                msg_download_elem_param_url: "https://cos.ap-shanghai.myqcloud.com/0345-1400187352-1303031839/b310-lexuslin3/c3b94cee5c318b590b5cff79a712af23.MOV",
            },
            path: "/home/lexuslin/Downloads/111.mov",
            user_data: "123"
        }
        return timRenderInstance.TIMMsgDownloadElemToPath(param);
    },
    TIMMsgDownloadMergerMessage:() => {
        let param:MsgDownloadMergerMessageParams = {
            params: {
                message_elem_array: [{
                    elem_type: 3,
                    text_elem_content: "xxx"
                }],
                message_sender: "lexuslin"
            },
            user_data: "123"
        }
        return timRenderInstance.TIMMsgDownloadMergerMessage(param);
    },
    TIMMsgBatchSend:() => {
        let param: MsgBatchSendParams = {
            params: {
                msg_batch_send_param_identifier_array: ["lexuslin3", "13675"],
                msg_batch_send_param_msg: {
                    message_elem_array: [{
                        elem_type: 3,
                        text_elem_content: "xxx"
                    }],
                    message_sender: "lexuslin"
                }
            },
            user_data: "123"
        }
        return timRenderInstance.TIMMsgBatchSend(param);
    },
    TIMMsgSearchLocalMessages:() => {
        let param:MsgSearchLocalMessagesParams = {
            params: {
                msg_search_param_keyword_array: ["1"],
                msg_search_param_message_type_array: [3],
                msg_search_param_conv_id: "lexuslin3",
                msg_search_param_conv_type: 1,
                // msg_search_param_search_time_position: 0,
                // msg_search_param_search_time_period: 24*60*60*7,
                // msg_search_param_page_index: 0,
                // msg_search_param_page_size: 100,
            },
            user_data: "123"
        }
        return timRenderInstance.TIMMsgSearchLocalMessages(param);
    },
    func:(...args)=>{
        const [data,user_data] = args;
                console.log(data);
                console.log(user_data);
    },
    TIMAddRecvNewMsgCallback:(callback) => {
        let param : TIMRecvNewMsgCallbackParams = {
            callback: advanceMessageManager.func,
            user_data: "TIMAddRecvNewMsgCallback"
        }
        return timRenderInstance.TIMAddRecvNewMsgCallback(param);
    },
    TIMRemoveRecvNewMsgCallback:(callback) => {
        // return timRenderInstance.TIMRemoveRecvNewMsgCallback({
        //     callback: (...args)=>{
        //         const [[data,user_data]] = args;
        //         callback(JSON.stringify({
        //             data,user_data
        //         }))
        //     },
        //     user_data: "TIMRemoveRecvNewMsgCallback"
        // });
        let param : TIMRecvNewMsgCallbackParams = {
            callback:advanceMessageManager.func,
            user_data: "TIMAddRecvNewMsgCallback"
        }
        return timRenderInstance.TIMRemoveRecvNewMsgCallback(param)
    },
    TIMSetMsgReadedReceiptCallback:(callback) => {
        let param :TIMMsgReadedReceiptCallbackParams = {
            callback: (...args)=>{
                const [data,user_data] = args;
                callback(JSON.stringify({
                    data,user_data
                }))
                
            },
            user_data: "TIMSetMsgReadedReceiptCallback"
        }
        return timRenderInstance.TIMSetMsgReadedReceiptCallback(param);
    },
    TIMSetMsgRevokeCallback:(callback) => {
        let param:TIMMsgRevokeCallbackParams = {
            callback: (...args)=>{
                const [data,user_data] = args;
                callback(JSON.stringify({
                    data,user_data
                }))
                
            },
            user_data: "TIMSetMsgRevokeCallback"
        }
        return timRenderInstance.TIMSetMsgRevokeCallback(param);
    },
    TIMSetMsgElemUploadProgressCallback:(callback) => {
        let param:TIMMsgElemUploadProgressCallbackParams = {
            callback: (...args)=>{
                const [data,user_data] = args;
                callback(JSON.stringify({
                    data,user_data
                }))
                
            },
            user_data: "TIMSetMsgElemUploadProgressCallback"
        }
        return timRenderInstance.TIMSetMsgElemUploadProgressCallback(param);
    },
    TIMSetMsgUpdateCallback:(callback) => {
        let param:TIMMsgUpdateCallbackParams = {
            callback :(...args)=>{
                const [data,user_data] = args;
                var dat = data.toString();
                var user_dat = user_data.toString();
                callback(JSON.stringify({
                    // data,user_data
                    data,user_data
                }))
                
            },
            user_data: "TIMSetMsgUpdateCallback"
        }
        return timRenderInstance.TIMSetMsgUpdateCallback(param);
    },
    TIMMsgSetMessageExtensions:async ()=>{
        var message = await advanceMessageManager.TIMMsgGetMsgList(null);
        let m = message.json_params[1];
        
        m.message_support_message_extension = true;
        let param : TIMMsgSetMessageExtensionsParam = {
            json_msg: m,
            json_extension_array: [{
                message_extension_key:"key",
                message_extension_value:"value"
            }],
            user_data: ""
        }
        return timRenderInstance.TIMMsgSetMessageExtensions(param);
    },
    TIMMsgGetMessageExtensions:async ()=>{
        var message = await advanceMessageManager.TIMMsgGetMsgList(null);
        let m = message.json_params[0];
        let param : TIMMsgGetMessageExtensionsParam = {
            json_msg: m,
            user_data: ""
        }
        return timRenderInstance.TIMMsgGetMessageExtensions(param);
    },
    TIMMsgDeleteMessageExtensions:async ()=>{
        var message = await advanceMessageManager.TIMMsgGetMsgList(null);
        let m = message.json_params[0];
        let param : TIMMsgDeleteMessageExtensionsParam = {
            json_msg: m,
            json_extension_key_array:[{
                message_extension_key:"key",
                message_extension_value:"value"
            }],
            user_data: ""
        }
        return timRenderInstance.TIMMsgGetMessageExtensions(param);
    },
    TIMSetMsgExtensionsChangedCallback: ()=>{
        let param : TIMSetMsgExtensionsChangedCallbackParam = {
            callback:(...args)=>{
                const [message_id,message_extension_array,user_data] = args
                // console.log(message_id,message_extension_array,user_data);
            }
        }
        return timRenderInstance.TIMSetMsgExtensionsChangedCallback(param);
    },
    TIMSetMsgExtensionsDeletedCallback:()=>{
        let param:TIMSetMsgExtensionsDeletedCallbackParam = {
            callback:(...args)=>{
                const [message_id,message_extension_key_array,user_data] = args
            }
        }
        return timRenderInstance.TIMSetMsgExtensionsDeletedCallback(param);
    },
    TIMMsgSetOfflinePushToken:()=>{
        let param:OfflinePushToken={
            param:{
                offline_push_token_type:0
            },
            user_data:""
        }
        return timRenderInstance.TIMMsgSetOfflinePushToken(param);
    }
}

export default advanceMessageManager;
// import { TIMConvType, TIMDownloadType, TIMElemType, TIMReceiveMessageOpt } from "../../../im_electron_sdk/dist/enums";
import TimRender from "../../../im_electron_sdk/dist/renderer";
import { ConvertVoiceToTextParam, Json_value_msg, MsgBatchSendParams, MsgCancelSendParams, MsgClearHistoryMessageParams, MsgDeleteParams, MsgDownloadElemToPathParams, MsgDownloadMergerMessageParams, MsgFindByMsgLocatorListParams, MsgFindMessagesParams, MsgGetC2CReceiveMessageOptParams, MsgGetMsgListParams, MsgImportMsgListParams, MsgListDeleteParams, MsgModifyMessageParams, MsgReportReadedParams, MsgRevokeParams, MsgSaveMsgParams, MsgSearchLocalMessagesParams, MsgSendMessageParamsV2, MsgSendReplyMessage, MsgSetC2CReceiveMessageOptParams, MsgSetGroupReceiveMessageOptParams, OfflinePushToken, SetLocalCustomDataParam, TIMMsgDeleteMessageExtensionsParam, TIMMsgElemUploadProgressCallbackParams, TIMMsgGetMessageExtensionsParam, TIMMsgReadedReceiptCallbackParams, TIMMsgRevokeCallbackParams, TIMMsgSetMessageExtensionsParam, TIMMsgUpdateCallbackParams, TIMRecvNewMsgCallbackParams, TIMSetMsgExtensionsChangedCallbackParam, TIMSetMsgExtensionsDeletedCallbackParam, TranslateTextParam } from "../../../im_electron_sdk/dist/interfaces";


// import TimRender from "im_electron_sdk/dist/renderer";
const timRenderInstance = new TimRender();
let json_msg_param:Json_value_msg = {}
let total = 0;
function _sendMessage(text:string,convId:string){
    console.log(total);
    if(total == 10000){
        return;
    }
    timRenderInstance.TIMMsgSendMessage({
        conv_id: convId,
        conv_type: 1,
        params:{
            message_elem_array: [{
                elem_type: 0,
                text_elem_content:text,
            }],
        }
    }).then(data => {
        var text = `${Date.now()}-${++total}`;
        _sendMessage(text,convId);
    }).catch(err => {
        var text = `${Date.now()}-${++total}`;
        _sendMessage(text,convId);
    })
}
const advanceMessageManager = {

    TIMMsgSendMessage:() => {
        let message = {
            "json_msg_array": "[{\"message_client_time\":1712567719,\"message_cloud_custom_str\":\"{\\\"data\\\":\\\"{}\\\"}\",\"message_conv_id\":\"@TGS#1G4QXDSOBN\",\"message_conv_type\":2,\"message_custom_int\":0,\"message_custom_str\":\"{\\\"type\\\":7,\\\"data\\\":\\\"{\\\\\\\"translateData\\\\\\\":{\\\\\\\"showTranslate\\\\\\\":true,\\\\\\\"translateState\\\\\\\":2,\\\\\\\"translateType\\\\\\\":0,\\\\\\\"languageType\\\\\\\":\\\\\\\"en\\\\\\\",\\\\\\\"translate\\\\\\\":\\\\\\\"6\\\\\\\"}}\\\"}\",\"message_elem_array\":[{\"elem_type\":0,\"text_elem_content\":\"6\"}],\"message_excluded_from_content_moderation\":false,\"message_excluded_from_last_message\":false,\"message_group_receipt_read_count\":0,\"message_group_receipt_unread_count\":-1,\"message_has_sent_receipt\":true,\"message_is_broadcast_message\":false,\"message_is_excluded_from_unread_count\":false,\"message_is_from_self\":false,\"message_is_online_msg\":false,\"message_is_peer_read\":true,\"message_is_read\":true,\"message_msg_id\":\"115766-1712567719-2020214306\",\"message_need_read_receipt\":true,\"message_offline_push_config\":{\"offline_push_config_android_config\":{\"android_offline_push_config_fcm_channel_id\":\"\",\"android_offline_push_config_huawei_category\":\"\",\"android_offline_push_config_notify_mode\":0,\"android_offline_push_config_oppo_channel_id\":\"\",\"android_offline_push_config_sound\":\"\",\"android_offline_push_config_title\":\"\",\"android_offline_push_config_vivo_category\":\"\",\"android_offline_push_config_vivo_classification\":1,\"android_offline_push_config_xiaomi_channel_id\":\"\"},\"offline_push_config_desc\":\"@it003: 6666\",\"offline_push_config_ext\":\"{\\\"type\\\":\\\"im_chat\\\",\\\"info\\\":{\\\"groupId\\\":\\\"@TGS#1G4QXDSOBN\\\"},\\\"deepLink\\\":\\\"phospherus://client/page/message/moveToChat?toAppTabId=6&groupId=%40TGS%231G4QXDSOBN\\\"}\",\"offline_push_config_flag\":0,\"offline_push_config_ios_config\":{\"ios_offline_push_config_ignore_badge\":false,\"ios_offline_push_config_push_type\":0,\"ios_offline_push_config_sound\":\"\",\"ios_offline_push_config_title\":\"\"}},\"message_platform\":0,\"message_priority\":1,\"message_rand\":2020214306,\"message_receipt_peer_read\":false,\"message_revoker_user_id\":\"\",\"message_sender\":\"7c7e7040589d4d3896c2fa3791b6e8cc\",\"message_sender_group_member_info\":{\"group_member_info_custom_info\":[],\"group_member_info_face_url\":\"\",\"group_member_info_friend_remark\":\"\",\"group_member_info_group_id\":\"\",\"group_member_info_identifier\":\"7c7e7040589d4d3896c2fa3791b6e8cc\",\"group_member_info_join_time\":0,\"group_member_info_member_role\":200,\"group_member_info_msg_flag\":0,\"group_member_info_msg_seq\":0,\"group_member_info_name_card\":\"\",\"group_member_info_nick_name\":\"\",\"group_member_info_shutup_time\":0},\"message_sender_profile\":{\"user_profile_face_url\":\"https://superappdev.oss-cn-hangzhou.aliyuncs.com/im/c37b926e0677421f8a4c85c858002b32\",\"user_profile_friend_remark\":\"\",\"user_profile_identifier\":\"7c7e7040589d4d3896c2fa3791b6e8cc\",\"user_profile_nick_name\":\"000\"},\"message_seq\":325,\"message_server_time\":1712567718,\"message_status\":2,\"message_support_message_extension\":false,\"message_unique_id\":1397884585506,\"message_version\":4}]"
        }
        let json_message = JSON.parse(JSON.stringify(message));
        let {message_cloud_custom_str,message_custom_str} = JSON.parse(JSON.stringify(json_message.json_msg_array));
        console.log(message_cloud_custom_str)
        console.log(message_custom_str)
        let customjson = {type:7,"data":{"showTranslate":true,"translateState":2,"translateType":0,"languageType":'en',"translate":'6'}}
        let sendMessage:Json_value_msg = {
            message_elem_array : [{
                elem_type:0,
                text_elem_content:"6"
            }],
            message_conv_id:"@TGS#1CNQDDUML",
            message_conv_type:2,
            message_sender:"10058198",
            message_priority:1,
            message_need_read_receipt:true,
            message_platform:json_message.json_msg_array.message_platform,
            message_cloud_custom_str:"{data:{}}",
            message_custom_int:1,
            message_custom_str:JSON.stringify(JSON.stringify(JSON.stringify(customjson))),
            message_excluded_from_content_moderation:false,
            message_excluded_from_last_message:false,
            
        }
        console.log(json_message);
        console.log(sendMessage);
        let param:MsgSendMessageParamsV2 = {
            conv_id: "@TGS#1CNQDDUML",
            // conv_id: "daisychoi",
            // conv_id: "3e56df7704234f83b195e6b25a5ba665",
            // conv_id: "10058198",
            conv_type: 2,
            params: sendMessage,
            // user_data: "123",
            callback: (data) => {
                // const {code, json_params, desc } = data;
                
                var d = data[0].json_params;
                console.log(d);
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
        // _sendMessage(`start-${total}`,"daisychoi")
        // return new Promise(()=>{});
        
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
                message_msg_id: "",
            },
            callback: (data)=>{
                console.log(data)
            }
        }
        return timRenderInstance.TIMMsgSendReplyMessage(param);
    },
    TIMMsgCancelSend:() => {
        let param:MsgCancelSendParams = {
            conv_id: "lexuslin3",
            conv_type: 1,
            message_id: "",
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
            json_message_id_array: ["144115355158486521-1715331802-2270131316"],
            user_data: "123"
        }
        return timRenderInstance.TIMMsgFindMessages(param);
    },
    TIMMsgReportReaded:() => {
        let param : MsgReportReadedParams = {
            conv_id: "lexuslin3",
            conv_type: 1,
            json_msg_param:json_msg_param,
            user_data: "123"
        }
        return timRenderInstance.TIMMsgReportReaded(param);
    },
    TIMMsgRevoke:() => {
        let param:MsgRevokeParams = {
            conv_id: "lexuslin3",
            conv_type: 1,
            json_msg_param:json_msg_param,
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
    TIMMsgGetMsgList:async (msg) => {
        let param:MsgGetMsgListParams = {
            conv_id: "@TGS#1CNQDDUML",
            // conv_id:"",
            conv_type: 2,
            params: {
                msg_getmsglist_param_last_msg: null,
                msg_getmsglist_param_count: 1,
                msg_getmsglist_param_is_ramble: true,
            },
            user_data: "123"
        }
        let m = await timRenderInstance.TIMMsgGetMsgList(param);
        console.log(m,"message")
        return m;
    },
    TIMMsgDelete:() => {
        let param :MsgDeleteParams = {
            conv_id: "",
            conv_type: 1,
            params: {
                // msg_delete_param_msg: "144115225971632901-1625125460-3998758148",
                msg_delete_param_msg:json_msg_param,
                msg_delete_param_is_ramble: true
            },
            user_data: "123"
        }
        return timRenderInstance.TIMMsgDelete(param);
    },
    TIMMsgListDelete:() => {
        let param : MsgListDeleteParams = {
            conv_id: "",
            conv_type: 1,
            params: [json_msg_param],
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
        // var id = ""; 
        // let param1:MsgFindMessagesParams = {
        //     json_message_id_array: ["144115355158486521-1715331802-2270131316"],
        //     user_data: "123"
        // }
        // timRenderInstance.TIMMsgFindMessages(param1);
        let param:MsgDownloadElemToPathParams = {
            params: {
                msg_download_elem_param_flag:1,
                msg_download_elem_param_id: "1400187352_144115355158486521_c7ac05874ff94a2447f4c363cd1135ae.pdf",
                msg_download_elem_param_url: "https://cos.ap-shanghai.myqcloud.com/f8f0-shanghai-360-sharedv4-01-1303031839/0345-1400187352/c131-MTAwNTgxOTg/c7ac05874ff94a2447f4c363cd1135ae.pdf?im-report-marked",
                
            },
            callback:(code:number,desc:string,json_param:string,userdata)=>{
                console.log("下载进度",code,desc,json_param,userdata);
            },
            path: `/Users/dasiychoi/Documents/work/1400187352_144115355158486521_c7ac05874ff94a2447f4c363cd1135ae.pdf`,
            user_data: "1111111"
        }
        let param2:MsgDownloadElemToPathParams = {
            params: {
                msg_download_elem_param_flag:2,
                msg_download_elem_param_id: "1400187352_144115355158486521_fbe23c81d207d06cc442478e11f193be.mp4",
                msg_download_elem_param_url: "https://cos.ap-shanghai.myqcloud.com/f8f0-shanghai-360-sharedv4-01-1303031839/0345-1400187352/c131-MTAwNTgxOTg/fbe23c81d207d06cc442478e11f193be.mp4?im-report-marked",
                
            },
            callback:(code:number,desc:string,json_param:string,userdata)=>{
                console.log("下载进度",code,desc,json_param,userdata);
            },
            path: `/Users/dasiychoi/Documents/work/1400187352_144115355158486521_fbe23c81d207d06cc442478e11f193be.mp4`,
            user_data: "22222222"
        }
        timRenderInstance.TIMMsgDownloadElemToPath(param2);
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
    TIMMsgSearchCloudMessages:() => {
        let param:MsgSearchLocalMessagesParams = {
            params: {
                msg_search_param_keyword_array: ["1"],
                msg_search_param_message_type_array: [0],
                // msg_search_param_conv_id: "10058198",
                // msg_search_param_conv_type: 1,
                // msg_search_param_search_time_position: 0,
                // msg_search_param_search_time_period: 24*60*60*7,
                // msg_search_param_page_index: 0,
                // msg_search_param_page_size: 100,
            },
            user_data: "123"
        }
        return timRenderInstance.TIMMsgSearchCloudMessages(param);
    },
    func1:(data:string,user_data:string)=>{
        // console.log(args);
        // const [data,user_data] = args;
        total++;
        console.log(`一共收到${total}条消息`)
        console.log(data)
    },
    func2:(...args) =>{
        console.log("in function2");
    },
    TIMAddRecvNewMsgCallback:(callback) => {
        let param : TIMRecvNewMsgCallbackParams = {
            callback: advanceMessageManager.func1,
            user_data: "func1"
        }
        timRenderInstance.TIMAddRecvNewMsgCallback(param);
        let param2 : TIMRecvNewMsgCallbackParams = {
            callback: advanceMessageManager.func2,
            user_data: "TIMAddRecvNewMsgCallback"
        }
        return timRenderInstance.TIMAddRecvNewMsgCallback(param2);
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
            callback:advanceMessageManager.func1,
            user_data: "TIMAddRecvNewMsgCallback"
        }
        return timRenderInstance.TIMRemoveRecvNewMsgCallback()
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
                console.log("uploading")
                console.log(args)
                // const [data,user_data] = args;
                // callback(JSON.stringify({
                //     data,user_data
                // }))
                
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
    },
    TIMMsgTranslateText:()=>{
        let param:TranslateTextParam={
            json_source_text_array:["hello","what"],
            source_language:"auto",
            target_language:"zh"
        }
        return timRenderInstance.TIMMsgTranslateText(param);
    },
    TIMMsgConvertVoiceToText:()=>{
        let param:ConvertVoiceToTextParam={
            url:"https:\/\/cn.imrich.qcloud.com\/download\/43427dc603db3f30d11b276b53bfb543.wav?auth=MZ5a1tyXZ1-2BBrLAsARM5q9s5pmpNz1rI0f0T6w5TBkHSKTHevmxwoKOYS33obK1kPhUeSTm9XQWw_o4LOvL890u4dCszdRO72W2V4t3Pzps-8oURYjnyaITgheVPQGZEnFBrRGgDisqmr-3jvC7rIFtahbtXOBc9QD7kHnzeb9m-mrCZbUaaLzk2IsZ1urAcFnXsiLRQHDwyEMrutimD6BrhUpr1qex-t4T067xQM=",
            language:"zh"
        }
        return timRenderInstance.TIMMsgConvertVoiceToText(param);
    },
    TIMMsgSetLocalCustomData:async()=>{
        var message = await advanceMessageManager.TIMMsgGetMsgList(null);
        let m = message.json_params[0];
        m.message_custom_str = "hello here";
        let param:SetLocalCustomDataParam={
            json_msg_param: m,
            user_data: ""
        }
        return timRenderInstance.TIMMsgSetLocalCustomData(param);
    }
}

export default advanceMessageManager;
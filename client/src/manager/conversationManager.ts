// import { TIMConvType } from "../../../im_electron_sdk/dist/enums";
import TimRender from "../../../im_electron_sdk/dist/renderer";
import { convCancelDraft, convCreate, convDelete, convGetConvInfo, convGetTotalUnreadMessageCount, convPinConversation, convSetDrat, convTotalUnreadMessageCountChangedCallbackParam, getConvList, setConvEventCallback } from "../../../im_electron_sdk/dist/interfaces";
// import TimRender from "im_electron_sdk/dist/renderer";
const timRenderInstance = new TimRender();
const ConversationManager = {
    TIMConvCreate(){
        let param:convCreate={
            convId:"test",
            convType:1,
            userData:'TIMConvCreate',
        }
        return timRenderInstance.TIMConvCreate(param)
    },
    TIMConvDelete(){
        let param:convDelete = {
            convId:"test",
            convType:1,
            userData:'TIMConvDelete',
        }
        return timRenderInstance.TIMConvDelete(param)
    },
    TIMConvGetConvList(){
        let param:getConvList = {
            userData:'22TIMConvGetConvList2',
        }
        return timRenderInstance.TIMConvGetConvList(param)
    },
    TIMConvSetDraft(){
        let param:convSetDrat = {
            convId:"admin",
            convType:2,
            draftParam: {
                draft_edit_time: (Date.now() / 1000) + 60 * 60 * 24, 
                draft_msg: {
                    message_elem_array: [
                        {
                            "elem_type" : 0,
                            "text_elem_content" : "this draft"
                        }
                    ]
                },
                draft_user_define: "",
            },
        }
        return timRenderInstance.TIMConvSetDraft(param)
        
    },
    TIMConvCancelDraft(){
        let param:convCancelDraft={
            convId:"test",
            convType:2,
        }
        return timRenderInstance.TIMConvCancelDraft(param)
    },
    TIMConvGetConvInfo(){
        let param:convGetConvInfo = {
            json_get_conv_list_param:[{
                "get_conversation_list_param_conv_id":'6789',
                "get_conversation_list_param_conv_type": 2
            }],
            user_data:'TIMConvGetConvInfo', 
        }
        return timRenderInstance.TIMConvGetConvInfo(param)
    },
    TIMConvPinConversation(){
        let param:convPinConversation = {
            convId:'6789',
            convType:1,
            isPinned:true,
            user_data:'TIMConvGetConvInfo', 
        }
        return timRenderInstance.TIMConvPinConversation(param)
    },
    TIMConvGetTotalUnreadMessageCount(){
        let param :convGetTotalUnreadMessageCount = {
            user_data:'TIMConvGetTotalUnreadMessageCount', 
        }
        return timRenderInstance.TIMConvGetTotalUnreadMessageCount(param)
    },
    TIMSetConvTotalUnreadMessageCountChangedCallback(callback){
        let param:convTotalUnreadMessageCountChangedCallbackParam={
            user_data:"TIMSetConvTotalUnreadMessageCountChangedCallback",
            callback:(...data)=>{
                callback(JSON.stringify({data}))
            }
        }
        return timRenderInstance.TIMSetConvTotalUnreadMessageCountChangedCallback(param)
    },
    TIMSetConvEventCallback:(callback)=>{
        let param:setConvEventCallback = {
            user_data:"TIMSetConvEventCallback",
            callback:(...data)=>{
                callback(JSON.stringify({data}))
            }
        }
        return timRenderInstance.TIMSetConvEventCallback(param)
    }
}
export default ConversationManager;
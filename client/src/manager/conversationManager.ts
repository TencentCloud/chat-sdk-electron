// import { TIMConvType } from "../../../im_electron_sdk/dist/enums";
import TimRender from "../../../im_electron_sdk/dist/renderer";
import { setConvCustomDataParam,convCancelDraft, convCreate, convDelete, convGetConvInfo, convGetTotalUnreadMessageCount, convPinConversation, convSetDrat, convTotalUnreadMessageCountChangedCallbackParam, createConversationGroupParam, deleteConvGroupParam, getConvGroupList, getConvList, MarkConversationParam, renameConvGroupParam, setConvEventCallback, TIMConversationListFilter, DeleteConvListParam, CleanUnreadMessageCoutParam, convUnreadMessageCountChangedByFilterCallbackParam, convGroupCreatedCallbackParam, convGroupDeletedCallbackParam, convGroupNameChangedCallback } from "../../../im_electron_sdk/dist/interfaces";
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
    TIMConvDeleteConversationList(){
        let param:DeleteConvListParam = {
            conversation_id_array: [
                "c2c_test",
            ],
            clearMessage: false
        }
        return timRenderInstance.TIMConvDeleteConversationList(param)
    },
    TIMConvGetUnreadMessageCountByFilter(){
        let param:TIMConversationListFilter = {
            params: {
                conversation_list_filter_conv_type:null,
                conversation_list_filter_mark_type: 0x1,
                conversation_list_filter_conversation_group: null
            }
        }
        return timRenderInstance.TIMConvGetUnreadMessageCountByFilter(param)
    },
    TIMConvSubscribeUnreadMessageCountByFilter(){
        let param:TIMConversationListFilter = {
            params: {
                conversation_list_filter_conv_type: 1,
                conversation_list_filter_mark_type: 0x1,
                conversation_list_filter_conversation_group: "c2c_im_demo_admin"
            }
        }
        return timRenderInstance.TIMConvSubscribeUnreadMessageCountByFilter(param)
    },
    TIMConvUnsubscribeUnreadMessageCountByFilter(){
        let param:TIMConversationListFilter = {
            params: {
                conversation_list_filter_conv_type: 1,
                conversation_list_filter_mark_type: 0x1,
                conversation_list_filter_conversation_group: "c2c_test"
            }
        }
        return timRenderInstance.TIMConvUnsubscribeUnreadMessageCountByFilter(param)
    },
    TIMConvCleanConversationUnreadMessageCount(){
        let param :CleanUnreadMessageCoutParam = {
            conversation_id: "c2c_test",
            clean_timestamp: 0,
            clean_sequence: 0
        }
        return timRenderInstance.TIMConvCleanConversationUnreadMessageCount(param)
    },
    TIMSetConvUnreadMessageCountChangedByFilterCallback(){
        let param:convUnreadMessageCountChangedByFilterCallbackParam = {
            user_data:"",
            callback:(...args)=>{
                console.log(args)
            }
        }
        return timRenderInstance.TIMSetConvUnreadMessageCountChangedByFilterCallback(param)
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
                "get_conversation_list_param_conv_id":'10058198',
                "get_conversation_list_param_conv_type": 1
            }],
            user_data:'TIMConvGetConvInfo', 
        }
        return timRenderInstance.TIMConvGetConvInfo(param)
    },
    TIMConvPinConversation(){
        let param:convPinConversation = {
            convId:'10058198',
            convType:1,
            isPinned:true,
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
    },
    TIMConvGetConversationListByFilter(){
        let param :TIMConversationListFilter = {
            params:{
                conversation_list_filter_conv_type:1,
                conversation_list_filter_next_seq:0,
                conversation_list_filter_count:20,
                conversation_list_filter_conversation_group:"hello"
            },
            user_data:""
        }
        return timRenderInstance.TIMConvGetConversationListByFilter(param)
    },
    TIMConvMarkConversation(){
        let param:MarkConversationParam = {
            conversation_id_array:["c2c_im_demo_admin"],
            mark_type:0x1,
            enable_mark:true
        }
        return timRenderInstance.TIMConvMarkConversation(param);
    },
    TIMConvCreateConversationGroup(){
        let param:createConversationGroupParam={
            group_name:"hello",
            conversation_id_array:["group_@TGS#172OQIUIO"],
        }
        return timRenderInstance.TIMConvCreateConversationGroup(param);
    },
    TIMConvGetConversationGroupList(){
        let param:getConvGroupList={
            user_data:""
        }
        return timRenderInstance.TIMConvGetConversationGroupList(param);
    },
    TIMConvDeleteConversationGroup(){
        let param:deleteConvGroupParam={
            group_name:"byebye"
        }
        return timRenderInstance.TIMConvDeleteConversationGroup(param);
    },
    TIMConvRenameConversationGroup(){
        let param:renameConvGroupParam={
            old_name:"hello",
            new_name:"byebye"
        }
        return timRenderInstance.TIMConvRenameConversationGroup(param);
    },
    TIMConvAddConversationsToGroup(){
        let param:createConversationGroupParam={
            group_name:"hello",
            conversation_id_array:["c2c_100058198"],
            user_data:"1"
        }
        return timRenderInstance.TIMConvAddConversationsToGroup(param);
    },
    TIMConvDeleteConversationsFromGroup(){
        let param:createConversationGroupParam={
            group_name:"hello",
            conversation_id_array:["group_@TGS#2B6MQRSHD"],
        }
        return timRenderInstance.TIMConvDeleteConversationsFromGroup(param);
    },
    TIMConvSetConversationCustomData(){
        let param:setConvCustomDataParam={
            conversation_id_array: ["group_@TGS#2B6MQRSHD"],
            custom_data: "nihao"
        }
        return timRenderInstance.TIMConvSetConversationCustomData(param);
    },
    TIMSetConvConversationGroupCreatedCallback(){
        let param:convGroupCreatedCallbackParam = {
            callback:(...args) => {
                console.log(args)
                console.log("conversationGroupCreated")
            }
        }
        return timRenderInstance.TIMSetConvConversationGroupCreatedCallback(param)
    },
    TIMSetConvConversationGroupDeletedCallback(){
        let param :convGroupDeletedCallbackParam = {
            callback:(...args) => {
                console.log(args)
            }
        }
        return timRenderInstance.TIMSetConvConversationGroupDeletedCallback(param)
    },
    TIMSetConvConversationGroupNameChangedCallback(){
        let param : convGroupNameChangedCallback = {
            callback:(...args) => {
                console.log(args)
            }
        }
        return timRenderInstance.TIMSetConvConversationGroupNameChangedCallback(param)
    },
    TIMSetConvConversationsAddedToGroupCallback(){
        let param : convGroupCreatedCallbackParam = {
            callback:(...args) => {
                console.log(args)
            }
        }
        return timRenderInstance.TIMSetConvConversationsAddedToGroupCallback(param)
    },
    TIMSetConvConversationsDeletedFromGroupCallback(){
        let param : convGroupCreatedCallbackParam = {
            callback:(...args) => {
                console.log(args)
            }
        }
        return timRenderInstance.TIMSetConvConversationsDeletedFromGroupCallback(param);
    }
}
export default ConversationManager;
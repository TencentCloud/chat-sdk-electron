import TimRender from "../../../im_electron_sdk/dist/renderer";
import { CreateGroupParams, CreateTopicParam, DeleteAttributeParams, DeleteGroupParams, DeleteMemberParams, DeleteTopicParam, GetCommunityListParam, GetGroupCounterParams, GetGroupListParams, GetGroupMemberInfoParams, GetOnlineMemberCountParams, GetPendencyListParams, GroupAttributeCallbackParams, GroupCounterChangedParam, GroupCounterParams, GroupSearchParams, GroupTipsCallbackParams, GroupTopicInfo, HandlePendencyParams, IncreaseGroupCounterParam, InitGroupAttributeParams, InviteMemberParams, JoinGroupParams, ModifyGroupParams, ModifyMemberInfoParams, MsgGetGroupMessageReadMembersParam, MsgGetGroupMessageReceiptsParam, MsgGetMsgListParams, MsgSendGroupMessageReceiptsParam, QuitGroupParams, ReportParams, ReportPendencyReadedParams, SearchGroupParams, SearchMemberParams, SetTopicInfoParam, TopicCreatedParam } from "../../../im_electron_sdk/dist/interfaces";
// import TimRender from "im_electron_sdk/dist/renderer";
const timRenderInstance = new TimRender();
const TimBaseManager = {
  TIMGroupCreate: () => {
    let obj:CreateGroupParams={
      params:
      {
        create_group_param_add_option: 2,
        create_group_param_group_name: "communityGroup",
        create_group_param_group_type: 5,
        create_group_param_is_support_topic:true
        // create_group_param_custom_info: [{
        //   group_info_custom_string_info_key: 'group_info',
        //   group_info_custom_string_info_value: 'test value 1'
        // },
        // {
        //   group_info_custom_string_info_key: 'custom_public',
        //   group_info_custom_string_info_value: 'custom public value'
        // }],
        // "create_group_param_face_url": "",
        // create_group_param_group_member_array: [{ 
        //   group_member_info_member_role: "3", 
        //   group_member_info_identifier: "daisy" }],
        // "create_group_param_introduction": "12312",
        // "create_group_param_notification": "121212"
      },
      data: "ssss"
    }
    let a = timRenderInstance.TIMGroupCreate(obj);
    console.log("a"+JSON.stringify(a));
    return a;
    // return timRenderInstance.TIMGroupCreate(obj);
  },
  TIMGroupDelete: (groupId) => {
    let obj:DeleteGroupParams = {
      groupId:"@TGS#_@TGS#c5KIRIIM62C2",
      data: "ssss"
    }
    return timRenderInstance.TIMGroupDelete(obj);
  },
  async TIMMsgSendMessageReadReceipts(){
    let obj1 : MsgGetMsgListParams = {
      // conv_id: "@TGS#14Q5ONCJC",
      conv_id: "@TGS#1DS5WDSOBM",
         conv_type: 2,
         params: {
            //  msg_getmsglist_param_last_msg:"",
             msg_getmsglist_param_count:1
         }
    }
    const data = await timRenderInstance.TIMMsgGetMsgList(obj1)
    var d = {};
    // if(data.json_params!==undefined){
    //   d = JSON.parse(data.json_params as unknown as string);
    let obj : MsgSendGroupMessageReceiptsParam = {
      json_msg_array: JSON.stringify([
        data.json_params[0] 
      ]),
      user_data: ""
    }
    return timRenderInstance.TIMMsgSendMessageReadReceipts(obj); 
   },
   TIMGroupSetGroupCounters(){
    let param:GroupCounterParams = {
      params:{
        group_id:"@TGS#172OQIUIO",
        json_group_counter_array:[{
          group_counter_key:"key",
          group_counter_value:2
        }]
      }
    }
    return timRenderInstance.TIMGroupSetGroupCounters(param)
   },
   TIMGroupGetGroupCounters(){
    let param:GetGroupCounterParams = {
      group_id:"@TGS#172OQIUIO",
      json_group_counter_key_array:["key"]
    }
    return timRenderInstance.TIMGroupGetGroupCounters(param)
   },
   TIMGroupIncreaseGroupCounter(){
    let param:IncreaseGroupCounterParam ={
      group_id: "@TGS#172OQIUIO",
      group_counter_key: "key",
      group_counter_value: 3
    }
    return timRenderInstance.TIMGroupIncreaseGroupCounter(param)
   },
   TIMGroupDecreaseGroupCounter(){
    let param:IncreaseGroupCounterParam ={
      group_id: "@TGS#172OQIUIO",
      group_counter_key: "key",
      group_counter_value: 3
    }
    return timRenderInstance.TIMGroupDecreaseGroupCounter(param)
   },
   async TIMMsgGetMessageReadReceipts(){
    let obj1 : MsgGetMsgListParams = {
      // conv_id: "@TGS#14Q5ONCJC",
      conv_id: "@TGS#1CNQDDUML",
       conv_type: 2,
       params: {
          //  msg_getmsglist_param_last_msg: "",
           msg_getmsglist_param_count: 1,
           msg_getmsglist_param_is_ramble: true,
       }
    }
    const data = await timRenderInstance.TIMMsgGetMsgList(obj1)
    console.log(data);
    let obj :MsgGetGroupMessageReceiptsParam ={
      json_msg_array:JSON.stringify(data.json_params),
       user_data:"12"
    }
     return timRenderInstance.TIMMsgGetMessageReadReceipts(obj); 
   },

   async TIMMsgGetGroupMessageReadMemberList(){
    let obj1 : MsgGetMsgListParams = {
      // conv_id: "@TGS#14Q5ONCJC",
      conv_id: "@TGS#1KVCFG3IL",
       conv_type: 2,
       params: {
          //  msg_getmsglist_param_last_msg: "",
           msg_getmsglist_param_count: 100
       }
    }
     const data = await timRenderInstance.TIMMsgGetMsgList(obj1)
   const arr = data.json_params;
   console.log(arr[0])
  //  arr[0].message_need_read_receipt = true;
   let obj:MsgGetGroupMessageReadMembersParam = {
     json_msg: JSON.stringify(arr[0]),
     filter: 1,
     next_seq: "0",
     count: 2,
     user_data: ""
   }
     return timRenderInstance.TIMMsgGetGroupMessageReadMemberList(obj); 
     
   },
   
  TIMGroupGetJoinedGroupList: () => {
    return timRenderInstance.TIMGroupGetJoinedGroupList();
  },
  TIMGroupGetGroupInfoList: () => {
    let param : GetGroupListParams = {
      groupIds: ["@TGS#1M456E6IM"],
      data: 'test data'
    }
    return timRenderInstance.TIMGroupGetGroupInfoList(param)
  },
  TIMGroupModifyGroupInfo: (groupid) => {
    let param : ModifyGroupParams = {
      params: {
        // group_modify_info_param_group_id: "@TGS#a5X7C5HH2",
        group_modify_info_param_group_id: groupid,
        group_modify_info_param_notification: "群公告",
        group_modify_info_param_modify_flag: 0x01<<1,
      },
      data: 'test data'
    }
    return timRenderInstance.TIMGroupModifyGroupInfo(param)
  },
  TIMGroupGetMemberInfoList: (id,seq) => {
    let param : GetGroupMemberInfoParams= {
      params: {
        group_get_members_info_list_param_group_id: "@TGS#2NDXSQQMN",
        group_get_members_info_list_param_next_seq:0,
      }
    }
    return timRenderInstance.TIMGroupGetMemberInfoList(param)
  },
  TIMGroupModifyMemberInfo: () => {
    let param : ModifyMemberInfoParams = {
      params: {
        group_modify_member_info_group_id: "@TGS#1UHQ3OKHC",
        group_modify_member_info_identifier: '109442',
        group_modify_member_info_modify_flag: 8,
        group_modify_member_info_name_card: 'Modified Name card 1111'
      },
      data: 'test data'
    }
    return timRenderInstance.TIMGroupModifyMemberInfo(param)
  },
  TIMGroupGetPendencyList: () => {
    let param : GetPendencyListParams = {
      params: {
        group_pendency_option_start_time: 0,
        group_pendency_option_max_limited: 0,
      },
      data: 'test data'
    }
    return timRenderInstance.TIMGroupGetPendencyList(param)
  },
  TIMGroupReportPendencyReaded: () => {
    let param : ReportParams = {
      timeStamp: 0,
      data: 'test data'
    }
    return timRenderInstance.TIMGroupReportPendencyReaded(param)
  },
  // 之前有报错 -3 ：invalid json
  TIMGroupHandlePendency: () => {
    let param :HandlePendencyParams = {
      params: {
        // startTime: 0,
        // maxLimited: 0,
        group_handle_pendency_param_pendency:{
          group_pendency_group_id:"@TGS#1UHQ3OKHC",
          group_pendency_add_time:0,
          group_pendency_apply_invite_msg:"",
          group_pendency_approval_msg:"",
          group_pendency_authentication:"",
          group_pendency_form_identifier:"",
          group_pendency_form_user_defined_data:"",
          group_pendency_handle_result:0,
          group_pendency_handled:0,
          group_pendency_key:"",
          group_pendency_pendency_type:0,
          group_pendency_self_identifier:"",
          group_pendency_to_identifier:"",
          group_pendency_to_user_defined_data:""
        }
      },
      data: 'test data'
    }
    return timRenderInstance.TIMGroupHandlePendency(param)
  },
  TIMGroupInitGroupAttributes: (groupId) => {
    let param : InitGroupAttributeParams = {
      groupId,
      attributes: [{
        group_attribute_key: 'attribute1',
        group_attribute_value: 'hello'
      }],
      data: 'test data'
    }
    return timRenderInstance.TIMGroupInitGroupAttributes(param)
  },
  TIMGroupSetGroupAttributes: (groupId) => {
    let param : InitGroupAttributeParams = {
      groupId,
      attributes: [{
        group_attribute_key: 'attribute2',
        group_attribute_value: 'hello22'
      }],
      data: 'test data'
    }
    return timRenderInstance.TIMGroupSetGroupAttributes(param)
  },
  TIMGroupDeleteGroupAttributes: (groupId) => {
    let param : DeleteAttributeParams = {
      groupId,
      attributesKey: ["attribute1"],
      data: 'test data'
    }
    return timRenderInstance.TIMGroupDeleteGroupAttributes(param)
  },
  TIMGroupGetGroupAttributes: (groupId) => {
    let param : DeleteAttributeParams = {
      groupId,
      attributesKey: ["attribute1"],
      data: 'test data'
    }
    return timRenderInstance.TIMGroupGetGroupAttributes(param)
  },
  TIMSetGroupAttributeChangedCallback: (cbk) => {
    let param : GroupAttributeCallbackParams = {
      callback: (...args) => {
        const [data, user_data] = args;
        cbk(JSON.stringify({
          data, user_data
        }))
      },
      data: 'test data'
    }
    return timRenderInstance.TIMSetGroupAttributeChangedCallback(param)
  },
  TIMGroupJoin: () => {
    let param : JoinGroupParams = {
      groupId: '@TGS#_@TGS#cCVFSIIM62CS',
      helloMsg: 'hello',
      data: ''
    }
    return timRenderInstance.TIMGroupJoin(param)
  },
  TIMGroupQuit: () => {
    let param : QuitGroupParams = {
      groupId: '@TGS#1UEDUNNHW',
      data: 'test data'
    }
    return timRenderInstance.TIMGroupQuit(param)
  },
  TIMGroupGetOnlineMemberCount: () => {
    let param : GetOnlineMemberCountParams = {
      groupId: '@TGS#a4LPQ6HHW',
      data: 'test data'
    }
    return timRenderInstance.TIMGroupGetOnlineMemberCount(param)
  },
  TIMGroupSearchGroups: () => {
    let search:GroupSearchParams = {
      group_search_params_keyword_list: ['Unity世界'],
      group_search_params_field_list: [0x01,0x01<<1]
    }
    let param : SearchGroupParams={
      searchParams: search,
      data: 'test data'
    }
    return timRenderInstance.TIMGroupSearchGroups(param)
  },
  TIMGroupSearchGroupMembers: () => {
    let param : SearchMemberParams = {
      searchParams: {
        group_search_member_params_groupid_list: ['@TGS#1CT'],
        group_search_member_params_keyword_list: ['327'],
        group_search_member_params_field_list: [1,2,4,8]
      },
      data: 'test data'
    }
    return timRenderInstance.TIMGroupSearchGroupMembers(param)
  },
  TIMGroupInviteMember: () => {
    let param : InviteMemberParams = {
      params: {
        group_invite_member_param_group_id: "@TGS#1I2TQ6HHE",
        group_invite_member_param_identifier_array: ['940928'],
      },
      data: 'test data'
    }
    return timRenderInstance.TIMGroupInviteMember(param)
  },
  TIMGroupDeleteMember: () => {
    let param : DeleteMemberParams ={
      params: {
        group_delete_member_param_group_id: "@TGS#1I2TQ6HHE",
        group_delete_member_param_identifier_array: ['940928'],
      },
      data: 'test data'
    }
    return timRenderInstance.TIMGroupDeleteMember(param)
  },
  TIMSetGroupTipsEventCallback: (cbk) => {
    let param:GroupTipsCallbackParams = {
      callback: (...args) => {
        const [data, user_data] = args;
        cbk(JSON.stringify({
          data, user_data
        }))
      },
      data: 'test data'
    }
    return timRenderInstance.TIMSetGroupTipsEventCallback(param)
  },
  TIMGroupGetJoinedCommunityList:() => {
    let param:GetCommunityListParam = {
      user_data:"a"
    }
    return timRenderInstance.TIMGroupGetJoinedCommunityList(param)
  },
  TIMGroupCreateTopicInCommunity:() => {
    let info:GroupTopicInfo = {
      group_topic_info_topic_id: "@TGS#_@TGS#cHICHIIM62C3@TOPIC#_topic12",
      group_topic_info_topic_name: "topic1"
    }
    let param :CreateTopicParam = {
      group_id: "@TGS#_@TGS#cHICHIIM62C3",
      json_topic_info: info
    }
    return timRenderInstance.TIMGroupCreateTopicInCommunity(param)
  },
  TIMGroupDeleteTopicFromCommunity:()=>{
    let param:DeleteTopicParam = {
      group_id: "@TGS#_@TGS#cHICHIIM62C3",
      json_topic_id_array: ["@TGS#_@TGS#cHICHIIM62C3@TOPIC#_topic12"]
    }
    return timRenderInstance.TIMGroupDeleteTopicFromCommunity(param)
  },
  TIMGroupSetTopicInfo:()=>{
    let info:GroupTopicInfo = {
      group_topic_info_topic_id: "@TGS#_@TGS#cHICHIIM62C3@TOPIC#_topic12",
      group_topic_info_topic_name: "topic2",
      group_modify_info_param_modify_flag:0x01
    }
    let param:SetTopicInfoParam = {
      json_topic_info:info
    }
    return timRenderInstance.TIMGroupSetTopicInfo(param)
  },
  TIMGroupGetTopicInfoList:()=>{
    let param:DeleteTopicParam = {
      group_id: "@TGS#_@TGS#cHICHIIM62C3",
      json_topic_id_array: ["@TGS#_@TGS#cHICHIIM62C3@TOPIC#_topic12"]
    }
    return timRenderInstance.TIMGroupGetTopicInfoList(param)
  },
  TIMSetGroupCounterChangedCallback:()=>{
    let param:GroupCounterChangedParam = {
      callback:(...args)=>{
        console.log(args);
      }
    }
    return timRenderInstance.TIMSetGroupCounterChangedCallback(param);
  },
  TIMSetGroupTopicCreatedCallback:()=>{
    let param:TopicCreatedParam={
      callback:(...args)=>{
        console.log("topiccreated");
        console.log(args);
      }
    }
    return timRenderInstance.TIMSetGroupTopicCreatedCallback(param);
  }
}

export default TimBaseManager;
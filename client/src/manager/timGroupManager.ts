import TimRender from "../../../im_electron_sdk/dist/renderer";
import { CreateGroupParams, DeleteAttributeParams, DeleteGroupParams, DeleteMemberParams, GetGroupListParams, GetGroupMemberInfoParams, GetOnlineMemberCountParams, GetPendencyListParams, GroupAttributeCallbackParams, GroupTipsCallbackParams, HandlePendencyParams, InitGroupAttributeParams, InviteMemberParams, JoinGroupParams, ModifyGroupParams, ModifyMemberInfoParams, MsgGetGroupMessageReadMembersParam, MsgGetGroupMessageReceiptsParam, MsgGetMsgListParams, MsgSendGroupMessageReceiptsParam, QuitGroupParams, ReportParams, ReportPendencyReadedParams, SearchGroupParams, SearchMemberParams } from "../../../im_electron_sdk/dist/interfaces";
// import TimRender from "im_electron_sdk/dist/renderer";
const timRenderInstance = new TimRender();
const TimBaseManager = {
  TIMGroupCreate: () => {
    let obj:CreateGroupParams={
      params:
      {
        create_group_param_add_option: 2,
        create_group_param_group_name: "FFFFFFF",
        create_group_param_group_type: 1,
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
    return timRenderInstance.TIMGroupCreate(obj);
  },
  TIMGroupDelete: (groupId) => {
    let obj:DeleteGroupParams = {
      groupId,
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
   async TIMMsgGetMessageReadReceipts(){
    let obj1 : MsgGetMsgListParams = {
      // conv_id: "@TGS#14Q5ONCJC",
      conv_id: "@TGS#1DS5WDSOBM",
       conv_type: 2,
       params: {
          //  msg_getmsglist_param_last_msg: "",
           msg_getmsglist_param_count: 1,
           msg_getmsglist_param_is_remble: true,
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
      conv_id: "@TGS#1DS5WDSOBM",
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
      groupIds: ["@TGS#14Q5ONCJC"],
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
        group_get_members_info_list_param_group_id: "@TGS#_im_discuss_6iQBFthZWrmRdcYS",
        group_get_members_info_list_param_next_seq: seq,
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
        group_atrribute_key: 'attribute1',
        group_atrribute_value: 'hello'
      }],
      data: 'test data'
    }
    return timRenderInstance.TIMGroupInitGroupAttributes(param)
  },
  TIMGroupSetGroupAttributes: (groupId) => {
    let param : InitGroupAttributeParams = {
      groupId,
      attributes: [{
        group_atrribute_key: 'attribute2',
        group_atrribute_value: 'hello22'
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
      groupId: '@TGS#2WPDHLWH6',
      helloMsg: 'hello',
      data: 'test data'
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
    let param : SearchGroupParams={
      searchParams: {
        group_search_params_keyword_list: ['test'],
        group_search_params_field_list: [2]
      },
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
  }
}

export default TimBaseManager;
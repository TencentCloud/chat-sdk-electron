import ConversationManager from "./manager/conversationManager";
import TimBaseManager from "./manager/timBaseManager";
import TimGroupManager from "./manager/timGroupManager";
import TimFriendshipManager from "./manager/friendshipManager";
import TimAdvanceMessageManager from "./manager/advanceMessageManager";
import { ipcRenderer } from "electron";

let createdGroupId;
let seq = {
    group_get_memeber_info_list_result_next_seq: 0
};
let users = [];
let msg = null;
const APIS = [
    {
        manager: "timBaseManager",
        method: [
            {
                name: "创建窗口",
                action: (callback) => {
                    ipcRenderer.send("create_window")
                }
            },
            {
                name: "callExperimentalAPI",
                action: (callback) => {


                    TimBaseManager.callExperimentalAPI().then((...args)=>{
                        callback(JSON.stringify(args))
                    }).catch((err)=>{
                        callback(err.toString())
                    })
                    // .then(data=>{
                    //     callback(JSON.stringify(data))
                    // }).catch(err=>{
                    //     callback(err.toString())
                    // })
                }
            },
            {
                name: "TIMInit",
                action: (callback) => {
                    TimBaseManager.TIMInit().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMLogin",
                action: (callback) => {
                        TimBaseManager.TIMLogin().then(data => {
                            callback(JSON.stringify(data))
                        }).catch(err => {
                            callback(err.toString())
                        })

                }
            },
            {
                name: "TIMUninit",
                action: (callback) => {
                    TimBaseManager.TIMUninit().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMInvite",
                action: (callback) => {
                    TimBaseManager.TIMInvite().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMInviteInGroup",
                action: (callback) => {
                    TimBaseManager.TIMInviteInGroup().then(data => {
                        console.log(data,113212)
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        console.log(err)
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMSetSelfInfoUpdatedCallback",
                action: (callback) => {
                    TimBaseManager.TIMSetSelfInfoUpdatedCallback().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        console.log(err)
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMSetUserStatusChangedCallback",
                action: (callback) => {
                    TimBaseManager.TIMSetUserStatusChangedCallback().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        console.log(err)
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMOnInvited",
                action: (callback) => {
                    TimBaseManager.TIMOnInvited().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMOnTimeout",
                action: (callback) => {
                    TimBaseManager.TIMOnTimeout().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMOnRejected",
                action: (callback) => {
                    TimBaseManager.TIMOnRejected().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMOnAccepted",
                action: (callback) => {
                    TimBaseManager.TIMOnAccepted().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMOnCanceled",
                action: (callback) => {
                    TimBaseManager.TIMOnCanceled().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMGetServerTime",
                action: (callback) => {
                    TimBaseManager.TIMGetServerTime().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMGetSDKVersion",
                action: (callback) => {
                    TimBaseManager.TIMGetSDKVersion().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMLogout",
                action: (callback) => {
                    TimBaseManager.TIMLogout().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMGetLoginStatus",
                action: (callback) => {
                    TimBaseManager.TIMGetLoginStatus().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMGetLoginUserID",
                action: (callback) => {
                    // for(let i = 0;i<10;i++){
                        TimBaseManager.TIMGetLoginUserID().then(data => {
                            callback(JSON.stringify(data))
                        }).catch(err => {
                            callback(err.toString())
                        })
                    // }
                }
            },
            {
                name: "TIMSetNetworkStatusListenerCallback",
                action: (callback) => {
                    TimBaseManager.TIMSetNetworkStatusListenerCallback().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name:"TIMSetKickedOfflineCallback",
                action:(callback)=>{
                    TimBaseManager.TIMSetKickedOfflineCallback().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err.toString())
                    })
                }
            },
            {
                name:"TIMSetUserSigExpiredCallback",
                action:(callback)=>{
                    TimBaseManager.TIMSetUserSigExpiredCallback().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err.toString())
                    })
                }
            },
            {
                name:"TIMProfileGetUserProfileList",
                action:(callback)=>{
                    TimBaseManager.TIMProfileGetUserProfileList().then(data=>{
                        console.log(data);
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err.toString())
                    })
                }
            },
            {
                name:"TIMProfileModifySelfUserProfile",
                action:(callback)=>{
                    TimBaseManager.TIMProfileModifySelfUserProfile().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err.toString())
                    })
                }
            },
            {
                name:"TIMGetUserStatus",
                action:(callback)=>{
                    TimBaseManager.TIMGetUserStatus().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err.toString())
                    })
                }
            },
            {
                name:"TIMSetSelfStatus",
                action:(callback)=>{
                    TimBaseManager.TIMSetSelfStatus().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err.toString())
                    })
                }
            },
            {
                name:"TIMSubscribeUserStatus",
                action:(callback)=>{
                    TimBaseManager.TIMSubscribeUserStatus().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err.toString())
                    })
                }
            },
            {
                name:"TIMUnsubscribeUserStatus",
                action:(callback)=>{
                    TimBaseManager.TIMUnsubscribeUserStatus().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err.toString())
                    })
                }
            },
        ]
    },
    {
        manager: 'conversationManager',
        method: [
            {
                name:"TIMConvCreate",
                action:(callback)=>{
                    ConversationManager.TIMConvCreate().then(data=>{
                        console.log(data);
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err.toString())
                    })
                }
            },
            {
                name:"TIMConvDelete",
                action:(callback)=>{
                    ConversationManager.TIMConvDelete().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err.toString())
                    })
                }
            },
            {
                name:"TIMConvSetDraft",
                action:(callback)=>{
                    ConversationManager.TIMConvSetDraft().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err.toString())
                    })
                }
            },
            {
                name:"TIMConvGetConvList",
                action:(callback)=>{
                    // for(let i = 0;i<100;i++){
                        ConversationManager.TIMConvGetConvList().then(data=>{
                            console.log(data)
                            callback(JSON.stringify(data))
                        }).catch(err=>{
                            callback(err.toString())
                        })
                    // }
                    // for(let i = 0;i<30;i++){
                    //     TimGroupManager.TIMGroupGetJoinedGroupList().then(data => {
                    //         console.log('hehehe')
                    //         callback(JSON.stringify(data))
                    //     }).catch(err => {
                    //         callback(err.toString())
                    //     })
                    // }
                    // for(let i = 0;i<30;i++){
                    //     ConversationManager.TIMConvGetConvInfo().then(data=>{
                    //         console.log('asdsa')
                    //         callback(JSON.stringify(data))
                    //     }).catch(err=>{
                    //         callback(err.toString())
                    //     })
                    // }
                }
            },
            {
                name:"TIMConvSetDraft",
                action:(callback)=>{
                    ConversationManager.TIMConvSetDraft().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err.toString())
                    })
                }
            },
            {
                name:"TIMConvCancelDraft",
                action:(callback)=>{
                    ConversationManager.TIMConvCancelDraft().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err.toString())
                    })
                }
            },
            {
                name:"TIMConvGetConvInfo",
                action:(callback)=>{
                    ConversationManager.TIMConvGetConvInfo().then(data=>{
                        console.log(data);
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err.toString())
                    })
                }
            },
            {
                name:"TIMConvPinConversation",
                action:(callback)=>{
                    ConversationManager.TIMConvPinConversation().then(data=>{
                        console.log(data);
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err.toString())
                    })
                }
            },
            {
                name:"TIMConvGetTotalUnreadMessageCount",
                action:(callback)=>{
                    ConversationManager.TIMConvGetTotalUnreadMessageCount().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err.toString())
                    })
                }
            },
            {
                name:"TIMSetConvTotalUnreadMessageCountChangedCallback",
                action:(callback)=>{
                    ConversationManager.TIMSetConvTotalUnreadMessageCountChangedCallback(callback).then(data=>{
                        console.log(data)
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err.toString())
                    })
                }
            },
            {
                name:"TIMSetConvEventCallback",
                action:(callback)=>{
                    ConversationManager.TIMSetConvEventCallback(callback).then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback('12312')
                    })
                }
            },
            {
                name:"TIMConvGetConversationListByFilter",
                action:(callback)=>{
                    ConversationManager.TIMConvGetConversationListByFilter().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err)
                    })
                }
            },
            {
                name:"TIMConvMarkConversation",
                action:(callback)=>{
                    ConversationManager.TIMConvMarkConversation().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err)
                    })
                }
            },
            {
                name:"TIMConvCreateConversationGroup",
                action:(callback)=>{
                    ConversationManager.TIMConvCreateConversationGroup().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err)
                    })
                }
            },
            {
                name:"TIMConvGetConversationGroupList",
                action:(callback)=>{
                    ConversationManager.TIMConvGetConversationGroupList().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err)
                    })
                }
            },
            {
                name:"TIMConvDeleteConversationGroup",
                action:(callback)=>{
                    ConversationManager.TIMConvDeleteConversationGroup().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err)
                    })
                }
            },
            {
                name:"TIMConvRenameConversationGroup",
                action:(callback)=>{
                    ConversationManager.TIMConvRenameConversationGroup().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err)
                    })
                }
            },
            {
                name:"TIMConvAddConversationsToGroup",
                action:(callback)=>{
                    ConversationManager.TIMConvAddConversationsToGroup().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err)
                    })
                }
            },
            {
                name:"TIMConvDeleteConversationsFromGroup",
                action:(callback)=>{
                    ConversationManager.TIMConvDeleteConversationsFromGroup().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err)
                    })
                }
            },
            {
                name:"TIMConvSetConversationCustomData",
                action:(callback)=>{
                    ConversationManager.TIMConvSetConversationCustomData().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err)
                    })
                }
            },
            {
                name:"TIMConvDeleteConversationList",
                action:(callback)=>{
                    ConversationManager.TIMConvDeleteConversationList().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err)
                    })
                }
            },
            {
                name:"TIMConvGetUnreadMessageCountByFilter",
                action:(callback)=>{
                    ConversationManager.TIMConvGetUnreadMessageCountByFilter().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err)
                    })
                }
            },
            {
                name:"TIMConvSubscribeUnreadMessageCountByFilter",
                action:(callback)=>{
                    ConversationManager.TIMConvSubscribeUnreadMessageCountByFilter().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err)
                    })
                }
            },
            {
                name:"TIMConvUnsubscribeUnreadMessageCountByFilter",
                action:(callback)=>{
                    ConversationManager.TIMConvUnsubscribeUnreadMessageCountByFilter().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err)
                    })
                }
            },
            {
                name:"TIMConvCleanConversationUnreadMessageCount",
                action:(callback)=>{
                    ConversationManager.TIMConvCleanConversationUnreadMessageCount().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err)
                    })
                }
            },
            {
                name:"TIMSetConvConversationGroupCreatedCallback",
                action:(callback)=>{
                    ConversationManager.TIMSetConvConversationGroupCreatedCallback().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err)
                    })
                }
            },
            {
                name:"TIMSetConvConversationGroupDeletedCallback",
                action:(callback)=>{
                    ConversationManager.TIMSetConvConversationGroupDeletedCallback().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err)
                    })
                }
            },
            {
                name:"TIMSetConvConversationGroupNameChangedCallback",
                action:(callback)=>{
                    ConversationManager.TIMSetConvConversationGroupNameChangedCallback().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err)
                    })
                }
            },
            {
                name:"TIMSetConvConversationsAddedToGroupCallback",
                action:(callback)=>{
                    ConversationManager.TIMSetConvConversationsAddedToGroupCallback().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err)
                    })
                }
            },
            {
                name:"TIMSetConvConversationsDeletedFromGroupCallback",
                action:(callback)=>{
                    ConversationManager.TIMSetConvConversationsDeletedFromGroupCallback().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err)
                    })
                }
            },
        ]
    },
    {
        manager: "groupManager",
        method: [
            {
                name: "TIMMsgSendMessageReadReceipts",
                action: (callback) => {
                //    for(let i = 0;i<100;i++){
                    //    var obj= {};
                       
                    //    setTimeout(()=>{
                        TimGroupManager.TIMMsgSendMessageReadReceipts().then(res => {
                            callback(JSON.stringify(res))
                        }).catch(err => {
                            callback(err.toString())
                        })
                    // },i*500)
                //    }
                }
            },
            {
                name: "TIMMsgGetMessageReadReceipts",
                action: (callback) => {
                    TimGroupManager.TIMMsgGetMessageReadReceipts().then(res => {
                        
                        callback(JSON.stringify(res))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMMsgGetGroupMessageReadMemberList",
                action: (callback) => {
                    TimGroupManager.TIMMsgGetGroupMessageReadMemberList().then(res => {
                        console.log(res)
                        callback(JSON.stringify(res))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
           
            {
                name: "TIMGroupCreate",
                action: (callback) => {
                    TimGroupManager.TIMGroupCreate().then(res => {
                        console.log(JSON.stringify(res));
                        const {  json_param  } = res
                        console.log(json_param);
                        // const { create_group_result_groupid } = JSON.parse(json_param);
                        console.log(json_param.create_group_result_groupid);
                        createdGroupId = json_param==undefined?"":json_param.create_group_result_groupid;
                        callback(JSON.stringify(res))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMGroupDelete",
                action: (callback) => {
                    TimGroupManager.TIMGroupDelete(createdGroupId).then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMGroupGetJoinedGroupList",
                action: (callback) => {
                    TimGroupManager.TIMGroupGetJoinedGroupList().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMGroupGetGroupInfoList",
                action: (callback) => {
                    TimGroupManager.TIMGroupGetGroupInfoList().then(res => {
                        const { json_param  } = res
                        console.log(json_param);
                        callback(JSON.stringify(res))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMGroupModifyGroupInfo",
                action: (callback) => {
                    TimGroupManager.TIMGroupModifyGroupInfo(createdGroupId).then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMGroupGetMemberInfoList",
                action: (callback) => {
                    
                    TimGroupManager.TIMGroupGetMemberInfoList(createdGroupId,seq.group_get_memeber_info_list_result_next_seq).then(data => {
                        if(data.json_param!=null){
                            const d = data.json_param
                        //  seq = JSON.parse(data.data.json_param).group_get_memeber_info_list_result_next_seq
                            console.log(data);
                        // seq = d;
                        // console.log('本次获取数据',d.group_get_memeber_info_list_result_info_array.map((item)=>{ console.log(item.group_member_info_identifier);return item; }));
                        }  
                        callback(JSON.stringify(data))

                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMGroupModifyMemberInfo",
                action: (callback) => {
                    TimGroupManager.TIMGroupModifyMemberInfo().then(data => {
                        console.log(data)
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMGroupGetPendencyList",
                action: (callback) => {
                    TimGroupManager.TIMGroupGetPendencyList().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMGroupInitGroupAttributes",
                action: (callback) => {
                    TimGroupManager.TIMGroupInitGroupAttributes(createdGroupId).then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMGroupSetGroupAttributes",
                action: (callback) => {
                    TimGroupManager.TIMGroupSetGroupAttributes(createdGroupId).then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMGroupDeleteGroupAttributes",
                action: (callback) => {
                    TimGroupManager.TIMGroupDeleteGroupAttributes(createdGroupId).then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMGroupGetGroupAttributes",
                action: (callback) => {
                    TimGroupManager.TIMGroupGetGroupAttributes(createdGroupId).then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMSetGroupAttributeChangedCallback",
                action: (callback) => {
                    TimGroupManager.TIMSetGroupAttributeChangedCallback(callback).then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMGroupJoin",
                action: (callback) => {
                    TimGroupManager.TIMGroupJoin().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMGroupQuit",
                action: (callback) => {
                    TimGroupManager.TIMGroupQuit().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMGroupReportPendencyReaded",
                action: (callback) => {
                    TimGroupManager.TIMGroupReportPendencyReaded().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMGroupHandlePendency",
                action: (callback) => {
                    TimGroupManager.TIMGroupHandlePendency().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMGroupGetOnlineMemberCount",
                action: (callback) => {
                    TimGroupManager.TIMGroupGetOnlineMemberCount().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMGroupSearchGroups",
                action: (callback) => {
                    TimGroupManager.TIMGroupSearchGroups().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMGroupSearchGroupMembers",
                action: (callback) => {
                    TimGroupManager.TIMGroupSearchGroupMembers().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMGroupInviteMember",
                action: (callback) => {
                    TimGroupManager.TIMGroupInviteMember().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMGroupDeleteMember",
                action: (callback) => {
                    TimGroupManager.TIMGroupDeleteMember().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMSetGroupTipsEventCallback",
                action: (callback) => {
                    TimGroupManager.TIMSetGroupTipsEventCallback(callback).then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMGroupSetGroupCounters",
                action: (callback) => {
                    TimGroupManager.TIMGroupSetGroupCounters().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMGroupGetGroupCounters",
                action: (callback) => {
                    TimGroupManager.TIMGroupGetGroupCounters().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMGroupIncreaseGroupCounter",
                action: (callback) => {
                    TimGroupManager.TIMGroupIncreaseGroupCounter().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMGroupDecreaseGroupCounter",
                action: (callback) => {
                    TimGroupManager.TIMGroupDecreaseGroupCounter().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMGroupGetJoinedCommunityList",
                action: (callback) => {
                    TimGroupManager.TIMGroupGetJoinedCommunityList().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMGroupCreateTopicInCommunity",
                action: (callback) => {
                    TimGroupManager.TIMGroupCreateTopicInCommunity().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMGroupDeleteTopicFromCommunity",
                action: (callback) => {
                    TimGroupManager.TIMGroupDeleteTopicFromCommunity().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMGroupSetTopicInfo",
                action: (callback) => {
                    TimGroupManager.TIMGroupSetTopicInfo().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMGroupGetTopicInfoList",
                action: (callback) => {
                    TimGroupManager.TIMGroupGetTopicInfoList().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMSetGroupCounterChangedCallback",
                action: (callback) => {
                    TimGroupManager.TIMSetGroupCounterChangedCallback().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "TIMSetGroupTopicCreatedCallback",
                action: (callback) => {
                    TimGroupManager.TIMSetGroupTopicCreatedCallback().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            }
        ]
    },
    {
        manager: 'friendshipManager',
        method: [
            {
                name: 'TIMFriendshipGetFriendProfileList',
                action: callback => {
                    TimFriendshipManager.TIMFriendshipGetFriendProfileList().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMFriendshipAddFriend',
                action: callback => {
                    TimFriendshipManager.TIMFriendshipAddFriend().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMFriendshipHandleFriendAddRequest',
                action: callback => {
                    TimFriendshipManager.TIMFriendshipHandleFriendAddRequest().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMFriendshipModifyFriendProfile',
                action: callback => {
                    TimFriendshipManager.TIMFriendshipModifyFriendProfile().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMFriendshipDeleteFriend',
                action: callback => {
                    TimFriendshipManager.TIMFriendshipDeleteFriend().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMFriendshipCheckFriendType',
                action: callback => {
                    TimFriendshipManager.TIMFriendshipCheckFriendType().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMFriendshipCreateFriendGroup',
                action: callback => {
                    TimFriendshipManager.TIMFriendshipCreateFriendGroup().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMFriendshipGetFriendGroupList',
                action: callback => {
                    TimFriendshipManager.TIMFriendshipGetFriendGroupList().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMFriendshipModifyFriendGroup',
                action: callback => {
                    TimFriendshipManager.TIMFriendshipModifyFriendGroup().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMFriendshipDeleteFriendGroup',
                action: callback => {
                    TimFriendshipManager.TIMFriendshipDeleteFriendGroup().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMFriendshipAddToBlackList',
                action: callback => {
                    TimFriendshipManager.TIMFriendshipAddToBlackList().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMFriendshipGetBlackList',
                action: callback => {
                    TimFriendshipManager.TIMFriendshipGetBlackList().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMFriendshipDeleteFromBlackList',
                action: callback => {
                    TimFriendshipManager.TIMFriendshipDeleteFromBlackList().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMFriendshipGetPendencyList',
                action: callback => {
                    TimFriendshipManager.TIMFriendshipGetPendencyList().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMFriendshipDeletePendency',
                action: callback => {
                    TimFriendshipManager.TIMFriendshipDeletePendency().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMFriendshipReportPendencyReaded',
                action: callback => {
                    TimFriendshipManager.TIMFriendshipReportPendencyReaded().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMFriendshipSearchFriends',
                action: callback => {
                    TimFriendshipManager.TIMFriendshipSearchFriends().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMFriendshipGetFriendsInfo',
                action: callback => {
                    TimFriendshipManager.TIMFriendshipGetFriendsInfo().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMSetOnAddFriendCallback',
                action: callback => {
                    TimFriendshipManager.TIMSetOnAddFriendCallback(callback).then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMSetOnDeleteFriendCallback',
                action: callback => {
                    TimFriendshipManager.TIMSetOnDeleteFriendCallback(callback).then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMSetUpdateFriendProfileCallback',
                action: callback => {
                    TimFriendshipManager.TIMSetUpdateFriendProfileCallback(callback).then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMSetFriendAddRequestCallback',
                action: callback => {
                    TimFriendshipManager.TIMSetFriendAddRequestCallback(callback).then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMSetFriendApplicationListDeletedCallback',
                action: callback => {
                    TimFriendshipManager.TIMSetFriendApplicationListDeletedCallback(callback).then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMSetFriendApplicationListReadCallback',
                action: callback => {
                    TimFriendshipManager.TIMSetFriendApplicationListReadCallback(callback).then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMSetFriendBlackListAddedCallback',
                action: callback => {
                    TimFriendshipManager.TIMSetFriendBlackListAddedCallback(callback).then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMSetFriendBlackListDeletedCallback',
                action: callback => {
                    TimFriendshipManager.TIMSetFriendBlackListDeletedCallback(callback).then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            }
        ]
    },
    {
        manager: "advanceMessageManager",
        method: [
            {
                name: 'TIMMsgSendMessage',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgSendMessage().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgSendReplyMessage',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgSendReplyMessage().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgCancelSend',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgCancelSend().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgFindMessages',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgFindMessages().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name:'TIMMsgModifyMessage',
                action:(callback)=>{
                    TimAdvanceMessageManager.TIMMsgModifyMessage().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgReportReaded',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgReportReaded().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgRevoke',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgRevoke().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgFindByMsgLocatorList',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgFindByMsgLocatorList().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgImportMsgList',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgImportMsgList().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgSaveMsg',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgSaveMsg().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgGetMsgList',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgGetMsgList(msg).then(data => {
                        console.log(data)
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        console.log(err)
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgDelete',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgDelete().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgListDelete',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgListDelete().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgClearHistoryMessage',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgClearHistoryMessage().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgSetC2CReceiveMessageOpt',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgSetC2CReceiveMessageOpt().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgGetC2CReceiveMessageOpt',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgGetC2CReceiveMessageOpt().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgSetGroupReceiveMessageOpt',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgSetGroupReceiveMessageOpt().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgDownloadElemToPath',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgDownloadElemToPath().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgDownloadMergerMessage',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgDownloadMergerMessage().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgBatchSend',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgBatchSend().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgSearchLocalMessages',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgSearchLocalMessages().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgSearchCloudMessages',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgSearchCloudMessages().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgSetLocalCustomData',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgSetLocalCustomData().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMAddRecvNewMsgCallback',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMAddRecvNewMsgCallback(callback).then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMRemoveRecvNewMsgCallback',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMRemoveRecvNewMsgCallback(callback).then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMSetMsgReadedReceiptCallback',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMSetMsgReadedReceiptCallback(callback).then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMSetMsgRevokeCallback',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMSetMsgRevokeCallback(callback).then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMSetMsgElemUploadProgressCallback',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMSetMsgElemUploadProgressCallback(callback).then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMSetMsgUpdateCallback',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMSetMsgUpdateCallback(callback).then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name:'TIMMsgSetMessageExtensions',
                action:(callback) => {
                    TimAdvanceMessageManager.TIMMsgSetMessageExtensions().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })}
            },
            {
                name:'TIMMsgGetMessageExtensions',
                action:(callback) => {
                    TimAdvanceMessageManager.TIMMsgGetMessageExtensions().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })}
            },
            {
                name:'TIMMsgDeleteMessageExtensions',
                action:(callback) => {
                    TimAdvanceMessageManager.TIMMsgDeleteMessageExtensions().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })}
            },{
                name:'TIMSetMsgExtensionsChangedCallback',
                action:(callback) => {
                    TimAdvanceMessageManager.TIMSetMsgExtensionsChangedCallback().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })}
            },{
                name:'TIMSetMsgExtensionsDeletedCallback',
                action:(callback) => {
                    TimAdvanceMessageManager.TIMSetMsgExtensionsDeletedCallback().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })}
            },{
                name:'TIMMsgSetOfflinePushToken',
                action:(callback) => {
                    TimAdvanceMessageManager.TIMMsgSetOfflinePushToken().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })}
            },
            {
                name:'TIMMsgTranslateText',
                action:(callback) => {
                    TimAdvanceMessageManager.TIMMsgTranslateText().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })}
            }
            ,
            {
                name:'TIMMsgConvertVoiceToText',
                action:(callback) => {
                    TimAdvanceMessageManager.TIMMsgConvertVoiceToText().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })}
            }
        ]
    }
]
export default APIS;
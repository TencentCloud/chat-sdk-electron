import TimRender from "../../../im_electron_sdk/dist/renderer";
import {callExperimentalAPIParam, inviteParam, loginParam, logoutParam, setSelfStatusParam, SetSignalingInvitationCancelledCallbackParam, SetSignalingInvitationTimeoutCallParam, SetSignalingInviteeAcceptedCallbackParam, SetSignalingInviteeRejectedCallbackParam, SetSignalingReceiveNewInvitationCallbackParam, signalCallback, TIMProfileGetUserProfileListParam, TIMProfileModifySelfUserProfileParam, TIMSetKickedOfflineCallbackParam, TIMSetNetworkStatusListenerCallbackParam, TIMSetSelfInfoUpdatedCallbackParam, TIMSetUserSigExpiredCallbackParam, TIMSetUserStatusChangedCallbackParam, TRTCCallingCallGroupParam, TRTCCallingCallParam, userStatusParam} from "../../../im_electron_sdk/dist/interfaces";
import {TIMInternalOperation} from "./../../../im_electron_sdk/dist/enumbers";
const path = require('path')
const os = require('os')
// import TimRender from "im_electron_sdk/dist/renderer";
const timRenderInstance = new TimRender();
const TimBaseManager = {
    callExperimentalAPI: () => {
        // call
        let obj:callExperimentalAPIParam = {
            json_param:{
                // request_internal_operation:"internal_operation_userid_tinyid",
                request_internal_operation: "internal_operation_set_custom_server_info",
                // request_set_ui_platform_param:0,
                request_set_custom_server_info_param:{
                    longconnection_address_array:[
                        {
                            "server_address_ip":"",
                            "server_address_port":8443,
                        }
                    ],
                    shortconnection_address_array:[
                        {
                            "server_address_ip":"",
                            "server_address_port":8443,
                        }
                    ],
                    server_public_key:"",
                },
            }
        };
        return timRenderInstance.callExperimentalAPI(obj);
    },
    TIMInit: () => {
        return timRenderInstance.TIMInit({
        });
    },
    TIMLogin: () => {
        console.log(path.resolve(os.homedir(), ".tencent-im/sdk-log"));
        let obj :loginParam = {
            userID:"",
            userSig: "",
            userData:"",
            // userID:"",
            // userSig: "",
            // userData:"",
            // userID:"",
            // userSig: "",
            // userData:"",
        }
        return timRenderInstance.TIMLogin(obj);
        
    },
    TIMSetSelfInfoUpdatedCallback:()=>{
        let obj:TIMSetSelfInfoUpdatedCallbackParam = {
            callback:function(data){console.log("setselfInfoupdated");console.log(data)},
            user_data:"selfinfoupdate"
        }
        return timRenderInstance.TIMSetSelfInfoUpdatedCallback(obj)
    },
    TIMSetUserStatusChangedCallback:()=>{
        let obj:TIMSetUserStatusChangedCallbackParam={
            callback:function(data){console.log("userstatuschangedcallback");console.log(data)}
        }
        return timRenderInstance.TIMSetUserStatusChangedCallback(obj)
    },
    TIMInvite: () => {
        let obj:inviteParam = {
            invitee: "10058198",
            data: "",
            online_user_only: false,
            json_offline_push_info: undefined,
            timeout: 100
        }
        return timRenderInstance.TIMInvite(obj);
    },
    TIMInviteInGroup: () => {
        // let obj:TRTCCallingCallGroupParam = {
        //     senderID: '',
        //     groupID: "",
        //     userIDs: [''],
        //     data: JSON.stringify({
        //         buisnessID: 'av_call',
        //         call_type: 2,
        //         room_id: 22334,
        //     }),
        // }
        // return timRenderInstance.TIMInviteInGroup(obj).then((data) => {
        //     const inviteID = JSON.parse(JSON.parse(data as string)[0].message_elem_array[0].custom_elem_data).inviteID;
        // })
    },
    TIMOnInvited: () => {
        let obj:SetSignalingReceiveNewInvitationCallbackParam = {
            callback: (data) => {
                console.log(data);
            }
        }
        return timRenderInstance.TIMOnInvited(obj);
    },
    TIMOnTimeout: () => {
        let obj:SetSignalingInvitationTimeoutCallParam = {callback: (data) => {

            console.log(data);
        }}
        return timRenderInstance.TIMOnTimeout(obj)
    },
    TIMOnRejected: () => {
        let obj:SetSignalingInviteeRejectedCallbackParam = {callback: (data) => {
            console.log(data);
        }}
        return timRenderInstance.TIMOnRejected(obj)
    },
    TIMOnAccepted: () => {
        let obj:SetSignalingInviteeAcceptedCallbackParam = {callback: (data) => {
            console.log(data);
        }}
        return timRenderInstance.TIMOnAccepted(obj)
    },
    TIMOnCanceled: () => {
        let obj:SetSignalingInvitationCancelledCallbackParam = {callback: (data) => {
            console.log(data);
        }}
        return timRenderInstance.TIMOnCancelled(obj)
    },
    TIMUninit: () => {
        return timRenderInstance.TIMUninit()
    },
    TIMGetSDKVersion: () => {
        return timRenderInstance.TIMGetSDKVersion();
    },
    TIMGetServerTime: () => {
        return timRenderInstance.TIMGetServerTime();
    },
    TIMLogout: () => {
        let obj:logoutParam={
            userData: "logout"
        }
        return timRenderInstance.TIMLogout(obj)
    },
    TIMGetLoginStatus: () => {
        return timRenderInstance.TIMGetLoginStatus()
    },
    TIMGetLoginUserID: () => {
        return timRenderInstance.TIMGetLoginUserID()
    },
    TIMSetNetworkStatusListenerCallback: () => {
        let obj:TIMSetNetworkStatusListenerCallbackParam={
            userData: "setNetworkStatusListenerCallback",
            callback: (data) => {
                console.log(data);
            }
        };
        return timRenderInstance.TIMSetNetworkStatusListenerCallback(obj)
    },
    TIMSetKickedOfflineCallback: () => {
        let obj:TIMSetKickedOfflineCallbackParam={
            userData: "setNetworkStatusListenerCallback",
            callback: (data) => {
            }
        };
        return timRenderInstance.TIMSetKickedOfflineCallback(obj)
    },
    TIMSetUserSigExpiredCallback: () => {
        let obj:TIMSetUserSigExpiredCallbackParam={
            userData: "setNetworkStatusListenerCallback",
            callback: (data) => {
            }
        };
        return timRenderInstance.TIMSetUserSigExpiredCallback(obj)
    },
    TIMProfileGetUserProfileList: () => {
        let obj:TIMProfileGetUserProfileListParam = {
            json_get_user_profile_list_param: {
                friendship_getprofilelist_param_identifier_array: ['3708'],
                friendship_getprofilelist_param_force_update:false,
            },
            user_data: "TIMProfileGetUserProfileList",
        }
        return timRenderInstance.TIMProfileGetUserProfileList(obj)
    },
    TIMProfileModifySelfUserProfile: () => {
        let obj:TIMProfileModifySelfUserProfileParam={
            json_modify_self_user_profile_param: {
                user_profile_item_nick_name: 'Jingfeng'
            },
            user_data: "TIMProfileModifySelfUserProfile",
        }
        return timRenderInstance.TIMProfileModifySelfUserProfile(obj)
    },
    TIMGetUserStatus:() => {
        let obj:userStatusParam = {
            id_array:[""],
            user_data:"getuserstatus"
        }
        return timRenderInstance.TIMGetUserStatus(obj)
    },
    TIMSetSelfStatus:()=>{
        let obj:setSelfStatusParam = {
            status:{
                user_status_custom_status:"hello"
            },
            user_data:"setselfstatus"
        }
        return timRenderInstance.TIMSetSelfStatus(obj)
    },
    TIMSubscribeUserStatus:()=>{
        let obj:userStatusParam = {
            id_array:[""],
            user_data:"subscribe"
        }
        return timRenderInstance.TIMSubscribeUserStatus(obj)
    },
    TIMUnsubscribeUserStatus:()=>{
        let obj:userStatusParam = {
            id_array:[""],
            user_data:"unsubscribe"
        }
        return timRenderInstance.TIMUnsubscribeUserStatus(obj)
    }
}

export default TimBaseManager;

function obj(obj: any) {
    throw new Error("Function not implemented.");
}

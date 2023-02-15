import TimRender from "../../../im_electron_sdk/dist/renderer";
import {callExperimentalAPIParam, loginParam, logoutParam, signalCallback, TIMProfileGetUserProfileListParam, TIMProfileModifySelfUserProfileParam, TIMSetKickedOfflineCallbackParam, TIMSetNetworkStatusListenerCallbackParam, TIMSetUserSigExpiredCallbackParam, TRTCCallingCallGroupParam, TRTCCallingCallParam} from "../../../im_electron_sdk/dist/interfaces";
import {TIMInternalOperation} from "./../../../im_electron_sdk/dist/enumbers";
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
        return timRenderInstance.TIMInit();
    },
    TIMLogin: () => {
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
    TIMInvite: () => {
        let obj:TRTCCallingCallParam = {
            userID: '121405',
            senderID: '109442',

            data: JSON.stringify({
                buisnessID: 'av_call',
                call_type: 2,
                room_id: 22334,
            }),
            timeout:0,
        }
        return timRenderInstance.TIMInvite(obj);
    },
    TIMInviteInGroup: () => {
        let obj:TRTCCallingCallGroupParam = {
            senderID: '109442',
            groupID: "@TGS#2WWPGH7HM",
            userIDs: ['121405'],
            data: JSON.stringify({
                buisnessID: 'av_call',
                call_type: 2,
                room_id: 22334,
            }),
        }
        return timRenderInstance.TIMInviteInGroup(obj).then((data) => {
            const inviteID = JSON.parse(JSON.parse(data as string)[0].message_elem_array[0].custom_elem_data).inviteID;
        })
    },
    TIMOnInvited: () => {
        let obj:signalCallback = {
            callback: (data) => {
                const inviteID = JSON.parse(JSON.parse(data)[0].message_elem_array[0].custom_elem_data).inviteID;
            }
        }
        return timRenderInstance.TIMOnInvited(obj);
    },
    TIMOnTimeout: () => {
        let obj:signalCallback = {callback: (data) => {
        }}
        return timRenderInstance.TIMOnTimeout(obj)
    },
    TIMOnRejected: () => {
        let obj:signalCallback = {callback: (data) => {
        }}
        return timRenderInstance.TIMOnRejected(obj)
    },
    TIMOnAccepted: () => {
        let obj:signalCallback = {callback: (data) => {
        }}
        return timRenderInstance.TIMOnAccepted(obj)
    },
    TIMOnCanceled: () => {
        let obj:signalCallback = {callback: (data) => {
        }}
        return timRenderInstance.TIMOnCanceled(obj)
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
    }
}

export default TimBaseManager;

function obj(obj: any) {
    throw new Error("Function not implemented.");
}

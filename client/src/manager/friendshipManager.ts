
import TimRender from "../../../im_electron_sdk/dist/renderer";

import { AddFriendParams, CheckFriendTypeParams, CreateFriendGroupParams, DeleteFriendParams, DeletePendencyParams, FriendshipGetPendencyListParams, FriendshipStringArrayParams, GetBlackListParams, GetFriendProfileListParams, HandleFriendAddParams, ModifyFriendGroupParams, ModifyFriendProfileParams, ReportPendencyReadedParams, SearchFriendsParams, TIMFriendAddRequestCallbackParams, TIMFriendApplicationListDeletedCallbackParams, TIMFriendApplicationListReadCallbackParams, TIMFriendBlackListAddedCallbackParams, TIMFriendBlackListDeletedCallbackParams, TIMOnAddFriendCallbackParams, TIMOnDeleteFriendCallbackParams, TIMUpdateFriendProfileCallbackParams } from "../../../im_electron_sdk/dist/interfaces";
// import { TIMFriendType } from "../../../im_electron_sdk/dist/enums";
// import TimRender from "im_electron_sdk/dist/renderer";
const timRenderInstance = new TimRender();

const friendShipManager = {
    TIMFriendshipGetFriendProfileList: () => {
        let param:GetFriendProfileListParams = {
            user_data: "123"
        }
        return timRenderInstance.TIMFriendshipGetFriendProfileList(param);
    },
    TIMFriendshipAddFriend: () => {
        let param:AddFriendParams = {
            params: {
                friendship_add_friend_param_identifier: "",
                friendship_add_friend_param_friend_type: 1,
                friendship_add_friend_param_remark: "test_jinhui",
                friendship_add_friend_param_group_name: "",
                friendship_add_friend_param_add_source: "Windows",
                friendship_add_friend_param_add_wording: "Hi好",
            },
            user_data: "121"
        }
        return timRenderInstance.TIMFriendshipAddFriend(param);
    },
    TIMFriendshipHandleFriendAddRequest: () => {
        let param :HandleFriendAddParams = {
            params: {
                friend_response_identifier: "940928",
                friend_response_action: 1,
                friend_response_remark: "xx",
                friend_response_group_name: "xx",
            },
            user_data: "1234"
        }
        return timRenderInstance.TIMFriendshipHandleFriendAddRequest(param);
    },
    TIMFriendshipModifyFriendProfile: () => {
        let param : ModifyFriendProfileParams = {
            params: {
                friendship_modify_friend_profile_param_identifier: "",
                friendship_modify_friend_profile_param_item: {
                    friend_profile_item_remark: "xx",
                }
            },
            user_data: "1234"
        }
        return timRenderInstance.TIMFriendshipModifyFriendProfile(param);
    },
    TIMFriendshipDeleteFriend: () => {
        let param :DeleteFriendParams={
            params: {
                friendship_delete_friend_param_friend_type: 1,
                friendship_delete_friend_param_identifier_array: ["940928"]
            },
            user_data: "1234"
        }
        return timRenderInstance.TIMFriendshipDeleteFriend(param);
    },
    TIMFriendshipCheckFriendType: () => {
        let param:CheckFriendTypeParams = {
            params: {
                // friendship_check_friendtype_param_check_type: TIMFriendType.FriendTypeSignle,
                friendship_check_friendtype_param_identifier_array: ["940928"]  
            },
            user_data: "1234"
        }
        return timRenderInstance.TIMFriendshipCheckFriendType(param);
    },
    TIMFriendshipCreateFriendGroup: () => {
        let param :CreateFriendGroupParams={
            params: {
                friendship_create_friend_group_param_name_array: ["ggg1"],
                friendship_create_friend_group_param_identifier_array: ["940928"],
            },
            user_data: "1234"
        }
        return timRenderInstance.TIMFriendshipCreateFriendGroup(param);
    },
    TIMFriendshipGetFriendGroupList: () => {
        let param :FriendshipStringArrayParams={
            params: ["ggg1"],
            user_data: "1234"
        }
        return timRenderInstance.TIMFriendshipGetFriendGroupList(param);
    },
    TIMFriendshipModifyFriendGroup: () => {
        let param :ModifyFriendGroupParams={
            params: {
                friendship_modify_friend_group_param_name: "ggg1",
                friendship_modify_friend_group_param_delete_identifier_array: ["940928"],
            },
            user_data: "1234"
        }
        return timRenderInstance.TIMFriendshipModifyFriendGroup(param);
    },
    TIMFriendshipDeleteFriendGroup: () => {
        let param:FriendshipStringArrayParams={
            params: ["ggg1"],
            user_data: "1234"
        }
        return timRenderInstance.TIMFriendshipDeleteFriendGroup(param);
    },
    TIMFriendshipAddToBlackList: () => {
        let param:FriendshipStringArrayParams={
            params: ["940928"],
            user_data: "1234"
        }
        return timRenderInstance.TIMFriendshipAddToBlackList(param);
    },
    TIMFriendshipGetBlackList: () => {
        let param:GetBlackListParams={
            user_data: "1234"
        }
        return timRenderInstance.TIMFriendshipGetBlackList(param);
    },
    TIMFriendshipDeleteFromBlackList:() => {
        let param:FriendshipStringArrayParams={
            params: ["940928"],
            user_data: "1234"
        }
        return timRenderInstance.TIMFriendshipDeleteFromBlackList(param);
    },
    TIMFriendshipGetPendencyList: () => {
        let param:FriendshipGetPendencyListParams={
            params: {
                friendship_get_pendency_list_param_type: 1,
                friendship_get_pendency_list_param_start_seq: 0,
                friendship_get_pendency_list_param_start_time: 0,
                friendship_get_pendency_list_param_limited_size: 10,
            },
            user_data: "1234"
        }
        return timRenderInstance.TIMFriendshipGetPendencyList(param);
    },
    TIMFriendshipDeletePendency: () => {
        let param:DeletePendencyParams={
            params: {
                friendship_delete_pendency_param_type: 1,
                friendship_delete_pendency_param_identifier_array: ["test1"]
            },
            user_data: "1234"
        }
        return timRenderInstance.TIMFriendshipDeletePendency(param);
    },
    TIMFriendshipReportPendencyReaded: () => {
        let param:ReportPendencyReadedParams={
            timestamp: Math.floor(+new Date/1000),
            user_data: "1234"
        }
        return timRenderInstance.TIMFriendshipReportPendencyReaded(param);
    },
    TIMFriendshipSearchFriends: () => {
        let param:SearchFriendsParams={
            params: {
                friendship_search_param_keyword_list: ["940928"],
                friendship_search_param_search_field_list: [2,3,1]    
            },
            user_data: "1234"
        }
        return timRenderInstance.TIMFriendshipSearchFriends(param);
    },
    TIMFriendshipGetFriendsInfo: () => {
        let param:FriendshipStringArrayParams={
            params: ["940928"],
            user_data: "1234"
        }
        return timRenderInstance.TIMFriendshipGetFriendsInfo(param);
    },
    TIMSetOnAddFriendCallback: (callback) => {
        let param:TIMOnAddFriendCallbackParams={
            callback: (...args) => {
                const [data,user_data] = args;
                callback(JSON.stringify({
                    data,user_data
                }))
            }
        }
        return timRenderInstance.TIMSetOnAddFriendCallback(param)
    },
    TIMSetOnDeleteFriendCallback: (callback) => {
        let param:TIMOnDeleteFriendCallbackParams = {
            callback: (...args) => {
                const [data,user_data] = args;
                callback(JSON.stringify({
                    data,user_data
                }))
            }
        }
        return timRenderInstance.TIMSetOnDeleteFriendCallback(param)
    }, 
    TIMSetUpdateFriendProfileCallback: (callback) => {
        let param:TIMUpdateFriendProfileCallbackParams = {
            callback: (...args) => {
                const [data,user_data] = args;
                callback(JSON.stringify({
                    data,user_data
                }))
            }
        }
        return timRenderInstance.TIMSetUpdateFriendProfileCallback(param)
    }, 
    TIMSetFriendAddRequestCallback: (callback) => {
        let param:TIMFriendAddRequestCallbackParams={
            callback: (...args) => {
                const [data,user_data] = args;
                callback(JSON.stringify({
                    data,user_data
                }))
            }
        }
        return timRenderInstance.TIMSetFriendAddRequestCallback(param)
    }, 
    TIMSetFriendApplicationListDeletedCallback: (callback) => {
        let param:TIMFriendApplicationListDeletedCallbackParams={
            callback: (...args) => {
                const [data,user_data] = args;
                callback(JSON.stringify({
                    data,user_data
                }))
            }
        }
        return timRenderInstance.TIMSetFriendApplicationListDeletedCallback(param)
    }, 
    TIMSetFriendApplicationListReadCallback: (callback) => {
        let param:TIMFriendApplicationListReadCallbackParams={
            callback: (...args) => {
                const [data] = args;
                callback(JSON.stringify({
                    data
                }))
            }
        }
        return timRenderInstance.TIMSetFriendApplicationListReadCallback(param)
    }, 
    TIMSetFriendBlackListAddedCallback: (callback) => {
        let param :TIMFriendBlackListAddedCallbackParams={
            callback: (...args) => {
                const [data,user_data] = args;
                callback(JSON.stringify({
                    data,user_data
                }))
            }
        }
        return timRenderInstance.TIMSetFriendBlackListAddedCallback(param)
    }, 
    TIMSetFriendBlackListDeletedCallback: (callback) => {
        let param:TIMFriendBlackListDeletedCallbackParams = {
            callback: (...args) => {
                const [data,user_data] = args;
                callback(JSON.stringify({
                    data,user_data
                }))
            }
        }
        return timRenderInstance.TIMSetFriendBlackListDeletedCallback(param)
    },
}

export default friendShipManager;

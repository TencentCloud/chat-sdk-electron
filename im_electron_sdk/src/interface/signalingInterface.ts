import { TIMSignalingActionType } from "../enum";
import { Json_value_msg, OfflinePushConfig } from "./advanceMessageInterface";

/**
 * @param invitee 被邀请人的 userID
 * @param data 自定义数据
 * @param online_user_only 是否只有在线用户才能收到邀请，如果设置为 true，只有在线用户才能收到，并且 invite 操作也不会产生历史消息（针对该次 invite 的后续 cancel、accept、reject、timeout 操作也同样不会产生历史消息）
 * @param json_offline_push_info 离线推送时携带的标题和声音，其中 desc 为必填字段，推送的时候会默认展示 desc 信息，json key 的定义请参考 [OfflinePushConfig](TIMOfflinePushManager.h)
 * @param timeout 超时时间，单位 s，如果设置为 0，SDK 不会做超时检测，也不触发 @ref TIMSignalingInvitationTimeoutCallback 回调
 */
interface inviteParam {
    invitee: string;
    data: string;
    online_user_only: boolean;
    json_offline_push_info: OfflinePushConfig;
    timeout: number;
    user_data?: string;
}

/**
 * @param group_id 发起邀请所在群组
 * @param json_invitee_array 被邀请人列表，且被邀请人必须已经在群组内，否则邀请无效
 * @param data 自定义字段
 * @param online_user_only  是否只有在线用户才能收到邀请，如果设置为 true，只有在线用户才能收到，并且 invite 操作也不会产生历史消息（针对该次 invite 的后续 cancel、accept、reject、timeout 操作也同样不会产生历史消息）
 * @param timeout 超时时间，单位 s，如果设置为 0，SDK 不会做超时检测，也不触发 @ref TIMSignalingInvitationTimeoutCallback 回调
 * @param user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 */
interface inviteInGroupParam {
    group_id: string;
    json_invitee_array: string[];
    data: string;
    online_user_only: boolean;
    timeout: number;
    user_data?: string;
}

/**
 * @param invite_id 邀请 ID
 * @param data 自定义字段
 * @param user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 */
interface signalingParam {
    invite_id: string;
    data: string;
    user_data?: string;
}

interface getSignalingInfoParam {
    json_msg: Json_value_msg;
    user_data?: string;
}

interface SignalingInfo {
    signaling_info_invite_id: string;
    signaling_info_group_id: string;
    signaling_info_inviter: string;
    signaling_info_invitee_list: string[];
    signaling_info_data: string;
    signaling_info_action_type: TIMSignalingActionType;
    signaling_info_timeout: number;
}
/**
 * 2.1 收到邀请的回调
 *
 * @param invite_id 邀请 ID
 * @param inviter 邀请者 userID
 * @param group_id 群组 ID
 * @param json_invitee_list 被邀请者 userID 列表，json 字符串类型
 * @param data 自定义字段
 * @param user_data ImSDK负责透传的用户自定义数据，未做任何处理
 */
interface TIMSignalingReceiveNewInvitationCallback {
    (
        invite_id: string,
        inviter: string,
        group_id: string,
        json_invitee_list: string,
        data: string,
        user_data: string
    ): void;
}
/**
 * 2.2 被邀请者接受邀请的回调
 *
 * @param invite_id 邀请 ID
 * @param invitee 被邀请者 userID
 * @param data 自定义字段
 * @param user_data ImSDK负责透传的用户自定义数据，未做任何处理
 */
interface TIMSignalingInviteeAcceptedCallback {
    (invite_id: string, invitee: string, data: string, user_data: string): void;
}
/**
 * 2.3 被邀请者拒绝邀请的回调
 *
 * @param invite_id 邀请 ID
 * @param invitee 被邀请者 userID
 * @param data 自定义字段
 * @param user_data ImSDK负责透传的用户自定义数据，未做任何处理
 */
interface TIMSignalingInviteeRejectedCallback {
    (invite_id: string, invitee: string, data: string, user_data: string): void;
}
/**
 * 2.4 邀请被取消的回调
 *
 * @param invite_id 邀请 ID
 * @param inviter 邀请者 userID
 * @param data 自定义字段
 * @param user_data ImSDK负责透传的用户自定义数据，未做任何处理
 */
interface TIMSignalingInvitationCancelledCallback {
    (invite_id: string, inviter: string, data: string, user_data: string): void;
}
/**
 * 2.5 邀请超时的回调
 *
 * @param invite_id 邀请 ID
 * @param json_invitee_list 被邀请者 userID 列表，json 字符串类型
 * @param user_data ImSDK负责透传的用户自定义数据，未做任何处理
 */
interface TIMSignalingInvitationTimeoutCallback {
    (invite_id: string, json_invitee_list: string, user_data: string): void;
}
/**
 * 2.6 邀请被修改的回调（6.7 及其以上版本支持）
 *
 * @param invite_id 邀请 ID
 * @param data 自定义字段
 * @param user_data ImSDK负责透传的用户自定义数据，未做任何处理
 */
interface TIMSignalingInvitationModifiedCallback {
    (invite_id: string, data: string, user_data: string): void;
}

interface SetSignalingReceiveNewInvitationCallbackParam {
    callback: TIMSignalingReceiveNewInvitationCallback;
    user_data?: string;
}
interface SetSignalingInviteeAcceptedCallbackParam {
    callback: TIMSignalingInviteeAcceptedCallback;
    user_data?: string;
}
interface SetSignalingInviteeRejectedCallbackParam {
    callback: TIMSignalingInviteeRejectedCallback;
    user_data?: string;
}

interface SetSignalingInvitationCancelledCallbackParam {
    callback: TIMSignalingInvitationCancelledCallback;
    user_data?: string;
}
interface SetSignalingInvitationTimeoutCallParam {
    callback: TIMSignalingInvitationTimeoutCallback;
    user_data?: string;
}
interface SetSignalingInvitationModifiedCallback {
    callback: TIMSignalingInvitationModifiedCallback;
    user_data?: string;
}

export {
    inviteParam,
    inviteInGroupParam,
    signalingParam,
    getSignalingInfoParam,
    SignalingInfo,
    SetSignalingReceiveNewInvitationCallbackParam,
    SetSignalingInviteeAcceptedCallbackParam,
    SetSignalingInviteeRejectedCallbackParam,
    SetSignalingInvitationCancelledCallbackParam,
    SetSignalingInvitationTimeoutCallParam,
    SetSignalingInvitationModifiedCallback,
    TIMSignalingReceiveNewInvitationCallback,
    TIMSignalingInviteeAcceptedCallback,
    TIMSignalingInviteeRejectedCallback,
    TIMSignalingInvitationCancelledCallback,
    TIMSignalingInvitationTimeoutCallback,
    TIMSignalingInvitationModifiedCallback,
};

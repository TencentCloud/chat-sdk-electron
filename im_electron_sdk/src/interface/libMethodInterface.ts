import { TIMConvType, TIMReceiveMessageOpt } from "../enum";
import { FriendshipStringArrayParams } from "./friendshipInterface";

interface TIMInitFun {
    (sdkappid: number, sdkconfig: string): number;
}

interface TIMUninitFun {
    (): number;
}

interface TIMLoginFun {
    (
        user_id: string,
        user_sig: string,
        callback: Buffer,
        user_data?: string
    ): number;
}
interface TIMLogoutFun {
    (callback: Buffer, user_data?: string): number;
}

interface TIMGetLoginStatusFun {
    (): number;
}

interface TIMGetSDKVersionFun {
    (): Buffer;
}

interface TIMGetServerTimeFun {
    (): number;
}
interface TIMGetLoginUserIDFun {
    (user_id?: Buffer): number;
}

interface TIMSetNetworkStatusListenerCallbackFun {
    (callback: Buffer, user_data?: string): number;
}

interface TIMSetKickedOfflineCallbackFun {
    (callback: Buffer, user_data?: string): number;
}
interface TIMSetUserSigExpiredCallbackFun {
    (callback: Buffer, user_data?: string): number;
}

interface TIMSetSelfInfoUpdatedCallback {
    (callback: Buffer, user_data?: string): number;
}
interface TIMSetUserStatusChangedCallback {
    (callback: Buffer, user_data?: string): number;
}

// ==========Interface For Conversation Start===========
interface TIMConvCreateFun {
    (
        conv_id: string,
        conv_type: number,
        callback: Buffer,
        user_data?: string
    ): number;
}
interface TIMConvGetConvListFun {
    (callback: Buffer, user_data?: string): number;
}
interface TIMConvSetDraftFun {
    (conv_id: string, conv_type: number, json_draft_param: string): number;
}
interface TIMConvCancelDraftFun {
    (conv_id: string, conv_type: number): number;
}
interface TIMConvDeleteFun extends TIMConvCreateFun {}
interface TIMConvDeleteConversationList {
    (
        conversation_id_array: string,
        clearMessage: boolean,
        callback: Buffer,
        user_data?: string
    ): number;
}
interface TIMConvGetConvInfoFun {
    (
        json_get_conv_list_param: string,
        callback: Buffer,
        user_data?: string
    ): number;
}
interface TIMConvPinConversationFun {
    (
        conv_id: string,
        conv_type: number,
        is_pinned: boolean,
        callback: Buffer,
        user_data?: string
    ): number;
}
interface TIMConvGetTotalUnreadMessageCountFun {
    (callback: Buffer, user_data?: string): number;
}
interface TIMSetConvEventCallbackFun {
    (callback: Buffer, user_data?: string): number;
}
interface TIMSetConvTotalUnreadMessageCountChangedCallbackFun {
    (callback: Buffer, user_data?: string): number;
}
interface TIMSetConvUnreadMessageCountChangedByFilterCallback {
    (callback: Buffer, user_data?: string): number;
}
interface TIMConvGetUnreadMessageCountByFilter {
    (filter: string, callback: Buffer, user_data?: string): number;
}
interface TIMConvSubscribeUnreadMessageCountByFilter {
    (filter: string): number;
}
interface TIMConvUnsubscribeUnreadMessageCountByFilter {
    (filter: string): number;
}
interface TIMConvCleanConversationUnreadMessageCount {
    (
        conversation_id: string,
        clean_timestamp: number,
        clean_sequence: number,
        callback: Buffer,
        user_data?: string
    ): number;
}
interface TIMConvGetConversationListByFilter {
    (
        filter: string,
        nextSeq: number,
        count: number,
        callback: Buffer,
        user_data?: string
    ): number;
}
interface TIMConvMarkConversation {
    (
        conversation_id_array: string,
        mark_type: number,
        enable_mark: boolean,
        callback: Buffer,
        user_data?: string
    ): number;
}
interface TIMConvCreateConversationGroup {
    (
        group_name: string,
        conversation_id_array: string,
        callback: Buffer,
        user_data?: string
    ): number;
}
interface TIMConvGetConversationGroupList {
    (callback: Buffer, user_data?: string): number;
}
interface TIMConvDeleteConversationGroup {
    (group_name: string, callback: Buffer, user_data?: string): number;
}
interface TIMConvRenameConversationGroup {
    (
        old_name: string,
        new_name: string,
        callback: Buffer,
        user_data?: string
    ): number;
}
interface TIMConvAddConversationsToGroup {
    (
        group_name: string,
        conversation_id_array: string,
        callback: Buffer,
        user_data?: string
    ): number;
}
interface TIMConvDeleteConversationsFromGroup {
    (
        group_name: string,
        conversation_id_array: string,
        callback: Buffer,
        user_data?: string
    ): number;
}
interface TIMConvSetConversationCustomData {
    (
        conversation_id_array: string,
        custom_data: string,
        callback: Buffer,
        user_data?: string
    ): number;
}
// ==========Interface For Conversation End===========
// ==========Interface For Group Start===========
interface TIMGroupCreateFun {
    (params: string, callback?: Buffer, user_data?: string): number;
}

interface TIMGroupDeleteFun {
    (groupId: string, callback?: Buffer, user_data?: string): number;
}

interface TIMGroupJoinFun {
    (
        groupId: string,
        hello_msg: string,
        callback?: Buffer,
        user_data?: string
    ): number;
}

interface TIMGroupQuitFun extends TIMGroupDeleteFun {}

interface TIMGroupInviteMemberFun extends TIMGroupCreateFun {}

interface TIMGroupDeleteMemberFun extends TIMGroupCreateFun {}

interface TIMGroupGetJoinedGroupListFun {
    (callback?: Buffer, user_data?: string): number;
}

interface TIMGroupGetGroupInfoListFun extends TIMGroupCreateFun {}

interface TIMGroupModifyGroupInfoFun extends TIMGroupCreateFun {}

interface TIMGroupGetMemberInfoListFun extends TIMGroupCreateFun {}

interface TIMGroupModifyMemberInfoFun extends TIMGroupCreateFun {}

interface TIMGroupGetPendencyListFun extends TIMGroupCreateFun {}

interface TIMGroupReportPendencyReadedFun {
    (timeStamp: number, callback?: Buffer, user_data?: string): number;
}

interface TIMGroupHandlePendencyFun extends TIMGroupCreateFun {}

interface TIMGroupGetOnlineMemberCountFun extends TIMGroupDeleteFun {}

interface TIMGroupSetGroupCounters {
    (
        groupId: string,
        json_group_counter_array: string,
        callback: Buffer,
        user_data?: string
    ): number;
}
interface TIMGroupGetGroupCounters {
    (
        groupId: string,
        json_group_counter_key_array: string,
        callback: Buffer,
        user_data?: string
    ): number;
}
interface TIMGroupIncreaseGroupCounter {
    (
        group_id: string,
        group_counter_key: string,
        group_counter_value: number,
        callback: Buffer,
        user_data?: string
    ): number;
}
interface TIMGroupDecreaseGroupCounter {
    (
        group_id: string,
        group_counter_key: string,
        group_counter_value: number,
        callback: Buffer,
        user_data?: string
    ): number;
}
interface TIMGroupSearchGroupsFun extends TIMGroupCreateFun {}

interface TIMGroupSearchGroupMembersFun extends TIMGroupCreateFun {}

interface TIMGroupInitGroupAttributesFun {
    (
        groupId: string,
        params: string,
        callback?: Buffer,
        user_data?: string
    ): number;
}

interface TIMGroupSetGroupAttributesFun
    extends TIMGroupInitGroupAttributesFun {}

interface TIMGroupDeleteGroupAttributesFun
    extends TIMGroupInitGroupAttributesFun {}

interface TIMGroupGetGroupAttributesFun
    extends TIMGroupInitGroupAttributesFun {}

interface TIMSetGroupTipsEventCallbackFun {
    (callback: Buffer, user_data?: string): void;
}

interface TIMSetGroupAttributeChangedCallbackFun {
    (callback: Buffer, user_data?: string): void;
}
interface TIMSetGroupCounterChangedCallback {
    (callback: Buffer, user_data?: string): void;
}
interface TIMSetGroupTopicCreatedCallback {
    (callback: Buffer, user_data?: string): void;
}
interface TIMSetGroupTopicDeletedCallback {
    (callback: Buffer, user_data?: string): void;
}
interface TIMSetGroupTopicChangedCallback {
    (callback: Buffer, user_data?: string): void;
}
interface TIMSetConvConversationGroupCreatedCallback {
    (callback: Buffer, user_data?: string): void;
}
interface TIMSetConvConversationGroupDeletedCallback {
    (callback: Buffer, user_data?: string): void;
}
interface TIMSetConvConversationGroupNameChangedCallback {
    (callback: Buffer, user_data?: string): void;
}
interface TIMSetConvConversationsAddedToGroupCallback {
    (callback: Buffer, user_data?: string): void;
}
interface TIMSetConvConversationsDeletedFromGroupCallback {
    (callback: Buffer, user_data?: string): void;
}
interface TIMGroupGetJoinedCommunityList {
    (callback: Buffer, user_data?: string): number;
}
interface TIMGroupCreateTopicInCommunity {
    (
        group_id: string,
        json_topic_info: string,
        callback: Buffer,
        user_data?: string
    ): number;
}
interface TIMGroupDeleteTopicFromCommunity {
    (
        group_id: string,
        json_topic_info: string,
        callback: Buffer,
        user_data?: string
    ): number;
}
interface TIMGroupSetTopicInfo {
    (json_topic_info: string, callback: Buffer, user_data?: string): number;
}
interface TIMGroupGetTopicInfoList {
    (
        group_id: string,
        json_topic_id_array: string,
        callback: Buffer,
        user_data?: string
    ): number;
}
// ==========Interface For Group End===========
// ==========Interface For friendship begin===========
interface TIMFriendshipGetFriendProfileListFun {
    (callback?: Buffer, user_data?: string): number;
}
interface TIMFriendshipAddFriendFun {
    (
        json_add_friend_param?: string,
        callback?: Buffer,
        user_data?: string
    ): number;
}
interface TIMFriendshipHandleFriendAddRequestFun {
    (
        json_add_friend_param?: string,
        callback?: Buffer,
        user_data?: string
    ): number;
}
interface TIMFriendshipModifyFriendProfileFun {
    (
        json_modify_friend_info_param?: string,
        callback?: Buffer,
        user_data?: string
    ): number;
}
interface TIMFriendshipDeleteFriendFun {
    (
        json_delete_friend_param?: string,
        callback?: Buffer,
        user_data?: string
    ): number;
}
interface TIMFriendshipCheckFriendTypeFun {
    (
        json_check_friend_list_param?: string,
        callback?: Buffer,
        user_data?: string
    ): number;
}
interface TIMFriendshipCreateFriendGroupFun {
    (
        json_create_friend_group_param?: string,
        callback?: Buffer,
        user_data?: string
    ): number;
}
interface TIMFriendshipGetFriendGroupListFun {
    (
        json_get_friend_group_list_param?: string,
        callback?: Buffer,
        user_data?: string
    ): number;
}
interface TIMFriendshipModifyFriendGroupFun {
    (
        json_modify_friend_group_param?: string,
        callback?: Buffer,
        user_data?: string
    ): number;
}
interface TIMFriendshipDeleteFriendGroupFun {
    (
        json_delete_friend_group_param?: string,
        callback?: Buffer,
        user_data?: string
    ): number;
}
interface TIMFriendshipAddToBlackListFun {
    (
        json_add_to_blacklist_param?: string,
        callback?: Buffer,
        user_data?: string
    ): number;
}
interface TIMFriendshipGetBlackListFun {
    (callback?: Buffer, user_data?: string): number;
}
interface TIMFriendshipDeleteFromBlackListFun {
    (
        json_delete_from_blacklist_param?: string,
        callback?: Buffer,
        user_data?: string
    ): number;
}
interface TIMFriendshipGetPendencyListFun {
    (
        json_get_pendency_list_param?: string,
        callback?: Buffer,
        user_data?: string
    ): number;
}
interface TIMFriendshipDeletePendencyFun {
    (
        json_delete_pendency_param?: string,
        callback?: Buffer,
        user_data?: string
    ): number;
}
interface TIMFriendshipReportPendencyReadedFun {
    (time_stamp?: number, callback?: Buffer, user_data?: string): number;
}
interface TIMFriendshipSearchFriendsFun {
    (
        json_search_friends_param?: string,
        callback?: Buffer,
        user_data?: string
    ): number;
}
interface TIMFriendshipGetFriendsInfoFun {
    (
        json_get_friends_info_param?: string,
        callback?: Buffer,
        user_data?: string
    ): number;
}
interface TIMMsgSendMessageFun {
    (
        conv_id?: string,
        conv_type?: TIMConvType,
        json_add_friend_param?: string,
        message_id_buffer?: ArrayBuffer,
        callback?: Buffer,
        user_data?: string
    ): number;
}
interface TIMMsgCancelSendFun {
    (
        conv_id?: string,
        conv_type?: TIMConvType,
        message_id?: string,
        callback?: Buffer,
        user_data?: string
    ): number;
}
interface TIMMsgFindMessagesFun {
    (
        json_message_id_array: string,
        callback: Buffer,
        user_data?: string
    ): number;
}
interface TIMMsgReportReadedFun {
    (
        conv_id: string,
        conv_type: TIMConvType,
        json_msg_param: string,
        callback: Buffer,
        user_data?: string
    ): number;
}
interface TIMMsgModifyMessage {
    (json_msg_param: string, callback: Buffer, user_data?: string): number;
}
interface TIMMsgRevokeFun {
    (
        conv_id?: string,
        conv_type?: TIMConvType,
        json_msg_param?: string,
        callback?: Buffer,
        user_data?: string
    ): number;
}
interface TIMMsgFindByMsgLocatorListFun {
    (
        conv_id?: string,
        conv_type?: TIMConvType,
        json_msg_Locator_array?: string,
        callback?: Buffer,
        user_data?: string
    ): number;
}
interface TIMMsgImportMsgListFun {
    (
        conv_id?: string,
        conv_type?: TIMConvType,
        json_msg_array?: string,
        callback?: Buffer,
        user_data?: string
    ): number;
}
interface TIMMsgSaveMsgFun {
    (
        conv_id?: string,
        conv_type?: TIMConvType,
        json_msg_param?: string,
        callback?: Buffer,
        user_data?: string
    ): number;
}
interface TIMMsgGetMsgListFun {
    (
        conv_id?: string,
        conv_type?: TIMConvType,
        json_get_msg_param?: string,
        callback?: Buffer,
        user_data?: string
    ): number;
}
interface TIMMsgDeleteFun {
    (
        conv_id?: string,
        conv_type?: TIMConvType,
        json_msgdel_param?: string,
        callback?: Buffer,
        user_data?: string
    ): number;
}
interface TIMMsgListDeleteFun {
    (
        conv_id?: string,
        conv_type?: TIMConvType,
        json_msg_array?: string,
        callback?: Buffer,
        user_data?: string
    ): number;
}
interface TIMMsgClearHistoryMessageFun {
    (
        conv_id?: string,
        conv_type?: TIMConvType,
        callback?: Buffer,
        user_data?: string
    ): number;
}
interface TIMMsgSetC2CReceiveMessageOptFun {
    (
        json_identifier_array?: string,
        opt?: TIMReceiveMessageOpt,
        callback?: Buffer,
        user_data?: string
    ): number;
}
interface TIMMsgGetC2CReceiveMessageOptFun {
    (
        json_identifier_array: string,
        callback: Buffer,
        user_data?: string
    ): number;
}
interface TIMMsgSetGroupReceiveMessageOptFun {
    (
        group_id: string,
        opt: number,
        callback?: Buffer,
        user_data?: string
    ): number;
}
interface TIMMsgDownloadElemToPathFun {
    (
        json_download_elem_param: string,
        path: string,
        callback: Buffer,
        user_data?: string
    ): number;
}
interface TIMMsgDownloadMergerMessageFun {
    (json_single_msg: string, callback: Buffer, user_data?: string): number;
}
interface TIMMsgBatchSendFun {
    (
        json_batch_send_param: string,
        callback: Buffer,
        user_data?: string
    ): number;
}
interface TIMMsgSearchLocalMessagesFun {
    (
        json_search_message_param: string,
        callback: Buffer,
        user_data?: string
    ): number;
}
interface TIMAddRecvNewMsgCallbackFun {
    (callback: Buffer, user_data?: string): void;
}
interface TIMRemoveRecvNewMsgCallbackFun {
    (callback: Buffer, user_data?: string): void;
}
interface TIMSetMsgReadedReceiptCallbackFun {
    (callback: Buffer, user_data?: string): void;
}
interface TIMSetMsgRevokeCallbackFun {
    (callback: Buffer, user_data?: string): void;
}
interface TIMSetMsgElemUploadProgressCallbackFun {
    (callback: Buffer, user_data?: string): void;
}
interface TIMSetOnAddFriendCallbackFun {
    (callback: Buffer, user_data?: string): void;
}
interface TIMSetOnDeleteFriendCallbackFun {
    (callback: Buffer, user_data?: string): void;
}
interface TIMSetUpdateFriendProfileCallbackFun {
    (callback: Buffer, user_data?: string): void;
}
interface TIMSetFriendAddRequestCallbackFun {
    (callback: Buffer, user_data?: string): void;
}
interface TIMSetFriendApplicationListDeletedCallbackFun {
    (callback: Buffer, user_data?: string): void;
}
interface TIMSetFriendApplicationListReadCallbackFun {
    (callback: Buffer, user_data?: string): void;
}
interface TIMSetFriendBlackListAddedCallbackFun {
    (callback: Buffer, user_data?: string): void;
}
interface TIMSetFriendBlackListDeletedCallbackFun {
    (callback: Buffer, user_data?: string): void;
}
interface TIMSetMsgUpdateCallbackFun {
    (callback: Buffer, user_data?: string): void;
}
interface TIMSetLogCallbackLibFun {
    (callback: Buffer, user_data?: string): void;
}
interface TIMSetConfigLibFun {
    (json_config: string, callback: Buffer, user_data: string): number;
}
interface callExperimentalAPIFun {
    (json_param: string, callback: Buffer, user_data: string): number;
}
interface TIMProfileGetUserProfileListFun {
    (json_param: string, callback: Buffer, user_data: string): number;
}

interface TIMProfileModifySelfUserProfileFun {
    (json_param: string, callback: Buffer, user_data: string): number;
}
interface TIMGetUserStatus {
    (json_param: string, callback: Buffer, user_data: string): number;
}
interface TIMSetSelfStatus {
    (json_param: string, callback: Buffer, user_data: string): number;
}
interface TIMSubscribeUserStatus {
    (json_param: string, callback: Buffer, user_data: string): number;
}
interface TIMUnsubscribeUserStatus {
    (json_param: string, callback: Buffer, user_data: string): number;
}

interface TIMSubscribeUserInfo {
    (json_user_id_list: string, callback: Buffer, user_data: string): number;
}
interface TIMSetUserInfoChangedCallback {
    (callback: Buffer, user_data?: string): void;
}
// ==========Interface For friendship End===========

interface TIMMsgSendMessageReadReceiptsFun {
    (json_param: string, callback: Buffer, user_data: string): number;
}
interface TIMMsgGetMessageReadReceiptsFun {
    (json_param: string, callback: Buffer, user_data: string): number;
}
interface TIMMsgGetGroupMessageReadMemberListFun {
    (
        json_param: string,
        filter: number,
        next_seq: string,
        count: number,
        callback: Buffer,
        user_data: string
    ): number;
}

interface TIMMsgSetMessageExtensionsNative {
    (
        json_msg: string,
        json_extension_array: string,
        cb: Buffer,
        user_data: string
    ): number;
}
interface TIMMsgGetMessageExtensionsNative {
    (json_msg: string, cb: Buffer, user_data: string): number;
}
interface TIMMsgDeleteMessageExtensionsNative {
    (
        json_msg: string,
        json_extension_key_array: string,
        cb: Buffer,
        user_data: string
    ): number;
}

interface TIMMsgTranslateText {
    (
        json_source_text_array: string,
        source_language: string,
        target_language: string,
        cb: Buffer,
        user_data: string
    ): number;
}
interface TIMMsgConvertVoiceToText {
    (url: string, language: string, cb: Buffer, user_data: string): number;
}
interface TIMMsgSetOfflinePushToken {
    (json_token: string, cb: Buffer, user_data: string): number;
}

interface TIMSignalingInvite {
    (
        invitee: string,
        data: string,
        online_user_only: boolean,
        json_offline_push_info: string,
        timeout: number,
        invite_id_buffer: ArrayBuffer,
        cb: Buffer,
        user_data?: string
    ): number;
}

interface TIMSignalingInviteInGroup {
    (
        group_id: string,
        json_invitee_array: string,
        data: string,
        online_user_only: boolean,
        timeout: number,
        invite_id_buffer: ArrayBuffer,
        cb: Buffer,
        user_data?: string
    ): number;
}

interface TIMSignalingCancel {
    (invite_id: string, data: string, cb: Buffer, user_data?: string): number;
}

interface TIMSignalingAccept {
    (invite_id: string, data: string, cb: Buffer, user_data?: string): number;
}

interface TIMSignalingReject {
    (invite_id: string, data: string, cb: Buffer, user_data?: string): number;
}
interface TIMGetSignalingInfo {
    (json_msg: string, cb: Buffer, user_data?: string): number;
}

interface TIMSignalingModifyInvitation {
    (invite_id: string, data: string, cb: Buffer, user_data?: string): number;
}

interface TIMSetSignalingReceiveNewInvitationCallback {
    (callback: Buffer, user_data?: string): void;
}
interface TIMSetSignalingInviteeAcceptedCallback {
    (callback: Buffer, user_data?: string): void;
}
interface TIMSetSignalingInviteeRejectedCallback {
    (callback: Buffer, user_data?: string): void;
}
interface TIMSetSignalingInvitationCancelledCallback {
    (callback: Buffer, user_data?: string): void;
}
interface TIMSetSignalingInvitationTimeoutCallback {
    (callback: Buffer, user_data?: string): void;
}
interface TIMSetSignalingInvitationModifiedCallback {
    (callback: Buffer, user_data?: string): void;
}
interface libMethods {
    // timbase start
    TIMInit: TIMInitFun;
    TIMLogin: TIMLoginFun;
    TIMUninit: TIMUninitFun;
    TIMGetSDKVersion: TIMGetSDKVersionFun;
    TIMGetServerTime: TIMGetServerTimeFun;
    TIMLogout: TIMLogoutFun;
    TIMGetLoginStatus: TIMGetLoginStatusFun;
    TIMGetLoginUserID: TIMGetLoginUserIDFun;
    TIMSetNetworkStatusListenerCallback: TIMSetNetworkStatusListenerCallbackFun;
    TIMSetKickedOfflineCallback: TIMSetKickedOfflineCallbackFun;
    TIMSetUserSigExpiredCallback: TIMSetUserSigExpiredCallbackFun;
    TIMSetLogCallback: TIMSetLogCallbackLibFun;
    TIMSetConfig: TIMSetConfigLibFun;
    callExperimentalAPI: callExperimentalAPIFun;
    TIMProfileGetUserProfileList: TIMProfileGetUserProfileListFun;
    TIMProfileModifySelfUserProfile: TIMProfileModifySelfUserProfileFun;
    TIMSetSelfInfoUpdatedCallback: TIMSetSelfInfoUpdatedCallback;
    TIMSetUserStatusChangedCallback: TIMSetUserStatusChangedCallback;
    TIMGetUserStatus: TIMGetUserStatus;
    TIMSetSelfStatus: TIMSetSelfStatus;
    TIMSubscribeUserStatus: TIMSubscribeUserStatus;
    TIMUnsubscribeUserStatus: TIMUnsubscribeUserStatus;
    TIMSetUserInfoChangedCallback: TIMSetUserInfoChangedCallback;
    TIMSubscribeUserInfo: TIMSubscribeUserInfo;
    // timbase end

    // conversation start
    TIMConvCreate: TIMConvCreateFun;
    TIMConvGetConvList: TIMConvGetConvListFun;
    TIMConvDelete: TIMConvDeleteFun;
    TIMConvDeleteConversationList: TIMConvDeleteConversationList;
    TIMConvSetDraft: TIMConvSetDraftFun;
    TIMConvCancelDraft: TIMConvCancelDraftFun;
    TIMConvGetConvInfo: TIMConvGetConvInfoFun;
    TIMConvPinConversation: TIMConvPinConversationFun;
    TIMConvGetTotalUnreadMessageCount: TIMConvGetTotalUnreadMessageCountFun;
    TIMSetConvEventCallback: TIMSetConvEventCallbackFun;
    TIMSetConvTotalUnreadMessageCountChangedCallback: TIMSetConvTotalUnreadMessageCountChangedCallbackFun;
    TIMConvGetUnreadMessageCountByFilter: TIMConvGetUnreadMessageCountByFilter;
    TIMConvSubscribeUnreadMessageCountByFilter: TIMConvSubscribeUnreadMessageCountByFilter;
    TIMConvUnsubscribeUnreadMessageCountByFilter: TIMConvUnsubscribeUnreadMessageCountByFilter;
    TIMConvCleanConversationUnreadMessageCount: TIMConvCleanConversationUnreadMessageCount;
    TIMGroupIncreaseGroupCounter: TIMGroupIncreaseGroupCounter;
    TIMGroupDecreaseGroupCounter: TIMGroupDecreaseGroupCounter;
    TIMSetConvUnreadMessageCountChangedByFilterCallback: TIMSetConvUnreadMessageCountChangedByFilterCallback;
    TIMConvGetConversationListByFilter: TIMConvGetConversationListByFilter;
    TIMConvMarkConversation: TIMConvMarkConversation;
    TIMConvCreateConversationGroup: TIMConvCreateConversationGroup;
    TIMConvGetConversationGroupList: TIMConvGetConversationGroupList;
    TIMConvDeleteConversationGroup: TIMConvDeleteConversationGroup;
    TIMConvRenameConversationGroup: TIMConvRenameConversationGroup;
    TIMConvAddConversationsToGroup: TIMConvAddConversationsToGroup;
    TIMConvDeleteConversationsFromGroup: TIMConvDeleteConversationsFromGroup;
    TIMConvSetConversationCustomData: TIMConvSetConversationCustomData;
    // converastion end
    // friendship start
    TIMMsgSetMessageExtensions: TIMMsgSetMessageExtensionsNative;
    TIMMsgGetMessageExtensions: TIMMsgGetMessageExtensionsNative;
    TIMMsgDeleteMessageExtensions: TIMMsgDeleteMessageExtensionsNative;
    TIMFriendshipGetFriendProfileList: TIMFriendshipGetFriendProfileListFun;
    TIMFriendshipAddFriend: TIMFriendshipAddFriendFun;
    TIMFriendshipHandleFriendAddRequest: TIMFriendshipHandleFriendAddRequestFun;
    TIMFriendshipModifyFriendProfile: TIMFriendshipModifyFriendProfileFun;
    TIMFriendshipDeleteFriend: TIMFriendshipDeleteFriendFun;
    TIMFriendshipCheckFriendType: TIMFriendshipCheckFriendTypeFun;
    TIMFriendshipCreateFriendGroup: TIMFriendshipCreateFriendGroupFun;
    TIMFriendshipGetFriendGroupList: TIMFriendshipGetFriendGroupListFun;
    TIMFriendshipModifyFriendGroup: TIMFriendshipModifyFriendGroupFun;
    TIMFriendshipDeleteFriendGroup: TIMFriendshipDeleteFriendGroupFun;
    TIMFriendshipAddToBlackList: TIMFriendshipAddToBlackListFun;
    TIMFriendshipGetBlackList: TIMFriendshipGetBlackListFun;
    TIMFriendshipDeleteFromBlackList: TIMFriendshipDeleteFromBlackListFun;
    TIMFriendshipGetPendencyList: TIMFriendshipGetPendencyListFun;
    TIMFriendshipDeletePendency: TIMFriendshipDeletePendencyFun;
    TIMFriendshipReportPendencyReaded: TIMFriendshipReportPendencyReadedFun;
    TIMFriendshipSearchFriends: TIMFriendshipSearchFriendsFun;
    TIMFriendshipGetFriendsInfo: TIMFriendshipGetFriendsInfoFun;
    TIMMsgSendMessage: TIMMsgSendMessageFun;
    TIMMsgCancelSend: TIMMsgCancelSendFun;
    TIMMsgFindMessages: TIMMsgFindMessagesFun;
    TIMMsgReportReaded: TIMMsgReportReadedFun;
    TIMMsgModifyMessage: TIMMsgModifyMessage;
    TIMMsgRevoke: TIMMsgRevokeFun;
    TIMMsgFindByMsgLocatorList: TIMMsgFindByMsgLocatorListFun;
    TIMMsgImportMsgList: TIMMsgImportMsgListFun;
    TIMMsgSaveMsg: TIMMsgSaveMsgFun;
    TIMMsgGetMsgList: TIMMsgGetMsgListFun;
    TIMMsgDelete: TIMMsgDeleteFun;
    TIMMsgListDelete: TIMMsgListDeleteFun;
    TIMMsgClearHistoryMessage: TIMMsgClearHistoryMessageFun;
    TIMMsgSetC2CReceiveMessageOpt: TIMMsgSetC2CReceiveMessageOptFun;
    TIMMsgGetC2CReceiveMessageOpt: TIMMsgGetC2CReceiveMessageOptFun;
    TIMMsgSetGroupReceiveMessageOpt: TIMMsgSetGroupReceiveMessageOptFun;
    TIMMsgDownloadElemToPath: TIMMsgDownloadElemToPathFun;
    TIMMsgDownloadMergerMessage: TIMMsgDownloadMergerMessageFun;
    TIMMsgBatchSend: TIMMsgBatchSendFun;
    TIMMsgSearchLocalMessages: TIMMsgSearchLocalMessagesFun;
    TIMAddRecvNewMsgCallback: TIMAddRecvNewMsgCallbackFun;
    TIMRemoveRecvNewMsgCallback: TIMRemoveRecvNewMsgCallbackFun;
    TIMSetMsgReadedReceiptCallback: TIMSetMsgReadedReceiptCallbackFun;
    TIMSetMsgRevokeCallback: TIMSetMsgRevokeCallbackFun;
    TIMSetMsgElemUploadProgressCallback: TIMSetMsgElemUploadProgressCallbackFun;
    TIMSetOnAddFriendCallback: TIMSetOnAddFriendCallbackFun;
    TIMSetOnDeleteFriendCallback: TIMSetOnDeleteFriendCallbackFun;
    TIMSetUpdateFriendProfileCallback: TIMSetUpdateFriendProfileCallbackFun;
    TIMSetFriendAddRequestCallback: TIMSetFriendAddRequestCallbackFun;
    TIMSetFriendApplicationListDeletedCallback: TIMSetFriendApplicationListDeletedCallbackFun;
    TIMSetFriendApplicationListReadCallback: TIMSetFriendApplicationListReadCallbackFun;
    TIMSetFriendBlackListAddedCallback: TIMSetFriendBlackListAddedCallbackFun;
    TIMSetFriendBlackListDeletedCallback: TIMSetFriendBlackListDeletedCallbackFun;
    TIMSetMsgUpdateCallback: TIMSetMsgUpdateCallbackFun;
    TIMMsgTranslateText: TIMMsgTranslateText;
    TIMMsgConvertVoiceToText: TIMMsgConvertVoiceToText;
    // friendship end

    // group start
    TIMMsgSendMessageReadReceipts: TIMMsgSendMessageReadReceiptsFun;
    TIMMsgGetMessageReadReceipts: TIMMsgGetMessageReadReceiptsFun;
    TIMMsgGetGroupMessageReadMemberList: TIMMsgGetGroupMessageReadMemberListFun;
    TIMGroupCreate: TIMGroupCreateFun;
    TIMGroupDelete: TIMGroupDeleteFun;
    TIMGroupJoin: TIMGroupJoinFun;
    TIMGroupQuit: TIMGroupQuitFun;
    TIMGroupInviteMember: TIMGroupInviteMemberFun;
    TIMGroupDeleteMember: TIMGroupDeleteMemberFun;
    TIMGroupGetJoinedGroupList: TIMGroupGetJoinedGroupListFun;
    TIMGroupGetGroupInfoList: TIMGroupGetGroupInfoListFun;
    TIMGroupModifyGroupInfo: TIMGroupModifyGroupInfoFun;
    TIMGroupGetMemberInfoList: TIMGroupGetMemberInfoListFun;
    TIMGroupModifyMemberInfo: TIMGroupModifyMemberInfoFun;
    TIMGroupGetPendencyList: TIMGroupGetPendencyListFun;
    TIMGroupReportPendencyReaded: TIMGroupReportPendencyReadedFun;
    TIMGroupHandlePendency: TIMGroupHandlePendencyFun;
    TIMGroupGetOnlineMemberCount: TIMGroupGetOnlineMemberCountFun;
    TIMGroupSetGroupCounters: TIMGroupSetGroupCounters;
    TIMGroupGetGroupCounters: TIMGroupGetGroupCounters;
    TIMGroupSearchGroups: TIMGroupSearchGroupsFun;
    TIMGroupSearchGroupMembers: TIMGroupSearchGroupMembersFun;
    TIMGroupInitGroupAttributes: TIMGroupInitGroupAttributesFun;
    TIMGroupSetGroupAttributes: TIMGroupSetGroupAttributesFun;
    TIMGroupDeleteGroupAttributes: TIMGroupDeleteGroupAttributesFun;
    TIMGroupGetGroupAttributes: TIMGroupGetGroupAttributesFun;
    TIMSetGroupTipsEventCallback: TIMSetGroupTipsEventCallbackFun;
    TIMSetGroupAttributeChangedCallback: TIMSetGroupAttributeChangedCallbackFun;
    TIMSetGroupCounterChangedCallback: TIMSetGroupCounterChangedCallback;
    TIMSetGroupTopicCreatedCallback: TIMSetGroupTopicCreatedCallback;
    TIMSetGroupTopicDeletedCallback: TIMSetGroupTopicDeletedCallback;
    TIMSetGroupTopicChangedCallback: TIMSetGroupTopicChangedCallback;
    TIMSetMsgExtensionsChangedCallback: TIMSetUpdateFriendProfileCallbackFun;
    TIMSetMsgExtensionsDeletedCallback: TIMSetUpdateFriendProfileCallbackFun;
    TIMSetConvConversationGroupCreatedCallback: TIMSetConvConversationGroupCreatedCallback;
    TIMSetConvConversationGroupDeletedCallback: TIMSetConvConversationGroupDeletedCallback;
    TIMSetConvConversationGroupNameChangedCallback: TIMSetConvConversationGroupNameChangedCallback;
    TIMSetConvConversationsAddedToGroupCallback: TIMSetConvConversationsAddedToGroupCallback;
    TIMSetConvConversationsDeletedFromGroupCallback: TIMSetConvConversationsDeletedFromGroupCallback;
    TIMGroupGetJoinedCommunityList: TIMGroupGetJoinedCommunityList;
    TIMGroupCreateTopicInCommunity: TIMGroupCreateTopicInCommunity;
    TIMGroupDeleteTopicFromCommunity: TIMGroupDeleteTopicFromCommunity;
    TIMGroupSetTopicInfo: TIMGroupSetTopicInfo;
    TIMGroupGetTopicInfoList: TIMGroupGetTopicInfoList;
    // group end
    TIMMsgSetOfflinePushToken: TIMMsgSetOfflinePushToken;
    // signaling
    TIMSignalingInvite: TIMSignalingInvite;
    TIMSignalingInviteInGroup: TIMSignalingInviteInGroup;
    TIMSignalingCancel: TIMSignalingCancel;
    TIMSignalingAccept: TIMSignalingAccept;
    TIMSignalingReject: TIMSignalingReject;
    TIMGetSignalingInfo: TIMGetSignalingInfo;
    TIMSignalingModifyInvitation: TIMSignalingModifyInvitation;
    TIMSetSignalingReceiveNewInvitationCallback: TIMSetSignalingReceiveNewInvitationCallback;
    TIMSetSignalingInviteeAcceptedCallback: TIMSetSignalingInviteeAcceptedCallback;
    TIMSetSignalingInviteeRejectedCallback: TIMSetSignalingInviteeRejectedCallback;
    TIMSetSignalingInvitationCancelledCallback: TIMSetSignalingInvitationCancelledCallback;
    TIMSetSignalingInvitationTimeoutCallback: TIMSetSignalingInvitationTimeoutCallback;
    TIMSetSignalingInvitationModifiedCallback: TIMSetSignalingInvitationModifiedCallback;
}

export { libMethods };

import { TIMIPCLISTENR } from "./const/const";
import {
    loginParam,
    CreateGroupParams,
    logoutParam,
    GroupAttributeCallbackParams,
    InitGroupAttributeParams,
    DeleteAttributeParams,
    GroupTipsCallbackParams,
    TIMSetNetworkStatusListenerCallbackParam,
    DeleteGroupParams,
    DeleteMemberParams,
    GetGroupListParams,
    GetGroupMemberInfoParams,
    GetOnlineMemberCountParams,
    GetPendencyListParams,
    HandlePendencyParams,
    InviteMemberParams,
    // JoinGroupParams,
    ModifyGroupParams,
    ModifyMemberInfoParams,
    QuitGroupParams,
    ReportParams,
    SearchGroupParams,
    SearchMemberParams,
    GetFriendProfileListParams,
    AddFriendParams,
    DeleteFriendParams,
    ModifyFriendProfileParams,
    CheckFriendTypeParams,
    CreateFriendGroupParams,
    FriendshipStringArrayParams,
    GetBlackListParams,
    HandleFriendAddParams,
    ModifyFriendGroupParams,
    FriendshipGetPendencyListParams,
    DeletePendencyParams,
    ReportPendencyReadedParams,
    SearchFriendsParams,
    TIMSetUserSigExpiredCallbackParam,
    TIMSetKickedOfflineCallbackParam,
    TIMOnAddFriendCallbackParams,
    TIMOnDeleteFriendCallbackParams,
    TIMUpdateFriendProfileCallbackParams,
    TIMFriendAddRequestCallbackParams,
    TIMFriendApplicationListDeletedCallbackParams,
    TIMFriendApplicationListReadCallbackParams,
    TIMFriendBlackListAddedCallbackParams,
    TIMFriendBlackListDeletedCallbackParams,
    MsgSendMessageParams,
    MsgSendMessageParamsV2,
    MsgCancelSendParams,
    MsgFindMessagesParams,
    MsgReportReadedParams,
    MsgRevokeParams,
    MsgFindByMsgLocatorListParams,
    MsgImportMsgListParams,
    MsgSaveMsgParams,
    MsgGetMsgListParams,
    MsgDeleteParams,
    MsgListDeleteParams,
    MsgClearHistoryMessageParams,
    MsgSetC2CReceiveMessageOptParams,
    MsgGetC2CReceiveMessageOptParams,
    MsgSetGroupReceiveMessageOptParams,
    MsgDownloadElemToPathParams,
    MsgDownloadMergerMessageParams,
    MsgBatchSendParams,
    MsgSearchLocalMessagesParams,
    TIMRecvNewMsgCallbackParams,
    TIMMsgReadedReceiptCallbackParams,
    TIMMsgRevokeCallbackParams,
    TIMMsgElemUploadProgressCallbackParams,
    TIMMsgUpdateCallbackParams,
    TIMSetConfigParam,
    TIMSetLogCallbackParam,
    callExperimentalAPIParam,
    TIMProfileModifySelfUserProfileParam,
    TIMProfileGetUserProfileListParam,
    convCancelDraft,
    convCreate,
    convDelete,
    convGetConvInfo,
    convGetTotalUnreadMessageCount,
    convPinConversation,
    convSetDrat,
    convTotalUnreadMessageCountChangedCallbackParam,
    getConvList,
    setConvEventCallback,
    customDataTpl,
    initParam,
    MsgSendReplyMessage,
    MsgSendGroupMessageReceiptsParam,
    MsgGetGroupMessageReceiptsParam,
    MsgGetGroupMessageReadMembersParam,
    TIMMsgReadedReceiptCallbackFunc,
    TIMMsgElemUploadProgressCallbackFunc,
    GroupTipCallBackFun,
    convEventCallback,
    convTotalUnreadMessageCountChangedCallback,
    GroupAttributeCallbackFun,
    TIMFriendAddRequestCallbackFunc,
    TIMFriendApplicationListDeletedCallbackFunc,
    TIMFriendApplicationListReadCallbackFunc,
    TIMFriendBlackListAddedCallbackFunc,
    TIMFriendBlackListDeletedCallbackFunc,
    TIMMsgUpdateCallbackFunc,
    TIMOnAddFriendCallbackFunc,
    TIMOnDeleteFriendCallbackFunc,
    TIMSetKickedOfflineCallback,
    TIMSetNetworkStatusListenerCallback,
    TIMSetUserSigExpiredCallback,
    TIMUpdateFriendProfileCallbackFunc,
    MsgModifyMessageParams,
    commonResult,
    totalUnreadCountResult,
    userProfile,
    DeleteMemberResult,
    GroupInfo,
    GroupInfoResult,
    GetMemberInfoResult,
    GroupPendencyResult,
    GetOnlineMemberCountResult,
    SearchMemberResult,
    MessageReceipt,
    GroupMemberInfo,
    GroupAttributes,
    FriendProfile,
    FriendResult,
    CheckFriendTypeResult,
    FriendGroupInfo,
    PendencyPage,
    FriendInfoGetResult,
    convInfo,
    Json_value_msg,
    C2CRecvMsgOptResult,
    BatchSendResult,
    MessageSearchResult,
    TIMSetMsgExtensionsChangedCallbackParam,
    TIMSetMsgExtensionsDeletedCallbackParam,
    TIMMsgSetMessageExtensionsParam,
    TIMMsgGetMessageExtensionsParam,
    TIMMsgDeleteMessageExtensionsParam,
    CreateGroupResult,
    MessageExtensionResult,
    MessageExtension,
    TIMConversationListFilter,
    TIMConversationListResult,
    MarkConversationParam,
    TIMConversationOperationResult,
    createConversationGroupParam,
    getConvGroupList,
    convGroupListResult,
    deleteConvGroupParam,
    renameConvGroupParam,
    setConvCustomDataParam,
    OfflinePushToken,
    TIMRecvNewMsgCallbackFunc,
    GroupCounterParams,
    GroupCounter,
    IncreaseGroupCounterParam,
    DeleteConvListParam,
    CleanUnreadMessageCoutParam,
    GetGroupCounterParams,
    convUnreadMessageCountChangedByFilterCallbackParam,
    convTotalUnreadMessageCountChangedByFilterCallback,
    TIMSetSelfInfoUpdatedCallbackParam,
    TIMSetUserStatusChangedCallbackParam,
    TIMSelfInfoUpdatedCallback,
    TIMUserStatusChangedCallback,
    TIMMsgDownloadElemToPathFunc,
    userStatusParam,
    userStatus,
    setSelfStatusParam,
    convGroupCreatedCallbackParam,
    convGroupDeletedCallbackParam,
    convGroupNameChangedCallback,
    TIMConvConversationGroupCreatedCallback,
    TIMConvConversationGroupDeletedCallback,
    TIMConvConversationGroupNameChangedCallback,
    GetCommunityListParam,
    GroupBaseInfo,
    CreateTopicParam,
    DeleteTopicParam,
    TopicOperationResult,
    SetTopicInfoParam,
    GroupTopicInfoResult,
    GroupCounterChangedParam,
    TopicCreatedParam,
    TopicDeletedParam,
    TopicChangedParam,
    TIMGroupCounterChangedCallback,
    TIMGroupTopicCreatedCallback,
    TIMGroupTopicDeletedCallback,
    TIMGroupTopicChangedCallback,
    UserInfoChangedCallbackParam,
    SubscribeUserInfoParam,
    TIMUserInfoChangedCallback,
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
    TranslateTextParam,
    ConvertVoiceToTextParam,
    MessageTranslateTextResult,
    SetLocalCustomDataParam,
} from "./interface";
import { ipcData, Managers } from "./interface/ipcInterface";
import { ipcRenderer } from "electron";
import { TIMLoginStatus } from "./enum";
// import log from "./utils/log";
import { getCurrentWindow } from "@electron/remote";

interface JoinGroupParams {
    groupId: string;
    helloMsg?: string;
    data?: string;
}

interface TestInterface {
    a: string;
    b: string;
}

export default class TimRender {
    static runtime: Map<string, Function> = new Map();
    static isListened = false;
    private _currentWindowID = getCurrentWindow().id;
    static _recvNewMsgCallbackArray: Array<TIMRecvNewMsgCallbackFunc> =
        new Array();
    static _downloadCallbackArray: Array<TIMMsgDownloadElemToPathFunc> =
        new Array();
    static _downloadCallbacks: Map<string, Function> = new Map();
    constructor() {
        if (!TimRender.isListened) {
            ipcRenderer.on(`global-callback-reply`, (e: any, res: any) => {
                try {
                    const { callbackKey, responseData } = JSON.parse(res);
                    // log.info("事件回调返回渲染进程", JSON.parse(res));
                    if (this._getCallback(callbackKey)) {
                        //@ts-ignore
                        this._getCallback(callbackKey)(responseData);

                        // 处理信令的逻辑

                        // if (callbackKey === "TIMAddRecvNewMsgCallback") {
                        //     //收到消息
                        //     this._handleMessage(responseData[0]);
                        // }
                    }
                } catch (err) {
                    console.error("全局回调异常", err);
                }
            });

            TimRender.isListened = true;
        }
    }
    private async _handleMessage(message: any) {
        if (message) {
            try {
                const messageItems = JSON.parse(message);

                for (let j = 0; j < messageItems.length; j++) {
                    const { message_elem_array } = messageItems[j];
                    for (let i = 0; i < message_elem_array.length; i++) {
                        const { elem_type } = message_elem_array[i];
                        if (elem_type === 3) {
                            // 自定义消息
                            const { custom_elem_data } = message_elem_array[i];
                            try {
                                const parasedData =
                                    JSON.parse(custom_elem_data);
                                if (parasedData) {
                                    const { inviteID, actionType } =
                                        parasedData;
                                }
                            } catch (err) {
                                console.log(
                                    "IM_ELECTRON_SDK:尝试解析信令失败，业务可不关注"
                                );
                                // console.log(
                                //     "IM_ELECTRON_SDK:尝试解析信令失败，业务可不关注"
                                // );
                            }
                        }
                    }
                }
            } catch (err) {
                console.error("解析消息失败：", err);
            }
        }
    }
    private async _call<T>(data: any): Promise<T> {
        const response = await ipcRenderer.invoke(
            TIMIPCLISTENR,
            JSON.stringify(data)
        );
        if (response === undefined || response == "") {
            return JSON.parse("{}");
        }
        return JSON.parse(response);
    }

    private async _getCallInfo(inviteID: string): Promise<object> {
        const resStrng = await ipcRenderer.invoke(
            "_getCallInfo",
            JSON.stringify({ inviteID })
        );
        return resStrng ? JSON.parse(resStrng) : "";
    }
    private async _setCallInfo(inviteID: string, data: object) {
        await ipcRenderer.invoke(
            "_setCallInfo",
            JSON.stringify({
                inviteID,
                data,
            })
        );
    }
    private async _deleteCallInfo(inviteID: string) {
        await ipcRenderer.invoke(
            "_deleteCallInfo",
            JSON.stringify({
                inviteID,
            })
        );
    }
    testDoc(param: TestInterface) {}

    private getAbstractMsgText(message: any): string {
        const displayTextMsg = message && message.text_elem_content;
        const displayFileMsg = message && message.file_elem_file_name;
        const displayContent = {
            "0": displayTextMsg,
            "1": "[图片]",
            "2": "[声音]",
            "3": "[自定义消息]",
            "4": `[${displayFileMsg}]`,
            "5": "[群组系统消息]",
            "6": "[表情]",
            "7": "[位置]",
            "8": "[群组系统通知]",
            "9": "[视频]",
            "10": "[关系]",
            "11": "[资料]",
            "12": "[合并消息]",
        }[message.elem_type as number];
        return displayContent;
    }

    private _setCallback(key: string, callback: Function) {
        TimRender.runtime.set(`${key}_${this._currentWindowID}`, callback);
    }
    private _getCallback(key: string) {
        return TimRender.runtime.get(`${key}_${this._currentWindowID}`);
    }
    TIMConvGetTotalUnreadMessageCount(param: convGetTotalUnreadMessageCount) {
        const formatedData = {
            method: "TIMConvGetTotalUnreadMessageCount",
            manager: Managers.conversationManager,
            param: param,
        };
        return this._call<commonResult<totalUnreadCountResult>>(formatedData);
    }
    TIMConvGetUnreadMessageCountByFilter(param: TIMConversationListFilter) {
        const formatedData = {
            method: "TIMConvGetUnreadMessageCountByFilter",
            manager: Managers.conversationManager,
            param: param,
        };
        return this._call<commonResult<totalUnreadCountResult>>(formatedData);
    }
    TIMConvPinConversation(param: convPinConversation) {
        const formatedData = {
            method: "TIMConvPinConversation",
            manager: Managers.conversationManager,
            param: param,
        };
        return this._call<commonResult<string>>(formatedData);
    }
    TIMConvGetConvInfo(param: convGetConvInfo) {
        const formatedData = {
            method: "TIMConvGetConvInfo",
            manager: Managers.conversationManager,
            param: param,
        };
        return this._call<commonResult<Array<convInfo>>>(formatedData);
    }
    TIMConvCancelDraft(param: convCancelDraft) {
        const formatedData = {
            method: "TIMConvCancelDraft",
            manager: Managers.conversationManager,
            param: param,
        };
        return this._call<number>(formatedData);
    }
    TIMConvSetDraft(param: convSetDrat) {
        const formatedData = {
            method: "TIMConvSetDraft",
            manager: Managers.conversationManager,
            param: param,
        };
        return this._call<number>(formatedData);
    }
    TIMConvGetConvList(param: getConvList) {
        const formatedData = {
            method: "TIMConvGetConvList",
            manager: Managers.conversationManager,
            param: param,
        };
        return this._call<commonResult<Array<convInfo>>>(formatedData);
    }
    TIMConvDelete(param: convDelete) {
        const formatedData = {
            method: "TIMConvDelete",
            manager: Managers.conversationManager,
            param: param,
        };
        return this._call<commonResult<string>>(formatedData);
    }
    TIMConvDeleteConversationList(param: DeleteConvListParam) {
        const formatedData = {
            method: "TIMConvDeleteConversationList",
            manager: Managers.conversationManager,
            param: param,
        };
        return this._call<commonResult<Array<TIMConversationOperationResult>>>(
            formatedData
        );
    }
    TIMConvSubscribeUnreadMessageCountByFilter(
        param: TIMConversationListFilter
    ) {
        const formatedData = {
            method: "TIMConvSubscribeUnreadMessageCountByFilter",
            manager: Managers.conversationManager,
            param: param,
        };
        return this._call<number>(formatedData);
    }
    TIMConvUnsubscribeUnreadMessageCountByFilter(
        param: TIMConversationListFilter
    ) {
        const formatedData = {
            method: "TIMConvUnsubscribeUnreadMessageCountByFilter",
            manager: Managers.conversationManager,
            param: param,
        };
        return this._call<number>(formatedData);
    }
    TIMConvCleanConversationUnreadMessageCount(
        param: CleanUnreadMessageCoutParam
    ) {
        const formatedData = {
            method: "TIMConvCleanConversationUnreadMessageCount",
            manager: Managers.conversationManager,
            param: param,
        };
        return this._call<commonResult<Array<TIMConversationOperationResult>>>(
            formatedData
        );
    }
    TIMConvCreate(param: convCreate) {
        const formatedData = {
            method: "TIMConvCreate",
            manager: Managers.conversationManager,
            param: param,
        };
        return this._call<convInfo>(formatedData);
    }
    TIMConvGetConversationListByFilter(param: TIMConversationListFilter) {
        const formatedData = {
            method: "TIMConvGetConversationListByFilter",
            manager: Managers.conversationManager,
            param: param,
        };
        return this._call<commonResult<TIMConversationListResult>>(
            formatedData
        );
    }
    TIMConvMarkConversation(param: MarkConversationParam) {
        const formatedData = {
            method: "TIMConvMarkConversation",
            manager: Managers.conversationManager,
            param: param,
        };
        return this._call<commonResult<Array<TIMConversationOperationResult>>>(
            formatedData
        );
    }
    TIMConvCreateConversationGroup(param: createConversationGroupParam) {
        const formatedData = {
            method: "TIMConvCreateConversationGroup",
            manager: Managers.conversationManager,
            param: param,
        };
        return this._call<commonResult<Array<TIMConversationOperationResult>>>(
            formatedData
        );
    }
    TIMConvGetConversationGroupList(param: getConvGroupList) {
        const formatedData = {
            method: "TIMConvGetConversationGroupList",
            manager: Managers.conversationManager,
            param: param,
        };
        return this._call<commonResult<convGroupListResult>>(formatedData);
    }
    TIMConvDeleteConversationGroup(param: deleteConvGroupParam) {
        const formatedData = {
            method: "TIMConvDeleteConversationGroup",
            manager: Managers.conversationManager,
            param: param,
        };
        return this._call<commonResult<string>>(formatedData);
    }
    TIMConvRenameConversationGroup(param: renameConvGroupParam) {
        const formatedData = {
            method: "TIMConvRenameConversationGroup",
            manager: Managers.conversationManager,
            param: param,
        };
        return this._call<commonResult<string>>(formatedData);
    }
    TIMConvAddConversationsToGroup(param: createConversationGroupParam) {
        const formatedData = {
            method: "TIMConvAddConversationsToGroup",
            manager: Managers.conversationManager,
            param: param,
        };
        return this._call<commonResult<Array<TIMConversationOperationResult>>>(
            formatedData
        );
    }
    TIMConvDeleteConversationsFromGroup(param: createConversationGroupParam) {
        const formatedData = {
            method: "TIMConvDeleteConversationsFromGroup",
            manager: Managers.conversationManager,
            param: param,
        };
        return this._call<commonResult<Array<TIMConversationOperationResult>>>(
            formatedData
        );
    }
    TIMConvSetConversationCustomData(param: setConvCustomDataParam) {
        const formatedData = {
            method: "TIMConvSetConversationCustomData",
            manager: Managers.conversationManager,
            param: param,
        };
        return this._call<commonResult<Array<TIMConversationOperationResult>>>(
            formatedData
        );
    }
    TIMSetConvTotalUnreadMessageCountChangedCallback(
        param: convTotalUnreadMessageCountChangedCallbackParam
    ) {
        const callback = `TIMSetConvTotalUnreadMessageCountChangedCallback`;
        this._setCallback(callback, param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: "TIMSetConvTotalUnreadMessageCountChangedCallback",
            manager: Managers.conversationManager,
            callback,
            windowID: this._currentWindowID,
            param: param,
        };
        return this._call<void>(formatedData);
    }
    TIMSetConvUnreadMessageCountChangedByFilterCallback(
        param: convUnreadMessageCountChangedByFilterCallbackParam
    ) {
        const callback = "TIMSetConvUnreadMessageCountChangedByFilterCallback";
        this._setCallInfo(callback, param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: "TIMSetConvUnreadMessageCountChangedByFilterCallback",
            manager: Managers.conversationManager,
            callback,
            windowID: this._currentWindowID,
            param: param,
        };
        return this._call<void>(formatedData);
    }
    TIMSetConvEventCallback(param: setConvEventCallback) {
        const callback = `TIMSetConvEventCallback`;
        this._setCallback(callback, param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: "TIMSetConvEventCallback",
            manager: Managers.conversationManager,
            callback,
            windowID: this._currentWindowID,
            param: param,
        };
        return this._call<any>(formatedData);
    }
    TIMSetConvConversationGroupCreatedCallback(
        param: convGroupCreatedCallbackParam
    ) {
        const callback = `TIMSetConvConversationGroupCreatedCallback`;
        this._setCallback(callback, param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: "TIMSetConvConversationGroupCreatedCallback",
            manager: Managers.conversationManager,
            callback,
            windowID: this._currentWindowID,
            param: param,
        };
        return this._call<any>(formatedData);
    }
    TIMSetConvConversationGroupDeletedCallback(
        param: convGroupDeletedCallbackParam
    ) {
        const callback = `TIMSetConvConversationGroupDeletedCallback`;
        this._setCallback(callback, param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: "TIMSetConvConversationGroupDeletedCallback",
            manager: Managers.conversationManager,
            callback,
            windowID: this._currentWindowID,
            param: param,
        };
        return this._call<any>(formatedData);
    }
    TIMSetConvConversationGroupNameChangedCallback(
        param: convGroupNameChangedCallback
    ) {
        const callback = `TIMSetConvConversationGroupNameChangedCallback`;
        this._setCallback(callback, param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: "TIMSetConvConversationGroupNameChangedCallback",
            manager: Managers.conversationManager,
            callback,
            windowID: this._currentWindowID,
            param: param,
        };
        return this._call<any>(formatedData);
    }
    TIMSetConvConversationsAddedToGroupCallback(
        param: convGroupCreatedCallbackParam
    ) {
        const callback = `TIMSetConvConversationsAddedToGroupCallback`;
        this._setCallback(callback, param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: "TIMSetConvConversationsAddedToGroupCallback",
            manager: Managers.conversationManager,
            callback,
            windowID: this._currentWindowID,
            param: param,
        };
        return this._call<any>(formatedData);
    }
    TIMSetConvConversationsDeletedFromGroupCallback(
        param: convGroupCreatedCallbackParam
    ) {
        const callback = `TIMSetConvConversationsDeletedFromGroupCallback`;
        this._setCallback(callback, param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: "TIMSetConvConversationsDeletedFromGroupCallback",
            manager: Managers.conversationManager,
            callback,
            windowID: this._currentWindowID,
            param: param,
        };
        return this._call<any>(formatedData);
    }
    TIMSetUserSigExpiredCallback(param: TIMSetUserSigExpiredCallbackParam) {
        const callback = `TIMSetUserSigExpiredCallback`;
        this._setCallback(callback, param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: "TIMSetUserSigExpiredCallback",
            manager: Managers.timBaseManager,
            callback,
            windowID: this._currentWindowID,
            param: param,
        };
        return this._call<any>(formatedData);
    }
    TIMSetKickedOfflineCallback(param: TIMSetKickedOfflineCallbackParam) {
        const callback = `TIMSetKickedOfflineCallback`;
        this._setCallback(callback, param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: "TIMSetKickedOfflineCallback",
            manager: Managers.timBaseManager,
            callback,
            windowID: this._currentWindowID,
            param: param,
        };
        return this._call<any>(formatedData);
    }
    TIMSetNetworkStatusListenerCallback(
        param: TIMSetNetworkStatusListenerCallbackParam
    ) {
        const callback = `TIMSetNetworkStatusListenerCallback`;
        this._setCallback(callback, param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: "TIMSetNetworkStatusListenerCallback",
            manager: Managers.timBaseManager,
            callback,
            windowID: this._currentWindowID,
            param: param,
        };
        return this._call<any>(formatedData);
    }
    TIMSetSelfInfoUpdatedCallback(param: TIMSetSelfInfoUpdatedCallbackParam) {
        const callback = `TIMSetSelfInfoUpdatedCallback`;
        this._setCallback(callback, param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: "TIMSetSelfInfoUpdatedCallback",
            manager: Managers.timBaseManager,
            callback,
            windowID: this._currentWindowID,
            param: param,
        };
        return this._call<any>(formatedData);
    }
    TIMSubscribeUserInfo(param: SubscribeUserInfoParam) {
        const formatedData = {
            method: "TIMSubscribeUserInfo",
            manager: Managers.conversationManager,
            param: param,
        };
        return this._call<commonResult<string>>(formatedData);
    }
    TIMSetUserInfoChangedCallback(param: UserInfoChangedCallbackParam) {
        const callback = `TIMSetUserInfoChangedCallback`;
        this._setCallback(callback, param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: "TIMSetUserInfoChangedCallback",
            manager: Managers.timBaseManager,
            callback,
            windowID: this._currentWindowID,
            param: param,
        };
        return this._call<any>(formatedData);
    }
    TIMSetUserStatusChangedCallback(
        param: TIMSetUserStatusChangedCallbackParam
    ) {
        const callback = `TIMSetUserStatusChangedCallback`;
        this._setCallback(callback, param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: "TIMSetUserStatusChangedCallback",
            manager: Managers.timBaseManager,
            callback,
            windowID: this._currentWindowID,
            param: param,
        };
        return this._call<any>(formatedData);
    }
    TIMSetLogCallback(param: TIMSetLogCallbackParam) {
        const callback = `TIMSetLogCallback`;
        this._setCallback(callback, param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: "TIMSetLogCallback",
            manager: Managers.timBaseManager,
            callback,
            windowID: this._currentWindowID,
            param: param,
        };
        return this._call<any>(formatedData);
    }
    TIMUninit() {
        const formatedData = {
            method: "TIMUninit",
            manager: Managers.timBaseManager,
        };
        return this._call<number>(formatedData);
    }
    TIMSetConfig(param: TIMSetConfigParam) {
        const formatedData = {
            method: "TIMSetConfig",
            manager: Managers.timBaseManager,
            param: param,
        };
        return this._call<any>(formatedData);
    }
    TIMGetSDKVersion() {
        const formatedData = {
            method: "TIMGetSDKVersion",
            manager: Managers.timBaseManager,
        };
        return this._call<Buffer>(formatedData);
    }
    TIMGetServerTime() {
        const formatedData = {
            method: "TIMGetServerTime",
            manager: Managers.timBaseManager,
        };
        return this._call<number>(formatedData);
    }
    async TIMLogout(param: logoutParam) {
        TimRender._recvNewMsgCallbackArray = [];
        await this.TIMRemoveRecvNewMsgCallback();
        await this.TIMSetMsgReadedReceiptCallback({
            callback: null as unknown as TIMMsgReadedReceiptCallbackFunc,
        });
        await this.TIMSetMsgRevokeCallback({
            callback: null as unknown as TIMMsgReadedReceiptCallbackFunc,
        });
        await this.TIMSetMsgElemUploadProgressCallback({
            callback: null as unknown as TIMMsgElemUploadProgressCallbackFunc,
        });
        await this.TIMSetGroupTipsEventCallback({
            callback: null as unknown as GroupTipCallBackFun,
        });
        await this.TIMSetGroupAttributeChangedCallback({
            callback: null as unknown as GroupAttributeCallbackFun,
        });
        await this.TIMSetGroupAttributeChangedCallback({
            callback: null as unknown as GroupAttributeCallbackFun,
        });
        await this.TIMSetGroupCounterChangedCallback({
            callback: null as unknown as TIMGroupCounterChangedCallback,
        });
        await this.TIMSetGroupTopicCreatedCallback({
            callback: null as unknown as TIMGroupTopicCreatedCallback,
        });
        await this.TIMSetGroupTopicDeletedCallback({
            callback: null as unknown as TIMGroupTopicDeletedCallback,
        });
        await this.TIMSetGroupTopicChangedCallback({
            callback: null as unknown as TIMGroupTopicChangedCallback,
        });
        await this.TIMSetConvEventCallback({
            callback: null as unknown as convEventCallback,
        });
        await this.TIMSetConvTotalUnreadMessageCountChangedCallback({
            callback:
                null as unknown as convTotalUnreadMessageCountChangedCallback,
        });
        await this.TIMSetConvUnreadMessageCountChangedByFilterCallback({
            callback:
                null as unknown as convTotalUnreadMessageCountChangedByFilterCallback,
        });
        await this.TIMSetNetworkStatusListenerCallback({
            callback: null as unknown as TIMSetNetworkStatusListenerCallback,
            userData: "",
        });
        await this.TIMSetSelfInfoUpdatedCallback({
            callback: null as unknown as TIMSelfInfoUpdatedCallback,
            user_data: "",
        });
        await this.TIMSetUserInfoChangedCallback({
            callback: null as unknown as TIMUserInfoChangedCallback,
            user_data: "",
        });

        await this.TIMSetUserStatusChangedCallback({
            callback: null as unknown as TIMUserStatusChangedCallback,
            user_data: "",
        });
        await this.TIMSetConvConversationGroupCreatedCallback({
            callback:
                null as unknown as TIMConvConversationGroupCreatedCallback,
            user_data: "",
        });
        await this.TIMSetConvConversationGroupDeletedCallback({
            callback:
                null as unknown as TIMConvConversationGroupDeletedCallback,
            user_data: "",
        });
        await this.TIMSetConvConversationGroupNameChangedCallback({
            callback:
                null as unknown as TIMConvConversationGroupNameChangedCallback,
            user_data: "",
        });
        await this.TIMSetConvConversationsAddedToGroupCallback({
            callback:
                null as unknown as TIMConvConversationGroupCreatedCallback,
            user_data: "",
        });
        await this.TIMSetConvConversationsDeletedFromGroupCallback({
            callback:
                null as unknown as TIMConvConversationGroupCreatedCallback,
            user_data: "",
        });

        await this.TIMSetKickedOfflineCallback({
            callback: null as unknown as TIMSetKickedOfflineCallback,
            userData: "",
        });
        await this.TIMSetUserSigExpiredCallback({
            callback: null as unknown as TIMSetUserSigExpiredCallback,
            userData: "",
        });
        await this.TIMSetOnAddFriendCallback({
            callback: null as unknown as TIMOnAddFriendCallbackFunc,
        });
        await this.TIMSetOnDeleteFriendCallback({
            callback: null as unknown as TIMOnDeleteFriendCallbackFunc,
        });
        await this.TIMSetUpdateFriendProfileCallback({
            callback: null as unknown as TIMUpdateFriendProfileCallbackFunc,
        });
        await this.TIMSetFriendAddRequestCallback({
            callback: null as unknown as TIMFriendAddRequestCallbackFunc,
        });
        await this.TIMSetFriendApplicationListDeletedCallback({
            callback:
                null as unknown as TIMFriendApplicationListDeletedCallbackFunc,
        });
        await this.TIMSetFriendApplicationListReadCallback({
            callback:
                null as unknown as TIMFriendApplicationListReadCallbackFunc,
        });
        await this.TIMSetFriendBlackListAddedCallback({
            callback: null as unknown as TIMFriendBlackListAddedCallbackFunc,
        });
        await this.TIMSetFriendBlackListDeletedCallback({
            callback: null as unknown as TIMFriendBlackListDeletedCallbackFunc,
        });
        await this.TIMSetMsgUpdateCallback({
            callback: null as unknown as TIMMsgUpdateCallbackFunc,
        });

        const formatedData = {
            method: "TIMLogout",
            manager: Managers.timBaseManager,
            param: param,
        };
        return this._call<commonResult<string>>(formatedData);
    }
    TIMInit(param?: initParam) {
        return this._call<number>({
            method: "TIMInit",
            manager: Managers.timBaseManager,
            param: param,
        });
    }
    TIMGetLoginStatus() {
        const formatedData = {
            method: "TIMGetLoginStatus",
            manager: Managers.timBaseManager,
        };
        return this._call<TIMLoginStatus>(formatedData);
    }
    TIMGetLoginUserID() {
        const formatedData = {
            method: "TIMGetLoginUserID",
            manager: Managers.timBaseManager,
            param: {},
        };
        return this._call<commonResult<string>>(formatedData);
    }
    callExperimentalAPI(param: callExperimentalAPIParam) {
        const formatedData = {
            method: "callExperimentalAPI",
            manager: Managers.timBaseManager,
            param: param,
        };
        return this._call<commonResult<string>>(formatedData);
    }
    TIMLogin(data: loginParam) {
        const formatedData = {
            method: "TIMLogin",
            manager: Managers.timBaseManager,
            param: data,
        };
        return this._call<commonResult<string>>(formatedData);
    }
    TIMProfileGetUserProfileList(param: TIMProfileGetUserProfileListParam) {
        const formatedData = {
            method: "TIMProfileGetUserProfileList",
            manager: Managers.timBaseManager,
            param: param,
        };
        return this._call<commonResult<Array<userProfile>>>(formatedData);
    }
    TIMProfileModifySelfUserProfile(
        param: TIMProfileModifySelfUserProfileParam
    ) {
        const formatedData = {
            method: "TIMProfileModifySelfUserProfile",
            manager: Managers.timBaseManager,
            param: param,
        };
        return this._call<commonResult<string>>(formatedData);
    }
    TIMGetUserStatus(param: userStatusParam) {
        const formatedData = {
            method: "TIMGetUserStatus",
            manager: Managers.timBaseManager,
            param: param,
        };
        return this._call<commonResult<Array<userStatus>>>(formatedData);
    }
    TIMSetSelfStatus(param: setSelfStatusParam) {
        const formatedData = {
            method: "TIMSetSelfStatus",
            manager: Managers.timBaseManager,
            param: param,
        };
        return this._call<commonResult<string>>(formatedData);
    }
    TIMSubscribeUserStatus(param: userStatusParam) {
        const formatedData = {
            method: "TIMSubscribeUserStatus",
            manager: Managers.timBaseManager,
            param: param,
        };
        return this._call<commonResult<string>>(formatedData);
    }
    TIMUnsubscribeUserStatus(param: userStatusParam) {
        const formatedData = {
            method: "TIMUnsubscribeUserStatus",
            manager: Managers.timBaseManager,
            param: param,
        };
        return this._call<commonResult<string>>(formatedData);
    }
    /**
     * @param data  Comment for parameter ´text´.
     */

    TIMGroupCreate(data: CreateGroupParams) {
        const formatedData: ipcData<CreateGroupParams> = {
            method: "TIMGroupCreate",
            manager: Managers.groupManager,
            param: data,
        };
        return this._call<commonResult<CreateGroupResult>>(formatedData);
    }

    TIMGroupInitGroupAttributes(
        initAttributesParams: InitGroupAttributeParams
    ) {
        const formatedData = {
            method: "TIMGroupInitGroupAttributes",
            manager: Managers.groupManager,
            param: initAttributesParams,
        };
        return this._call<commonResult<string>>(formatedData);
    }

    TIMGroupSetGroupAttributes(setAttributesParams: InitGroupAttributeParams) {
        const formatedData = {
            method: "TIMGroupSetGroupAttributes",
            manager: Managers.groupManager,
            param: setAttributesParams,
        };
        return this._call<commonResult<string>>(formatedData);
    }

    TIMGroupDeleteGroupAttributes(
        deleteAttributesParams: DeleteAttributeParams
    ) {
        const formatedData = {
            method: "TIMGroupDeleteGroupAttributes",
            manager: Managers.groupManager,
            param: deleteAttributesParams,
        };
        return this._call<commonResult<string>>(formatedData);
    }

    TIMGroupGetGroupAttributes(getAttributeParams: DeleteAttributeParams) {
        const formatedData = {
            method: "TIMGroupGetGroupAttributes",
            manager: Managers.groupManager,
            param: getAttributeParams,
        };
        return this._call<commonResult<Array<GroupAttributes>>>(formatedData);
    }

    TIMGroupGetJoinedCommunityList(data: GetCommunityListParam) {
        const formatedData = {
            method: "TIMGroupGetJoinedCommunityList",
            manager: Managers.groupManager,
            param: data,
        };
        return this._call<commonResult<Array<GroupBaseInfo>>>(formatedData);
    }

    TIMGroupCreateTopicInCommunity(data: CreateTopicParam) {
        const formatedData = {
            method: "TIMGroupCreateTopicInCommunity",
            manager: Managers.groupManager,
            param: data,
        };
        return this._call<commonResult<string>>(formatedData);
    }

    TIMGroupDeleteTopicFromCommunity(data: DeleteTopicParam) {
        const formatedData = {
            method: "TIMGroupDeleteTopicFromCommunity",
            manager: Managers.groupManager,
            param: data,
        };
        return this._call<commonResult<Array<TopicOperationResult>>>(
            formatedData
        );
    }

    TIMGroupSetTopicInfo(data: SetTopicInfoParam) {
        const formatedData = {
            method: "TIMGroupSetTopicInfo",
            manager: Managers.groupManager,
            param: data,
        };
        return this._call<commonResult<string>>(formatedData);
    }

    TIMGroupGetTopicInfoList(data: DeleteTopicParam) {
        const formatedData = {
            method: "TIMGroupGetTopicInfoList",
            manager: Managers.groupManager,
            param: data,
        };
        return this._call<commonResult<Array<GroupTopicInfoResult>>>(
            formatedData
        );
    }

    TIMSetGroupAttributeChangedCallback(data: GroupAttributeCallbackParams) {
        const callback = "TIMSetGroupAttributeChangedCallback";
        const formatedData = {
            method: "TIMSetGroupAttributeChangedCallback",
            manager: Managers.groupManager,
            callback,
            windowID: this._currentWindowID,
            param: data,
        };

        this._setCallback(callback, data.callback as unknown as Function);
        return this._call<void>(formatedData);
    }
    TIMSetGroupCounterChangedCallback(data: GroupCounterChangedParam) {
        const callback = "TIMSetGroupCounterChangedCallback";
        const formatedData = {
            method: "TIMSetGroupCounterChangedCallback",
            manager: Managers.groupManager,
            callback,
            windowID: this._currentWindowID,
            param: data,
        };

        this._setCallback(callback, data.callback as unknown as Function);
        return this._call<void>(formatedData);
    }
    TIMSetGroupTopicCreatedCallback(data: TopicCreatedParam) {
        const callback = "TIMSetGroupTopicCreatedCallback";
        const formatedData = {
            method: "TIMSetGroupTopicCreatedCallback",
            manager: Managers.groupManager,
            callback,
            windowID: this._currentWindowID,
            param: data,
        };

        this._setCallback(callback, data.callback as unknown as Function);
        return this._call<void>(formatedData);
    }
    TIMSetGroupTopicDeletedCallback(data: TopicDeletedParam) {
        const callback = "TIMSetGroupTopicDeletedCallback";
        const formatedData = {
            method: "TIMSetGroupTopicDeletedCallback",
            manager: Managers.groupManager,
            callback,
            windowID: this._currentWindowID,
            param: data,
        };

        this._setCallback(callback, data.callback as unknown as Function);
        return this._call<void>(formatedData);
    }
    TIMSetGroupTopicChangedCallback(data: TopicChangedParam) {
        const callback = "TIMSetGroupTopicChangedCallback";
        const formatedData = {
            method: "TIMSetGroupTopicChangedCallback",
            manager: Managers.groupManager,
            callback,
            windowID: this._currentWindowID,
            param: data,
        };

        this._setCallback(callback, data.callback as unknown as Function);
        return this._call<void>(formatedData);
    }

    TIMSetGroupTipsEventCallback(data: GroupTipsCallbackParams) {
        const callback = "TIMSetGroupTipsEventCallback";
        const formatedData = {
            method: "TIMSetGroupTipsEventCallback",
            manager: Managers.groupManager,
            callback,
            windowID: this._currentWindowID,
            param: data,
        };

        this._setCallback(callback, data.callback as unknown as Function);
        return this._call<void>(formatedData);
    }

    TIMGroupDelete(data: DeleteGroupParams) {
        const formatedData = {
            method: "TIMGroupDelete",
            manager: Managers.groupManager,
            param: data,
        };

        return this._call<commonResult<string>>(formatedData);
    }

    TIMGroupJoin(joinGroupParams: JoinGroupParams) {
        const formatedData = {
            method: "TIMGroupJoin",
            manager: Managers.groupManager,
            param: joinGroupParams,
        };

        return this._call<commonResult<string>>(formatedData);
    }

    TIMGroupQuit(quitGroupParams: QuitGroupParams) {
        const formatedData = {
            method: "TIMGroupQuit",
            manager: Managers.groupManager,
            param: quitGroupParams,
        };

        return this._call<commonResult<string>>(formatedData);
    }

    TIMGroupInviteMember(inviteMemberParams: InviteMemberParams) {
        const formatedData = {
            method: "TIMGroupInviteMember",
            manager: Managers.groupManager,
            param: inviteMemberParams,
        };

        return this._call<commonResult<string>>(formatedData);
    }

    TIMGroupDeleteMember(deleteMemberParams: DeleteMemberParams) {
        const formatedData = {
            method: "TIMGroupDeleteMember",
            manager: Managers.groupManager,
            param: deleteMemberParams,
        };

        return this._call<commonResult<DeleteMemberResult>>(formatedData);
    }

    TIMGroupGetJoinedGroupList(data?: string) {
        const formatedData = {
            method: "TIMGroupGetJoinedGroupList",
            manager: Managers.groupManager,
            param: data,
        };

        return this._call<commonResult<Array<GroupInfo>>>(formatedData);
    }

    TIMGroupGetGroupInfoList(getGroupListParams: GetGroupListParams) {
        const formatedData = {
            method: "TIMGroupGetGroupInfoList",
            manager: Managers.groupManager,
            param: getGroupListParams,
        };

        return this._call<commonResult<Array<GroupInfoResult>>>(formatedData);
    }
    TIMMsgSendMessageReadReceipts(
        msgSendGroupMessageReceipts: MsgSendGroupMessageReceiptsParam
    ) {
        const formatedData = {
            method: "TIMMsgSendMessageReadReceipts",
            manager: Managers.groupManager,
            param: msgSendGroupMessageReceipts,
        };

        return this._call<commonResult<string>>(formatedData);
    }
    TIMMsgGetMessageReadReceipts(
        msgGetGroupMessageReceipts: MsgGetGroupMessageReceiptsParam
    ) {
        const formatedData = {
            method: "TIMMsgGetMessageReadReceipts",
            manager: Managers.groupManager,
            param: msgGetGroupMessageReceipts,
        };

        return this._call<commonResult<Array<MessageReceipt>>>(formatedData);
    }
    TIMMsgGetGroupMessageReadMemberList(
        msgGetGroupMessageReadMembers: MsgGetGroupMessageReadMembersParam
    ) {
        const formatedData = {
            method: "TIMMsgGetGroupMessageReadMemberList",
            manager: Managers.groupManager,
            param: msgGetGroupMessageReadMembers,
        };

        return this._call<commonResult<Array<GroupMemberInfo>>>(formatedData);
    }

    TIMGroupModifyGroupInfo(modifyGroupParams: ModifyGroupParams) {
        const formatedData = {
            method: "TIMGroupModifyGroupInfo",
            manager: Managers.groupManager,
            param: modifyGroupParams,
        };

        return this._call<commonResult<string>>(formatedData);
    }

    TIMGroupGetMemberInfoList(
        getGroupMemberInfoParams: GetGroupMemberInfoParams
    ) {
        const formatedData = {
            method: "TIMGroupGetMemberInfoList",
            manager: Managers.groupManager,
            param: getGroupMemberInfoParams,
        };

        return this._call<commonResult<GetMemberInfoResult>>(formatedData);
    }

    TIMGroupModifyMemberInfo(modifyMemberInfoParams: ModifyMemberInfoParams) {
        const formatedData = {
            method: "TIMGroupModifyMemberInfo",
            manager: Managers.groupManager,
            param: modifyMemberInfoParams,
        };

        return this._call<commonResult<string>>(formatedData);
    }

    TIMGroupGetPendencyList(getPendencyListParams: GetPendencyListParams) {
        const formatedData = {
            method: "TIMGroupGetPendencyList",
            manager: Managers.groupManager,
            param: getPendencyListParams,
        };

        return this._call<commonResult<GroupPendencyResult>>(formatedData);
    }

    TIMGroupReportPendencyReaded(reportParams: ReportParams) {
        const formatedData = {
            method: "TIMGroupReportPendencyReaded",
            manager: Managers.groupManager,
            param: reportParams,
        };

        return this._call<commonResult<string>>(formatedData);
    }

    TIMGroupHandlePendency(handlePendencyParams: HandlePendencyParams) {
        const formatedData = {
            method: "TIMGroupHandlePendency",
            manager: Managers.groupManager,
            param: handlePendencyParams,
        };

        return this._call<string>(formatedData);
    }

    TIMGroupGetOnlineMemberCount(params: GetOnlineMemberCountParams) {
        const formatedData = {
            method: "TIMGroupGetOnlineMemberCount",
            manager: Managers.groupManager,
            param: params,
        };

        return this._call<commonResult<GetOnlineMemberCountResult>>(
            formatedData
        );
    }
    TIMGroupSetGroupCounters(params: GroupCounterParams) {
        const formatedData = {
            method: "TIMGroupSetGroupCounters",
            manager: Managers.groupManager,
            param: params,
        };

        return this._call<commonResult<Array<GroupCounter>>>(formatedData);
    }
    TIMGroupGetGroupCounters(params: GetGroupCounterParams) {
        const formatedData = {
            method: "TIMGroupGetGroupCounters",
            manager: Managers.groupManager,
            param: params,
        };

        return this._call<commonResult<Array<GroupCounter>>>(formatedData);
    }
    TIMGroupIncreaseGroupCounter(params: IncreaseGroupCounterParam) {
        const formatedData = {
            method: "TIMGroupIncreaseGroupCounter",
            manager: Managers.groupManager,
            param: params,
        };

        return this._call<commonResult<Array<GroupCounter>>>(formatedData);
    }
    TIMGroupDecreaseGroupCounter(params: IncreaseGroupCounterParam) {
        const formatedData = {
            method: "TIMGroupDecreaseGroupCounter",
            manager: Managers.groupManager,
            param: params,
        };

        return this._call<commonResult<Array<GroupCounter>>>(formatedData);
    }
    TIMGroupSearchGroups(searchGroupsParams: SearchGroupParams) {
        const formatedData = {
            method: "TIMGroupSearchGroups",
            manager: Managers.groupManager,
            param: searchGroupsParams,
        };

        return this._call<commonResult<Array<GroupInfo>>>(formatedData);
    }

    TIMGroupSearchGroupMembers(searchMemberParams: SearchMemberParams) {
        const formatedData = {
            method: "TIMGroupSearchGroupMembers",
            manager: Managers.groupManager,
            param: searchMemberParams,
        };

        return this._call<commonResult<Array<SearchMemberResult>>>(
            formatedData
        );
    }

    TIMFriendshipGetFriendProfileList(
        getFriendProfileListParams: GetFriendProfileListParams
    ) {
        const formatedData = {
            method: "TIMFriendshipGetFriendProfileList",
            manager: Managers.friendshipManager,
            param: getFriendProfileListParams,
        };

        return this._call<commonResult<Array<FriendProfile>>>(formatedData);
    }

    TIMFriendshipAddFriend(addFriendParams: AddFriendParams) {
        const formatedData = {
            method: "TIMFriendshipAddFriend",
            manager: Managers.friendshipManager,
            param: addFriendParams,
        };

        return this._call<commonResult<FriendResult>>(formatedData);
    }

    TIMFriendshipHandleFriendAddRequest(
        handleFriendAddParams: HandleFriendAddParams
    ) {
        const formatedData = {
            method: "TIMFriendshipHandleFriendAddRequest",
            manager: Managers.friendshipManager,
            param: handleFriendAddParams,
        };

        return this._call<commonResult<FriendResult>>(formatedData);
    }

    TIMFriendshipModifyFriendProfile(
        modifyFriendProfileParams: ModifyFriendProfileParams
    ) {
        const formatedData = {
            method: "TIMFriendshipModifyFriendProfile",
            manager: Managers.friendshipManager,
            param: modifyFriendProfileParams,
        };

        return this._call<commonResult<string>>(formatedData);
    }

    TIMFriendshipDeleteFriend(deleteFriendParams: DeleteFriendParams) {
        const formatedData = {
            method: "TIMFriendshipDeleteFriend",
            manager: Managers.friendshipManager,
            param: deleteFriendParams,
        };

        return this._call<commonResult<Array<FriendResult>>>(formatedData);
    }

    TIMFriendshipCheckFriendType(checkFriendTypeParams: CheckFriendTypeParams) {
        const formatedData = {
            method: "TIMFriendshipCheckFriendType",
            manager: Managers.friendshipManager,
            param: checkFriendTypeParams,
        };

        return this._call<commonResult<Array<CheckFriendTypeResult>>>(
            formatedData
        );
    }

    TIMFriendshipCreateFriendGroup(
        createFriendGroupParams: CreateFriendGroupParams
    ) {
        const formatedData = {
            method: "TIMFriendshipCreateFriendGroup",
            manager: Managers.friendshipManager,
            param: createFriendGroupParams,
        };

        return this._call<commonResult<Array<FriendResult>>>(formatedData);
    }

    TIMFriendshipGetFriendGroupList(
        friendshipStringArrayParams: FriendshipStringArrayParams
    ) {
        const formatedData = {
            method: "TIMFriendshipGetFriendGroupList",
            manager: Managers.friendshipManager,
            param: friendshipStringArrayParams,
        };

        return this._call<commonResult<Array<FriendGroupInfo>>>(formatedData);
    }

    TIMFriendshipModifyFriendGroup(
        modifyFriendGroupParams: ModifyFriendGroupParams
    ) {
        const formatedData = {
            method: "TIMFriendshipModifyFriendGroup",
            manager: Managers.friendshipManager,
            param: modifyFriendGroupParams,
        };

        return this._call<commonResult<Array<FriendResult>>>(formatedData);
    }

    TIMFriendshipDeleteFriendGroup(
        friendshipStringArrayParams: FriendshipStringArrayParams
    ) {
        const formatedData = {
            method: "TIMFriendshipDeleteFriendGroup",
            manager: Managers.friendshipManager,
            param: friendshipStringArrayParams,
        };

        return this._call<commonResult<string>>(formatedData);
    }

    TIMFriendshipAddToBlackList(
        friendshipStringArrayParams: FriendshipStringArrayParams
    ) {
        const formatedData = {
            method: "TIMFriendshipAddToBlackList",
            manager: Managers.friendshipManager,
            param: friendshipStringArrayParams,
        };

        return this._call<commonResult<Array<FriendResult>>>(formatedData);
    }

    TIMFriendshipGetBlackList(getBlackListParams: GetBlackListParams) {
        const formatedData = {
            method: "TIMFriendshipGetBlackList",
            manager: Managers.friendshipManager,
            param: getBlackListParams,
        };

        return this._call<commonResult<Array<FriendProfile>>>(formatedData);
    }

    TIMFriendshipDeleteFromBlackList(
        friendshipStringArrayParams: FriendshipStringArrayParams
    ) {
        const formatedData = {
            method: "TIMFriendshipDeleteFromBlackList",
            manager: Managers.friendshipManager,
            param: friendshipStringArrayParams,
        };

        return this._call<commonResult<Array<FriendResult>>>(formatedData);
    }

    TIMFriendshipGetPendencyList(
        friendshipGetPendencyListParams: FriendshipGetPendencyListParams
    ) {
        const formatedData = {
            method: "TIMFriendshipGetPendencyList",
            manager: Managers.friendshipManager,
            param: friendshipGetPendencyListParams,
        };

        return this._call<commonResult<PendencyPage>>(formatedData);
    }

    TIMFriendshipDeletePendency(deletePendencyParams: DeletePendencyParams) {
        const formatedData = {
            method: "TIMFriendshipDeletePendency",
            manager: Managers.friendshipManager,
            param: deletePendencyParams,
        };

        return this._call<commonResult<Array<FriendResult>>>(formatedData);
    }

    TIMFriendshipReportPendencyReaded(
        reportPendencyReadedParams: ReportPendencyReadedParams
    ) {
        const formatedData = {
            method: "TIMFriendshipReportPendencyReaded",
            manager: Managers.friendshipManager,
            param: reportPendencyReadedParams,
        };

        return this._call<commonResult<string>>(formatedData);
    }

    TIMFriendshipSearchFriends(searchFriendsParams: SearchFriendsParams) {
        const formatedData = {
            method: "TIMFriendshipSearchFriends",
            manager: Managers.friendshipManager,
            param: searchFriendsParams,
        };

        return this._call<commonResult<Array<FriendInfoGetResult>>>(
            formatedData
        );
    }

    TIMFriendshipGetFriendsInfo(
        friendshipStringArrayParams: FriendshipStringArrayParams
    ) {
        const formatedData = {
            method: "TIMFriendshipGetFriendsInfo",
            manager: Managers.friendshipManager,
            param: friendshipStringArrayParams,
        };

        return this._call<commonResult<Array<FriendInfoGetResult>>>(
            formatedData
        );
    }

    TIMSetOnAddFriendCallback(params: TIMOnAddFriendCallbackParams) {
        const callback = "TIMSetOnAddFriendCallback";
        const formatedData = {
            method: "TIMSetOnAddFriendCallback",
            manager: Managers.friendshipManager,
            callback,
            windowID: this._currentWindowID,
            param: params,
        };

        this._setCallback(callback, params.callback);

        return this._call<void>(formatedData);
    }

    TIMSetOnDeleteFriendCallback(params: TIMOnDeleteFriendCallbackParams) {
        const callback = "TIMSetOnDeleteFriendCallback";
        const formatedData = {
            method: "TIMSetOnDeleteFriendCallback",
            manager: Managers.friendshipManager,
            callback,
            windowID: this._currentWindowID,
            param: params,
        };

        this._setCallback(callback, params.callback);

        return this._call<void>(formatedData);
    }

    TIMSetUpdateFriendProfileCallback(
        params: TIMUpdateFriendProfileCallbackParams
    ) {
        const callback = "TIMSetUpdateFriendProfileCallback";
        const formatedData = {
            method: "TIMSetUpdateFriendProfileCallback",
            manager: Managers.friendshipManager,
            callback,
            windowID: this._currentWindowID,
            param: params,
        };

        this._setCallback(callback, params.callback);

        return this._call<void>(formatedData);
    }

    TIMSetFriendAddRequestCallback(params: TIMFriendAddRequestCallbackParams) {
        const callback = "TIMSetFriendAddRequestCallback";
        const formatedData = {
            method: "TIMSetFriendAddRequestCallback",
            manager: Managers.friendshipManager,
            callback,
            windowID: this._currentWindowID,
            param: params,
        };

        this._setCallback(callback, params.callback);

        return this._call<void>(formatedData);
    }

    TIMSetFriendApplicationListDeletedCallback(
        params: TIMFriendApplicationListDeletedCallbackParams
    ) {
        const callback = "TIMSetFriendApplicationListDeletedCallback";
        const formatedData = {
            method: "TIMSetFriendApplicationListDeletedCallback",
            manager: Managers.friendshipManager,
            callback,
            windowID: this._currentWindowID,
            param: params,
        };

        this._setCallback(callback, params.callback);
        return this._call<void>(formatedData);
    }

    TIMSetFriendApplicationListReadCallback(
        params: TIMFriendApplicationListReadCallbackParams
    ) {
        const callback = "TIMSetFriendApplicationListReadCallback";
        const formatedData = {
            method: "TIMSetFriendApplicationListReadCallback",
            manager: Managers.friendshipManager,
            callback,
            windowID: this._currentWindowID,
            param: params,
        };

        this._setCallback(callback, params.callback);
        return this._call<void>(formatedData);
    }

    TIMSetFriendBlackListAddedCallback(
        params: TIMFriendBlackListAddedCallbackParams
    ) {
        const callback = "TIMSetFriendBlackListAddedCallback";
        const formatedData = {
            method: "TIMSetFriendBlackListAddedCallback",
            manager: Managers.friendshipManager,
            callback,
            windowID: this._currentWindowID,
            param: params,
        };

        this._setCallback(callback, params.callback);
        return this._call<void>(formatedData);
    }

    TIMSetFriendBlackListDeletedCallback(
        params: TIMFriendBlackListDeletedCallbackParams
    ) {
        const callback = "TIMSetFriendBlackListDeletedCallback";
        const formatedData = {
            method: "TIMSetFriendBlackListDeletedCallback",
            manager: Managers.friendshipManager,
            callback,
            windowID: this._currentWindowID,
            param: params,
        };

        this._setCallback(callback, params.callback);
        return this._call<void>(formatedData);
    }

    TIMMsgSendMessage(msgSendMessageParams: MsgSendMessageParams) {
        const formatedData = {
            method: "TIMMsgSendMessage",
            manager: Managers.advanceMessageManager,
            param: msgSendMessageParams,
        };

        return this._call<commonResult<string>>(formatedData);
    }

    TIMMsgModifyMessage(msgModifyMessageParams: MsgModifyMessageParams) {
        const formatedData = {
            method: "TIMMsgModifyMessage",
            manager: Managers.advanceMessageManager,
            param: msgModifyMessageParams,
        };
        return this._call<commonResult<Json_value_msg>>(formatedData);
    }

    TIMMsgSendMessageV2(msgSendMessageParams: MsgSendMessageParamsV2) {
        const callback = "TIMMsgSendMessageV2";
        const formatedData = {
            method: "TIMMsgSendMessageV2",
            manager: Managers.advanceMessageManager,
            callback,
            windowID: this._currentWindowID,
            param: msgSendMessageParams,
        };

        this._setCallback(callback, msgSendMessageParams.callback);
        return this._call<string>(formatedData);
    }

    TIMMsgSendReplyMessage(msgSendReplyMessage: MsgSendReplyMessage) {
        const repliedMsg = msgSendReplyMessage.replyMsg;
        if (!repliedMsg) {
            throw Error("Need pass the reply msg");
        }
        const replyMsgContent = {
            messageReply: {
                messageID: repliedMsg.message_msg_id,
                messageAbstract: this.getAbstractMsgText(
                    repliedMsg.message_elem_array![0]
                ),
                messageSender:
                    repliedMsg.message_sender_profile?.user_profile_nick_name ||
                    repliedMsg.message_sender_profile?.user_profile_identifier,
                messageType: repliedMsg.message_elem_array![0].elem_type,
                version: "1",
            },
        };

        return this.TIMMsgSendMessageV2({
            conv_id: msgSendReplyMessage.conv_id,
            conv_type: msgSendReplyMessage.conv_type,
            params: {
                ...msgSendReplyMessage.params,
                message_cloud_custom_str: JSON.stringify(replyMsgContent),
            },
            callback: msgSendReplyMessage.callback,
            user_data: msgSendReplyMessage.user_data,
        });
    }

    TIMMsgCancelSend(msgCancelSendParams: MsgCancelSendParams) {
        const formatedData = {
            method: "TIMMsgCancelSend",
            manager: Managers.advanceMessageManager,
            param: msgCancelSendParams,
        };

        return this._call<commonResult<string>>(formatedData);
    }

    TIMMsgFindMessages(msgFindMessagesParams: MsgFindMessagesParams) {
        const formatedData = {
            method: "TIMMsgFindMessages",
            manager: Managers.advanceMessageManager,
            param: msgFindMessagesParams,
        };

        return this._call<commonResult<Array<Json_value_msg>>>(formatedData);
    }

    TIMMsgReportReaded(msgReportReadedParams: MsgReportReadedParams) {
        const formatedData = {
            method: "TIMMsgReportReaded",
            manager: Managers.advanceMessageManager,
            param: msgReportReadedParams,
        };

        return this._call<commonResult<string>>(formatedData);
    }

    TIMMsgRevoke(msgRevokeParams: MsgRevokeParams) {
        const formatedData = {
            method: "TIMMsgRevoke",
            manager: Managers.advanceMessageManager,
            param: msgRevokeParams,
        };

        return this._call<commonResult<string>>(formatedData);
    }

    TIMMsgFindByMsgLocatorList(
        msgFindByMsgLocatorListParams: MsgFindByMsgLocatorListParams
    ) {
        const formatedData = {
            method: "TIMMsgFindByMsgLocatorList",
            manager: Managers.advanceMessageManager,
            param: msgFindByMsgLocatorListParams,
        };

        return this._call<commonResult<Array<Json_value_msg>>>(formatedData);
    }

    TIMMsgImportMsgList(msgImportMsgListParams: MsgImportMsgListParams) {
        const formatedData = {
            method: "TIMMsgImportMsgList",
            manager: Managers.advanceMessageManager,
            param: msgImportMsgListParams,
        };

        return this._call<commonResult<string>>(formatedData);
    }

    TIMMsgSaveMsg(msgSaveMsgParams: MsgSaveMsgParams) {
        const formatedData = {
            method: "TIMMsgSaveMsg",
            manager: Managers.advanceMessageManager,
            param: msgSaveMsgParams,
        };

        return this._call<commonResult<Json_value_msg>>(formatedData);
    }

    TIMMsgGetMsgList(msgGetMsgListParams: MsgGetMsgListParams) {
        const formatedData = {
            method: "TIMMsgGetMsgList",
            manager: Managers.advanceMessageManager,
            param: msgGetMsgListParams,
        };

        return this._call<commonResult<Array<Json_value_msg>>>(formatedData);
    }

    TIMMsgDelete(msgDeleteParams: MsgDeleteParams) {
        const formatedData = {
            method: "TIMMsgDelete",
            manager: Managers.advanceMessageManager,
            param: msgDeleteParams,
        };

        return this._call<commonResult<string>>(formatedData);
    }

    TIMMsgListDelete(msgListDeleteParams: MsgListDeleteParams) {
        const formatedData = {
            method: "TIMMsgListDelete",
            manager: Managers.advanceMessageManager,
            param: msgListDeleteParams,
        };

        return this._call<commonResult<string>>(formatedData);
    }

    TIMMsgClearHistoryMessage(
        msgClearHistoryMessageParams: MsgClearHistoryMessageParams
    ) {
        const formatedData = {
            method: "TIMMsgClearHistoryMessage",
            manager: Managers.advanceMessageManager,
            param: msgClearHistoryMessageParams,
        };

        return this._call<commonResult<string>>(formatedData);
    }

    TIMMsgSetC2CReceiveMessageOpt(
        msgSetC2CReceiveMessageOptParams: MsgSetC2CReceiveMessageOptParams
    ) {
        const formatedData = {
            method: "TIMMsgSetC2CReceiveMessageOpt",
            manager: Managers.advanceMessageManager,
            param: msgSetC2CReceiveMessageOptParams,
        };

        return this._call<commonResult<string>>(formatedData);
    }

    TIMMsgGetC2CReceiveMessageOpt(
        msgGetC2CReceiveMessageOptParams: MsgGetC2CReceiveMessageOptParams
    ) {
        const formatedData = {
            method: "TIMMsgGetC2CReceiveMessageOpt",
            manager: Managers.advanceMessageManager,
            param: msgGetC2CReceiveMessageOptParams,
        };

        return this._call<commonResult<Array<C2CRecvMsgOptResult>>>(
            formatedData
        );
    }

    TIMMsgSetGroupReceiveMessageOpt(
        msgSetGroupReceiveMessageOptParams: MsgSetGroupReceiveMessageOptParams
    ) {
        const formatedData = {
            method: "TIMMsgSetGroupReceiveMessageOpt",
            manager: Managers.advanceMessageManager,
            param: msgSetGroupReceiveMessageOptParams,
        };

        return this._call<commonResult<string>>(formatedData);
    }

    TIMMsgDownloadMergerMessage(
        msgDownloadMergerMessageParams: MsgDownloadMergerMessageParams
    ) {
        const formatedData = {
            method: "TIMMsgDownloadMergerMessage",
            manager: Managers.advanceMessageManager,
            param: msgDownloadMergerMessageParams,
        };

        return this._call<commonResult<string>>(formatedData);
    }

    TIMMsgBatchSend(msgBatchSendParams: MsgBatchSendParams) {
        const formatedData = {
            method: "TIMMsgBatchSend",
            manager: Managers.advanceMessageManager,
            param: msgBatchSendParams,
        };

        return this._call<commonResult<Array<BatchSendResult>>>(formatedData);
    }

    TIMMsgSearchLocalMessages(
        msgSearchLocalMessagesParams: MsgSearchLocalMessagesParams
    ) {
        const formatedData = {
            method: "TIMMsgSearchLocalMessages",
            manager: Managers.advanceMessageManager,
            param: msgSearchLocalMessagesParams,
        };

        return this._call<commonResult<MessageSearchResult>>(formatedData);
    }
    TIMMsgSearchCloudMessages(
        msgSearchLocalMessagesParams: MsgSearchLocalMessagesParams
    ) {
        const formatedData = {
            method: "TIMMsgSearchCloudMessages",
            manager: Managers.advanceMessageManager,
            param: msgSearchLocalMessagesParams,
        };

        return this._call<commonResult<MessageSearchResult>>(formatedData);
    }
    TIMMsgSetLocalCustomData(param: SetLocalCustomDataParam) {
        const formatedData = {
            method: "TIMMsgSetLocalCustomData",
            manager: Managers.advanceMessageManager,
            param: param,
        };

        return this._call<commonResult<string>>(formatedData);
    }
    TIMMsgSetMessageExtensions(
        msgSetMessageExtensionsParam: TIMMsgSetMessageExtensionsParam
    ) {
        const formatedData = {
            method: "TIMMsgSetMessageExtensions",
            manager: Managers.advanceMessageManager,
            param: msgSetMessageExtensionsParam,
        };

        return this._call<commonResult<string>>(formatedData);
    }

    TIMMsgGetMessageExtensions(
        msgGetMessageExtensions: TIMMsgGetMessageExtensionsParam
    ) {
        const formatedData = {
            method: "TIMMsgGetMessageExtensions",
            manager: Managers.advanceMessageManager,
            param: msgGetMessageExtensions,
        };

        return this._call<commonResult<Array<MessageExtensionResult>>>(
            formatedData
        );
    }

    TIMMsgDeleteMessageExtensions(
        msgDeleteMessageExtensions: TIMMsgDeleteMessageExtensionsParam
    ) {
        const formatedData = {
            method: "TIMMsgDeleteMessageExtensions",
            manager: Managers.advanceMessageManager,
            param: msgDeleteMessageExtensions,
        };

        return this._call<commonResult<Array<MessageExtension>>>(formatedData);
    }

    TIMMsgSetOfflinePushToken(params: OfflinePushToken) {
        const formatedData = {
            method: "TIMMsgSetOfflinePushToken",
            manager: Managers.advanceMessageManager,
            param: params,
        };
        return this._call<commonResult<string>>(formatedData);
    }
    TIMMsgTranslateText(params: TranslateTextParam) {
        const formatedData = {
            method: "TIMMsgTranslateText",
            manager: Managers.advanceMessageManager,
            param: params,
        };
        return this._call<commonResult<Array<MessageTranslateTextResult>>>(
            formatedData
        );
    }
    TIMMsgConvertVoiceToText(params: ConvertVoiceToTextParam) {
        const formatedData = {
            method: "TIMMsgConvertVoiceToText",
            manager: Managers.advanceMessageManager,
            param: params,
        };
        return this._call<commonResult<string>>(formatedData);
    }
    recvNewMsgCallback(json_msg_array: string, user_data: string) {
        for (let i = 0; i < TimRender._recvNewMsgCallbackArray.length; i++) {
            let callback: Function = TimRender._recvNewMsgCallbackArray[i];
            callback(json_msg_array, user_data);
        }
    }
    downloadCallback(data: [0, "", "", ""]) {
        // for (let i = 0; i < TimRender._downloadCallbackArray.length; i++) {
        //     let callback: Function = TimRender._downloadCallbackArray[i];
        //     const [code, desc, json_param, user_data] = data;
        //     callback(code, desc, json_param, user_data);
        // }
        const [code, desc, json_param, user_data] = data;
        const callback = TimRender._downloadCallbacks.has(user_data)
            ? TimRender._downloadCallbacks.get(user_data)
            : undefined;
        if (callback != undefined) {
            callback(code, desc, json_param, user_data);
            if ((desc as string) != "downloading") {
                TimRender._downloadCallbacks.delete(user_data);
            }
        }
    }
    TIMAddRecvNewMsgCallback(params: TIMRecvNewMsgCallbackParams) {
        const callback = "TIMAddRecvNewMsgCallback";
        TimRender._recvNewMsgCallbackArray.push(params.callback);
        let callbackparam: TIMRecvNewMsgCallbackParams = {
            callback: this.recvNewMsgCallback,
        };
        const formatedData = {
            method: "TIMAddRecvNewMsgCallback",
            manager: Managers.advanceMessageManager,
            callback,
            windowID: this._currentWindowID,
            param: callbackparam,
        };

        // this._setCallback(callback, params.callback);
        this._setCallback(callback, this.recvNewMsgCallback);
        return this._call<void>(formatedData);
    }
    TIMMsgDownloadElemToPath(
        msgDownloadElemToPathParams: MsgDownloadElemToPathParams
    ) {
        // TimRender._downloadCallbackArray.push(
        //     msgDownloadElemToPathParams.callback
        // );
        TimRender._downloadCallbacks.set(
            msgDownloadElemToPathParams.user_data,
            msgDownloadElemToPathParams.callback
        );
        const callback = `TIMMsgDownloadElemToPath`; // 允许多次调用，所以这里加一个随机数
        const formatedData = {
            method: "TIMMsgDownloadElemToPath",
            manager: Managers.advanceMessageManager,
            param: msgDownloadElemToPathParams,
            callback,
            windowID: this._currentWindowID,
        };
        this._setCallback(callback, this.downloadCallback);
        return this._call<void>(formatedData);
    }
    //callback(){//自己处理用户的callback，然后param.callback = callback}

    deleteRecvNewMsgCallback(callback: Function) {
        for (let i = 0; i < TimRender._recvNewMsgCallbackArray.length; i++) {
            if (
                TimRender._recvNewMsgCallbackArray[i].toString() ==
                callback.toString()
            ) {
                TimRender._recvNewMsgCallbackArray.splice(i, 1);
                break;
            }
        }
    }

    TIMRemoveRecvNewMsgCallback(params?: TIMRecvNewMsgCallbackParams) {
        const callback = "TIMRemoveRecvNewMsgCallback";
        if (params) {
            this.deleteRecvNewMsgCallback(params.callback);
            let callbackparam: TIMRecvNewMsgCallbackParams = {
                callback: this.recvNewMsgCallback,
            };
            const formatedData = {
                method: "TIMAddRecvNewMsgCallback",
                manager: Managers.advanceMessageManager,
                callback,
                windowID: this._currentWindowID,
                param: callbackparam,
            };
            this._setCallback(callback, this.recvNewMsgCallback);
            return this._call<void>(formatedData);
        } else {
            TimRender._recvNewMsgCallbackArray = [];
            let callbackparam: TIMRecvNewMsgCallbackParams = {
                callback: this.recvNewMsgCallback,
            };
            const formatedData = {
                method: "TIMAddRecvNewMsgCallback",
                manager: Managers.advanceMessageManager,
                callback,
                windowID: this._currentWindowID,
                param: callbackparam,
            };
            this._setCallback(callback, this.recvNewMsgCallback);
            return this._call<void>(formatedData);
            // const formatedData = {
            //     method: "TIMRemoveRecvNewMsgCallback",
            //     manager: Managers.advanceMessageManager,
            //     callback,
            //     windowID: this._currentWindowID,
            //     param: params,
            // };

            // return this._call<void>(formatedData);
        }
    }

    TIMSetMsgReadedReceiptCallback(params: TIMMsgReadedReceiptCallbackParams) {
        const callback = "TIMSetMsgReadedReceiptCallback";
        const formatedData = {
            method: "TIMSetMsgReadedReceiptCallback",
            manager: Managers.advanceMessageManager,
            callback,
            windowID: this._currentWindowID,
            param: params,
        };

        this._setCallback(callback, params.callback);
        return this._call<void>(formatedData);
    }

    TIMSetMsgRevokeCallback(params: TIMMsgRevokeCallbackParams) {
        const callback = "TIMSetMsgRevokeCallback";
        const formatedData = {
            method: "TIMSetMsgRevokeCallback",
            manager: Managers.advanceMessageManager,
            callback,
            windowID: this._currentWindowID,
            param: params,
        };

        this._setCallback(callback, params.callback);
        return this._call<void>(formatedData);
    }
    TIMSetMsgExtensionsChangedCallback(
        params: TIMSetMsgExtensionsChangedCallbackParam
    ) {
        const callback = "TIMSetMsgExtensionsChangedCallback";
        const formatedData = {
            method: "TIMSetMsgExtensionsChangedCallback",
            manager: Managers.advanceMessageManager,
            callback,
            windowID: this._currentWindowID,
            param: params,
        };
        this._setCallback(callback, params.callback);
        return this._call<void>(formatedData);
    }

    TIMSetMsgExtensionsDeletedCallback(
        params: TIMSetMsgExtensionsDeletedCallbackParam
    ) {
        const callback = "TIMSetMsgExtensionsDeletedCallback";
        const formatedData = {
            method: "TIMSetMsgExtensionsDeletedCallback",
            manager: Managers.advanceMessageManager,
            callback,
            windowID: this._currentWindowID,
            param: params,
        };
        this._setCallback(callback, params.callback);
        return this._call<void>(formatedData);
    }

    TIMSetMsgElemUploadProgressCallback(
        params: TIMMsgElemUploadProgressCallbackParams
    ) {
        const callback = "TIMSetMsgElemUploadProgressCallback";
        const formatedData = {
            method: "TIMSetMsgElemUploadProgressCallback",
            manager: Managers.advanceMessageManager,
            callback,
            windowID: this._currentWindowID,
            param: params,
        };

        this._setCallback(callback, params.callback);
        return this._call<void>(formatedData);
    }

    TIMSetMsgUpdateCallback(params: TIMMsgUpdateCallbackParams) {
        const callback = "TIMSetMsgUpdateCallback";
        const formatedData = {
            method: "TIMSetMsgUpdateCallback",
            manager: Managers.advanceMessageManager,
            callback,
            param: params,
        };

        this._setCallback(callback, params.callback);
        return this._call<void>(formatedData);
    }

    TIMInvite(params: inviteParam) {
        const formatedData = {
            method: "TIMInvite",
            manager: Managers.signalingManager,
            param: params,
        };

        return this._call<commonResult<string>>(formatedData);
    }

    TIMInviteInGroup(params: inviteInGroupParam) {
        const formatedData = {
            method: "TIMInviteInGroup",
            manager: Managers.signalingManager,
            param: params,
        };

        return this._call<commonResult<string>>(formatedData);
    }

    TIMCancelInvite(params: signalingParam) {
        const formatedData = {
            method: "TIMCancelInvite",
            manager: Managers.signalingManager,
            param: params,
        };

        return this._call<commonResult<string>>(formatedData);
    }

    TIMAcceptInvite(params: signalingParam) {
        const formatedData = {
            method: "TIMAcceptInvite",
            manager: Managers.signalingManager,
            param: params,
        };

        return this._call<commonResult<string>>(formatedData);
    }

    TIMRejectInvite(params: signalingParam) {
        const formatedData = {
            method: "TIMRejectInvite",
            manager: Managers.signalingManager,
            param: params,
        };

        return this._call<commonResult<string>>(formatedData);
    }

    TIMGetSignalingInfo(params: getSignalingInfoParam) {
        const formatedData = {
            method: "TIMGetSignalingInfo",
            manager: Managers.signalingManager,
            param: params,
        };

        return this._call<commonResult<SignalingInfo>>(formatedData);
    }

    TIMSignalingModifyInvitation(params: signalingParam) {
        const formatedData = {
            method: "TIMSignalingModifyInvitation",
            manager: Managers.signalingManager,
            param: params,
        };

        return this._call<commonResult<string>>(formatedData);
    }

    TIMOnInvited(param: SetSignalingReceiveNewInvitationCallbackParam) {
        const callback = `TIMOnInvited`;
        this._setCallback(callback, param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: "TIMOnInvited",
            manager: Managers.signalingManager,
            callback,
            windowID: this._currentWindowID,
            param: param,
        };
        return this._call<any>(formatedData);
    }
    TIMOnAccepted(param: SetSignalingInviteeAcceptedCallbackParam) {
        const callback = `TIMOnAccepted`;
        this._setCallback(callback, param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: "TIMOnAccepted",
            manager: Managers.signalingManager,
            callback,
            windowID: this._currentWindowID,
            param: param,
        };
        return this._call<any>(formatedData);
    }
    TIMOnRejected(param: SetSignalingInviteeRejectedCallbackParam) {
        const callback = `TIMOnRejected`;
        this._setCallback(callback, param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: "TIMOnRejected",
            manager: Managers.signalingManager,
            callback,
            windowID: this._currentWindowID,
            param: param,
        };
        return this._call<any>(formatedData);
    }

    TIMOnCancelled(param: SetSignalingInvitationCancelledCallbackParam) {
        const callback = `TIMOnCancelled`;
        this._setCallback(callback, param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: "TIMOnCancelled",
            manager: Managers.signalingManager,
            callback,
            windowID: this._currentWindowID,
            param: param,
        };
        return this._call<any>(formatedData);
    }

    TIMOnTimeout(param: SetSignalingInvitationTimeoutCallParam) {
        const callback = `TIMOnTimeout`;
        this._setCallback(callback, param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: "TIMOnTimeout",
            manager: Managers.signalingManager,
            callback,
            windowID: this._currentWindowID,
            param: param,
        };
        return this._call<any>(formatedData);
    }

    TIMOnModified(param: SetSignalingInvitationModifiedCallback) {
        const callback = `TIMOnModified`;
        this._setCallback(callback, param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: "TIMOnModified",
            manager: Managers.signalingManager,
            callback,
            windowID: this._currentWindowID,
            param: param,
        };
        return this._call<any>(formatedData);
    }
    private _getSignalCustomData(param: customDataTpl) {
        const {
            inviter,
            inviteID,
            actionType,
            inviteeList,
            timeout = 30,
            groupID = "",
            data,
        } = param;
        const tpl = {
            onlineUserOnly: false,
            businessID: 1,
            inviteID: inviteID,
            inviter: inviter,
            actionType: actionType,
            inviteeList: inviteeList,
            data: data,
            timeout: timeout,
            groupID: groupID,
        };
        return tpl;
    }
}

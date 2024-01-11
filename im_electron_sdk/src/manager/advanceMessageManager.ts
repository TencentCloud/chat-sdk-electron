/**
 * 如果您需要收发图片、视频、文件等富媒体消息，并需要撤回消息、标记已读、查询历史消息等高级功能，推荐使用下面这套高级消息接口（简单消息接口和高级消息接口请不要混用）。
 * @module advanceMessageManager(高级消息收发接口)
 */
import {
    sdkconfig,
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
    cache,
    commonResult,
} from "../interface";
import {
    TIMRecvNewMsgCallbackParams,
    TIMMsgReadedReceiptCallbackParams,
    TIMMsgRevokeCallbackParams,
    TIMMsgElemUploadProgressCallbackParams,
    TIMMsgUpdateCallbackParams,
    MsgModifyMessageParams,
    Json_value_msg,
    C2CRecvMsgOptResult,
    BatchSendResult,
    MessageSearchResult,
    TIMSetMsgExtensionsChangedCallbackParam,
    TIMSetMsgExtensionsDeletedCallbackParam,
    TIMMsgSetMessageExtensionsParam,
    TIMMsgGetMessageExtensionsParam,
    TIMMsgDeleteMessageExtensionsParam,
    MessageExtensionResult,
    MessageExtension,
    OfflinePushToken,
    TranslateTextParam,
    ConvertVoiceToTextParam,
    MessageTranslateTextResult,
} from "../interface/advanceMessageInterface";

const {
    load,
    DataType,

    funcConstructor,
} = require("ffi-rs");
const libName = "libImSDK";

class AdvanceMessageManage {
    private _sdkconfig: sdkconfig;

    setSDKAPPID(sdkappid: number) {
        this._sdkconfig.sdkappid = sdkappid;
    }
    /** @internal */
    constructor(config: sdkconfig) {
        this._sdkconfig = config;
    }
    /**
     * ### 发送新消息，单聊消息和群消息的发送均采用此接口。
     * @param msgSendMessageParams
     * @category 发送消息
     * @return  {Promise} Promise的response返回值为：{ code, desc, json_params, user_data }
     * @note 注意：
     *
     * >  发送新消息，单聊消息和群消息的发送均采用此接口。
     * > 发送单聊消息时 conv_id 为对方的UserID， conv_type 为 Conv_C2C
     * > 发送群聊消息时 conv_id 为群ID， conv_type 为 Conv_Group 。
     * >  发送消息时不能发送 kTIMElem_GroupTips 、 kTIMElem_GroupReport ，他们由为后台下发，用于更新(通知)群的信息。可以的发送消息内元素
     * >   文本消息元素，请参考 [TextElem](../interfaces/interface_advancemessageinterface.textelem.html)
     * >   表情消息元素，请参考 [FaceElem](../interfaces/interface_advancemessageinterface.faceelem.html)
     * >   位置消息元素，请参考 [LocationElem](../interfaces/interface_advancemessageinterface.locationelem.html)
     * >   图片消息元素，请参考 [ImageElem](../interfaces/interface_advancemessageinterface.imageelem.html)
     * >   声音消息元素，请参考 [SoundElem](../interfaces/interface_advancemessageinterface.soundelem.html)
     * >   自定义消息元素，请参考 [CustomElem](../interfaces/interface_advancemessageinterface.customelem.html)
     * >   文件消息元素，请参考 [FileElem](../interfaces/interface_advancemessageinterface.fileelem.html)
     * >   视频消息元素，请参考 [VideoElem](../interfaces/interface_advancemessageinterface.videoelem.html)
     */
    TIMMsgSendMessage(
        msgSendMessageParams: MsgSendMessageParams
    ): Promise<commonResult<string>> {
        const { conv_id, conv_type, params, user_data, messageId } =
            msgSendMessageParams;

        const message_id_buffer = Buffer.alloc(128);
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMMsgSendMessage",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    DataType.I32,
                    DataType.String,
                    DataType.U8Array,
                    funcConstructor({
                        paramsType: [
                            DataType.I32,
                            DataType.String,
                            DataType.String,
                            DataType.String,
                        ],
                        retType: DataType.Void,
                    }),
                    DataType.String,
                ],
                paramsValue: [
                    conv_id,
                    conv_type,
                    JSON.stringify(params),
                    message_id_buffer,
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        } else {
                            reject({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        }
                    },
                    user_data,
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * ### 发送新消息，单聊消息和群消息的发送均采用此V2接口（返回值与TIMMsgSendMessage不同）
     * @param msgSendMessageParams
     * @category 发送消息
     * @return  {Promise<commonResponse>} Promise的response返回值为：message_id(消息ID)
     * @note 与TIMMsgSendMessage不同的是他的返回值不一样并且增加了callback参数
     */
    // TODO 这个接口需要在试一下
    TIMMsgSendMessageV2(msgSendMessageParams: MsgSendMessageParamsV2) {
        const { conv_id, conv_type, params, user_data, messageId, callback } =
            msgSendMessageParams;

        const message_id_buffer = Buffer.alloc(128);
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMMsgSendMessage",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    DataType.I32,
                    DataType.String,
                    DataType.U8Array,
                    funcConstructor({
                        paramsType: [
                            DataType.I32,
                            DataType.String,
                            DataType.String,
                            DataType.String,
                        ],
                        retType: DataType.Void,
                    }),
                    DataType.String,
                ],
                paramsValue: [
                    conv_id,
                    conv_type,
                    JSON.stringify(params),
                    message_id_buffer,
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            callback &&
                                callback(
                                    {
                                        code,
                                        desc,
                                        json_param,
                                        json_params: json_param,
                                        user_data,
                                    },
                                    user_data
                                );
                        } else {
                            callback &&
                                callback(
                                    {
                                        code,
                                        desc,
                                        json_param,
                                        user_data,
                                        json_params: json_param,
                                    },
                                    user_data
                                );
                        }
                    },
                    user_data,
                ],
            });
            if (code == 0) {
                resolve(message_id_buffer.toString().split("\u0000")[0]);
            } else {
                reject("");
            }
        });
    }

    /**
     * ### 根据消息 messageID 取消发送中的消息
     * @param msgCancelSendParams
     * @category 取消发送中的消息
     * @return {Promise<commonResult<T>>} Promise的response返回值为{ code, desc, json_params, user_data }
     */
    TIMMsgCancelSend(
        msgCancelSendParams: MsgCancelSendParams
    ): Promise<commonResult<string>> {
        const { conv_id, conv_type, message_id, user_data } =
            msgCancelSendParams;

        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMMsgCancelSend",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    DataType.I32,
                    DataType.String,
                    funcConstructor({
                        paramsType: [
                            DataType.I32,
                            DataType.String,
                            DataType.String,
                            DataType.String,
                        ],
                        retType: DataType.Void,
                    }),
                    DataType.String,
                ],
                paramsValue: [
                    conv_id,
                    conv_type,
                    message_id,
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        } else {
                            reject({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        }
                    },
                    user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    /**
     * ### 根据消息 messageID 查询本地的消息列表
     * @category 查询本地的消息列表
     * @param MsgFindMessagesParams
     * @return {Promise<commonResult<T>>} Promise的response返回值为{ code, desc, json_params, user_data }
     */
    TIMMsgFindMessages(
        msgFindMessagesParams: MsgFindMessagesParams
    ): Promise<commonResult<Array<Json_value_msg>>> {
        const { json_message_id_array, user_data } = msgFindMessagesParams;

        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMMsgFindMessages",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    funcConstructor({
                        paramsType: [
                            DataType.I32,
                            DataType.String,
                            DataType.String,
                            DataType.String,
                        ],
                        retType: DataType.Void,
                    }),
                    DataType.String,
                ],
                paramsValue: [
                    JSON.stringify(json_message_id_array),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<Json_value_msg>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param = [] as Array<Json_value_msg>;
                            }
                            resolve({
                                code,
                                desc,
                                json_params: param,
                                json_param: json_param,
                                user_data,
                            });
                        } else {
                            reject({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        }
                    },
                    user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    /**
     * ### 消息上报已读
     * @category 消息上报已读
     * @param MsgReportReadedParams
     * @return {Promise<commonResult<T>>} Promise的response返回值为{ code, desc, json_param, user_data }
     */
    TIMMsgReportReaded(
        msgReportReadedParams: MsgReportReadedParams
    ): Promise<commonResult<string>> {
        const { conv_id, conv_type, json_msg_param, user_data } =
            msgReportReadedParams;
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMMsgReportReaded",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    DataType.I32,
                    DataType.String,
                    funcConstructor({
                        paramsType: [
                            DataType.I32,
                            DataType.String,
                            DataType.String,
                            DataType.String,
                        ],
                        retType: DataType.Void,
                    }),
                    DataType.String,
                ],
                paramsValue: [
                    conv_id,
                    conv_type,
                    JSON.stringify(json_msg_param),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({ code, desc, json_param, user_data });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * ### 消息变更
     * @param Json_value_msg
     * @category 消息变更
     * @return {Promise<commonResult<T>>} Promise的response返回值为{ code, desc, json_param, user_data }
     * @note
     * 消息变更。
     * - 如果消息修改成功，自己和对端用户（C2C）或群组成员（Group）都会收到 TIMSetMsgUpdateCallback 回调。
     *  - 如果在修改消息过程中，消息已经被其他人修改，cb 会返回 ERR_SDK_MSG_MODIFY_CONFLICT 错误。
     *  - 消息无论修改成功或则失败，cb 都会返回最新的消息对象。
     */
    TIMMsgModifyMessage(
        msgModifyMessageParams: MsgModifyMessageParams
    ): Promise<commonResult<Json_value_msg>> {
        const { params, user_data } = msgModifyMessageParams;

        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMMsgModifyMessage",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    funcConstructor({
                        paramsType: [
                            DataType.I32,
                            DataType.String,
                            DataType.String,
                            DataType.String,
                        ],
                        retType: DataType.Void,
                    }),
                    DataType.String,
                ],
                paramsValue: [
                    JSON.stringify(params),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Json_value_msg;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify({})
                                );
                            } catch {
                                param = {} as Json_value_msg;
                            }
                            resolve({
                                code,
                                desc,
                                json_param,
                                json_params: param,
                                user_data,
                            });
                        } else {
                            reject({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        }
                    },
                    user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    /**
     * ### 消息撤回
     * @param MsgRevokeParams
     * @category 消息撤回
     * @return {Promise<commonResult<T>>} Promise的response返回值为{ code, desc, json_param, user_data }
     * @note
     * 消息撤回。使用保存的消息Json或者用消息定位符查找到的消息Json，避免重复构造消息Json.
     */
    TIMMsgRevoke(
        msgRevokeParams: MsgRevokeParams
    ): Promise<commonResult<string>> {
        const { conv_id, conv_type, json_msg_param, user_data } =
            msgRevokeParams;

        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMMsgRevoke",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    DataType.I32,
                    DataType.String,
                    funcConstructor({
                        paramsType: [
                            DataType.I32,
                            DataType.String,
                            DataType.String,
                            DataType.String,
                        ],
                        retType: DataType.Void,
                    }),
                    DataType.String,
                ],
                paramsValue: [
                    conv_id,
                    conv_type,
                    JSON.stringify(json_msg_param),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        } else {
                            reject({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        }
                    },
                    user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    /**
     * ### 根据消息定位精准查找指定会话的消息
     * @param MsgFindByMsgLocatorListParams
     * @category 根据消息定位精准查找指定会话的消息
     * @return {Promise<commonResult<T>>} Promise的response返回值为{ code, desc, json_param, user_data }
     * @note
     *  此接口根据消息定位符精准查找指定会话的消息，该功能一般用于消息撤回时查找指定消息等
     *  一个消息定位符对应一条消息
     */
    TIMMsgFindByMsgLocatorList(
        msgFindByMsgLocatorListParams: MsgFindByMsgLocatorListParams
    ): Promise<commonResult<Array<Json_value_msg>>> {
        const { conv_id, conv_type, params, user_data } =
            msgFindByMsgLocatorListParams;

        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMMsgFindByMsgLocatorList",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    DataType.I32,
                    DataType.String,
                    funcConstructor({
                        paramsType: [
                            DataType.I32,
                            DataType.String,
                            DataType.String,
                            DataType.String,
                        ],
                        retType: DataType.Void,
                    }),
                    DataType.String,
                ],
                paramsValue: [
                    conv_id,
                    conv_type,
                    JSON.stringify(params),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<Json_value_msg>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param = [] as Array<Json_value_msg>;
                            }
                            resolve({
                                code,
                                desc,
                                json_param,
                                json_params: param,
                                user_data,
                            });
                        } else {
                            reject({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        }
                    },
                    user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    /**
     * ### 导入消息列表到指定会话
     * @category 导入消息列表到指定会话
     * @param MsgImportMsgListParams
     * @return {Promise<commonResult<T>>} Promise的response返回值为{ code, desc, json_param, user_data }
     * @note
     * 批量导入消息，可以自己构造消息去导入。也可以将之前要导入的消息数组Json保存，然后导入的时候直接调用接口，避免构造消息数组
     */
    TIMMsgImportMsgList(
        msgImportMsgListParams: MsgImportMsgListParams
    ): Promise<commonResult<string>> {
        const { conv_id, conv_type, params, user_data } =
            msgImportMsgListParams;

        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMMsgImportMsgList",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    DataType.I32,
                    DataType.String,
                    funcConstructor({
                        paramsType: [
                            DataType.I32,
                            DataType.String,
                            DataType.String,
                            DataType.String,
                        ],
                        retType: DataType.Void,
                    }),
                    DataType.String,
                ],
                paramsValue: [
                    conv_id,
                    conv_type,
                    JSON.stringify(params),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        } else {
                            reject({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        }
                    },
                    user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    /**
     * ### 保存自定义消息
     * @category 保存自定义消息
     * @param MsgSaveMsgParams
     * @return {Promise<commonResult<T>> } Promise的response返回值为{ code, desc, json_param, user_data }
     * @note
     * 消息保存接口，一般是自己构造一个消息Json字符串，然后保存到指定会话
     */
    TIMMsgSaveMsg(
        msgSaveMsgParams: MsgSaveMsgParams
    ): Promise<commonResult<Json_value_msg>> {
        const { conv_id, conv_type, params, user_data } = msgSaveMsgParams;

        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMMsgSaveMsg",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    DataType.I32,
                    DataType.String,
                    funcConstructor({
                        paramsType: [
                            DataType.I32,
                            DataType.String,
                            DataType.String,
                            DataType.String,
                        ],
                        retType: DataType.Void,
                    }),
                    DataType.String,
                ],
                paramsValue: [
                    conv_id,
                    conv_type,
                    JSON.stringify(params),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Json_value_msg;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify({})
                                );
                            } catch {
                                param = {} as Json_value_msg;
                            }
                            resolve({
                                code,
                                desc,
                                json_param,
                                json_params: param,
                                user_data,
                            });
                        } else {
                            reject({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        }
                    },
                    user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    /**
     * ### 获取指定会话的消息列表
     * @category 获取指定会话的消息列表
     * @param MsgGetMsgListParams
     * @return {Promise<commonResult<T>>} Promise的response返回值为{ code, desc, json_params, user_data}
     */
    // TODO 这个需要大量校对
    TIMMsgGetMsgList(
        msgGetMsgListParams: MsgGetMsgListParams
    ): Promise<commonResult<Array<Json_value_msg>>> {
        const { conv_id, conv_type, params, user_data } = msgGetMsgListParams;

        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMMsgGetMsgList",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    DataType.I32,
                    DataType.String,
                    funcConstructor({
                        paramsType: [
                            DataType.I32,
                            DataType.String,
                            DataType.String,
                            DataType.String,
                        ],
                        retType: DataType.Void,
                    }),
                    DataType.String,
                ],
                paramsValue: [
                    conv_id,
                    conv_type,
                    JSON.stringify(params),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<Json_value_msg>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param = [] as Array<Json_value_msg>;
                            }
                            resolve({
                                code,
                                desc,
                                json_param,
                                json_params: param,
                                user_data,
                            });
                        } else {
                            reject({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        }
                    },
                    user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
        // }
    }

    /**
     * ### 删除指定会话的本地消息
     * @category 删除指定会话的本地消息
     * @param MsgGetMsgListParams
     * @return {Promise<commonResult<T>>} Promise的response返回值为{ code, desc, json_params, user_data }
     *  @note
     * 本接口会在删除本地消息的同时也会删除漫游消息。需要注意以下几点：
     * > 建议将之前的消息数组Json保存，然后删除的时候直接调用接口，避免构造消息数组。
     * > 一次最多只能删除 30 条消息。
     * > 一秒钟最多只能调用一次该接口。
     * > 如果该账号在其他设备上拉取过这些消息，那么调用该接口删除后，这些消息仍然会保存在那些设备上，即删除消息不支持多端同步。
     */
    TIMMsgDelete(
        msgDeleteParams: MsgDeleteParams
    ): Promise<commonResult<string>> {
        const { conv_id, conv_type, params, user_data } = msgDeleteParams;

        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMMsgDelete",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    DataType.I32,
                    DataType.String,
                    funcConstructor({
                        paramsType: [
                            DataType.I32,
                            DataType.String,
                            DataType.String,
                            DataType.String,
                        ],
                        retType: DataType.Void,
                    }),
                    DataType.String,
                ],
                paramsValue: [
                    conv_id,
                    conv_type,
                    JSON.stringify(params),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        } else {
                            reject({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        }
                    },
                    user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    /**
     * ### 删除指定会话的本地及漫游消息
     * @category 删除指定会话的本地及漫游消息
     * @param MsgListDeleteParams
     * @return {Promise<commonResult<T>>} Promise的response返回值为{ code, desc, json_params, user_data }
     */
    TIMMsgListDelete(
        msgListDeleteParams: MsgListDeleteParams
    ): Promise<commonResult<string>> {
        const { conv_id, conv_type, params, user_data } = msgListDeleteParams;

        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMMsgListDelete",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    DataType.I32,
                    DataType.String,
                    funcConstructor({
                        paramsType: [
                            DataType.I32,
                            DataType.String,
                            DataType.String,
                            DataType.String,
                        ],
                        retType: DataType.Void,
                    }),
                    DataType.String,
                ],
                paramsValue: [
                    conv_id,
                    conv_type,
                    JSON.stringify(params),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        } else {
                            reject({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        }
                    },
                    user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    /**
     * ### 清空指定会话的消息
     * @category 清空指定会话的消息
     * @param MsgClearHistoryMessageParams
     * @return {Promise<commonResult<T>>} Promise的response返回值为{ code, desc, json_params, user_data }
     */
    TIMMsgClearHistoryMessage(
        msgClearHistoryMessageParams: MsgClearHistoryMessageParams
    ): Promise<commonResult<string>> {
        const { conv_id, conv_type, user_data } = msgClearHistoryMessageParams;

        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMMsgListDelete",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    DataType.I32,
                    funcConstructor({
                        paramsType: [
                            DataType.I32,
                            DataType.String,
                            DataType.String,
                            DataType.String,
                        ],
                        retType: DataType.Void,
                    }),
                    DataType.String,
                ],
                paramsValue: [
                    conv_id,
                    conv_type,
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        } else {
                            reject({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        }
                    },
                    user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    /**
     * ### 设置针对某个用户的 C2C 消息接收选项（支持批量设置）
     * @category 设置针对某个用户的 C2C 消息接收选项
     * @param MsgSetC2CReceiveMessageOptParams
     * @return {Promise<commonResult<T>>} Promise的response返回值为{ code, desc, json_params, user_data }
     * @note
     *  该接口支持批量设置，您可以通过参数 userIDList 设置一批用户，但一次最大允许设置 30 个用户。
     *  该接口调用频率被限制为1秒内最多调用5次。
     */
    TIMMsgSetC2CReceiveMessageOpt(
        msgSetC2CReceiveMessageOptParams: MsgSetC2CReceiveMessageOptParams
    ): Promise<commonResult<string>> {
        const { params, opt, user_data } = msgSetC2CReceiveMessageOptParams;

        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMMsgSetC2CReceiveMessageOpt",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    DataType.I32,
                    funcConstructor({
                        paramsType: [
                            DataType.I32,
                            DataType.String,
                            DataType.String,
                            DataType.String,
                        ],
                        retType: DataType.Void,
                    }),
                    DataType.String,
                ],
                paramsValue: [
                    JSON.stringify(params),
                    opt,
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        } else {
                            reject({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        }
                    },
                    user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    /**
     * ### 查询针对某个用户的 C2C 消息接收选项
     * @category 查询针对某个用户的 C2C 消息接收选项
     * @param MsgGetC2CReceiveMessageOptParams
     * @return {Promise<commonResult<T>>} Promise的response返回值为{ code, desc, json_params, user_data }
     */
    TIMMsgGetC2CReceiveMessageOpt(
        msgGetC2CReceiveMessageOptParams: MsgGetC2CReceiveMessageOptParams
    ): Promise<commonResult<Array<C2CRecvMsgOptResult>>> {
        const { params, user_data } = msgGetC2CReceiveMessageOptParams;

        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMMsgGetC2CReceiveMessageOpt",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    funcConstructor({
                        paramsType: [
                            DataType.I32,
                            DataType.String,
                            DataType.String,
                            DataType.String,
                        ],
                        retType: DataType.Void,
                    }),
                    DataType.String,
                ],
                paramsValue: [
                    JSON.stringify(params),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<C2CRecvMsgOptResult>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param = [] as Array<C2CRecvMsgOptResult>;
                            }
                            resolve({
                                code,
                                desc,
                                json_param,
                                json_params: param,
                                user_data,
                            });
                        } else {
                            reject({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        }
                    },
                    user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * ### 设置群消息的接收选项
     * @category 设置群消息的接收选项
     * @param MsgSetGroupReceiveMessageOptParams
     * @return {Promise<commonResult<T>>} Promise的response返回值为{ code, desc, json_params, user_data }
     * @note
     * 查询群消息的接收选项：您可以在群资料（GroupBaseInfo）中获得这个信息
     */
    TIMMsgSetGroupReceiveMessageOpt(
        msgSetGroupReceiveMessageOptParams: MsgSetGroupReceiveMessageOptParams
    ): Promise<commonResult<string>> {
        const { group_id, opt, user_data } = msgSetGroupReceiveMessageOptParams;

        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMMsgSetGroupReceiveMessageOpt",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    DataType.I32,
                    funcConstructor({
                        paramsType: [
                            DataType.I32,
                            DataType.String,
                            DataType.String,
                            DataType.String,
                        ],
                        retType: DataType.Void,
                    }),
                    DataType.String,
                ],
                paramsValue: [
                    group_id,
                    opt,
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        } else {
                            reject({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        }
                    },
                    user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    /**
     * ### 下载合并消息
     * @category 下载合并消息
     * @param MsgDownloadMergerMessageParams
     * @return {Promise<commonResult<T>> } Promise的response返回值为{ code, desc, json_params, user_data }
     */
    TIMMsgDownloadMergerMessage(
        msgDownloadMergerMessageParams: MsgDownloadMergerMessageParams
    ): Promise<commonResult<string>> {
        const { params, user_data } = msgDownloadMergerMessageParams;

        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMMsgDownloadMergerMessage",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    funcConstructor({
                        paramsType: [
                            DataType.I32,
                            DataType.String,
                            DataType.String,
                            DataType.String,
                        ],
                        retType: DataType.Void,
                    }),
                    DataType.String,
                ],
                paramsValue: [
                    JSON.stringify(params),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        } else {
                            reject({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        }
                    },
                    user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * ### 群发消息，该接口不支持向群组发送消息。
     * @category 群发消息
     * @param MsgBatchSendParams
     * @return {Promise<commonResult<T>>} Promise的response返回值为{ code, desc, json_params, user_data }
     */
    TIMMsgBatchSend(
        msgBatchSendParams: MsgBatchSendParams
    ): Promise<commonResult<Array<BatchSendResult>>> {
        const { params, user_data } = msgBatchSendParams;

        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMMsgDownloadMergerMessage",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    funcConstructor({
                        paramsType: [
                            DataType.I32,
                            DataType.String,
                            DataType.String,
                            DataType.String,
                        ],
                        retType: DataType.Void,
                    }),
                    DataType.String,
                ],
                paramsValue: [
                    JSON.stringify(params),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<BatchSendResult>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param = [] as Array<BatchSendResult>;
                            }
                            resolve({
                                code,
                                desc,
                                json_param,
                                json_params: param,
                                user_data,
                            });
                        } else {
                            reject({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        }
                    },
                    user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * ### 搜索本地消息
     * @category 搜索本地消息
     * @param MsgSearchLocalMessagesParams
     * @return {Promise<commonResult<T>>} Promise的response返回值为{ code, desc, json_params, user_data }
     */
    TIMMsgSearchLocalMessages(
        msgSearchLocalMessagesParams: MsgSearchLocalMessagesParams
    ): Promise<commonResult<MessageSearchResult>> {
        const { params, user_data } = msgSearchLocalMessagesParams;

        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMMsgSearchLocalMessages",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    funcConstructor({
                        paramsType: [
                            DataType.I32,
                            DataType.String,
                            DataType.String,
                            DataType.String,
                        ],
                        retType: DataType.Void,
                    }),
                    DataType.String,
                ],
                paramsValue: [
                    JSON.stringify(params),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: MessageSearchResult;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify({})
                                );
                            } catch {
                                param = {} as MessageSearchResult;
                            }
                            resolve({
                                code,
                                desc,
                                json_param,
                                json_params: param,
                                user_data,
                            });
                        } else {
                            reject({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        }
                    },
                    user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    // callback begin

    /**
     * ### 事件回调接口
     * @category 高级消息相关回调(callback)
     * @param TIMRecvNewMsgCallbackParams
     * @note  如果用户是登录状态，ImSDK收到新消息会通过此接口设置的回调抛出，
     * &emsp;
     * 另外需要注意，抛出的消息不一定是未读的消息，
     * 只是本地曾经没有过的消息（例如在另外一个终端已读，拉取最近联系人消息时可以获取会话最后一条消息，如果本地没有，会通过此方法抛出）。
     * 在用户登录之后，ImSDK会拉取离线消息，为了不漏掉消息通知，需要在登录之前注册新消息通知。
     */
    TIMAddRecvNewMsgCallback(params: TIMRecvNewMsgCallbackParams): void {
        const { callback, user_data = "" } = params;
        this.TIMRemoveRecvNewMsgCallback();
        load({
            library: libName,
            funcName: "TIMAddRecvNewMsgCallback",
            retType: DataType.Void,
            paramsType: [
                callback == null
                    ? DataType.Void
                    : funcConstructor({
                          paramsType: [DataType.String, DataType.String],
                          permanent: true,
                      }),
                DataType.String,
            ],
            paramsValue: [callback, user_data],
        });
    }

    /**
     * ### 下载消息内元素到指定文件路径(图片、视频、音频、文件)
     * @category 下载消息内元素到指定文件路径
     * @param MsgDownloadElemToPathParams
     * @return {Promise<commonResult<T>>} Promise的response返回值为{ code, desc, json_params, user_data }
     */
    TIMMsgDownloadElemToPath(
        msgDownloadElemToPathParams: MsgDownloadElemToPathParams
    ): void {
        const {
            callback,
            user_data = "",
            params,
            path,
        } = msgDownloadElemToPathParams;

        load({
            library: libName,
            funcName: "TIMMsgDownloadElemToPath",
            retType: DataType.Void,
            paramsType: [
                DataType.String,
                DataType.String,
                funcConstructor({
                    paramsType: [DataType.String, DataType.String],
                    permanent: true,
                }),
                DataType.String,
            ],
            paramsValue: [JSON.stringify(params), path, callback, user_data],
        });
    }
    /**
     * 消息扩展改变回调
     */
    TIMSetMsgExtensionsChangedCallback(
        params: TIMSetMsgExtensionsChangedCallbackParam
    ): void {
        const { callback, user_data = "" } = params;

        load({
            library: libName,
            funcName: "TIMSetMsgExtensionsChangedCallback",
            retType: DataType.Void,
            paramsType: [
                callback == null
                    ? DataType.Void
                    : funcConstructor({
                          paramsType: [DataType.String, DataType.String],
                          permanent: true,
                      }),
                DataType.String,
            ],
            paramsValue: [callback, user_data],
        });
    }
    /**
     * 消息扩展删除回调
     */
    TIMSetMsgExtensionsDeletedCallback(
        params: TIMSetMsgExtensionsDeletedCallbackParam
    ): void {
        const { callback, user_data = "" } = params;

        load({
            library: libName,
            funcName: "TIMSetMsgExtensionsDeletedCallback",
            retType: DataType.Void,
            paramsType: [
                callback == null
                    ? DataType.Void
                    : funcConstructor({
                          paramsType: [DataType.String, DataType.String],
                          permanent: true,
                      }),
                DataType.String,
            ],
            paramsValue: [callback, user_data],
        });
    }

    TIMMsgSetMessageExtensions(
        msgSetMessageExtensionsParam: TIMMsgSetMessageExtensionsParam
    ): Promise<commonResult<string>> {
        const { json_msg, json_extension_array, user_data } =
            msgSetMessageExtensionsParam;

        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMMsgSetMessageExtensions",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    DataType.String,
                    funcConstructor({
                        paramsType: [
                            DataType.I32,
                            DataType.String,
                            DataType.String,
                            DataType.String,
                        ],
                        retType: DataType.Void,
                    }),
                    DataType.String,
                ],
                paramsValue: [
                    JSON.stringify(json_msg),
                    JSON.stringify(json_extension_array),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        } else {
                            reject({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        }
                    },
                    user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    TIMMsgGetMessageExtensions(
        msgGetMessageExtensions: TIMMsgGetMessageExtensionsParam
    ): Promise<commonResult<Array<MessageExtensionResult>>> {
        const { json_msg, user_data } = msgGetMessageExtensions;

        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMMsgGetMessageExtensions",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    funcConstructor({
                        paramsType: [
                            DataType.I32,
                            DataType.String,
                            DataType.String,
                            DataType.String,
                        ],
                        retType: DataType.Void,
                    }),
                    DataType.String,
                ],
                paramsValue: [
                    JSON.stringify(json_msg),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<MessageExtensionResult>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param = [] as Array<MessageExtensionResult>;
                            }
                            resolve({
                                code,
                                desc,
                                json_param,
                                json_params: param,
                                user_data,
                            });
                        } else {
                            reject({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        }
                    },
                    user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    TIMMsgDeleteMessageExtensions(
        msgDeleteMessageExtensions: TIMMsgDeleteMessageExtensionsParam
    ): Promise<commonResult<Array<MessageExtension>>> {
        const { json_msg, json_extension_key_array, user_data } =
            msgDeleteMessageExtensions;

        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMMsgDeleteMessageExtensions",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    DataType.String,
                    funcConstructor({
                        paramsType: [
                            DataType.I32,
                            DataType.String,
                            DataType.String,
                            DataType.String,
                        ],
                        retType: DataType.Void,
                    }),
                    DataType.String,
                ],
                paramsValue: [
                    JSON.stringify(json_msg),
                    JSON.stringify(json_extension_key_array),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<MessageExtension>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param = [] as Array<MessageExtension>;
                            }
                            resolve({
                                code,
                                desc,
                                json_param,
                                json_params: param,
                                user_data,
                            });
                        } else {
                            reject({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        }
                    },
                    user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    /**
     * ### 删除接收新消息回调
     * @category 高级消息相关回调(callback)
     * @note 参数cb需要跟TIMAddRecvNewMsgCallback传入的cb一致，否则删除回调失败
     */
    TIMRemoveRecvNewMsgCallback(): void {
        load({
            library: libName,
            funcName: "TIMRemoveRecvNewMsgCallback",
            retType: DataType.Void,
            paramsType: [],
            paramsValue: [],
        });
    }
    /**
     * ### 设置消息已读回执回调
     * @category 高级消息相关回调(callback)
     * @param TIMMsgReadedReceiptCallbackParams
     * @note  发送方发送消息，接收方调用接口TIMMsgReportReaded上报该消息已读，发送方ImSDK会通过此接口设置的回调抛出。
     */
    TIMSetMsgReadedReceiptCallback(
        params: TIMMsgReadedReceiptCallbackParams
    ): void {
        const { callback, user_data = "" } = params;

        load({
            library: libName,
            funcName: "TIMSetMsgReadedReceiptCallback",
            retType: DataType.Void,
            paramsType: [
                callback == null
                    ? DataType.Void
                    : funcConstructor({
                          paramsType: [DataType.String, DataType.String],
                          permanent: true,
                      }),
                DataType.String,
            ],
            paramsValue: [callback, user_data],
        });
    }
    /**
     * ### 设置接收的消息被撤回回调
     * @category 高级消息相关回调(callback)
     * @param TIMMsgRevokeCallbackParams
     * @note
     * 发送方发送消息，接收方收到消息。此时发送方调用接口TIMMsgRevoke撤回该消息，接收方的ImSDK会通过此接口设置的回调抛出。
     */
    TIMSetMsgRevokeCallback(params: TIMMsgRevokeCallbackParams): void {
        const { callback, user_data = "" } = params;

        load({
            library: libName,
            funcName: "TIMSetMsgRevokeCallback",
            retType: DataType.Void,
            paramsType: [
                callback == null
                    ? DataType.Void
                    : funcConstructor({
                          paramsType: [DataType.String, DataType.String],
                          permanent: true,
                      }),
                DataType.String,
            ],
            paramsValue: [callback, user_data],
        });
    }
    /**
     * ### 设置消息内元素相关文件上传进度回调
     * @category 高级消息相关回调(callback)
     * @param TIMMsgElemUploadProgressCallbackParams
     * @note
     * 设置消息元素上传进度回调。当消息内包含图片、声音、文件、视频元素时，ImSDK会上传这些文件，并触发此接口设置的回调，用户可以根据回调感知上传的进度
     */
    //TODO native 返回的user_data为空，等修复，先兼容
    TIMSetMsgElemUploadProgressCallback(
        params: TIMMsgElemUploadProgressCallbackParams
    ): void {
        const { callback, user_data = "" } = params;

        load({
            library: libName,
            funcName: "TIMSetMsgElemUploadProgressCallback",
            retType: DataType.Void,
            paramsType: [
                callback == null
                    ? DataType.Void
                    : funcConstructor({
                          paramsType: [
                              DataType.String,
                              DataType.I32,
                              DataType.I32,
                              DataType.I32,
                              DataType.String,
                          ],
                          permanent: true,
                      }),
                DataType.String,
            ],
            paramsValue: [callback, user_data],
        });
    }
    /**
     * ### 设置消息在云端被修改后回传回来的消息更新通知回调
     * @param TIMMsgUpdateCallbackParams
     * @category 高级消息相关回调(callback)
     *  @note
     * &emsp;
     * > 当您发送的消息在服务端被修改后，ImSDK会通过该回调通知给您
     * > 您可以在您自己的服务器上拦截所有即时通信IM消息 [发单聊消息之前回调](https://cloud.tencent.com/document/product/269/1632)
     * > 设置成功之后，即时通信IM服务器会将您的用户发送的每条消息都同步地通知给您的业务服务器。
     * > 您的业务服务器可以对该条消息进行修改（例如过滤敏感词），如果您的服务器对消息进行了修改，ImSDK就会通过此回调通知您。
     */
    TIMSetMsgUpdateCallback(params: TIMMsgUpdateCallbackParams): void {
        const { callback, user_data = "" } = params;

        load({
            library: libName,
            funcName: "TIMSetMsgUpdateCallback",
            retType: DataType.Void,
            paramsType: [
                callback == null
                    ? DataType.Void
                    : funcConstructor({
                          paramsType: [DataType.String, DataType.String],
                          permanent: true,
                      }),
                DataType.String,
            ],
            paramsValue: [callback, user_data],
        });
    }
    // callback end
    /**
     * @brief 设置离线推送配置信息（MacOS专用）
     * @param offlinePushParam
     * @note
     * > 接口成功设置后会开启离线推送功能，如果您需要自定义推送的格式信息，请参考  TIMMsgSendMessage 接口。
     * > 如果您想关闭离线推送，请把 json_token 设置为 NULL。
     */
    TIMMsgSetOfflinePushToken(
        offlinePushParam: OfflinePushToken
    ): Promise<commonResult<string>> {
        const { param, user_data } = offlinePushParam;

        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMMsgSetOfflinePushToken",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    funcConstructor({
                        paramsType: [
                            DataType.I32,
                            DataType.String,
                            DataType.String,
                            DataType.String,
                        ],
                        retType: DataType.Void,
                    }),
                    DataType.String,
                ],
                paramsValue: [
                    JSON.stringify(param),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        } else {
                            reject({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        }
                    },
                    user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    TIMMsgTranslateText(
        param: TranslateTextParam
    ): Promise<commonResult<Array<MessageTranslateTextResult>>> {
        const {
            json_source_text_array,
            source_language,
            target_language,
            user_data,
        } = param;

        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMMsgTranslateText",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    DataType.String,
                    DataType.String,
                    funcConstructor({
                        paramsType: [
                            DataType.I32,
                            DataType.String,
                            DataType.String,
                            DataType.String,
                        ],
                        retType: DataType.Void,
                    }),
                    DataType.String,
                ],
                paramsValue: [
                    JSON.stringify(json_source_text_array),
                    source_language,
                    target_language,
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<MessageTranslateTextResult>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param = [] as Array<MessageTranslateTextResult>;
                            }
                            resolve({
                                code,
                                desc,
                                json_param,
                                json_params: param,
                                user_data,
                            });
                        } else {
                            reject({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        }
                    },
                    user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    TIMMsgConvertVoiceToText(
        params: ConvertVoiceToTextParam
    ): Promise<commonResult<string>> {
        const { url, language, user_data } = params;

        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMMsgConvertVoiceToText",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    DataType.String,
                    funcConstructor({
                        paramsType: [
                            DataType.I32,
                            DataType.String,
                            DataType.String,
                            DataType.String,
                        ],
                        retType: DataType.Void,
                    }),
                    DataType.String,
                ],
                paramsValue: [
                    url,
                    language,
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        } else {
                            reject({
                                code,
                                desc,
                                json_param,
                                json_params: json_param,
                                user_data,
                            });
                        }
                    },
                    user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
}
export default AdvanceMessageManage;

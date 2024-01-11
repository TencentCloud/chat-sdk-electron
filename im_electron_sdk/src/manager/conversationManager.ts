/**
 * 会话，即登录微信或 QQ 后首屏看到的一个个聊天会话，包含会话节点、会话名称、群名称、最后一条消息以及未读消息数等元素。
 * @module ConversationManager(会话相关接口)
 */
import { commonResult, sdkconfig } from "../interface";
import {
    convCreate,
    convDelete,
    getConvList,
    convSetDrat,
    convCancelDraft,
    convGetConvInfo,
    convPinConversation,
    convGetTotalUnreadMessageCount,
    setConvEventCallback,
    convTotalUnreadMessageCountChangedCallbackParam,
    convInfo,
    totalUnreadCountResult,
    TIMConversationListFilter,
    TIMConversationListResult,
    MarkConversationParam,
    TIMConversationOperationResult,
    createConversationGroupParam,
    getConvGroupList,
    deleteConvGroupParam,
    renameConvGroupParam,
    convGroupListResult,
    setConvCustomDataParam,
    CleanUnreadMessageCoutParam,
    DeleteConvListParam,
    convUnreadMessageCountChangedByFilterCallbackParam,
    convGroupCreatedCallbackParam,
    convGroupDeletedCallbackParam,
    convGroupNameChangedCallback,
} from "../interface/conversationInterface";

const {
    load,
    DataType,

    funcConstructor,
} = require("ffi-rs");
const libName = "libImSDK";

class ConversationManager {
    private _sdkconfig: sdkconfig;

    setSDKAPPID(sdkappid: number) {
        this._sdkconfig.sdkappid = sdkappid;
    }

    /** @internal */
    constructor(config: sdkconfig) {
        this._sdkconfig = config;
    }
    /**
     * ###  创建会话
     * @param convCreate
     * @category 创建会话
     * @return  {Promise<commonResponse>} Promise的response返回值为：{ code, desc, json_param, user_data }
     * @note &emsp;
     * > 会话是指面向一个人或者一个群组的对话，通过与单个人或群组之间会话收发消息
     * > 此接口创建或者获取会话信息，需要指定会话类型（群组或者单聊），以及会话对方标志（对方帐号或者群号）。会话信息通过cb回传。
     */
    TIMConvCreate(param: convCreate): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMConvCreate",
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
                    param.convId,
                    param.convType,
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
                    param.userData ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * ### 删除会话
     * @param convDelete
     * @category 删除会话
     * @return  {Promise<commonResponse>} Promise的response返回值为：{ code, desc, json_param, user_data }
     * @note
     * 此接口用于删除会话，删除会话是否成功通过回调返回。
     */
    TIMConvDelete(param: convDelete): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMConvDelete",
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
                    param.convId,
                    param.convType,
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
                    param.userData ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief 删除会话列表
     * @note 请注意：每次最多支持删除100个会话
     */
    TIMConvDeleteConversationList(
        param: DeleteConvListParam
    ): Promise<commonResult<Array<TIMConversationOperationResult>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMConvDeleteConversationList",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    DataType.Boolean,
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
                    JSON.stringify(param.conversation_id_array),
                    param.clearMessage,
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<TIMConversationOperationResult>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param =
                                    [] as Array<TIMConversationOperationResult>;
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
                    param.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * ### 获取最近联系人的会话列表
     * @param getConvList
     * @category 获取最近联系人的会话列表
     * @return  {Promise<commonResponse>} Promise的response返回值为：{ code, desc, json_param, user_data }
     * @note
     * 会话草稿一般用在保存用户当前输入的未发送的消息。
     */
    async TIMConvGetConvList(
        param: getConvList
    ): Promise<commonResult<Array<convInfo>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMConvGetConvList",
                retType: DataType.I32,
                paramsType: [
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
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let arrayparam: Array<convInfo>;
                            try {
                                arrayparam = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                arrayparam = [] as Array<convInfo>;
                            }
                            resolve({
                                code,
                                desc,
                                json_param: arrayparam,
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
                    param.userData ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * ### 设置指定会话的草稿
     * @category 设置指定会话的草稿
     * @param convSetDrat
     * @return number 返回TIM_SUCC表示接口调用成功，其他值表示接口调用失败。每个返回值的定义请参考 [TIMResult](../../doc/enums/timresult.html)
     * @note
     * 会话草稿一般用在保存用户当前输入的未发送的消息。
     */
    TIMConvSetDraft(param: convSetDrat): number {
        const code = load({
            library: libName,
            funcName: "TIMConvSetDraft",
            retType: DataType.I32,
            paramsType: [DataType.String, DataType.I32, DataType.String],
            paramsValue: [
                param.convId,
                param.convType,
                JSON.stringify(param.draftParam),
            ],
        });
        return code;
    }
    /**
     * ### 删除指定会话的草稿
     * @param convCancelDraft
     * @category 删除指定会话的草稿
     * @return int 返回TIM_SUCC表示接口调用成功，其他值表示接口调用失败。每个返回值的定义请参考 [TIMResult](../../doc/enums/timresult.html)
     * @note &emsp;
     * > 会话是指面向一个人或者一个群组的对话，通过与单个人或群组之间会话收发消息
     * > 此接口创建或者获取会话信息，需要指定会话类型（群组或者单聊），以及会话对方标志（对方帐号或者群号）。会话信息通过cb回传。
     */
    TIMConvCancelDraft(param: convCancelDraft): number {
        const code = load({
            library: libName,
            funcName: "TIMConvCancelDraft",
            retType: DataType.I32,
            paramsType: [DataType.String, DataType.I32],
            paramsValue: [param.convId, param.convType],
        });
        return code;
    }
    /**
     * ### 获取指定会话列表
     * @category 获取指定会话列表
     * @param convGetConvInfo
     * @return  {Promise<commonResponse>} Promise的response返回值为：{ code, desc, json_param, user_data }
     *   */
    TIMConvGetConvInfo(
        param: convGetConvInfo
    ): Promise<commonResult<Array<convInfo>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMConvGetConvInfo",
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
                    JSON.stringify(param.json_get_conv_list_param),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<convInfo>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param = [] as Array<convInfo>;
                            }
                            resolve({
                                code,
                                desc,
                                json_param: param,
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
                    param.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * ### 设置会话置顶
     * @category 设置会话置顶
     * @param convPinConversation
     * @return  {Promise<commonResponse>} Promise的response返回值为：{ code([错误码(https://cloud.tencent.com/document/product/269/1671)), desc, json_param, user_data }
     */
    TIMConvPinConversation(
        param: convPinConversation
    ): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMConvPinConversation",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    DataType.I32,
                    DataType.Boolean,
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
                    param.convId,
                    param.convType,
                    param.isPinned,
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
                    param.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * ### 获取所有会话总的未读消息数
     * @category 获取所有会话总的未读消息数
     * @param convGetTotalUnreadMessageCount
     * @return  {Promise<commonResponse>} Promise的response返回值为：{ code, desc, json_param, user_data }
     */
    TIMConvGetTotalUnreadMessageCount(
        param: convGetTotalUnreadMessageCount
    ): Promise<commonResult<totalUnreadCountResult>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMConvGetTotalUnreadMessageCount",
                retType: DataType.I32,
                paramsType: [
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
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: totalUnreadCountResult;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify({})
                                );
                            } catch {
                                param = {} as totalUnreadCountResult;
                            }
                            resolve({
                                code,
                                desc,
                                json_param: param,
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
                    param.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief 根据 filter 获取未读总数
     * @note 未读总数会减去设置为免打扰的会话的未读数，即消息接收选项设置为 kTIMRecvMsgOpt_Not_Receive 或 kTIMRecvMsgOpt_Not_Notify 的会话。
     * @param TIMConversationListFilter 中不要填写next_seq 和 count部分
     */
    TIMConvGetUnreadMessageCountByFilter(
        unreadMessageCoutByFilterParam: TIMConversationListFilter
    ): Promise<commonResult<totalUnreadCountResult>> {
        const { params, user_data } = unreadMessageCoutByFilterParam;

        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMConvGetUnreadMessageCountByFilter",
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
                            let param: totalUnreadCountResult;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify({})
                                );
                            } catch {
                                param = {} as totalUnreadCountResult;
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
     * @brief 注册监听指定 filter 的会话未读总数变化
     * @param TIMConversationListFilter 中不要填写next_seq 和 count部分
     * @note
     * - 当您调用这个接口以后，该 filter 下的未读数发生变化时，SDK 会给您抛 TIMSetConvUnreadMessageCountChangedByFilterCallback 注册的回调。
     */
    TIMConvSubscribeUnreadMessageCountByFilter(
        subscribeParam: TIMConversationListFilter
    ): number {
        const { params } = subscribeParam;

        const code = load({
            library: libName,
            funcName: "TIMConvSubscribeUnreadMessageCountByFilter",
            retType: DataType.I32,
            paramsType: [DataType.String],
            paramsValue: [JSON.stringify(params)],
        });
        return code;
    }
    /**
     * @brief 取消监听指定 filter 的会话未读总数变化
     * @param TIMConversationListFilter 中不要填写next_seq 和 count部分
     */
    TIMConvUnsubscribeUnreadMessageCountByFilter(
        unsubscribeParam: TIMConversationListFilter
    ): number {
        const { params } = unsubscribeParam;

        const code = load({
            library: libName,
            funcName: "TIMConvUnsubscribeUnreadMessageCountByFilter",
            retType: DataType.I32,
            paramsType: [DataType.String],
            paramsValue: [JSON.stringify(params)],
        });
        return code;
    }
    /**
     * @brief 清理会话的未读消息计数
     * @note
     * - 当您想清理所有单聊会话的未读消息计数，conversation_id 请传入 "c2c"，即不指定具体的 userID；
     * - 当您想清理所有群聊会话的未读消息计数，conversation_id 请传入 "group"，即不指定具体的 groupID；
     * - 当您想清理所有会话的未读消息计数，conversation_id 请传入 "" 或者 nullptr；
     * - 该接口调用成功后，SDK 会通过 onConversationChanged 回调将对应会话的最新未读数通知给您。
     */
    TIMConvCleanConversationUnreadMessageCount(
        param: CleanUnreadMessageCoutParam
    ): Promise<commonResult<Array<TIMConversationOperationResult>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMConvCleanConversationUnreadMessageCount",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    DataType.I64,
                    DataType.I64,
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
                    param.conversation_id,
                    param.clean_timestamp,
                    param.clean_sequence,
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<TIMConversationOperationResult>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param =
                                    [] as Array<TIMConversationOperationResult>;
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
                    param.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * ### 获取会话列表高级接口（从 6.5 版本开始支持）
     * @param TIMConversationListFilter
     * @category 获取会话列表高级接口（从 6.5 版本开始支持）
     * @return  {Promise<commonResponse>} Promise的response返回值为：{ code, desc, json_param, user_data }
     */
    TIMConvGetConversationListByFilter(
        convListByFilterparam: TIMConversationListFilter
    ): Promise<commonResult<TIMConversationListResult>> {
        const { params, user_data } = convListByFilterparam;
        // const c_user_data = this.stringFormator(user_data);
        const seq = params.conversation_list_filter_next_seq ?? 0;
        const count = params.conversation_list_filter_count ?? 20;
        //@ts-ignore
        delete params.conversation_list_filter_next_seq;
        //@ts-ignore
        delete params.conversation_list_filter_count;
        // const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMConvGetConversationListByFilter",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    DataType.I64,
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
                    JSON.stringify(convListByFilterparam.params),
                    seq,
                    count,
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: TIMConversationListResult;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify({})
                                );
                            } catch {
                                param = {} as TIMConversationListResult;
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
     * ### 标记会话（从 6.5 版本开始支持，需要您购买旗舰版套餐）
     * @param MarkConversationParam
     * @category 标记会话（从 6.5 版本开始支持，需要您购买旗舰版套餐）
     * @return  {Promise<commonResponse>} Promise的response返回值为：{ code, desc, json_param, user_data }
     * @note 如果已有标记不能满足您的需求，您可以自定义扩展标记，扩展标记需要满足以下两个条件：
     * 1、扩展标记值不能和 V2TIMConversationMarkType 已有的标记值冲突
     * 2、扩展标记值必须是 0x1LL << n 的位移值（32 <= n < 64，即 n 必须大于等于 32 并且小于 64），比如扩展标记值 0x1LL << 32 表示 "Windows 在线"
     *
     * 扩展标记值不能设置为 0x1 << 32，要设置为 0x1LL << 32，明确告诉编译器是 64 位的整型常量。
     */
    TIMConvMarkConversation(
        markConvParam: MarkConversationParam
    ): Promise<commonResult<Array<TIMConversationOperationResult>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMConvMarkConversation",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    DataType.I64,
                    DataType.Boolean,
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
                    JSON.stringify(markConvParam.conversation_id_array),
                    markConvParam.mark_type,
                    markConvParam.enable_mark,
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<TIMConversationOperationResult>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param =
                                    [] as Array<TIMConversationOperationResult>;
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
                    markConvParam.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * ### 创建会话分组（从 6.5 版本开始支持，需要您购买旗舰版套餐）
     * @param createConversationGroupParam
     * @category 创建会话分组（从 6.5 版本开始支持，需要您购买旗舰版套餐）
     * @return  {Promise<commonResponse>} Promise的response返回值为：{ code, desc, json_param, user_data }
     */
    TIMConvCreateConversationGroup(
        createConvGroupParam: createConversationGroupParam
    ): Promise<commonResult<Array<TIMConversationOperationResult>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMConvCreateConversationGroup",
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
                    createConvGroupParam.group_name,
                    JSON.stringify(createConvGroupParam.conversation_id_array),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<TIMConversationOperationResult>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param =
                                    [] as Array<TIMConversationOperationResult>;
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
                    createConvGroupParam.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * ### 获取会话分组列表（从 6.5 版本开始支持，需要您购买旗舰版套餐）
     * @param getConvGroupList
     * @category 获取会话分组列表（从 6.5 版本开始支持，需要您购买旗舰版套餐）
     * @return  {Promise<commonResponse>} Promise的response返回值为：{ code, desc, json_param, user_data }
     * @note 会话分组最大支持 20 个，不再使用的分组请及时删除。
     */
    TIMConvGetConversationGroupList(
        getConvGroupListParam: getConvGroupList
    ): Promise<commonResult<convGroupListResult>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMConvGetConversationGroupList",
                retType: DataType.I32,
                paramsType: [
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
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<string>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param = [] as Array<string>;
                            }
                            let result: convGroupListResult = {
                                conv_group_array: param,
                            };
                            resolve({
                                code,
                                desc,
                                json_param,
                                json_params: result,
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
                    getConvGroupListParam.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * ### 删除会话分组（从 6.5 版本开始支持，需要您购买旗舰版套餐）
     * @param deleteConvGroupParam
     * @category 删除会话分组（从 6.5 版本开始支持，需要您购买旗舰版套餐）
     * @return  {Promise<commonResponse>} Promise的response返回值为：{ code, desc, json_param, user_data }
     */
    TIMConvDeleteConversationGroup(
        param: deleteConvGroupParam
    ): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMConvDeleteConversationGroup",
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
                    param.group_name,
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
                    param.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * ### 重命名会话分组（从 6.5 版本开始支持，需要您购买旗舰版套餐）
     * @param renameConvGroupParam
     * @category 重命名会话分组（从 6.5 版本开始支持，需要您购买旗舰版套餐）
     * @return  {Promise<commonResponse>} Promise的response返回值为：{ code, desc, json_param, user_data }
     */
    TIMConvRenameConversationGroup(
        renameParam: renameConvGroupParam
    ): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMConvRenameConversationGroup",
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
                    renameParam.old_name,
                    renameParam.new_name,
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
                    renameParam.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * ### 添加会话到一个会话分组（从 6.5 版本开始支持，需要您购买旗舰版套餐）
     * @param createConversationGroupParam
     * @category 添加会话到一个会话分组（从 6.5 版本开始支持，需要您购买旗舰版套餐）
     * @return  {Promise<commonResponse>} Promise的response返回值为：{ code, desc, json_param, user_data }
     */
    TIMConvAddConversationsToGroup(
        addConvToGroupParam: createConversationGroupParam
    ): Promise<commonResult<Array<TIMConversationOperationResult>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMConvAddConversationsToGroup",
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
                    addConvToGroupParam.group_name,
                    JSON.stringify(addConvToGroupParam.conversation_id_array),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<TIMConversationOperationResult>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param =
                                    [] as Array<TIMConversationOperationResult>;
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
                    addConvToGroupParam.user_data ?? "",
                ],
            });

            code !== 0 && reject({ code });
        });
    }
    /**
     * ### 从会话分组中删除多个会话（从 6.5 版本开始支持，需要您购买旗舰版套餐）
     * @param createConversationGroupParam
     * @category 从会话分组中删除多个会话（从 6.5 版本开始支持，需要您购买旗舰版套餐）
     * @return  {Promise<commonResponse>} Promise的response返回值为：{ code, desc, json_param, user_data }
     */
    TIMConvDeleteConversationsFromGroup(
        deleteConvFromGroupParam: createConversationGroupParam
    ): Promise<commonResult<Array<TIMConversationOperationResult>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMConvDeleteConversationsFromGroup",
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
                    deleteConvFromGroupParam.group_name,
                    JSON.stringify(
                        deleteConvFromGroupParam.conversation_id_array
                    ),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<TIMConversationOperationResult>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param =
                                    [] as Array<TIMConversationOperationResult>;
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
                    deleteConvFromGroupParam.user_data ?? "",
                ],
            });

            code !== 0 && reject({ code });
        });
    }
    /**
     * ### 设置会话自定义数据（从 6.5 版本开始支持）
     * @param setConvCustomDataParam
     * @category 设置会话自定义数据（从 6.5 版本开始支持）
     * @return  {Promise<commonResponse>} Promise的response返回值为：{ code, desc, json_param, user_data }
     */
    TIMConvSetConversationCustomData(
        setConvCustomDataParam: setConvCustomDataParam
    ): Promise<commonResult<Array<TIMConversationOperationResult>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMConvSetConversationCustomData",
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
                    JSON.stringify(
                        setConvCustomDataParam.conversation_id_array
                    ),
                    setConvCustomDataParam.custom_data,
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<TIMConversationOperationResult>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param =
                                    [] as Array<TIMConversationOperationResult>;
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
                    setConvCustomDataParam.user_data ?? "",
                ],
            });

            code !== 0 && reject({ code });
        });
    }

    // TODO这个参数有问题
    /**
     * ### 设置会话事件回调
     * @category 会话相关回调(callback)
     * @param setConvEventCallback
     * @note
     *
     *  会话事件包括：
     * > 会话新增
     * > 会话删除
     * > 会话更新。
     * > 会话开始
     * > 会话结束
     * > 任何产生一个新会话的操作都会触发会话新增事件，例如调用接口[TIMConvCreate]()创建会话，接收到未知会话的第一条消息等。
     * 任何已有会话变化的操作都会触发会话更新事件，例如收到会话新消息，消息撤回，已读上报等。
     * 调用接口[TIMConvDelete]()删除会话成功时会触发会话删除事件。
     */
    async TIMSetConvEventCallback(param: setConvEventCallback): Promise<any> {
        const { callback } = param;
        load({
            library: libName,
            funcName: "TIMSetConvEventCallback",
            retType: DataType.Void,
            paramsType: [
                callback == null
                    ? DataType.Void
                    : funcConstructor({
                          paramsType: [
                              DataType.I32,
                              DataType.String,
                              DataType.String,
                          ],
                          permanent: true,
                      }),
                DataType.String,
            ],
            paramsValue: [callback, param.user_data ?? ""],
        });
    }
    /**
     * ### 设置会话未读消息总数变更的回调
     * @param convTotalUnreadMessageCountChangedCallbackParam
     * @category 会话相关回调(callback)
     * @return  {Promise<any>} Promise的response返回值为：{ code, desc, json_param, user_data }
     */
    // TODO 这里的promise，返回可以删掉
    async TIMSetConvTotalUnreadMessageCountChangedCallback(
        param: convTotalUnreadMessageCountChangedCallbackParam
    ) {
        const { callback } = param;

        load({
            library: libName,
            funcName: "TIMSetConvTotalUnreadMessageCountChangedCallback",
            retType: DataType.Void,
            paramsType: [
                callback == null
                    ? DataType.Void
                    : funcConstructor({
                          paramsType: [DataType.I32, DataType.String],
                          permanent: true,
                      }),
                DataType.String,
            ],
            paramsValue: [callback, param.user_data ?? ""],
        });
    }
    /**
     * @brief 设置按会话 filter 过滤的未读消息总数变更的回调
     * @note
     * - 您可以调用 subscribeUnreadMessageCountByFilter 注册监听指定 filter 下的未读总数变化，SDK 通过这个回调把最新的未读总数通知给您。
     * - 您可以注册监听多个不同 filter 下的未读总数变更，这个回调的 filter 参数就是注册监听时指定的 filter，该 filter 携带了 kTIMConversationListFilterConvType、kTIMConversationListFilterMarkType、kTIMConversationListFilterGroupName 三个字段，通过判断这三字段是不是都相同，来区分出不同的 filter。
     * - 未读总数会减去设置为免打扰的会话的未读数，即消息接收选项设置为 kTIMRecvMsgOpt_Not_Receive 或 kTIMRecvMsgOpt_Not_Notify 的会话。
     */
    async TIMSetConvUnreadMessageCountChangedByFilterCallback(
        param: convUnreadMessageCountChangedByFilterCallbackParam
    ) {
        const { callback } = param;

        load({
            library: libName,
            funcName: "TIMSetConvUnreadMessageCountChangedByFilterCallback",
            retType: DataType.Void,
            paramsType: [
                callback == null
                    ? DataType.Void
                    : funcConstructor({
                          paramsType: [
                              DataType.String,
                              DataType.I32,
                              DataType.String,
                          ],
                          permanent: true,
                      }),
                DataType.String,
            ],
            paramsValue: [callback, param.user_data ?? ""],
        });
    }
    /**
     * @brief 会话分组被创建回调
     */
    async TIMSetConvConversationGroupCreatedCallback(
        param: convGroupCreatedCallbackParam
    ) {
        const { callback } = param;
        load({
            library: libName,
            funcName: "TIMSetConvConversationGroupCreatedCallback",
            retType: DataType.Void,
            paramsType: [
                callback == null
                    ? DataType.Void
                    : funcConstructor({
                          paramsType: [
                              DataType.String,
                              DataType.String,
                              DataType.String,
                          ],
                          permanent: true,
                      }),
                DataType.String,
            ],
            paramsValue: [callback, param.user_data ?? ""],
        });
    }
    /**
     * @brief 会话分组被删除回调
     */
    async TIMSetConvConversationGroupDeletedCallback(
        param: convGroupDeletedCallbackParam
    ) {
        const { callback } = param;

        load({
            library: libName,
            funcName: "TIMSetConvConversationGroupDeletedCallback",
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
            paramsValue: [callback, param.user_data ?? ""],
        });
    }
    /**
     * @brief 会话分组名变更回调
     */
    async TIMSetConvConversationGroupNameChangedCallback(
        param: convGroupNameChangedCallback
    ) {
        const { callback } = param;

        load({
            library: libName,
            funcName: "TIMSetConvConversationGroupNameChangedCallback",
            retType: DataType.Void,
            paramsType: [
                callback == null
                    ? DataType.Void
                    : funcConstructor({
                          paramsType: [
                              DataType.String,
                              DataType.String,
                              DataType.String,
                          ],
                          permanent: true,
                      }),
                DataType.String,
            ],
            paramsValue: [callback, param.user_data ?? ""],
        });
    }
    /**
     * @brief 会话分组新增会话回调
     */
    async TIMSetConvConversationsAddedToGroupCallback(
        param: convGroupCreatedCallbackParam
    ) {
        const { callback } = param;

        load({
            library: libName,
            funcName: "TIMSetConvConversationsAddedToGroupCallback",
            retType: DataType.Void,
            paramsType: [
                callback == null
                    ? DataType.Void
                    : funcConstructor({
                          paramsType: [
                              DataType.String,
                              DataType.String,
                              DataType.String,
                          ],
                          permanent: true,
                      }),
                DataType.String,
            ],
            paramsValue: [callback, param.user_data ?? ""],
        });
    }
    /**
     * @brief 会话分组删除会话回调
     */
    async TIMSetConvConversationsDeletedFromGroupCallback(
        param: convGroupCreatedCallbackParam
    ) {
        const { callback } = param;

        load({
            library: libName,
            funcName: "TIMSetConvConversationsDeletedFromGroupCallback",
            retType: DataType.Void,
            paramsType: [
                callback == null
                    ? DataType.Void
                    : funcConstructor({
                          paramsType: [
                              DataType.String,
                              DataType.String,
                              DataType.String,
                          ],
                          permanent: true,
                      }),
                DataType.String,
            ],
            paramsValue: [callback, param.user_data ?? ""],
        });
    }
}
export default ConversationManager;

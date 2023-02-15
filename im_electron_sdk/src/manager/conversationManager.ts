/**
 * 会话，即登录微信或 QQ 后首屏看到的一个个聊天会话，包含会话节点、会话名称、群名称、最后一条消息以及未读消息数等元素。
 * @module ConversationManager(会话相关接口)
 */
import {
    cache,
    CommonCallbackFun,
    commonResponse,
    commonResult,
    ErrorResponse,
    sdkconfig,
} from "../interface";
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
} from "../interface/conversationInterface";
import {
    jsFuncToFFIConvEventCallback,
    jsFuncToFFIFun,
    jsFunToFFITIMSetConvTotalUnreadMessageCountChangedCallback,
    nodeStrigToCString,
    randomString,
} from "../utils/utils";

class ConversationManager {
    private _sdkconfig: sdkconfig;
    private _callback: Map<String, Function> = new Map();
    private _ffiCallback: Map<String, Buffer> = new Map();
    private _cache: Map<String, Map<string, cache>> = new Map();
    private _globalUserData: Map<string, string> = new Map();
    private stringFormator = (str: string | undefined): string =>
        str ? nodeStrigToCString(str) : nodeStrigToCString("");

    getErrorResponse(params: ErrorResponse) {
        return {
            code: params.code || -1,
            desc: params.desc || "error",
            json_params: params.json_params || "",
            user_data: params.user_data || "",
        };
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
    TIMConvCreate(param: convCreate): Promise<commonResult<convInfo>> {
        const convId = nodeStrigToCString(param.convId);
        const convType = param.convType;
        const userData = param.userData
            ? nodeStrigToCString(param.userData)
            : nodeStrigToCString("");
        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
                let param: convInfo =
                    json_param == "" ? {} : JSON.parse(json_param);
                if (code === 0) {
                    resolve({ code, desc, json_param: param, user_data });
                } else {
                    reject({ code, desc, json_param: param, user_data });
                }
                this._cache.get("TIMConvCreate")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMConvCreate");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: cb,
                callback: callback,
            });
            this._cache.set("TIMConvCreate", cacheMap);
            const code: number = this._sdkconfig.Imsdklib.TIMConvCreate(
                convId,
                convType,
                this._cache.get("TIMConvCreate")?.get(now)?.callback,
                userData
            );
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
        const convId = nodeStrigToCString(param.convId);
        const convType = param.convType;
        const userData = param.userData
            ? nodeStrigToCString(param.userData)
            : nodeStrigToCString("");
        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
                if (code === 0) {
                    resolve({ code, desc, json_param, user_data });
                } else {
                    reject({ code, desc, json_param, user_data });
                }
                this._cache.get("TIMConvDelete")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMConvDelete");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: cb,
                callback: callback,
            });
            this._cache.set("TIMConvDelete", cacheMap);
            const code: number = this._sdkconfig.Imsdklib.TIMConvDelete(
                convId,
                convType,
                this._cache.get("TIMConvDelete")?.get(now)?.callback,
                userData
            );
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
        const userData = param.userData
            ? nodeStrigToCString(param.userData)
            : nodeStrigToCString("");
        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
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
                if (code === 0) {
                    resolve({ code, desc, json_param: arrayparam, user_data });
                } else {
                    reject({ code, desc, json_param: arrayparam, user_data });
                }
                this._cache.get("TIMConvGetConvList")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMConvGetConvList");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: cb,
                callback: callback,
            });
            this._cache.set("TIMConvGetConvList", cacheMap);
            const code: number = this._sdkconfig.Imsdklib.TIMConvGetConvList(
                this._cache.get("TIMConvGetConvList")?.get(now)?.callback,
                userData
            );
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
        const convId = nodeStrigToCString(param.convId);
        const convType = param.convType;
        const draftParam = nodeStrigToCString(JSON.stringify(param.draftParam));
        return this._sdkconfig.Imsdklib.TIMConvSetDraft(
            convId,
            convType,
            draftParam
        );
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
        const convId = nodeStrigToCString(param.convId);
        const convType = param.convType;
        return this._sdkconfig.Imsdklib.TIMConvCancelDraft(convId, convType);
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
        const convList = nodeStrigToCString(
            JSON.stringify(param.json_get_conv_list_param)
        );
        const userData = param.user_data
            ? nodeStrigToCString(param.user_data)
            : nodeStrigToCString("");

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
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
                if (code === 0) {
                    resolve({ code, desc, json_param: param, user_data });
                } else {
                    reject({ code, desc, json_param: param, user_data });
                }
                this._cache.get("TIMConvGetConvInfo")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMConvGetConvInfo");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: cb,
                callback: callback,
            });
            this._cache.set("TIMConvGetConvInfo", cacheMap);
            const code: number = this._sdkconfig.Imsdklib.TIMConvGetConvInfo(
                convList,
                this._cache.get("TIMConvGetConvInfo")?.get(now)?.callback,
                userData
            );
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
        const convId = nodeStrigToCString(param.convId);
        const convType = param.convType;
        const isPinged = param.isPinned;
        const userData = param.user_data
            ? nodeStrigToCString(param.user_data)
            : nodeStrigToCString("");
        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
                if (code === 0) {
                    resolve({ code, desc, json_param, user_data });
                } else {
                    reject({ code, desc, json_param, user_data });
                }
                this._cache.get("TIMConvPinConversation")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMConvPinConversation");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: cb,
                callback: callback,
            });
            this._cache.set("TIMConvPinConversation", cacheMap);
            const code: number =
                this._sdkconfig.Imsdklib.TIMConvPinConversation(
                    convId,
                    convType,
                    isPinged,
                    this._cache.get("TIMConvPinConversation")?.get(now)
                        ?.callback,
                    userData
                );
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
        const userData = param.user_data
            ? nodeStrigToCString(param.user_data)
            : nodeStrigToCString("");
        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
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
                if (code === 0) {
                    resolve({ code, desc, json_param: param, user_data });
                } else {
                    reject({ code, desc, json_param: param, user_data });
                }
                this._cache
                    .get("TIMConvGetTotalUnreadMessageCount")
                    ?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMConvGetTotalUnreadMessageCount");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: cb,
                callback: callback,
            });
            this._cache.set("TIMConvGetTotalUnreadMessageCount", cacheMap);
            const code: number =
                this._sdkconfig.Imsdklib.TIMConvGetTotalUnreadMessageCount(
                    this._cache
                        .get("TIMConvGetTotalUnreadMessageCount")
                        ?.get(now)?.callback,
                    userData
                );
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
        const c_user_data = this.stringFormator(user_data);
        const seq = params.conversation_list_filter_next_seq ?? 0;
        const count = params.conversation_list_filter_count ?? 20;
        //@ts-ignore
        delete params.conversation_list_filter_next_seq;
        //@ts-ignore
        delete params.conversation_list_filter_count;
        const c_params = this.stringFormator(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFun = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                let param: TIMConversationListResult;
                try {
                    param = JSON.parse(
                        json_params.trim().length > 0
                            ? json_params.trim()
                            : JSON.stringify({})
                    );
                } catch {
                    param = {} as TIMConversationListResult;
                }
                if (code === 0)
                    resolve({ code, desc, json_params: param, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache
                    .get("TIMConvGetConversationListByFilter")
                    ?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get(
                "TIMConvGetConversationListByFilter"
            );
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
            });
            this._cache.set("TIMConvGetConversationListByFilter", cacheMap);
            const code =
                this._sdkconfig.Imsdklib.TIMConvGetConversationListByFilter(
                    c_params,
                    seq,
                    count,
                    this._cache
                        .get("TIMConvGetConversationListByFilter")
                        ?.get(now)?.callback,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
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
        const c_user_data = this.stringFormator(markConvParam.user_data);
        const c_id_array = this.stringFormator(
            JSON.stringify(markConvParam.conversation_id_array)
        );
        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFun = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                let param: Array<TIMConversationOperationResult>;
                try {
                    param = JSON.parse(
                        json_params.trim().length > 0
                            ? json_params.trim()
                            : JSON.stringify([])
                    );
                } catch {
                    param = [] as Array<TIMConversationOperationResult>;
                }
                if (code === 0)
                    resolve({ code, desc, json_params: param, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMConvMarkConversation")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMConvMarkConversation");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
            });
            this._cache.set("TIMConvMarkConversation", cacheMap);
            const code = this._sdkconfig.Imsdklib.TIMConvMarkConversation(
                c_id_array,
                markConvParam["mark_type"],
                markConvParam["enable_mark"],
                this._cache.get("TIMConvMarkConversation")?.get(now)?.callback,
                c_user_data
            );

            code !== 0 && reject(this.getErrorResponse({ code }));
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
        console.log(createConvGroupParam);
        console.log("canshu");
        const c_user_data = this.stringFormator(createConvGroupParam.user_data);
        const c_id_array = this.stringFormator(
            JSON.stringify(createConvGroupParam.conversation_id_array)
        );
        const c_group_name = this.stringFormator(
            createConvGroupParam.group_name
        );
        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFun = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                let param: Array<TIMConversationOperationResult>;
                try {
                    param = JSON.parse(
                        json_params.trim().length > 0
                            ? json_params.trim()
                            : JSON.stringify([])
                    );
                } catch {
                    param = [] as Array<TIMConversationOperationResult>;
                }
                if (code === 0)
                    resolve({ code, desc, json_params: param, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMConvCreateConversationGroup")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMConvCreateConversationGroup");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
            });
            this._cache.set("TIMConvCreateConversationGroup", cacheMap);
            const code =
                this._sdkconfig.Imsdklib.TIMConvCreateConversationGroup(
                    c_group_name,
                    c_id_array,
                    this._cache.get("TIMConvCreateConversationGroup")?.get(now)
                        ?.callback,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
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
        const c_user_data = this.stringFormator(
            getConvGroupListParam.user_data
        );
        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFun = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                let param: Array<string>;
                try {
                    param = JSON.parse(
                        json_params.trim().length > 0
                            ? json_params.trim()
                            : JSON.stringify([])
                    );
                } catch {
                    param = [] as Array<string>;
                }
                let result: convGroupListResult = {
                    conv_group_array: param,
                };

                if (code === 0)
                    resolve({ code, desc, json_params: result, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMConvGetConversationGroupList")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMConvGetConversationGroupList");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
            });
            this._cache.set("TIMConvGetConversationGroupList", cacheMap);
            const code =
                this._sdkconfig.Imsdklib.TIMConvGetConversationGroupList(
                    this._cache.get("TIMConvGetConversationGroupList")?.get(now)
                        ?.callback,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
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
        const c_user_data = this.stringFormator(param.user_data);
        const c_group_name = this.stringFormator(param.group_name);
        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFun = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                if (code === 0)
                    resolve({
                        code,
                        desc,
                        json_params: json_params,
                        user_data,
                    });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMConvDeleteConversationGroup")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMConvDeleteConversationGroup");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
            });
            this._cache.set("TIMConvDeleteConversationGroup", cacheMap);
            const code =
                this._sdkconfig.Imsdklib.TIMConvDeleteConversationGroup(
                    c_group_name,
                    this._cache.get("TIMConvDeleteConversationGroup")?.get(now)
                        ?.callback,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
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
        const c_user_data = this.stringFormator(renameParam.user_data);
        const c_old_name = this.stringFormator(renameParam.old_name);
        const c_new_name = this.stringFormator(renameParam.new_name);
        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFun = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                if (code === 0)
                    resolve({
                        code,
                        desc,
                        json_params: json_params,
                        user_data,
                    });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMConvRenameConversationGroup")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMConvRenameConversationGroup");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
            });
            this._cache.set("TIMConvRenameConversationGroup", cacheMap);
            const code =
                this._sdkconfig.Imsdklib.TIMConvRenameConversationGroup(
                    c_old_name,
                    c_new_name,
                    this._cache.get("TIMConvRenameConversationGroup")?.get(now)
                        ?.callback,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
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
        const c_user_data = this.stringFormator(addConvToGroupParam.user_data);
        const c_id_array = this.stringFormator(
            JSON.stringify(addConvToGroupParam.conversation_id_array)
        );
        const c_group_name = this.stringFormator(
            addConvToGroupParam.group_name
        );
        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFun = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                let param: Array<TIMConversationOperationResult>;
                try {
                    param = JSON.parse(
                        json_params.trim().length > 0
                            ? json_params.trim()
                            : JSON.stringify([])
                    );
                } catch {
                    param = [] as Array<TIMConversationOperationResult>;
                }
                if (code === 0)
                    resolve({ code, desc, json_params: param, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache.get("TIMConvAddConversationsToGroup")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMConvAddConversationsToGroup");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
            });
            this._cache.set("TIMConvAddConversationsToGroup", cacheMap);
            const code =
                this._sdkconfig.Imsdklib.TIMConvAddConversationsToGroup(
                    c_group_name,
                    c_id_array,
                    this._cache.get("TIMConvAddConversationsToGroup")?.get(now)
                        ?.callback,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
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
        const c_user_data = this.stringFormator(
            deleteConvFromGroupParam.user_data
        );
        const c_id_array = this.stringFormator(
            JSON.stringify(deleteConvFromGroupParam.conversation_id_array)
        );
        const c_group_name = this.stringFormator(
            deleteConvFromGroupParam.group_name
        );
        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFun = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                let param: Array<TIMConversationOperationResult>;
                try {
                    param = JSON.parse(
                        json_params.trim().length > 0
                            ? json_params.trim()
                            : JSON.stringify([])
                    );
                } catch {
                    param = [] as Array<TIMConversationOperationResult>;
                }
                if (code === 0)
                    resolve({ code, desc, json_params: param, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache
                    .get("TIMConvDeleteConversationsFromGroup")
                    ?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get(
                "TIMConvDeleteConversationsFromGroup"
            );
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
            });
            this._cache.set("TIMConvDeleteConversationsFromGroup", cacheMap);
            const code =
                this._sdkconfig.Imsdklib.TIMConvDeleteConversationsFromGroup(
                    c_group_name,
                    c_id_array,
                    this._cache
                        .get("TIMConvDeleteConversationsFromGroup")
                        ?.get(now)?.callback,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
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
        const c_user_data = this.stringFormator(
            setConvCustomDataParam.user_data
        );
        const c_id_array = this.stringFormator(
            JSON.stringify(setConvCustomDataParam.conversation_id_array)
        );
        const c_custom_data = this.stringFormator(
            setConvCustomDataParam.custom_data
        );
        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
            const cb: CommonCallbackFun = (
                code,
                desc,
                json_params,
                user_data
            ) => {
                let param: Array<TIMConversationOperationResult>;
                try {
                    param = JSON.parse(
                        json_params.trim().length > 0
                            ? json_params.trim()
                            : JSON.stringify([])
                    );
                } catch {
                    param = [] as Array<TIMConversationOperationResult>;
                }
                if (code === 0)
                    resolve({ code, desc, json_params: param, user_data });
                else reject(this.getErrorResponse({ code, desc }));
                this._cache
                    .get("TIMConvSetConversationCustomData")
                    ?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMConvSetConversationCustomData");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb,
                callback,
            });
            this._cache.set("TIMConvSetConversationCustomData", cacheMap);
            const code =
                this._sdkconfig.Imsdklib.TIMConvSetConversationCustomData(
                    c_id_array,
                    c_custom_data,
                    this._cache
                        .get("TIMConvSetConversationCustomData")
                        ?.get(now)?.callback,
                    c_user_data
                );

            code !== 0 && reject(this.getErrorResponse({ code }));
        });
    }

    setSDKAPPID(sdkappid: number) {
        this._sdkconfig.sdkappid = sdkappid;
    }
    private setConvEventCallback(
        conv_event: number,
        json_conv_array: string,
        user_data: string
    ) {
        const fn = this._callback.get("TIMSetConvEventCallback");
        const us = this._globalUserData.get("TIMSetConvEventCallback");
        fn && fn(conv_event, json_conv_array, us);
    }
    private convTotalUnreadMessageCountChangedCallback(
        total_unread_count: number,
        user_data: string
    ) {
        const fn = this._callback.get(
            "TIMSetConvTotalUnreadMessageCountChangedCallback"
        );
        const us = this._globalUserData.get(
            "TIMSetConvTotalUnreadMessageCountChangedCallback"
        );
        fn && fn(total_unread_count, us);
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
        this._callback.set("TIMSetConvEventCallback", param.callback);
        const c_callback = jsFuncToFFIConvEventCallback(
            this.setConvEventCallback.bind(this)
        );
        this._ffiCallback.set("TIMSetConvEventCallback", c_callback);
        const userData = param.user_data
            ? nodeStrigToCString(param.user_data)
            : nodeStrigToCString("");
        this._globalUserData.set("TIMSetConvEventCallback", userData);
        this._sdkconfig.Imsdklib.TIMSetConvEventCallback(
            this._ffiCallback.get("TIMSetConvEventCallback") as Buffer,
            userData
        );
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
        const userData = param.user_data
            ? nodeStrigToCString(param.user_data)
            : nodeStrigToCString("");
        const c_callback =
            jsFunToFFITIMSetConvTotalUnreadMessageCountChangedCallback(
                this.convTotalUnreadMessageCountChangedCallback.bind(this)
            );
        this._ffiCallback.set(
            "TIMSetConvTotalUnreadMessageCountChangedCallback",
            c_callback
        );
        this._callback.set(
            "TIMSetConvTotalUnreadMessageCountChangedCallback",
            param.callback
        );
        this._globalUserData.set(
            "TIMSetConvTotalUnreadMessageCountChangedCallback",
            userData
        );
        this._sdkconfig.Imsdklib.TIMSetConvTotalUnreadMessageCountChangedCallback(
            this._ffiCallback.get(
                "TIMSetConvTotalUnreadMessageCountChangedCallback"
            ) as Buffer,
            userData
        );
    }
}
export default ConversationManager;

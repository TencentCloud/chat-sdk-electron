/**
 * 腾讯云 IM 在收发消息时默认不检查是不是好友关系，您可以在 [腾讯云IM官网](https://cloud.tencent.com/document/product/269/51940#.E5.A5.BD.E5.8F.8B.E7.AE.A1.E7.90.86.E7.9B.B8.E5.85.B3.E6.8E.A5.E5.8F.A3])
 * 控制台 >功能配置>登录与消息>好友关系检查中开启"发送单聊消息检查关系链"开关，并使用如下接口增删好友和管理好友列表。
 * @module FriendshipManager(好友管理相关接口)
 */
import {
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
    commonResult,
    sdkconfig,
} from "../interface";
import {
    TIMOnAddFriendCallbackParams,
    TIMOnDeleteFriendCallbackParams,
    TIMUpdateFriendProfileCallbackParams,
    TIMFriendAddRequestCallbackParams,
    TIMFriendApplicationListDeletedCallbackParams,
    TIMFriendApplicationListReadCallbackParams,
    TIMFriendBlackListAddedCallbackParams,
    TIMFriendBlackListDeletedCallbackParams,
    FriendProfile,
    FriendResult,
    CheckFriendTypeResult,
    FriendGroupInfo,
    PendencyPage,
    FriendInfoGetResult,
} from "../interface/friendshipInterface";

const {
    load,
    DataType,

    funcConstructor,
} = require("ffi-rs");

const libName = "libImSDK";

class FriendshipManager {
    private _sdkconfig: sdkconfig;

    setSDKAPPID(sdkappid: number) {
        this._sdkconfig.sdkappid = sdkappid;
    }

    /** @internal */
    constructor(config: sdkconfig) {
        this._sdkconfig = config;
    }

    /**
    * @brief  获取好友列表
    * @category 获取好友列表
    * @param GetFriendProfileListParams
    * @return Promise<commonResponse>
    * @note 好友资料
    * 此接口通过回调返回所有好友资料[FriendProfile](../interfaces/interface_friendshipinterface.userprofile.html).
    * 
    * ```
    kTIMFriendProfileIdentifier          = "friend_profile_identifier";          // string,       只读, 好友UserID
    kTIMFriendProfileGroupNameArray      = "friend_profile_group_name_array";    // array string, 只读, 好友分组名称列表
    kTIMFriendProfileRemark              = "friend_profile_remark";              // string,       只读, 好友备注，最大96字节，获取自己资料时，该字段为空
    kTIMFriendProfileAddWording          = "friend_profile_add_wording";         // string,       只读, 好友申请时的添加理由
    kTIMFriendProfileAddSource           = "friend_profile_add_source";          // string,       只读, 好友申请时的添加来源
    kTIMFriendProfileAddTime             = "friend_profile_add_time";            // number,       只读, 好友添加时间
    kTIMFriendProfileUserProfile         = "friend_profile_user_profile";        // object [UserProfile](../../interfaces/interface_friendshipinterface.userprofile.html), 只读, 好友的个人资料
    kTIMFriendProfileCustomStringArray   = "friend_profile_custom_string_array"; // array [FriendProfileCustemStringInfo](), 只读, [自定义好友字段](https://cloud.tencent.com/document/product/269/1501#.E8.87.AA.E5.AE.9A.E4.B9.89.E5.A5.BD.E5.8F.8B.E5.AD.97.E6.AE.B5)
    * ```
    */
    TIMFriendshipGetFriendProfileList(
        getFriendProfileListParam: GetFriendProfileListParams
    ): Promise<commonResult<Array<FriendProfile>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMFriendshipGetFriendProfileList",
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
                            let param: Array<FriendProfile>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param = [] as Array<FriendProfile>;
                            }
                            resolve({
                                code,
                                desc,
                                json_params: param,
                                user_data,
                            });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    getFriendProfileListParam.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    /**
     * @brief 添加好友
     * @category 添加好友
     * @param AddFriendParams
     * @return {Promise<commonResponse>}
     * @note
     * 好友关系有单向和双向好友之分。详情请参考[添加好友](https://cloud.tencent.com/document/product/269/1501#.E6.B7.BB.E5.8A.A0.E5.A5.BD.E5.8F.8B).
     */
    TIMFriendshipAddFriend(
        addFriendParams: AddFriendParams
    ): Promise<commonResult<FriendResult>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMFriendshipAddFriend",
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
                    JSON.stringify(addFriendParams.params),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: FriendResult;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify({})
                                );
                            } catch {
                                param = {} as FriendResult;
                            }
                            resolve({
                                code,
                                desc,
                                json_params: param,
                                user_data,
                            });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    addFriendParams.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    /**
     * @brief 处理好友请求
     * @category 处理好友请求
     * @param HandleFriendAddParams
     * @return {Promise<commonResponse>}
     * @note &emsp;
     * 当自己的个人资料的加好友权限 kTIMUserProfileAddPermission 设置为 kTIMProfileAddPermission_NeedConfirm 时，别人添加自己为好友时会收到一个加好友的请求，可通过此接口处理加好友的请求。
     */
    TIMFriendshipHandleFriendAddRequest(
        handleFriendAddParams: HandleFriendAddParams
    ): Promise<commonResult<FriendResult>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMFriendshipHandleFriendAddRequest",
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
                    JSON.stringify(handleFriendAddParams.params),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: FriendResult;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify({})
                                );
                            } catch {
                                param = {} as FriendResult;
                            }
                            resolve({
                                code,
                                desc,
                                json_params: param,
                                user_data,
                            });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    handleFriendAddParams.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    /**
     * @brief 更新好友资料(备注等)
     * @category 更新好友资料(备注等)
     * @param ModifyFriendProfileParams
     * @return {Promise<commonResponse>}
     * @note
     * 修改好友资料，目前支持修改的字段请参考FriendProfileItem（在interface里），一次可修改多个字段。修改自定义字段时填入的key值可以添加 Tag_SNS_Custom_ 前缀，也可以不添加 Tag_SNS_Custom_ 前缀，当不添加时，SDK内部会自动添加该前缀。
     */
    TIMFriendshipModifyFriendProfile(
        modifyFriendProfileParams: ModifyFriendProfileParams
    ): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMFriendshipModifyFriendProfile",
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
                    JSON.stringify(modifyFriendProfileParams.params),
                    (...args: any) => {
                        const [code, desc, json_params, user_data] = args;
                        if (code == 0) {
                            resolve({ code, desc, json_params, user_data });
                        } else {
                            reject({ code, desc, json_params, user_data });
                        }
                    },
                    modifyFriendProfileParams.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief 删除好友
     * @category 删除好友
     * @param deleteFriendParams
     * @return {Promise<commonResponse>}
     * @note
     * 删除好友也有删除单向好友还是双向好友之分，[删除好友](https://cloud.tencent.com/document/product/269/1501#.E5.88.A0.E9.99.A4.E5.A5.BD.E5.8F.8B).
     */
    TIMFriendshipDeleteFriend(
        deleteFriendParams: DeleteFriendParams
    ): Promise<commonResult<Array<FriendResult>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMFriendshipDeleteFriend",
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
                    JSON.stringify(deleteFriendParams.params),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<FriendResult>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param = [] as Array<FriendResult>;
                            }
                            resolve({
                                code,
                                desc,
                                json_params: param,
                                user_data,
                            });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    deleteFriendParams.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief 检测好友类型(单向或双向)
     * @category 检测好友类型
     * @param CheckFriendTypeParams
     * @return {Promise<commonResponse>}
     * @note
     * 开发者可以通过此接口检测给定的 UserID 列表跟当前账户的好友关系，检测好友相关内容请参考 [检测好友](https://cloud.tencent.com/document/product/269/1501#.E6.A0.A1.E9.AA.8C.E5.A5.BD.E5.8F.8B)。
     */
    TIMFriendshipCheckFriendType(
        checkFriendTypeParams: CheckFriendTypeParams
    ): Promise<commonResult<Array<CheckFriendTypeResult>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMFriendshipCheckFriendType",
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
                    JSON.stringify(checkFriendTypeParams.params),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<CheckFriendTypeResult>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param = [] as Array<CheckFriendTypeResult>;
                            }
                            resolve({
                                code,
                                desc,
                                json_params: param,
                                user_data,
                            });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    checkFriendTypeParams.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief 创建好友分组
     * @category 好友分组相关接口
     * @param CreateFriendGroupParams
     * @return {Promise<commonResponse>}
     * @note
     * 不能创建已存在的分组。
     */
    TIMFriendshipCreateFriendGroup(
        createFriendGroupParams: CreateFriendGroupParams
    ): Promise<commonResult<Array<FriendResult>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMFriendshipCreateFriendGroup",
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
                    JSON.stringify(createFriendGroupParams.params),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<FriendResult>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param = [] as Array<FriendResult>;
                            }
                            resolve({
                                code,
                                desc,
                                json_params: param,
                                user_data,
                            });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    createFriendGroupParams.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief 获取指定好友分组的分组信息
     * @category 好友分组相关接口
     * @param friendshipStringArrayParams
     * @return {Promise<commonResponse>}
     */
    TIMFriendshipGetFriendGroupList(
        friendshipStringArrayParams: FriendshipStringArrayParams
    ): Promise<commonResult<Array<FriendGroupInfo>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMFriendshipGetFriendGroupList",
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
                    JSON.stringify(friendshipStringArrayParams.params),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<FriendGroupInfo>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param = [] as Array<FriendGroupInfo>;
                            }
                            resolve({
                                code,
                                desc,
                                json_params: param,
                                user_data,
                            });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    friendshipStringArrayParams.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief 修改好友分组
     * @category 好友分组相关接口
     * @param ModifyFriendGroupParams
     * @return {Promise<commonResponse>}
     */
    TIMFriendshipModifyFriendGroup(
        modifyFriendGroupParams: ModifyFriendGroupParams
    ): Promise<commonResult<Array<FriendResult>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMFriendshipModifyFriendGroup",
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
                    JSON.stringify(modifyFriendGroupParams.params),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<FriendResult>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param = [] as Array<FriendResult>;
                            }
                            resolve({
                                code,
                                desc,
                                json_params: param,
                                user_data,
                            });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    modifyFriendGroupParams.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief 删除好友分组
     * @category 好友分组相关接口*
     * @param friendshipStringArrayParams
     * @return {Promise<commonResponse>}
     */
    TIMFriendshipDeleteFriendGroup(
        friendshipStringArrayParams: FriendshipStringArrayParams
    ): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMFriendshipDeleteFriendGroup",
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
                    JSON.stringify(friendshipStringArrayParams.params),
                    (...args: any) => {
                        const [code, desc, json_params, user_data] = args;
                        if (code == 0) {
                            resolve({ code, desc, json_params, user_data });
                        } else {
                            reject({ code, desc, json_params, user_data });
                        }
                    },
                    friendshipStringArrayParams.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief 添加指定用户到黑名单
     * @category 黑名单相关接口
     * @param friendshipStringArrayParams
     * @return {Promise<commonResponse>}
     */
    TIMFriendshipAddToBlackList(
        friendshipStringArrayParams: FriendshipStringArrayParams
    ): Promise<commonResult<Array<FriendResult>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMFriendshipAddToBlackList",
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
                    JSON.stringify(friendshipStringArrayParams.params),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<FriendResult>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param = [] as Array<FriendResult>;
                            }
                            resolve({
                                code,
                                desc,
                                json_params: param,
                                user_data,
                            });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    friendshipStringArrayParams.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief 获取黑名单列表
     * @category 黑名单相关接口
     * @param GetBlackListParams
     * @return {Promise<commonResponse>}
     */
    TIMFriendshipGetBlackList(
        getBlackListParams: GetBlackListParams
    ): Promise<commonResult<Array<FriendProfile>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMFriendshipGetBlackList",
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
                            let param: Array<FriendProfile>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param = [] as Array<FriendProfile>;
                            }
                            resolve({
                                code,
                                desc,
                                json_params: param,
                                user_data,
                            });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    getBlackListParams.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief 从黑名单中删除指定用户列表
     * @category 黑名单相关接口
     * @param FriendshipStringArrayParams
     * @return {Promise<commonResponse>}
     */
    TIMFriendshipDeleteFromBlackList(
        friendshipStringArrayParams: FriendshipStringArrayParams
    ): Promise<commonResult<Array<FriendResult>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMFriendshipDeleteFromBlackList",
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
                    JSON.stringify(friendshipStringArrayParams.params),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<FriendResult>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param = [] as Array<FriendResult>;
                            }
                            resolve({
                                code,
                                desc,
                                json_params: param,
                                user_data,
                            });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    friendshipStringArrayParams.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief 获取好友添加请求未决信息列表
     * @category 未决信息相关接口
     * @param FriendshipGetPendencyListParams
     * @return {Promise<commonResponse>}
     */
    TIMFriendshipGetPendencyList(
        friendshipGetPendencyListParams: FriendshipGetPendencyListParams
    ): Promise<commonResult<PendencyPage>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMFriendshipGetPendencyList",
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
                    JSON.stringify(friendshipGetPendencyListParams.params),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: PendencyPage;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify({})
                                );
                            } catch {
                                param = {} as PendencyPage;
                            }
                            resolve({
                                code,
                                desc,
                                json_params: param,
                                user_data,
                            });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    friendshipGetPendencyListParams.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief 上报好友添加请求未决信息已读
     * @category 未决信息相关接口
     * @param DeletePendencyParams
     * @return {Promise<commonResponse>}
     */
    TIMFriendshipDeletePendency(
        deletePendencyParams: DeletePendencyParams
    ): Promise<commonResult<Array<FriendResult>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMFriendshipDeletePendency",
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
                    JSON.stringify(deletePendencyParams.params),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<FriendResult>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param = [] as Array<FriendResult>;
                            }
                            resolve({
                                code,
                                desc,
                                json_params: param,
                                user_data,
                            });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    deletePendencyParams.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief 上报好友添加请求未决信息已读
     * @category 未决信息相关接口
     * @param ReportPendencyReadedParams
     * @return {Promise<commonResponse>}
     */
    TIMFriendshipReportPendencyReaded(
        reportPendencyReadedParams: ReportPendencyReadedParams
    ): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMFriendshipReportPendencyReaded",
                retType: DataType.I32,
                paramsType: [
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
                    reportPendencyReadedParams.timestamp ?? 0,
                    (...args: any) => {
                        const [code, desc, json_params, user_data] = args;
                        if (code == 0) {
                            resolve({ code, desc, json_params, user_data });
                        } else {
                            reject({ code, desc, json_params, user_data });
                        }
                    },
                    reportPendencyReadedParams.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief 搜索好友
     * @category 搜索好友
     * @param SearchFriendsParams
     * @return {Promise<commonResponse>}
     */
    TIMFriendshipSearchFriends(
        searchFriendsParams: SearchFriendsParams
    ): Promise<commonResult<Array<FriendInfoGetResult>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMFriendshipSearchFriends",
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
                    JSON.stringify(searchFriendsParams.params),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<FriendInfoGetResult>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param = [] as Array<FriendInfoGetResult>;
                            }
                            resolve({
                                code,
                                desc,
                                json_params: param,
                                user_data,
                            });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    searchFriendsParams.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief 获取好友信息
     * @category 获取好友信息
     * @param FriendshipStringArrayParams
     * @return {Promise<commonResponse>}
     */
    TIMFriendshipGetFriendsInfo(
        friendshipStringArrayParams: FriendshipStringArrayParams
    ): Promise<commonResult<Array<FriendInfoGetResult>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMFriendshipGetFriendsInfo",
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
                    JSON.stringify(friendshipStringArrayParams.params),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<FriendInfoGetResult>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param = [] as Array<FriendInfoGetResult>;
                            }
                            resolve({
                                code,
                                desc,
                                json_params: param,
                                user_data,
                            });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    friendshipStringArrayParams.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    // callback begin

    /**
     * @brief 设置添加好友的回调
     * @category 好友相关回调(callback)
     * @param TIMOnAddFriendCallbackParams
     *
     * @note
     * 此回调为了多终端同步。例如A设备、B设备都登录了同一帐号的ImSDK，A设备添加了好友，B设备ImSDK会收到添加好友的推送，ImSDK通过此回调告知开发者。
     */
    TIMSetOnAddFriendCallback(params: TIMOnAddFriendCallbackParams): void {
        const { callback } = params;
        load({
            library: libName,
            funcName: "TIMSetOnAddFriendCallback",
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
            paramsValue: [callback, params.user_data ?? ""],
        });
    }

    /**
     * @brief 设置好友的回调
     * @category 好友相关回调(callback)
     * @param  TIMOnDeleteFriendCallbackParams
     * @note
     * 此回调为了多终端同步。例如A设备、B设备都登录了同一帐号的ImSDK，A设备添加了好友，B设备ImSDK会收到添加好友的推送，ImSDK通过此回调告知开发者。
     */
    TIMSetOnDeleteFriendCallback(
        params: TIMOnDeleteFriendCallbackParams
    ): void {
        const { callback } = params;
        load({
            library: libName,
            funcName: "TIMSetOnDeleteFriendCallback",
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
            paramsValue: [callback, params.user_data ?? ""],
        });
    }

    /**
     * @brief 设置更新好友资料的回调
     * @category 好友相关回调(callback)
     * @param TIMUpdateFriendProfileCallbackParams
     * @note
     * 此回调为了多终端同步。例如A设备、B设备都登录了同一帐号的ImSDK，A设备更新了好友资料，B设备ImSDK会收到更新好友资料的推送，ImSDK通过此回调告知开发者。
     */
    TIMSetUpdateFriendProfileCallback(
        params: TIMUpdateFriendProfileCallbackParams
    ): void {
        const { callback } = params;
        load({
            library: libName,
            funcName: "TIMSetUpdateFriendProfileCallback",
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
            paramsValue: [callback, params.user_data ?? ""],
        });
    }

    /**
     * @brief  设置好友添加请求的回调
     * @param TIMFriendAddRequestCallbackParams 好友添加请求回调
     *  @category 好友相关回调(callback)
     * @note
     * 当前登入用户设置添加好友需要确认时，如果有用户请求加当前登入用户为好友，会收到好友添加请求的回调，ImSDK通过此回调告知开发者。如果多终端登入同一帐号，每个终端都会收到这个回调。
     */
    TIMSetFriendAddRequestCallback(
        params: TIMFriendAddRequestCallbackParams
    ): void {
        const { callback } = params;
        load({
            library: libName,
            funcName: "TIMSetFriendAddRequestCallback",
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
            paramsValue: [callback, params.user_data ?? ""],
        });
    }

    /**
     * @brief 设置好友申请删除的回调
     * @param TIMFriendApplicationListDeletedCallbackParams 好友申请删除回调
     * @category 好友相关回调(callback)
     * @note
     *  1. 主动删除好友申请
     *  2. 拒绝好友申请
     *  3. 同意好友申请
     *  4. 申请加别人好友被拒绝
     */
    TIMSetFriendApplicationListDeletedCallback(
        params: TIMFriendApplicationListDeletedCallbackParams
    ): void {
        const { callback } = params;
        load({
            library: libName,
            funcName: "TIMSetFriendApplicationListDeletedCallback",
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
            paramsValue: [callback, params.user_data ?? ""],
        });
    }

    /**
     * @brief 设置好友申请已读的回调
     * @param TIMFriendApplicationListReadCallbackParams
     * @category 好友相关回调(callback)
     * @note
     * 如果调用 setFriendApplicationRead 设置好友申请列表已读，会收到这个回调（主要用于多端同步）
     */
    TIMSetFriendApplicationListReadCallback(
        params: TIMFriendApplicationListReadCallbackParams
    ): void {
        const { callback } = params;
        load({
            library: libName,
            funcName: "TIMSetFriendApplicationListReadCallback",
            retType: DataType.Void,
            paramsType: [
                callback == null
                    ? DataType.Void
                    : funcConstructor({
                          paramsType: [DataType.String],
                          permanent: true,
                      }),
                DataType.String,
            ],
            paramsValue: [callback, params.user_data ?? ""],
        });
    }
    /**
     * @brief 设置黑名单新增的回调
     * @category 好友相关回调(callback)
     * @param TIMFriendBlackListAddedCallbackParams 黑名单新增的回调
     */
    TIMSetFriendBlackListAddedCallback(
        params: TIMFriendBlackListAddedCallbackParams
    ): void {
        const { callback } = params;
        load({
            library: libName,
            funcName: "TIMSetFriendBlackListAddedCallback",
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
            paramsValue: [callback, params.user_data ?? ""],
        });
    }

    /**
     * @brief 设置黑名单删除的回调
     * @category 好友相关回调(callback)
     * @param TIMFriendBlackListDeletedCallbackParams 黑名单新增的回调
     */
    TIMSetFriendBlackListDeletedCallback(
        params: TIMFriendBlackListDeletedCallbackParams
    ): void {
        const { callback } = params;
        load({
            library: libName,
            funcName: "TIMSetFriendBlackListDeletedCallback",
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
            paramsValue: [callback, params.user_data ?? ""],
        });
    }
    // callback end
}
export default FriendshipManager;

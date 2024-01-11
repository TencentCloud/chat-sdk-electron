/**
 * 基础接口，包括基本的登陆，发送简单消息，回调等功能
 * @module TimbaseManager(基础接口)
 */
import {
    callExperimentalAPIParam,
    loginParam,
    logoutParam,
    sdkconfig,
    TIMProfileGetUserProfileListParam,
    TIMProfileModifySelfUserProfileParam,
    TIMSetConfigParam,
    TIMSetKickedOfflineCallbackParam,
    TIMSetLogCallbackParam,
    TIMSetNetworkStatusListenerCallbackParam,
    TIMSetUserSigExpiredCallbackParam,
    userProfile,
} from "../interface";
import {
    commonResult,
    initParam,
    setSelfStatusParam,
    SubscribeUserInfoParam,
    TIMSetSelfInfoUpdatedCallbackParam,
    TIMSetUserStatusChangedCallbackParam,
    UserInfoChangedCallbackParam,
    userStatus,
    userStatusParam,
} from "../interface/basicInterface";
import path from "path";

import { TIMLoginStatus } from "../enum";
import os from "os";
import fs from "fs";
import { getFFIPath } from "../utils/utils";

const ffiPath = getFFIPath();

console.log(`current native sdk path is ${ffiPath}`);

const { load, DataType, open, funcConstructor } = require("ffi-rs");

const libName = "libImSDK";

open({
    library: libName, // key
    path: ffiPath, // path
});

class TimbaseManager {
    private _tag = "TencentCloudChat";
    private _sdkconfig: sdkconfig;
    static _electron_log: boolean = false;
    /** @internal */
    constructor(config: sdkconfig) {
        this._sdkconfig = config;
    }
    static _writeLog(log: string, funName?: string) {
        if (!TimbaseManager._electron_log) {
            return;
        }
        var timmer = setTimeout(() => {
            load({
                library: libName,
                funcName: "callExperimentalAPI",
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
                    JSON.stringify({
                        request_internal_operation:
                            "internal_operation_write_log",
                        request_write_log_log_level_param: 4,
                        request_write_log_log_content_param: log,
                        request_write_log_file_name_param:
                            "im_electron_sdk_log",
                        request_write_log_func_name_param:
                            funName ?? "ElectronParse",
                    }),
                    () => {},
                    "",
                ],
            });
            clearTimeout(timmer);
        }, 300);
    }
    /**
     * @brief ImSDK初始化
     * @category SDK相关(如初始化)
     * 
     * @return  {number}  返回 TIM_SUCC的枚举值 表示接口调用成功，其他值表示接口调用失败。每个返回值的定义请参见[枚举TIMResult](../../doc/enums/timresult.html)
     * @note 
     * 在使用ImSDK进一步操作之前，需要先初始化ImSDK

     */
    TIMInit(initParams?: initParam): Promise<number> {
        let sdkconfig: string;
        const { config_path, electron_log = false } = initParams || {};

        TimbaseManager._electron_log = electron_log;
        if (config_path) {
            const res = fs.statSync(config_path);
            if (!res.isDirectory()) {
                return Promise.resolve(-1);
            }
        }
        sdkconfig = JSON.stringify({
            sdk_config_log_file_path: config_path
                ? path.resolve(config_path, "sdk-log")
                : path.resolve(os.homedir(), ".tencent-im/sdk-log"),
            sdk_config_config_file_path: config_path
                ? path.resolve(config_path, "sdk-config")
                : path.resolve(os.homedir(), ".tencent-im/sdk-config"),
        });
        console.log(this._tag, `curreng sdkappid ${this._sdkconfig.sdkappid}`);
        console.log(this._tag, "current init config", sdkconfig);
        var version = this.TIMGetSDKVersion();
        console.log(this._tag, `current native sdk version is ${version}`);
        return new Promise(async resolve => {
            load({
                library: libName,
                funcName: "callExperimentalAPI",
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
                    JSON.stringify({
                        request_internal_operation:
                            "internal_operation_set_ui_platform",
                        request_set_ui_platform_param: 7,
                    }),
                    () => {},
                    "",
                ],
            });
            const TIMInitRs = load({
                library: libName,
                funcName: "TIMInit",
                retType: DataType.I32,
                paramsType: [DataType.I64, DataType.String],
                paramsValue: [this._sdkconfig.sdkappid, sdkconfig],
            });
            resolve(TIMInitRs);
        });
    }
    setSDKAPPID(sdkappid: number) {
        this._sdkconfig.sdkappid = sdkappid;
    }
    /**
     * ### ImSDK卸载
     * @category SDK相关(如初始化)
     * @return  {number}  返回 TIM_SUCC的枚举值 表示接口调用成功，其他值表示接口调用失败。每个返回值的定义请参见[枚举TIMResult](../../doc/enums/timresult.html)
     * @note
     * 卸载DLL或退出进程前需要此接口卸载ImSDK，清理ImSDK相关资源
     */
    TIMUninit(): number {
        return load({
            library: libName,
            funcName: "TIMUninit",
            retType: DataType.I32,
            paramsType: [],
            paramsValue: [],
        });
    }
    /**
     * @brief 获取ImSDK版本号
     * @category SDK相关(如初始化)
     * @return  String 返回ImSDK的版本号
     */
    TIMGetSDKVersion(): String {
        return load({
            library: libName,
            funcName: "TIMGetSDKVersion",
            retType: DataType.String,
            paramsType: [],
            paramsValue: [],
        });
    }

    /**
     * @brief  获取服务器当前时间
     * @return {number} 服务器时间
     * @category SDK相关(如初始化)
     * @note
     * 可用于信令离线推送场景下超时判断
     */
    TIMGetServerTime(): number {
        return load({
            library: libName,
            funcName: "TIMGetServerTime",
            retType: DataType.I64,
            paramsType: [],
            paramsValue: [],
        });
    }
    /**
     * ### 登录
     * @category 登录相关
     * @param loginParam 用户的UserID
     * @return  {Promise<commonResponse>} Promise的response返回值为：{ code, desc, json_params, user_data }
     *
     * @note
     * 用户登录腾讯后台服务器后才能正常收发消息，登录需要用户提供UserID、UserSig等信息，具体含义请参考[登录鉴权](https://cloud.tencent.com/document/product/269/31999)
     */
    TIMLogin(param: loginParam): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMLogin",
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
                    param.userID,
                    param.userSig,
                    (...args: any) => {
                        const [
                            code,
                            desc = "",
                            json_param = "",
                            user_data = "",
                        ] = args;
                        if (code == 0) {
                            resolve({ code, desc, json_param, user_data });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    param.userData ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    /**
     * @brief  登出
     * @category 登录相关
     * @param logoutParam
     * @return  {Promise<commonResponse>} Promise的response返回值为：{ code, desc, json_params, user_data }
     * @note
     * 如用户主动登出或需要进行用户的切换，则需要调用登出操作
     */
    TIMLogout(param: logoutParam): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMLogout",
                retType: DataType.Void,
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
                            resolve({ code, desc, json_param, user_data });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    param.userData ?? "",
                ],
            });
            code !== 0 && reject({ code });
            resolve({ code: 0 });
        });
    }
    /**
     * @brief  获取登录状态
     * @category 登录相关
     * @param logoutParam
     * @return  {number} TIMLoginStatus 每个返回值的定义请参考 [TIMLoginStatus](../../doc/enums/enum.timloginstatus.html)
     * @note
     * 如果用户已经处于已登录和登录中状态，请勿再频繁调用登录接口登录
     */
    TIMGetLoginStatus(): TIMLoginStatus {
        return load({
            library: libName,
            funcName: "TIMGetLoginStatus",
            retType: DataType.I32,
            paramsType: [],
            paramsValue: [],
        });
    }
    /**
     * @brief 获取登陆用户的 userid
     * @category 登录相关
     * @param getLoginUserIDParam
     * @return  {Promise<commonResponse>} Promise的response返回值为：{ code, desc, json_params（登录用户的 userid）, user_data }
     *
     */
    TIMGetLoginUserID(): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const user_id_buffer = Buffer.alloc(128);
            const code = load({
                library: libName,
                funcName: "TIMGetLoginUserID",
                retType: DataType.I32,
                paramsType: [DataType.U8Array],
                paramsValue: [user_id_buffer],
            });
            if (code == 0) {
                resolve({
                    code,
                    json_param: user_id_buffer.toString().split("\u0000")[0],
                    desc: "",
                    user_data: "",
                });
            } else {
                reject({ code });
            }
        });
    }
    /**
     * ### 设置网络连接状态监听回调
     * @param TIMSetNetworkStatusListenerCallbackParam
     * @category 基础接口相关回调(callback)
     * @note
     * &emsp;
     * > 当调用接口 [TIMInit](./manager_timbasemanager.default.html#timinit) 时，ImSDK会去连接云后台。此接口设置的回调用于监听网络连接的状态。
     * > 网络连接状态包含四个：正在连接、连接失败、连接成功、已连接。这里的网络事件不表示用户本地网络状态，仅指明ImSDK是否与即时通信IM云Server连接状态。
     * > 可选设置，如果要用户感知是否已经连接服务器，需要设置此回调，用于通知调用者跟通讯后台链接的连接和断开事件，另外，如果断开网络，等网络恢复后会自动重连，自动拉取消息通知用户，用户无需关心网络状态，仅作通知之用
     * > 只要用户处于登录状态，ImSDK内部会进行断网重连，用户无需关心。
     */
    TIMSetNetworkStatusListenerCallback(
        param: TIMSetNetworkStatusListenerCallbackParam
    ) {
        const { callback } = param;
        if (callback != null) {
            load({
                library: libName,
                funcName: "TIMSetNetworkStatusListenerCallback",
                retType: DataType.Void,
                paramsType: [
                    funcConstructor({
                        paramsType: [
                            DataType.I32,
                            DataType.I32,
                            DataType.String,
                            DataType.String,
                        ],
                        permanent: true,
                    }),
                    DataType.String,
                ],
                paramsValue: [callback, param.userData],
            });
        } else {
            load({
                library: libName,
                funcName: "TIMSetNetworkStatusListenerCallback",
                retType: DataType.Void,
                paramsType: [DataType.Void, DataType.String],
                paramsValue: [null, param.userData],
            });
        }
    }
    /**
     *  ### 设置被踢下线通知回调
     * @param TIMSetKickedOfflineCallbackParam
     * @category 基础接口相关回调(callback)
     * @note
     * &emsp;
     * > 用户如果在其他终端登录，会被踢下线，这时会收到用户被踢下线的通知，出现这种情况常规的做法是提示用户进行操作（退出，或者再次把对方踢下线）。
     * > 用户如果在离线状态下被踢，下次登录将会失败，可以给用户一个非常强的提醒（登录错误码ERR_IMSDK_KICKED_BY_OTHERS：6208），开发者也可以选择忽略这次错误，再次登录即可。
     * > 用户在线情况下的互踢情况：
     * +  用户在设备1登录，保持在线状态下，该用户又在设备2登录，这时用户会在设备1上强制下线，收到 TIMKickedOfflineCallback 回调。
     *    用户在设备1上收到回调后，提示用户，可继续调用login上线，强制设备2下线。这里是在线情况下互踢过程。
     * > 用户离线状态互踢:
     * +  用户在设备1登录，没有进行logout情况下进程退出。该用户在设备2登录，此时由于用户不在线，无法感知此事件，
     *    为了显式提醒用户，避免无感知的互踢，用户在设备1重新登录时，会返回（ERR_IMSDK_KICKED_BY_OTHERS：6208）错误码，表明之前被踢，是否需要把对方踢下线。
     *    如果需要，则再次调用login强制上线，设备2的登录的实例将会收到 TIMKickedOfflineCallback 回调。
     */
    TIMSetKickedOfflineCallback(param: TIMSetKickedOfflineCallbackParam) {
        const { callback } = param;
        if (callback != null) {
            load({
                library: libName,
                funcName: "TIMSetKickedOfflineCallback",
                retType: DataType.Void,
                paramsType: [
                    funcConstructor({
                        paramsType: [
                            DataType.I32,
                            DataType.I32,
                            DataType.String,
                            DataType.String,
                        ],
                        permanent: true,
                    }),
                    DataType.String,
                ],
                paramsValue: [callback, param.userData],
            });
        } else {
            load({
                library: libName,
                funcName: "TIMSetKickedOfflineCallback",
                retType: DataType.Void,
                paramsType: [DataType.Void, DataType.String],
                paramsValue: [null, param.userData],
            });
        }
    }

    /**
     * @brief 设置票据过期回调
     * @param TIMSetUserSigExpiredCallbackParam
     * @category 基础接口相关回调(callback)
     * @note
     * 用户票据，可能会存在过期的情况，如果用户票据过期，此接口设置的回调会调用。
     * [TIMLogin](./manager_timbasemanager.default.html#timlogin)也将会返回70001错误码。开发者可根据错误码或者票据过期回调进行票据更换
     */
    TIMSetUserSigExpiredCallback(param: TIMSetUserSigExpiredCallbackParam) {
        const { callback } = param;
        if (callback != null) {
            load({
                library: libName,
                funcName: "TIMSetUserSigExpiredCallback",
                retType: DataType.Void,
                paramsType: [
                    funcConstructor({
                        paramsType: [DataType.String],
                        permanent: true,
                    }),
                    DataType.String,
                ],
                paramsValue: [callback, param.userData],
            });
        } else {
            load({
                library: libName,
                funcName: "TIMSetUserSigExpiredCallback",
                retType: DataType.Void,
                paramsType: [DataType.Void, DataType.String],
                paramsValue: [null, param.userData],
            });
        }
    }
    /**
     * @brief 当前用户的资料发生了更新
     * @param TIMSetSelfInfoUpdatedCallbackParam
     */
    TIMSetSelfInfoUpdatedCallback(param: TIMSetSelfInfoUpdatedCallbackParam) {
        const { callback } = param;
        if (callback != null) {
            load({
                library: libName,
                funcName: "TIMSetSelfInfoUpdatedCallback",
                retType: DataType.Void,
                paramsType: [
                    funcConstructor({
                        paramsType: [DataType.String, DataType.String],
                        permanent: true,
                    }),
                    DataType.String,
                ],
                paramsValue: [callback, param.user_data ?? ""],
            });
        } else {
            load({
                library: libName,
                funcName: "TIMSetSelfInfoUpdatedCallback",
                retType: DataType.Void,
                paramsType: [DataType.Void, DataType.String],
                paramsValue: [null, param.user_data ?? ""],
            });
        }
    }

    TIMSetUserStatusChangedCallback(
        param: TIMSetUserStatusChangedCallbackParam
    ) {
        const { callback } = param;
        if (callback != null) {
            load({
                library: libName,
                funcName: "TIMSetUserStatusChangedCallback",
                retType: DataType.Void,
                paramsType: [
                    funcConstructor({
                        paramsType: [DataType.String, DataType.String],
                        permanent: true,
                    }),
                    DataType.String,
                ],
                paramsValue: [callback, param.user_data ?? ""],
            });
        } else {
            load({
                library: libName,
                funcName: "TIMSetUserStatusChangedCallback",
                retType: DataType.Void,
                paramsType: [DataType.Void, DataType.String],
                paramsValue: [null, param.user_data ?? ""],
            });
        }
    }
    /**
     * ### 设置日志回调
     * @param TIMSetLogCallbackParam TIMSetLogCallbackParam
     * @category 基础接口相关回调(callback)
     * @note
     * 设置日志监听的回调之后，ImSDK内部的日志会回传到此接口设置的回调。
     * 开发者可以通过接口[SetConfig](./manager_timbasemanager.default.html#timsetconfig)配置哪些日志级别的日志回传到回调函数。
     */
    // doc TODO 文档还需测试
    TIMSetLogCallback(param: TIMSetLogCallbackParam) {
        const { callback } = param;
        if (callback != null) {
            load({
                library: libName,
                funcName: "TIMSetLogCallback",
                retType: DataType.Void,
                paramsType: [
                    funcConstructor({
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
        } else {
            load({
                library: libName,
                funcName: "TIMSetLogCallback",
                retType: DataType.Void,
                paramsType: [DataType.Void, DataType.String],
                paramsValue: [null, param.user_data ?? ""],
            });
        }
    }
    /**
     * @brief  设置额外的用户配置
     * @param TIMSetConfigParam
     * @category 配置相关
     * @return  {Promise<commonResponse>} Promise的response返回值为：{ code, desc, json_params, user_data }
     * @note
     * 目前支持设置的配置有http代理的IP和端口、socks5代理的IP和端口、输出日志的级别、获取群信息/群成员信息的默认选项、是否接受消息已读回执事件等。
     * http代理的IP和端口、socks5代理的IP和端口建议调用[TIMInit](./manager_timbasemanager.default.html#timinit)之前配置。
     * 每项配置可以单独设置，也可以一起配置,详情请参考 [SetConfig](./manager_timbasemanager.default.html#timsetconfig)。
     */
    TIMSetConfig(param: TIMSetConfigParam) {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMSetConfig",
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
                    JSON.stringify(param.json_config),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({ code, desc, json_param, user_data });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    param.user_data,
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief  实验性接口
     * @param  callExperimentalAPIParam
     * @category 实验接口
     * @return {Promise<commonResponse>} Promise的response返回值为：{ code, desc, json_params, user_data }
     */
    callExperimentalAPI(
        param: callExperimentalAPIParam
    ): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "callExperimentalAPI",
                retType: DataType.I32,
                paramsType: [
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
                    JSON.stringify(param.json_param),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({ code, desc, json_param, user_data });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    param.user_data,
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief 获取指定用户列表的个人资料
     * @param TIMProfileGetUserProfileListParam
     * @category 资料相关接口
     * @return {Promise<commonResponse>} Promise的response返回值为：{ code, desc, json_params, user_data }
     * @note
     * 可以通过该接口获取任何人的个人资料，包括自己的个人资料。
     * PS:用户资料相关接口 [资料系统简介](https://cloud.tencent.com/document/product/269/1500#.E8.B5.84.E6.96.99.E7.B3.BB.E7.BB.9F.E7.AE.80.E4.BB.8B)
     */
    TIMProfileGetUserProfileList(
        param: TIMProfileGetUserProfileListParam
    ): Promise<commonResult<Array<userProfile>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMProfileGetUserProfileList",
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
                    JSON.stringify(param.json_get_user_profile_list_param),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<userProfile>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param = [] as Array<userProfile>;
                            }
                            resolve({
                                code,
                                desc,
                                json_param: param,
                                user_data,
                            });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    param.user_data,
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief 修改自己的个人资料
     * @param  TIMProfileModifySelfUserProfileParam
     * @category 资料相关接口
     * @return {Promise<commonResponse>} json_param 返回TIM_SUCC表示接口调用成功（接口只有返回TIM_SUCC，回调cb才会被调用），其他值表示接口调用失败。每个返回值的定义请参考 [TIMResult](../../doc/enums/timresult.html)
     */
    TIMProfileModifySelfUserProfile(
        param: TIMProfileModifySelfUserProfileParam
    ): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMProfileModifySelfUserProfile",
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
                    JSON.stringify(param.json_modify_self_user_profile_param),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({ code, desc, json_param, user_data });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    param.user_data,
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief 查询用户状态
     * @note 如果您想查询自己的自定义状态，您只需要传入自己的 userID 即可
     */
    TIMGetUserStatus(
        param: userStatusParam
    ): Promise<commonResult<Array<userStatus>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMGetUserStatus",
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
                    JSON.stringify(param.id_array),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<userStatus>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param = [] as Array<userStatus>;
                            }
                            resolve({
                                code,
                                desc,
                                json_param: param,
                                user_data,
                            });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    param.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief 设置自己的状态
     * @note 请注意，该接口只支持设置自己的自定义状态
     */
    TIMSetSelfStatus(param: setSelfStatusParam): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMSetSelfStatus",
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
                    JSON.stringify(param.status),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({ code, desc, json_param, user_data });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    param.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief 订阅用户状态
     * @note
     * - 当成功订阅用户状态后，当对方的状态（包含在线状态、自定义状态）发生变更后，您可以监听 TIMSetUserStatusChangedCallback 回调来感知
     * - 如果您需要订阅好友列表的状态，您只需要在控制台上打开开关即可，无需调用该接口
     * - 该接口不支持订阅自己，您可以通过监听 TIMSetUserStatusChangedCallback 回调来感知自身的自定义状态的变更
     * - 订阅列表有个数限制，超过限制后，会自动淘汰最先订阅的用户
     */
    TIMSubscribeUserStatus(
        param: userStatusParam
    ): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMSubscribeUserStatus",
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
                    JSON.stringify(param.id_array),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({ code, desc, json_param, user_data });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    param.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief 取消订阅用户状态
     * @note 当 userIDList 为空或者 null 时，取消当前所有的订阅
     */
    TIMUnsubscribeUserStatus(
        param: userStatusParam
    ): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMUnsubscribeUserStatus",
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
                    JSON.stringify(param.id_array),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({ code, desc, json_param, user_data });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    param.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    /**
     *
     * @param param
     * @note 请注意：
     * - 成功订阅用户资料后，当订阅用户资料发生变更，您可以通过监听 TIMSetUserInfoChangedCallback 回调来感知
     * - 该接口不支持订阅自己，您可以通过监听 TIMSetSelfInfoUpdatedCallback 回调来感知自己资料的变更
     * - 订阅列表最多允许订阅 200 个，超过限制后，会自动淘汰最先订阅的用户
     * - 该接口支持订阅好友资料，但是不推荐这种使用方法，因为订阅好友资料后，好友资料的变更仍然会通过 TIMSetUpdateFriendProfileCallback 回调来通知，并且订阅好友也会占用 200 的订阅上限名额
     */
    TIMSubscribeUserInfo(
        param: SubscribeUserInfoParam
    ): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMSubscribeUserInfo",
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
                    JSON.stringify(param.json_user_id_list),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({ code, desc, json_param, user_data });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    param.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    async TIMSetUserInfoChangedCallback(params: UserInfoChangedCallbackParam) {
        const { callback } = params;
        if (callback != null) {
            load({
                library: libName,
                funcName: "TIMSetUserInfoChangedCallback",
                retType: DataType.Void,
                paramsType: [
                    funcConstructor({
                        paramsType: [DataType.String, DataType.String],
                        permanent: true,
                    }),
                    DataType.String,
                ],
                paramsValue: [callback, params.user_data ?? ""],
            });
        } else {
            load({
                library: libName,
                funcName: "TIMSetUserInfoChangedCallback",
                retType: DataType.Void,
                paramsType: [DataType.Void, DataType.String],
                paramsValue: [null, params.user_data ?? ""],
            });
        }
    }
}
export default TimbaseManager;

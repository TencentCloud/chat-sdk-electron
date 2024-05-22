import {
    SetSignalingInvitationCancelledCallbackParam,
    SetSignalingInvitationModifiedCallback,
    SetSignalingInvitationTimeoutCallParam,
    SetSignalingInviteeAcceptedCallbackParam,
    SetSignalingInviteeRejectedCallbackParam,
    SetSignalingReceiveNewInvitationCallbackParam,
    SignalingInfo,
    commonResult,
    getSignalingInfoParam,
    inviteInGroupParam,
    inviteParam,
    sdkconfig,
    signalingParam,
} from "../interface";

const { load, DataType, funcConstructor } = require("ffi-rs");

const libName = "libImSDK";

class SignalingManager {
    private _sdkconfig: sdkconfig;

    setSDKAPPID(sdkappid: number) {
        this._sdkconfig.sdkappid = sdkappid;
    }
    /** @internal */
    constructor(config: sdkconfig) {
        this._sdkconfig = config;
    }
    /**
     * 邀请某个人
     * @param param
     *
     */
    TIMInvite(param: inviteParam): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const arr = Buffer.alloc(128);
            const code = load({
                library: libName,
                funcName: "TIMSignalingInvite",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    DataType.String,
                    DataType.Boolean,
                    DataType.String,
                    DataType.I32,
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
                    param.invitee,
                    param.data,
                    param.online_user_only,
                    JSON.stringify(param.json_offline_push_info),
                    param.timeout,
                    arr,
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code != 0) {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    param.user_data ?? "",
                ],
            });
            if (code == 0) {
                resolve({
                    code: 0,
                    desc: "",
                    json_params: arr.toString().split("\u0000")[0],
                    user_data: param.user_data,
                });
            } else {
                reject({
                    code,
                });
            }
        });
    }

    TIMInviteInGroup(param: inviteInGroupParam): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const arr = Buffer.alloc(128);
            const code = load({
                library: libName,
                funcName: "TIMSignalingInviteInGroup",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    DataType.String,
                    DataType.String,
                    DataType.Boolean,
                    DataType.I32,
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
                    param.group_id,
                    JSON.stringify(param.json_invitee_array),
                    param.data,
                    param.online_user_only,
                    param.timeout,
                    arr,
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code != 0) {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    param.user_data ?? "",
                ],
            });
            if (code == 0) {
                resolve({
                    code: 0,
                    desc: "",
                    json_params: arr.toString().split("\u0000")[0],
                    user_data: param.user_data,
                });
            } else {
                reject({
                    code,
                });
            }
        });
    }

    TIMCancelInvite(param: signalingParam): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMSignalingCancel",
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
                    param.invite_id,
                    param.data,
                    (...args: any) => {
                        const [code, desc, json_params, user_data] = args;
                        if (code == 0) {
                            resolve({ code, desc, json_params, user_data });
                        } else {
                            reject({ code, desc, json_params, user_data });
                        }
                    },
                    param.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    TIMAcceptInvite(param: signalingParam): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMSignalingAccept",
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
                    param.invite_id,
                    param.data,
                    (...args: any) => {
                        const [code, desc, json_params, user_data] = args;
                        if (code == 0) {
                            resolve({ code, desc, json_params, user_data });
                        } else {
                            reject({ code, desc, json_params, user_data });
                        }
                    },
                    param.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    TIMRejectInvite(param: signalingParam): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMSignalingReject",
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
                    param.invite_id,
                    param.data,
                    (...args: any) => {
                        const [code, desc, json_params, user_data] = args;
                        if (code == 0) {
                            resolve({ code, desc, json_params, user_data });
                        } else {
                            reject({ code, desc, json_params, user_data });
                        }
                    },
                    param.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    TIMGetSignalingInfo(
        param: getSignalingInfoParam
    ): Promise<commonResult<SignalingInfo>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMGetSignalingInfo",
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
                    JSON.stringify(param.json_msg),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: SignalingInfo;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify({})
                                );
                            } catch {
                                param = {} as SignalingInfo;
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
                    param.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    TIMSignalingModifyInvitation(
        param: signalingParam
    ): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMSignalingModifyInvitation",
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
                    param.invite_id,
                    param.data,
                    (...args: any) => {
                        const [code, desc, json_params, user_data] = args;
                        if (code == 0) {
                            resolve({ code, desc, json_params, user_data });
                        } else {
                            reject({ code, desc, json_params, user_data });
                        }
                    },
                    param.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    async TIMOnInvited(
        param: SetSignalingReceiveNewInvitationCallbackParam
    ): Promise<any> {
        const { callback } = param;
        if (callback != null) {
            load({
                library: libName,
                funcName: "TIMSetSignalingReceiveNewInvitationCallback",
                retType: DataType.Void,
                paramsType: [
                    funcConstructor({
                        paramsType: [
                            DataType.String,
                            DataType.String,
                            DataType.String,
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
        } else {
            load({
                library: libName,
                funcName: "TIMSetSignalingReceiveNewInvitationCallback",
                retType: DataType.Void,
                paramsType: [DataType.Void, DataType.String],
                paramsValue: [null, param.user_data ?? ""],
            });
        }
    }

    async TIMOnAccepted(
        param: SetSignalingInviteeAcceptedCallbackParam
    ): Promise<any> {
        const { callback } = param;
        if (callback != null) {
            load({
                library: libName,
                funcName: "TIMSetSignalingInviteeAcceptedCallback",
                retType: DataType.Void,
                paramsType: [
                    funcConstructor({
                        paramsType: [
                            DataType.String,
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
        } else {
            load({
                library: libName,
                funcName: "TIMSetSignalingInviteeAcceptedCallback",
                retType: DataType.Void,
                paramsType: [DataType.Void, DataType.String],
                paramsValue: [null, param.user_data ?? ""],
            });
        }
    }

    async TIMOnRejected(
        param: SetSignalingInviteeRejectedCallbackParam
    ): Promise<any> {
        const { callback } = param;
        if (callback != null) {
            load({
                library: libName,
                funcName: "TIMSetSignalingInviteeRejectedCallback",
                retType: DataType.Void,
                paramsType: [
                    funcConstructor({
                        paramsType: [
                            DataType.String,
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
        } else {
            load({
                library: libName,
                funcName: "TIMSetSignalingInviteeRejectedCallback",
                retType: DataType.Void,
                paramsType: [DataType.Void, DataType.String],
                paramsValue: [null, param.user_data ?? ""],
            });
        }
    }

    async TIMOnCancelled(
        param: SetSignalingInvitationCancelledCallbackParam
    ): Promise<any> {
        const { callback } = param;
        if (callback != null) {
            load({
                library: libName,
                funcName: "TIMSetSignalingInvitationCancelledCallback",
                retType: DataType.Void,
                paramsType: [
                    funcConstructor({
                        paramsType: [
                            DataType.String,
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
        } else {
            load({
                library: libName,
                funcName: "TIMSetSignalingInvitationCancelledCallback",
                retType: DataType.Void,
                paramsType: [DataType.Void, DataType.String],
                paramsValue: [null, param.user_data ?? ""],
            });
        }
    }

    async TIMOnTimeout(
        param: SetSignalingInvitationTimeoutCallParam
    ): Promise<any> {
        const { callback } = param;
        if (callback != null) {
            load({
                library: libName,
                funcName: "TIMSetSignalingInvitationTimeoutCallback",
                retType: DataType.Void,
                paramsType: [
                    funcConstructor({
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
        } else {
            load({
                library: libName,
                funcName: "TIMSetSignalingInvitationTimeoutCallback",
                retType: DataType.Void,
                paramsType: [DataType.Void, DataType.String],
                paramsValue: [null, param.user_data ?? ""],
            });
        }
    }

    async TIMOnModified(
        param: SetSignalingInvitationModifiedCallback
    ): Promise<any> {
        const { callback } = param;
        if (callback != null) {
            load({
                library: libName,
                funcName: "TIMSetSignalingInvitationModifiedCallback",
                retType: DataType.Void,
                paramsType: [
                    funcConstructor({
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
        } else {
            load({
                library: libName,
                funcName: "TIMSetSignalingInvitationModifiedCallback",
                retType: DataType.Void,
                paramsType: [DataType.Void, DataType.String],
                paramsValue: [null, param.user_data ?? ""],
            });
        }
    }
}

export default SignalingManager;

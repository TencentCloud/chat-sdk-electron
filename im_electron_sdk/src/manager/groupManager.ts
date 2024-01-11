/**
 * 腾讯云 IM SDK 支持四种预设的群组类型，每种类型都有其适用场景：<br>
 * > 工作群（Work）：类似普通微信群，创建后不能自由加入，必须由已经在群的用户邀请入群。<br>
 * > 公开群（Public）：类似 QQ 群，用户申请加入，但需要群主或管理员审批。  <br>
 * > 会议群（Meeting)：适合跟 TRTC 结合实现视频会议和在线教育等场景，支持随意进出，支持查看进群前的历史消息。  <br>
 * > 直播群（AVChatRoom）：适合直播弹幕聊天室等场景，支持随意进出，人数无上限  <br>
 * @module GroupManager(群组相关接口)
 */
import {
    CreateGroupParams,
    DeleteGroupParams,
    JoinGroupParams,
    QuitGroupParams,
    InviteMemberParams,
    DeleteMemberParams,
    GetGroupListParams,
    ModifyGroupParams,
    GetGroupMemberInfoParams,
    ModifyMemberInfoParams,
    GetPendencyListParams,
    ReportParams,
    HandlePendencyParams,
    GetOnlineMemberCountParams,
    SearchGroupParams,
    SearchMemberParams,
    InitGroupAttributeParams,
    DeleteAttributeParams,
    GroupTipsCallbackParams,
    GroupAttributeCallbackParams,
    MsgSendGroupMessageReceiptsParam,
    MsgGetGroupMessageReceiptsParam,
    MsgGetGroupMessageReadMembersParam,
    commonResult,
    DeleteMemberResult,
    GroupBaseInfo,
    GroupInfoResult,
    GroupInfo,
    GetMemberInfoResult,
    GroupPendencyResult,
    GetOnlineMemberCountResult,
    SearchMemberResult,
    MessageReceipt,
    GroupMemberInfo,
    GroupAttributes,
    CreateGroupResult,
    MsgGetGroupMessageReadMemberListResult,
    GroupCounterParams,
    GroupCounter,
    IncreaseGroupCounterParam,
    GetGroupCounterParams,
    GetCommunityListParam,
    CreateTopicParam,
    DeleteTopicParam,
    TopicOperationResult,
    SetTopicInfoParam,
    GroupTopicInfoResult,
    GroupCounterChangedParam,
    TopicCreatedParam,
    TopicDeletedParam,
    TopicChangedParam,
    sdkconfig,
} from "../interface";

const { load, DataType, funcConstructor } = require("ffi-rs");

const libName = "libImSDK";

class GroupManager {
    private _sdkconfig: sdkconfig;

    setSDKAPPID(sdkappid: number) {
        this._sdkconfig.sdkappid = sdkappid;
    }

    /** @internal */
    constructor(config: sdkconfig) {
        this._sdkconfig = config;
    }

    /**
     * @brief 创建群组
     * @param createGroupParams
     * @category 创建群组
     * @return  {Promise<commonResponse>} Promise的response返回值为：{ code, desc, json_param, user_data}
     * @note
     * &emsp;
     * > 创建群组时可以指定群ID，若未指定时IM通讯云服务器会生成一个唯一的ID，以便后续操作，群组ID通过创建群组时传入的回调返回
     */
    TIMGroupCreate(
        createGroupParams: CreateGroupParams
    ): Promise<commonResult<CreateGroupResult>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMGroupCreate",
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
                    JSON.stringify(createGroupParams.params),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: CreateGroupResult;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify({})
                                );
                            } catch {
                                param = {} as CreateGroupResult;
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
                    createGroupParams.data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    /**
     * @brief 删除(解散)群组
     * @param DeleteGroupParams
     * @category 删除（解散）群组
     * @return {Promise<commonResponse>} Promise的response返回值为：{ code, desc, json_param, user_data}
     *
     * @note
     * &emsp;
     * > 权限说明：
     * >   对于私有群，任何人都无法解散群组。
     * >   对于公开群、聊天室和直播大群，群主可以解散群组。
     */
    TIMGroupDelete(
        deleteParams: DeleteGroupParams
    ): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMGroupDelete",
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
                    deleteParams.groupId,
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({ code, desc, json_param, user_data });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    deleteParams.data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    /**
     * @brief 申请加入群组
     * @param JoinGroupParams
     * @return {Promise<commonResponse>}  Promise的response返回值为：{ code, desc, json_param, user_data}
     * @category 加入群组
     * @note &emsp;
     * > 权限说明：
     * > 私有群不能由用户主动申请入群。
     * > 公开群和聊天室可以主动申请进入。
     * +  如果群组设置为需要审核，申请后管理员和群主会受到申请入群系统消息，需要等待管理员或者群主审核，如果群主设置为任何人可加入，则直接入群成功。
     *    直播大群可以任意加入群组。
     */
    TIMGroupJoin(
        joinGroupParams: JoinGroupParams
    ): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMGroupJoin",
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
                    joinGroupParams.groupId,
                    joinGroupParams.helloMsg ?? "",
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({ code, desc, json_param, user_data });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    joinGroupParams.data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    /**
     * @brief 退出群组
     * @category 退出群组
     * @param QuitGroupParams
     * @return {Promise<commonResponse>}
     *
     * @note
     *&emsp;
     * > 权限说明：
     * >   对于私有群，全员可退出群组。
     * >   对于公开群、聊天室和直播大群，群主不能退出。
     * > 退出指定群组groupId的接口，退出成功与否可根据回调cb的参数判断。
     */
    TIMGroupQuit(
        quitGroupParams: QuitGroupParams
    ): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMGroupQuit",
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
                    quitGroupParams.groupId,
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({ code, desc, json_param, user_data });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    quitGroupParams.data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    /**
     * @brief 邀请加入群组
     * @category 加入群组
     * @param InviteMemberParams
     * @return {Promise<commonResponse>}
     */
    TIMGroupInviteMember(
        inviteMemberParams: InviteMemberParams
    ): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMGroupInviteMember",
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
                    JSON.stringify(inviteMemberParams.params),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({ code, desc, json_param, user_data });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    inviteMemberParams.data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief 删除群组成员
     * @category 删除群组成员
     * @param DeleteMemberParams
     * @return {Promise<commonResponse>}
     * @note 权限说明：
     *
     * >   对于私有群：只有创建者可删除群组成员。
     * >   对于公开群和聊天室：只有管理员和群主可以踢人。
     * >   对于直播大群：不能踢人。
     */
    TIMGroupDeleteMember(
        deleteMemberParams: DeleteMemberParams
    ): Promise<commonResult<DeleteMemberResult>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMGroupDeleteMember",
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
                    JSON.stringify(deleteMemberParams.params),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: DeleteMemberResult;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify({})
                                );
                            } catch {
                                param = {} as DeleteMemberResult;
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
                    deleteMemberParams.data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    /**
     * @brief  获取已加入群组列表
     * @category 群组信息相关接口
     * @param data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
     * @return {Promise<commonResponse>}
     *
     * @note
     * &emsp;
     * > 权限说明：
     * >   此接口可以获取自己所加入的群列表
     * >   此接口只能获得加入的部分直播大群的列表。
     */
    TIMGroupGetJoinedGroupList(
        data?: string
    ): Promise<commonResult<Array<GroupInfo>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMGroupGetJoinedGroupList",
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
                            let param: Array<GroupInfo>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param = [] as Array<GroupInfo>;
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
                    data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    /**
    * @brief  获取群组信息列表
    * @category 群组信息相关接口
    * @param json_group_getinfo_param 获取群组信息列表参数的Json字符串
    * @param cb 获取群组信息列表成功与否的回调。回调函数定义和参数解析请参考 [TIMCommCallback](TIMCloudCallback.h)
    * @param user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
    * @return {Promise<commonResponse>} 其中get_groups_info_result_code 返回TIM_SUCC表示接口调用成功（接口只有返回TIM_SUCC，回调cb才会被调用），其他值表示接口调用失败。每个返回值的定义请参考 [TIMResult](../../doc/enums/timresult.html)
    *
    * @note
    * 此接口用于获取指定群ID列表的群详细信息。具体返回的含义请暂时参考下方
    * 
    * ```
    * // 群组详细信息
    * static const char* kTIMGroupDetialInfoGroupId          = "group_detial_info_group_id";           // string, 只读, 群组ID
    static const char* kTIMGroupDetialInfoGroupType        = "group_detial_info_group_type";         // uint [TIMGroupType](), 只读, 群组类型
    static const char* kTIMGroupDetialInfoGroupName        = "group_detial_info_group_name";         // string, 只读, 群组名称
    static const char* kTIMGroupDetialInfoNotification     = "group_detial_info_notification";       // string, 只读, 群组公告
    static const char* kTIMGroupDetialInfoIntroduction     = "group_detial_info_introduction";       // string, 只读, 群组简介
    static const char* kTIMGroupDetialInfoFaceUrl          = "group_detial_info_face_url";           // string, 只读, 群组头像URL
    static const char* kTIMGroupDetialInfoCreateTime       = "group_detial_info_create_time";        // uint,   只读, 群组创建时间
    static const char* kTIMGroupDetialInfoInfoSeq          = "group_detial_info_info_seq";           // uint,   只读, 群资料的Seq，群资料的每次变更都会增加这个字段的值
    static const char* kTIMGroupDetialInfoLastInfoTime     = "group_detial_info_last_info_time";     // uint,   只读, 群组信息最后修改时间
    static const char* kTIMGroupDetialInfoNextMsgSeq       = "group_detial_info_next_msg_seq";       // uint,   只读, 群最新消息的Seq
    static const char* kTIMGroupDetialInfoLastMsgTime      = "group_detial_info_last_msg_time";      // uint,   只读, 最新群组消息时间
    static const char* kTIMGroupDetialInfoMemberNum        = "group_detial_info_member_num";         // uint,   只读, 群组当前成员数量
    static const char* kTIMGroupDetialInfoMaxMemberNum     = "group_detial_info_max_member_num";     // uint,   只读, 群组最大成员数量
    static const char* kTIMGroupDetialInfoAddOption        = "group_detial_info_add_option";         // uint [TIMGroupAddOption](), 只读, 群组加群选项
    static const char* kTIMGroupDetialInfoOnlineMemberNum  = "group_detial_info_online_member_num";  // uint,   只读, 群组在线成员数量
    static const char* kTIMGroupDetialInfoVisible          = "group_detial_info_visible";            // uint,   只读, 群组成员是否对外可见
    static const char* kTIMGroupDetialInfoSearchable       = "group_detial_info_searchable";         // uint,   只读, 群组是否能被搜索
    static const char* kTIMGroupDetialInfoIsShutupAll      = "group_detial_info_is_shutup_all";      // bool,   只读, 群组是否被设置了全员禁言
    static const char* kTIMGroupDetialInfoOwnerIdentifier  = "group_detial_info_owener_identifier";  // string, 只读, 群组所有者ID
    static const char* kTIMGroupDetialInfoCustomInfo       = "group_detial_info_custom_info";        // array [GroupInfoCustomString](), 只读, 请参考[自定义字段](https://cloud.tencent.com/document/product/269/1502#.E8.87.AA.E5.AE.9A.E4.B9.89.E5.AD.97.E6.AE.B5)

    //获取已加入群组列表接口的返回(群组基础信息)
    static const char* kTIMGroupBaseInfoGroupId      = "group_base_info_group_id";       // string, 只读, 群组ID
    static const char* kTIMGroupBaseInfoGroupName    = "group_base_info_group_name";     // string, 只读, 群组名称
    static const char* kTIMGroupBaseInfoGroupType    = "group_base_info_group_type";     // uint [TIMGroupType](), 只读, 群组类型
    static const char* kTIMGroupBaseInfoFaceUrl      = "group_base_info_face_url";       // string, 只读, 群组头像URL
    static const char* kTIMGroupBaseInfoInfoSeq      = "group_base_info_info_seq";       // uint,   只读, 群资料的Seq，群资料的每次变更都会增加这个字段的值
    static const char* kTIMGroupBaseInfoLastestSeq   = "group_base_info_lastest_seq";    // uint,   只读, 群最新消息的Seq。群组内每一条消息都有一条唯一的消息Seq，且该Seq是按照发消息顺序而连续的。从1开始，群内每增加一条消息，LastestSeq就会增加1
    static const char* kTIMGroupBaseInfoReadedSeq    = "group_base_info_readed_seq";     // uint,   只读, 用户所在群已读的消息Seq
    static const char* kTIMGroupBaseInfoMsgFlag      = "group_base_info_msg_flag";       // uint,   只读, 消息接收选项
    static const char* kTIMGroupBaseInfoIsShutupAll  = "group_base_info_is_shutup_all";  // bool,   只读, 当前群组是否设置了全员禁言
    static const char* kTIMGroupBaseInfoSelfInfo     = "group_base_info_self_info";      // object [GroupSelfInfo](), 只读, 用户所在群的个人信息
    * ```
    */
    TIMGroupGetGroupInfoList(
        getGroupListParams: GetGroupListParams
    ): Promise<commonResult<Array<GroupInfoResult>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMGroupGetGroupInfoList",
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
                    JSON.stringify(getGroupListParams.groupIds),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<GroupInfoResult>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param = [] as Array<GroupInfoResult>;
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
                    getGroupListParams.data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    /**
     * @brief  修改群信息
     * @param ModifyGroupParams
     * @category 群组信息相关接口
     * @return {Promise<commonResponse>}
     * @note
     * &emsp;
     * > 修改群主（群转让）的权限说明：
     * >   只有群主才有权限进行群转让操作。
     * >   直播大群不能进行群转让操作。
     * >   修改群其他信息的权限说明:
     * >   对于公开群、聊天室和直播大群，只有群主或者管理员可以修改群简介。
     * >   对于私有群，任何人可修改群简介。
     */
    TIMGroupModifyGroupInfo(
        modifyGroupParams: ModifyGroupParams
    ): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMGroupModifyGroupInfo",
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
                    JSON.stringify(modifyGroupParams.params),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({ code, desc, json_param, user_data });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    modifyGroupParams.data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief 获取群成员信息列表
     * @category 群组信息相关接口
     * @param GetGroupMemberInfoParams
     * @return {Promise<commonResponse> }
     * @note 权限说明：
     * >   任何群组类型都可以获取成员列表。
     * >   直播大群只能拉取部分成员列表：包括群主、管理员和部分成员。
     */
    TIMGroupGetMemberInfoList(
        getGroupMemberInfoParams: GetGroupMemberInfoParams
    ): Promise<commonResult<GetMemberInfoResult>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMGroupGetMemberInfoList",
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
                    JSON.stringify(getGroupMemberInfoParams.params),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: GetMemberInfoResult;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify({})
                                );
                            } catch {
                                param = {} as GetMemberInfoResult;
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
                    getGroupMemberInfoParams.data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief 修改群成员信息
     * @param ModifyMemberInfoParams
     * @category 群组信息相关接口
     * @return {Promise<commonResponse>}
     * @note 权限说明：
     * > 只有群主或者管理员可以进行对群成员的身份进行修改。
     * > 直播大群不支持修改用户群内身份。
     * > 只有群主或者管理员可以进行对群成员进行禁言。
     * > kTIMGroupModifyMemberInfoParamModifyFlag 可以按位或设置多个值，不同的flag设置不同的键。请参考interface下的 ModifyMemberInfoParams
     */
    TIMGroupModifyMemberInfo(
        modifyMemberInfoParams: ModifyMemberInfoParams
    ): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMGroupModifyMemberInfo",
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
                    JSON.stringify(modifyMemberInfoParams.params),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({ code, desc, json_param, user_data });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    modifyMemberInfoParams.data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief  获取群未决信息列表
     *         &emsp;
     *        群未决信息是指还没有处理的操作，例如，邀请加群或者请求加群操作还没有被处理，称之为群未决信息
     * @param GetPendencyListParams
     * @category 群组信息相关接口
     *  @note 注意
     * > 此处的群未决消息泛指所有需要审批的群相关的操作。例如：加群待审批，拉人入群待审批等等。即便审核通过或者拒绝后，该条信息也可通过此接口拉回，拉回的信息中有已决标志。
     * > UserA申请加入群GroupA，则群管理员可获取此未决相关信息，UserA因为没有审批权限，不需要获取此未决信息。
     * > 如果AdminA拉UserA进去GroupA，则UserA可以拉取此未决相关信息，因为该未决信息待UserA审批
     * > 权限说明：
     * > 只有审批人有权限拉取相关未决信息。
     * > kTIMGroupPendencyOptionStartTime 设置拉取时间戳,第一次请求填0,后边根据server返回的 GroupPendencyResult键 kTIMGroupPendencyResultNextStartTime （参考下方）指定的时间戳进行填写。
     * > kTIMGroupPendencyOptionMaxLimited 拉取的建议数量,server可根据需要返回或多或少,不能作为完成与否的标志
     *      * @return {Promise<commonResponse>}
     * ```
     * // 获取群未决信息列表的返回(GroupPendencyResult JsonKey)
     *  kTIMGroupPendencyResultNextStartTime = "group_pendency_result_next_start_time";  // number, 只读, 下一次拉取的起始时戳,server返回0表示没有更多的数据,否则在下次获取数据时以这个时间戳作为开始时间戳
     *  kTIMGroupPendencyResultReadTimeSeq   = "group_pendency_result_read_time_seq";    // number, 只读, 已读上报的时间戳
     *  kTIMGroupPendencyResultUnReadNum     = "group_pendency_result_unread_num";       // number,   只读, 未决请求的未读数
     *  kTIMGroupPendencyResultPendencyArray = "group_pendency_result_pendency_array";   // array [GroupPendency](), 只读, 群未决信息列表
     * ```
     */
    TIMGroupGetPendencyList(
        getPendencyListParams: GetPendencyListParams
    ): Promise<commonResult<GroupPendencyResult>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMGroupGetPendencyList",
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
                    JSON.stringify(getPendencyListParams.params),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: GroupPendencyResult;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify({})
                                );
                            } catch {
                                param = {} as GroupPendencyResult;
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
                    getPendencyListParams.data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief 上报群未决信息已读
     * @category 群组信息相关接口
     * @param ReportParams
     * @return  {Promise<commonResponse>}
     *
     * @note
     * 时间戳time_stamp以前的群未决请求都将置为已读。上报已读后，仍然可以拉取到这些未决信息，但可通过对已读时戳的判断判定未决信息是否已读。
     */
    TIMGroupReportPendencyReaded(
        reportParams: ReportParams
    ): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMGroupReportPendencyReaded",
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
                    reportParams.timeStamp,
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({ code, desc, json_param, user_data });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    reportParams.data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    /**
     * @brief 处理群未决信息
     * @param HandlePendencyParams
     * @category 群组信息相关接口
     * @return {Promise<commonResponse>}
     * @note 注意
     * > 对于群的未决信息，ImSDK增加了处理接口。审批人可以选择对单条信息进行同意或者拒绝。已处理成功过的未决信息不能再次处理。
     * > 处理未决信息时需要带一个未决信息[HandlePendencyParams](../../doc/interfaces/interface_groupinterface.handlependencyparams.html),
     * > 可以在接口[TIMGroupGetPendencyList](./manager_groupmanager.default.html#timgroupgetpendencylist)返回的未决信息列表将未决信息保存下来，
     * > 在处理未决信息的时候将GroupPendency传入键 group_handle_pendency_param_pendency 。
     */
    TIMGroupHandlePendency(
        handlePendencyParams: HandlePendencyParams
    ): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMGroupHandlePendency",
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
                    JSON.stringify(handlePendencyParams.params),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({ code, desc, json_param, user_data });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    handlePendencyParams.data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    /**
     * @brief 获取指定群在线人数
     * @category 群组信息相关接口
     * @param SearchGroupParams
     * @return {Promise<commonResponse>}
     * @note 请注意
     * - 目前只支持：直播群（ AVChatRoom）。
     * - 该接口有频限检测，SDK 限制调用频率为60秒1次
     */
    TIMGroupGetOnlineMemberCount(
        params: GetOnlineMemberCountParams
    ): Promise<commonResult<GetOnlineMemberCountResult>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMGroupGetOnlineMemberCount",
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
                    params.groupId,
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: GetOnlineMemberCountResult;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify({})
                                );
                            } catch {
                                param = {} as GetOnlineMemberCountResult;
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
                    params.data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief 设置群计数器
     * @note
     * - 该计数器的 key 如果存在，则直接更新计数器的 value 值；如果不存在，则添加该计数器的 key-value；
     * - 当群计数器设置成功后，在回调 cb 中会返回最终成功设置的群计数器信息；
     * - 除了社群和话题，群计数器支持所有的群组类型。
     */
    TIMGroupSetGroupCounters(
        setGroupCountersParam: GroupCounterParams
    ): Promise<commonResult<Array<GroupCounter>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMGroupSetGroupCounters",
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
                    setGroupCountersParam.params.group_id,
                    JSON.stringify(
                        setGroupCountersParam.params.json_group_counter_array
                    ),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<GroupCounter>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify({})
                                );
                            } catch {
                                param = [] as Array<GroupCounter>;
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
                    setGroupCountersParam.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief 获取群计数器
     */
    TIMGroupGetGroupCounters(
        getGroupCountersParam: GetGroupCounterParams
    ): Promise<commonResult<Array<GroupCounter>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMGroupSetGroupCounters",
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
                    getGroupCountersParam.group_id,
                    JSON.stringify(
                        getGroupCountersParam.json_group_counter_key_array
                    ),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<GroupCounter>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify({})
                                );
                            } catch {
                                param = [] as Array<GroupCounter>;
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
                    getGroupCountersParam.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief 递增群计数器
     * @note
     * - 该计数器的 key 如果存在，则直接在当前值的基础上根据传入的 group_counter_value 作递增操作；反之，添加 key，并在默认值为 0 的基础上根据传入的 group_counter_value 作递增操作；
     * - 除了社群和话题，群计数器支持所有的群组类型。
     */
    TIMGroupIncreaseGroupCounter(
        increaseParam: IncreaseGroupCounterParam
    ): Promise<commonResult<Array<GroupCounter>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMGroupIncreaseGroupCounter",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    DataType.String,
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
                    increaseParam.group_id,
                    increaseParam.group_counter_key,
                    increaseParam.group_counter_value,
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<GroupCounter>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify({})
                                );
                            } catch {
                                param = [] as Array<GroupCounter>;
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
                    increaseParam.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief 递减群计数器
     * @note
     * - 该计数器的 key 如果存在，则直接在当前值的基础上根据传入的 group_counter_value 作递减操作；反之，添加 key，并在默认值为 0 的基础上根据传入的 group_counter_value 作递减操作
     * - 除了社群和话题，群计数器支持所有的群组类型。
     */
    TIMGroupDecreaseGroupCounter(
        increaseParam: IncreaseGroupCounterParam
    ): Promise<commonResult<Array<GroupCounter>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMGroupDecreaseGroupCounter",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    DataType.String,
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
                    increaseParam.group_id,
                    increaseParam.group_counter_key,
                    increaseParam.group_counter_value,
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<GroupCounter>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify({})
                                );
                            } catch {
                                param = [] as Array<GroupCounter>;
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
                    increaseParam.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief 搜索群列表
     *
     * @param SearchGroupParams  群列表参数
     * @return {Promise<commonResponse>}
     * @category 搜索群列表
     * @note
     *  SDK 会搜索群名称包含于关键字列表 keywordList 的所有群并返回群信息列表。关键字列表最多支持5个。
     */
    TIMGroupSearchGroups(
        searchGroupsParams: SearchGroupParams
    ): Promise<commonResult<Array<GroupInfo>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMGroupSearchGroups",
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
                    searchGroupsParams.searchParams,
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<GroupInfo>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param = [] as Array<GroupInfo>;
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
                    searchGroupsParams.data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    /**
     * @brief 搜索群成员列表
     * @category 搜索群成员列表
     * @param SearchMemberParams
     * @return {Promise<commonResponse>}
     * @note
     * SDK 会在本地搜索指定群 ID 列表中，群成员信息（名片、好友备注、昵称、userID）包含于关键字列表 keywordList 的所有群成员并返回群 ID 和群成员列表的 map，关键字列表最多支持5个。
     */
    TIMGroupSearchGroupMembers(
        searchMemberParams: SearchMemberParams
    ): Promise<commonResult<Array<SearchMemberResult>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMGroupSearchGroupMembers",
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
                    searchMemberParams.searchParams,
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<SearchMemberResult>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param = [] as Array<SearchMemberResult>;
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
                    searchMemberParams.data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    /**
     * @brief 初始化群属性，会清空原有的群属性列表
     * @note 从7.0版本开始，出了话题外，群属性支持所有的群类型；
     * - key 最多支持16个，长度限制为32字节
     * - value 长度限制为4k
     * - 总的 attributes（包括 key 和 value）限制为 16k
     * - initGroupAttributes、setGroupAttributes、deleteGroupAttributes 接口合并计算， SDK 限制为 5 秒 10 次，超过后回调 8511 错误码；后台限制 1 秒 5 次，超过后返回 10049 错误码；
     * - getGroupAttributes 接口 SDK 限制 5 秒 20 次；
     * - 当每次APP启动后初次修改群属性时，请您先调用 getGroupAttributes 拉取到最新的群属性之后，再发起修改操作；
     * - 当多个用户同时修改同一个群属性时，只有第一个用户可以执行成功，其它用户会收到 10056 错误码；收到这个错误码之后，请您调用 getGroupAttributes 把本地保存的群属性更新到最新之后，再发起修改操作。
     * @category 群属性相关接口
     * @param InitGroupAttributeParams
     * @return {Promise<commonResponse>}
     */
    TIMGroupInitGroupAttributes(
        initAttributesParams: InitGroupAttributeParams
    ): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMGroupInitGroupAttributes",
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
                    initAttributesParams.groupId,
                    JSON.stringify(initAttributesParams.attributes),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({ code, desc, json_param, user_data });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    initAttributesParams.data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    TIMMsgSendMessageReadReceipts(
        msgSendGroupMessageReceipts: MsgSendGroupMessageReceiptsParam
    ): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMMsgSendMessageReadReceipts",
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
                    msgSendGroupMessageReceipts.json_msg_array,
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({ code, desc, json_param, user_data });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    msgSendGroupMessageReceipts.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    TIMMsgGetMessageReadReceipts(
        msgGetGroupMessageReceipts: MsgGetGroupMessageReceiptsParam
    ): Promise<commonResult<Array<MessageReceipt>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMMsgGetMessageReadReceipts",
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
                    msgGetGroupMessageReceipts.json_msg_array,
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({ code, desc, json_param, user_data });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    msgGetGroupMessageReceipts.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    TIMMsgGetGroupMessageReadMemberList(
        msgGetGroupMessageReadMembers: MsgGetGroupMessageReadMembersParam
    ): Promise<commonResult<MsgGetGroupMessageReadMemberListResult>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMMsgGetGroupMessageReadMemberList",
                retType: DataType.I32,
                paramsType: [
                    DataType.String,
                    DataType.I32,
                    DataType.I64,
                    DataType.I32,
                    funcConstructor({
                        paramsType: [
                            DataType.String,
                            DataType.I64,
                            DataType.Boolean,
                            DataType.String,
                        ],
                        retType: DataType.Void,
                    }),
                    DataType.String,
                ],
                paramsValue: [
                    msgGetGroupMessageReadMembers.json_msg,
                    msgGetGroupMessageReadMembers.filter,
                    msgGetGroupMessageReadMembers.next_seq,
                    msgGetGroupMessageReadMembers.count,
                    (
                        json_group_member_array: string,
                        next_seq: number,
                        is_finished: boolean,
                        user_data: string
                    ) => {
                        // const [code, desc, json_param, user_data] = args;
                        let param: Array<GroupMemberInfo> =
                            json_group_member_array == ""
                                ? []
                                : JSON.parse(json_group_member_array);
                        try {
                            param = JSON.parse(
                                json_group_member_array.trim().length > 0
                                    ? json_group_member_array.trim()
                                    : JSON.stringify([])
                            );
                        } catch {
                            param = [] as Array<GroupMemberInfo>;
                        }
                        let result: MsgGetGroupMessageReadMemberListResult = {
                            next_seq: next_seq,
                            is_finished: is_finished,
                            json_param: param,
                        };
                        resolve({
                            code: 0,
                            desc: "",
                            json_param: result,
                            user_data: user_data,
                        });
                    },
                    msgGetGroupMessageReadMembers.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    /**
     * @brief 设置群属性，已有该群属性则更新其 value 值，没有该群属性则添加该群属性
     * @note 除了话题外，群属性支持所有的群类型；
     * @category 群属性相关接口
     * @param DeleteAttributeParams
     * @return {Promise<commonResponse>}
     */
    TIMGroupSetGroupAttributes(
        params: InitGroupAttributeParams
    ): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMGroupSetGroupAttributes",
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
                    params.groupId,
                    JSON.stringify(params.attributes),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({ code, desc, json_param, user_data });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    params.data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    /**
     * @brief 删除群属性
     * @note 版本开始，除了话题外，群属性支持所有的群类型；
     * @category 群属性相关接口
     * @param DeleteAttributeParams
     * @return {Promise<commonResponse>}
     */
    TIMGroupDeleteGroupAttributes(
        params: DeleteAttributeParams
    ): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMGroupDeleteGroupAttributes",
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
                    params.groupId,
                    JSON.stringify(params.attributesKey),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({ code, desc, json_param, user_data });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    params.data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    /**
     * @brief 获取群指定属性，keys 传 null 则获取所有群属性。
     * @note 版本开始，除了话题外，群属性支持所有的群类型；
     * @category 群属性相关接口
     * @param DeleteAttributeParams
     * @return {Promise<commonResponse>}
     */
    TIMGroupGetGroupAttributes(
        params: DeleteAttributeParams
    ): Promise<commonResult<Array<GroupAttributes>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMGroupGetGroupAttributes",
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
                    params.groupId,
                    JSON.stringify(params.attributesKey),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<GroupAttributes>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param = [] as Array<GroupAttributes>;
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
                    params.data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief  获取当前用户已经加入的支持话题的社群列表
     * @category 群属性相关接口
     * @param GetCommunityListParam
     * @return {Promise<commonResponse>}
     */
    TIMGroupGetJoinedCommunityList(
        params: GetCommunityListParam
    ): Promise<commonResult<Array<GroupBaseInfo>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMGroupGetJoinedCommunityList",
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
                            let param: Array<GroupBaseInfo>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param = [] as Array<GroupBaseInfo>;
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
                    params.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief  创建话题
     * @category 群属性相关接口
     * @param GetCommunityListParam
     * @return {Promise<commonResponse>}
     */
    TIMGroupCreateTopicInCommunity(
        params: CreateTopicParam
    ): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMGroupCreateTopicInCommunity",
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
                    params.group_id,
                    JSON.stringify(params.json_topic_info),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({ code, desc, json_param, user_data });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    params.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }
    /**
     * @brief 删除话题
     * @param params
     * @returns Array<TopicOperationResult>
     */
    TIMGroupDeleteTopicFromCommunity(
        params: DeleteTopicParam
    ): Promise<commonResult<Array<TopicOperationResult>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMGroupDeleteTopicFromCommunity",
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
                    params.group_id,
                    JSON.stringify(params.json_topic_id_array),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<TopicOperationResult>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param = [] as Array<TopicOperationResult>;
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
                    params.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    /**
     * @brief 修改话题信息
     * @param params
     * @returns string
     */
    TIMGroupSetTopicInfo(
        params: SetTopicInfoParam
    ): Promise<commonResult<string>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMGroupSetTopicInfo",
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
                    JSON.stringify(params.json_topic_info),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            resolve({ code, desc, json_param, user_data });
                        } else {
                            reject({ code, desc, json_param, user_data });
                        }
                    },
                    params.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    /**
     * @brief 获取话题列表
     * @param params
     * @returns
     */
    TIMGroupGetTopicInfoList(
        params: DeleteTopicParam
    ): Promise<commonResult<Array<GroupTopicInfoResult>>> {
        return new Promise((resolve, reject) => {
            const code = load({
                library: libName,
                funcName: "TIMGroupGetTopicInfoList",
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
                    params.group_id,
                    JSON.stringify(params.json_topic_id_array),
                    (...args: any) => {
                        const [code, desc, json_param, user_data] = args;
                        if (code == 0) {
                            let param: Array<GroupTopicInfoResult>;
                            try {
                                param = JSON.parse(
                                    json_param.trim().length > 0
                                        ? json_param.trim()
                                        : JSON.stringify([])
                                );
                            } catch {
                                param = [] as Array<GroupTopicInfoResult>;
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
                    params.user_data ?? "",
                ],
            });
            code !== 0 && reject({ code });
        });
    }

    /**
     * @brief 设置群组系统消息回调
     * @category 群组相关回调(callback)
     * @param GroupTipsCallbackParams
     * @note
     * 群组系统消息事件包括 加入群、退出群、踢出群、设置管理员、取消管理员、群资料变更、群成员资料变更。此消息是针对所有群组成员下发的
     */
    async TIMSetGroupTipsEventCallback(
        params: GroupTipsCallbackParams
    ): Promise<any> {
        const { callback } = params;
        if (callback != null) {
            load({
                library: libName,
                funcName: "TIMSetGroupTipsEventCallback",
                retType: DataType.Void,
                paramsType: [
                    funcConstructor({
                        paramsType: [DataType.String, DataType.String],
                        permanent: true,
                    }),
                    DataType.String,
                ],
                paramsValue: [callback, params.data ?? ""],
            });
        } else {
            load({
                library: libName,
                funcName: "TIMSetGroupTipsEventCallback",
                retType: DataType.Void,
                paramsType: [DataType.Void, DataType.String],
                paramsValue: [null, params.data ?? ""],
            });
        }
    }

    /**
     * @brief 设置群组属性变更回调
     * @category 群组相关回调(callback)
     * @param GroupAttributeCallbackParams
     * @note
     * 某个已加入的群的属性被修改了，会返回所在群组的所有属性（该群所有的成员都能收到）
     */
    async TIMSetGroupAttributeChangedCallback(
        params: GroupAttributeCallbackParams
    ): Promise<any> {
        const { callback } = params;
        if (callback != null) {
            load({
                library: libName,
                funcName: "TIMSetGroupAttributeChangedCallback",
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
                paramsValue: [callback, params.data ?? ""],
            });
        } else {
            load({
                library: libName,
                funcName: "TIMSetGroupAttributeChangedCallback",
                retType: DataType.Void,
                paramsType: [DataType.Void, DataType.String],
                paramsValue: [null, params.data ?? ""],
            });
        }
    }

    /**
     * @brief 设置群计数器变更回调
     * @param params
     * @note
     * 某个已加入的群的计数器被修改了，会返回当前变更的群计数器（该群所有的成员都能收到）
     */
    async TIMSetGroupCounterChangedCallback(
        params: GroupCounterChangedParam
    ): Promise<any> {
        const { callback } = params;
        if (callback != null) {
            load({
                library: libName,
                funcName: "TIMSetGroupCounterChangedCallback",
                retType: DataType.Void,
                paramsType: [
                    funcConstructor({
                        paramsType: [
                            DataType.String,
                            DataType.String,
                            DataType.I64,
                            DataType.String,
                        ],
                        permanent: true,
                    }),
                    DataType.String,
                ],
                paramsValue: [callback, params.user_data ?? ""],
            });
        } else {
            load({
                library: libName,
                funcName: "TIMSetGroupCounterChangedCallback",
                retType: DataType.Void,
                paramsType: [DataType.Void, DataType.String],
                paramsValue: [null, params.user_data ?? ""],
            });
        }
    }

    /**
     * @brief 话题创建
     * @param params
     */
    async TIMSetGroupTopicCreatedCallback(
        params: TopicCreatedParam
    ): Promise<any> {
        const { callback } = params;
        load({
            library: libName,
            funcName: "TIMSetGroupTopicCreatedCallback",
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
            paramsValue: [callback, params.user_data ?? ""],
        });
    }

    /**
     * @brief 话题被删除
     * @param params
     */
    async TIMSetGroupTopicDeletedCallback(
        params: TopicDeletedParam
    ): Promise<any> {
        const { callback } = params;
        load({
            library: libName,
            funcName: "TIMSetGroupTopicDeletedCallback",
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
            paramsValue: [callback, params.user_data ?? ""],
        });
    }

    /**
     * @brief 话题更新
     * @param params
     */
    async TIMSetGroupTopicChangedCallback(
        params: TopicChangedParam
    ): Promise<any> {
        const { callback } = params;
        load({
            library: libName,
            funcName: "TIMSetGroupTopicChangedCallback",
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
            paramsValue: [callback, params.user_data ?? ""],
        });
    }
}
export default GroupManager;

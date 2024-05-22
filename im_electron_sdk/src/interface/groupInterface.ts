import {
    HandleGroupMemberResult,
    TIMConvType,
    TIMGroupAddOption,
    TIMGroupAtType,
    TIMGroupMemberRole,
    TIMGroupModifyInfoFlag,
    TIMGroupTipGroupChangeFlag,
    TIMGroupType,
    TIMReceiveMessageOpt,
} from "../enum";
import { Json_value_msg } from "./advanceMessageInterface";

/**
 * @brief 群组基础信息
 * @param group_base_info_group_id group_base_info_group_id: 群组ID
 * @param group_base_info_group_name group_base_info_group_name: 群组名称
 * @param group_base_info_group_type group_base_info_group_type: 群组类型
 * @param group_base_info_face_url group_base_info_face_url: 群组头像URL
 * @param group_base_info_info_seq group_base_info_info_seq: 群资料的Seq，群资料的每次变更都会增加这个字段的值
 * @param group_base_info_lastest_seq group_base_info_lastest_seq: 群最新消息的Seq。群组内每一条消息都有一条唯一的消息Seq，且该Seq是按照发消息顺序而连续的。从1开始，群内每增加一条消息，LastestSeq就会增加1
 * @param group_base_info_readed_seq group_base_info_readed_seq: 用户所在群已读的消息Seq
 * @param group_base_info_msg_flag group_base_info_msg_flag: 消息接收选项
 * @param group_base_info_is_shutup_all group_base_info_is_shutup_all: 当前群组是否设置了全员禁言
 * @param group_base_info_self_info group_base_info_self_info: 用户所在群的个人信息,请参考[GroupSelfInfo]
 */
interface GroupBaseInfo {
    group_base_info_group_id: string;
    group_base_info_group_name: string;
    group_base_info_group_type: TIMGroupType;
    group_base_info_face_url: string;
    group_base_info_info_seq: number;
    group_base_info_latest_seq: number;
    group_base_info_readed_seq: number;
    group_base_info_msg_flag: number;
    group_base_info_is_shutup_all: boolean;
    group_base_info_self_info: GroupSelfInfo;
}
/**
 * @brief 群组内本人的信息
 * @param group_self_info_join_time group_self_info_join_time: 加入群组时间
 * @param group_self_info_role group_self_info_role: 用户在群组中的角色
 * @param group_self_info_unread_num group_self_info_unread_num: 消息未读计数
 * @param group_self_info_msg_flag group_self_info_msg_flag: 消息接收选项
 */
interface GroupSelfInfo {
    group_self_info_join_time: number;
    group_self_info_role: number;
    group_self_info_unread_num: number;
    group_self_info_msg_flag: TIMReceiveMessageOpt;
}
/**
 * @brief 群组详细信息
 * @param group_detial_info_group_id group_detial_info_group_id: 群组ID
 * @param group_detial_info_group_type group_detial_info_group_type: 群组类型
 * @param group_detial_info_group_name group_detial_info_group_name: 群组名称
 * @param group_detial_info_notification group_detial_info_notification: 群组公告
 * @param group_detial_info_introduction group_detial_info_introduction: 群组简介
 * @param group_detial_info_face_url group_detial_info_face_url: 群组头像URL
 * @param group_detial_info_create_time group_detial_info_create_time: 群组创建时间
 * @param group_detial_info_info_seq group_detial_info_info_seq: 群资料的Seq，群资料的每次变更都会增加这个字段的值
 * @param group_detial_info_last_info_time group_detial_info_last_info_time: 群组信息最后修改时间
 * @param group_detial_info_next_msg_seq group_detial_info_next_msg_seq: 群最新消息的Seq
 * @param group_detial_info_last_msg_time group_detial_info_last_msg_time: 最新群组消息时间
 * @param group_detial_info_member_num group_detial_info_member_num: 群组当前成员数量
 * @param group_detial_info_max_member_num group_detial_info_max_member_num: 群组最大成员数量
 * @param group_detial_info_add_option group_detial_info_add_option: 群组加群选项
 * @param group_detial_info_online_member_num group_detial_info_online_member_num: 群组在线成员数量
 * @param group_detial_info_visible group_detial_info_visible: 群组成员是否对外可见
 * @param group_detial_info_searchable group_detial_info_searchable: 群组是否能被搜索
 * @param group_detial_info_is_shutup_all group_detial_info_is_shutup_all: 群组是否被设置了全员禁言
 * @param group_detial_info_owener_identifier group_detial_info_owener_identifier: 群组所有者ID
 * @param group_detial_info_custom_info group_detial_info_custom_info: 请参考[GroupInfoCustomString]
 * @param group_detial_info_approve_option [TIMGroupAddOption](), 只读, 群组邀请进群审批选项
 */
interface GroupDetailInfo {
    group_detail_info_group_id: string;
    group_detail_info_group_type: TIMGroupType;
    group_detail_info_group_name: string;
    group_detail_info_notification: string;
    group_detail_info_introduction: string;
    group_detail_info_face_url: string;
    group_detail_info_create_time: number;
    group_detail_info_info_seq: number;
    group_detail_info_last_info_time: number;
    group_detail_info_next_msg_seq: number;
    group_detail_info_last_msg_time: number;
    group_detail_info_member_num: number;
    group_detail_info_max_member_num: number;
    group_detail_info_add_option: TIMGroupAddOption;
    group_detail_info_online_member_num: number;
    group_detail_info_visible: number;
    group_detail_info_searchable: number;
    group_detail_info_is_shutup_all: boolean;
    group_detail_info_owener_identifier: string;
    group_detail_info_is_support_topic: boolean;
    group_detail_info_custom_info: Array<GroupInfoCustomString>;
    group_detail_info_approve_option: number;
}

interface GroupInfo extends GroupBaseInfo, GroupDetailInfo {}

/**
 * @brief 获取群组信息列表接口的返回
 * @param get_groups_info_result_code get_groups_info_result_code: 错误码
 * @param get_groups_info_result_desc get_groups_info_result_desc: 获取群组详细失败的描述信息
 * @param get_groups_info_result_info get_groups_info_result_info: 群组详细信息
 */
interface GroupInfoResult {
    get_groups_info_result_code: number;
    get_groups_info_result_desc: string;
    get_groups_info_result_info: GroupInfo;
}

/**
 * @brief 群组成员信息自定义字段
 * @param group_info_custom_string_info_key group_info_custom_string_info_key: 自定义字段的key
 * @param group_info_custom_string_info_value group_info_custom_string_info_value: 自定义字段的value
 */
interface GroupInfoCustomString {
    group_info_custom_string_info_key: string;
    group_info_custom_string_info_value: string;
}
/**
 * @brief 群组成员信息自定义字段
 * @param group_member_info_custom_string_info_key group_member_info_custom_string_info_key：自定义字段的key
 * @param group_member_info_custom_string_info_key group_member_info_custom_string_info_key： 自定义字段的value
 */
interface GroupMemberInfoCustemString {
    group_member_info_custom_string_info_key: string;
    group_member_info_custom_string_info_value: string;
}
/**
 * @brief 群组成员信息
 * @param group_member_info_identifier group_member_info_identifier 群组成员ID
 * @param group_member_info_join_time group_member_info_join_time 群组成员加入时间
 * @param group_member_info_member_role group_member_info_member_role 群组成员角色
 * @param group_member_info_msg_flag group_member_info_msg_flag 成员接收消息的选项
 * @param group_member_info_msg_seq group_member_info_msg_seq 消息序列号
 * @param group_member_info_shutup_time group_member_info_shutup_time 成员禁言时间
 * @param group_member_info_name_card group_member_info_name_card 成员群名片
 * @param group_member_info_custom_info group_member_info_custom_info 请参考[自定义字段](https://cloud.tencent.com/document/product/269/1502#.E8.87.AA.E5.AE.9A.E4.B9.89.E5.AD.97.E6.AE.B5)
 * @param group_member_info_group_id 只读, 群组 ID
 * @param group_member_info_nick_name 只读, 好友昵称
 * @param group_member_info_friend_remark 只读, 好友备注
 * @param group_member_info_face_url 只读, 好友头像
 * @param group_member_info_is_online 只读，群成员是否在线
 */
interface GroupMemberInfo {
    group_member_info_identifier: string;
    group_member_info_join_time?: number;
    group_member_info_member_role?: TIMGroupMemberRole;
    group_member_info_msg_flag?: number;
    group_member_info_msg_seq?: number;
    group_member_info_shutup_time?: number;
    group_member_info_name_card?: string;
    group_member_info_custom_info?: Array<GroupMemberInfoCustemString>;
    group_member_info_group_id?: string;
    group_member_info_nick_name?: string;
    group_member_info_friend_remark?: string;
    group_member_info_face_url?: string;
    group_member_info_is_online?: boolean;
}
/**
 * @param create_group_param_group_name create_group_param_group_name： 群组名称（必填）
 * @param create_group_param_group_id create_group_param_group_id： 群组ID,不填时创建成功回调会返回一个后台分配的群ID
 * @param create_group_param_group_type create_group_param_group_type 群组类型,默认为Public
 * @param create_group_param_group_member_array create_group_param_group_member_array 群组初始成员数组,成员个数不能超过20
 * @param create_group_param_notification create_group_param_notification 群组公告
 * @param create_group_param_introduction create_group_param_introduction 群组简介
 * @param create_group_param_face_url create_group_param_face_url 群组头像URL
 * @param create_group_param_add_option create_group_param_add_option 加群选项，默认为Any
 * @param create_group_param_approve_option [TIMGroupAddOption](), 只写（选填），邀请进群审批选项，默认为Any
 * @param create_group_param_max_member_num create_group_param_max_member_num 群组最大成员数
 * @param create_group_param_custom_info create_group_param_custom_info 请参考[自定义字段](https://cloud.tencent.com/document/product/269/1502#.E8.87.AA.E5.AE.9A.E4.B9.89.E5.AD.97.E6.AE.B5)
 * @param create_group_param_is_support_topic 社群是否支持创建话题，只在群类型为 Community 时有效
 */
interface GroupParams {
    create_group_param_group_name: string;
    create_group_param_group_id?: string;
    create_group_param_group_type?: number;
    create_group_param_is_support_topic?: boolean;
    create_group_param_group_member_array?: Array<GroupMemberInfo>;
    create_group_param_notification?: string;
    create_group_param_introduction?: string;
    create_group_param_face_url?: string;
    create_group_param_add_option?: number;
    create_group_param_max_member_num?: number;
    create_group_param_approve_option?: number;
    create_group_param_custom_info?: Array<GroupInfoCustomString>;
}

/**
 * @param {groupId} groupId groupId 要删除的群组ID
 * @param {string} data data  用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 */
interface DeleteGroupParams {
    groupId: string;
    data?: string;
}
/**
 * @param GroupParams params:创建组接口参数
 * @param data data: 用户自定义数据
 */
interface CreateGroupParams {
    params: GroupParams;
    data?: string;
}

/**
 * @param groupId groupId：群组ID
 * @param helloMsg helloMsg: 打招呼消息
 * @param data data：用户自定义消息
 */
interface JoinGroupParams {
    groupId: string;
    helloMsg?: string;
    data?: string;
}
/**
 * @param {groupId} groupId groupId 要删除的群组ID
 * @param {string} data data  用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 */
interface QuitGroupParams extends DeleteGroupParams {}

interface GetMemberInfoResult {
    group_get_member_info_list_result_next_seq: number;
    group_get_member_info_list_result_info_array: Array<GroupMemberInfo>;
}

/** 
    @param data  data：用户自定义数据
    @param params params：邀请加入群组的Json

    @note params 的interface如下
 * ```
 *  params {
 *      group_invite_member_param_group_id: string; // 群组ID
 *      group_invite_member_param_identifier_array: Array<string>; //被邀请加入群组用户ID数组
 *       group_invite_member_param_user_data?: string; //用于自定义数据
 *      };
        ```
*/
interface InviteMemberParams {
    params: {
        group_invite_member_param_group_id: string;
        group_invite_member_param_identifier_array: Array<string>;
        group_invite_member_param_user_data?: string;
    };
    data?: string;
}

/**
 * @brief 群计数器
 * @param group_counter_key 群计数器的 key 值
 * @param group_counter_value 群计数器的 value 值
 */
interface GroupCounter {
    group_counter_key: string;
    group_counter_value: number;
}

interface GroupCounterParams {
    params: {
        group_id: string;
        json_group_counter_array: GroupCounter[];
    };
    user_data?: string;
}

interface GetGroupCounterParams {
    group_id: string;
    json_group_counter_key_array: string[];
    user_data?: string;
}

/**
 * @brief 增减群计数器入参
 * @param group_id 群 ID
 * @param group_counter_key 群计数器的 key
 * @param group_counter_value 群计数器的递增递减变化量 value
 */
interface IncreaseGroupCounterParam {
    group_id: string;
    group_counter_key: string;
    group_counter_value: number;
    user_data?: string;
}

/** 
    @param data  data：用户自定义数据
    @param params 删除群组成员的Json

    @note params 的interface如下
 * ```
 *  params {
 *      group_delete_member_param_group_id: string; // 群组ID
        group_delete_member_param_identifier_array: Array<string>; // 被删除群组成员数组
        group_delete_member_param_user_data?: string; // 用于自定义数据
        group_delete_member_param_duration?:number; //自被踢出群组开始算起，禁止被踢用户重新申请加群的时间间隔，单位：秒。7.2 版本开始支持
 *      };
        ```
*/
interface DeleteMemberParams {
    params: {
        group_delete_member_param_group_id: string;
        group_delete_member_param_identifier_array: Array<string>;
        group_delete_member_param_user_data?: string;
        group_delete_member_param_duration?: number;
    };
    data?: string;
}

/**
 * @param group_delete_member_result_identifier group_delete_member_result_identifier: 删除的成员ID
 * @param group_delete_member_result_result group_delete_member_result_result:删除结果，请参考[HandleGroupMemberResult]
 */
interface DeleteMemberResult {
    group_delete_member_result_identifier: string;
    group_delete_member_result_result: HandleGroupMemberResult;
}

interface GetGroupListParams {
    groupIds: Array<string>;
    data?: string;
}
/**
 * @note 下方都是params中的字段，参数格式请参考最下方
 * @param group_modify_info_param_group_id group_modify_info_param_group_id: 群组ID
 * @param group_modify_info_param_modify_flag group_modify_info_param_modify_flag: 修改标识,可设置多个值按位
 * @param group_modify_info_param_group_name group_modify_info_param_group_name: 修改群组名称
 * @param group_modify_info_param_notification group_modify_info_param_notification: 修改群公告
 * @param group_modify_info_param_introduction group_modify_info_param_introduction: 修改群简介
 * @param group_modify_info_param_face_url group_modify_info_param_face_url: 修改群头像URL
 * @param group_modify_info_param_add_option group_modify_info_param_add_option 修改群组添加选项
 * @param group_modify_info_param_max_member_num group_modify_info_param_max_member_num 修改群最大成员数
 * @param group_modify_info_param_visible group_modify_info_param_visible 修改群是否可见
 * @param group_modify_info_param_searchable group_modify_info_param_searchable 修改群是否被搜索
 * @param group_modify_info_param_is_shutup_all group_modify_info_param_is_shutup_all 修改群组名称
 * @param group_modify_info_param_owner group_modify_info_param_owner 修改群主所有者
 * @param group_modify_info_param_custom_info group_modify_info_param_custom_info:请参考[自定义字段](https://cloud.tencent.com/document/product/269/1502#.E8.87.AA.E5.AE.9A.E4.B9.89.E5.AD.97.E6.AE.B5)
 * @param group_modify_info_param_approve_option 邀请进群审批选项,    当 modify_flag 包含 kTIMGroupModifyInfoFlag_ApproveOption 时必填,其他情况不用填
 *
 * @param data 用户自定以字段
 */
interface ModifyGroupParams {
    params: {
        group_modify_info_param_group_id: string;
        group_modify_info_param_modify_flag: number;
        group_modify_info_param_group_name?: string;
        group_modify_info_param_notification?: string;
        group_modify_info_param_introduction?: string;
        group_modify_info_param_face_url?: string;
        group_modify_info_param_add_option?: number;
        group_modify_info_param_max_member_num?: number;
        group_modify_info_param_visible?: number;
        group_modify_info_param_searchable?: number;
        group_modify_info_param_is_shutup_all?: boolean;
        group_modify_info_param_owner?: string;
        group_modify_info_param_custom_info?: Array<GroupInfoCustomString>;
        group_modify_info_param_approve_option?: number;
    };
    data?: string;
}

/**
 * @param group_get_members_info_list_param_group_id group_get_members_info_list_param_group_id:群组ID
 * @param group_get_members_info_list_param_identifier_array group_get_members_info_list_param_identifier_array: 群成员ID列表
 * @param group_get_members_info_list_param_next_seq group_get_members_info_list_param_next_seq:分页拉取标志,第一次拉取填0,回调成功如果不为零,需要分页,调用接口传入再次拉取,直至为0
 * @param data data: 用户自定义参数
 *
 * `group_get_members_info_list_param_option参数如下
 * ```
 * @param group_get_members_info_list_param_option
 * {
 *     group_member_get_info_option_info_flag?: number; // 根据想要获取的信息过滤，默认值为0xffffffff(获取全部信息)
 *     group_member_get_info_option_role_flag?: number; //根据成员角色过滤，默认值为kTIMGroupMemberRoleFlag_All，获取所有角色
 *     group_member_get_info_option_custom_array?: Array<string>; // 请参考[自定义字段](https://cloud.tencent.com/document/product/269/1502#.E8.87.AA.E5.AE.9A.E4.B9.89.E5.AD.97.E6.AE.B5)
 *  };
 * ```
 */
interface GetGroupMemberInfoParams {
    params: {
        group_get_members_info_list_param_group_id: string;
        group_get_members_info_list_param_identifier_array?: Array<string>;
        group_get_members_info_list_param_option?: {
            group_member_get_info_option_info_flag?: number;
            group_member_get_info_option_role_flag?: number;
            group_member_get_info_option_custom_array?: Array<string>;
        };
        group_get_members_info_list_param_next_seq?: number;
    };
    data?: string;
}

/**
 * @note 注意是以下字段是params，具体参数格式请参考最下方
 * @param group_modify_member_info_group_id group_modify_member_info_group_id:群组ID
 * @param group_modify_member_info_identifier group_modify_member_info_identifier: 被设置信息的成员ID
 * @param group_modify_member_info_modify_flag group_modify_member_info_modify_flag:修改类型,可设置多个值按位或
 * @param group_modify_member_info_msg_flag group_modify_member_info_msg_flag:修改消息接收选项
 * @param group_modify_member_info_member_role group_modify_member_info_member_role:修改成员角色, 当 modify_flag 包含 kTIMGroupMemberModifyFlag_MemberRole 时必填,其他情况不用填
 * @param group_modify_member_info_shutup_time group_modify_member_info_shutup_time:修改禁言时间
 * @param group_modify_member_info_name_card group_modify_member_info_name_card:修改群名片
 * @param group_modify_member_info_custom_info group_modify_member_info_custom_info:请参考[自定义字段](https://cloud.tencent.com/document/product/269/1502#.E8.87.AA.E5.AE.9A.E4.B9.89.E5.AD.97.E6.AE.B5)
 *
 * @param data data：用户自定参数（与params同级别）
 */
interface ModifyMemberInfoParams {
    params: {
        group_modify_member_info_group_id: string;
        group_modify_member_info_identifier: string;
        group_modify_member_info_modify_flag?: number;
        group_modify_member_info_msg_flag?: number;
        group_modify_member_info_member_role?: number;
        group_modify_member_info_shutup_time?: number;
        group_modify_member_info_name_card?: string;
        group_modify_member_info_custom_info?: Array<GroupMemberInfoCustemString>;
    };
    data?: string;
}

/**
 * @param data data(可选)：用户自定义数据
 * 
 * @param params params参数如下：
 * ```
 *  params {
        group_pendency_option_start_time: number; //设置拉取时间戳,第一次请求填0,后边根据server返回的[GroupPendencyResult]()键kTIMGroupPendencyResultNextStartTime指定的时间戳进行填写
        group_pendency_option_max_limited: number; // 拉取的建议数量,server可根据需要返回或多或少,不能作为完成与否的标志
    }
    ```
 */
interface GetPendencyListParams {
    params: {
        group_pendency_option_start_time: number;
        group_pendency_option_max_limited: number;
    };
    data?: string;
}

/**
 * @brief 获取群未决信息列表的返回
 * @param group_pendency_result_next_start_time group_pendency_result_next_start_time:下一次拉取的起始时戳,server返回0表示没有更多的数据,否则在下次获取数据时以这个时间戳作为开始时间戳
 * @param group_pendency_result_read_time_seq group_pendency_result_read_time_seq:已读上报的时间戳
 * @param group_pendency_result_unread_num group_pendency_result_unread_num:未决请求的未读数
 * @param group_pendency_result_pendency_array group_pendency_result_pendency_array:群未决信息列表
 */
interface GroupPendencyResult {
    group_pendency_result_next_start_time: number;
    group_pendency_result_read_time_seq: number;
    group_pendency_result_unread_num: number;
    group_pendency_result_pendency_array: Array<GroupPendency>;
}

/**
 * @param {number} timeStamp timeStamp:已读时间戳(单位秒)。与GroupPendency键 kTIMGroupPendencyAddTime 指定的时间比较
 * @param {string} data data: 用户自定义消息
 */
interface ReportParams {
    timeStamp: number;
    data?: string;
}

interface GroupPendency {
    group_pendency_group_id: string;
    group_pendency_form_identifier: string;
    group_pendency_add_time: number;
    group_pendency_to_identifier: string;
    group_pendency_pendency_type: number;
    group_pendency_handled: number;
    group_pendency_handle_result: number;
    group_pendency_apply_invite_msg: string;
    group_pendency_form_user_defined_data: string;
    group_pendency_approval_msg: string;
    group_pendency_to_user_defined_data: string;
    group_pendency_authentication: string;
    group_pendency_self_identifier: string;
    group_pendency_key: string;
}

/**
 * @brief 群未决消息
 * @param data data(可选)
 * 
 * params参数如下
 * ```
 * @param params: {
        group_handle_pendency_param_is_accept?: boolean; // 选填, true表示接受，false表示拒绝。默认为false
        group_handle_pendency_param_handle_msg?: string; // 选填，同意或拒绝信息,默认为空字符串
        group_handle_pendency_param_pendency: {
            group_pendency_group_id: string; // 群组ID
            group_pendency_form_identifier: string; // 请求者的ID,例如：请求加群:请求者,邀请加群:邀请人
            group_pendency_add_time: number; // 未决信息添加时间
            group_pendency_to_identifier: string; // 判决者的ID,请求加群:"",邀请加群:被邀请人
            group_pendency_pendency_type: number; // 未决请求类型
            group_pendency_handled: number; // 群未决处理状态
            group_pendency_handle_result: number; // 群未决处理操作类型
            group_pendency_apply_invite_msg: string; // 申请或邀请附加信息
            group_pendency_form_user_defined_data: string; //  申请或邀请者自定义字段
            group_pendency_approval_msg: string; // 审批信息：同意或拒绝信息
            group_pendency_to_user_defined_data: string; // 审批者自定义字段
            group_pendency_authentication: string; // 签名信息，客户不用关心
            group_pendency_self_identifier: string; // 自己的ID
            group_pendency_key: string; // 签名信息，客户不用关心
        };
    };
        ```
 */
interface HandlePendencyParams {
    params: {
        group_handle_pendency_param_is_accept?: boolean;
        group_handle_pendency_param_handle_msg?: string;
        group_handle_pendency_param_pendency: GroupPendency;
    };
    data?: string;
}

/**
 * @param {string} groupId groupId:要查询的groupId
 * @param {string} data data: 用户自定义数据
 */
interface GetOnlineMemberCountParams {
    groupId: string;
    data?: string;
}

interface GetOnlineMemberCountResult {
    group_get_online_member_count_result: number;
}

/**
 * @brief  群搜索参数
 * @param  group_search_params_keyword_list group_search_params_keyword_list： 搜索关键字列表，最多支持5个
 * @param group_search_params_field_list group_search_params_field_list：搜索域列表表
 */
interface GroupSearchParams {
    group_search_params_keyword_list: Array<string>;
    group_search_params_field_list: Array<number>;
}
/**
 * @param  group_search_member_params_groupid_list group_search_member_params_groupid_list 列表，若为不填则搜索全部群中的群成员
 * @param group_search_member_params_keyword_list group_search_member_params_keyword_list：搜索关键字列表，最多支持5个
 * @param group_search_member_params_field_list group_search_member_params_field_list： 搜索域列表
 */
interface MemberSearchParams {
    group_search_member_params_groupid_list: Array<string>;
    group_search_member_params_keyword_list: Array<string>;
    group_search_member_params_field_list: Array<number>;
}

/**
 * @brief  群搜索参数
 * @param  group_attribute_key group_attribute_key 群属性 map 的 key
 * @param group_attribute_value group_attribute_value 群属性 map 的 value
 */
interface GroupAttributes {
    group_attribute_key: string;
    group_attribute_value: string;
}

interface SearchGroupParams {
    searchParams: GroupSearchParams;
    data?: string;
}

interface SearchMemberParams {
    searchParams: MemberSearchParams;
    data?: string;
}

interface SearchMemberResult {
    group_search_member_result_groupid: Array<String>;
    group_search_member_result_member_info_list: Array<GroupMemberInfo>;
}

/**
 * @param {string} groupId groupId:群组ID
 * @param attributes attributes： 群属性列表的参数
 * @param data data:用户自定义字段
 */
interface InitGroupAttributeParams {
    groupId: string;
    attributes: Array<GroupAttributes>;
    data?: string;
}

interface DeleteAttributeParams {
    groupId: string;
    attributesKey: Array<string>;
    data?: string;
}
/** 
*@param conv_group_at_info_seq conv_group_at_info_seq:  @ 消息序列号，即带有 “@我” 或者 “@所有人” 标记的消息的序列号
 @param conv_group_at_info_at_type conv_group_at_info_at_type:@ 提醒类型,请参考[TIMGroupAtType]
*/
interface GroupAtInfo {
    conv_group_at_info_seq: number;
    conv_group_at_info_at_type: TIMGroupAtType;
}

interface MessageReceipt {
    msg_receipt_conv_id: string;
    msg_receipt_conv_type: TIMConvType;
    msg_receipt_msg_id: string;
    msg_receipt_time_stamp: number;
    msg_receipt_is_peer_read: boolean;
    msg_receipt_read_count: number;
    msg_receipt_unread_count: number;
}

/** 
 @param callback callback：回调
 @param data data：用户自定义数据
*/
interface GroupTipsCallbackParams {
    callback: GroupTipCallBackFun;
    data?: string;
}

/** 
 @param json_group_tip_array json_group_tip_array：群提示列表
 @param user_data user_data： ImSDK负责透传的用户自定义数据，未做任何处理
*/
interface GroupTipCallBackFun {
    (json_group_tip_array: string, user_data: string): void;
}

/** 
 @param callback callback：回调
 @param data data：用户自定义数据
*/
interface GroupAttributeCallbackParams {
    callback: GroupAttributeCallbackFun;
    data?: string;
}

/** 
*@param group_id group_id:  群组ID
 @param json_group_attibute_array json_group_attibute_array:变更的群属性列表
 @param user_data user_data:用于自定义数据
*/
// TODO json_group_attibute_array 类型也有问题
interface GroupAttributeCallbackFun {
    (
        group_id: string,
        json_group_attibute_array: string,
        user_data: string
    ): void;
}

interface TIMGroupCounterChangedCallback {
    (
        group_id: string,
        group_counter_key: string,
        group_counter_new_value: number,
        user_data: string
    ): void;
}

interface GroupCounterChangedParam {
    callback: TIMGroupCounterChangedCallback;
    user_data?: string;
}

interface TIMGroupTopicCreatedCallback {
    (group_id: string, topic_id: string, user_data: string): void;
}

interface TopicCreatedParam {
    callback: TIMGroupTopicCreatedCallback;
    user_data?: string;
}

interface TIMGroupTopicDeletedCallback {
    (group_id: string, topic_id_array: string, user_data: string): void;
}

interface TopicDeletedParam {
    callback: TIMGroupTopicDeletedCallback;
    user_data?: string;
}

interface TIMGroupTopicChangedCallback {
    (group_id: string, topic_info: string, user_data: string): void;
}

interface TopicChangedParam {
    callback: TIMGroupTopicChangedCallback;
    user_data?: string;
}

interface MsgGroupReadReceiptCallback {
    (json_msg_readed_receipt_array: string, user_data: string): void;
}
interface MsgSendGroupMessageReceiptsParam {
    json_msg_array: string;
    user_data: string;
}
interface MsgGetGroupMessageReceiptsParam {
    json_msg_array: string;
    user_data: string;
}
interface MsgGetGroupMessageReadMembersParam {
    json_msg: string;
    filter: number;
    next_seq: string;
    count: number;
    user_data: string;
}
interface MsgGroupMessageReceiptCallbackParam {
    callback: MsgGroupReadReceiptCallback;
    user_data?: string;
}

interface CreateGroupResult {
    create_group_result_groupid: string;
}

interface MsgGetGroupMessageReadMemberListResult {
    next_seq: number;
    is_finished: boolean;
    json_param: Array<GroupMemberInfo>;
}

interface GetCommunityListParam {
    user_data?: string;
}

/**
 * @param group_topic_info_topic_id 读写, 话题 ID，话题的ID为固定格式（群名+@TOPIC#_话题ID，如：@TGS#_123@TOPIC#_topicname）
 * @param group_topic_info_topic_name 读写, 话题名称
 * @param group_topic_info_introduction 读写, 话题介绍
 * @param group_topic_info_notification 读写, 话题公告
 * @param group_topic_info_topic_face_url 读写, 话题头像
 * @param group_topic_info_is_all_muted 读写, 话题全员禁言
 * @param group_topic_info_self_mute_time 读写, 当前用户在话题中的禁言时间
 * @param group_topic_info_custom_string 读写, 话题自定义字段
 * @param group_topic_info_recv_opt 只读，话题消息接收选项，修改话题消息接收选项请调用 setGroupReceiveMessageOpt 接口
 * @param group_topic_info_draft_text 读写, 话题草稿
 * @param group_topic_info_unread_count 只读, 话题消息未读数量
 * @param group_topic_info_last_message 只读, 话题 lastMessage
 * @param group_topic_info_group_at_info_array 只读, 话题 at 信息列表
 * @param group_modify_info_param_modify_flag 只写(必填), 修改标识,可设置多个值按位或
 */
interface GroupTopicInfo {
    group_topic_info_topic_id: string;
    group_topic_info_topic_name: string;
    group_topic_info_introduction?: string;
    group_topic_info_notification?: string;
    group_topic_info_topic_face_url?: string;
    group_topic_info_is_all_muted?: boolean;
    group_topic_info_self_mute_time?: number;
    group_topic_info_custom_string?: string;
    group_topic_info_recv_opt?: TIMReceiveMessageOpt;
    group_topic_info_draft_text?: string;
    group_topic_info_unread_count?: number;
    group_topic_info_last_message?: Json_value_msg;
    group_topic_info_group_at_info_array?: GroupAtInfo[];
    group_modify_info_param_modify_flag?: TIMGroupModifyInfoFlag;
}

/**
 * @param group_id 社群 ID，必须以 @TGS#_ 开头。
 * @param json_topic_info 话题信息，具体参考GroupTopicInfo
 */
interface CreateTopicParam {
    group_id: string;
    json_topic_info: GroupTopicInfo;
    user_data?: string;
}

/**
 * @param json_topic_info 话题信息，具体参考GroupTopicInfo
 */
interface SetTopicInfoParam {
    json_topic_info: GroupTopicInfo;
    user_data?: string;
}

/**
 * @param group_topic_operation_result_error_code 只读, 结果 0：成功；非0：失败
 * @param group_topic_operation_result_error_message 只读, 如果删除失败，会返回错误信息
 * @param group_topic_operation_result_topic_id 只读, 如果删除成功，会返回对应的 topicID
 */
interface TopicOperationResult {
    group_topic_operation_result_error_code: number;
    group_topic_operation_result_error_message: string;
    group_topic_operation_result_topic_id: string;
}

/**
 * @param group_id 群 ID
 * @param json_topic_id_array 话题 ID 列表
 */
interface DeleteTopicParam {
    group_id: string;
    json_topic_id_array: string[];
    user_data?: string;
}

/**
 * @param group_topic_info_result_error_code 只读, 结果 0：成功；非0：失败
 * @param group_topic_info_result_error_message 只读, 如果删除失败，会返回错误信息
 * @param group_topic_info_result_topic_info 只读, 如果获取成功，会返回对应的 info
 */
interface GroupTopicInfoResult {
    group_topic_info_result_error_code: number;
    group_topic_info_result_error_message: string;
    group_topic_info_result_topic_info: GroupTopicInfo;
}

/**
 * @brief 群组系统消息-群组信息修改
 * @param group_tips_group_change_info_flag 只读, 群消息修改群信息标志 [TIMGroupTipGroupChangeFlag]
 * @param group_tips_group_change_info_value  只读, 修改的后值,不同的 info_flag 字段,具有不同的含义
 * @param group_tips_group_change_info_key 只读, 自定义信息对应的 key 值，只有 info_flag 为 kTIMGroupTipChangeFlag_Custom 时有效
 * @param group_tips_group_change_info_bool_value 只读, 根据变更类型表示不同的值，当前只有 info_flag 为 kTIMGroupTipChangeFlag_ShutupAll 时有效
 * @param group_tips_group_change_info_int_value 只读，根据变更类型表示不同的值
 * note 仅针对以下类型有效：
//  - 从 6.5 版本开始，当 info_flag 为 kTIMGroupTipChangeFlag_MessageReceiveOpt 时，该字段标识了群消息接收选项发生了变化，其取值详见 [TIMReceiveMessageOpt](TIMCloudComm.h)
//  - 从 6.5 版本开始，当 info_flag 为 kTIMGroupTipChangeFlag_GroupAddOpt 时，该字段标识了申请加群审批选项发生了变化，其取值详见 [TIMGroupAddOption]()
//  - 从 7.1 版本开始，当 info_flag 为 kTIMGroupTipChangeFlag_GroupApproveOpt 时，该字段标识了邀请进群审批选项发生了变化，取值类型详见 [TIMGroupAddOption]()
 */
interface GroupTipGroupChangeInfo {
    group_tips_group_change_info_flag: TIMGroupTipGroupChangeFlag;
    group_tips_group_change_info_value: string;
    group_tips_group_change_info_key: string;
    group_tips_group_change_info_bool_value: boolean;
    group_tips_group_change_info_int_value: number;
}

/**
 * @param group_tips_member_mark_change_info_enableMark 只读, 群成员被标记或取消标记
 * @param group_tips_member_mark_change_info_markType 只读, 标记类型
 * @param group_tips_member_mark_change_info_userIDList 只读, 群成员 userID 列表
 */

interface GroupTipMemberChangeInfo {
    group_tips_member_mark_change_info_enableMark: boolean;
    group_tips_member_mark_change_info_markType: number;
    group_tips_member_mark_change_info_userIDList: string;
}
export {
    GroupBaseInfo,
    GroupDetailInfo,
    GroupInfoResult,
    GroupInfo,
    MsgGroupMessageReceiptCallbackParam,
    MsgSendGroupMessageReceiptsParam,
    MsgGetGroupMessageReceiptsParam,
    MsgGetGroupMessageReadMembersParam,
    GroupMemberInfo,
    GroupParams,
    CreateGroupParams,
    DeleteGroupParams,
    JoinGroupParams,
    QuitGroupParams,
    InviteMemberParams,
    DeleteMemberParams,
    DeleteMemberResult,
    GetMemberInfoResult,
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
    GroupTipCallBackFun,
    GroupAttributeCallbackParams,
    GroupAttributeCallbackFun,
    GroupSearchParams,
    MemberSearchParams,
    GroupAttributes,
    GroupInfoCustomString,
    GroupMemberInfoCustemString,
    GroupAtInfo,
    GroupPendencyResult,
    GetOnlineMemberCountResult,
    SearchMemberResult,
    MessageReceipt,
    CreateGroupResult,
    MsgGetGroupMessageReadMemberListResult,
    GroupCounterParams,
    GroupCounter,
    IncreaseGroupCounterParam,
    GetGroupCounterParams,
    GetCommunityListParam,
    GroupTopicInfo,
    CreateTopicParam,
    TopicOperationResult,
    DeleteTopicParam,
    SetTopicInfoParam,
    GroupTopicInfoResult,
    GroupCounterChangedParam,
    TIMGroupCounterChangedCallback,
    TopicCreatedParam,
    TIMGroupTopicCreatedCallback,
    TopicDeletedParam,
    TIMGroupTopicDeletedCallback,
    TopicChangedParam,
    TIMGroupTopicChangedCallback,
    GroupTipGroupChangeInfo,
    GroupTipMemberChangeInfo,
};

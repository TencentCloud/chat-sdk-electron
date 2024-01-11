import {
    TIMConversationMarkType,
    TIMConvType,
    TIMElemType,
    TIMReceiveMessageOpt,
} from "../enum";
import { Json_value_msg } from "./advanceMessageInterface";
import { GroupAtInfo } from "./groupInterface";
/**
 * * @brief 会话信息
 * @param conv_id    conv_id 会话的ID
 * @param conv_type  conv_type 会话类型，请参考[TIMConvType](../enums/enum.timconvtype.html)
 * @param conv_owner  conv_owner 会话所有者，已废弃
 * @param conv_unread_num   conv_unread_num 会话未读计数
 * @param conv_active_time    conv_active_time 会话的激活时间
 * @param conv_is_has_lastmsg  conv_is_has_lastmsg 会话是否有最后一条消息
 * @param conv_last_msg  conv_last_msg 会话最后一条消息,请参考[Json_value_msg]
 * @param conv_is_has_draft   conv_is_has_draft 会话是否有草稿
 * @param conv_draft    conv_draft 会话草稿,请参考[draftParams]
 * @param conv_recv_opt  conv_recv_opt 消息接收选项,请参考[TIMReceiveMessageOpt]
 * @param conv_group_at_info_array  conv_group_at_info_array  群会话 @ 信息列表，用于展示 “有人@我” 或 “@所有人” 这两种提醒状态,请参考[GroupAtInfo]
 * @param conv_is_pinned   conv_is_pinned 是否置顶
 * @param conv_show_name    conv_show_name 获取会话展示名称，其展示优先级如下：1、群组，群名称 -> 群 ID;C2C; 2、对方好友备注 -> 对方昵称 -> 对方的 userID
 * @param conv_mark_array  conv_mark_array 会话标记列表,请参考[TIMConversationMarkType]
 * @param conv_custom_data  conv_custom_data  会话自定义数据（从 6.5 版本开始支持）
 * @param conv_conversation_group_array   conv_conversation_group_array 会话所属分组列表（从 6.5 版本开始支持）
 * @param conv_c2c_read_timestamp C2C 会话已读消息时间戳（从 7.1 版本开始支持）
 * @param conv_group_read_sequence 只读, 群消息已读 Sequence（从 7.1 版本开始支持）
 */
interface convInfo {
    conv_id: string;
    conv_type: TIMConvType;
    conv_owner: string;
    conv_unread_num: number;
    conv_active_time: number;
    conv_is_has_lastmsg: boolean;
    conv_last_msg: Json_value_msg;
    conv_is_has_draft: boolean;
    conv_draft: draftParams;
    conv_recv_opt: TIMReceiveMessageOpt;
    conv_group_at_info_array: Array<GroupAtInfo>;
    conv_is_pinned: boolean;
    conv_show_name: string;
    conv_mark_array: Array<TIMConversationMarkType>;
    conv_custom_data: string;
    conv_conversation_group_array: Array<string>;
    conv_c2c_read_timestamp: number;
    conv_group_read_sequence: number;
}

/**
 * * @brief 获取会话未读消息数
 * @param conv_get_total_unread_message_count_result_unread_count    conv_get_total_unread_message_count_result_unread_count 会话未读数
 */
interface totalUnreadCountResult {
    conv_get_total_unread_message_count_result_unread_count: number;
}

/**
 * * @brief 创建会话
 * @param conv_id    conv_id 会话的ID
 * @param conv_type  conv_type 会话类型，请参考[TIMConvType](../enums/enum.timconvtype.html)
 * @param user_data  user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 */
interface convCreate {
    convId: string;
    convType: TIMConvType;
    userData?: string;
}
/**
 * @param conv_id    conv_id 会话的ID
 * @param conv_type  conv_type 会话类型，请参考[TIMConvType](../enums/enum.timconvtype.html)
 * @param user_data  user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 */
interface convDelete extends convCreate {}
/**
 * @brief 获取最近联系人的会话列表
 *
 * @param user_data  user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 *
 */
interface getConvList {
    userData?: string;
}
/**
 * @param conv_id   conv_id 会话的ID
 * @param convType  convType请参考[TIMConvType](../enums/enum.timconvtype.html)
 * @param draftParams draftParams 草稿参数
 */
interface convSetDrat {
    convId: string;
    convType: TIMConvType;
    draftParam: draftParams;
}
/**
 * @param message_elem_array message_elem_array: 消息内元素列表
 */
interface draftMessage {
    message_elem_array: Array<messageElem>;
}
/**
 * @param draft_edit_time   draft_edit_time: 草稿最新编辑时间
 * @param draft_msg  draft_msg: 草稿内的消息
 * @param draft_user_define draft_user_define: 用户自定义数据
 */
interface draftParams {
    draft_edit_time: number;
    draft_msg: draftMessage;
    draft_user_define: string;
}
/**
 * @param TIMElemType TIMElemType: 元素类型
 * @param text_elem_content text_elem_content: 文本内容
 */
interface messageElem {
    elem_type: TIMElemType;
    text_elem_content: string;
}
/**
 * @param conv_id   conv_id 会话的ID
 * @param convType  convType参考[TIMConvType](../enums/enum.timconvtype.html)
 */
interface convCancelDraft {
    convId: string;
    convType: TIMConvType;
}
/**
 * @param get_conversation_list_param_conv_id get_conversation_list_param_conv_id: 会话ID
 * @param get_conversation_list_param_conv_type get_conversation_list_param_conv_type: 会话类型[TIMConvType](../enums/enum.timconvtype.html)
 */
interface convItem {
    get_conversation_list_param_conv_id: string;
    get_conversation_list_param_conv_type: TIMConvType;
}
/**
 * @param json_get_conv_list_param   json_get_conv_list_param 会话唯一 ID 列表和会话类型的列表
 * @param user_data  user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 */
interface convGetConvInfo {
    json_get_conv_list_param: Array<convItem>;
    user_data?: string;
}
/**
 * @param conv_id  conv_id 会话 ID
 * @param conv_type  conv_type 会话类型，请参考[TIMConvType](../enums/enum.timconvtype.html)
 * @param is_pinned is_pinned是否置顶会话
 * @param user_data  user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 */
interface convPinConversation {
    convId: string;
    convType: TIMConvType;
    isPinned: boolean;
    user_data?: string;
}
/**
 * @param user_data  user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 */
interface convGetTotalUnreadMessageCount {
    user_data?: string;
}

/**
 * @brief 设置会话事件回调
 * @param callback  callback 会话事件回调，请参考convEventCallback
 * @param user_data  user_data用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 */
interface setConvEventCallback {
    callback: convEventCallback;
    user_data?: string;
}
/**
 * @brief 设置会话未读消息总数变更的回调
 * @param callback  callback：convTotalUnreadMessageCountChangedCallback
 * @param user_data  user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 *
 */
interface convTotalUnreadMessageCountChangedCallbackParam {
    callback: convTotalUnreadMessageCountChangedCallback;
    user_data?: string;
}

interface convUnreadMessageCountChangedByFilterCallbackParam {
    callback: convTotalUnreadMessageCountChangedByFilterCallback;
    user_data?: string;
}

/**
 * @breif 获取会话列表高级接口的 filter
 * @param conversation_list_filter_conv_type 只写, 会话类型
 * @param conversation_list_filter_next_seq 只写, 分页拉取的游标
 * @param conversation_list_filter_count 只写, 分页拉取的个数
 * @param conversation_list_filter_mark_type 只写, 标记类型
 * @param conversation_list_filter_group_name 只写, 会话分组名称，注意：不是群组名称
 */
interface TIMConversationListFilter {
    params: {
        conversation_list_filter_conv_type: TIMConvType;
        conversation_list_filter_next_seq?: number;
        conversation_list_filter_count?: number;
        conversation_list_filter_mark_type?: TIMConversationMarkType;
        conversation_list_filter_conversation_group?: string;
    };
    user_data?: string;
}

/**
 * @brief 清理回话未读消息计数的参数
 * @param conversation_id  会话唯一 ID， C2C 单聊组成方式："c2c_" + userID；群聊组成方式为 "group_" + groupID
 * @param clean_timestamp  清理时间戳，仅对单聊会话生效，指定清理哪一个 timestamp 之前的未读消息计数；当传入为 0 时，对应会话所有的未读消息将被清理，会话的未读数会清 0；
 * @param clean_sequence  清理时 sequence，仅对群聊会话生效，指定清理哪一个 sequence 之前的未读消息计数；当传入为 0 时，对应会话所有的未读消息将被清理，会话的未读数会清 0；
 */
interface CleanUnreadMessageCoutParam {
    conversation_id: string;
    clean_timestamp: number;
    clean_sequence: number;
    user_data?: string;
}

/**
 * @brief 删除会话列表参数
 * @param conversation_id_array 会话 ID 列表。需要在会话ID之前加上“c2c_”或“group_”字样
 * @param clearMessage 是否删除会话中的消息；false为保留会话消息，true为本地和服务器的消息会一起删除，并且不可恢复
 */
interface DeleteConvListParam {
    conversation_id_array: string[];
    clearMessage: boolean;
    user_data?: string;
}

/**
 * @breif 获取会话列表的结果
 * @param conversation_list_result_conv_list 只读, 会话列表
 * @param conversation_list_result_next_seq 只读, 分页拉取的游标
 * @param conversation_list_result_is_finished 只读, 分页拉取是否结束
 */
interface TIMConversationListResult {
    conversation_list_result_conv_list: Array<convInfo>;
    conversation_list_result_next_seq: number;
    conversation_list_result_is_finished: boolean;
}

/**
 * @breif 标记会话
 * @param conversation_id_array 会话ID列表，里面的参数需要加上'c2c_'或者'group_'前缀（如conversation_id_array:["group_@xxxxxxx"]）,其他 conversation_id_array同理
 * @param mark_type 会话标记类型
 * @param enable_mark true：设置标记 false：取消标记
 *
 * 如果已有标记不能满足您的需求，您可以自定义扩展标记，扩展标记需要满足以下两个条件：
 * 1、扩展标记值不能和 V2TIMConversationMarkType 已有的标记值冲突
 * 2、扩展标记值必须是 0x1LL << n 的位移值（32 <= n < 64，即 n 必须大于等于 32 并且小于 64），比如扩展标记值 0x1LL << 32 表示 "Windows 在线"
 *
 * @note 扩展标记值不能设置为 0x1 << 32，要设置为 0x1LL << 32，明确告诉编译器是 64 位的整型常量。
 *
 */
interface MarkConversationParam {
    conversation_id_array: Array<string>;
    mark_type: TIMConversationMarkType;
    enable_mark: boolean;
    user_data?: string;
}

/**
 * @breif 会话操作结果
 * @param conversation_operation_result_conversation_id 只读, 会话 ID
 * @param conversation_operation_result_result_code 只读, 返回码
 * @param conversation_operation_result_result_info 只读,返回信息
 */
interface TIMConversationOperationResult {
    conversation_operation_result_conversation_id: string;
    conversation_operation_result_result_code: number;
    conversation_operation_result_result_info: string;
}

/**
 * @breif 用户创建会话分组、将会话加入分组和从会话分组删除会话的入参
 * @param group_name 会话分组名称
 * @param conversation_id_array 会话ID列表，里面的参数需要加上'c2c_'或者'group_'前缀（如 conversation_id_array:["group_@xxxxxxx"]）,其他 conversation_id_array同理
 */
interface createConversationGroupParam {
    group_name: string;
    conversation_id_array: Array<string>;
    user_data?: string;
}
interface getConvGroupList {
    user_data?: string;
}
/**
 * @breif TIMConvGetConversationGroupList的返回值
 * @param conv_group_array 会话分组名称列表
 */
interface convGroupListResult {
    conv_group_array: Array<string>;
}

/**
 * @breif 重命名会话分组入参
 * @param old_name 分组名（必填参数，长度要 > 0，最大支持 32 bytes）
 * @param new_name 分组名（必填参数，长度要 > 0，最大支持 32 bytes）
 */
interface renameConvGroupParam {
    old_name: string;
    new_name: string;
    user_data?: string;
}
/**
 * @breif 删除会话分组入参
 * @param group_name 分组名（必填参数，长度要 > 0，最大支持 32 bytes）
 */
interface deleteConvGroupParam {
    group_name: string;
    user_data?: string;
}
/**
 * @breif 设置会话自定义数据入参
 * @param conversation_id_array 会话ID列表，里面的参数需要加上'c2c_'或者'group_'前缀（如 conversation_id_array:["group_@xxxxxxx"]）,其他 conversation_id_array同理
 * @param custom_data 自定义数据，最大支持 256 bytes
 */
interface setConvCustomDataParam {
    conversation_id_array: Array<string>;
    custom_data: string;
    user_data?: string;
}

/**
 * @param conv_event  conv_event 会话事件类型
 * @param json_conv_array  json_conv_array: 会话信息列表
 * @param user_data user_data: ImSDK负责透传的用户自定义数据，未做任何处理
 *
 */
// TODO json_conv_array写错了应该是Array类型
interface convEventCallback {
    (conv_event: number, json_conv_array: string, user_data: string): void;
}
/**
 * @param total_unread_count total_unread_count：未读的消息总数
 * @param user_data user_data：ImSDK负责透传的用户自定义数据，未做任何处理
 */
interface convTotalUnreadMessageCountChangedCallback {
    (total_unread_count: number, user_data: string): void;
}

/**
 * @brief 按会话 filter 过滤的未读消息总数变化
 * @param filter 获取未读总数的 filter，详见TIMConversationListFilter(param内的参数部分)
 * @param total_unread_count 未读的消息总数
 * @param user_data ImSDK负责透传的用户自定义数据，未做任何处理
 */
interface convTotalUnreadMessageCountChangedByFilterCallback {
    (filter: string, total_unread_count: number, user_data: string): void;
}

interface convGroupCreatedCallbackParam {
    callback: TIMConvConversationGroupCreatedCallback;
    user_data?: string;
}
/**
 * @param group_name 分组名
 * @param conversation_array 会话列表
 */
interface TIMConvConversationGroupCreatedCallback {
    (group_name: string, conversation_array: string, user_data: string): void;
}

interface convGroupDeletedCallbackParam {
    callback: TIMConvConversationGroupDeletedCallback;
    user_data?: string;
}

interface TIMConvConversationGroupDeletedCallback {
    (group_name: string): void;
}

interface convGroupNameChangedCallback {
    callback: TIMConvConversationGroupNameChangedCallback;
    user_data?: string;
}

interface TIMConvConversationGroupNameChangedCallback {
    (old_name: string, new_name: string, user_data: string): void;
}

export {
    convInfo,
    totalUnreadCountResult,
    convCreate,
    getConvList,
    convDelete,
    convSetDrat,
    draftParams,
    draftMessage,
    messageElem,
    convCancelDraft,
    convGetConvInfo,
    convItem,
    convPinConversation,
    convGetTotalUnreadMessageCount,
    setConvEventCallback,
    convEventCallback,
    convTotalUnreadMessageCountChangedCallback,
    convTotalUnreadMessageCountChangedCallbackParam,
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
    convTotalUnreadMessageCountChangedByFilterCallback,
    convGroupCreatedCallbackParam,
    convGroupDeletedCallbackParam,
    convGroupNameChangedCallback,
    TIMConvConversationGroupCreatedCallback,
    TIMConvConversationGroupDeletedCallback,
    TIMConvConversationGroupNameChangedCallback,
};

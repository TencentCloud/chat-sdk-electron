import {
    GroupMemberInfo,
    GroupTipGroupChangeInfo,
    GroupTipMemberChangeInfo,
} from "./groupInterface";
import {
    TIMPlatform,
    TIMMsgStatus,
    TIMReceiveMessageOpt,
    TIMConvType,
    TIMElemType,
    TIMDownloadType,
    TIMOfflinePushFlag,
    TIMIOSOfflinePushType,
    TIMAndroidOfflinePushNotifyMode,
    TIMOfflinePushTokenType,
} from "../enum";

type userProfileCustom = {
    user_profile_custom_string_info_key: string;
    user_profile_custom_string_info_value: string;
};

interface userProfile {
    user_profile_add_permission: number;
    user_profile_birthday: number;
    user_profile_custom_string_array: Array<userProfileCustom>;
    user_profile_face_url: string;
    user_profile_gender: number;
    user_profile_identifier: string;
    user_profile_language: number;
    user_profile_level: number;
    user_profile_location: string;
    user_profile_nick_name: string;
    user_profile_role: number;
    user_profile_self_signature: string;
}

/**
 *  @param conv_id  conv_id 会话的ID
 * @param conv_type  conv_type会话类型，请参考[TIMConvType](../enums/enum.timconvtype.html)
 * @param params  params:paramsLjson_msg_param 消息json字符串
 * @param message_id  message_id 消息 ID ，调用接口后，可以读取到以 '\0' 结尾的字符串，分配内存大小不能低于 128 字节，如果不需要，可传入 null
 * @param user_data  user_data 用户自定义数据，ImSDK只负责传回给回调函数 result_cb，不做任何处理
 */
declare interface MsgSendMessageParams {
    conv_id: string;
    conv_type: number;
    params: Json_value_msg;
    user_data?: string;
    messageId?: string;
}
/**
  @param conv_id   conv_id 会话的ID
* @param conv_type  conv_type 会话类型，请参考[TIMConvType](../enums/enum.timconvtype.html)
* @param params  params：json_msg_param 消息json字符串
* @param messageId  message_id 消息 ID ，调用接口后，可以读取到以 '\0' 结尾的字符串，分配内存大小不能低于 128 字节，如果不需要，可传入 null
* @param callback  callback 发送新消息成功与否的回调。
* @param user_data  user_data 用户自定义数据，ImSDK只负责传回给回调函数 result_cb，不做任何处理
 */
interface MsgSendMessageParamsV2 {
    conv_id: string;
    conv_type: number;
    params: Json_value_msg;
    user_data?: string;
    messageId?: string;
    callback: Function;
}
/**
 * @param {string} text_elem_content text_elem_content:文本内容
 */
interface TextElem {
    text_elem_content: string; // 文本内容
}
/**
 * @param {number} face_elem_index face_elem_index:读写(必填), 表情索引
 * @param {string} face_elem_buf face_elem_buf: 读写(选填), 其他额外数据,可由用户自定义填写。若要传输二进制，麻烦先转码成字符串。JSON只支持字符串
 */
interface FaceElem {
    face_elem_index: number; // 表情索引
    face_elem_buf: string; // 其他额外数据,可由用户自定义填写。若要传输二进制，麻烦先转码成字符串。
}
/**
 * @brief 位置元素
 * @param location_elem_desc location_elem_desc:位置描述
 * @param location_elem_longitude location_elem_longitude:经度
 * @param location_elem_latitude location_elem_latitude:经度
 */
interface LocationElem {
    location_elem_desc: string;
    location_elem_longitude: number;
    location_elem_latitude: number;
}

/**
 * @brief 图片元素
 * @param image_elem_orig_path image_elem_orig_path: 读写，必填写 发送图片的路径
 * @param image_elem_level image_elem_level: 读写(必填), 发送图片的质量级别，参考[TIMImageLevel](../enums/enum.timimagelevel.html)
 * @param image_elem_format image_elem_format: 读写,发送图片格式:，0xff:未知格式, 1：JPG, 2:GIF, 3:PNG, 4:BMP
 * @param image_elem_orig_id image_elem_orig_id: 只读,原图的uuid
 * @param image_elem_orig_pic_height image_elem_orig_pic_height: 只读,原图的图片高度
 * @param image_elem_orig_pic_width image_elem_orig_pic_width:只读, 原图的图片宽度
 * @param image_elem_orig_pic_size image_elem_orig_pic_size:只读,原图的图片大小
 * @param image_elem_thumb_id image_elem_thumb_id:只读,略缩图uuid
 * @param image_elem_thumb_pic_height image_elem_thumb_pic_height:只读,略缩图的图片高度
 * @param image_elem_thumb_pic_width image_elem_thumb_pic_width:只读,略缩图的图片宽度
 * @param image_elem_thumb_pic_size image_elem_thumb_pic_size: 只读,略缩图的图片大小
 * @param image_elem_large_id image_elem_large_id: 只读,大图片uuid
 * @param image_elem_large_pic_height image_elem_large_pic_height: 只读,大图片的图片高度
 * @param image_elem_large_pic_width image_elem_large_pic_width:  只读,大图片的图片宽度
 * @param image_elem_large_pic_size image_elem_large_pic_size: 只读,大图片的图片大小
 * @param image_elem_orig_url image_elem_orig_url: 只读,原图URL
 * @param image_elem_thumb_url image_elem_thumb_url: 只读,略缩图URL
 *  @param image_elem_large_url image_elem_large_url: 只读,大图片URL
 *  @param image_elem_task_id image_elem_task_id: 只读,任务ID，废弃
 * >  图片规格说明：每幅图片有三种规格，分别是Original（原图）、Large（大图）、Thumb（缩略图）。
 * > 原图：指用户发送的原始图片，尺寸和大小都保持不变。
 * > 大图：是将原图等比压缩，压缩后宽、高中较小的一个等于720像素。
 * > 缩略图：是将原图等比压缩，压缩后宽、高中较小的一个等于198像素
 * >  如果原图尺寸就小于198像素，则三种规格都保持原始尺寸，不需压缩。
 * >  如果原图尺寸在198-720之间，则大图和原图一样，不需压缩。
 * >  在手机上展示图片时，建议优先展示缩略图，用户单击缩略图时再下载大图，单击大图时再下载原图。当然开发者也可以选择跳过大图，单击缩略图时直接下载原图。
 * >  在Pad或PC上展示图片时，由于分辨率较大，且基本都是Wi-Fi或有线网络，建议直接显示大图，用户单击大图时再下载原图。
 */
interface ImageElem {
    image_elem_orig_path: string; // 读写，必填写 发送图片的路径
    image_elem_level: number; // 读写(必填), 发送图片的质量级别，参考[TIMImageLevel](../enums/enum.timimagelevel.html)
    image_elem_format: number; // 读写,发送图片格式:，0xff:未知格式, 1：JPG, 2:GIF, 3:PNG, 4:BMP
    image_elem_orig_id: string; // 只读,原图的uuid
    image_elem_orig_pic_height: number; // 只读,原图的图片高度
    image_elem_orig_pic_width: number; //  只读, 原图的图片宽度
    image_elem_orig_pic_size: number; // 只读,原图的图片大小
    image_elem_thumb_id: string; //  只读,略缩图uuid
    image_elem_thumb_pic_height: number; // 只读,略缩图的图片高度
    image_elem_thumb_pic_width: number; // 只读,略缩图的图片宽度
    image_elem_thumb_pic_size: number; //   只读,略缩图的图片大小
    image_elem_large_id: string; //只读,大图片uuid
    image_elem_large_pic_height: number; // 只读,大图片的图片高度
    image_elem_large_pic_width: number; //  只读,大图片的图片宽度
    image_elem_large_pic_size: number; // 只读,大图片的图片大小
    image_elem_orig_url: string; // 只读,原图URL
    image_elem_thumb_url: string; // 只读,略缩图URL
    image_elem_large_url: string; // 只读,大图片URL
    image_elem_task_id: number; //  只读,任务ID，废弃
}

/**
 * @brief 声音元素
 * @param sound_elem_file_path sound_elem_file_path： 读写(必填), 语音文件路径,需要开发者自己先保存语言然后指定路径
 * @param sound_elem_file_size sound_elem_file_size： 读写(必填), 语言数据文件大小，以秒为单位
 * @param sound_elem_file_time sound_elem_file_time: 读写(必填), 语音时长
 * @param sound_elem_file_id sound_elem_file_id:  只读,下载声音文件时的ID
 * @param sound_elem_business_id sound_elem_business_id: 只读，下载时用到的businessID
 * @param sound_elem_download_flag sound_elem_download_flag: 只读，是否需要申请下载地址(0:需要申请，1:到cos申请，2:不需要申请,直接拿url下载)
 * @param sound_elem_url sound_elem_url: 只读，下载的URL
 * @param sound_elem_task_id sound_elem_task_id: 只读，任务ID，废弃
 * @note 注意：
 * > 语音是否已经播放，可使用 消息自定义字段 实现，如定义一个字段值0表示未播放，1表示播放，当用户单击播放后可设置改字段的值为1
 * > 一条消息只能添加一个声音元素，添加多个声音元素时，发送消息可能失败。
 */
interface SoundElem {
    sound_elem_file_path: string; // 读写(必填), 语音文件路径,需要开发者自己先保存语言然后指定路径
    sound_elem_file_size: number; // 读写(必填), 语言数据文件大小，以秒为单位
    sound_elem_file_time: number; // 读写(必填), 语音时长
    sound_elem_file_id: string; // 只读,下载声音文件时的ID
    sound_elem_business_id: number; // 只读，下载时用到的businessID
    sound_elem_download_flag: number; //  只读，是否需要申请下载地址(0:需要申请，1:到cos申请，2:不需要申请,直接拿url下载)
    sound_elem_url: string; // 只读，下载的URL
    sound_elem_task_id: number; //  只读，任务ID，废弃
}
/**
 * @brief 自定义元素
 * @param custom_elem_data  custom_elem_data:读写, 数据,支持二进制数据
 * @param custom_elem_desc  custom_elem_desc: 读写, 自定义描述
 * @param custom_elem_ext  custom_elem_ext: 读写, 后台推送对应的ext字段
 * @param custom_elem_sound  custom_elem_sound: 读写, 自定义声音
 * @note
 * 自定义消息是指当内置的消息类型无法满足特殊需求，开发者可以自定义消息格式，内容全部由开发者定义，ImSDK只负责透传。
 */
interface CustomElem {
    custom_elem_data: string; // 读写, 数据,支持二进制数据
    custom_elem_desc: string; // 读写, 自定义描述
    custom_elem_ext: string; // 读写, 后台推送对应的ext字段
    custom_elem_sound: string; // 读写, 自定义声音
}

/**
 * @brief 群组系统通知元素
 * @param group_report_elem_report_type 只读, 类型 [TIMGroupReportType]
 * @param group_report_elem_group_id 只读, 群组ID
 * @param group_report_elem_op_user 只读, 操作者ID
 * @param group_report_elem_msg 只读, 操作理由
 * @param group_report_elem_user_data 只读, 操作者填的自定义数据
 * @param group_report_elem_op_user_info 只读, 操作者个人资料
 * @param group_report_elem_op_group_memberinfo 只读, 操作者群内资料
 * @param group_report_elem_platform 只读, 操作方平台信息
 * @param group_report_elem_shut_up_time 读, 被操作者的禁言时间(禁言某些用户时，被禁言的用户会收到该信息)
 * @param group_report_elem_group_message_receive_option 只读，消息接收选项, 用户修改群消息接收选项时会收到该信息[TIMReceiveMessageOpt]
 */
interface GroupReportElem {
    group_report_elem_report_type: number;
    group_report_elem_group_id: string;
    group_report_elem_op_user: string;
    group_report_elem_msg: string;
    group_report_elem_user_data: string;
    group_report_elem_op_user_info: userProfile;
    group_report_elem_op_group_memberinfo: GroupMemberInfo;
    group_report_elem_platform: string;
    group_report_elem_shut_up_time: number;
    group_report_elem_group_message_receive_option: TIMReceiveMessageOpt;
}

/**
 * @param group_tips_elem_tip_type [TIMGroupTipType](), 只读, 群消息类型
 * @param group_tips_elem_op_user 只读, 操作者ID
 * @param group_tips_elem_group_id 只读, 群组ID
 * @param group_tips_elem_user_array 只读, 被操作的账号列表
 * @param group_tips_elem_group_change_info_array  只读, 只读, 群资料变更信息列表,仅当 kTIMGroupTipsElemTipType 值为 kTIMGroupTip_GroupInfoChange 时有效
 * @param group_tips_elem_member_change_info_array  只读, 群成员变更信息列表,仅当 kTIMGroupTipsElemTipType 值为 kTIMGroupTip_MemberInfoChange 时有效
 * @param group_tips_elem_op_user_info  只读, 操作者个人资料
 * @param group_tips_elem_op_group_memberinfo  只读, 群成员信息
 * @param group_tips_elem_changed_user_info_array  只读, 被操作的用户资料列表
 * @param group_tips_elem_member_num  只读, 只读, 当前群成员数,只有当事件消息类型为 kTIMGroupTip_Invite 、 kTIMGroupTip_Quit 、 kTIMGroupTip_Kick 时有效
 * @param group_tips_elem_platform  只读, 操作方平台信息
 * @param group_tips_elem_member_mark_info_array  只读, 群成员标记信息列表,仅当 kTIMGroupTipsElemTipType 值为 kTIMGroupTip_MemberMarkChange 时有效
 */
interface GroupTipsElem {
    group_tips_elem_tip_type: number;
    group_tips_elem_op_user: string;
    group_tips_elem_group_id: string;
    group_tips_elem_user_array: string[];
    group_tips_elem_group_change_info_array: GroupTipGroupChangeInfo[];
    group_tips_elem_member_change_info_array: GroupTipMemberChangeInfo[];
    group_tips_elem_op_user_info: userProfile;
    group_tips_elem_op_group_memberinfo: GroupMemberInfo;
    group_tips_elem_changed_user_info_array: userProfile[];
    group_tips_elem_changed_group_memberinfo_array: GroupMemberInfo[];
    group_tips_elem_member_num: number;
    group_tips_elem_platform: string;
    group_tips_elem_member_mark_info_array: GroupTipMemberChangeInfo[];
}

/**
  @param conv_id   conv_id 会话的ID
* @param conv_type  conv_type 会话类型，请参考[TIMConvType](../enums/enum.timconvtype.html)
* @param params  params：json_msg_param 消息json字符串
* @param messageId  message_id 消息 ID ，调用接口后，可以读取到以 '\0' 结尾的字符串，分配内存大小不能低于 128 字节，如果不需要，可传入 null
* @param callback  callback 发送新消息成功与否的回调。
* @param user_data  user_data 用户自定义数据，ImSDK只负责传回给回调函数 result_cb，不做任何处理
* @param replyMsg  replyMsg 为被回复的消息
 */
interface MsgSendReplyMessage {
    conv_id: string;
    conv_type: number;
    params: Json_value_msg;
    user_data?: string;
    messageId?: string;
    callback: Function;
    replyMsg: Json_value_msg;
}

/**
 * @brief 文件元素
 * @param file_elem_file_path file_elem_file_path: 读写(必填), 文件所在路径（包含文件名）
 * @param file_elem_file_name file_elem_file_name 读写(必填), 文件名，显示的名称。不设置该参数时，eName默认为FileElemFilePath指定的文件路径中的文件名
 * @param file_elem_file_size file_elem_file_size: 读写(必填), 文件大小
 * @param file_elem_file_id file_elem_file_id:  只读, 下载视频时的uuid
 * @param file_elem_business_id file_elem_business_id: 只读, 下载时用到的businessID
 * @param file_elem_download_flag file_elem_download_flag: 只读, 文件下载flag
 * @param file_elem_url file_elem_url: 只读，下载的URL
 * @param file_elem_task_id file_elem_task_id: 只读，任务ID，废弃
 * @note 注意
 * > 语音是否已经播放，可使用 消息自定义字段 实现，如定义一个字段值0表示未播放，1表示播放，当用户单击播放后可设置改字段的值为1
 * > 一条消息只能添加一个声音元素，添加多个声音元素时，发送消息可能失败。
 */
interface FileElem {
    file_elem_file_path: string; // 读写(必填), 文件所在路径（包含文件名）
    file_elem_file_name: string; // 读写(必填), 文件名，显示的名称。不设置该参数时，eName默认为FileElemFilePath指定的文件路径中的文件名
    file_elem_file_size: number; // 读写(必填), 文件大小
    file_elem_file_id: string; // 只读, 下载视频时的uuid
    file_elem_business_id: number; // 只读, 下载时用到的businessID
    file_elem_download_flag: number; //  只读, 文件下载flag
    file_elem_url: string; // 只读，下载的URL
    file_elem_task_id: number; //  只读，任务ID，废弃
}

/**
 * @brief 视频元素
 * @param video_elem_video_type video_elem_video_type: 读写(必填), 视频文件类型，发送消息时进行设置
 * @param video_elem_video_size video_elem_video_size: 读写(必填), 视频文件大小
 * @param video_elem_video_duration video_elem_video_duration: 读写(必填), 视频时长，发送消息时进行设置
 * @param video_elem_video_path video_elem_video_path: 读写(必填), 适配文件路径
 * @param video_elem_video_id video_elem_video_id: 只读, 下载视频时的uuid
 * @param video_elem_business_id video_elem_business_id://  只读, 下载时用到的businessID
 * @param video_elem_video_download_flag video_elem_video_download_flag: 只读, 视频文件下载flag
 * @param video_elem_video_url video_elem_video_url:只读, 视频文件下载的URL
 * @param video_elem_image_type video_elem_image_type:读写(必填), 截图文件类型，发送消息时进行设置
 * @param video_elem_image_size video_elem_image_size:读写(必填), 截图文件大小
 * @param video_elem_image_width video_elem_image_width:读写(必填), 截图高度，发送消息时进行设置
 * @param video_elem_image_height video_elem_image_height: 读写(必填), 截图宽度，发送消息时进行设置
 * @param video_elem_image_path video_elem_image_path: 读写(必填), 保存截图的路径
 * @param video_elem_image_id video_elem_image_id: 只读, 下载视频截图时的ID
 * @param video_elem_image_download_flag video_elem_image_download_flag: 只读, 截图文件下载flag
 * @param video_elem_image_url video_elem_image_url: 只读,原图URL
 * @param video_elem_task_id video_elem_task_id: 只读,略缩图URL
 */
interface VideoElem {
    video_elem_video_type: string; // 读写(必填), 视频文件类型，发送消息时进行设置
    video_elem_video_size: number; // 读写(必填), 视频文件大小
    video_elem_video_duration: number; //  读写(必填), 视频时长，发送消息时进行设置
    video_elem_video_path: string; // 读写(必填), 适配文件路径
    video_elem_video_id: number; // 只读, 下载视频时的uuid
    video_elem_business_id: number; //  只读, 下载时用到的businessID
    video_elem_video_download_flag: number; // 只读, 视频文件下载flag
    video_elem_video_url: string; //  只读, 视频文件下载的URL
    video_elem_image_type: number; // 读写(必填), 截图文件类型，发送消息时进行设置
    video_elem_image_size: number; // 读写(必填), 截图文件大小
    video_elem_image_width: number; //   读写(必填), 截图高度，发送消息时进行设置
    video_elem_image_height: string; //读写(必填), 截图宽度，发送消息时进行设置
    video_elem_image_path: number; // 读写(必填), 保存截图的路径
    video_elem_image_id: number; //  只读, 下载视频截图时的ID
    video_elem_image_download_flag: number; // 只读, 截图文件下载flag
    video_elem_image_url: string; //  只读,原图URL
    video_elem_task_id: string; // 只读,略缩图URL
}

/**
 * @brief 合并消息元素
 * @param merge_elem_title merge_elem_title: 读写(必填), 合并消息 title
 * @param merge_elem_abstract_array merge_elem_abstract_array array string, 读写(必填), 合并消息摘要列表
 * @param merge_elem_compatible_text merge_elem_compatible_text: 读写(必填), 合并消息兼容文本，低版本 SDK 如果不支持合并消息，默认会收到一条文本消息，文本消息的内容为 compatibleText，该参数不能为空。
 * @param merge_elem_message_array merge_elem_message_array:  array [Message](), 读写(必填), 消息列表（最大支持 300 条，消息对象必须是 kTIMMsg_SendSucc 状态，消息类型不能为 GroupTipsElem 或 GroupReportElem）
 * @param merge_elem_layer_over_limit merge_elem_layer_over_limit: 读, 合并消息里面又包含合并消息我们称之为合并嵌套，合并嵌套层数不能超过 100 层，如果超过限制，layersOverLimit 会返回 YES，kTIMMergerElemTitle 和 kTIMMergerElemAbstractArray 为空，DownloadMergerMessage 会返回 ERR_MERGER_MSG_LAYERS_OVER_LIMIT 错误码。
 * @param merge_elem_relay_pb_key merge_elem_relay_pb_key: 只读, native 端消息列表下载 key
 * @param merge_elem_relay_json_key merge_elem_relay_json_key: 只读, web 端消息列表下载 key
 * @param merge_elem_relay_buffer merge_elem_relay_buffer: 只读, 转发消息的 buffer
 * @note
 * > 语音是否已经播放，可使用 消息自定义字段 实现，如定义一个字段值0表示未播放，1表示播放，当用户单击播放后可设置改字段的值为1
 * > 一条消息只能添加一个声音元素，添加多个声音元素时，发送消息可能失败。
 */
interface MergerElem {
    merge_elem_title: string; // string, 读写(必填), 合并消息 title
    merge_elem_abstract_array: Array<String>; // array string, 读写(必填), 合并消息摘要列表
    merge_elem_compatible_text: string; // string, 读写(必填), 合并消息兼容文本，低版本 SDK 如果不支持合并消息，默认会收到一条文本消息，文本消息的内容为 compatibleText，该参数不能为空。
    merge_elem_message_array: Array<Json_value_msg>; // array [Json_value_msg](./interface.json_value_msg.html), 读写(必填), 消息列表（最大支持 300 条，消息对象必须是 kTIMMsg_SendSucc 状态，消息类型不能为 GroupTipsElem 或 GroupReportElem）
    merge_elem_layer_over_limit: boolean; // 只读, 合并消息里面又包含合并消息我们称之为合并嵌套，合并嵌套层数不能超过 100 层，如果超过限制，layersOverLimit 会返回 YES，kTIMMergerElemTitle 和 kTIMMergerElemAbstractArray 为空，DownloadMergerMessage 会返回 ERR_MERGER_MSG_LAYERS_OVER_LIMIT 错误码。
    merge_elem_relay_pb_key: string; //  只读, native 端消息列表下载 key
    merge_elem_relay_json_key: string; // 只读, web 端消息列表下载 key
    merge_elem_relay_buffer: number; //  只读, 转发消息的 buffer
}

/**
 * @param {string} conv_id      conv_id 会话ID
 * @param {number} conv_type    conv_type 会话类型[TIMConvType](../enums/enum.timconvtype.html)
 * @param {string} message_id   message_id 消息 ID
 * @param {string} [user_data]  user_data 户自定义数据，ImSDK只负责传回给回调函数，不做任何处理(可选)
 */
interface MsgCancelSendParams {
    conv_id: string;
    conv_type: number;
    message_id: string;
    user_data?: string;
}

/**
 * @param {array} json_message_id_array  json_message_id_array 消息ID列表
 * @param {string} user_data  user_data 户自定义数据，ImSDK只负责传回给回调函数，不做任何处理(可选)
 *  */
interface MsgFindMessagesParams {
    json_message_id_array: string[];
    user_data?: string;
}

/**
 * @param conv_id   conv_id 会话的ID
 * @param conv_type conv_type  会话类型，请参考[TIMConvType](../enums/enum.timconvtype.html)
 * @param json_msg_param   消息
 * @param user_data user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 *  */
interface MsgReportReadedParams {
    conv_id: string;
    conv_type: number;
    // message_id?: string;
    json_msg_param: Json_value_msg;
    user_data?: string;
}
/**
 * @param conv_id   conv_id 会话的ID
 * @param conv_type  conv_type 会话类型，请参考[TIMConvType](../enums/enum.timconvtype.html)
 * @param message_id   message_id 消息ID
 * @param user_data  user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理（可选）
 */
interface MsgRevokeParams {
    conv_id: string;
    conv_type: number;
    // message_id: string;
    json_msg_param: Json_value_msg;
    user_data?: string;
}
/**
 * @param conv_id   conv_id 会话的ID
 * @param conv_type  conv_type 会话类型，请参考[TIMConvType](../enums/enum.timconvtype.html)
 * @param params  params：json_msg_Locator_array 消息定位符数组
 * @param user_data  user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 */
interface MsgFindByMsgLocatorListParams {
    conv_id: string;
    conv_type: number;
    params: Json_msg_locator[];
    user_data?: string;
}
/**
* @param conv_id  conv_id 会话的ID
* @param conv_type conv_type 会话类型，请参考[TIMConvType](../enums/enum.timconvtype.html)
* @param json_msg_array params 消息数组 item为Json_value_msg
* @param user_data user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 
*/
interface MsgImportMsgListParams {
    conv_id: string;
    conv_type: number;
    params: Json_value_msg[];
    user_data?: string;
}
/**
 * @param conv_id  conv_id 会话的ID
 * @param conv_type conv_type 会话类型，请参考[TIMConvType](../enums/enum.timconvtype.html)
 * @param params  params： 消息获取参数 params为json_get_msg_param
 * @param user_data user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理（可选）
 */
interface MsgSaveMsgParams {
    conv_id: string;
    conv_type: number;
    params: Json_value_msg;
    user_data?: string;
}
/**
 *    获取指定会话的消息列表
 * @param conv_id  conv_id  会话的ID
 * @param conv_type conv_type 会话类型，请参考[TIMConvType](../enums/enum.timconvtype.html)
 * @param params  params  消息获取参数 item为json_get_msg_param
 * @param user_data  user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 *
 */
interface MsgGetMsgListParams {
    conv_id: string;
    conv_type: number;
    params: Json_get_msg_param;
    user_data?: string;
}
/**
 删除指定会话的本地消息
* @param conv_id  conv_id 会话的ID
* @param conv_type conv_type 会话类型，请参考[TIMConvType](../enums/enum.timconvtype.html)
* @param params params： 消息获取参数（json_msgdel_param）
* @param user_data user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
*/
interface MsgDeleteParams {
    conv_id: string;
    conv_type: number;
    params: Json_value_msgdelete;
    user_data?: string;
}
/**
 * @param conv_id  conv_id 会话的ID
 * @param conv_type conv_type 会话类型，请参考[TIMConvType](../enums/enum.timconvtype.html)
 * @param params  params 消息数组
 * @param user_data user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 */
interface MsgListDeleteParams {
    conv_id: string;
    conv_type: number;
    params: Json_value_msg[];
    user_data?: string;
}
/**
 * @param conv_id conv_id 会话的ID
 * @param conv_type conv_type 会话类型，请参考[TIMConvType](../enums/enum.timconvtype.html)
 * @param user_data user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 */
interface MsgClearHistoryMessageParams {
    conv_id: string;
    conv_type: number;
    user_data?: string;
}
/**
 * @param params  json_identifier_array 用户 ID 列表
 * @param opt opt 消息接收选项，请参考[TIMReceiveMessageOpt](../enums/enum.timreceivemessageopt.html)
 * @param user_data user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 */
interface MsgSetC2CReceiveMessageOptParams {
    params: string[];
    opt: number;
    user_data?: string;
}

/**
 * @param params params:json_identifier_array 用户 ID 列表
 * @param user_data user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 * @return int 返回TIM_SUCC表示接口调用成功（接口只有返回TIM_SUCC，回调cb才会被调用），其他值表示接口调用失败。每个返回值的定义请参考 [TIMResult](../enums/timresult.html)
 *
 */
interface MsgGetC2CReceiveMessageOptParams {
    params: string[];
    user_data?: string;
}

/**
 * @param group_id group_id 群 ID
 * @param opt opt 消息接收选项，请参考[TIMReceiveMessageOpt](../enums/enum.timreceivemessageopt.html)
 * @param user_data user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 *
 * @note
 * > 查询群消息的接收选项：您可以在群资料（GroupBaseInfo）中获得这个信息
 */
interface MsgSetGroupReceiveMessageOptParams {
    group_id: string;
    opt: TIMReceiveMessageOpt;
    user_data?: string;
}

/**
 * @param params  params：json_download_elem_param下载的参数Json字符串
 * @param path path 下载文件保存路径
 * @param user_data user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理.不同的下载需要设置不同的user_data
 *
 */
interface MsgDownloadElemToPathParams {
    params: Json_download_elem_param;
    path: string;
    callback: TIMMsgDownloadElemToPathFunc;
    user_data: string;
}
/**
 * @param params  params： 单条消息的 JSON 字符串，接收消息、查找消息或查询历史消息时获取到的消息
 * @param user_data user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 *
 */
interface MsgDownloadMergerMessageParams {
    params: Json_value_msg;
    user_data?: string;
}
/**
 * @param params params  群发消息json字符串
 *      msg_batch_send_param_identifier_array 只写(必填), 群发的ID列表
 *      msg_batch_send_param_msg 只写(必填), 群发的消息
 * @param user_data user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 */
interface MsgBatchSendParams {
    params: {
        msg_batch_send_param_identifier_array: string[];
        msg_batch_send_param_msg: Json_value_msg;
    };
    user_data?: string;
}
/**
 * @param params params：json_search_message_param 消息搜索参数
 * @param user_data user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 *
 */
interface MsgSearchLocalMessagesParams {
    params: Json_search_message_param;
    user_data?: string;
}
/**
 * @param params params: json_value_msg 消息修改参数
 * @param user_data user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 */
interface MsgModifyMessageParams {
    params: Json_value_msg;
    user_data?: string;
}

/**
 * @brief 消息Json Keys、
 * @param message_elem_array message_elem_array：array [Elem](), 读写(必填), 消息内元素列表
 * @param message_conv_id message_conv_id 读写(选填),       消息所属会话ID
 * @param message_conv_type message_conv_type [TIMConvType](../enums/enum.timconvtype.html), 读写(选填), 消息所属会话类型
 * @param message_sender message_sender  读写(选填),       消息的发送者
 * @param message_priority message_priority [TIMMsgPriority](), 读写(选填), 消息优先级
 * @param message_client_time message_client_time 读写(选填),       客户端时间
 * @param message_server_time message_server_time 读写(选填),       服务端时间
 * @param message_is_from_self message_is_from_self 读写(选填),       消息是否来自自己
 * @param message_platform message_platform  读写(选填), 发送消息的平台
 * @param message_is_read message_is_read  读写(选填),       消息是否已读
 * @param message_is_online_msg message_is_online_msg 读写(选填),       消息是否是在线消息，false表示普通消息,true表示阅后即焚消息，默认为false
 * @param message_is_peer_read message_is_peer_read  只读,            消息是否被会话对方已读
 * @param message_status message_status [TIMMsgStatus](), 读写(选填), 消息当前状态
 * @param message_msg_id message_msg_id 只读,       消息的唯一标识，推荐使用 kTIMMsgMsgId
 * @param message_rand message_rand 只读,       消息的随机码
 * @param message_seq message_seq 只读,       消息序列
 * @param message_custom_int 读写(选填), 自定义整数值字段（本地保存，不会发送到对端，程序卸载重装后失效）
 * @param message_custom_str 读写(选填), 自定义数据字段（本地保存，不会发送到对端，程序卸载重装后失效）
 * @param message_cloud_custom_str message_cloud_custom_str 读写(选填), 消息自定义数据（云端保存，会发送到对端，程序卸载重装后还能拉取到）
 * @param message_is_excluded_from_unread_count 读写(选填),  消息是否不计入未读计数：默认为 NO，表明需要计入未读计数，设置为 YES，表明不需要计入未读计数
 * @param message_group_at_user_array message_group_at_user_array 读写(选填), 群消息中被 @ 的用户 UserID 列表（即该消息都 @ 了哪些人），如果需要 @ ALL ，请传入 kImSDK_MesssageAtALL 字段
 * @param message_is_forward_message message_is_forward_message 只写(选填), 如果需要转发一条消息，不能直接调用 sendMessage 接口发送原消息，原消息 kTIMMsgIsForwardMessage 设置为 true 再发送。
 * @param message_sender_profile message_sender_profile 读写(选填), 消息的发送者的用户资料
 * @param message_sender_group_member_info message_sender_group_member_info 读写(选填), 消息发送者在群里面的信息，只有在群会话有效。目前仅能获取字段 kTIMGroupMemberInfoIdentifier、kTIMGroupMemberInfoNameCard 其他的字段建议通过 TIMGroupGetMemberInfoList 接口获取
 * @param message_offlie_push_config message_offlie_push_config [OfflinePushConfig](), 读写(选填), 消息的离线推送设置
 * @param message_excluded_from_content_moderation 是否不过内容审核（包含【本地审核】和【云端审核】），只有在开通【本地审核】或【云端审核】功能后，该字段设置才有效，设置为 true，表明不过内容审核，设置为 false：表明过内容审核。【本地审核】开通流程请参考 [本地审核功能](https://cloud.tencent.com/document/product/269/83795#.E6.9C.AC.E5.9C.B0.E5.AE.A1.E6.A0.B8.E5.8A.9F.E8.83.BD)。 【云端审核】开通流程请参考 [云端审核功能](https://cloud.tencent.com/document/product/269/83795#.E4.BA.91.E7.AB.AF.E5.AE.A1.E6.A0.B8.E5.8A.9F.E8.83.BD)
 *
 * @note 注意
 * > 关于对应Elem的顺序
 * + 目前文件和语音Elem不一定会按照添加顺序传输，其他Elem按照顺序，不过建议不要过于依赖Elem顺序进行处理，应该逐个按照Elem类型处理，防止异常情况下进程Crash。
 * > 针对群组的红包和点赞消息
 * + 对于直播场景，会有点赞和发红包功能，点赞相对优先级较低，红包消息优先级较高，具体消息内容可以使用自定义消息[CustomElem]()进行定义，发送消息时，可通过 kTIMMsgPriority 定义消息优先级。
 * > 阅后即焚消息
 * + 开发者通过设置 TIMMsgIsOnlineMsg 字段为true时，表示发送阅后即焚消息,该消息有如下特性
 * >C2C会话,当此消息发送时，只有对方在线，对方才会收到。如果当时离线，后续再登录也收不到此消息。
 * >群会话,当此消息发送时，只有群里在线的成员才会收到。如果当时离线，后续再登录也收不到此消息。
 * >此消息服务器不会保存
 * >此消息不计入未读计数
 * >此消息在本地不会存储
 * > 消息自定义字段
 * + 开发者可以对消息增加自定义字段，如自定义整数(通过 kTIMMsgCustomInt 指定)、自定义二进制数据(通过 kTIMMsgCustomStr 指定，必须转换成String，Json不支持二进制传输)，可以根据这两个字段做出各种不同效果，例如语音消息是否已经播放等等。另外需要注意，此自定义字段仅存储于本地，不会同步到Server，更换终端获取不到。
 *
 */
interface Json_value_msg {
    // message_elem_array?: [Elem | any];
    message_elem_array?: (
        | ElemTextElem
        | ElemImageElem
        | ElemSoundElem
        | ElemCustomElem
        | ElemFileElem
        | ElemVideoElem
        | ElemMergerElem
        | ElemFaceElem
        | ElemLocationElem
        | ElemGroupTipsElem
        | ElemGroupReportElem
    )[];
    message_conv_id?: string;
    message_conv_type?: number;
    message_sender?: string;
    message_priority?: number;
    message_client_time?: number;
    message_server_time?: number;
    message_is_from_self?: boolean;
    message_platform?: TIMPlatform;
    message_is_read?: boolean;
    message_is_online_msg?: boolean;
    message_is_peer_read?: boolean;
    message_status?: TIMMsgStatus;
    message_unique_id?: number;
    message_msg_id?: string;
    message_rand?: number;
    message_seq?: number;
    message_custom_int?: number;
    message_custom_str?: string;
    message_cloud_custom_str?: string;
    message_is_excluded_from_unread_count?: boolean;
    message_group_at_user_array?: string[];
    message_is_forward_message?: boolean;
    message_sender_profile?: userProfile;
    message_sender_group_member_info?: GroupMemberInfo;
    message_support_message_extension?: boolean;
    message_offline_push_config?: OfflinePushConfig;
    message_need_read_receipt?: boolean;
    message_receipt_peer_read?: boolean;
    message_is_broadcast_message?: boolean;
    message_has_sent_receipt?: boolean;
    message_group_receipt_read_count?: number;
    message_group_receipt_unread_count?: number;
    message_version?: number;
    message_excluded_from_last_message?: boolean;
    message_excluded_from_content_moderation?: boolean;
    message_target_group_member_array?: string[];
    message_revoker_user_id?: string;
}

/**
 * @brief 离线消息推送配置
 * @param offline_push_config_desc 读写, 当前消息在对方收到离线推送时候展示内容
 * @param offline_push_config_ext  读写, 当前消息离线推送时的扩展字段
 * @param offline_push_config_flag  读写, 当前消息是否允许推送，默认允许推送 kTIMOfflinePushFlag_Default
 * @param offline_push_config_ios_config 读写, iOS离线推送配置
 * @param offline_push_config_android_config    读写, Android离线推送配置
 */
interface OfflinePushConfig {
    offline_push_config_desc: string;
    offline_push_config_ext: string;
    offline_push_config_flag: TIMOfflinePushFlag;
    offline_push_config_ios_config?: IOSOfflinePushConfig;
    offline_push_config_android_config?: AndroidOfflinePushConfig;
}

/**
 * @brief 消息在iOS系统上的离线推送配置
 * @param ios_offline_push_config_title 读写, 通知标题
 * @param ios_offline_push_config_sound 读写, 离线推送声音设置（仅对 iOS 生效）。当 iOSSound = kIOSOfflinePushNoSound，表示接收时不会播放声音；当 iOSSound = kIOSOfflinePushDefaultSound，表示接收时播放系统声音；如果要自定义 iOSSound，需要先把语音文件链接进 Xcode 工程，然后把语音文件名（带后缀）设置给 iOSSound。
 * @param ios_offline_push_config_ignore_badge  读写, 是否忽略badge计数。若为true，在iOS接收端，这条消息不会使App的应用图标未读计数增加
 * @param ios_offline_push_config_push_type [TIMIOSOfflinePushType]()，读写，iOS 离线推送的类型（仅对 iOS 生效），默认值是 TIMIOSOfflinePushType_APNS
 */
interface IOSOfflinePushConfig {
    ios_offline_push_config_title: string;
    ios_offline_push_config_sound: string;
    ios_offline_push_config_ignore_badge: boolean;
    ios_offline_push_config_push_type: TIMIOSOfflinePushType;
}

/**
 * @brief 消息在Android系统上的离线推送配置
 * @param android_offline_push_config_title 读写, 通知标题
 * @param android_offline_push_config_sound 读写, 离线推送声音设置（仅对 Android 生效）。只有华为和谷歌手机支持设置声音提示，小米手机设置声音提示，请您参照：https://dev.mi.com/console/doc/detail?pId=1278%23_3_0。AndroidSound: Android 工程里 raw 目录中的铃声文件名，不需要后缀名。
 * @param android_offline_push_config_notify_mode   [TIMAndroidOfflinePushNotifyMode](), 读写, 当前消息的通知模式
 * @param android_offline_push_config_vivo_classification   读写，离线推送设置 VIVO 推送消息分类 (待废弃接口，VIVO 推送服务于 2023 年 4 月 3 日优化消息分类规则，推荐使用 kTIMAndroidOfflinePushConfigVIVOCategory 设置消息类别) ，VIVO 手机离线推送消息分类，0：运营消息，1：系统消息。默认取值为 1 。
 * @param android_offline_push_config_vivo_category 读写, 离线推送设置 VIVO 推送消息类别，详见：https://dev.vivo.com.cn/documentCenter/doc/359。(VIVO 推送服务于 2023 年 4 月 3 日优化消息分类规则，推荐使用 kTIMAndroidOfflinePushConfigVIVOCategory 设置消息类别，不需要再关注和设置 kTIMAndroidOfflinePushConfigVIVOClassification)
 * @param android_offline_push_config_oppo_channel_id   读写, 离线推送设置 OPPO 手机 8.0 系统及以上的渠道 ID（仅对 Android 生效）。
 */
interface AndroidOfflinePushConfig {
    android_offline_push_config_title: string;
    android_offline_push_config_sound: string;
    android_offline_push_config_notify_mode: TIMAndroidOfflinePushNotifyMode;
    android_offline_push_config_vivo_classification?: number;
    android_offline_push_config_vivo_category?: string;
    android_offline_push_config_oppo_channel_id?: string;
}

/**
 * @brief 消息定位符
 * @param message_locator_is_revoked message_locator_is_revoked：读写(必填), 要查找的消息是否是被撤回。true表示被撤回的，false表示未撤回的。默认为false
 * @param message_locator_time message_locator_time 读写(必填), 要查找的消息的时间戳
 * @param message_locator_seq message_locator_seq 读写(必填), 要查找的消息的序列号
 * @param message_locator_is_self message_locator_is_self 读写(必填), 要查找的消息的发送者是否是自己。true表示发送者是自己，false表示发送者不是自己。默认为false
 * @param message_locator_rand message_locator_rand 读写(必填), 要查找的消息随机码
 * @param message_locator_unique_id message_locator_unique_id 读写(必填), 要查找的消息的唯一标识
 */
interface Json_msg_locator {
    message_locator_is_revoked?: boolean;
    message_locator_time?: number;
    message_locator_seq?: number;
    message_locator_is_self?: boolean;
    message_locator_rand?: number;
    message_locator_unique_id?: number;
}

/**
 * @brief 下载元素接口的参数
 * @param msg_download_elem_param_flag msg_download_elem_param_flag 只写, 从消息元素里面取出来,元素的下载类型
 * @param msg_download_elem_param_type msg_download_elem_param_type [TIMDownloadType](), 只写, 从消息元素里面取出来,元素的类型
 * @param msg_download_elem_param_id msg_download_elem_param_id 只写, 从消息元素里面取出来,元素的ID
 * @param msg_download_elem_param_business_id msg_download_elem_param_business_id 只写, 从消息元素里面取出来,元素的BusinessID
 * @param msg_download_elem_param_url msg_download_elem_param_url 只写, 从消息元素里面取出来,元素URL
 */
interface Json_download_elem_param {
    msg_download_elem_param_flag?: number;
    msg_download_elem_param_type?: TIMDownloadType;
    msg_download_elem_param_id: string;
    msg_download_elem_param_business_id?: number;
    msg_download_elem_param_url: string;
}

/**
 *  @brief  消息删除接口的参数
 *  @param msg_delete_param_msg msg_delete_param_msg： object [Message](), 只写(选填), 指定在会话中要删除的消息
 *  @param  msg_delete_param_is_ramble msg_delete_param_is_ramble bool, 只写(选填), 是否删除本地/漫游所有消息。true删除漫游消息，false删除本地消息，默认值false
 */
interface Json_value_msgdelete {
    msg_delete_param_msg: Json_value_msg;
    msg_delete_param_is_ramble?: boolean;
}

interface Json_value_batchsend {
    msg_batch_send_param_identifier_array?: [string];
    msg_batch_send_param_msg?: Json_value_msg;
}

/**
 * @brief 消息搜索参数
 * @param msg_search_param_keyword_array msg_search_param_keyword_array： 只写(必填)，搜索关键字列表，最多支持5个。
 * @param msg_search_param_message_type_array msg_search_param_message_type_array：只写(选填), 指定搜索的消息类型集合，传入空数组，表示搜索支持的全部类型消息（FaceElem 和 GroupTipsElem 暂不支持）取值详见 TIMElemType。
 * @param msg_search_param_conv_id msg_search_param_conv_id 只写(选填)，会话 ID
 * @param msg_search_param_conv_type msg_search_param_conv_type 只写(选填), 会话类型，如果设置 kTIMConv_Invalid，代表搜索全部会话。否则，代表搜索指定会话。
 * @param msg_search_param_search_time_position msg_search_param_search_time_position：只写(选填), 搜索的起始时间点。默认为0即代表从现在开始搜索。UTC 时间戳，单位：秒
 * @param msg_search_param_search_time_period msg_search_param_search_time_period： 只写(选填), 从起始时间点开始的过去时间范围，单位秒。默认为0即代表不限制时间范围，传24x60x60代表过去一天。
 * @param msg_search_param_page_index msg_search_param_page_index： 只写(选填), 分页的页号：用于分页展示查找结果，从零开始起步。首次调用：通过参数 pageSize = 10, pageIndex = 0 调用 searchLocalMessage，从结果回调中的 totalCount 可以获知总共有多少条结果。计算页数：可以获知总页数：totalPage = (totalCount % loadCount == 0) ? (totalCount / pageIndex) : (totalCount / pageIndex + 1) 。再次调用：可以通过指定参数 pageIndex （pageIndex < totalPage）返回后续页号的结果。
 * @param msg_search_param_page_size msg_search_param_page_size：只写(选填), 每页结果数量：用于分页展示查找结果，如不希望分页可将其设置成 0，但如果结果太多，可能会带来性能问题。
 * @param msg_search_param_keyword_list_match_type msg_search_param_keyword_list_match_type：关键字进行 Or 或者 And 进行搜索
 * @param msg_search_param_send_indentifier_array msg_search_param_send_indentifier_array: 按照发送者的 userid 进行搜索
 *
 */
interface Json_search_message_param {
    msg_search_param_keyword_array?: string[];
    msg_search_param_message_type_array?: TIMElemType[];
    msg_search_param_conv_id?: string;
    msg_search_param_conv_type?: number;
    msg_search_param_search_time_position?: number;
    msg_search_param_search_time_period?: number;
    msg_search_param_page_index?: number;
    msg_search_param_page_size?: number;
    msg_search_param_keyword_list_match_type?: number;
    msg_search_param_send_identifier_array?: string[];
}
/**
 * @brief 消息获取接口的参数
 * @param msg_getmsglist_param_last_msg msg_getmsglist_param_last_msg:[Message](), 只写(选填), 指定的消息，不允许为null
 * @param msg_getmsglist_param_count msg_getmsglist_param_count: 只写(选填), 从指定消息往后的消息数
 * @param msg_getmsglist_param_is_ramble msg_getmsglist_param_is_ramble:只写(选填), 是否漫游消息
 * @param msg_getmsglist_param_is_forward msg_getmsglist_param_is_forward:只写(选填), 是否向前排序
 * @param msg_getmsglist_param_last_msg_seq msg_getmsglist_param_last_msg_seq:只写(选填), 指定的消息的 seq
 * @param msg_getmsglist_param_time_begin msg_getmsglist_param_time_begin:只写(选填), 开始时间；UTC 时间戳， 单位：秒
 * @param msg_getmsglist_param_time_period msg_getmsglist_param_time_period:只写(选填), 持续时间；单位：秒
 */
interface Json_get_msg_param {
    msg_getmsglist_param_last_msg?: Json_value_msg;
    msg_getmsglist_param_count?: number;
    msg_getmsglist_param_is_ramble?: boolean;
    msg_getmsglist_param_is_forward?: boolean;
    msg_getmsglist_param_last_msg_seq?: number;
    msg_getmsglist_param_time_begin?: number;
    msg_getmsglist_param_time_period?: number;
}

/**
 * @param user_data  user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 * @param callback TIMRecvNewMsgCallbackFunc
 */
interface TIMRecvNewMsgCallbackParams {
    callback: TIMRecvNewMsgCallbackFunc;
    user_data?: string;
}

/**
 * @param TIMMsgReadedReceiptCallbackFunc  TIMMsgReadedReceiptCallbackFunc
 * @param user_data user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 */
interface TIMMsgReadedReceiptCallbackParams {
    callback: TIMMsgReadedReceiptCallbackFunc;
    user_data?: string;
}
interface TIMSetMsgExtensionsChangedCallbackParam {
    callback: TIMSetMsgExtensionsChangedCallbackFun;
    user_data?: string;
}
/**
 * @param callback  TIMMsgRevokeCallbackFunc（泛型）
 * @param user_data user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 */
interface TIMMsgRevokeCallbackParams {
    callback: TIMMsgRevokeCallbackFunc;
    user_data?: string;
}

/**
 * @param callback TIMMsgElemUploadProgressCallbackFunc
 * @param user_data user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 */
interface TIMMsgElemUploadProgressCallbackParams {
    callback: TIMMsgElemUploadProgressCallbackFunc;
    user_data?: string;
}

/**
 * @param callback TIMMsgUpdateCallbackFunc
 * @param user_data user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 */
interface TIMMsgUpdateCallbackParams {
    callback: TIMMsgUpdateCallbackFunc;
    user_data?: string;
}
/**
 * @param json_msg_array json_msg_array：消息数组 // TODO这里message的内容有问题，是Array[String] 么？ 还是纯字符串过去
 * @param user_data user_data：用户自定义数据
 */
interface TIMRecvNewMsgCallbackFunc {
    (json_msg_array: string, user_data: string): void;
}
/**
 * 多媒体消息下载回调
 */
interface TIMMsgDownloadElemToPathFunc {
    (code: number, desc: string, json_param: string, user_data: string): void;
}
/**
 * @param json_msg_readed_receipt_array json_msg_readed_receipt_array：消息已读回执数组
 * @param user_data user_data：用户自定义数据
 */
interface TIMMsgReadedReceiptCallbackFunc {
    (json_msg_readed_receipt_array: string, user_data: string): void;
}
/**
 * @param json_msg_locator_array json_msg_locator_array：消息定位符数组
 * @param user_data user_data：用户自定义数据
 * @note 请以下方数据结构为准
 */
interface TIMMsgRevokeCallbackFunc {
    (json_msg_locator_array: string, user_data: string): void;
}

/**
 * @param json_msg json_msg：新消息
 * @param index index：上传 Elem 元素在 json_msg 消息的下标
 * @param cur_size cur_size：上传当前大小
 * @param local_size local_size：上传总大小
 * @param user_data user_data：ImSDK负责透传的用户自定义数据，未做任何处理
 * @note 请以下方数据结构为准
 */
interface TIMMsgElemUploadProgressCallbackFunc {
    (
        json_msg: string,
        index: number,
        cur_size: number,
        local_size: number, // TODO 这里似乎拼错了，应该是tototal
        user_data: string
    ): void;
}

/**
 * @param json_msg_array json_msg_array：消息数组
 * @param user_data user_data：用户自定义数据
 */
interface TIMMsgUpdateCallbackFunc {
    (json_msg_array: string, user_data: string): void;
}

/**
 * @param ImageElem ImageElem
 * @param TextElem TextElem
 * @param SoundElem SoundElem
 * @param CustomElem CustomElem
 * @param FileElem FileElem
 * @param VideoElem VideoElem
 * @param MergerElem MergerElem
 * @param FaceElem FaceElem
 */
interface Elem {
    elem_type?: number;
    // ImageElem?:ImageElem,
    // TextElem?:TextElem,
    // SoundElem?:SoundElem,
    // CustomElem?:CustomElem,
    // FileElem?:FileElem,
    // VideoElem?:VideoElem,
    // MergerElem?:MergerElem,
    // FaceElem?:FaceElem,
    // LocationElem?:LocationElem
}

interface ElemImageElem extends ImageElem {
    elem_type: number;
}

interface ElemTextElem extends TextElem {
    elem_type: number;
}

interface ElemSoundElem extends SoundElem {
    elem_type: number;
}

interface ElemCustomElem extends CustomElem {
    elem_type: number;
}

interface ElemFileElem extends FileElem {
    elem_type: number;
}

interface ElemVideoElem extends VideoElem {
    elem_type: number;
}
interface ElemMergerElem extends MergerElem {
    elem_type: number;
}
interface ElemFaceElem extends FaceElem {
    elem_type: number;
}
interface ElemLocationElem extends LocationElem {
    elem_type: number;
}

interface ElemGroupReportElem extends GroupReportElem {
    elem_type: number;
}

interface ElemGroupTipsElem extends GroupTipsElem {
    elem_type: number;
}

interface C2CRecvMsgOptResult {
    msg_recv_msg_opt_result_identifier: string;
    msg_recv_msg_opt_result_opt: TIMReceiveMessageOpt;
}

interface DownloadElemResult {
    msg_download_elem_result_current_size: number;
    msg_download_elem_result_total_size: number;
}

interface BatchSendResult {
    msg_batch_send_result_identifier: string;
    msg_batch_send_result_code: number;
    msg_batch_send_result_desc: string;
    msg_batch_send_result_msg: Json_value_msg;
}

interface MessageSearchResultItem {
    msg_search_result_item_conv_id: string;
    msg_search_result_item_conv_type: TIMConvType;
    msg_search_result_item_total_message_count: number;
    msg_search_result_item_message_array: Json_value_msg[];
}

interface MessageSearchResult {
    msg_search_result_total_count: number;
    msg_search_result_item_array: Array<MessageSearchResultItem>;
}
interface TIMSetMsgExtensionsChangedCallbackFun {
    (
        message_id: String,
        message_extension_array: MessageExtension[],
        user_data: string
    ): void;
}
interface TIMSetMsgExtensionsDeletedCallbackFun {
    (
        message_id: String,
        message_extension_key_array: MessageExtension[],
        user_data: string
    ): void;
}
interface TIMMsgSetMessageExtensionsFun {
    json_msg: string;
    json_extension_array: MessageExtension[];
    cb: Buffer;
    user_data: string;
}
interface TIMMsgGetMessageExtensionsFun {
    json_msg: string;
    cb: Buffer;
    user_data: string;
}
interface TIMMsgDeleteMessageExtensionsFun {
    json_msg: string;
    json_extension_key_array: MessageExtension[];
    cb: Buffer;
    user_data: string;
}

interface TIMSetMsgExtensionsDeletedCallbackParam {
    callback: TIMSetMsgExtensionsDeletedCallbackFun;
    user_data?: string;
}
interface TIMMsgSetMessageExtensionsParam {
    json_msg: Json_value_msg;
    json_extension_array: MessageExtension[];
    user_data: string;
}
interface TIMMsgGetMessageExtensionsParam {
    json_msg: Json_value_msg;
    user_data: string;
}
interface TIMMsgDeleteMessageExtensionsParam {
    json_msg: Json_value_msg;
    json_extension_key_array: MessageExtension[];
    user_data: string;
}
interface MessageExtension {
    message_extension_key: string;
    message_extension_value?: string;
}

interface MessageExtensionResult {
    message_extension_result_code: number;
    message_extension_result_info: string;
    message_extension_item: object;
}

/**
 * @brief 设置离线推送配置信息
 * @param offline_push_token_token 只写（选填）, 注册应用到厂商平台的 token。注意：填写为设备 Token 的 hex 字符串（即 base16 编码）。
 * @param offline_push_token_business_id 只写（选填），IM 控制台证书 ID
 * @param offline_push_token_type [TIMOfflinePushTokenType]()，厂商 token 类型。默认为 TIMOfflinePushTokenType_Default。其中 TIMOfflinePushTokenType_TPNS 为待废弃状态，如果您之前通过 TPNS 接入离线推送，并且在 TPNS 控制台配置推送信息，可以继续按照该方式接入推送功能。如果您从未接入 TPNS，从未在 TPNS 控制台配置推送信息，IM 将不在支持 TPNS 方式接入离线推送功能, 推荐参照如下方式接入：https://cloud.tencent.com/document/product/269/74284
 */
interface OfflinePushToken {
    param: {
        offline_push_token_token?: string;
        offline_push_token_business_id?: number;
        offline_push_token_type: TIMOfflinePushTokenType;
    };
    user_data: string;
}

interface TranslateTextParam {
    json_source_text_array: string[];
    source_language: string;
    target_language: string;
    user_data?: string;
}
interface MessageTranslateTextResult {
    msg_translate_text_source_text: string;
    msg_translate_text_target_text: string;
}

interface ConvertVoiceToTextParam {
    url: string;
    language: string;
    user_data?: string;
}
/**
 * @param json_msg_param 消息json
 * @param user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 */
interface SetLocalCustomDataParam {
    json_msg_param: Json_value_msg;
    user_data: string;
}
export {
    TIMMsgDeleteMessageExtensionsParam,
    TIMMsgGetMessageExtensionsParam,
    TIMMsgSetMessageExtensionsParam,
    TIMSetMsgExtensionsDeletedCallbackParam,
    TIMSetMsgExtensionsDeletedCallbackFun,
    TIMMsgSetMessageExtensionsFun,
    TIMMsgGetMessageExtensionsFun,
    TIMMsgDeleteMessageExtensionsFun,
    userProfile,
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
    TIMRecvNewMsgCallbackFunc,
    TIMMsgReadedReceiptCallbackFunc,
    TIMMsgRevokeCallbackFunc,
    TIMMsgElemUploadProgressCallbackFunc,
    TIMMsgUpdateCallbackFunc,
    TIMRecvNewMsgCallbackParams,
    TIMMsgReadedReceiptCallbackParams,
    TIMMsgRevokeCallbackParams,
    TIMMsgElemUploadProgressCallbackParams,
    TIMMsgUpdateCallbackParams,
    MsgModifyMessageParams,
    C2CRecvMsgOptResult,
    DownloadElemResult,
    BatchSendResult,
    MessageSearchResult,
    OfflinePushToken,
    TranslateTextParam,
    ConvertVoiceToTextParam,
    MessageTranslateTextResult,
    SetLocalCustomDataParam,
    // 文档需要导出，外部不使用这些inreface
    ImageElem,
    TextElem,
    SoundElem,
    CustomElem,
    FileElem,
    VideoElem,
    MergerElem,
    FaceElem,
    LocationElem,
    Json_value_msg,
    Json_msg_locator,
    Json_get_msg_param,
    Json_value_msgdelete,
    MsgSendReplyMessage,
    TIMSetMsgExtensionsChangedCallbackParam,
    MessageExtensionResult,
    MessageExtension,
    TIMMsgDownloadElemToPathFunc,
    OfflinePushConfig,
};

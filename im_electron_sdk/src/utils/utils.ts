import { app } from "electron";
const path = require("path");
const os = require("os");
const fs = require("fs");

const ffipaths: any = {
    linux: app.isPackaged
        ? path.resolve(process.resourcesPath, "linux/lib/libImSDK.so")
        : path.resolve(
              process.cwd(),
              "node_modules/im_electron_sdk/lib/linux/lib/libImSDK.so"
          ),
    linux_arm64: app.isPackaged
        ? path.resolve(process.resourcesPath, "linux/lib/libImSDK_arm64.so")
        : path.resolve(
              process.cwd(),
              "node_modules/im_electron_sdk/lib/linux/lib/libImSDK_arm64.so"
          ),
    x64: app.isPackaged
        ? path.resolve(process.resourcesPath, "windows/lib/Win64/ImSDK.dll")
        : path.resolve(
              process.cwd(),
              "node_modules/im_electron_sdk/lib/windows/lib/Win64/ImSDK.dll"
          ),
    ia32: app.isPackaged
        ? path.resolve(process.resourcesPath, "windows/lib/Win32/ImSDK.dll")
        : path.resolve(
              process.cwd(),
              "node_modules/im_electron_sdk/lib/windows/lib/Win32/ImSDK.dll"
          ),
    darwin: app.isPackaged
        ? path.resolve(
              process.resourcesPath,
              "mac/Versions/A/ImSDKForMac.dylib"
          )
        : path.resolve(
              process.cwd(),
              "node_modules/im_electron_sdk/lib/mac/Versions/A/ImSDKForMac.dylib"
          ),
};
function mkdirsSync(dirname: string) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}
function randomString(e = 6) {
    const t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
    const a = t.length;
    let n = "";
    for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n;
}
function getFFIPath() {
    let res = "";
    const platform = os.platform().toLowerCase();
    switch (platform) {
        case "linux":
            const linuxcpu = os.arch();
            if (linuxcpu == "arm64") res = ffipaths["linux_arm64"];
            else res = ffipaths[platform];
            break;
        case "win32":
            const cpu = os.arch();
            res = ffipaths[cpu];
            break;
        case "darwin":
            res = ffipaths[platform];
            break;
    }
    if (!res) {
        throw new Error(`tencent im sdk not support ${platform} os now.`);
        return;
    }
    return res;
}
function nodeStrigToCString(str: string): any {
    const buffer = Buffer.from(`${str}\0`, "utf8");
    return buffer;
}
function escapeUnicode(str: string) {
    return str.replace(
        /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]|[\u0001\u0002\u0003\u0004\u0005\u0006\u0007\u000b\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f]/g,
        function (a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        }
    );
}

export {
    getFFIPath,
    nodeStrigToCString,
    randomString,
    mkdirsSync,
    escapeUnicode,
};

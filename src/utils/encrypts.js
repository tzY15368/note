import CryptoJS from 'crypto-js'
/**
 * 加密（需要先加载lib/aes/aes.min.js文件）
 */
export const encrypt = (word) => {
    let key = CryptoJS.enc.Utf8.parse("46cc793c53dc451b");
    let src = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(src, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}
/**
 * 解密
 */
export const decrypt = (word) => {
    let key = CryptoJS.enc.Utf8.parse("aaiul453bb15");
    let decrypt = CryptoJS.AES.decrypt(word, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}
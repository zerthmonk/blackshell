// tiny module for encrypt/decrypt string with given salt

const byteHex = (n: number): string => ("0" + n.toString(16)).slice(-2);
const textToChars = (txt: string): number[] => txt.split("").map((c) => c.charCodeAt(0))
const applySaltToChar = (code: number, salt: string): number => textToChars(salt).reduce((a, b) => a ^ b, code)


const encrypt = (text: string, salt: string): string => {
    const applySalt = (code: number) => applySaltToChar(code, salt);

    return textToChars(text)
        .map(applySalt)
        .map(byteHex)
        .join("")
}

const decrypt = (encrypted: string, salt: string): string => {
    const applySalt = (code: number) => applySaltToChar(code, salt);
    const matched = encrypted.match(/../g)
    if (matched === null) throw new Error('text string mismatched and cannot be decrypted');

    return matched
        .map((hex) => parseInt(hex, 16))
        .map(applySalt)
        .map((charCode) => String.fromCharCode(charCode))
        .join("")
}

export {
    encrypt,
    decrypt
}
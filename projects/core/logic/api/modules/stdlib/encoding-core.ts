import { Result } from "./functional-core";

class ByteEncoding {
    private memo: Record<string, number[]>;

    fromOctets(bytes: number[]): Result<Error, string> {
        let string = "";
        let i = 0;
        while (i < bytes.length) {
            let octet = bytes[i];

            const getDataFromOctet = (octet: number) => ({
                [<any>true]: { bytesNeeded: 0, codePoint: 0 },
                [<any>(octet <= 0x7F)]: { bytesNeeded: 0, codePoint: octet & 0xFF },
                [<any>(octet <= 0xDF)]: { bytesNeeded: 0, codePoint: octet & 0x1F },
                [<any>(octet <= 0xEF)]: { bytesNeeded: 0, codePoint: octet & 0x0F },
                [<any>(octet <= 0xF4)]: { bytesNeeded: 0, codePoint: octet & 0x07 }
            }[<any>true])
    
            let { bytesNeeded, codePoint } = getDataFromOctet(octet);
    
            if (bytes.length - i - bytesNeeded > 0) {
                let k = 0;
                while (k < bytesNeeded) {
                    octet = bytes[i + k + 1];
                    codePoint = (codePoint << 6) | (octet & 0x3F);
                    k += 1;
                }
            } 
            else {
                codePoint = 0xFFFD;
                bytesNeeded = bytes.length - i;
            }
    
            string += String.fromCodePoint(codePoint);
            i += bytesNeeded + 1;
        }
    
        return Result.right(string);
    }

    toOctets(string: string): Result<Error, number[]> {
        if(this.memo[string]) {
            return Result.right(this.memo[string]);
        }
    
        const octets = [];
        const length = string.length;
    
        let i = 0;
    
        const getDataFromCodePoint = (codePoint: number) => ({
            [<any>true]: { c: 0, bits: 0 },
            [<any>(codePoint <= 0x0000007F)]: { c: 0, bits: 0x00 },
            [<any>(codePoint <= 0x000007FF)]: { c: 6, bits: 0xC0 },
            [<any>(codePoint <= 0x0000FFFF)]: { c: 12, bits: 0xE0 },
            [<any>(codePoint <= 0x001FFFFF)]: { c: 18, bits: 0xF0 }
        }[<any>true])
    
        while (i < length) {
            const codePoint = string.codePointAt(i);
    
            let { c, bits } = getDataFromCodePoint(codePoint);
    
            octets.push(bits | (codePoint >> c));
    
            c -= 6;
    
            while (c >= 0) {
                octets.push(0x80 | ((codePoint >> c) & 0x3F));
                c -= 6;
            }
    
            i += codePoint >= 0x10000 ? 2 : 1;
        }
    
        this.memo[string] = octets;
        return Result.right(octets);
    }
}

export { ByteEncoding }
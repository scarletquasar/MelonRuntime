class TextDecoder {
    decode(octets: number[]) {
        let string = "";
        let i = 0;
        while (i < octets.length) {
            let octet = octets[i];

            const getDataFromOctet = (octet: number) => ({
                [<any>true]: { bytesNeeded: 0, codePoint: 0 },
                [<any>(octet <= 0x7F)]: { bytesNeeded: 0, codePoint: octet & 0xFF },
                [<any>(octet <= 0xDF)]: { bytesNeeded: 0, codePoint: octet & 0x1F },
                [<any>(octet <= 0xEF)]: { bytesNeeded: 0, codePoint: octet & 0x0F },
                [<any>(octet <= 0xF4)]: { bytesNeeded: 0, codePoint: octet & 0x07 }
            }[<any>true])
    
            let { bytesNeeded, codePoint } = getDataFromOctet(octet);
    
            if (octets.length - i - bytesNeeded > 0) {
                let k = 0;
                while (k < bytesNeeded) {
                    octet = octets[i + k + 1];
                    codePoint = (codePoint << 6) | (octet & 0x3F);
                    k += 1;
                }
            } 
            else {
                codePoint = 0xFFFD;
                bytesNeeded = octets.length - i;
            }
    
            string += String.fromCodePoint(codePoint);
            i += bytesNeeded + 1;
        }
    
        return string;
    }
}

export { TextDecoder }
class TextEncoder {
    _memo: Record<string, number[]> = {};
    encode(string: string) {
        if(this._memo[string]) {
            return this._memo[string];
        }
    
        const octets = [];
        const length = string.length;
    
        let i = 0;
    
        const getDataFromCodePoint = (codePoint: number) => ({
            [<any>(codePoint <= 0x0000007F)]: { c: 0, bits: 0x00 },
            [<any>(codePoint <= 0x000007FF)]: { c: 6, bits: 0xC0 },
            [<any>(codePoint <= 0x0000FFFF)]: { c: 12, bits: 0xE0 },
            [<any>(codePoint <= 0x001FFFFF)]: { c: 18, bits: 0xF0 },
            [<any>true]: { c: 0, bits: 0 }
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
    
        this._memo[string] = octets;
        return octets;
    }
}

export { TextEncoder }
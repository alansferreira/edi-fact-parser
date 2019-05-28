

export class RegexUtil {
    static getAll(inputContent: string, regex: RegExp): RegExpMatchArray[]{
        const result: RegExpMatchArray[] = [];
        let m;
        regex.lastIndex = -1;
    
        while ((m = regex.exec(inputContent)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            result.push(m);
        }
        return result;
    }
}


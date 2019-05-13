
export const mainRegex: RegExp = /([\w]{3})\+?([^\']+)?\'/igm;

/**
 * Data Models based on https://www.unece.org/trade/untdid/texts/d422_d.htm
 * 
 * Documentation downloads on http://www.unece.org/tradewelcome/un-centre-for-trade-facilitation-and-e-business-uncefact/outputs/standards/unedifact/directories/download.html
 * 
 */

/**
 * [a-ZA-Z0-9] or ([a-ZA-Z0-9])\:([a-ZA-Z0-9])
 * Simple or Composite data element
 */
export interface IDataElement {
    isComposite: boolean;
    singleValue?: string | number;
    compositeValue?: Array<string | number>;
}

/**
 * ([A-Z]{3})(\:[^\+]+)?\+
 * A segment code and, if explicit indication, repeating and nesting value(s). 
 * See 8.1 and 9.
 */
export interface ITag {
    code: string;
    value?: any;
}
/**
 * 
 * 
 */
export interface IDataSegment {
    tag: ITag;
    dataElements?: Array<IDataElement>;
}
/**
 * Service string advice, if used
 */
export interface IUNA extends IDataSegment {
    tag: {code: "UNA"}
}
/**
 * Interchange header, mandatory
 */
export interface IUNB extends IDataSegment {
    tag: {code: "UNB"}
}

/**
 * Interchange trailer
 */
export interface IUNZ extends IDataSegment {
    tag: {code: "UNZ"}
}
export interface IUNG extends IDataSegment {
    tag: {code: "UNG"}
}
export interface IUNH extends IDataSegment {
    tag: {code: "UNH"}
}
export interface IUNT extends IDataSegment {
    tag: {code: "UNT"}
}
export interface IUNE extends IDataSegment {
    tag: {code: "UNE"}
}

export interface IInterchange {
    /**
     * Service String Advice
     */
    una?: IUNA;
    /**
     * Interchange Header
     */
    unb: IUNB;
    /**
     * Functional Group Header
     */
    ung?: IUNG;
    /**
     * Message Header
     */
    unh: IUNH;
    
    /**
     * User Data Segments
     */
    messages: Array<IDataSegment>;
    
    /**
     * Message Trailer
     */
    unt: IUNT;
    /**
     * Functional Group Trailer
     */
    une?: IUNE;
    /**
     * Interchange Trailer
     */
    unz: IUNZ;
}


// export interface IDataElement extends String {
//     index: number;
// }
// export interface ISegment {
//     /**
//      * Field tag name like: 
//      * "DTM+64:20180919:102'" => "DTM"
//      */
//     tagName: string;
    
//     /**
//      * @see https://www.unece.org/trade/untdid/texts/d422_d.htm#ab
//      */
//     dataElements?: IDataElement[];
    
//     level?: number;
//     /**
//      * Field value any value between ":" and "'" like: 
//      * "DTM+64:20180919:102'" => "20180919:102"
//      */
//     value: string;

//     /**
//      * value splitted by "+"
//      */
//     splittedValue?: string[],

//     source: string;
    
//     bounds: {
//         index: number,
//         length: number
//     };

//     children?: ISegment[];
// }

export interface IParser<T> {
    
    deserialize: (content: string) => T[] | T | null
    serialize: (obj: T) => string | null

}

// /**
//  * USAGE Sample
//  */
// const ccc: IInterchange = {
//     una: {tag: {code: "UNA"}},
//     unb: {tag: {code: "UNB"}},
//     unh: {tag: {code: "UNH"}},
//     unt: {tag: {code: "UNT"}},
//     unz: {tag: {code: "UNZ"}},
//     messages: []
// };

// const msg = ccc.messages[0];
// if(msg){
//     console.log(msg.tag);
    
//     if(msg.dataElements && msg.dataElements[0]){
//         console.log(msg.dataElements[0].value);
//     }
// }

import { Service } from "typedi";
import { IParser, IDataSegment, IDataElement} from "./interfaces.model";
import { RegexUtil } from "../../util/regex.util";
import { DataElementParser } from "./data-element.parser";


@Service()
export class DataSegmentParser implements IParser<IDataSegment> {
    readonly keyName: string = '';
    readonly regex = /([A-Z]{3})([^\+]+)?[\+\']([^\']+)?\'/igm;

    dataElementParser: DataElementParser;
    
    
    constructor() {
        this.dataElementParser = new DataElementParser();
     }
    

    /**
     * 
     * @param rawDataSegment Full data segment "TAG+...'"
     */
    deserialize(rawDataSegment: string): IDataSegment[] {
        const groups = RegexUtil.getAll(rawDataSegment, this.regex);
        
        return groups.map(g => {
            const source = g[0];
            const tagName = g[1];
            const indexKey = g[2];
            const value = g[3];
            const splittedValue = value.split("+");
            const bounds = {
                index: g.index, 
                length: g.length
            };

            let indexArr: Array<number> = [];
            if(indexKey && indexKey.length > 0){
                indexArr = indexKey.substr(1).split(':').map(i => Number.parseInt(i));
            }
            

            let dataElements: IDataElement[] = [];
            
            if(this.dataElementParser) {
                splittedValue.map(v => {
                    this.dataElementParser.deserialize(v).map(el => {
                        dataElements.push(el);
                    });
                });
            }
        
            return <IDataSegment>{
                tag: {code: tagName, indexKey: indexArr},
                dataElements
            };
        });




    }

    serialize(obj: IDataSegment[]): string | null {
        return obj.map((ds: IDataSegment) => {
            if (ds.tag && ds.tag.value){
                return `${ds.tag.code}:${ds.tag.value}+${this.dataElementParser.serialize(ds.dataElements || [])}`;
            } else {
                return `${ds.tag.code}+${this.dataElementParser.serialize(ds.dataElements || [])}`;
            }
        }).join('\'\n') + '\'';
    }
}
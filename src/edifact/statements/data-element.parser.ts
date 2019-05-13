import { Service } from "typedi";
import { IParser, IDataElement } from "./interfaces.model";


@Service()
export class DataElementParser implements IParser<IDataElement> {

    constructor() { }

    /**
     * 
     * @param rawDataElement Just data element after first '+' symbol
     */
    deserialize(rawDataElement: string): IDataElement[] {
        const elements = rawDataElement.split('+');

        return elements.map(el => {
            const isComposite = (el.indexOf(':') != -1);
            return <IDataElement>{
                isComposite: isComposite,
                singleValue: (!isComposite ? el : undefined),
                compositeValue: (isComposite ? el.split(':') : undefined)
            };
        });
    }

    serialize(obj: IDataElement): string | null {

        return null;
    }
}
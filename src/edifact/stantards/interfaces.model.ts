import { IDataSegment } from "../parser";
import { IMap } from "../../util/imap";
import { version } from "punycode";
import Container from 'typedi';


export interface IEDIFactDocument {
    dataSegments: IDataSegment[];
    translatedDocument: any;
}


export interface IDocumentStandardService<T extends IEDIFactDocument> {
    deserialize(document: string): T;
    serialize(document: IEDIFactDocument): T;
}




export interface IDocumentStantardServiceMetadadata<T extends IEDIFactDocument>{
    instance: IDocumentStandardService<T>;
    match: RegExp;
    version: string;
}

const registredStandardsByVersion: IMap<IDocumentStantardServiceMetadadata<IEDIFactDocument>> = {};

/**
 * This decorator must be called with @Service in an class definition
 * @param value 
 */
export function DocumentStandardService(value: {match: RegExp, version: string}) {
    console.log(`@DocumentStandardService: evaluated - ${value.version}`);
    return function (target: any) {
        console.log(`@DocumentStandardService: called - ${value.version}`);
        console.log(target);
        if (registredStandardsByVersion[value.version]) {
            throw new Error(`Document service aleady has registred with this version '${value.version}'!`);
        }

        registredStandardsByVersion[value.version] = <IDocumentStantardServiceMetadadata<IEDIFactDocument>>{
            instance: Container.get(target), 
            version: value.version, 
            match: value.match
        };
    }
}


export function getDocumentService(document: string): IDocumentStandardService<IEDIFactDocument> | null {
    return registredStandardsByVersion[document].instance;
}
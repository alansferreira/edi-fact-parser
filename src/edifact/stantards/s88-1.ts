import { IDocumentStandardService, DocumentStandardService, IEDIFactDocument } from "./interfaces.model";


@DocumentStandardService({match: /./g, version: 'S88.1'})
export class EDIFACT_881 implements IDocumentStandardService<IEDIFactDocument> {
    
    deserialize(document: string): IEDIFactDocument {
        throw new Error("Method not implemented.");
    }
    
    serialize(document: import("./interfaces.model").IEDIFactDocument): import("./interfaces.model").IEDIFactDocument {
        throw new Error("Method not implemented.");
    }


}
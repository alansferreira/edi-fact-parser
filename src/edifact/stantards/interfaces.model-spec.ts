import "reflect-metadata";
import { expect } from 'chai';
import { describe } from 'mocha';
import Container from "typedi";
import { DocumentStandardService, IDocumentStandardService, IEDIFactDocument, getDocumentService } from './interfaces.model';
import { Service } from 'typedi';

@Service()
@DocumentStandardService({match: /./g, version: 'adsad'})
export class SampleStandardService implements IDocumentStandardService<IEDIFactDocument> {
    
    deserialize(document: string): IEDIFactDocument {
        throw new Error("Method not implemented.");
    }
    
    serialize(document: import("./interfaces.model").IEDIFactDocument): import("./interfaces.model").IEDIFactDocument {
        throw new Error("Method not implemented.");
    }


}

describe('Test Data Element Parser', () => {
    it('should deserialize generic simple and composite data elements', async () => {
        try {
            const sampleService = getDocumentService('adsad');
            expect(sampleService).to.not.null;
        } catch (error) {
            throw new Error(error);
        }
    });
});
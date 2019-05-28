import "reflect-metadata";
import { expect } from 'chai';
import { describe } from 'mocha';
import Container from "typedi";
import { DataElementParser } from './data-element.parser';


describe('Test Data Element Parser', () => {
    const dataElementParser = Container.get(DataElementParser);

    it('should deserialize generic simple and composite data elements', async () => {        
        try {
            const dataElement = 'simpledata+composite:data+super:composite:data';

            const des = dataElementParser.deserialize(dataElement);
            
            expect(des).to.not.null;
            expect(des).to.not.length(0, `no value founded in '${dataElement}'!`);
            
            expect(des[0].singleValue).to.equal('simpledata', `'simpledata' not found!`);

            expect(des[1].compositeValue).to.not.length(0, `'composite' value error!`);
            if(des[1].compositeValue){
                expect(des[1].compositeValue[0]).to.not.length(0, `'composite' value error!`);
                expect(des[1].compositeValue[1]).to.not.length(0, `'data' value error!`);
            }

            expect(des[2].compositeValue).to.not.length(0, `'composite' value error!`);
            if(des[2].compositeValue){
                expect(des[2].compositeValue[0]).to.not.length(0, `'super' value error!`);
                expect(des[2].compositeValue[1]).to.not.length(0, `'composite' value error!`);
                expect(des[2].compositeValue[2]).to.not.length(0, `'data' value error!`);
            }
            
        } catch (error) {
            throw new Error(error);
        }
    });


    it('should serialize generic simple and composite data elements', async () => {        
        try {
            const dataElement = 'simpledata+composite:data+super:composite:data';

            const des = dataElementParser.deserialize(dataElement);
            
            const reSerialized = dataElementParser.serialize(des);

            expect(reSerialized).to.not.null;
            expect(reSerialized).to.equal(dataElement, `serialization is diferent of original data! '${dataElement}'!`);
            
        } catch (error) {
            throw new Error(error);
        }
    });

});
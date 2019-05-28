import "reflect-metadata";
import { expect } from 'chai';
import { describe } from 'mocha';
import Container from "typedi";
import { DataSegmentParser } from './data-segment.parser';
import * as fs from 'fs';

describe('Test Generic Statement', () => {
    const dataSegmentParser = Container.get(DataSegmentParser);
    const sampleGenericStetements = [
        "UNH+.......data.........'",
        "AAA+.......data.........'",
        "GDS:1+.......data.........'",
        "GDS:2+.......data.........'",
        "GDS:3+.......data.........'",
        "BBB+.......data.........'",
        "FTX:1+.......data.........'",
        "UNT+.......data.........'"
    ];

    it('should deserialize generic statements  ', async () => {        
        try {
            sampleGenericStetements.map((stmt) => {
                const result = dataSegmentParser.deserialize(stmt);
                
                const ds = result[0];

                expect(ds).to.not.null;
                expect(ds.dataElements).to.not.length(0, `no value founded in '${stmt}'!`);
                if(ds.dataElements){
                    expect(ds.dataElements[0].singleValue).to.eq(".......data.........", `no value founded in '${stmt}'!`);
                }
                
            })

        } catch (error) {
            throw new Error(error);
        }
    });

    it('should deserialize full edifact file  ', async () => {        
        try {
            const sampleFile1 = 'samples/sample-1.edi';
            const fullcontent = fs.readFileSync(sampleFile1).toString();
            
            const dss = dataSegmentParser.deserialize(fullcontent);
            
            console.log(JSON.stringify(dss));
            
            const ds = dss[0];

            expect(ds).to.not.null;
            expect(ds.dataElements).to.not.length(0, `no value founded in '${sampleFile1}'!`);
            // if(ds.dataElements){
            //     expect(ds.dataElements[0].singleValue).to.eq(".......data.........", `no value founded in '${sampleFile1}'!`);
            // }

        } catch (error) {
            throw new Error(error);
        }
    });
    it('should serialize generic simple and composite data elements', async () => {        
        try {
            const sampleFile1 = 'samples/sample-1.edi';
            const outSampleFile1 = 'samples/out-sample-1.edi';

            const fullcontent = fs.readFileSync(sampleFile1).toString();
            
            const dss = dataSegmentParser.deserialize(fullcontent);
            
            const reSerialized = dataSegmentParser.serialize(dss);
            
            fs.writeFileSync(outSampleFile1, reSerialized);

            expect(reSerialized).to.not.null;
            expect(reSerialized).to.equal(fullcontent, `serialization is diferent of original data! '${fullcontent}'!`);
            
        } catch (error) {
            throw new Error(error);
        }
    });

});
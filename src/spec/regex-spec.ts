import "reflect-metadata";
import { expect } from 'chai';
import { describe } from 'mocha';
import { RegexUtil } from '../regex.util';


describe('Test Regexes espressions for Statements', () => {
    // const sampleGenericStetements = [
    //     "UNH+.......data.........'",
    //     "AAA+.......data.........'",
    //     "GDS:1+.......data.........'",
    //     "GDS:2+.......data.........'",
    //     "GDS:3+.......data.........'",
    //     "BBB+.......data.........'",
    //     "FTX:1+.......data.........'",
    //     "UNT+.......data.........'"
    // ];

    it('should parse simple statement  ', async () => {        
        try {
            const s = "UNH+.......data.........'";
            const stmtRegex = /([A-Z]{3})([^\+]+)?[\+\']([^\']+)?\'/gm;

            const result = RegexUtil.getAll(s, stmtRegex);
            
            expect(result).to.not.null;
            expect(result[0][1]).to.equal('UNH', `no tag founded in '${s}'!`);
            expect(result[0][2]).to.equal('UNH', `no tag info founded in '${s}'!`);

        } catch (error) {
            throw new Error(error);
        }
    });
});
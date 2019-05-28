import "reflect-metadata";
// import Container from 'typedi';
import { expect } from 'chai';
import { describe } from 'mocha';
import { RegexUtil } from "./regex.util";
import * as fs from 'fs';

describe('Test Regex utils Functions', () => {
    it('should iterate all groups  ', async () => {
        // const input = new String(fs.readFileSync("samples/sample-1.edi")).toString();
        const input = fs.readFileSync("samples/sample-1.edi").toString();
        
        try {
            const result = RegexUtil.getAll(input, /(([\w]{3})\+(([a-zA-Z0-9\+]+)\:)?)([^\']+)\'/gm);
            
            expect(result).to.not.null;
            expect(result).to.not.length(0, "no expressions founded!");

        } catch (error) {
            throw new Error(error);
        }
    });
});
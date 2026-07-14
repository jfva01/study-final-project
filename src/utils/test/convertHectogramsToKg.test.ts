import { describe, it, expect } from "vitest"
import { convertHectogramsToKg } from "../convertHectogramsToKg"

const testData=[
    [1,"0.10"],
    [2,"0.20"],
    [10,"1.00"],
    [100,"10.00"],
];

describe("convertHectogramsToKg", () =>{
    it.each(testData)("should convert %s hectograms to %s kg", (hg, expected)=>{
        expect(convertHectogramsToKg(Number(hg))).toBe(expected);
    });
})
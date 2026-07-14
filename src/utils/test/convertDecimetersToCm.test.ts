import { describe, it, expect } from "vitest"
import { convertDecimetresToCm } from "../convertDecimetresToCm"

const testData=[
    [1,"10.00"],
    [2,"20.00"],
    [10,"100.00"],
    [100,"1000.00"],
];

describe("convertDecimetresToCm", () =>{
    it.each(testData)("should convert %s decimeters to %s cm", (dm, expected)=>{
        expect(convertDecimetresToCm(Number(dm))).toBe(expected);
    });
})
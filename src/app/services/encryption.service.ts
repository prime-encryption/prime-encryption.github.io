import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { PRIME_NUMBERS, ALL_CHARS } from '../scripts/constants';

@Injectable({
    providedIn: 'root'
})
export class EncryptionService {

    constructor() { }

    encrypt(key: string, text: string): string {
        let ret: string = "";
        let primeConversionResults: string[] = [];

        //! step 1
        // hash the key
        let keyHash: number = hash(key);
        console.log(keyHash, keyHash % 128);
        

        //! step 2
        // create character and prime number table
        let charTable = new CharacterAndPrimesTable();

        //! step 3
        // add characters from the key to the table
        for (const char of key) {
            charTable.addCharacter(char);
        }

        //! step 4
        // process the message
        for (const char of text) {
            // translate character to a prime number
            // add the character to the char table
            let result = BigInt(charTable.charToPrime(char));
            // multiply by key integer
            result *= BigInt(keyHash);
            // push result into results array
            primeConversionResults.push(result.toString(16));
        }

        //! step 5
        // reverse the output array
        primeConversionResults.reverse();

        //! step 6
        // concatenate the array
        let primeConversionString: string = primeConversionResults.join(' ');
        // ret = primeConversionString;

        //! step 7
        // process the conversion string
        for (let i = 0; i < primeConversionString.length; i++) {
            // get char code of the current character
            let char = primeConversionString[i];
            let charCode = char.charCodeAt(0);
            // get char code of the previous character (user 0 if first character)
            let prevChar = primeConversionString[i-1];
            let prevCharCode = prevChar?.charCodeAt(0) ?? keyHash % 128;
            // sum the two values, and convert to hex
            let sum = charCode + prevCharCode;
            let sumHex = sum.toString(16);
            // add leading zero if necessary
            while (sumHex.length <= 1) sumHex = '0'+sumHex;
            // add to output string
            ret += sumHex
        }

        //! return the encoded string
        return ret;
    }
    decrypt(key: string, text: string): string {
        let ret: string = "";

        //! step 1
        // hash the key
        let keyHash: number = hash(key);

        //! step 2
        // create character and prime number table
        let charTable = new CharacterAndPrimesTable();

        //! step 3
        // add characters from the key to the table
        for (const char of key) {
            charTable.addCharacter(char);
        }

        //! step 4
        // divide text into two-letter parts (single bytes)
        let strBytes = text.match(/..?/g) ?? [];

        //! step 5
        // convert hex values back to individual characters
        let intermediateString = "";
        for (let i = 0; i < strBytes.length; i++) {
            let hex = strBytes[i];
            let int = parseInt(hex, 16);
            if (i == 0) {
                int -= keyHash % 128;
            }
            else {
                int -= intermediateString.charCodeAt(i-1);
            }
            intermediateString += String.fromCharCode(int);
        }
        
        //! step 6
        // split the string by spaces
        // reverse the array
        // convert the individual values into bigints
        let intermediateArr = intermediateString.split(' ').reverse();
        let bigIntArr: bigint[] = [];
        for (let i = 0; i < intermediateArr.length; i++) {
            bigIntArr.push(BigInt('0x'+intermediateArr[i]));
        }

        //! step 7
        // process individual bigints
        for (const int of bigIntArr) {
            let prime = int / BigInt(keyHash);
            console.log(prime);
            
            let char = charTable.primeToChar(Number(prime));
            ret += char;
        }

        return ret;
    }
}

/**
 * Creates an integer hash from the specified string.
 * @source https://gist.github.com/iperelivskiy/4110988
 */
function hash(s: string): number {
    var a = 1, c = 0, h, o;
    if (s) {
        a = 0;
        for (h = s.length - 1; h >= 0; h--) {
            o = s.charCodeAt(h);
            a = (a << 6 & 268435455) + o + (o << 14);
            c = a & 266338304;
            a = c !== 0 ? a ^ c >> 21 : a;
        }
    }
    return a;
}

class Stack<Type> {
    private _arr: Type[] = [];
    constructor(startingValues: Type[]) {
        for (const val of startingValues) {
            this._add(val);
        }
    }

    /**
     * Removes the specified value from the stack, if the value is present.
     */
    private _remove(value: Type) {
        let index = this._arr.indexOf(value);
        if (index == -1) return;
        this._arr.splice(index, 1);
    }
    /**
     * Adds the specified value to the top of the stack.
     */
    private _add(value: Type) {
        this._arr.push(value);
    }
    /**
     * Removes the specified value from the stack and adds it back to the top.
     */
    moveToTop(value: Type) {
        this._remove(value);
        this._add(value);
    }
    /**
     * Returns the index of the specified value.
     */
    indexOf(value: Type): number {
        return this._arr.indexOf(value);
    }
    valueAt(index: number): Type {
        return this._arr[index];
    }
}
class CharacterAndPrimesTable {
    private _charStack = new Stack<string>([...ALL_CHARS]);
    private _primeArr = PRIME_NUMBERS;
    
    /**
     * Removes the specified value from the stack and adds it back to the top, returning nothing.
     */
    addCharacter(character: string): void {
        this._charStack.moveToTop(character);
    }
    /**
     * Returns the prime number with the same index as the character on the stack.
     * 
     * Moves that character to the top of the stack afterwards.
     */
    charToPrime(character: string): number {
        this.checkIfValid(character);
        let index = this._charStack.indexOf(character);
        this._charStack.moveToTop(character);
        return this._primeArr[index];
    }
    primeToChar(num: number): string {
        let index = this._primeArr.indexOf(num);
        let char = this._charStack.valueAt(index);
        console.log(this._charStack);
        
        this._charStack.moveToTop(char);
        return char;
    }
    checkIfValid(val: string) {
        if (this._charStack.indexOf(val) == -1) throw new Error("Invalid character in the text box");
    }
}
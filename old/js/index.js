const allChars = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
const allCharsArr = Array.from(allChars);

let primesArrayData = [];
(async function() {
    const requestURL = './js/primes.json';
    const request = new Request(requestURL);
    
    const response = await fetch(request);
    primesArrayData = await response.json();
})();
let primesArray = [];

let encryptTextfield = $('#e-text');
let decryptTextfield = $('#d-text');
let encryptButton = $('#e-submit');
let decryptButton = $('#d-submit');

encryptButton.on('click', function() {
    try {
        encrypt(
            $('#e-text').val(),
            $('#e-key').val(),
            $('#e-out'),
        );
    } catch (err) {
        alert('An error occured.');
        console.error(err);
    }
});
decryptButton.on('click', function() {
    try {
        decrypt(
            $('#d-text').val(),
            $('#d-key').val(),
            $('#d-out'),
        );
    } catch (err) {
        console.error(err);
        alert('An error occured.');
    }
});

function encrypt(text, key, destination) {
    primesArray = Array.from(primesArrayData);
    let keyInt = processKey(key);
    let bigInt = 1n;
    for (const char of text) {
        bigInt = multiplyByCharacter(bigInt, char);
    }
    bigInt *= keyInt;
    bigInt -= keyInt;
    destination.val(bigInt.toString(32));
}
function getUniqueChars(text, key) {
    let textArr = [...Array.from(key ?? []), ...Array.from(text)];
    textArr.reverse();
    textArr = [...new Set(textArr)];
    textArr.reverse();
    return textArr;
}
function processKey(key) {
    let uniqueChars = getUniqueChars(key);
    for (const char of uniqueChars) {
        primesArray.splice(allCharsArr.indexOf(char));
    }
    let keyInt = 1n;
    for (const char of key) {
        keyInt = multiplyByCharacter(keyInt, char, true);
    }
    keyInt = keyInt - BigInt(key.length);
    let keyIntStr = keyInt.toString();
    for (let num of keyIntStr) {
        num = Number(num);
        primesArray.splice(num, 1);
    }
    return keyInt;
}
function multiplyByCharacter(bigint, char, charCode = false) {
    let index = allCharsArr.indexOf(char);
    return bigint *= BigInt(primesArray[index]) * (charCode ? BigInt(char.charCodeAt(0)) : 1n);
}

function decrypt(text, key, destination) {

}
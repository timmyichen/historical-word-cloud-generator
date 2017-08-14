const axios = require('axios');

function simplePrepareText(text) {
    return text.toLowerCase()
        .replace(/[.,;:!?'"\[\]\(\)\{\}]+/g, '')
        .replace(/\n/g,' ')
        .replace(/\s\s+/g, ' ');
}

function getStopWords() {
    return new Promise((resolve, reject) => {
        axios.get('./assets/stopWords.txt').then((response) => {
            resolve(response.data);
        })
        .catch((reason) => {
            reject(`error in parsing stop words\n${reason}`);
        });
    });
}

function prepareText(string) {
    let words = string.replace(/[.,;:!?"\[\]\(\)\{\}]+/g, '').split(/[\s/]+/g);
    
    //check for and remove symbols
    const new_words = [];
    words.forEach((word) => {
        const word_split = word.split(/[']+/g);
        if (word_split[word_split.length-1].length <= 2) {
            word_split.splice(-1);
            new_words.push(word_split.join(''));
        } else {
            new_words.push(word.replace(/'/gi, ''));
        }
    });
    words = new_words;
    
    // remove only numbers and empty spaces
    words = words.filter((word) => word === '' || !(word.search(/^[0-9]*$/g) === 0) );
    
    const count = {};
    words.forEach((word) => {
        if (word.replace(/[^A-Z]/g, '').length < 2) word = word.toLowerCase();

        if (word in count) {
            count[word]++;
        } else {
            count[word] = 1;
        }
    });
    
    const final = [];
    const wordKeys = Object.keys(count);
    for (let word in wordKeys) {
        final.push({
            text: wordKeys[word],
            size: count[wordKeys[word]],
        });
    }
    final.sort((a,b) => {
        if (a.size > b.size) {
            return -1;
        } else if (a.size < b.size) {
            return 1;
        } else {
            return 0;
        }
    });
    return final.slice(0,200);
}

function prepareStopWords(string) {
    return string.replace(/ /g, '').split('\n');
}

function removeStopWords(wordsObj, stopWords) {
    return wordsObj.filter(word => stopWords.indexOf(word.text.toLowerCase()) < 0 && word.text !== '');
}

function removePossibleErrors(wordsObj, charThreshold, wordsList) {
    return wordsObj.filter(word => 
        !(word.text.length <= charThreshold &&
        word.text.toLowerCase() === word.text &&
        !wordsList[word.text])
    );
}

module.exports = {
    simplePrepareText,
    getStopWords,
    prepareText,
    prepareStopWords,
    removeStopWords,
    removePossibleErrors,
};

//need to:
// - replace words with highlighted spans (JSX)
// - determine whether to be case insensitive
// - determine whether word is possessive
// - fix spaces with nbsp
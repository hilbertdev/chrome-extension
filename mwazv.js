const vowels = 'a,e,i,o,u'.split(',');
function removeVowels(word) {
    word = word.split('');
    var consonants = '';
    word.forEach((letter, index)=> {
       if(vowels.indexOf(letter) == -1){
           consonants += letter;
       }
    })
    return consonants;
} 

var noVowels = removeVowels('abcdefghtiklmono');
console.log(noVowels);


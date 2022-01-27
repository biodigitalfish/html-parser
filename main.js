//https://regexr.com/
const fs = require("fs");

const TAG_MATCH = /<\/?[A-Z]>/g;

const _checkTags = (tags) => {
  // impl goes here
  // check if input type is Array

  // array should first be even number, an unven number means there is a missing opening or closing tag somewhere

  if (!Array.isArray(tags) || !tags.length > 1) {
    console.log("No Tags found");
    return false;
  }
  console.log("Tags:", tags);

  // query and return faults from inner children first
  const arrayHalf = Math.ceil(tags.length / 2) - 1;
  // console.log("halfArray:", arrayHalf);
  let iStart = arrayHalf; // array is 0 index, minus 1 from array middle for start point
  let iEnd = arrayHalf + 1;
  let lastMatch = undefined;
  let bool_correct = true;
  do {
    const firstItem = tags[iStart];
    const lastItem = tags[iEnd];
    console.log("first:", firstItem, "last:", lastItem);
    const closingTag = firstItem.slice(0, 1) + "/" + firstItem.slice(1);
    console.log(
      "Closing Tag:",
      typeof closingTag,
      closingTag,
      "vs",
      typeof lastItem,
      lastItem,
      closingTag === lastItem
    );
    lastMatch = closingTag;

    if (closingTag !== lastItem) {
      bool_correct = false;
      console.log(`Expected ${closingTag} found ${lastItem}`);
      break;
    }
    iStart -= 1;
    iEnd += 1;
    // console.log("iStart:", iStart, "vs Length:", tags.length);
    if (!tags[iStart] || !tags[iEnd]) {
      if (!tags[iStart]) {
        console.log(`Expected # found ${tags[iEnd]}`);
      } else {
        console.log("Expected..", tags[iStart], tags[iEnd]);
        // console.log(`Expected ${lastMatch} found #`);
      }
      break;
    }
  } while (iStart > 0 && iEnd < tags.length);
  if (bool_correct) {
    console.log("Correctly tagged paragraph");
  }
  // console.log(firstItem.slice(0, 1) + "/" + firstItem.slice(1) === lastItem);
  // console.log("Tags:", typeof tags, tags, tags === null);
};

const checkTags = function (paragraph) {
  console.log("input Paragraph =", paragraph);
  const matchedTags = paragraph.match(TAG_MATCH);
  return _checkTags(matchedTags);
};

// const statementList = [
//   String.raw`The following text<C><B>is centred and in boldface</B></C>`,
//   String.raw`<B>This <g>is <B>boldface</B> in <<*> a</B> <\6> <<d>sentence`,
//   String.raw`<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C>`,
//   String.raw`<B>This should be in boldface, but there is an extra closing tag</B></C>`,
//   String.raw`<B><C>This should be centred and in boldface, but there is a missing closing tag</C>`,
// ];

const statementList = [
  String.raw`<B><C>This should be centred and in boldface, but there is a missing closing tag</C>`,
];

// const myString = String.raw`<B>This <g>is <B>boldface</B> in <<*> a</B> <\6> <<d>sentence`;
// console.log(myString);
// fs.writeFile("/Users/John/Desktop/test.txt", myString, function (err) {
//   if (err) {
//     return console.log(err);
//   }

//   console.log("The file was saved!");
// });

statementList.map((statement) => checkTags(statement));

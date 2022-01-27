//https://regexr.com/
const fs = require("fs");

const TAG_MATCH = /<\/?[A-Z]>/g;
const SLASH_MATCH = /\//g;
const OPEN_MATCH_PART = /</g;
const OPEN_MATCH_FULL = /<?[A-Z]>/g;

const _opposingTag = (tag) => {
  // input tag, return the oposing tag, either opening or closing
  if (tag.includes("/")) {
    return tag.replace(SLASH_MATCH, "");
  }
  return tag.replace(OPEN_MATCH_PART, "</");
};

const _checkOpposingTag = (tag, array) => {
  return array.includes(_opposingTag(tag));
};

const _checkTags = (tags) => {
  if (tags.length === 0) {
    return true;
  }

  // console.log("Tags:", tags);
  const item = tags.shift();
  const hasOpposing = _checkOpposingTag(item, tags);
  let opposingIndex = undefined;
  if (hasOpposing) {
    opposingIndex = tags.indexOf(_opposingTag(item));
  }

  if (opposingIndex >= 0) {
    // console.log("Removed:", tags[opposingIndex]);
    tags.splice(opposingIndex, 1);
    if (_checkTags(tags)) {
      console.log("PerFECTO");
    }
  } else {
    if (item.match(SLASH_MATCH)) {
      // if item is an end tag
      console.log(`Expected # found ${item}`);
    }
    if (item.match(OPEN_MATCH_PART)) {
      // item is an opening tag
      console.log(`Expected ${_opposingTag(item)} found #`);
    }
    return false;
  }
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
  String.raw`The following text<C><B>is centred and in boldface</B></C>`,
];

// const statementList = [
//   String.raw`<B><E>This should be in boldface, but there is an extra closing tag</E></B></C>`,
// ];

// const myString = String.raw`<B>This <g>is <B>boldface</B> in <<*> a</B> <\6> <<d>sentence`;
// console.log(myString);
// fs.writeFile("/Users/John/Desktop/test.txt", myString, function (err) {
//   if (err) {
//     return console.log(err);
//   }

//   console.log("The file was saved!");
// });

statementList.map((statement) => checkTags(statement));

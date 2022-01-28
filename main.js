//https://regexr.com/
const fs = require("fs");

const TAG_MATCH = /<\/?[A-Z]>/g;
const SLASH_MATCH = /\//g;
const OPEN_MATCH_PART = /</g;
const OPEN_MATCH_FULL = /<[A-Z]>/g;
const CLOSE_MATCH_FULL = /<\/[A-Z]>/g;

const _opposingTag = (tag) => {
  // input tag, return the oposing tag, either opening or closing
  // console.log("input tag:", tag, typeof tag);
  if (tag.includes("/")) {
    return tag.replace(SLASH_MATCH, "");
  }
  return tag.replace(OPEN_MATCH_PART, "</");
};

const _checkTags = (tags) => {
  // console.log("Tags:", tags);
  const item = tags[0];
  const lastItem = tags[tags.length - 1];
  const innerTags = tags.slice(1, tags.length - 1);

  // console.log("InnerTags:", innerTags);
  if (innerTags.length === 1) {
    if (lastItem !== _opposingTag(item)) {
      if (innerTags[0] === _opposingTag(item)) {
        console.log(`Expected # found ${lastItem}`);
      } else if (innerTags[0] === _opposingTag(lastItem)) {
        // if the inner tag matches the last item, then the first item is missing its closing value
        console.log(`Expected ${_opposingTag(item)} found #`);
      }
    }
    return false;
  }

  if (innerTags.length > 1) {
    if (!_checkTags(innerTags)) {
      // console.log("nested check false");

      return false;
    }
  }

  if (
    lastItem.match(CLOSE_MATCH_FULL) === null ||
    item.match(OPEN_MATCH_FULL) === null
  ) {
    console.log("last or first item not correct");
    if (lastItem.match(CLOSE_MATCH_FULL) === null) {
      console.log(
        lastItem.match(CLOSE_MATCH_FULL) === null &&
          `last item ${lastItem} not a closing tag`
      );
    }
    if (item.match(OPEN_MATCH_FULL) === null) {
      console.log(
        item.match(OPEN_MATCH_FULL) === null &&
          `first item ${item} not an open tag`
      );
    }
    return false;
  }

  if (_opposingTag(item) !== lastItem) {
    // console.log("Item:", item, "LastItem:", lastItem);

    console.log(`Expected ${_opposingTag(item)} found ${lastItem}`);
    return false;
  }
  if (innerTags.length === 0) {
    return true;
  }

  // console.log("Check:", lastItem, _opposingTag(item));
  // console.log("Sliced Array:", innerTags);
  return true;
};

const checkTags = function (paragraph) {
  // console.log(" ");
  // console.log("input Paragraph =", paragraph);
  const matchedTags = paragraph.match(TAG_MATCH);
  return _checkTags(matchedTags);
};

let statementList = [
  String.raw`The following text<C><B>is centred and in boldface</B></C>`,
  String.raw`<B>This <g>is <B>boldface</B> in <<*> a</B> <\6> <<d>sentence`,
  String.raw`<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C>`,
  String.raw`<B>This should be in boldface, but there is an extra closing tag</B></C>`,
  String.raw`<B><C>This should be centred and in boldface, but there is a missing closing tag</C>`,
];

// statementList = [
//   String.raw`<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C>`,
// ];

// const myString = String.raw`<B>This <g>is <B>boldface</B> in <<*> a</B> <\6> <<d>sentence`;
// console.log(myString);
// fs.writeFile("/Users/John/Desktop/test.txt", myString, function (err) {
//   if (err) {
//     return console.log(err);
//   }

//   console.log("The file was saved!");
// });

statementList.map((statement) => {
  if (checkTags(statement)) {
    console.log("Correctly tagged paragraph");
  }
});

const TAG_MATCH = /<\/?[A-Z]>/g;

const _opposingTag = (tag) => {
  // input tag, return the oposing tag, either opening or closing
  // console.log("input tag:", tag, typeof tag);
  if (tag.includes("/")) {
    return tag.replace(/\//g, "");
  }
  return tag.replace(/</g, "</");
};

const _checkTags = (tags) => {
  console.log("Tags:", tags);
  const item = tags[0];
  const lastItem = tags[tags.length - 1];
  const innerTags = tags.slice(1, tags.length - 1);

  console.log("Inner:", innerTags);
  //// If only one child. Check it against parent values
  if (innerTags.length === 1) {
    // One inner child.
    if (lastItem !== _opposingTag(item)) {
      if (innerTags[0] === _opposingTag(item)) {
        // check inner tag === parent left item
        console.log(`Expected # found ${lastItem}`);
      } else if (innerTags[0] === _opposingTag(lastItem)) {
        // check inner against parent right item
        console.log(`Expected ${_opposingTag(item)} found #`);
      } else {
        // InnerChild has no match
        console.log(`Expected # found ${innerTags[0]}`);
      }
    } else {
      console.log(`Expected # found ${innerTags[0]}`);
    }
    return false;
  }

  // Carry out recursive call before checking current values.
  if (innerTags.length > 1) {
    const checkInner = _checkTags(innerTags);
    if (checkInner) {
      return true;
    } else {
      return false;
    }
  }

  // If recursive calls have come back good, then check current values
  if (_opposingTag(item) !== lastItem) {
    // console.log("Item:", item, "LastItem:", lastItem);
    console.log(`Expected ${_opposingTag(item)} found ${lastItem}`);
    return false;
  } else if (innerTags.length === 0) {
    // finally, if current values are true and there are no further values to check return true
    return true;
  }
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

statementList = [
  String.raw`<B><C> This should be centred and in boldface, but the tags are wrongly nested <B></B></C>`,
];

statementList.map((statement) => {
  if (checkTags(statement)) {
    console.log("Correctly tagged paragraph");
  }
});

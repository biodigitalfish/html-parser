const TAG_MATCH = /<\/?[A-Z]>/g;
const OPEN_MATCH = /<[A-Z]>/g;
const CLOSE_MATCH = /<\/[A-Z]>/g;

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

  if (innerTags.length === 0) {
    // less than
    console.log("No children");
    if (lastItem === _opposingTag(item)) {
      return true;
    }
  }

  // console.log("For SOLVED - push index back up?");

  if (innerTags.length === 1) {
    console.log("unresolved child item.", innerTags[0]);
    if (innerTags[0].match(OPEN_MATCH)) {
      // check lastitem
      if (innerTags[0] === _opposingTag(lastItem)) {
        console.log(
          `Child ${innerTags[0]} resolves with last item`,
          lastItem,
          "returning:",
          item
        );
        return [1, 2];
      }
    } else if (item === _opposingTag(innerTags[0])) {
      // is a closing tag so check first item
      console.log("Child Item matches first item");
      return [0, 1];
    } else if (lastItem.match(CLOSE_MATCH) && lastItem === _opposingTag(item)) {
      // check item and last item resolve
      console.log("Items match");
      return [0, 2];
    } else {
      console.log("No matches, returning Tags:", tags);
      return [0, 1, 2]; // none resolve so throw them all back up
    }
  } else {
    const checkTagResult = _checkTags(innerTags);
    // console.log("solved:", checkTagResult, tags);

    const unresolved = tags.slice(1, tags.length - 1).filter((f, index) => {
      return !checkTagResult.includes(index);
    });
    unresolved.splice(0, 0, tags[0]);
    unresolved.splice(unresolved.length + 1, 0, tags[tags.length - 1]);
    console.log("unresolved:", unresolved, "tags:", tags);
    if (unresolved) {
      console.log("RECURSIVE WITH:", unresolved);
      return _checkTags(unresolved);
    } else {
      console.log("SOLVED");
    }
  }
  // console.log("Inner:", innerTags);
  return false;
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
  String.raw`<B><C> Outer Tag is missing but its failing on internal tag <B></B></C>`,
];

statementList.map((statement) => {
  console.log("");
  if (checkTags(statement)) {
    // console.log("Correctly tagged paragraph");
  }
});

// myTags = ["<B>", "<C>", "<B>", "</B>", "</C>"];
// sorted = [];

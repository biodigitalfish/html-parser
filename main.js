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

const _describeIssue = (item, lastItem = "#") => {
  if (item.match(OPEN_MATCH)) {
    console.log(`0 Expected ${_opposingTag(item)} found ${lastItem}`);
  } else {
    console.log(`1 Expected # found ${item}`);
  }
};

const _checkTags = (tags) => {
  // console.log("Tags:", tags);
  if (!tags || tags.length === 0) {
    console.log("nothing to check");
    return;
  }

  if (tags.length === 1) {
    _describeIssue(tags[0]);
    return tags;
  }

  let currentIndex = 0;
  const unsolved = [];

  while (currentIndex < tags.length) {
    const item = tags[currentIndex];
    const nextItem = tags[currentIndex + 1];
    const opposing = _opposingTag(item);

    // console.log(`item ${item} vs next: ${nextItem}`);
    if (item.match(OPEN_MATCH) && nextItem) {
      if (opposing === nextItem) {
        // console.log("Match", item, nextItem);
        currentIndex += 2;
        continue;
      } else if (nextItem.match(CLOSE_MATCH)) {
        console.log(`Expected ${opposing} found ${nextItem}`);
        return false;
      }
      unsolved.push(item);
    } else if (item.match(CLOSE_MATCH)) {
      if (unsolved.includes(_opposingTag(item))) {
        uIndex = unsolved.indexOf(_opposingTag(item));
        if (uIndex !== -1) {
          unsolved.splice(uIndex, 1);
        }
        // console.log("IndexOf:", unsolved.indexOf(_opposingTag(item)));
      } else {
        unsolved.push(item);
      }
      // console.log("closing tag:", item, item.match(CLOSE_MATCH));
    } else {
      unsolved.push(item);
    }
    currentIndex += 1;
  }
  if (unsolved.length > 0) {
    // console.log(unsolved[0]);
    _describeIssue(unsolved[0]);
    return false;
  }
  console.log("Correctly tagged paragraph");
  return true;
};

const checkTags = function (paragraph) {
  // console.log(paragraph);
  const matchedTags = paragraph.match(TAG_MATCH);
  return _checkTags(matchedTags);
};

let statementList = [String.raw`The following text<C><B>is centred and in boldface</B></C>`, String.raw`<B>This <g>is <B>boldface</B> in <<*> a</B> <\6> <<d>sentence`, String.raw`<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C>`, String.raw`<B>This should be in boldface, but there is an extra closing tag</B></C>`, String.raw`<B><C>This should be centred and in boldface, but there is a missing closing tag</C>`];

statementList.map((statement) => {
  checkTags(statement);
});

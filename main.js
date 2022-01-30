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

const _describeIssue = (item) => {
  if (item.match(OPEN_MATCH)) {
    console.log(`0 Expected ${_opposingTag(item)} found #`);
  } else {
    console.log(`1 Expected # found ${item}`);
  }
};

const _checkTags = (tags) => {
  // console.log("Tags:", tags);
  if (!tags || tags.length === 0) {
    // console.log("nothing to check");
    console.log("Correctly tagged paragraph");
    return true;
  }
  if (tags.length === 1) {
    _describeIssue(tags[0]);
    return false;
  }

  const unsolved = [];
  let currentIndex = 0;
  while (currentIndex < tags.length) {
    const item = tags[currentIndex];
    const nextItem = tags[currentIndex + 1];
    const opposing = _opposingTag(item);

    // console.log(`item ${item} vs next: ${nextItem}`);
    if (item.match(OPEN_MATCH) && nextItem) {
      // if item is an open tag and there is tag to the right available
      if (opposing === nextItem) {
        // match made. skip 2 on next iteration
        currentIndex += 2;
        continue;
      } else if (nextItem.match(CLOSE_MATCH)) {
        // bad match. exit
        console.log(`Expected ${opposing} found ${nextItem}`);
        return false;
      }
      // push unsolved item into list
      unsolved.push(item);
    } else if (item.match(CLOSE_MATCH)) {
      // if it's a close tag see if can resolve a previous open tag
      if (unsolved.includes(_opposingTag(item))) {
        uIndex = unsolved.indexOf(_opposingTag(item));
        if (uIndex !== -1) {
          unsolved.splice(uIndex, 1); // remove solved tag
        }
      } else {
        unsolved.push(item);
      }
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

// statementList = [String.raw`<B><C> Outer Tag is missing but its failing on internal tag <B></B></C>`];
statementList.map((statement) => {
  checkTags(statement);
});

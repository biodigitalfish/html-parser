const TAG_MATCH = /<\/?[A-Z]>/g;
const OPEN_MATCH = /<[A-Z]>/g;
const CLOSE_MATCH = /<\/[A-Z]>/g;

const _opposingTag = (tag) => {
  // input tag, return the oposing tag, either opening or closing
  if (tag.match(CLOSE_MATCH)) {
    return tag.replace(/\//g, "");
  } else if (tag.match(OPEN_MATCH)) {
    return tag.replace(/</g, "</");
  }
  console.log("Unexpected tag input");
  return false;
};

const _describeIssue = (item, lastitem = "#") => {
  const opposingTag = _opposingTag(item);
  if (item.match(OPEN_MATCH)) {
    console.log(`Expected ${opposingTag} found ${lastitem}`);
    return `Expected ${opposingTag} found ${lastitem}`;
  } else if (item.match(CLOSE_MATCH)) {
    console.log(`Expected ${lastitem} found ${item}`);
    return `Expected ${lastitem} found ${item}`;
  } else {
    console.log(`Unexpected input`);
    return `Unexpected input`;
  }
};

const _checkTags = (tags) => {
  if (!tags || tags.length === 0) {
    console.log("Correctly tagged paragraph");
    return "Correctly tagged paragraph";
  }
  if (tags.length === 1) {
    return _describeIssue(tags[0]);
  }

  const unsolved = [];
  let currentIndex = 0;
  while (currentIndex < tags.length) {
    const item = tags[currentIndex];
    const nextItem = tags[currentIndex + 1];
    const opposingTag = _opposingTag(item);

    if (item.match(OPEN_MATCH) && nextItem) {
      // if item is an open tag and there is tag to the right available
      if (opposingTag === nextItem) {
        // match made. skip 2 on next iteration
        currentIndex += 2;
        continue;
      } else if (nextItem.match(CLOSE_MATCH)) {
        // bad match. exit
        return _describeIssue(item, nextItem);
      }
      // push unsolved item into list
      unsolved.push(item);
    } else if (item.match(CLOSE_MATCH)) {
      // if it's a close tag see if can resolve a previous open tag
      if (unsolved.includes(opposingTag)) {
        const uIndex = unsolved.indexOf(opposingTag);
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
    const findClose = unsolved.some((i) => i.match(CLOSE_MATCH));
    const findOpen = unsolved.some((i) => i.match(OPEN_MATCH));
    if (findOpen && findClose) {
      return _describeIssue(unsolved[0], unsolved[unsolved.length - 1]);
    }
    return _describeIssue(unsolved[0]);
  }
  console.log("Correctly tagged paragraph");
  return "Correctly tagged paragraph";
};

const checkTags = function (paragraph) {
  console.log("paragraph", paragraph);
  const matchedTags = paragraph.match(TAG_MATCH);
  return _checkTags(matchedTags);
};

exports._checkTags = _checkTags;
exports._opposingTag = _opposingTag;
exports.checkTags = checkTags;

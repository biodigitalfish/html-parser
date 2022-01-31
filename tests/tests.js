const statementList = [
  [String.raw`The following text<C><B>is centred and in boldface</B></C>`, "Correctly tagged paragraph"],
  [String.raw`<B>This <g>is <B>boldface</B> in <<*> a</B> <\6> <<d>sentence`, "Correctly tagged paragraph"],
  [String.raw`<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C>`, "Expected </C> found </B>"],
  [String.raw`<B>This should be in boldface, but there is an extra closing tag</B></C>`, "Expected # found </C>"],
  [String.raw`<B><C>This should be centred and in boldface, but there is a missing closing tag</C>`, "Expected </B> found #"],
  [String.raw`<B><C>This should be centred and in boldface, but there is a missing closing tag</C>`, "Expected </B> found #"],
];

const opposingTags = [
  [String.raw`<A>`, "</A>"],
  [String.raw`</B>`, "<B>"],
  [String.raw`<a>`, false],
  [String.raw`<3>`, false],
  [String.raw`<BB>`, false],
];

const tagList = [
  [["<C>", "<B>", "</B>", "</C>"], "Correctly tagged paragraph"],
  [["</B>", "</C>", "</A>", "</A>,", "</A>"], "Expected # found </B>"],
  [["<A>", "<B>", "<C>", "<D>,", "<E>"], "Expected </A> found #"],
  [[""], "Unexpected input"],
];

exports.statementList = statementList;
exports.opposingTags = opposingTags;
exports.tagList = tagList;

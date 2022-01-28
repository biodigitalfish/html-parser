statementList = [
  String.raw`<B>This should be in boldface, but there is an extra closing tag<C></C>`,
];

statementList = [
  String.raw`<B><C> This should be centred and in boldface, but the tags are wrongly nested <F></B></C>`,
];

// currently failing on this
statementList = [
  String.raw`<B><C> Outer Tag is missing but its failing on internal tag <B></B></C>`,
];

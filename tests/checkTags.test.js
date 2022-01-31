const main = require("../modules/checkTags.js");
const tests = require("./tests");

const { expect, test, toBe } = require("@jest/globals");

test("Verify Opposing Tags", () => {
  tests.opposingTags.map((tag) => {
    expect(main._opposingTag(tag[0])).toBe(tag[1]);
  });
});

test("Verify TagList parsing", () => {
  tests.tagList.map((tags) => {
    console.log(tags);

    expect(main._checkTags(tags[0])).toBe(tags[1]);
  });
});

test("Integration Test", () => {
  tests.statementList.map((statement) => {
    expect(main.checkTags(statement[0])).toBe(statement[1]);
  });
});

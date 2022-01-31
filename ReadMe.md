<img src="https://static.semrush.com/blog/uploads/media/cf/8b/cf8b4fc60cd8cce5213c3883cb36a420/html-tags-list.svg" title="" alt="alt text" data-align="center">

# Tag Checker Problem

Written in JavaScript, this program takes an input of a paragraph of text and validates if the psuedo HTML tag syntax is correct

## Dependencies

- [VSCode](https://code.visualstudio.com/). Or whatever favourite IDE or runtime you prefer.

- [NodeJs](<[Node.js](https://nodejs.org/)>)

- [Jest](https://jestjs.io/) => `npm i --save-dev jest`

## Testing using Jest

main.test.js takes the input test values from tests.js

It verifies 3 functions within checkTags.js file:

- \_opposingTag

- \_checkTags

- checkTags

To run the tests execute `npm test`

## Manual test

Run main.js file which will prompt for user input. Enter a paragraph to be checked

`node main.js`

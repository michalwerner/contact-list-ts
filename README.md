# Notes

## Main points of the solution:

- list virtualization to fight performance issues using `react-window`
- handling of "finished" state when there's no more data to load (message and disabled button)
- retry mechanizm for initial loading (increase fail probability in `api.ts` to observe it easier)
- the list is scrolling down after new elements are loaded to indicate new content available
- page is responsive to some extent
- a bit experimental approach to selecting cards:

  The most obvious solutions seem to be a) to sort contacts by their "selected" state or b) render a separate collection of selected contacts above the main list.

  I wanted to have that "pinned" list also virtualized, but without using two separate virtualized lists. I decided to put selected contacts as copies at the beginning of the list.

  UX perspective:

  - selected cards are visible both at the top and on their regular place and can be deselected on both positions
  - the user doesn't experience disappearing items when selecting or deselecting
  - copies at the top are marked with a "pin" icon
  - for most cases the user doesn't experience any jumping, the scroll of the list is automatically corrected (some private properties of the library were used, but it works fine)
  - when the user is at the top of the list and cards from near the top are selected, duplicates are visible - that's a drawback of the solution

I wanted to do some experiments and learn while doing this task. That's why some functionality extends the definition of done. I admit that as a result it took a bit longer than I expected and that's the reason for missing tests.

## Some possible improvements:

- tests could be written
- props drilling (see `toggleContactSelection`) could be reduced, for example by using React context
- there could be much better styling
- virtualized list could be sized smarter
- scroll of virtualized list could be controlled by the window scroll

# TODO

Please do not fork the repo, clone it and put it in your own github / save it locally.

Definition of done:

1. Fetch contacts using `apiData` function. Contacts are paginated (10 items in batch).
2. "Load more" button is positioned at the bottom of the list. It fetches next batch and appends it to the existing list.
3. Loading state is handled, display some kind of spinner / loader.
4. Error state is handled. It allows to refetch failed batch.
5. Each contact information card is selectable.
6. Selected contacts have outline around them.
7. Selected card can be deselected.
8. Selected contacts are displayed at the top of the list.
9. List does not have performance issues when selecting/deselecting/scrolling cards.

Doing this task in typescript is preferred. However, if you do not feel comfortable with typescript, please change file extension to js.

Decide by yourself if you want to install additional dependencies, or code some functionality manually.
Design choices are yours, but please stick to provided layout pattern. Please have UX in mind when making decisions.

![layout.png](layout.png)

Optional: Add functional / unit tests with testing library of your choice.

Good luck and do not hesitate to ask in case of any questions!

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

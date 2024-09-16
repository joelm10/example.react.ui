## Stub Example React project
Contains simple helper methods, client-side routing (react-router-dom) and base unit tests.
Simple seperation of concerns: 
- User interface and presentation:   ``` /components```
- Common Re-usable Atomic component/s:``` /components/Library```
- Utility method/s: ```/helpers/```
- Data access: ```/services```

### Intent:
These UI compnents should be moved to own project from ```/components/Library```
Same for the Utility and reusable methods ```/helpers``` and ```/services```

## Quality
- Unit tests: using react-testing-library and jest
- Code format: Eslint
- Quality Gates: git hooks auto run before pushing code to remote

## Getting Started

1) Install dependencies: ```npm i ```
2) Start developing: ```npm start ```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.



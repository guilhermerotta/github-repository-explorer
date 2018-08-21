# GitHub Repository Explorer
Single Page Application to view an organization's repositories and its latest commits on GitHub. Local Storage is used to save application state on the client.

http://guilherme-github-explorer.surge.sh/

## Features
- Search by organization to list its repositories (max 100)
- Sort (desc) repositories by star gazers count, forks count or update date
- View latest commits for selected repository
- Mark organizations as favorites for easier access

## Main Frameworks and libraries
- React
- Redux
- Semantic UI React (http://react.semantic-ui.com)
- GitHub API Client for Node.js (https://octokit.github.io/rest.js/)

## Deployment
Please view https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#deployment for more details.
### On Node.js
The easiest way is to install `serve`:
```
npm install -g serve
serve -s build
```
This will load the assets from the build folder and serve the application on `http://localhost:5000` by default.

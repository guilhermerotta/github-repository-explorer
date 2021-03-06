export const saveStateToLocalStorage = (state) => {
  try {
    const asString = JSON.stringify(state);
    localStorage.setItem('githubExplorerState', asString)
  } catch (e) {
    console.log(e);
  }
};

export const loadStateFromLocalStorage = () => {
  try {
    const serialized = localStorage.getItem('githubExplorerState');
    if (serialized === null) {
      return undefined;
    }
    return JSON.parse(serialized);
  } catch (e) {
    return undefined;
  }
};

export const parseApiMessage = (messageObj) => {
  try {
    return JSON.parse(messageObj).message;
  } catch (e) {
    return messageObj;
  }
};



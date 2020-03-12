const Lib = {
  makeStateContainer(intialState, renderCallback) {
    let currentState = intialState
    return {
     set(newState, afterRenderCallback = () => {}) {
      currentState = { ...currentState, ...newState }
      renderCallback()
      afterRenderCallback()
     },
     get() { return currentState }
   }
  },
  splitAt(str, index) {
    return [str.slice(0, index), str.slice(index)]
  },
  readFile(file) {
    return new Promise(function(resolve, reject) {
      const reader = new FileReader()
      reader.onload = function(event) {
        resolve(event.target.result)
      }
      reader.readAsText(file)
    })
  },
  getQueryParam(paramName) {
    const queryPairs = window.location.search.slice(1).split("&").map(k => k.split("="))
    const foundPair = queryPairs.find(([name]) =>  name === paramName)
    if(!foundPair) return null;
    return foundPair[1]
  }
}

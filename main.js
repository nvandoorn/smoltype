(function () {
  const DEFAULT_EXERCISE_SLUG = 'doggo-ipsum'
  const mainInput = document.getElementById("main-input")
  const root = document.getElementById("root")
  const fileInput = document.getElementById("file-input")
  mainInput.addEventListener("keyup", mainInputChangeHandler)
  fileInput.addEventListener("change", fileChangeHandler)

  const exerciseSlug = Lib.getQueryParam("exercise") || DEFAULT_EXERCISE_SLUG
  const wordList = EXERCISES[exerciseSlug].content.split(" ")
  let state = Lib.makeStateContainer({ currentWordIndex: 0, currentMatchIndex: 0, wordList}, render)

  function render() {
    const { currentWordIndex, currentMatchIndex, wordList } = state.get()
    const currentWord = wordList[currentWordIndex]

    const [matchedSegment, rest] = Lib.splitAt(currentWord, currentMatchIndex)
    const currentWordTemplate = Templates.currentWord({matchedSegment, rest})

    const sidebarCollection = Object.entries(EXERCISES).map(([slug, exercise]) => [exercise.name, `/?exercise=${slug}`, slug])
    const sidebarTemplate = Templates.sidebar({collection: sidebarCollection, currentSlug: exerciseSlug })

    const nextWord = wordList[currentWordIndex + 1]
    const prevWord = wordList[currentWordIndex - 1]
    const dashboardTemplate = Templates.dashboard({prevWord, nextWord, children: currentWordTemplate})
    root.innerHTML = sidebarTemplate + dashboardTemplate
  }

  function currentMatchPosition(currentWord) {
    // TODO this is not a very fast or clever way to do this, but its ok to
    // read and works for now. At the very least this should be factored out.
    let i
    for(i = 0; i < currentWord.length; i++) {
      if(currentWord[i] !== mainInput.value[i]) {
        break
      }
    }
    return i
  }

  function fileChangeHandler(event) {
    Lib.readFile(event.target.files[0]).then(function(text) {
      state.set({ wordList: text.split(" "), currentWordIndex: 0, currentMatchIndex: 0 })
    })
  }

  function mainInputChangeHandler(event) {
    const { currentWordIndex, wordList } = state.get()
    const currentWord = wordList[currentWordIndex]
    if(mainInput.value.includes(currentWord)) {
      mainInput.value = ""
      state.set({ currentWordIndex: currentWordIndex + 1, currentMatchIndex: 0 })
    }
    else {
      const currentMatchIndex = currentMatchPosition(currentWord)
      const correctSegment = mainInput.value.slice(0, currentMatchIndex)
      state.set({ currentMatchIndex })
      mainInput.value = correctSegment
    }
  }

  render()
})()

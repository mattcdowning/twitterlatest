if (document.readyState !== 'loading') {
  init()
} else {
  document.addEventListener('DOMContentLoaded', () => {
    init()
  })
}

function init() {
  if (document.getElementById('react-native-stylesheet')) {
    let x = 0
    let y = 0
    let topTweetsFound = false

    const findTopTweetsOn = setInterval(() => {
      if (x >= 10) {
        clearInterval(findTopTweetsOn)
      }
      x++

      const topTweetsOn = document.querySelector('[aria-label="Top Tweets on"]')

      if (topTweetsOn) {
        simulateClick(topTweetsOn)

        topTweetsFound = true

        findLatest()

        clearInterval(findTopTweetsOn)
      }
    }, 200)

    function findLatest() {
      const findLatestTweets = setInterval(() => {
        if (y >= 10) {
          clearInterval(findLatestTweets)
        }
        y++

        if (topTweetsFound === true) {
          const latest = [...document.querySelectorAll('span')].filter(a =>
            a.textContent.includes('See latest Tweets instead')
          )[0]

          if (latest) {
            simulateClick(latest)
            clearInterval(findLatestTweets)
          }
        }
      }, 200)
    }

    function simulateClick(target, options) {
      var event = target.ownerDocument.createEvent('MouseEvents'),
        options = options || {},
        opts = {
          // These are the default values, set up for un-modified left clicks
          type: 'click',
          canBubble: true,
          cancelable: true,
          view: target.ownerDocument.defaultView,
          detail: 1,
          screenX: 1, //The coordinates within the entire page
          screenY: 0,
          clientX: 0, //The coordinates within the viewport
          clientY: 0,
          ctrlKey: false,
          altKey: false,
          shiftKey: false,
          metaKey: false, //I *think* 'meta' is 'Cmd/Apple' on Mac, and 'Windows key' on Win. Not sure, though!
          button: 0, //0 = left, 1 = middle, 2 = right
          relatedTarget: null,
        }

      //Merge the options with the defaults
      for (var key in options) {
        if (options.hasOwnProperty(key)) {
          opts[key] = options[key]
        }
      }

      //Pass in the options
      event.initMouseEvent(
        opts.type,
        opts.canBubble,
        opts.cancelable,
        opts.view,
        opts.detail,
        opts.screenX,
        opts.screenY,
        opts.clientX,
        opts.clientY,
        opts.ctrlKey,
        opts.altKey,
        opts.shiftKey,
        opts.metaKey,
        opts.button,
        opts.relatedTarget
      )

      //Fire the event
      target.dispatchEvent(event)
    }
  }
}

import { useLayoutEffect } from 'react'

// Makes the text in an element (`ref`) smaller, half a pixel at a time, until
// what's in it fits its width without running over, down to `smallest` px.
// It's fitted again whenever the space it's in changes size, like a phone
// turning, and whenever `key` changes (the text in it, say). Anything sized in
// `em` inside it shrinks along with it.
//
// For a long name beside Edit Profile on Profile, and a journey's four tags
// on Home, which have to fit one line whatever the phone's font.
export function useShrinkToFit(ref, smallest, key) {
  useLayoutEffect(() => {
    const element = ref.current
    function fit() {
      element.style.fontSize = ''
      let size = parseFloat(getComputedStyle(element).fontSize)
      while (element.scrollWidth > element.clientWidth && size > smallest) {
        size -= 0.5
        element.style.fontSize = `${size}px`
      }
    }
    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(element.parentElement)
    return () => observer.disconnect()
  }, [ref, smallest, key])
}

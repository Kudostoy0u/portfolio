var globalID
(() => {
let e = document.getElementById("transition")
let t = 100
document.onreadystatechange = () => {
    if ("complete" == document.readyState) {
        const close = () => {
            if (t <= 0) {
              cancelAnimationFrame(globalID)
            }
            t-=2
            e.style.width = t + "%"
            globalID = requestAnimationFrame(close)
        }
        globalID = requestAnimationFrame(close)
    }
}
})()
window.onload = () => {
let path = location.pathname
magicMouse({
    cursorOuter: "circle-basic",
    hoverEffect: "circle-move",
    hoverItemMove: !1,
    defaultCursor: !1,
    outerWidth: 30,
    outerHeight: 30
})
if (path == "/") 
  VANTA.NET({
      el: "html",
      mouseControls: !0,
      touchControls: !0,
      gyroControls: !1,
      minHeight: 200,
      minWidth: 200,
      scale: 1,
      scaleMobile: 1
  })
else if (path == "/blog")
  VANTA.HALO({
      el: "html",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      xOffset: 0.24
  })
    var globalID
    document.querySelectorAll(".fade_out")
    .forEach(w => {w.addEventListener("click", () => {
        let e = document.getElementById("transition")
        let t = 0
        const limit = window.innerWidth < 500 ? 110 : 100
        e.style.display = "block"
          const close = () => {
              if (t > limit) {
                location.href=w.dataset.url
              } else {
              t+=2
              e.style.width = t + "%"
              globalID = requestAnimationFrame(close)
              }
          }
          globalID = requestAnimationFrame(close)
      })})
}

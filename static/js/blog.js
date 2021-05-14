document.querySelectorAll(".underline").forEach(e => {
  const img = e.parentNode.previousElementSibling.firstElementChild.firstElementChild;
  e.addEventListener("mouseover",()=>img.classList.add("hovering"))
  e.addEventListener("mouseout",()=>img.classList.remove("hovering"))
  img.addEventListener("mouseover",()=>img.classList.add("hovering"))
  img.addEventListener("mouseout",()=>img.classList.remove("hovering"))
  })
const $ = document.querySelector.bind(document)
if (window.innerWidth < 500) {
  $(".ml-3").classList.remove("ml-3")
  $(".ml-4").classList.remove("ml-4")
  $("#mobile").setAttribute("align","center")
  const name = $("#name");
  name.classList.remove("ml-6", "float-left", "display-inline-block")
  name.classList.add("text-center")
  name.innerHTML = "Kudos Beluga"
  name.querySelector("#onhover").style.display = "none"
  $(".cs-width").classList.remove("float-left", "ml-4")
} else {
document.querySelectorAll(".underline").forEach(e => {
  const img = e.parentNode.previousElementSibling.firstElementChild.firstElementChild
  e.addEventListener("mouseover",()=>img.classList.add("hovering"))
  e.addEventListener("mouseout",()=>img.classList.remove("hovering"))
  img.addEventListener("mouseover",()=>img.classList.add("hovering"))
  img.addEventListener("mouseout",()=>img.classList.remove("hovering"))
  })
}
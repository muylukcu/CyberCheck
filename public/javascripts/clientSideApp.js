
const links = document.querySelectorAll(".links");
function cleanUpLinks(links){
  links.forEach(function(link){
    link.setAttribute('class','links');
  });
}

cleanUpLinks(links);
const student = document.querySelector('#profile-link');
student.setAttribute('class','links active');

var projects = document.querySelectorAll('.project');
var form = document.querySelector('.add-project-form');
var addMoreButton = document.querySelector('.project-add-button');
console.log(projects.length);

if( projects.length >= 3){
  form.setAttribute('style',"display:none");
}else{
  addMoreButton.setAttribute("style","display:none");
}

function addOneMoreProject(){
  form.setAttribute('style',"");
  addMoreButton.setAttribute("style","display:none");
}

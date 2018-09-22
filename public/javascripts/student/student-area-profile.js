cleanUpLinks(links);
const student = document.querySelector('#profile-link');
student.setAttribute('class','links active');

var projects = document.querySelectorAll('.project');
var form = document.querySelector('.add-project-form');
var addMoreButton = document.querySelector('.project-add-button');

if( projects.length >= 3){
  form.setAttribute('style',"display:none");
}else{
  addMoreButton.setAttribute("style","display:none");
}

function addOneMoreProject(){
  form.setAttribute('style',"");
  addMoreButton.setAttribute("style","display:none");
}


function populateYears(){
  var date = new Date();
  var year = date.getFullYear();
  var yearSelect = document.querySelectorAll('.year');

  for(var i = 0; i <= 30; i++) {
    var optionOne = document.createElement('option');
    var optionTwo = document.createElement('option');
    optionOne.textContent = year-i;
    optionTwo.textContent = year-i;
    optionOne.setAttribute('value',`${year-i}`);
    optionTwo.setAttribute('value',`${year-i}`);
    yearSelect[0].appendChild(optionOne);
    yearSelect[1].appendChild(optionTwo);
  }
}
populateYears();

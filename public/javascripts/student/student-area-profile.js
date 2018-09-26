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

function submitProjectForm(){
   var companyName = document.querySelector('[name="company_name"]');
   var companyAddress = document.querySelector('[name="company_location"]');
   var jobTitle = document.querySelector('[name="job_title"]');
   var teamSize = document.querySelector('[name="team_size"]');
   var flag = true;

   if(companyName.value === ''){
     companyName.setCustomValidity("Company Name cannot be empty");
     flag = false;
   }else{
      companyName.setCustomValidity("");
   }

   if(companyAddress.value === ''){
     companyAddress.setCustomValidity("Company Address cannot be empty");
     flag = false;
   }else{
     companyAddress.setCustomValidity('');
   }

   if(jobTitle.value === ''){
     jobTitle.setCustomValidity("Job Title cannot be empty");
     flag = false;
   }else{
     jobTitle.setCustomValidity('');
   }

   if(teamSize.value === ''){
     teamSize.setCustomValidity("Team Size cannot be empty");
     flag = false;
   }else{
     teamSize.setCustomValidity('');
   }

   if(flag){
     document.querySelector('#add-project-form').submit();
   }
 }

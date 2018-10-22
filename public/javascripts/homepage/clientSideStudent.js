// cleanUpLinks(links);
// const student = document.querySelector('#student-link');
// student.setAttribute('class','links active');

function submitLogInForm(){
  var form = document.getElementById('logIn-form');
  var email = document.querySelector('[name="email"]');
  var password = document.querySelector('[name="password_logIn"]');
  var cybertekTeamFlag = document.querySelector('#flag').checked;
  var flag = true;

  if(email.value === ''){
    email.setCustomValidity("Email cannot be empty");
    flag = false;
  }else{
    email.setCustomValidity("");
  }

  if(password.value === ''){
    password.setCustomValidity("Password cannot be empty");
    flag = false;
  }else{
    password.setCustomValidity("");
  }


  if(flag && cybertekTeamFlag){
    form.setAttribute('action','admin');
    form.submit();
  }else if(flag){
    form.submit();
  }

}

function submitSignInForm(){
  var firstName = document.querySelector('[name="first_name"]');
  var lastName = document.querySelector('[name="last_name"]');
  var course = document.querySelector('[name="course"]');
  var batchNumber = document.querySelector('[name="batch_number"]');
  var email = document.querySelector('[name="email"]');
  var password = document.querySelector('[name="password"]');
  var confirmPassword = document.querySelector('[name="confirm-password"]');
  var flag = true;

  if(firstName.value === ''){
    firstName.setCustomValidity("First Name cannot be empty");
    flag = false;
  }else{
    firstName.setCustomValidity("");
  }

  if(lastName.value === ''){
    lastName.setCustomValidity("Last Name cannot be empty");
    flag = false;
  }else{
    lastName.setCustomValidity("");
  }

  if(email.value === ''){
    email.setCustomValidity("Email cannot be empty");
    flag = false;
  }else{
    email.setCustomValidity("");
  }

  if(course.value === ''){
    course.setCustomValidity("Cource cannot be empty");
    flag = false;
  }else{
    course.setCustomValidity("");
  }

  if(batchNumber.value === ''){
    batchNumber.setCustomValidity("Batch Number cannot be empty");
    flag = false;
  }else{
    batchNumber.setCustomValidity("");
  }

  if(password.value === ''){
    password.setCustomValidity("Batch Number cannot be empty");
    flag = false;
  }else{
    password.setCustomValidity("");
  }



  if(password.value != confirmPassword.value){
    confirmPassword.setCustomValidity("Passwords Don't Match");
    flag = false;
  }else{
    confirmPassword.setCustomValidity("");
  }

  if(flag){
    document.getElementById('signUp-form').submit();
  }
}

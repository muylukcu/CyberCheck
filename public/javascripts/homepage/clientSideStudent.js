cleanUpLinks(links);
const student = document.querySelector('#student-link');
student.setAttribute('class','links active');



function submitSignInForm(){
  var password = document.querySelector('[name="password"]');
  var confirmPassword = document.querySelector('[name="confirm-password"]');

  if(password.value != confirmPassword.value){
    confirmPassword.setCustomValidity("Passwords Don't Match");
  }else{
    confirmPassword.setCustomValidity("");
    document.getElementById('signUp-form').submit();
  }
}

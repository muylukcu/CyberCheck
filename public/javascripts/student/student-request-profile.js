cleanUpLinks(links);
const requestReference = document.querySelector('#students-request-link');
requestReference.setAttribute('class','links active');

function submitReferenceForm(){
  var recruiterFirstName = document.querySelector('[name="recruiter_first_name"]');
  var recruiterLastName = document.querySelector('[name="recruiter_last_name"]');
  var recruiterEmail = document.querySelector('[name="recruiter_email"]');
  var recruiterPhoneNumber = document.querySelector('[name="recruiter_number"]');
  var recruiterCompany = document.querySelector('[name="recruiter_company"]');
  var endClientCompany = document.querySelector('[name="end_client_company"]');
  var flag = true;

  if(recruiterFirstName.value === ''){
    recruiterFirstName.setCustomValidity("Recruiter First Name cannot be empty");
    flag = false;
  }else{
    recruiterFirstName.setCustomValidity('');
  }

  if(recruiterLastName.value === ''){
    recruiterLastName.setCustomValidity("Recruiter Last Name cannot be empty");
    flag = false;
  }else{
    recruiterLastName.setCustomValidity('');
  }

  if(recruiterEmail.value === ''){
    recruiterEmail.setCustomValidity("Recruiter Email cannot be empty");
    flag = false;
  }else{
    recruiterEmail.setCustomValidity('');
  }

  if(recruiterPhoneNumber.value === ''){
    recruiterPhoneNumber.setCustomValidity("Recruiter Phone Number cannot be empty");
    flag = false;
  }else{
    recruiterPhoneNumber.setCustomValidity('');
  }

  if(recruiterCompany.value === ''){
    recruiterCompany.setCustomValidity("Recruiter company cannot be empty");
    flag = false;
  }else{
      recruiterCompany.setCustomValidity('');
  }

  if(endClientCompany.value === ''){
    endClientCompany.setCustomValidity('End Client Company cannot be empty');
    flag = false;
  }else{
    endClientCompany.setCustomValidity('');
  }

  if(flag){
    document.querySelector('#open-reference-form').submit();
  }
}

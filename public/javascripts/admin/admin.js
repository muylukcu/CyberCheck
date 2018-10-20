function getOldFriends(index){
  var requestId = document.querySelectorAll('.request_id');
  var requestEndClient = document.querySelectorAll('.end_client_company');
  var requestRecComp = document.querySelectorAll('.request_rec_comp');
  var selOldFList = document.querySelectorAll('.select-oldFriend');
  $.ajax({
  url: "/available_oldFriends",
  type: "get", //send it through get method
  contentType: 'application/json',
  data: {
    requestId: requestId[index].value,
    endClient: requestEndClient[index].value,
    recComp: requestRecComp[index].value
  },
  success: function(response) {
    removeAllChildEl(selOldFList[index]);
    renderOldFriendList(response,selOldFList[index]);
  },
  error: function(xhr) {
    console.log('error');
  }
});
}

function renderOldFriendList(response,parentElement){
    const docFragment = document.createDocumentFragment();
    for(var obj of response){
      let element = document.createElement('option');
      element.setAttribute('value',obj._id);
      var newContent = document.createTextNode(obj.firstname+" "+obj.lastname);
      element.appendChild(newContent);
      docFragment.appendChild(element);
      console.log(element);
    }
    parentElement.appendChild(docFragment);
}

function removeAllChildEl(element){
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function submitCreateOldFriendForm(){
  var firstName = document.querySelector('[name="first_name"]');
  var lastName = document.querySelector('[name="last_name"]');
  var phone_number = document.querySelector('[name="phone_number"]');
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

  if(phone_number.value === ''){
    phone_number.setCustomValidity("Phone number cannot be empty");
    flag = false;
  }else{
    phone_number.setCustomValidity("");
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

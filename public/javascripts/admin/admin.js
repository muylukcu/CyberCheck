function getOldFriends(index){
  var requestId = document.querySelectorAll('.request_id');
  var requestEndClient = document.querySelectorAll('.end_client_company');
  var requestRecComp = document.querySelectorAll('.request_rec_comp');
  var selOldFList = document.querySelectorAll('.select-oldFriend');
  $.ajax({
  url: "/available_oldFriends",
  type: "post", //send it through get method
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
      var newContent = document.createTextNode(obj.firstname+" "+obj.lastname +", Assigned: "+obj.amount_of_requests+" requests");
      element.appendChild(newContent);
      docFragment.appendChild(element);
    }
    parentElement.appendChild(docFragment);
}

function removeAllChildEl(element){
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function createOldFriend(){
    var firstName = $('[name|="first_name"]').val();
    var lastName = $('[name|="last_name"]').val();
    var phone_number = $('[name|="phone_number"]').val();
    var email = $('[name|="email"]').val();
    var password = $('[name|="password"]').val();
    $.post("/createOldFriend",
    {
      first_name: firstName,
      last_name: lastName,
      phone_number: phone_number,
      email: email,
      password: password
    },
    function(data, status){
        console.log(data);
        if(data === 'There was a problem registering the old friend.'){
          displayErrorMessage(firstName +" "+lastName+" wasn't created");
        }else{
          displaySuccessMessage(data.firstname+" "+data.lastname +" successfully created");
        }
    });
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
    createOldFriend();
  }
}

function displaySuccessMessage(message){
  var sSection =
   '<div class="isa_success">\n'+
    '<i class="fa fa-check"></i>\n'+
     message + '\n' +
  '</div>';
  $('.main-section').prepend(sSection);
}
function displayErrorMessage(message){
  var sSection =
   '<div class="isa_error">\n'+
    '<i class="fa fa-times-circle"></i>\n'+
     message + '\n' +
  '</div>';
  $('.main-section').prepend(sSection);
}

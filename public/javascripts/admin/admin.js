function getOldFriends(index) {
    var requestId = $(".track-request"+index+" > .request-id");
    var requestEndClient = $(".track-request"+index+" > .end_client_company");
    var requestRecComp = $(".track-request"+index+" > .request_rec_comp");
    var selOldFList =  document.querySelector('.track-request'+index+' > div > select');
    $.ajax({
        url: "/available_oldFriends",
        type: "get", //send it through get method
        contentType: 'application/json',
        data: {
            requestId: requestId.value,
            endClient: requestEndClient.value,
            recComp: requestRecComp.value
        },
        success: function (response) {
            removeAllChildEl(selOldFList);
            renderOldFriendList(response, selOldFList);
        },
        error: function (xhr) {
            console.log('error');
        }
    });
}

function renderOldFriendList(response, parentElement) {
    const docFragment = document.createDocumentFragment();
    for (var obj of response) {
        let element = document.createElement('option');
        element.setAttribute('value', obj._id);
        var newContent = document.createTextNode(obj.firstname + " " + obj.lastname + ", Assigned: " + obj.amount_of_requests + " requests");
        element.appendChild(newContent);
        docFragment.appendChild(element);
    }
    console.log('Here');
    parentElement.appendChild(docFragment);
}

function removeAllChildEl(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function createOldFriend() {
    var mainDiv = $('.main-section');
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
        function (data, status) {
            console.log(data);
            if (data === 'There was a problem registering the old friend.') {
                displayErrorMessage(mainDiv,firstName + " " + lastName + " wasn't created");
            } else {
                displaySuccessMessage(mainDiv,data.firstname + " " + data.lastname + " successfully created");
            }
        });
}

function assigneRequest(index) {
    const mainDiv = $('.my-profile');

    const requestId = $(".track-request"+index+" > .request-id");
    const oldFriendId = $(".track-request"+index+" > div > select");
    const requestDiv = $('.reqIndex'+index);

    console.log(requestId.val());
    console.log(oldFriendId.val());
    $.ajax({
        url: "/assigne_request",
        type: "get",
        contentType: 'application/json',
        data: {
            requestId: requestId.val(),
            oldFriendId: oldFriendId.val()
        },
        success: function (response) {
            requestDiv.remove();
            displaySuccessMessage(mainDiv,`Request ${response}`);
        },
        error: function (xhr) {
            displayErrorMessage(mainDiv,'Error! First choose Reference to assign');
        }
    });
}

function submitCreateOldFriendForm() {
    var firstName = document.querySelector('[name="first_name"]');
    var lastName = document.querySelector('[name="last_name"]');
    var phone_number = document.querySelector('[name="phone_number"]');
    var email = document.querySelector('[name="email"]');
    var password = document.querySelector('[name="password"]');
    var confirmPassword = document.querySelector('[name="confirm-password"]');
    var flag = true;

    if (firstName.value === '') {
        firstName.setCustomValidity("First Name cannot be empty");
        flag = false;
    } else {
        firstName.setCustomValidity("");
    }

    if (lastName.value === '') {
        lastName.setCustomValidity("Last Name cannot be empty");
        flag = false;
    } else {
        lastName.setCustomValidity("");
    }

    if (email.value === '') {
        email.setCustomValidity("Email cannot be empty");
        flag = false;
    } else {
        email.setCustomValidity("");
    }

    if (phone_number.value === '') {
        phone_number.setCustomValidity("Phone number cannot be empty");
        flag = false;
    } else {
        phone_number.setCustomValidity("");
    }

    if (password.value != confirmPassword.value) {
        confirmPassword.setCustomValidity("Passwords Don't Match");
        flag = false;
    } else {
        confirmPassword.setCustomValidity("");
    }

    if (flag) {
        createOldFriend();
    }
}

function displaySuccessMessage(element,message) {
    var sSection =
        '<div class="isa_success">\n' +
        '<i class="fa fa-check"></i>\n' +
        message + '\n' +
        '</div>';
    element.prepend(sSection);
    const mesEl = $('.isa_success');
    window.setTimeout(function(){
        mesEl.remove();
    },3000);
}

function displayErrorMessage(element,message) {
    var sSection =
        '<div class="isa_error">\n' +
        '<i class="fa fa-times-circle"></i>\n' +
        message + '\n' +
        '</div>';
    element.prepend(sSection);
    const mesEl = $('.isa_error');

    window.setTimeout(function(){
        mesEl.remove();
    },3000);
}

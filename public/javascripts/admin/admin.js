function getOldFriends(index) {
    var requestId = $(".track-request" + index + " > .request-id");
    var requestEndClient = $(".track-request" + index + " > .end_client_company");
    var requestRecComp = $(".track-request" + index + " > .request_rec_comp");
    var selOldFList = document.querySelector('.track-request' + index + ' > div > select');

    $.ajax({
        url: "/available_oldFriends",
        type: "get", //send it through get method
        contentType: 'application/json',
        data: {
            requestId: requestId.val(),
            endClient: requestEndClient.val(),
            recComp: requestRecComp.val()
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
    parentElement.appendChild(docFragment);
}

function removeAllChildEl(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function createOldFriend() {
    var mainDiv = $('.main-section');
    var firstName = $('[name|="first_name"]');
    var lastName = $('[name|="last_name"]');
    var phone_number = $('[name|="phone_number"]');
    var email = $('[name|="email"]');
    var password = $('[name|="password"]');
    $.post("/createOldFriend",
        {
            first_name: firstName.val(),
            last_name: lastName.val(),
            phone_number: phone_number.val(),
            email: email.val(),
            password: password.val()
        },
        function (data, status) {
            if (data === 'There was a problem registering the old friend.') {
                displayErrorMessage(mainDiv, firstName + " " + lastName + " wasn't created");
            } else {
                displaySuccessMessage(mainDiv, data.firstname + " " + data.lastname + " successfully created");
                $('#signUp-form').trigger('reset');
            }
        });
}

function assigneRequest(index) {
    const mainDiv = $('.my-profile');

    const requestId = $(".track-request" + index + " > .request-id");
    const oldFriendId = $(".track-request" + index + " > div > select");
    const requestDiv = $('.reqIndex' + index);

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
            displaySuccessMessage(mainDiv, `Request assigned to ${response.oldFriend.firstname} ${response.oldFriend.lastname}`);
        },
        error: function (xhr) {
            displayErrorMessage(mainDiv, 'Error! First choose Reference to assign');
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


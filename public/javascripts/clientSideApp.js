
const links = document.querySelectorAll(".links");
function cleanUpLinks(links){
  links.forEach(function(link){
    link.setAttribute('class','links');
  });
}

function removeRequest(requestId, index) {
    const mainDiv = $('.my-profile');
    const requestDiv = $('.reqIndex' + index);
    $.ajax({
        url: '/request/remove_request',
        type: 'get',
        contentType: 'application/json',
        data: {
            requestId: requestId
        },
        success: function(response) {
            requestDiv.remove();
            displaySuccessMessage(mainDiv, `Request ${response}`);
        },
        error: function(xhr){
            displayErrorMessage(mainDiv, 'Error! Request did not deleted');
        }
    })
}

function displaySuccessMessage(element, message) {
    var sSection =
        '<div class="isa_success">\n' +
        '<i class="fa fa-check"></i>\n' +
        message + '\n' +
        '</div>';
    element.prepend(sSection);
    const mesEl = $('.isa_success');
    window.setTimeout(function () {
        mesEl.remove();
    }, 3000);
}

function displayErrorMessage(element, message) {
    var sSection =
        '<div class="isa_error">\n' +
        '<i class="fa fa-times-circle"></i>\n' +
        message + '\n' +
        '</div>';
    element.prepend(sSection);
    const mesEl = $('.isa_error');

    window.setTimeout(function () {
        mesEl.remove();
    }, 3000);
}
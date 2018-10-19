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

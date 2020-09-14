function fetchData() {
  let request = new XMLHttpRequest();
  request.open("GET", "http://demo.sibers.com/users");
  request.onload = function () {
    // Convert JSON data to an object

    JSON.parse(request.response).forEach((user) =>
      localStorage.setItem(`user_${user.id}`, JSON.stringify(user))
    );

    render(false);
  };
  request.send();
}

function showUserInfo(userId) {
  const user = JSON.parse(localStorage.getItem(`user_${userId}`));

  // alert(localStorage.getItem(`user_${userId}`));
  const userInfo =
    "<li>" +
    user.website +
    " - " +
    user.username +
    " - " +
    user.address.country +
    "</li>";

  document.getElementById("userDetails").innerHTML = userInfo;
}

function sortByNameComparator(a, b) {
  if (a.name > b.name) {
    return 1;
  } else if (a.name < b.name) {
    return -1;
  } else {
    return 0;
  }
}

function render(sort) {
  const filterStr = document.getElementById("myInput").value.toUpperCase();

  const users = Object.keys(localStorage)
    .filter((k) => k.startsWith("user_"))
    .map((key) => JSON.parse(localStorage.getItem(key)))
    .sort(sort ? sortByNameComparator : () => 0)
    .filter((user) => !filterStr || user.name.toUpperCase().includes(filterStr))
    .reduce(
      (left, user) =>
        left +
        `<div>
           <li><a>${user.name} - ${user.company.name}</a></li>
           <img  onclick='showUserInfo(${user.id})' src="${user.avatar}"  />
         </div>`,
      ""
    );

  document.getElementById("users").innerHTML = users;
}

window.onload = () => {
  render(false);
};

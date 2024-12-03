import { getAllUsers, handleOnClick, insertUsersToDOM } from "./utilties.js";

const userList = document.querySelector(".user-list");

userList.addEventListener("click", handleOnClick);

getAllUsers().then((users) => {
  setTimeout(() => {
    insertUsersToDOM(users);
  }, 0);
});

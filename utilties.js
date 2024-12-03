const baseURL = "https://jsonplaceholder.typicode.com";

function createUserCard(user) {
  const card = /*html*/ `
        <article class="card" id="${user.id}">
            <h3 class="name">${user.name}</h3>
            <p class="username">username: ${user.username}</p>
            <p class="phone">Phone: ${user.phone}</p>
            <p class="email">Email: ${user.email}</p>
        </article>
    `;

  return card;
}

function createUserPage(user) {
  const userPage = /*html*/ `
    <div class="user-page">
      <h3 class="name">${user.name}</h3>
      <p class="username">username: ${user.username}</p>
      <p class="phone">Phone: ${user.phone}</p>
      <p class="email">Email: ${user.email}</p>
      <div class="address">
        <p>${user.address.city}</p>
        <p>${user.address.street}</p>
      </div>
      <div class="actions">
        <button>Back to user list</button>
      </div>
    </div>
  `;

  return userPage;
}

export async function getAllUsers() {
  const res = await fetch(baseURL + "/users");
  const users = await res.json();
  return users;
}

async function getUserById(userId) {
  const res = await fetch(baseURL + `/users/${userId}`);
  const user = await res.json();
  return user;
}

export function handleOnClick(event) {
  // const target = event.target;
  const { target } = event;
  const closetsCard = target.closest(".card");

  if (!closetsCard) return;

  getUserById(closetsCard.id).then((user) => {
    const userPageAsHtmlString = createUserPage(user);
    const userList = document.querySelector(".user-list");
    userList.innerHTML = userPageAsHtmlString;
  });
}

export function insertUsersToDOM(users) {
  const list = document.querySelector(".user-list");
  const loader = document.querySelector(".loader");
  const usersAsHtmlString = users.map((user) => createUserCard(user)).join("");
  list.insertAdjacentHTML("afterbegin", usersAsHtmlString);
  list.removeChild(loader);
}

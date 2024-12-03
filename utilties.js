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

export async function getAllUsers() {
  const res = await fetch(baseURL + "/users");
  const users = await res.json();
  return users;
}

async function getUserById() {}

export function handleOnClick(event) {
  // const target = event.target;
  const { target } = event;
  const closetsCard = target.closest(".card");

  if (!closetsCard) return;
}

export function insertUsersToDOM(users) {
  const list = document.querySelector(".user-list");
  const loader = document.querySelector(".loader");
  const usersAsHtmlString = users.map((user) => createUserCard(user)).join("");
  list.insertAdjacentHTML("afterbegin", usersAsHtmlString);
  list.removeChild(loader);
}

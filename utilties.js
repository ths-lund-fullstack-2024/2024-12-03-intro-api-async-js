const baseURL = "https://jsonplaceholder.typicode.com";

export async function getAllUsers() {
  const res = await fetch(baseURL + "/users");
  const users = await res.json();
  console.log(users); 
}

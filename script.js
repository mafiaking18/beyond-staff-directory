document.addEventListener("DOMContentLoaded", () => {
    // Fetch API
    fetch("data.json")
    .then(response => response.json())
    .then(data => {
        window.allUsers = data;
        displayUsers(data)})
    .catch(error => console.error("Error fetching data:", error));
    // This is good to show as an error
});

function displayUsers(users){
    const userList = document.getElementById('user-list');
    userList.innerHTML = ""; //Clears previous content
    users.forEach(user => {
        const userCard = document.createElement("div");
        userCard.classList.add('user-card');
        userCard.innerHTML = `<img src="${user.profilePicture}"></img> <h2>${user.name}</h2><p>Email: ${user.email}</p><p>Department: ${user.department}</p><p>Role: ${user.role}</p>`;
        userList.appendChild(userCard);
    })
}

function searchUsers() {
    const query = document.getElementById("search").value.toLowerCase();
    const filterUsers = window.allUsers.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query) ||
        user.department.toLowerCase().includes(query)
    );
    displayUsers(filterUsers);
}

function sortUsers() {
    const order = document.getElementById("sort").value;
    const sortedUsers = [...window.allUsers].sort((a,b) =>
        order === "asc" ? a.name.localeCompare(b.name) :
    b.name.localeCompare(a.name)
    );
    displayUsers(sortedUsers);
}
//Lars
async function loadTableData() {
  try {
    const response = await fetch("data.json"); // Hämta JSON-filen
    const data = await response.json(); // Konvertera till JSON

    const tableBody = document.getElementById("table-body");

    data.forEach((row) => {
      const tr = document.createElement("tr");
      const statusClass = row.typ_av_larm.toLowerCase().replace(" ", "-");
      tr.innerHTML = `
              <td>${row.enhet}</td>
              <td>${row.rubrik}</td>
              <td>${row.pris}</td>
              <td>${row.status}</td>
              <td><span class="status ${statusClass}">${row.typ_av_larm}</span></td>
          `;

      tableBody.appendChild(tr);
    });
  } catch (error) {
    console.error("Error loading JSON data:", error);
  }
}
window.onload = loadTableData;

//Users
async function loadUserData() {
  try {
    const response = await fetch("users.json");
    const users = await response.json();

    const userList = document.getElementById("user-list");
    const userDetails = document.querySelector(".user-details");
    const detailPicture = document.getElementById("detail-picture");
    const detailName = document.getElementById("detail-name");
    const detailEmail = document.getElementById("detail-email");
    const detailPhone = document.getElementById("detail-phone");
    const detailAddress = document.getElementById("detail-address");
    const detailCity = document.getElementById("detail-city");
    const detailBirthDate = document.getElementById("detail-birth_date");
    const detailWebsite = document.getElementById("detail-website");

    function showUserDetails(user) {
      // Dölja detaljerna först för att starta animation
      userDetails.classList.remove("show");

      // Vänta kort för att animering ska kunna starta om
      setTimeout(() => {
        detailPicture.src = `img/${user.large_picture}`;
        detailName.textContent = `${user.first_name} ${user.last_name}`;
        detailEmail.textContent = user.email;
        detailPhone.textContent = user.phone;
        detailAddress.textContent = user.address;
        detailCity.textContent = user.city;
        detailBirthDate.textContent = user.birth_date;
        detailWebsite.href = user.website;
        detailWebsite.textContent = user.website;

        // Visa detaljerna med animering
        userDetails.classList.add("show");
      }, 200);
    }

    users.forEach((user) => {
      const li = document.createElement("li");

      li.innerHTML = `
        <img src="img/${user.profile_picture}" alt="${user.first_name} ${user.last_name}" class="profile-picture">
        <div class="user-info">
            <h3>${user.first_name} ${user.last_name}</h3>
            <p>${user.email}</p>
        </div>
      `;

      li.addEventListener("click", () => {
        showUserDetails(user);
      });

      userList.appendChild(li);
    });

    // Visa den första användaren som standard
    if (users.length > 0) {
      showUserDetails(users[0]);
    }
  } catch (error) {
    console.error("Fel vid inläsning av användardata:", error);
  }
}

window.addEventListener("DOMContentLoaded", loadUserData);

document.addEventListener("DOMContentLoaded", function () {
  // Hämta användardata från JSON-filen
  fetch("users.json")
    .then((response) => response.json())
    .then((users) => {
      // Räkna antalet användare
      const userCount = users.length;

      // Uppdatera div med id userCount
      document.getElementById("userCount").textContent = userCount;
    })
    .catch((error) => console.error("Error fetching user data:", error));
});

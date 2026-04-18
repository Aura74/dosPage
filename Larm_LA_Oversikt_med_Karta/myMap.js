// Initialize the map
var map = L.map("map").setView([60.1282, 18.6435], 5); // Centrerar på Sverige

// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Fetch user data from the JSON file
fetch("users.json")
  .then((response) => response.json())
  .then((users) => {
    users.forEach((user) => {
      // Create a marker for each user
      var marker = L.marker([
        user.coordinates.latitude,
        user.coordinates.longitude,
      ]).addTo(map);

      // Bind a popup to the marker
      marker.bindPopup(`
                        <h3>${user.first_name} ${user.last_name}</h3>
                        <p><strong>Email:</strong> ${user.email}</p>
                        <p><strong>Telefon:</strong> ${user.phone}</p>
                        <p><strong>Adress:</strong> ${user.address}, ${user.city}</p>
                        <a href="${user.website}" target="_blank">Besök Hemsida</a>
                    `);

      // Event listener for click to expand popup
      marker.on("click", function () {
        marker.openPopup();
      });
    });
  })
  .catch((error) => console.error("Error fetching user data:", error));

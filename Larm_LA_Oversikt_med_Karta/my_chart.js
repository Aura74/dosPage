var ctx = document.getElementById("myChart").getContext("2d");
var earning = document.getElementById("earning").getContext("2d");
var myChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Red", "Green", "Yellow", "Grey", "Blue"],
    datasets: [
      {
        label: "My Set",
        data: [11, 16, 17, 10, 14],
        backgroundColor: [
          "rgba(229, 9, 20, 1)",
          "rgba(24, 119, 242, 1)",
          "rgba(251, 188, 5, 1)",
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
        ],
      },
    ],
  },
  options: {
    responsive: true,
    animateRotate: true,
    animateScale: true,
  },
});

var myChart = new Chart(earning, {
  type: "bar",
  data: {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Andvändning",
        data: [
          6500, 3500, 7500, 6500, 4000, 5000, 3000, 2000, 9000, 10000, 7500,
          11000,
        ],
        backgroundColor: [
          "rgba(66, 133, 244, 1)",
          "rgba(52, 168, 83, 1)",
          "rgba(251, 188, 5, 1)",
          "rgba(234, 67, 53, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(252, 158, 22, 1)",
          "rgba(229, 9, 20, 1)",
          "rgba(24, 119, 242, 1)",
          "rgba(251, 188, 5, 1)",
          "rgba(126, 185, 0, 1)",
          "rgba(18, 145, 210, 1)",
          "rgba(178, 7, 16, 1)",
        ],
      },
    ],
  },
  options: {
    responsive: true,
  },
});

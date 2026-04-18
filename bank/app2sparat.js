// // movements.forEach(function (movement) {
// //   if (movement > 0) {
// //     console.log(`You withdraw ${movement}`);
// //   } else {
// //     console.log(`You withdraw ${Math.abs(movement)}`);
// //   }
// // });

// //Slice
// // let arr = ["a", "b", "c", "d", "e"];
// // console.log(arr.slice(0, 3));
// // console.log(arr.slice(2));
// // console.log(arr.slice(-1));
// // console.log([...arr]);

// // //splice ändrar arrayen
// // let arr2 = ["a", "b", "c", "d", "e"];
// // //console.log(arr2.splice(2, 1));
// // //console.log(arr2.splice(2));
// // //arr2.splice(-1);// sista
// // arr2.splice(0, 2);
// // console.log(arr2);

// // const movementsUSD = movements.map(function (mov) {
// //   return mov * eurToUsd;
// // });

// // console.log(movementsUSD);
// // console.log(movements);

// // const movementUSDfor = [];

// // for (const mov of movements) {
// //   movementUSDfor.push(mov * eurToUsd);
// // }
// // console.log(movementUSDfor);

// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map((age) => (age <= 2 ? 2 * age : 16 + age * 4));
//   const adults = humanAges.filter((age) => age >= 18);
//   // const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;

//   const average = adults.reduce(
//     (acc, age, i, arr) => acc + age / arr.length,
//     0
//   );

//   console.log(humanAges);
//   console.log(adults);
//   console.log(average);
// };
// calcAverageHumanAge([5, 2, 6, 8, 1]);

// const calcAverageHumanAge2 = (ages) =>
//   ages
//     .map((age) => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter((age) => age >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

// const avg1 = calcAverageHumanAge([5, 2, 6, 8, 1]);
// console.log(avg1);

// // 2 3 (2+3)/2
// // (2/2) + (3/2) = 1 + 1/2

// // // Define the form fields
// // var firstNameField = Ext.create('Ext.form.field.Text', {
// //   fieldLabel: 'First Name',
// //   name: 'firstName'
// // });

// // var lastNameField = Ext.create('Ext.form.field.Text', {
// //   fieldLabel: 'Last Name',
// //   name: 'lastName'
// // });

// // // Define the form panel
// // var formPanel = Ext.create('Ext.form.Panel', {
// //   title: 'My Form',
// //   width: 400,
// //   height: 200,
// //   items: [
// //       firstNameField,
// //       lastNameField
// //   ],
// //   buttons: [{
// //       text: 'Submit',
// //       handler: function() {
// //           var values = formPanel.getForm().getValues();
// //           var namesArray = [values.firstName, values.lastName];
// //           console.log(namesArray);
// //       }
// //   }]
// // });

// // // Add the form panel to the page
// // Ext.create('Ext.container.Viewport', {
// //   items: [formPanel]
// // });

// const calcAverageHumanAgeOld = function (ages) {
//   const humanAges = ages.map((age) => (age <= 2 ? 2 * age : 16 + age * 4));
//   const adults = humanAges.filter((age) => age >= 18);

//   const average = adults.reduce(
//     (acc, age, i, arr) => acc + age / arr.length,
//     0
//   );
// };

// // const firstWithdrawal = movements.find((mov) => mov < 0);
// // console.log(firstWithdrawal);

// const account = accounts.find((acc) => acc.owner === "Jessica Davis");
// console.log(account);

// //console.log(movementsDescriptions);

// // const deposits = movements.filter(function (mov) {
// //   return mov > 0;
// // });
// // console.log(deposits);

// // const withdrawals = movements.filter((mov) => mov < 0);
// // console.log(withdrawals);

// // currencies.forEach(function (value, key, map) {
// //   console.log(`${key}: ${value}`);
// // });

// // const bankDepositSum = accounts
// //   .flatMap((acc) => acc.movements)
// //   .filter((mov) => mov > 0)
// //   .reduce((sum, mov) => sum + mov, 0);

// // console.log(bankDepositSum);

// // const numDeposits1000 = accounts
// //   .flatMap((acc) => acc.movements)
// //   .filter((mov) => mov >= 1000).length;

// // const numDeposits1000 = accounts
// //   .flatMap((acc) => acc.movements)
// //   .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);
// // console.log(numDeposits1000);

// // const { deposit, withdrawal } = accounts
// //   .flatMap((acc) => acc.movements)
// //   .reduce(
// //     (sums, curr) => {
// //       curr > 0 ? (sums.deposit += curr) : (sums.withdrawal += curr);
// //       return sums;
// //     },
// //     { deposit: 0, withdrawal: 0 }
// //   );

// // console.log(deposit, withdrawal);

// // const convertTitleCase = function (title) {
// //   const capitzalize = (str) => str[0].toUpperCase() + str.slice(1);

// //   const exeptions = [
// //     "a",
// //     "an",
// //     "the",
// //     "of",
// //     "and",
// //     "but",
// //     "or",
// //     "on",
// //     "in",
// //     "with",
// //   ];

// //   const titleCase = title
// //     .toLowerCase()
// //     .split(" ")
// //     .map((word) => (exeptions.includes(word) ? word : capitzalize(word)))
// //     .join(" ");

// //   return capitzalize(titleCase);
// // };

// // console.log(convertTitleCase("this is a nice title"));
// // console.log(convertTitleCase("this is a LONG title"));
// // console.log(convertTitleCase("and an other LONG title Example"));

// const dogs = [
//   { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
//   { weight: 8, curFood: 200, owners: ["Matilda"] },
//   { weight: 13, curFood: 275, owners: ["Sarha"] },
//   { weight: 32, curFood: 340, owners: ["Michael"] },
// ];
// // 1 hur mycket ska hundarna ha
// dogs.forEach((dog) => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
// //console.log(dogs);

// // 2
// const dogSarah = dogs.find((dog) => dog.owners.includes("Sarha"));
// console.log(
//   `Saras dog is eating ${
//     dogSarah.curFood > dogSarah.recFood ? "much" : "Little"
//   }  `
// );

// //3
// const ownersEatToMuch = dogs
//   .filter((dog) => dog.curFood > dog.recFood)
//   .flatMap((dog) => dog.owners);
// console.log(ownersEatToMuch);

// const ownersEatToLittle = dogs
//   .filter((dog) => dog.curFood < dog.recFood)
//   .flatMap((dog) => dog.owners);
// console.log(ownersEatToLittle);

// //4
// console.log(`${ownersEatToMuch.join(" and ")}s dogs eat to much`);
// console.log(`${ownersEatToLittle.join(" and ")}s dogs eat to Little`);

// //5
// console.log(dogs.some((dog) => dog.curFood === dog.recFood));

// //6
// const checkEatingOk = (dog) =>
//   dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

// console.log(dogs.some(checkEatingOk));

// //7
// console.log(dogs.filter(checkEatingOk));

// //8
// const dogSorted = dogs.slice().sort((a, b) => a.curFood - b.curFood);
// console.log(dogSorted);

// console.log(2 * (53 * 53));

// const now = new Date();
// console.log(new Date().getFullYear());
// console.log(new Date("December 24, 2015"));

// console.log(now.getFullYear());
// console.log(now.getMonth());
// console.log(now.getDate()); // dagen av månades
// console.log(now.getDay()); // dagen av veckan
// console.log(now.getHours());
// console.log(now.getMinutes());
// console.log(now.getSeconds());
// console.log(now.toISOString());
// console.log(now.toDateString());
// console.log(Date.now()); // get timestamp för now
// console.log(now.setFullYear(2015)); // set full year

// /////////////////////////////////////////////////
// /////////////////////////////////////////////////
// // LECTURES

// /*
// ///////////////////////////////////////
// // Converting and Checking Numbers
// console.log(23 === 23.0);
// // Base 10 - 0 to 9. 1/10 = 0.1. 3/10 = 3.3333333
// // Binary base 2 - 0 1
// console.log(0.1 + 0.2);
// console.log(0.1 + 0.2 === 0.3);
// // Conversion
// console.log(Number('23'));
// console.log(+'23');
// // Parsing
// console.log(Number.parseInt('30px', 10));
// console.log(Number.parseInt('e23', 10));
// console.log(Number.parseInt('  2.5rem  '));
// console.log(Number.parseFloat('  2.5rem  '));
// // console.log(parseFloat('  2.5rem  '));
// // Check if value is NaN
// console.log(Number.isNaN(20));
// console.log(Number.isNaN('20'));
// console.log(Number.isNaN(+'20X'));
// console.log(Number.isNaN(23 / 0));
// // Checking if value is number
// console.log(Number.isFinite(20));
// console.log(Number.isFinite('20'));
// console.log(Number.isFinite(+'20X'));
// console.log(Number.isFinite(23 / 0));
// console.log(Number.isInteger(23));
// console.log(Number.isInteger(23.0));
// console.log(Number.isInteger(23 / 0));
// ///////////////////////////////////////
// // Math and Rounding
// console.log(Math.sqrt(25));
// console.log(25 ** (1 / 2));
// console.log(8 ** (1 / 3));
// console.log(Math.max(5, 18, 23, 11, 2));
// console.log(Math.max(5, 18, '23', 11, 2));
// console.log(Math.max(5, 18, '23px', 11, 2));
// console.log(Math.min(5, 18, 23, 11, 2));
// console.log(Math.PI * Number.parseFloat('10px') ** 2);
// console.log(Math.trunc(Math.random() * 6) + 1);
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min) + 1) + min;
// // 0...1 -> 0...(max - min) -> min...max
// // console.log(randomInt(10, 20));
// // Rounding integers
// console.log(Math.round(23.3));
// console.log(Math.round(23.9));
// console.log(Math.ceil(23.3));
// console.log(Math.ceil(23.9));
// console.log(Math.floor(23.3));
// console.log(Math.floor('23.9'));
// console.log(Math.trunc(23.3));
// console.log(Math.trunc(-23.3));
// console.log(Math.floor(-23.3));
// // Rounding decimals
// console.log((2.7).toFixed(0));
// console.log((2.7).toFixed(3));
// console.log((2.345).toFixed(2));
// console.log(+(2.345).toFixed(2));
// ///////////////////////////////////////
// // The Remainder Operator
// console.log(5 % 2);
// console.log(5 / 2); // 5 = 2 * 2 + 1
// console.log(8 % 3);
// console.log(8 / 3); // 8 = 2 * 3 + 2
// console.log(6 % 2);
// console.log(6 / 2);
// console.log(7 % 2);
// console.log(7 / 2);
// const isEven = n => n % 2 === 0;
// console.log(isEven(8));
// console.log(isEven(23));
// console.log(isEven(514));
// labelBalance.addEventListener('click', function () {
//   [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
//     // 0, 2, 4, 6
//     if (i % 2 === 0) row.style.backgroundColor = 'orangered';
//     // 0, 3, 6, 9
//     if (i % 3 === 0) row.style.backgroundColor = 'blue';
//   });
// });
// ///////////////////////////////////////
// // Numeric Separators
// // 287,460,000,000
// const diameter = 287_460_000_000;
// console.log(diameter);
// const price = 345_99;
// console.log(price);
// const transferFee1 = 15_00;
// const transferFee2 = 1_500;
// const PI = 3.1415;
// console.log(PI);
// console.log(Number('230_000'));
// console.log(parseInt('230_000'));
// ///////////////////////////////////////
// // Working with BigInt
// console.log(2 ** 53 - 1);
// console.log(Number.MAX_SAFE_INTEGER);
// console.log(2 ** 53 + 1);
// console.log(2 ** 53 + 2);
// console.log(2 ** 53 + 3);
// console.log(2 ** 53 + 4);
// console.log(4838430248342043823408394839483204n);
// console.log(BigInt(48384302));
// // Operations
// console.log(10000n + 10000n);
// console.log(36286372637263726376237263726372632n * 10000000n);
// // console.log(Math.sqrt(16n));
// const huge = 20289830237283728378237n;
// const num = 23;
// console.log(huge * BigInt(num));
// // Exceptions
// console.log(20n > 15);
// console.log(20n === 20);
// console.log(typeof 20n);
// console.log(20n == '20');
// console.log(huge + ' is REALLY big!!!');
// // Divisions
// console.log(11n / 3n);
// console.log(10 / 3);
// ///////////////////////////////////////
// // Creating Dates
// // Create a date
// const now = new Date();
// console.log(now);
// console.log(new Date('Aug 02 2020 18:05:41'));
// console.log(new Date('December 24, 2015'));
// console.log(new Date(account1.movementsDates[0]));
// console.log(new Date(2037, 10, 19, 15, 23, 5));
// console.log(new Date(2037, 10, 31));
// console.log(new Date(0));
// console.log(new Date(3 * 24 * 60 * 60 * 1000));
// // Working with dates
// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);
// console.log(future.getFullYear());
// console.log(future.getMonth());
// console.log(future.getDate());
// console.log(future.getDay());
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.toISOString());
// console.log(future.getTime());
// console.log(new Date(2142256980000));
// console.log(Date.now());
// future.setFullYear(2040);
// console.log(future);
// ///////////////////////////////////////
// // Operations With Dates
// const future = new Date(2037, 10, 19, 15, 23);
// console.log(+future);
// const calcDaysPassed = (date1, date2) =>
//   Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
// const days1 = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));
// console.log(days1);
// ///////////////////////////////////////
// // Internationalizing Numbers (Intl)
// const num = 3884764.23;
// const options = {
//   style: 'currency',
//   unit: 'celsius',
//   currency: 'EUR',
//   // useGrouping: false,
// };
// console.log('US:      ', new Intl.NumberFormat('en-US', options).format(num));
// console.log('Germany: ', new Intl.NumberFormat('de-DE', options).format(num));
// console.log('Syria:   ', new Intl.NumberFormat('ar-SY', options).format(num));
// console.log(
//   navigator.language,
//   new Intl.NumberFormat(navigator.language, options).format(num)
// );
// ///////////////////////////////////////
// // Timers
// // setTimeout
// const ingredients = ['olives', 'spinach'];
// const pizzaTimer = setTimeout(
//   (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2} 🍕`),
//   3000,
//   ...ingredients
// );
// console.log('Waiting...');
// if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);
// // setInterval
// setInterval(function () {
//   const now = new Date();
//   console.log(now);
// }, 1000);
// */

// const now = new Date();
// labelDate.textContent = new Intl.DateTimeFormat("sv-SE").format(now);

// let date = new Date();
// const sere = date.toLocaleDateString("sv-SE");
// console.log(sere);

// const locale2 = navigator.language;
// console.log(locale2);

// // const calcDaysPassed = (date1, date2) =>
// //   Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
// // const days1 = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));
// // console.log(days1);

// setTimeout(() => console.log("här är pizzan"), 2500);

console.log('what');

// async function getData() {
//   try {
//     const response = await fetch(API_URL);
//     if (response.ok) {
//       const result = await response.json();
//       console.log(result);
//     } else {
//       throw new Error(`Response status: ${response.status}`);
//     }
//   } catch (error) {
//     console.error(error.message);
//   }
// }

// getData();

console.log(window.data);

const items = window.data.items;
console.log(items);

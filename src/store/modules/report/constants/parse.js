const head = require("./head");
// function getKeys(arr) {
//   const result = Array.from({
//     length: arr.length
//   });
//   let index = 0;
//   arr.forEach(i => {
//     result[index] = {};
//     Object.keys(i).forEach(j => {
//       if (typeof i[j] === "string") {
//         const obj = Object.create(
//           {},
//           {
//             [j]: {
//               value: i[j],
//               enumerable: true
//             }
//           }
//         );
//         Object.assign(result[index], obj);
//       } else {
//         if (i[j] instanceof Array) {
//           i[j].forEach(k => {
//             switch (k.company) {
//               case "局属":
//                 Object.assign(result[index], caseFunc(k, "1"));
//                 break;
//               case "交投":
//                 Object.assign(result[index], caseFunc(k, "2"));
//                 break;
//               case "市属":
//                 Object.assign(result[index], caseFunc(k, "3"));
//                 break;
//               case "其他":
//                 Object.assign(result[index], caseFunc(k, "4"));
//                 break;
//               default:
//                 break;
//             }
//           });
//         }
//       }
//     });
//     index++;
//   });
//   return result;
// }
// function caseFunc(o, key) {
//   const result = {};
//   const vp1 = Object.create(
//     {},
//     {
//       ["vehiclesPayment" + key]: {
//         value: o.vehiclesPayment,
//         enumerable: true
//       }
//     }
//   );
//   const vc1 = Object.create(
//     {},
//     {
//       ["vehiclesCount" + key]: {
//         value: o.vehiclesCount,
//         enumerable: true
//       }
//     }
//   );
//   Object.assign(result, vp1);
//   Object.assign(result, vc1);
//   let index = 0;
//   o.vehicleInfos.forEach(i => {
//     const vp = Object.create(
//       {},
//       {
//         ["vehicles" + key + index]: {
//           value: i.vehicles,
//           enumerable: true
//         }
//       }
//     );
//     const vc = Object.create(
//       {},
//       {
//         ["payment" + key + index]: {
//           value: i.payment,
//           enumerable: true
//         }
//       }
//     );
//     Object.assign(result, vp);
//     Object.assign(result, vc);
//     index++;
//   });
//   return result;
// }
// const res = getKeys(head);
// console.dir(res);
function getName(val) {
  const obj = {};
  let index = 0;
  for (const i of val) {
    index++;
    obj[index] = [];
    console.log(obj);
    for (const j of i.vehicleInfos) {
      obj[index].push(j.road);
    }
  }
  return obj;
}
const names = getName(head[0].roadJCInfos);
console.log(names);

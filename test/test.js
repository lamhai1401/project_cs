// new Promise((resolve, reject)=>{
//   resolve(1);
// }).then((r)=>{
//   console.log(++r);
//   return r;
// }).then((r)=>{
//   console.log(++r);
//   return r;
// }).then((r)=>{
//   return Promise.reject('erwerwr');
//   console.log(++r);
//   return r;
// }).then((r)=>{
//   console.log(++r);
//   return r;
// }).catch((err)=>{
//   console.log(err);
// })

let t = new Promise((resolve, reject)=>{
  resolve(2);
});


t.then((r)=>{
  console.log(1, r)
  return ++r;
}).then((r)=>{
  console.log(2,r)
  return ++r
})

// setTimeout(() => {
//   t.then((r)=>{
//     console.log(r)
//   })
// }, 2000);

t.then((r)=>{
  console.log(3, r)
  return ++r;
})
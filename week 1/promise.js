const promise = new Promise((resolve, reject) => {
  let x = 10;

  if (x > 5) {
    resolve("Success");
  } else {
    reject("Failure");
  }
});

promise
  .then(result => console.log(result))
  .catch(error => console.log(error));
console.log("hello");
console.log("bye");

setTimeout(() => {
  console.log("hello again");

  setTimeout(() => {
    console.log("still here?");
  }, 2000);

  setTimeout(() => {
    console.log("this is amazing");

    setTimeout(() => {
      console.log("WoW Imma genius");
    }, 1500);
  }, 2000);
}, 5000);

function wait(milliseconds) {
  function contract(resolve, reject) {
    setTimeout(() => resolve(), milliseconds);
  }

  return new Promise(contract);
}

wait(5000)
  .then(() => {
    console.log("hello again");
  })
  .then(() => {
    wait(2000).then(() => console.log("still here?"));
    wait(2000).then(() => {});
  });

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve(5);
      return;
    }
    reject(3000);
  }, 2000);
});

p1.then((value5) => {
  return 10;
})
  .then((value10) => {
    throw 30;
  })
  .catch((value30) => {
    console.log(value30);
  });

fetch("url", {
  method: "POST",
  headers: {
    "my-header": "header value",
    "my-header2": "header value1",
  },
  body: "",
});

fetch("url", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    a: 5,
    b: 490,
  }),
});

function getAllCountries() {
  return fetch("https://restcountries.com/v3.1/all").then((response) => {
    console.log("status", response.status);
    console.log("header", response.headers);

    // choose one
    // response.text().then(console.log);
    response.json().then(console.log);
  });
}
getAllCountries();

function getAllCountriesLikeIWouldWriteIt() {
  return fetch("https://restcountries.com/v3.1/all").then((response) =>
    response.json()
  );
}

getAllCountriesLikeIWouldWriteIt().then((actualCountries) => {
  console.log("actualCOunteries", actualCountries);
  console.log("actualCOunteries[2].name", actualCountries[2].name);
});

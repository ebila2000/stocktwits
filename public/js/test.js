console.log("Test") 

fetch('http://localhost:3000/symbol/search?q=MSFT').then((response) => { response.json().then((result) => { console.log(result.symbol) }) })
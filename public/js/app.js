const search_form = document.querySelector("form")
const val = document.querySelector("input");
const messageOutput = document.querySelector("#message");

messageOutput.textContent = ""


console.log("here");
search_form.addEventListener("submit", (e)=> {
    e.preventDefault(); // prevent refreshing the browser
    const symbol = val.value;
    console.log(symbol);
    messageOutput.textContent =  "Loading...."
    fetch("http://localhost:3000/symbol/search?q=" + symbol).then((response) => {
        console.log(response)
        response.json().then((data)=> {
            if (data.error)
            {
                messageOutput.textContent    = data.error;
                console.log(data.error)

            }
            else
            {
                console.log(data)
                if (data.messages === undefined)
                {
                    messageOutput.textContent =  "Empty Results. Nothing to show."
   
                }
                else{

                    const mes = []
                    data.messages.forEach((m) => {
                        if (m.body !== undefined)
                            mes.push(m.body)
                    })

                    messageOutput.textContent =  mes
                }

            }
        })
    })
})
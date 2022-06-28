import { getRequests, getPlumbers, deleteRequest, saveCompletion } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})


mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")
            const requests = getRequests()
            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                requestId: parseInt(requestId),
                plumberId: parseInt(plumberId),
                date_created: Date.now(),
                description: (requests.map(request => {if(request.id === parseInt(requestId)){return request.description}})).pop()    
                }
             
            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
               
                saveCompletion(completion)
        }
    }
)

export const Requests = () => {
    const requests = getRequests()
    const plumbers = getPlumbers()
    const requestString = (request) => {
        let listHTML = ` 
        <li>
            ${request.description}
            <select class="plumbers" id="plumbers">
        <option value="">Choose</option>
        ${
        plumbers.map(
            plumber => {
                return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
            }
        ).join("")
        }
         </select>
            <button class="request__delete"
                    id="request--${request.id}">
                Delete
            </button>
        </li>
    `
        
        return listHTML
    }

    let html = `
        <ul>
            ${
                requests.map(requestString).join("")
            }
        </ul>
    `

    return html
}
import { getCompletions, getRequests, getPlumbers } from "./dataAccess.js";

export const Completions = () =>{
    const completions = getCompletions()

    const completionString = (completion) => {
        let listHTML = ` 
        <li>
            ${completion.description}
            <button class="completion__delete" id="completion--${completion.id}">
                    Delete
            </button>
        </li>`
    return listHTML
    }
    
    let html = `
        <ul>
            ${
                completions.map(completionString).join("")
            }
        </ul>
    `

    return html
}
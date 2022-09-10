const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')

//adds event listeners to all existing delete buttons and todo items
Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

//sends a request to the todos router with payload containing:
//method: which method the router should use
//endpoint: which endpoint the router should direct to
//todoId: so the database knows which object to act on
async function request(endpoint, method, todoId){
    try{
        const response = await fetch(`todos/${endpoint}`, {
            method: method,
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function deleteTodo(){
    const todoId = this.parentNode.dataset.id
    await request('deleteTodo','delete',todoId)
}

async function markComplete(){
    const todoId = this.parentNode.dataset.id
    await request('markComplete','put',todoId)
}

async function markIncomplete(){
    const todoId = this.parentNode.dataset.id
    await request('markIncomplete','put',todoId)
}
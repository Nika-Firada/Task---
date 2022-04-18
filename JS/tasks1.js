//Second page start
const taskList = document.querySelector('.tasks-list');
const addTaskForm = document.querySelector('.add-task-form');
const titleValue = document.getElementById('title-value');
const bodyValue = document.getElementById('body-value');
const submitButton = document.getElementById('submitBut');
let output = '';
const url = 'https://my-json-server.typicode.com/Nika-Firada/tasks-proj/tasks';
const renderTasks = (tasks) =>{
    tasks.forEach(task => {
        output += `
        <div style="width: 18rem;" class="card m-2 bg-light animate__animated animate__lightSpeedInLeft">
            <div class="card-body" data-id=${task.id}>
              <h5 class="card-title">${task.title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${task.status}</h6>
              <p class="card-text">${task.description}</p>
              <button type="button" class="btn btn-info" id='edit-task'>Edit</button>
              <button type="button" class="btn btn-danger" id='delete-task'>Delete</button>
            </div>
        </div>
        `;
    });
    taskList.innerHTML = output;
}

fetch(url)
.then(res => res.json())
.then(data => renderTasks(data));
taskList.addEventListener('click', (e) =>{
    e.preventDefault();
    let deleteButtonIsPressed = e.target.id == 'delete-task';
    let editButtonIsPressed = e.target.id == 'edit-task';

    let id = e.target.parentElement.dataset.id;
    //Delete task - method delete
    if(deleteButtonIsPressed){
        fetch(`${url}/${id}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(() => location.reload())
        .then(()=> console.log(`Task was removed. Removed task id:${id}`)) // method DELETE გადაჰყავს method option საჭიროა აქტიური დომენი რომელსაც მთლიანად ექნება წვდომა ჩემს API-ზე.
        .catch((error) => console.log(error));
    }


    if(editButtonIsPressed){
        const parent = e.target.parentElement;
        let titleContent = parent.querySelector('.card-title').textContent;
        let bodyContent = parent.querySelector('.card-text').textContent;
        
        titleValue.value = titleContent;
        bodyValue.value = bodyContent;
    }
    //Edit task
    submitButton.addEventListener('click', (e)=>{
        e.preventDefault();
        fetch(`${url}/${id}`,{
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                title: titleValue.value,
                description: bodyValue.value,
            })
        })
        .then(res => res.json())
        .then(() => location.reload())
        .then(()=>console.log(`Task id:${id} was updated`)); // აქაც იგივე სიტუაციაა
        titleValue.value = '';
        bodyValue.value = '';
    })
});




// create - new task
// Method: POST
addTaskForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: titleValue.value,
            description: bodyValue.value,
            status: 'ongoing'
        })
    })
    .then(res => res.json())
    .then(data => {
        const dataArr = [];
        dataArr.push(data);
        renderTasks(dataArr);
    })
    .catch((error) => console.log(error));
    titleValue.value = '';
    bodyValue.value = '';
})
async function getPosts() {
    return await fetch("http://localhost:3000/posts")
                .then((response) => response.json())
                .then((data) => data);
}

async function getCallbackRequests() {
    return await fetch("http://localhost:3000/callback-requests")
                .then((response) => response.json())
                .then((data) => data);
}

async function getEmails() {
    return await fetch("http://localhost:3000/emails")
                .then((response) => response.json())
                .then((data) => data);
}

//Runs only after page is loaded, 
document.addEventListener("DOMContentLoaded",async function(){
    addPosts();
    addCallbackRequest();
    addEmails();
    clickPosts();
})

//Open add post page when clicked on the add post button
function clickPosts(){
    let addPostBtn = document.querySelector('.add-post');
    let createPostBtn = document.querySelector('#v-pills-add-post-tab');
    addPostBtn.addEventListener('click', () =>{
        createPostBtn.click();
    })
}

// Display posts as a table on admin page
async function addPosts() {
    let posts = await getPosts();
    let articles = document.querySelector('.articles-list tbody');
    articles.innerHTML = '';
    let i = 1;
    posts.forEach((post) => {
        let postHTML = `
        <tr>
            <td>${i++} <input class="id" type="hidden" value="${post.id}"></td>
            <td class="title">${post.title}</td>
            <td class="date">${post.date}</td>
            <td class="country">${post.country}</td>
            <td><button class="edit-btn btn btn-link p-0 text-decoration-none">Edit</button></td>
            <td><button class="remove-btn btn btn-link p-0 text-decoration-none">X</button></td>
        </tr>`;
        //Insert HTML, there are 4 values we can choose for insertAdjacentHTML
        articles.insertAdjacentHTML('beforeend', postHTML);
    })
}
//Display callback requests as a table in admin page 
async function addCallbackRequest() {
    let requests = await getCallbackRequests();
    let requestsBlock = document.querySelector('#v-pills-requests tbody');
    requestsBlock.innerHTML = '';
    let i = 1;
    requests.forEach((request) => {
        let requestHTML = `
        <tr>
            <td>${i++} <input class="id" type="hidden" value="${request.id}"></td>
            <td class="title">${request.phoneNumber}</td>
            <td class="date">${request.date}</td>
            <td><button class="remove-btn btn btn-link p-0 text-decoration-none">X</button></td>
        </tr>`;
        //Insert HTML, there are 4 values we can choose for insertAdjacentHTML
        requestsBlock.insertAdjacentHTML('beforeend', requestHTML);
    })
}

//Display email requests as a table in admin page 
async function addEmails() {
    let emails = await getEmails();
    let emailsBlock = document.querySelector('#v-pills-mails tbody');
    emailsBlock.innerHTML = '';
    let i = 1;
    emails.forEach((email) => {
        let emailHTML = `
        <tr>
            <td>${i++} <input class="id" type="hidden" value="${email.id}"></td>
            <td class="name">${email.name}</td>
            <td class="email">${email.email}</td>
            <td class="date">${email.date}</td>
            <td><button class="remove-btn btn btn-link p-0 text-decoration-none">X</button></td>
            
        </tr>
        <tr>
            <td colspan="5" class="text">${email.text}</td>
        </tr>
        `;
        //Insert HTML, there are 4 values we can choose for insertAdjacentHTML
        emailsBlock.insertAdjacentHTML('beforeend', emailHTML);
    })
}

//Delete callback requests when clicked remove button
  //Event Delegation, since the posts are stored in the database before loading the HTML
  let requestsBlock = document.querySelector('#v-pills-requests');
  //e stands for event, target stores properties of the click 
  requestsBlock.addEventListener('click', function(e){
      //We delete the post if we press the remove btn
      if(e.target.classList.contains('remove-btn')){
          //Jump 2 levels from remove btn to td to tr
          let id = e.target.parentNode.parentNode.querySelector('.id').value; 
          //Connect to server
          fetch('http://localhost:3000/callback-requests/' +id, {
              method: 'DELETE'
          }).then((response) => response.text())
          .then(() => window.history.go())
      }
  })

//Delete email when clicked remove button
  //Event Delegation, since the posts are stored in the database before loading the HTML
  let emailsBlock = document.querySelector('#v-pills-mails');
  //e stands for event, target stores properties of the click 
  emailsBlock.addEventListener('click', function(e){
      //We delete the post if we press the remove btn
      if(e.target.classList.contains('remove-btn')){
          //Jump 2 levels from remove btn to td to tr
          let id = e.target.parentNode.parentNode.querySelector('.id').value; 
          //Connect to server
          fetch('http://localhost:3000/emails/' +id, {
              method: 'DELETE'
          }).then((response) => response.text())
          .then(() => window.history.go())
      }
  })

let logOutBtn = document.querySelector('.log-out-btn');
//Clear cookie when press log out and redirect to main page
logOutBtn.addEventListener('click', function(){
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    window.history.href = '/';
})
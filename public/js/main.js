async function getPosts() {
    return await fetch("http://localhost:3000/posts")
                .then((response) => response.json())
                .then((data) => data);
}

let callMeForm = document.querySelector('.call-me-form');

//Runs only after page is loaded. 
document.addEventListener("DOMContentLoaded",async function(){
    let posts = await getPosts();
    let articles = document.querySelector('.landmarks');
    articles.innerHTML = '';
    posts.forEach((post) => {
        let postHTML = `
        <div class="col">
            <div class="card" >
                <img src="${post.imageURL}" class="card-img-top" alt="${post.title}">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.description}</p>
                    <a href="/landmark?id=${post.id}" class="btn btn-primary">Details</a>
                </div>
            </div>
        </div>`
        //Insert HTML, there are 4 values we can choose for insertAdjacentHTML
        articles.insertAdjacentHTML('beforeend', postHTML);
    })

})
//Sent Phone Number to server when press call me
callMeForm.addEventListener('submit', function(e){
    e.preventDefault();
    let phoneInput = document.querySelector('input');
    fetch('http://localhost:3000/callback-requests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            phoneNumber: phoneInput.value
        })
    }).then((resp) => resp.text())
    .then(() => alert('We will call you back as soon as possible!'))
})

//Search form by class name
let emailRequestForm = document.querySelector('.email-request-form');

//Sent details of email to server when press submit in contact us form
emailRequestForm.addEventListener('submit', function(e){
    e.preventDefault();
    let name = document.querySelector('#name');
    let email = document.querySelector('#email')
    let message = document.querySelector('#message')
    fetch('http://localhost:3000/emails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name.value,
            email:email.value,
            text:message.value
        })
    }).then((resp) => resp.text())
    .then(() => console.log("Submitted!"))
})
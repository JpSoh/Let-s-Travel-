//Scope: Visibility is only within the curly brackets, articlesBlock in the update-post file is
//different from the articlesBlock in the delete-post file
{
    //Event Delegation, since the posts are stored in the database before loading the HTML
    let articlesBlock = document.querySelector('.articles-list');
    let updateBtn = document.querySelector('#v-pills-update-post-tab');
    let updateForm = document.querySelector('.update-post-form')
    let id;

    let titleInput = document.querySelector('#update-title');
    let textArea = document.querySelector('#update-text');

    //e stands for event, target stores properties of the click
    //Returns the current title and text on the update post page 
    articlesBlock.addEventListener('click', async function(e){
        if(e.target.classList.contains('edit-btn')){
            id = e.target.parentNode.parentNode.querySelector('.id').value; 
            let postInfo = await fetch('http://localhost:3000/posts/'+id)
                .then((response) => response.json())
                .then((data) => data)

            titleInput.value = postInfo.title;
            textArea.value = postInfo.text;

            updateBtn.click();
        }
    })

    //Update Post when press submit
    updateForm.addEventListener('submit', async function(e){
        e.preventDefault();
        let updateDescription;
        if(textArea.value.indexOf('.') === -1){
            updateDescription = textArea.value;
        } else {
            updateDescription = textArea.value.substring(0, textArea.value.indexOf('.') + 1);
        }
        await fetch('http://localhost:3000/posts/' +id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: titleInput.value,
                text: textArea.value,
                description: updateDescription
            })
        }).then((resp) => resp.text())
        .then(() => window.history.go())
    })
}
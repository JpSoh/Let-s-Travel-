//Scope: Visibility is only within the curly brackets, articlesBlock in the update-post file is
//different from the articlesBlock in the delete-post file
{
    //Event Delegation, since the posts are stored in the database before loading the HTML
    let articlesBlock = document.querySelector('.articles-list');
    //e stands for event, target stores properties of the click 
    articlesBlock.addEventListener('click', function(e){
        //We delete the post if we press the remove btn
        if(e.target.classList.contains('remove-btn')){
            //Jump 2 levels from remove btn to td to tr
            let id = e.target.parentNode.parentNode.querySelector('.id').value; 
            //Connect to server
            fetch('http://localhost:3000/posts/' +id, {
                method: 'DELETE'
            }).then((response) => response.text())
            .then(() => window.history.go())
        }
    })
}
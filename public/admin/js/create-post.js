let createForm = document.querySelector('.create-post-form');
let title = document.querySelector('#title');
let country = document.querySelector('#country');
let imageURL = document.querySelector('#imageURL');
let text = document.querySelector('#text');
let imageFile = document.querySelector('#image-file');

//POST request 
createForm.addEventListener('submit',function(e){
    //Prevent default browser action for submit
    e.preventDefault();
    let createText = text.value;
    let createDescription;
    if(createText.indexOf('.') === -1){
        createDescription = createText;
    } else {
        createDescription = createText.substring(0, createText.indexOf('.') + 1);
    }
    let data = new FormData(); //By using the form format, we can work with files
    data.append('title', title.value);
    data.append('country', country.value);
    data.append('imageUrl', imageURL.value);
    data.append('text', createText);
    data.append('description', createDescription);
    data.append('imageFile', imageFile.files[0]); //This key is an array 

    fetch('http://localhost:3000/posts', {
        method: 'POST',
        body: data
    }).then((response) => response.text()).then((data) => window.history.go());
})

//Disable one of the function: the image file function or the image URL function
function disableInput(input1, input2){
    if(input1.value){
        input2.disabled = true;
    } else{
        input2.disabled = false;
    }
}

imageURL.addEventListener('change', () => disableInput(imageURL, imageFile));

imageFile.addEventListener('change', () =>  disableInput(imageFile, imageURL));

const opcion = document.querySelectorAll('.opcion');

// Permite recorrer cada una de las opciones //
opcion.forEach(e => {

    //Añadimos un evento a cada elemento seleccionado //
    e.addEventListener('click', function(e){

        // Alternamos las clases de los links 
        const father = e.target.parentNode;
        father.children[1].classList.toggle('animation');
        father.parentNode.children[1].classList.toggle('animation');
    });

});
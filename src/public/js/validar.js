<<<<<<< HEAD
function validar(){

    if((/^\d{5,11}$/).test(document.getElementById('matricula').value)){
        console.log('matricula aceptada')
    }else{
        alert('Solo se pueden agregar numeros en Matricula, en un rango de 5 a 11 digitos')
        document.getElementById('matricula').focus()
        return false
    }

    if((/^[a-zA-ZÀ-ÿ\s]{15,60}$/).test(document.getElementById('nombre').value)){
        console.log('nombre aceptado')
    }else{
        alert('Solo se aceptan letras [A-Z] mayúsculas y minúsculas con un minimo de 15 y máximo de 60 caracteres en Nombre del Alumno')
        document.getElementById('nombre').focus()
        return false
    }

    if((/^[a-zA-ZÀ-ÿ\s]{15,60}$/).test(document.getElementById('tutor').value)){
        console.log('tutor aceptado')
    }else{
        alert('Solo se aceptan letras [A-Z] mayúsculas y minúsculas con un minimo de 15 y máximo de 60 caracteres en Nombre del Tutor')
        document.getElementById('tutor').focus()
        return false
    }
    
    if((/^\d{10}$/).test(document.getElementById('phone').value)){
        console.log('numero telefonico aceptado')
    }else{
        alert('Solo se aceptan 10 números en Telefono.')
        document.getElementById('phone').focus()
        return false
    }

    if(document.getElementById('seccion').value == 0){
        alert('Seleccione una opción en Sección Escolar.')
        document.getElementById('seccion').focus()
        return false
    }

    if((/\d°\sGrupo\s\w/).test(document.getElementById('grupo').value)){
        console.log('numero telefonico aceptado')
    }else{
        alert('Para este campo es importante poner: Grado escolar + Grupo + Letra. Por ejemplo: 1° Grupo B')
        document.getElementById('grupo').focus()
        return false
    }
}

=======
function validar(){

    if((/^\d{5,11}$/).test(document.getElementById('matricula').value)){
        console.log('matricula aceptada')
    }else{
        alert('Solo se pueden agregar numeros en Matricula, en un rango de 5 a 11 digitos')
        document.getElementById('matricula').focus()
        return false
    }

    if((/^[a-zA-ZÀ-ÿ\s]{15,60}$/).test(document.getElementById('nombre').value)){
        console.log('nombre aceptado')
    }else{
        alert('Solo se aceptan letras [A-Z] mayúsculas y minúsculas con un minimo de 15 y máximo de 60 caracteres en Nombre del Alumno')
        document.getElementById('nombre').focus()
        return false
    }

    if((/^[a-zA-ZÀ-ÿ\s]{15,60}$/).test(document.getElementById('tutor').value)){
        console.log('tutor aceptado')
    }else{
        alert('Solo se aceptan letras [A-Z] mayúsculas y minúsculas con un minimo de 15 y máximo de 60 caracteres en Nombre del Tutor')
        document.getElementById('tutor').focus()
        return false
    }
    
    if((/^\d{10}$/).test(document.getElementById('phone').value)){
        console.log('numero telefonico aceptado')
    }else{
        alert('Solo se aceptan 10 números en Telefono.')
        document.getElementById('phone').focus()
        return false
    }

    if(document.getElementById('seccion').value == 0){
        alert('Seleccione una opción en Sección Escolar.')
        document.getElementById('seccion').focus()
        return false
    }

    if((/\d°\sGrupo\s\w/).test(document.getElementById('grupo').value)){
        console.log('numero telefonico aceptado')
    }else{
        alert('Para este campo es importante poner: Grado escolar + Grupo + Letra. Por ejemplo: 1° Grupo B')
        document.getElementById('grupo').focus()
        return false
    }
}

>>>>>>> 9c8afea0f2cd7888fa8ccd0e6803012033d79558
    
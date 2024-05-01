function handleSubmit(){
    preventEventdefault()
    var name = document.getElementById("name").value
    var lastname = document.getElementById("lastname").value
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    
    var data= {
        email: email,
        password: password
    }

    console.log('obtenido')
}
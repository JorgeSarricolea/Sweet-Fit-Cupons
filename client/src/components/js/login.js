function handleSubmit(){
    preventEventdefault()
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    
    var data= {
        email: email,
        password: password
    }

    console.log('obtenido')
}
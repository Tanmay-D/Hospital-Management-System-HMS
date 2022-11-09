function confirm(){
    var x = document.getElementById("password").value;
    var y = document.getElementById("confirmpassword").value;

    if(x!=y){
        alert("Password do not match");
    }
}
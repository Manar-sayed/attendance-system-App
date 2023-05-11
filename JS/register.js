

$(function(){
  
    $(".Register").submit(function(e){
        e.preventDefault();
        //get data from register form..
        let userFirstName=$("#first").val();
        let userLastName=$("#second").val();
        let userAddress=$("#address").val();
        let userEmail=$("#_email").val();
        let userAge=$("#age").val();


        //creat new object
        let usersData = { 
        firstName:userFirstName,
        lastName:userLastName,
        address:userAddress,
        email:userEmail,
        age:userAge,
        userName:"",
        password:"",
        }
       

  fetch('http://localhost:3000/pending',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(usersData)

    })  
    });//end of submit (register)

})//end of load







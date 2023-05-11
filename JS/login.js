$(function(){
    async function newdata(){
        let userNameinput=$("#user").val();
        let userPasswordinput=$("#pass").val();//
        console.log(userNameinput);
        console.log(userPasswordinput);


        // get admin info from db & store  admin info in local storage
        let adminData=await fetch(`http://localhost:3000/admin?userName=${userNameinput}&password=${userPasswordinput}`);
        let adminDataObject= await adminData.json();
      

        // get security info from db & store  security info in local storage
        let securityData=await fetch(`http://localhost:3000/security?userName=${userNameinput}&password=${userPasswordinput}`);
        let securityObject= await securityData.json();
   
        // localStorage.setItem("admin_lastname", adminDataObject[0].lastname);

        // get Employee info from db & store  Employee info in local storage
        let empData=await fetch(`http://localhost:3000/Employees?userName=${userNameinput}&password=${userPasswordinput}`);
        let empObject= await empData.json();
       
       
        // localStorage.setItem("admin_lastname", adminDataObject[0].lastname);


        if(adminDataObject.length){
            localStorage.setItem("admin_firstname", adminDataObject[0].userName);
            location.assign(`http://127.0.0.1:5500/Html/adminPage.html`);
            console.log(adminDataObject);
        }
        else if(securityObject.length){
            localStorage.setItem("security_firstName", securityObject[0].userName);
            location.assign(`http://127.0.0.1:5500/Html/security.html`);

        }
        else if(empObject.length){
            localStorage.setItem("emp_firstName", empObject[0].firstName);
            localStorage.setItem("emp_usertName", empObject[0].userName);
            localStorage.setItem("emp_id", empObject[0].id);
            alert(empObject[0].id,empObject.userName);
            location.assign(`http://127.0.0.1:5500/Html/employeeReport.html`);
        }
        else{
            alert(" Ooops!...your user name isn't here-_-,can you reqister first please...");
        }
        }//end of function
      
    $(".login").submit(function(e){
        e.preventDefault();
        newdata();
    });//end of submit

});//end of load
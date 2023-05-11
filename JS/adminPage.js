$(document).ready(function () {
  let returnName=localStorage.getItem("admin_firstname")
  if(returnName==null){
    location.assign("http://127.0.0.1:5500/Html/welcome.html");
  }

  document.getElementsByTagName('div')[1].innerText=returnName ;
  $("#display").click(function(){
    newdata();
  });

  $("#late").click(function(){
     getAllLate();
  });

  $("#allEmployee").click(function(){
   getAllEmployee();
});
});
            
 //---------------------------------FUNCTIONS-------------------------------------//      
      

// function to display table and get data from json
async function newdata(){
  let Hrow=document.createElement('tr');
  $(Hrow).append('<th>'+"firstName"+'</th>')
  $(Hrow).append('<th>'+"lastName"+'</th>')
  $(Hrow).append('<th>'+"Email"+'</th>')
  $(Hrow).append('<th>'+"Address"+'</th>')
  $(Hrow).append('<th>'+"Age"+'</th>')
  $(Hrow).append('<th>'+"Confirm"+'</th>')
  $(Hrow).append('<th>'+"Ignore"+'</th>')
  $('#thead').append(Hrow);



 let returnData=await fetch('http://localhost:3000/pending');
 let normal= await returnData.json();
 console.log(normal);
 for(let i=0;i<normal.length;i++){
  let newrow =document.createElement('tr');

 //add check icon
  let accept = document.createElement("td");
  accept.innerHTML='<i class="fa fa-check" style="font-size:20px;color:red"></i>'
  accept.addEventListener("click",sendToEmp);

//add ignore icon    
  let ignore = document.createElement("td");
  ignore.innerHTML='<i class="fa fa-close" style="font-size:20px;color:red"></i>'
  ignore.children[0].addEventListener("click",ignoreRequest);

  $(newrow).append('<td>'+normal[i].firstName+'</td>')
  $(newrow).append('<td>'+normal[i].lastName+'</td>')
  $(newrow).append('<td>'+normal[i].email+'</td>')
  $(newrow).append('<td>'+normal[i].address+'</td>')
  $(newrow).append('<td>'+normal[i].age+'</td>')

  $(newrow).append(accept)
  $(newrow).append(ignore)
  
  $('#tbody').append(newrow);
}
  $('#example')
  .DataTable();
}

// to remove requset
async function ignoreRequest(e){
  let name=e.target.parentElement.parentElement.children[0].innerHTML;
  console.log(name);
  let userData= await fetch(`http://localhost:3000/pending?firstName=${name}`);
  let userDataObject= await userData.json();
  fetch(`http://localhost:3000/pending/${userDataObject[0].id}`, {method: 'DELETE',})

}

// to accept requset
async function sendToEmp(e){

  let name=e.target.parentElement.parentElement.children[0].innerHTML;
  alert(name)
  let userData= await fetch(`http://localhost:3000/pending?firstName=${name}`);
  let userDataObject= await userData.json();
  console.log(userDataObject)
  let _password=  generateRandomPassword();
  let _userName=generateRandomUsername(`${userDataObject[0].firstName}`);
  userDataObject[0].userName=_userName;
  userDataObject[0].password=_password;

  emailjs.send("service_hglnp7m","template_m6twmph",{
    from_name: "ITIAdmin",
    firstName: `${userDataObject[0].firstName}`,
    userName:  _userName, 
    password: _password,
    to: userDataObject[0].email,
 


    }).then(()=>{
         fetch(`http://localhost:3000/pending/${userDataObject[0].id}`,{method:'DELETE'})
         userDataObject[0].id=_userName;
         fetch(`http://localhost:3000/Employees`,{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify(userDataObject[0]),  
        })
    })

}
 
function generateRandomUsername(name) {
  let chars ="0123456789-_ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let usernameLength = 6;
  let username = name.substring(0,4);
  for (let i = 0; i <= usernameLength; i++) {
    let randomNumber = Math.floor(Math.random() * chars.length);
    username += chars.substring(randomNumber, randomNumber + 1);
  }

  return username;
}

function generateRandomPassword() {
  let chars =
    "0123456789abcdefghijklmnopqrstuvwxyz-_ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let passwordLength = 12;
  let password = "";
  for (let i = 0; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }

  return password;
}

async function getAllEmployee(){
  let Hrow=document.createElement('tr');
  $(Hrow).append('<th>'+"firstName"+'</th>')
  $(Hrow).append('<th>'+"lastName"+'</th>')
  $(Hrow).append('<th>'+"Email"+'</th>')
  $(Hrow).append('<th>'+"Address"+'</th>')
  $(Hrow).append('<th>'+"Age"+'</th>')

  // $('#tableDiv').html("");
  // $('#late').html("");
  $('#Empthead').append(Hrow);

  let EmpData=await fetch('http://localhost:3000/Employees');
  let EmpDataObj= await EmpData.json();
  console.log(EmpDataObj);
  for(let i=0;i<EmpDataObj.length;i++){
    let row=document.createElement('tr');
    $(row).append('<td>'+EmpDataObj[i].firstName+'</td>')
    $(row).append('<td>'+EmpDataObj[i].lastName+'</td>')
    $(row).append('<td>'+EmpDataObj[i].email+'</td>')
    $(row).append('<td>'+EmpDataObj[i].address+'</td>')
    $(row).append('<td>'+EmpDataObj[i].age+'</td>')
    $('#tbodyEmp').append(row);
  }
    $('#Emp')
    .DataTable();
  }



async function getAllLate(){
      let Hrow=document.createElement('tr');
      $(Hrow).append('<th>'+"userName"+'</th>')
      $(Hrow).append('<th>'+"employeeID"+'</th>')
      $(Hrow).append('<th>'+"Day"+'</th>')

      // $('#Emp').html("");
      // $('#tableDiv').html("");
      $('#latehead').append(Hrow);
     let returnData=await fetch('http://localhost:3000/attendance?attendace_state=absent');
     let lateAll= await returnData.json();
     if(lateAll.length!=0){
      for(let i=0;i<=lateAll.length;i++){
          let Hrow =document.createElement('tr');
          $(Hrow).append('<td>'+lateAll[i].userName+'</td>')
          $(Hrow).append('<td>'+lateAll[i].day+'</td>')
          $(Hrow).append('<td>'+lateAll[i].attendace_state+'</td>')
          $('#tbodylate').append(Hrow);
    }
     }
     else{alert("not found -_-")}


      $('#late')
      .DataTable();
  }
    
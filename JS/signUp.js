let emailArray =[]; 
window.addEventListener('load',function(){
  email=document.getElementById('email');//get email input
  _password=document.getElementById('pass');//get password input
  btn=document.getElementById('btn');
  btn.addEventListener('click',function(e){

});//end of click event at button
btnRegister=this.document.getElementById('btnS');
_email=this.document.getElementById('_email');
_first=this.document.getElementById('first');
_last=this.document.getElementById('second');
_address=this.document.getElementById('address');
_age=this.document.getElementById('age');
btnRegister.onclick=((e)=>{
       if(!ismailValide(_email)  || isemailLength(_email))
       { e.preventDefault();
        _email.style.border="2px solid red"; }
       else{ _email.style.border="1px solid green"; }// email condation
       
       if(!isnameValide(_first)){ _first.style.border="2px solid red";}
       else{_first.style.border="1px solid green";}//first name condation

       if(!isnameValide(_last)){_last.style.border="2px solid red";}
       else{ _last.style.border="1px solid green";}//last name condation

       if(!isAddressValid() ){ _address.style.border="2px solid red";}
       else{ _address.style.border="1px solid green";}//address condation
     
       if(_age.value>25 ){_age.style.border="1px solid green"; }
       else{_age.style.border="2px solid red";}

});//end of click event on register button




//----------------to switch to an from register-----------------//
registerForm = document.querySelector("form.Register");
const loginText = document.querySelector(".title-text .login");
loginForm = document.querySelector("form.login");
loginBtn = document.querySelector("label.login");
RegisterBtn = document.querySelector("label.Register");

RegisterBtn.onclick = (()=>{
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (()=>{
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
});
});//end of load




//------------functions---------------//
function ismailValide(anyEmail) {
    var mailpattern =/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    return anyEmail.value.match(mailpattern);
}


function isPassValide(){
 var passPattern=/^[0-9]{8,12}/;
 return _password.value.match(passPattern);
}

function isnameValide(anyName){
    var namePattern=/^[a-z A-Z]{4,12}/;
    return (anyName.value.match(namePattern));
   }

function isAddressValid(){
    addressPattern=/^[a-zA-Z0-9\s,'-]*$/ 
    return _address.value.match(addressPattern);
}

function isemailLength(email){
  for(i=0;i<emailArray.length;i++){
    if(email.value==emailArray[i]){
        return true;
    }
  }
  return false;
}
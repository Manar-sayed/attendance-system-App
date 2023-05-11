window.addEventListener('load',function(){
  getDiv=document.getElementById('dateInput');
  this.document.getElementsByTagName('div')[1].innerText= getName;


});//end of load
let getName= localStorage.getItem("emp_firstName");
let getID= localStorage.getItem("emp_id");
let getUserName= localStorage.getItem("emp_userName");



$(function(){
  document.getElementById('displayName').innerHTML=getName;
  document.getElementById('calender').addEventListener('change',function(e){
    let dataCalender=e.target.value;
    addEmp(dataCalender);
 })


//to get start & end date in month report
  document.getElementById('startInput').addEventListener('change',function(e){
    let startIn=e.target.value;
   
    document.getElementById('endInput').addEventListener('change',function(e){
      let endIn=e.target.value;
      addRange(startIn,endIn);
   })
  
 })
})//end 
 


//---------------------------------FUNCTIONS----------------------//

async function addEmp(calender){
  let returnData=await fetch(`http://localhost:3000/Employees?firstName=${getName}`);
  let normal= await returnData.json();
  let inNAme=normal[0].firstName;

  let atted=await fetch(`http://localhost:3000/attendance?userName=${normal[0].userName}`);
  let attendData= await atted.json();
  //late times
  let Late_Times = 0
  for (let x = 0; x < normal.length; x++) 
  {   
      if( "08:30 AM" != normal[x].time)
      {
          Late_Times = Late_Times +1;    
      }
  }
//absent times
  attindance_days = [];
        for (let j = 0; j < normal.length; j++) 
        {attindance_days.push(normal[j].day)}
        let Attendance_Times = attindance_days.length;
        let Absence_Times = 22 -attindance_days.length;


for(let i=0;i<attendData.length;i++){
  if(calender==attendData[i].day){
 
    let newrow =document.createElement('tr');

    $(newrow).append('<td>'+inNAme+'</td>')
    $(newrow).append('<td>'+normal[0].lastName+'</td>')
    $(newrow).append('<td>'+attendData[i].time+'</td>')
    $(newrow).append('<td>'+attendData[i].leave+'</td>')
    $(newrow).append('<td>'+Late_Times+'</td>')
    $(newrow).append('<td>'+Absence_Times+'</td>')
 
 
    $('#tbody').append(newrow);
  
    $('#table')
    .DataTable();
     
  }
  else{
    alert("not found")
  }
}

 }
async function addRange(start,end){
   let returnData=await fetch(`http://localhost:3000/Employees?firstName=${getName}`);
   let normal= await returnData.json();
   console.log(normal[0].firstName);
  let atted=await fetch(`http://localhost:3000/attendance?day_gte=${start}&day_lte=${end}&employeeId=${getID}`);
  let attendData= await atted.json();
  console.log(attendData);


for( i=0;i<attendData.length;i++){

    let newrow =document.createElement('tr');

    $(newrow).append('<td>'+normal[0].firstName+'</td>')
    $(newrow).append('<td>'+normal[0].lastName+'</td>')
    $(newrow).append('<td>'+attendData[i].time+'</td>')
    $(newrow).append('<td>'+attendData[i].leave+'</td>')
    $(newrow).append('<td>'+2+'</td>')
    $(newrow).append('<td>'+1+'</td>')
    $('#tbody').append(newrow);
}
  
$('#table')
.DataTable();

 }








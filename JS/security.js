//-----------ANIMATION-------------//
window.addEventListener('load',function(){
  document.querySelector('.btn').addEventListener('click', (evt) => {
      evt.target.classList.add('loading')
    
      setTimeout(() => {
        evt.target.classList.remove('loading')
      }, 3000);
    })
})//end of load

//----------START------------//
$(function () {
   let day_date = "";
   attendance_time = "";
   let getName=localStorage.getItem("security_firstName");
   $("#name").text(`${getName}`);//welcome by name
   $(".btn").click(function (e) {
      e.preventDefault();
      let userName = $("#addEmp").val();
      //check if user name found  or not
      console.log(userName)
      fetch(`http://localhost:3000/Employees?userName=${userName}`)
          .then((data) => data.json())
          .then((data) => {
              if (data.length != 0) {
                  //employee id
                  let employeeID = data[0].id;
                  //start date
                  let interDate = new Date();
                  //exact date
                  let exactDate = new Date();
                  exactDate.setHours(8, 30, 0, 0);
                  // late date
                  let lateDate = new Date();
                  lateDate.setHours(9, 0, 0, 0);
                  day_date = new Date().toISOString().slice(0, 10)
                  attendance_time = interDate.toLocaleTimeString();
                  let newBody = checkArrivalTime(employeeID,interDate, exactDate, lateDate, day_date, attendance_time,userName)
                  fetch(`http://localhost:3000/attendance?employeeID=${employeeID}&day=${day_date}`)
                      .then((data) => data.json())
                      .then((data) => {
                        console.log(data)
                          if (data.length == 0)
                           {
                            fetch(`http://localhost:3000/attendance`, {
                                  headers: { 'Content-Type': 'application/json'},
                                  method: "POST",
                                  body: JSON.stringify(newBody)
                              })//end of post fetch
                           } else {
                              let newpatchBody = {
                                leave: new Date().toLocaleTimeString(),
                              }
                              fetch(`http://localhost:3000/attendance/${data[0].id}`, {
                                  headers: {
                                      'Content-Type': 'application/json'
                                  },
                                  method: "PATCH",
                                  body: JSON.stringify(newpatchBody)
                              })//end of patch fetch

                          }
                      })//end of fetch
              }
              else {
                  alert("no employee have this user name");
            }
          })//end of fetch (get)

    }); // end of submit 
}); //end of load 


////------------------------------------------- functions ------------------------------------/////////

function checkArrivalTime(employeeID,interDate, exactDate, lateDate, day_date, attendance_time,_getuserName) {
  let newBody = {}
  if (interDate <= exactDate) {
    newBody = {
          id:"",
          userName: _getuserName,
          employeeID:employeeID,
          day: day_date,
          time: attendance_time,
          leave: 0,
          attendace_state: "Attend",
      }
  } else if (interDate > exactDate && interDate <= lateDate) {
      // after 8.5 
      let late_time = interDate.getMinutes()-exactDate.getMinutes();
      newBody = {
          id:"",
          userName: _getuserName,
          employeeID:employeeID,
          day: day_date,
          time: attendance_time,
          leave: 0,
          attendace_state: "late",
          late_time: late_time +" min" ,
      }
  } else {
    newBody = {
          id:"",
          userName: _getuserName,
          employeeID:employeeID,
          day: day_date,
          time: attendance_time,
          leave: 0,
          attendace_state: "absent",
      }
  }
  return newBody;
}

//Our API endpoint as a constant:

const fileURL = '../index.html';

  //Global variable for the ID of the model car we're getting data for.
  var currentId = 1;

//API Init
const dataURL = "https://api.fuelapi.com/v1/json/makes/?year=2014&api_key=daefd14b-9f2b-4968-9e4d-9d4bb4af01d1";
var dataArray = [];

//HTML Targets
var nameOptionSelect = "[data-targetMake]";
var nameOption = document.querySelector(nameOptionSelect);
var yearOptionSelect = "[data-targetYear]";
var yearOption = document.querySelector(yearOptionSelect);
var modelOptionSelect = "[data-targetModel]";
var modelOption = document.querySelector(modelOptionSelect);
var submitButtonSelect = "[data-targetButton]";
var submitButton = document.querySelector(submitButtonSelect);

var yearOptionSelect = "[data-targetYear]";
var yearOption = document.querySelector(yearOptionSelect);

var modelOptionSelect = "[data-targetModel]";
var modelOption = document.querySelector(modelOptionSelect);

var submitButtonSelect = "[data-targetButton]";
var submitButton = document.querySelector(submitButtonSelect);


//Data Function (Make)
$.get(dataURL, function (data) {


    //Load Keys
    var dataKeys = Object.keys(data);

    //Implement Keys in Array
    dataKeys.forEach(function (key) {
        var carInfo = data[key];
        dataArray.push(carInfo);
    });



    //Load and Implement Data in HTML
    dataArray.forEach(function (data) {

        //Set HTML Implementation Variables
        var nameMake = data.name;
        var carID = data.id;

        var $modelDropdown = $("<option>", {
          name: carID,
          value: `${carID}`,
          text: `${nameMake}`,
      }); 
         
        //Create HTML Option
        $modelDropdown.attr({make : nameMake});
        $(nameOption).append($modelDropdown);
    });//ends dataArray.forEach
});//ends .get function


nameOption.addEventListener("change", function () {
  $(yearOption).empty();
  var model = $('#data-targetModel');
  var years = $('#data-targetYear');
  console.log(event.target.value);
  //console.log(event.target.make);
  console.log(event.target.name);
  console.log(event.target);
  var option = document.getElementsByName(event.target.value);
  console.log(option[0].innerHTML);
  localStorage.setItem("makeIDKey", option[0].innerHTML);


  const dataModelURL = "https://api.fuelapi.com/v1/json/models/"+event.target.value+"/&api_key=daefd14b-9f2b-4968-9e4d-9d4bb4af01d1";
 console.log(dataModelURL);



//**Year dropdown**
  const dataYearURL = "https://api.fuelapi.com/v1/json/modelYears/52/&api_key=daefd14b-9f2b-4968-9e4d-9d4bb4af01d1";

  $.get(dataYearURL,
    function(response) {
      $(yearOption).append($("<option>", {
        value: ``,
        text: `Any Year`
     })); //end .append
      response.forEach(function (data) {
        $(yearOption).append($("<option>", {
          value: `${data}`,
          text: `${data}`
       }));
     });//end .forEach
  }); //end .get

  //enables the Model Dropdown once year has been selected
  $('select[data-targetYear]').on("change", function(){
    $('[data-targetModel]').removeAttr('disabled');
  });

  //**Model Dropdown**/
  var dataModelArray = [];
  var modelOptionSelect = "[data-targetModel]";
  var modelOption = document.querySelector(modelOptionSelect);

  $.get(dataModelURL, 
    function (response) {
      response.forEach(function (data) {
        var modelMake = data.name;
        var carModelID = data.id;


          $(modelOption).append($("<option>", {
            value: `${modelMake}`,
            text: `${modelMake}`
          }));
      });//end forEach
  }); //end .get


  yearOption.addEventListener("change", function(){
    console.log(event.target.value);
    localStorage.setItem("yearIDKey", event.target.value);//stores selected year to local storage
    });

    modelOption.addEventListener("change", function(){
      console.log(event.target.value);
      localStorage.setItem("modelIDKey", event.target.value);//stores selected model to local stoage
      

      localStorage.setItem("makeIDKey", option[0].innerHTML);
     
   

      //Toggle Submit Button
      submitButton.classList.toggle("buttonHidden");
      });

});//ends nameOption.addEventListener()

//Action after submit button has been pressed
$('input[type=submit]').click(function() {
  window.location.href = "results.html"
});







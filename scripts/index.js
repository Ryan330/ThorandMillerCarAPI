//Our API endpoint as a constant:

const fileURL = '../index.html';

   
//data-targetMake
//data-targetModel
//data-targetYear

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

        //Create HTML Option
        $(nameOption).append($("<option>", {
            value: `${carID}`,
            text: `${nameMake}`
        }));
    });
});



nameOption.addEventListener("change", function () {
  $(yearOption).empty();
  var model = $('#data-targetModel');
  var years = $('#data-targetYear');
  console.log(event.target.value);

  const dataModelURL = "https://api.fuelapi.com/v1/json/models/"+event.target.value+"/&api_key=daefd14b-9f2b-4968-9e4d-9d4bb4af01d1";
 console.log(dataModelURL);


//**Year dropdown**/



  const dataYearURL = "https://api.fuelapi.com/v1/json/modelYears/52/&api_key=daefd14b-9f2b-4968-9e4d-9d4bb4af01d1";

  $.get(dataYearURL,
    function(response) {
      $(yearOption).append($("<option>", {
        value: ``,
        text: `Any Year`
     }));
      response.forEach(function (data) {
        $(yearOption).append($("<option>", {
          value: `${data}`,
          text: `${data}`
       }));
     });
  });

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
            value: `${carModelID}`,
            text: `${modelMake}`
          }));
      });
  });

  yearOption.addEventListener("change", function(){
    console.log(event.target.value);
    });
});


//  Action after submit button has been pressed

$('input[type=submit]').click(function() {
  window.location.href = ""
});














//***********************Setup of second page***********************************

// jQuery-ified versions of our DOM elements
const $prevButton = $('[data-control-prev]');
const $nextButton = $('[data-control-next]');
const $carInfo    = $('[data-car-info]');

//Calculates the previous ID 
function prevId() {
  //Don't decrement if currentId is 1
  if (currentId > 1) {
      currentId = currentId - 1;
  }
}

//Calculates the next ID
function nextId() {
    currentId = currentId + 1;
}


//Creates the container for the car's info
function createCard(carData) {
   var $carCard = $('div');
   var $carInfoList = createList(carData);
   $carCard.append($carInfoList);
   return $carCard;
}

//Creates a list of specific car infomation
function createList(carData) {
    var$carInfoList = $('<ul>');


    Object.keys(carData).forEach(function (key) {
        var val = carData[key];
    
        if (Array.isArray(val)) {
          if (val.length > 0 && val[0] !== '') {
            console.log(val);
            var arrayString = val.join(', ');
            var $carInfoItem = $('<li>', {
              text: `${key}: [${arrayString}]`
            });
    
            $carInfoList.append($carInfoItem);
          }
        } else if (val !== '') {
          var $carInfoItem = $('<li>', {
            text: `${key}: ${val}`
          });
    
          $carInfoList.append($carInfoItem);
        }
    
      });
    
      return $carInfoList;
    }
    

//Draws car info to the page
function drawCar(carData) {
    console.log(carData);
    var $carCard = createCard(carData);
      
      
   //Empty out the current car info
   $carInfo.html('');
      
   //Put our new car card in the box
   $carInfo.append($carCard);
  
}

//Makes Ajax req, then draws car info to page
function getAndDrawCar() {
    getCar()
      .then(drawCar)
  }
  
  //Attaches event listeners to buttons.
  //Makes initial Ajax request for first car
  function main() {
  
    $prevButton.on('click', function (event) {
      event.preventDefault();
      prevId();
      getAndDrawCar();
    });
  
    $nextButton.on('click', function (event) {
      event.preventDefault();
      nextId();
      getAndDrawCar();
    });
  
    getAndDrawCar();
  }

//Sets it off
main()
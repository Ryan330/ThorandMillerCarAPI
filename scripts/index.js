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

var modelOptionSelect = "[data-targetModel]";
var modelOption = document.querySelector(modelOptionSelect);

nameOption.addEventListener("change", function () {
  var model = $('#data-targetModel');
  var years = $('#data-targetYear');
  console.log(event.target.value);

  const dataModelURL = "https://api.fuelapi.com/v1/json/models/"+event.target.value+"/&api_key=daefd14b-9f2b-4968-9e4d-9d4bb4af01d1";
 console.log(dataModelURL);


//**Year dropdown**/

var yearOptionSelect = "[data-targetYear]";
var yearOption = document.querySelector(yearOptionSelect);

const dataYearURL = "https://api.fuelapi.com/v1/json/modelYears/52/&api_key=daefd14b-9f2b-4968-9e4d-9d4bb4af01d1";

$.get(dataYearURL,
  function(response) {
    var modelYear = "";
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
  
  //    $.getJSON(dataModelURL,
  //        function (data) {
  //            var archetype = model;
  //            archetype.empty();
  //            $.each(data, function (index, element) {
  //                archetype.append("<option value='" + element.id + "'>" + element.first_name + "</option>");
  //        });
  //     model.prop('disabled', false);
  //     cmodel.change();
  // } else {
  //     model.prop('disabled', true);
  //     years.prop('disabled', true);
  // }

});
// const dataYearsURL = "https://api.fuelapi.com/v1/json/modelYears/"+element.id+"/&api_key=daefd14b-9f2b-4968-9e4d-9d4bb4af01d1"

// $('#data-targetModel').change(function () {
//   $('#data-targetYear').prop('disabled', false);
//   $.getJSON(dataYearsURL,
//       { option: $(this).val() },
//       function (data) {
//           var archetype = $('#data-targetYear');
//           archetype.empty();
//           $.each(data, function (index, element) {
//               archetype.append("<option value='" + element.id + "'>" + element.name + "</option>");
//           });
//       });
// });

// $('#data-targetMake')
//          .val('MY-OPTION-VALUE-HERE')
//          .trigger('change');






//
////make another ajax request 
//
//const modelURL = "https://api.fuelapi.com/v1/json/makes/?year=2014&api_key=daefd14b-9f2b-4968-9e4d-9d4bb4af01d1";
//var modelArray = [];
//
//var nameOptionSelect = "[data-targetModel]";
//var nameOption = document.querySelector(nameOptionSelect);
//
//$.get(dataURL, function (data) {
//
//    var dataKeys = Object.keys(data);
//
//    dataKeys.forEach(function (key) {
//        var carInfo = data[key];
//
//        dataArray.push(carInfo);
//    });
//
//    dataArray.forEach(function (data) {
//
//        var nameMake = data.name;
//        var carID = data.id;
//
//        $(nameOption).append($("<option>", {
//            value: `${carID}`,
//            text: `${nameMake}`
//        }));
//    });
//});

  //const url = 'modelsData.js';
  //// Populate dropdown with list of makes
  //$.getJSON(url, function (data) {
  //  $.each(data, function (key, entry) {
  //    dropdown.append($('<option></option>').attr('value', entry.id).text(entry.name));
  //  })
  //});
//
//// jQuery-ified versions of our DOM elements
//const $prevButton = $('[data-control-prev]');
//const $nextButton = $('[data-control-next]');
//const $carInfo    = $('[data-car-info]');
//
////Calculates the previous ID 
//function prevId() {
//  //Don't decrement if currentId is 1
//  if (currentId > 1) {
//      currentId = currentId - 1;
//  }
//}
//
////Calculates the next ID
//function nextId() {
//    currentId = currentId + 1;
//}
//
////Filter out all cap strings and lengths greater than 2 
//function isUpperCase(str) {
//    return str === str.toUpperCase() && str.length > 2;
//}
//
////Creates the container for the car's info
//function createCard(carData) {
//   var $carCard = $('div');
//   var $carInfoList = createList(carData);
//   $carCard.append($carInfoList);
//   return $carCard;
//}
//
////Creates a list of specific car infomation
//function createList(carData) {
//    var$carInfoList = $('<ul>');
//
//
//    Object.keys(carData).forEach(function (key) {
//        var val = carData[key];
//    
//        if (Array.isArray(val)) {
//          if (val.length > 0 && val[0] !== '') {
//            console.log(val);
//            var arrayString = val.join(', ');
//            var $carInfoItem = $('<li>', {
//              text: `${key}: [${arrayString}]`
//            });
//    
//            $carInfoList.append($carInfoItem);
//          }
//        } else if (val !== '') {
//          var $carInfoItem = $('<li>', {
//            text: `${key}: ${val}`
//          });
//    
//          $carInfoList.append($carInfoItem);
//        }
//    
//      });
//    
//      return $carInfoList;
//    }
//    
//
////Draws car info to the page
//function drawCar(carData) {
//    console.log(carData);
//    var $carCard = createCard(carData);
//      
//      
//   //Empty out the current car info
//   $carInfo.html('');
//      
//   //Put our new car card in the box
//   $carInfo.append($carCard);
//  
//}
//
////Combo function! Makes Ajax req, then draws car info to page
//function getAndDrawCar() {
//    getCar()
//      .then(drawCar)
//  }
//  
//  //Attaches event listeners to buttons.
//  //Makes initial Ajax request for first car
//  function main() {
//  
//    $prevButton.on('click', function (event) {
//      event.preventDefault();
//      prevId();
//      getAndDrawCar();
//    });
//  
//    $nextButton.on('click', function (event) {
//      event.preventDefault();
//      nextId();
//      getAndDrawCar();
//    });
//  
//    getAndDrawCar();
//  }
//
////Sets this thing off!
//main();

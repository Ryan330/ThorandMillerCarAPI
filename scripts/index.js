//Our API endpoint as a constant:
const URL = '../scripts/modelData.js';



//data-targetMake
//data-targetModel
//data-targetYear

//Global variable for the ID of the model car we're getting data for.
var currentId = 1;

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

//Filter out all cap strings and lengths greater than 2 
function isUpperCase(str) {
    return str === str.toUpperCase() && str.length > 2;
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

//Combo function! Makes Ajax req, then draws car info to page
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

//Sets this thing off!
main();

//HTML Targets
var resultsImageSelector = "[data-targetImage]";
var resultsImage = document.querySelector(resultsImageSelector);

// Makes XMLHttpRequest()
var request = new XMLHttpRequest();

// jQuery-ified versions of our DOM elements
const $prevButton = $('[data-control-prev]');
const $nextButton = $('[data-control-next]');
const $carInfo    = $('[data-car-info]');

//Calculates the previous ID 
function prevId() {

  if (currentId > 1) {
      currentId = currentId - 1;
  }
}

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

var imgURL = "https://api.fuelapi.com/v1/json/vehicle/19100/?api_key=daefd14b-9f2b-4968-9e4d-9d4bb4af01d1&productID=1";

$.get(imgURL, 
    function (response) {
        response.forEach(function (data) {
            var imgID = data.id;
        });





$(nameOption).append($("<img>", {
    src: `${imgID}`;
}));
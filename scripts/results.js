
//HTML Targets
var resultsImageSelector = "[data-targetImage]";
var resultsImage = document.querySelector(resultsImageSelector);


//retrieve local storage car ID
var modelIDKey = localStorage.getItem("modelIDKey");
console.log(modelIDKey);

var makeIDKey = localStorage.getItem("makeIDKey");
console.log(makeIDKey);

var yearIDKey = localStorage.getItem("yearIDKey");
console.log(yearIDKey);


const dataModelURL = "https://api.fuelapi.com/v1/json/vehicles/?year="+yearIDKey+"&model="+modelIDKey+"&make="+makeIDKey+"&api_key=daefd14b-9f2b-4968-9e4d-9d4bb4af01d1";
 console.log(dataModelURL);

 $.get(dataModelURL,
    function(vehicleInfoArray) {
        console.log(vehicleInfoArray[0].id);
        var vehicleID = vehicleInfoArray[0].id;
        const mediaURL = "https://api.fuelapi.com/v1/json/vehicle/"+vehicleID+"/?api_key=daefd14b-9f2b-4968-9e4d-9d4bb4af01d1";
        console.log(mediaURL);

        $.get(mediaURL, function(dataMedia){
            console.log(dataMedia.products);
            createCard(dataMedia);
        
        }).catch(function(error){
            console.log(error);

        });
    }//ends vehicleInfoArray function
).catch(function(error){
    $(resultsImage).append($("<img>", {
        src: `${sideImageUrl}`
      }));

});//ends .catch function


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
  var createCard = (result) => {
    var $carCard = $('<div>');
    var $carInfoList = $('<ul>');
    $carCard.append($carInfoList);
    var $results = $('.results'); //targeting results in HTML
    $results.append($carCard);
  
    var $trim = $('<li>').text(result.trim);
    $carInfoList.append($trim);
  
    var $driveTrain = $('<li>').text(result.drivetrain)
    $carInfoList.append($driveTrain);
    
    var $sideImage = $('<li>');
    var sideImageUrl = result.products[0].productFormats[0].assets.find(asset => {
      return asset.shotCode.code === '037'
    }).url;
    
  console.log(sideImageUrl); //ToDo:  append the created DOM element****

  $(resultsImage).append($("<img>", {
    src: `${sideImageUrl}`
  }));//ends resultImage
};//ends createCard

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
//main()

var imgURL = "https://api.fuelapi.com/v1/json/vehicle/19100/?api_key=daefd14b-9f2b-4968-9e4d-9d4bb4af01d1&productID=1";
//
//$.get(imgURL, 
//    function (response) {
//        response.forEach(function (data) {
//          var imgID = data.id;
//          
//        });
//
//$(nameOption).append($("<img>", {
//    src: `${imgID}`
//}));


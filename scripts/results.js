
//HTML Targets (10)
var resultsImageSelector = "[data-targetImage]";
var resultsImage = document.querySelector(resultsImageSelector);

var resultsTitleSelector = "[data-targetCarTitle]";
var resultsTitle = document.querySelector(resultsTitleSelector);

//retrieve car ID from local storage  (11)
var modelIDKey = localStorage.getItem("modelIDKey");
console.log(modelIDKey);

var makeIDKey = localStorage.getItem("makeIDKey");
console.log(makeIDKey);

var yearIDKey = localStorage.getItem("yearIDKey");
console.log(yearIDKey);

// values are plugged in but have to be written out. API goes from integer id to word format (12)
const dataModelURL = "https://api.fuelapi.com/v1/json/vehicles/?year="+yearIDKey+"&model="+modelIDKey+"&make="+makeIDKey+"&api_key=daefd14b-9f2b-4968-9e4d-9d4bb4af01d1";
 console.log(dataModelURL);

 $.get(dataModelURL,
    function(vehicleInfoArray) {
        console.log(vehicleInfoArray[0].id); //retrieves id to plug into the URL(13)
        var vehicleID = vehicleInfoArray[0].id;
        const mediaURL = "https://api.fuelapi.com/v1/json/vehicle/"+vehicleID+"/?api_key=daefd14b-9f2b-4968-9e4d-9d4bb4af01d1";
        console.log(mediaURL);

        $.get(mediaURL, function(dataMedia){
            console.log(dataMedia.products); //shows list of all possible media files for the car (14)
            createCard(dataMedia);
        
        }).catch(function(error){
            console.log(error); 

        });
    }//ends vehicleInfoArray function
).catch(function(error){                //error to catch if there is no image in array (15)
    $(resultsImage).append($("<img>", {
        src: "images/noImage.jpg"
      }));

});//ends .catch function


// Makes XMLHttpRequest() (16)
var request = new XMLHttpRequest(); 

// jQuery-ified versions of our DOM elements
const $prevButton = $('[data-control-prev]');
const $nextButton = $('[data-control-next]');
const $carInfo    = $('[data-car-info]');


//Creates the container for the car's info (17)
  var createCard = (result) => {
    var $carCard = $("<div>");
    var $carInfoList = $("<ul>");
    $carCard.append($carInfoList);
    var $results = $(".results"); //targeting results in HTML
    $results.append($carCard);


    //Car Title  
    $(resultsTitle).append($("<span>", {
      text: `(${yearIDKey})`
    }));
    
    $(resultsTitle).append($("<span>", {
      text: `${makeIDKey}:`
    }));

    $(resultsTitle).append($("<span>", {
      text: `${modelIDKey}`
    }));
  

    //Car Information: lists info and images into card (18)
    //Trim
    $($results).append($("<li>", {
      text: `Trim: ${result.trim}`
    }));
  
    //Drivetrain
    $($results).append($("<li>", {
      text: `Drivetrain: ${result.drivetrain}`
    }));

    //Number of Doors
    $($results).append($("<li>", {
      text: `Number of Doors: ${result.num_doors}`
    }));

    //Body Type
    $($results).append($("<li>", {
      text: `Body Type: ${result.bodytype}`
    }));

    //Car Images
    var $carImage = $("<span>");

    //Image Array    Array of shot calls to append to the end of the URL (19)
    //First: Front View | Second: Side View | Third: Rear View
    var imgArray = ["046", "037", "121", "059", "050", "156", "173"];
    var i = 0;

    //Load Car Images
    var carImageUrl = result.products[0].productFormats[0].assets.find(asset => {
      return asset.shotCode.code === imgArray[i];
    }).url;
    
    console.log(carImageUrl); 

    //Display Car Image
    $(resultsImage).append($("<img>", {
      src: `${carImageUrl}`,
      title: `${yearIDKey} ${makeIDKey} ${modelIDKey}`
    }));

    //Previous Button
      $prevButton.on('click', function (event) {
        event.preventDefault();

        //Go to previous image in image collection
        i -= 1;

        //Maintain Image Array Index
        if (i < 0) {i = imgArray.length - 1}; 

        //Load Car Images     // loads car image to card (20)
        carImageUrl = result.products[0].productFormats[0].assets.find(asset => {
          return asset.shotCode.code === imgArray[i];
        }).url;

        //Display Car Image
        $(resultsImage).empty().append($("<img>", {
          src: `${carImageUrl}`,
          title: `${yearIDKey} ${makeIDKey} ${modelIDKey}`
        }));
      
    });

        //Next Button
        $nextButton.on('click', function (event) {
          event.preventDefault();
  
          //Go to previous image in image collection
          i += 1;
  
          //Maintain Image Array Index
          if (i > imgArray.length) {i = 0}; 
  
          //Load Car Images
          carImageUrl = result.products[0].productFormats[0].assets.find(asset => {
            return asset.shotCode.code === imgArray[i];
          }).url;
  
          //Display Car Image   calls on stored inputs and plugs them into URL
          $(resultsImage).empty().append($("<img>", {
            src: `${carImageUrl}`,
            title: `${yearIDKey} ${makeIDKey} ${modelIDKey}`
          }));
        
      });
 
};
 

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

//Sets it off
//main()

var imgURL = "https://api.fuelapi.com/v1/json/vehicle/19100/?api_key=daefd14b-9f2b-4968-9e4d-9d4bb4af01d1&productID=1";



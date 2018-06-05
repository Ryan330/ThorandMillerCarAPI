
//HTML Targets
var resultsImageSelector = "[data-targetImage]";
var resultsImage = document.querySelector(resultsImageSelector);

var resultsTitleSelector = "[data-targetCarTitle]";
var resultsTitle = document.querySelector(resultsTitleSelector);


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
    }
).catch(function(error){
    $(resultsImage).append($("<img>", {
        src: "images/noImage.jpg"
      }));

});




// Makes XMLHttpRequest()
var request = new XMLHttpRequest();

// jQuery-ified versions of our DOM elements
const $prevButton = $('[data-control-prev]');
const $nextButton = $('[data-control-next]');
const $carInfo    = $('[data-car-info]');


//Creates the container for the car's info


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
  

    //Car Information
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

    //Image Array
    //First: Front View | Second: Side View | Third: Rear View
    var imgArray = ["046", "037", "121", "059", "050", "156", "173"];
    var i = 0;

    //Load Car Images
    var carImageUrl = result.products[0].productFormats[0].assets.find(asset => {
      return asset.shotCode.code === imgArray[i];
    }).url;
    
    console.log(carImageUrl); //ToDo:  append the created DOM element****



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


        //Load Car Images
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
  
  
          //Display Car Image
          $(resultsImage).empty().append($("<img>", {
            src: `${carImageUrl}`,
            title: `${yearIDKey} ${makeIDKey} ${modelIDKey}`
          }));
        
      });
 
};
 





////Creates a list of specific car infomation
//function createList(carData) {
//    var $carInfoList = $('<ul>');


    // Object.keys(carData).forEach(function (key) {
    //     var val = carData[key];
    
    //     if (Array.isArray(val)) {
    //       if (val.length > 0 && val[0] !== '') {
    //         console.log(val);
    //         var arrayString = val.join(', ');
    //         var $carInfoItem = $('<li>', {
    //           text: `${key}: [${arrayString}]`
    //         });
    
    //         $carInfoList.append($carInfoItem);
    //       }
    //     } else if (val !== '') {
    //       var $carInfoItem = $('<li>', {
    //         text: `${key}: ${val}`
    //       });
    
    //       $carInfoList.append($carInfoItem);
    //     }
    
    //   });
    
    //   return $carInfoList;
    // }

    

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
//
//$.get(imgURL, 
//    function (response) {
//        response.forEach(function (data) {
//          var imgID = data.id;
//          
//        });
//
//
//
//$(nameOption).append($("<img>", {
//    src: `${imgID}`
//}));





(function()
{
	//
    var NowMoment = moment();
	//var eDisplayMoment = document.getElementById('prueba');
	var inputId= document.getElementById('newdate');
    //eDisplayMoment.innerHTML = NowMoment.format('YYYY-M-D');
    inputId.value = NowMoment.format('DD/MM/YYYY');

  

})();

/*window.onload = function(){
   //document.getElementById('date-movie').innerHTML = 'hi';
    
        //var data = !{JSON.stringify(data)}; // <====
       // divElement.innerHTML = data[1]['id']; // <=== just a test, so no for loop
       // document.getElementById('date-movie').innerHTML=data[1];
      //var data = !{JSON.stringify(fechas)};
 

    console.log(local_data);
      //var jsonObject = JSON.parse(fechas);

}*/
       
/*$(document).ready(function() {
   // var fechas = !{JSON.stringify(fechas)}; 
    //injectDataOnView();
   /* for (var i=0; i<fechas.length; i++) {
    console.log(fechas[i]);
    }*/
 /*  alert("Holaaaaa");
   console.log(local);
});

/*this.(document).ready(function() {
    var request = $.ajax({
        type: "POST",
        url: "/example_array/",
        data: {"name":""}, // if you wanted to specifiy what list then pass an actual name
        dataType: "html"
    });

    request.done(function(JSON_array) {
        array_data = JSON.parse(JSON_array)["fechas"]
        //from here you have your array to play with
    });
});*/

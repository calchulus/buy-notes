var myHeaders = new Headers();

myHeaders.append("Accept", "application/json")

var test1 = test();

var myInit = {method: 'GET',
                headers: myHeaders};
var result = fetch("http://api.reimaginebanking.com/accounts?key=bfb89f2b1bfd56ed997cf7e93471eaed",myInit)

result
.then(function(response) {
    return response.json();
    //console.log(data);
}).then(function(result) {

    console.log(result[0]);
})

var myHeaders = new Headers();
myHeaders.append("Accept","application/json")
var myInit = {method: 'POST',
                headers: myHeaders};
var result = request.post('http://api.reimaginebanking.com/customers?key=bfb89f2b1bfd56ed997cf7e93471eaed', {form:{key:'value'}})


.then(function(response){
    
})


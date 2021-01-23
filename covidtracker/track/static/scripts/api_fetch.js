const data = null;
console.log("hello")

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === 4) {
        try{
            console.log(this.responseText);
        }
        catch(e) {
            console.log('Error_api_fetch_1: ' + e.name);
        }
    }
    
});

xhr.open("GET", "https://covid-193.p.rapidapi.com/statistics");
xhr.setRequestHeader("x-rapidapi-key", "SIGN-UP-FOR-KEY");
xhr.setRequestHeader("x-rapidapi-host", "covid-193.p.rapidapi.com");

xhr.send(data);
let total = {};
let death = {};

function drop_down_onchange() {
    let country = document.getElementById("country_selection").value;
    console.log(country);

    document.getElementById("title_content").innerText =
        "COVID-19 LIVE NUMBER FOR " + country;

    let cards = document.getElementsByClassName("small");
    cards[0].innerText = "Loading...";
    cards[1].innerText = "Loading...";
    cards[2].innerText = "Loading...";
    cards[3].innerText = "Loading...";

    country =
        country === null || country == ">---select a country---"
            ? fetch_data_by_country("canada")
            : fetch_data_by_country(country);
}

function drop_down_onchange_for_plot() {
    dates = [];

    for (i = 9; i > 0; i--) {
        var current_date = new Date();
        var pastDate = current_date.getDate() - i;
        current_date.setDate(pastDate);
        dates.push(current_date.toISOString().split("T")[0]);
    }
    // console.log(dates);
    /*dates.forEach((date) => {
      console.log(date);
      country = document.getElementById("country_selection").value;
      country =
        country === null || country == ">---select a country---"
          ? fetch_data_by_country_date("canada", date)
          : fetch_data_by_country_date(country, date);
    });*/
    country = document.getElementById("country_selection").value;
    country =
        country === null || country == ">---select a country---"
            ? fetch_data_by_country_date("Canada", dates)
            : fetch_data_by_country_date(country, dates);
}

function fetch_data_by_country(country) {
    fetch(
        "https://covid-193.p.rapidapi.com/statistics?country=" + country,
        {
            method: "GET",
            headers: {
                "x-rapidapi-key":
                    "cf0cc6c39fmsh6978155cd15ca71p1c62bajsn4453d836d5f9",
                "x-rapidapi-host": "covid-193.p.rapidapi.com",
            },
        }
    ).then((response) => {
        response
            .json()
            .then((data) => {
                //console.log(data.response);
                test = data;
                let cards = document.getElementsByClassName("small");
                cards[0].innerText = data.response[0].cases.total
                    ? data.response[0].cases.total
                    : 0;
                cards[1].innerText = data.response[0].cases.critical
                    ? data.response[0].cases.critical
                    : 0;
                cards[2].innerText = data.response[0].deaths.total
                    ? data.response[0].deaths.total
                    : 0;
                cards[3].innerText = data.response[0].cases.recovered
                    ? data.response[0].cases.recovered
                    : 0;
            })
            .catch((err) => {
                console.error(err);
            });
    });
}

function fetch_data_by_country_date(country, dates) {
    console.log(country, dates);
    total = {};
    const fetch1 = async (country, date) => {
        await fetch(
            "https://covid-193.p.rapidapi.com/history?country=" +
            country +
            "&day=" +
            date,
            {
                method: "GET",
                redirect: "follow",
                headers: {
                    "x-rapidapi-key":
                        "1e2f4f94dbmsh9fc0dcd6b9a82fap1516edjsn402832e9ca33",
                    "x-rapidapi-host": "covid-193.p.rapidapi.com",
                },
            }
        ).then((response) => {
            response.json().then((data) => {
                console.log(data);
                try{
                    total[date] = data["response"][0]["cases"]["new"];
                } catch {
                    total[date] = 0;
                }
                try{
                    death[date] = data["response"][0]["deaths"]["new"];
                } catch {
                    death[date] = 0;
                }                 
                
                plot();
            });
        });
    };
    dates.forEach((date) => {
        fetch1(country, date);
        console.log(total);
    });
}

function plot() {
    let my_chart;
    const ctx = document.getElementById("myChart").getContext("2d");
    if (my_chart) {
        my_chart.destroy();
    }
    console.log(Object.keys(total));
    my_chart = new Chart(ctx, {
        type: "bar",
        data: {
            datasets: [
                {
                    label: "New cases",
                    data: Object.values(total),
                    borderColor: "#FFF",
                    backgroundColor: "#FFF",
                    borderWidth: 1,
                },
                {
                    label: "New Death",
                    data: Object.values(death),
                    borderColor: "#f44336",
                    backgroundColor: "#f44336",
                    borderWidth: 1,
                },
            ],
            labels: Object.keys(total),
        },
        options: {
            title: {
                display: true,
                text: "new cases in the last 9 days",
                position: "right",
            },
            responsive: true,
            maintainAspectRation: false,
        },
    });
}
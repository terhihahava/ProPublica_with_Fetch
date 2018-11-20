var header = new Headers({
    'X-API-Key': 'Lem7H6zVJiFJr0KgobrNWgH6I7hpeSbNTduC0qGx'
});

var url = "https://api.propublica.org/congress/v1/115/senate/members.json";

fetch(url, {
        headers: header
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        let allMembers = data.results[0].members
        
    getNumberOfRepresentatives(data)
    numberOfSenatorsInTenPercent(data)
    getPartyAverage(data)

    
    createSenateAtGlance()

    
    createArrays(data)
    
    findWorstSenators()

    createBottomAttendance()
    
    findBestSenators()
    
    createTopAttendance()
       
    })



function createSenateAtGlance() {


    var tablebody1 = document.getElementById("senate_at_a_glance");

    var row = tablebody1.insertRow();

    row.insertCell().innerHTML = "Democrats";
    row.insertCell().innerHTML = statistics.number_of_dems;
    row.insertCell().innerHTML = statistics.D_voted_with_party;

    var row = tablebody1.insertRow();

    row.insertCell().innerHTML = "Republicans";
    row.insertCell().innerHTML = statistics.number_of_repubs;
    row.insertCell().innerHTML = statistics.R_voted_with_party;

    var row = tablebody1.insertRow();

    row.insertCell().innerHTML = "Independents";
    row.insertCell().innerHTML = statistics.number_of_ind;
    row.insertCell().innerHTML = statistics.I_voted_with_party;


}




function createBottomAttendance() {


    var tablebody2 = document.getElementById("bottom_attendance");

    for (i = 0; i < statistics.number_of_senators; i++) {

        var row2 = tablebody2.insertRow();

        row2.insertCell().innerHTML = statistics.bottom_attendance1[i];
        row2.insertCell().innerHTML = statistics.bottom_attendance2[i];
        row2.insertCell().innerHTML = statistics.bottom_attendance3[i];

    }
}

//createBottomAttendance();

function createTopAttendance() {


    var tablebody3 = document.getElementById("top_attendance");

    for (i = 0; i < statistics.number_of_senators; i++) {

        var row3 = tablebody3.insertRow();

        row3.insertCell().innerHTML = statistics.top_attendance1[i];
        row3.insertCell().innerHTML = statistics.top_attendance2[i];
        row3.insertCell().innerHTML = statistics.top_attendance3[i];

    }
}

//createTopAttendance();

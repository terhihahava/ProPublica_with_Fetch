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

        findLeastLoyalSenators()

        createLeastLoyal()

        sortTablea()

        findMostLoyalSenators()

        createMostLoyal()

        sortTableb()

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

//createSenateAtGlance();


function createLeastLoyal() {

    var tablebody5 = document.getElementById("least_loyal");

    for (i = 0; i < statistics.number_of_senators; i++) {

        var row5 = tablebody5.insertRow();

        row5.insertCell().innerHTML = statistics.bottom_loyalty1[i];
        row5.insertCell().innerHTML = statistics.bottom_loyalty2[i];
        row5.insertCell().innerHTML = statistics.bottom_loyalty3[i];
    }
}

//createLeastLoyal();


function createMostLoyal() {

    var tablebody6 = document.getElementById("most_loyal");

    for (i = 0; i < statistics.number_of_senators; i++) {

        var row6 = tablebody6.insertRow();

        row6.insertCell().innerHTML = statistics.top_loyalty1[i];
        row6.insertCell().innerHTML = statistics.top_loyalty2[i];
        row6.insertCell().innerHTML = statistics.top_loyalty3[i];

    }
}

//createMostLoyal();

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
        getCheckedBoxes()
        createDropdownMenu(data)
        printTable(data)
        getFilteredTable()


    })


//CREATE ARRAY FROM CHECKBOXES

//var allMembers = data.results[0].members;

function getCheckedBoxes() {

    var checkedBoxes = document.querySelectorAll('input[name=party_name]:checked');
    var checkboxArray = Array.from(document.querySelectorAll('input[name=party_name]:checked')).map(elt => elt.value);
    console.log(checkboxArray);
    return checkboxArray;
}



//CREATE ARRAY OF STATES, REMOVE DUPLICATES AND CREATE DROPDOWN VALUES FOR STATES

function createDropdownMenu(data) {
    
   allMembers = data.results[0].members;
    var stateArray = [];
    for (i = 0; i < allMembers.length; i++) {
        var state = allMembers[i].state;
        stateArray.push(state);
    }
    var uniqueStateArray = stateArray.reduce(function (a, b) {
    if (a.indexOf(b) < 0) a.push(b);
    return a;
}, []);
    var dropDownValue = document.getElementById("state_dropdown");

    for (var i = 0; i < uniqueStateArray.length; i++) {

        var option = document.createElement('option');
        option.innerHTML = uniqueStateArray[i];
        dropDownValue.appendChild(option);
    }
    
}





// PRINT TABLE BEFORE ONCHANGE:

function printTable(data) {
allMembers = data.results[0].members;

    var body = document.getElementById("senate-data");

    var header = document.getElementById("thead");
    var tableheader = header.insertRow();
    tableheader.insertCell().innerHTML = "Senator name";
    tableheader.insertCell().innerHTML = "Party";
    tableheader.insertCell().innerHTML = "State";
    tableheader.insertCell().innerHTML = "Seniority";
    tableheader.insertCell().innerHTML = "Voting%";
    tableheader.setAttribute("id", "header_id");


    for (i = 0; i < allMembers.length; i++) {

        var firstName = allMembers[i].first_name;
        var middleName = allMembers[i].middle_name;
        var lastName = allMembers[i].last_name;
        var fullName = firstName + " " + middleName + " " + lastName
        if (middleName == null) {
            var fullName = firstName + " " + lastName
        };
        var urlLink = allMembers[i].url;
        var nameWithLink = fullName.link("urlLink");

        var party = allMembers[i].party;
        var state = allMembers[i].state;
        var seniority = allMembers[i].seniority;
        var totalVotes = allMembers[i].total_votes;
        var missedVotes = allMembers[i].missed_votes;
        var percentageVotes = ((totalVotes - missedVotes) / totalVotes) * 100;
        var percentageVotesRounded = Math.round(percentageVotes) + " %";

        var row = body.insertRow();
        console.log(row);

        row.insertCell().innerHTML = nameWithLink;
        row.insertCell().innerHTML = party;
        row.insertCell().innerHTML = state;
        row.insertCell().innerHTML = seniority;
        row.insertCell().innerHTML = percentageVotesRounded;
    }
}

//printTable()

//FILTER TABLE BASED ON CHECKBOXES AND DROPDOWN MENU:


function getFilteredTable() {
    var checkedBoxes = document.querySelectorAll('input[name=party_name]:checked');
    var checkboxArray = Array.from(document.querySelectorAll('input[name=party_name]:checked')).map(elt => elt.value);


    var dropDownValue = document.getElementById("state_dropdown").value;

    console.log(dropDownValue)

    var body = document.getElementById("senate-data");

    var header = document.getElementById("thead");
    var tableheader = header.insertRow();
    tableheader.insertCell().innerHTML = "Senator name";
    tableheader.insertCell().innerHTML = "Party";
    tableheader.insertCell().innerHTML = "State";
    tableheader.insertCell().innerHTML = "Seniority";
    tableheader.insertCell().innerHTML = "Voting%";
    tableheader.setAttribute("id", "header_id");

    var rowCount = body.rows.length;
    for (var x = rowCount - 1; x > 0; x--) {
        body.deleteRow(x);
    }

    for (i = 0; i < allMembers.length; i++) {
        if (checkboxArray.includes(allMembers[i].party) && dropDownValue == allMembers[i].state || checkboxArray.includes(allMembers[i].party) && dropDownValue == "all") {

            var firstName = allMembers[i].first_name;
            var middleName = allMembers[i].middle_name;
            var lastName = allMembers[i].last_name;
            var fullName = firstName + " " + middleName + " " + lastName
            if (middleName == null) {
                var fullName = firstName + " " + lastName
            };
            var urlLink = allMembers[i].url;
            var nameWithLink = fullName.link("urlLink");

            var party = allMembers[i].party;
            var state = allMembers[i].state;
            var seniority = allMembers[i].seniority;
            var totalVotes = allMembers[i].total_votes;
            var missedVotes = allMembers[i].missed_votes;
            var percentageVotes = ((totalVotes - missedVotes) / totalVotes) * 100;
            var percentageVotesRounded = Math.round(percentageVotes) + " %";

            var row = body.insertRow();
            console.log(row);

            row.insertCell().innerHTML = nameWithLink;
            row.insertCell().innerHTML = party;
            row.insertCell().innerHTML = state;
            row.insertCell().innerHTML = seniority;
            row.insertCell().innerHTML = percentageVotesRounded;
        }

    }

}

//getFilteredTable();



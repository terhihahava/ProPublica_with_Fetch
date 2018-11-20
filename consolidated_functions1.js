//NUMBER OF REPRESENTATIVES:

//var allMembers = data.results[0].members;


function getNumberOfRepresentatives(data) {
    allMembers = data.results[0].members;



    var list_of_democrats = [];
    var list_of_republicans = [];
    var list_of_independents = [];


    for (var i = 0; i < allMembers.length; i++) {
        var party = allMembers[i].party;
        var firstName = allMembers[i].first_name;
        var middleName = allMembers[i].middle_name;
        var lastName = allMembers[i].last_name;
        var fullName = firstName + " " + middleName + " " + lastName
        if (middleName == null) {
            var fullName = firstName + " " + lastName
        };

        if (party == "D") {
            list_of_democrats.push(fullName);

        }

        if (party == "R") {
            list_of_republicans.push(fullName);

        }

        if (party == "I") {
            list_of_independents.push(fullName);

        }

    }

    statistics.number_of_dems = list_of_democrats.length;
    statistics.number_of_repubs = list_of_republicans.length;
    statistics.number_of_ind = list_of_independents.length;

}

//getNumberOfRepresentatives();

function numberOfSenatorsInTenPercent(data) {
    allMembers = data.results[0].members;
    
    var list_of_all_members = [];
   
    for (var i = 0; i < allMembers.length; i++) {
       
        var firstName = allMembers[i].first_name;
        var middleName = allMembers[i].middle_name;
        var lastName = allMembers[i].last_name;
        var fullName = firstName + " " + middleName + " " + lastName
        if (middleName == null) {
            var fullName = firstName + " " + lastName
        };

        list_of_all_members.push(fullName);
       var number_of_all_members = list_of_all_members.length;
        var number_of_persons_in_10prc = number_of_all_members/10
    
        

        } 

   statistics.number_of_senators = number_of_persons_in_10prc;

}

//numberOfSenatorsInTenPercent();



//% VOTED WITH PARTY AVERAGE:

function getPartyAverage() {

    var votes_with_party_D = [];
    var votes_with_party_R = [];
    var votes_with_party_I = [];

    for (var i = 0; i < allMembers.length; i++) {
        var party = allMembers[i].party;
        var votes_with_party = allMembers[i].votes_with_party_pct;

        if (party == "D") {
            votes_with_party_D.push(votes_with_party);
            if (votes_with_party_D.length) {
                sum = votes_with_party_D.reduce(function (a, b) {
                    return a + b;
                });
                var avg_votes_with_party_D = sum / votes_with_party_D.length;
            }
            statistics.D_voted_with_party = Math.round(avg_votes_with_party_D);
        }


        if (party == "R") {
            votes_with_party_R.push(votes_with_party);
            if (votes_with_party_R.length) {
                sum = votes_with_party_R.reduce(function (a, b) {
                    return a + b;
                });
                var avg_votes_with_party_R = sum / votes_with_party_R.length;
            }

            statistics.R_voted_with_party = Math.round(avg_votes_with_party_R);
        }

        if (party == "I") {
            votes_with_party_I.push(votes_with_party);
        }
        if (votes_with_party_I.length) {
            sum = votes_with_party_I.reduce(function (a, b) {
                return a + b;
            });
            var avg_votes_with_party_I = sum / votes_with_party_I.length;
        }
        statistics.I_voted_with_party = Math.round(avg_votes_with_party_I);

    }
}

//getPartyAverage();


//ARRAY OF MISSED & PARTY VOTES:


function createArrays() {

    var missedVotesPercentageArray = [];
    var partyVotesPercentageArray = [];
    var highestMissedArray = [];
    var lowestMissedArray = [];
    var lowestPartyVotesArray = [];
    var highestPartyVotesArray = [];
    var number_of_persons_in_10prc = 10.5;

    for (var i = 0; i < allMembers.length; i++) {
        var missed_number_of_votes = allMembers[i].missed_votes;
        var total_number_of_votes = allMembers[i].total_votes;
        var percentage_missed_votes = (missed_number_of_votes / total_number_of_votes) * 100;
        var percentage_party_votes = allMembers[i].votes_with_party_pct;
        var number_of_party_votes = total_number_of_votes * percentage_party_votes;

        missedVotesPercentageArray.push(percentage_missed_votes);
        partyVotesPercentageArray.push(percentage_party_votes);
    }

    var organizedArray1 = missedVotesPercentageArray.sort(function (a, b) {
        return b - a
    }) //highest number of missed votes

    for (var i = 0; i < number_of_persons_in_10prc; i++) {
        highestMissedArray.push(organizedArray1[i])
    }

    var breakpointValue1 = highestMissedArray[10];
    statistics.BPV1 = breakpointValue1;

    var organizedArray2 = missedVotesPercentageArray.sort(function (a, b) {
        return a - b
    }) ///lowest number of missed votes

    for (var i = 0; i < number_of_persons_in_10prc; i++) {
        lowestMissedArray.push(organizedArray2[i])
    }

    var breakpointValue2 = lowestMissedArray[10];
    statistics.BPV2 = breakpointValue2;

    var organizedArray3 = partyVotesPercentageArray.sort(function (a, b) {
        return a - b
    }) //lowest party votes first


    for (var i = 0; i < number_of_persons_in_10prc; i++) {
        lowestPartyVotesArray.push(organizedArray3[i])
    }

    var breakpointValue3 = lowestPartyVotesArray[10];
    statistics.BPV3 = breakpointValue3;

    var organizedArray4 = partyVotesPercentageArray.sort(function (a, b) {
        return b - a
    }) //highest party votes first

    for (var i = 0; i < number_of_persons_in_10prc; i++) {
        highestPartyVotesArray.push(organizedArray4[i])
    }

    var breakpointValue4 = highestPartyVotesArray[10];
    statistics.BPV4 = breakpointValue4;

}

//
//createArrays();



//FIND WORST AND BEST SENATORS:


var senators_with_most_party_votes = [];
var top_number_party_votes = [];
var top_percentage_party_votes = [];
var senators_with_least_party_votes = [];
var bottom_number_party_votes = [];
var bottom_percentage_party_votes = [];

function findWorstSenators() {

    var senators_with_most_missed_votes = [];
    var top_number_missed_votes = [];
    var top_percentage_missed_votes = [];

    for (var i = 0; i < allMembers.length; i++) {
        var missed_number_of_votes = allMembers[i].missed_votes;
        var total_number_of_votes = allMembers[i].total_votes;
        var percentage_missed_votes = (missed_number_of_votes / total_number_of_votes) * 100;
        var firstName = allMembers[i].first_name;
        var middleName = allMembers[i].middle_name;
        var lastName = allMembers[i].last_name;
        var fullName = firstName + " " + middleName + " " + lastName
        if (middleName == null) {
            var fullName = firstName + " " + lastName
        };
        var percentage_missed_votes_rounded = Math.round(percentage_missed_votes) + " %";


        if (percentage_missed_votes >= statistics.BPV1) {
            senators_with_most_missed_votes.push(fullName);
            top_number_missed_votes.push(missed_number_of_votes);
            top_percentage_missed_votes.push(percentage_missed_votes_rounded);
        }
        statistics.bottom_attendance1 = senators_with_most_missed_votes;
        statistics.bottom_attendance2 = top_number_missed_votes;
        statistics.bottom_attendance3 = top_percentage_missed_votes;
    }
}

//FindWorstSenators();

function findBestSenators() {

    var senators_with_least_missed_votes = [];
    var bottom_number_missed_votes = [];
    var bottom_percentage_missed_votes = [];

    for (var i = 0; i < allMembers.length; i++) {
        var missed_number_of_votes = allMembers[i].missed_votes;
        var total_number_of_votes = allMembers[i].total_votes;
        var percentage_missed_votes = (missed_number_of_votes / total_number_of_votes) * 100;
        var firstName = allMembers[i].first_name;
        var middleName = allMembers[i].middle_name;
        var lastName = allMembers[i].last_name;
        var fullName = firstName + " " + middleName + " " + lastName
        if (middleName == null) {
            var fullName = firstName + " " + lastName
        };
        var percentage_missed_votes_rounded = Math.round(percentage_missed_votes) + " %";


        if (percentage_missed_votes <= statistics.BPV2) {
            senators_with_least_missed_votes.push(fullName);
            bottom_number_missed_votes.push(missed_number_of_votes);
            bottom_percentage_missed_votes.push(percentage_missed_votes_rounded);
        }
        statistics.top_attendance1 = senators_with_least_missed_votes;
        statistics.top_attendance2 = bottom_number_missed_votes;
        statistics.top_attendance3 = bottom_percentage_missed_votes;

    }
}

function findLeastLoyalSenators() {

    var senators_with_least_party_votes = [];
    var bottom_number_party_votes = [];
    var bottom_percentage_party_votes = [];

    for (var i = 0; i < allMembers.length; i++) {
        var total_number_of_votes = allMembers[i].total_votes;
        var firstName = allMembers[i].first_name;
        var middleName = allMembers[i].middle_name;
        var lastName = allMembers[i].last_name;
        var fullName = firstName + " " + middleName + " " + lastName
        if (middleName == null) {
            var fullName = firstName + " " + lastName
        };
        var percentage_party_votes = allMembers[i].votes_with_party_pct;
        var number_of_party_votes = total_number_of_votes * percentage_party_votes;
        var percentage_party_votes_rounded = Math.round(percentage_party_votes) + " %";
        var number_of_party_votes_rounded = Math.round(number_of_party_votes);


        if (percentage_party_votes <= statistics.BPV3) {
            senators_with_least_party_votes.push(fullName);
            bottom_number_party_votes.push(number_of_party_votes_rounded);
            bottom_percentage_party_votes.push(percentage_party_votes_rounded);
        }
        statistics.bottom_loyalty1 = senators_with_least_party_votes;
        statistics.bottom_loyalty2 = bottom_number_party_votes;
        statistics.bottom_loyalty3 = bottom_percentage_party_votes;

    }
}

function findMostLoyalSenators() {

    var senators_with_most_party_votes = [];
    var top_number_party_votes = [];
    var top_percentage_party_votes = [];

    for (var i = 0; i < allMembers.length; i++) {
        var total_number_of_votes = allMembers[i].total_votes;
        var firstName = allMembers[i].first_name;
        var middleName = allMembers[i].middle_name;
        var lastName = allMembers[i].last_name;
        var fullName = firstName + " " + middleName + " " + lastName
        if (middleName == null) {
            var fullName = firstName + " " + lastName
        };
        var percentage_party_votes = allMembers[i].votes_with_party_pct;
        var number_of_party_votes = total_number_of_votes * percentage_party_votes;
        var percentage_party_votes_rounded = Math.round(percentage_party_votes) + " %";
        var number_of_party_votes_rounded = Math.round(number_of_party_votes);


        if (percentage_party_votes >= statistics.BPV4) {
            senators_with_most_party_votes.push(fullName);
            top_number_party_votes.push(number_of_party_votes_rounded);
            top_percentage_party_votes.push(percentage_party_votes_rounded);
        }
        statistics.top_loyalty1 = senators_with_most_party_votes;
        statistics.top_loyalty2 = top_number_party_votes;
        statistics.top_loyalty3 = top_percentage_party_votes;

    }
}

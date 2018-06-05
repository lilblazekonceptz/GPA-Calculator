/*

Style   : GPA Calculator Javascript for Calculating GPA
Version : 1.0
Author  : LilBlaze Konceptz
URI     : https://github.com/lilblazekonceptz

Copyright © All rights Reserved 

*/

// Variable Declarations

var TABLE_BODY = document.querySelector('tbody');
var RESULTS = document.querySelector('#result');
var LETTER_GRADE = { "A": 5.00, "B":4.00, "C":3.00, "D":2.00, "E":1.00, "F":0.00};
var LETTER_GRADE2 = { "A": 4.00, "B":3.00, "C":2.00, "D":1.00, "E":0.00, "F":0.00};





// screen size
var screen = window.innerWidth;
if (screen < 1000) {
    var top = document.querySelector('.col-md-8');
    top.parentElement.classList.remove('row');
    top.classList.remove('col-md-8');
    document.querySelector('#result').classList.remove('col-md-4');
}




/*
* Calculate the overall GPA for the class
*/





function calculateGPA() {
    event.preventDefault();
    
    // Checking for the Institution Selected
    var school = document.querySelector("#selectInstitution");
    var school_selected = school.value;

    if(school_selected == "University"){
        var allRows = TABLE_BODY.querySelectorAll('tr');
    var acc_credits = parseInt(RESULTS.querySelector('#accumulated-credits').value) || 0;
    var acc_points = parseInt(RESULTS.querySelector('#accumulated-points').value) || 0;
    var allClassGrades = Number.isInteger(acc_points) ? [acc_points] : [];
    var allClassCredits = Number.isInteger(acc_credits) ? [acc_credits] : [];

    for (var i = 0; i < allRows.length; i++) {
        var columns = allRows[i].children;
        var classGrade = {};

        for (var k = 0; k < columns.length; k++) {
            var id = columns[k].children[0];
            switch (id.getAttribute('id')) {
                case "course":
                    classGrade.course = id.value;
                    break;
                case "credits":
                    classGrade.credits = id.value;
                    break;
                case "letter-grade":
                    classGrade.letter = id.value;
                    break;
                default:
                    classGrade.pass_fail = id.checked;
            }
        }

        var point = getGradePoint(classGrade);
        classGrade.credits = !classGrade.pass_fail ? classGrade.credits : 0;
        if (!isNaN(point) && Number.isInteger(parseInt(classGrade.credits))) {
            allClassGrades.push(parseFloat(point));
            allClassCredits.push(parseInt(classGrade.credits));
        }
    }
    var result = getAverage(allClassGrades, allClassCredits);
    RESULTS.querySelector('#gpa').innerHTML = result.average;
    RESULTS.querySelector('#total-points').innerHTML = result.sumOfGrades;
    RESULTS.querySelector('#total-credits').innerHTML = result.sumOfCredits;
    }

    else{
    var allRows = TABLE_BODY.querySelectorAll('tr');
    var acc_credits = parseInt(RESULTS.querySelector('#accumulated-credits').value) || 0;
    var acc_points = parseInt(RESULTS.querySelector('#accumulated-points').value) || 0;
    var allClassGrades = Number.isInteger(acc_points) ? [acc_points] : [];
    var allClassCredits = Number.isInteger(acc_credits) ? [acc_credits] : [];

    for (var i = 0; i < allRows.length; i++) {
        var columns = allRows[i].children;
        var classGrade = {};

        for (var k = 0; k < columns.length; k++) {
            var id = columns[k].children[0];
            switch (id.getAttribute('id')) {
                case "course":
                    classGrade.course = id.value;
                    break;
                case "credits":
                    classGrade.credits = id.value;
                    break;
                case "letter-grade":
                    classGrade.letter = id.value;
                    break;
                default:
                    classGrade.pass_fail = id.checked;
            }
        }

        var point = getGradePoint2(classGrade);
        classGrade.credits = !classGrade.pass_fail ? classGrade.credits : 0;
        if (!isNaN(point) && Number.isInteger(parseInt(classGrade.credits))) {
            allClassGrades.push(parseFloat(point));
            allClassCredits.push(parseInt(classGrade.credits));
        }
    }
    var result = getAverage(allClassGrades, allClassCredits);
    RESULTS.querySelector('#gpa').innerHTML = result.average;
    RESULTS.querySelector('#total-points').innerHTML = result.sumOfGrades;
    RESULTS.querySelector('#total-credits').innerHTML = result.sumOfCredits;
    }


    
}


//Getting Letter Grade for University
function getGradePoint(grade) {
    var point = void 0;
    var classLetterGrade = grade.letter;
    var credits = grade.credits;
    point = !grade.pass_fail ? LETTER_GRADE[classLetterGrade] * credits : 0;
    return point.toFixed(2);
}

//Getting Letter Grade for Polytechnic
function getGradePoint2(grade) {
    var point = void 0;
    var classLetterGrade = grade.letter;
    var credits = grade.credits;
    point = !grade.pass_fail ? LETTER_GRADE2[classLetterGrade] * credits : 0;
    return point.toFixed(2);
}

// Getting Average of Grades and Credits
function getAverage(grades, credits) {
    var gpa = { sumOfCredits: 0, sumOfGrades: 0, average: 0 };
    if (grades.length > 0) {
        for (var i = 0; i < grades.length; i++) {
            gpa.sumOfGrades += grades[i];
            gpa.sumOfCredits += credits[i];
        }
        var average = (gpa.sumOfGrades / gpa.sumOfCredits).toFixed(2);
        gpa.average = !isNaN(average) ? average : 0;
        return gpa;
    }
    return gpa;
}

/*
* Add new rows to the table
*/
function addRow() {
    var row = document.createElement('tr');
    var lastRow = TABLE_BODY.lastElementChild;
    TABLE_BODY.appendChild(row);

    // row becomes the last element of its new parent
    row = TABLE_BODY.lastElementChild;
    var arr = TABLE_BODY.firstElementChild.children;
    for (var i = 0; i < arr.length; i++) {
        var b = arr[i].cloneNode(true);
        row.appendChild(b);
    }
}




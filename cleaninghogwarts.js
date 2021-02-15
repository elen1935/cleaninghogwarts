"use strict";

window.addEventListener("DOMContentLoaded", start);

const allStudents = [];
const studentsDataCleaned = []; //not sure if i need this

//This defines a template (prototype) for the data objects
const Student = {
    firstName:"",
    lastName:"",
    middleName:"",
    nickname:"",
    imageFilename:"",
    house:"",
}


function start( ) {
    console.log("ready");

    loadJSON();
}


function loadJSON() {
    fetch("https://petlatkea.dk/2021/hogwarts/students.json")
    .then( response => response.json() )
    .then( jsonData => {
        // when loaded, prepare objects
        prepareObjects( jsonData );
    });
}

function prepareObjects( jsonData ) {
    jsonData.forEach( jsonObject => {
        // Create new object with cleaned data - and store that in the allStudents array

        // "newStudent" is the object we want to create, "Student" is the prototype to use
        const newStudent = Object.create(Student);

        console.log(allStudents);

        const nameSplitted = jsonObject.fullname.split(" ");
        
        newStudent.firstName = nameSplitted[0];
        newStudent.lastName = nameSplitted[1];
        newStudent.middleName = nameSplitted[2];
        newStudent.nickname = nameSplitted[3];
        //newStudent.imageFilename = ;
        newStudent.house = jsonObject.house;


        // TODO: MISSING CODE HERE !!!
        allStudents.unshift(newStudent);


        //(NOT SURE IF IT GOES HERE) - populate the object with cleaned data from the JSON object
        //const firstNameEdit = newStudent.firstName.substring(0,1).toUpperCase();
        const firstNameTrimmed = newStudent.firstName.trim().toLowerCase();
        //console.log(firstNameTrimmed);

        /*const firstSpace = fullname.indexOf(" ");
        const secondSpace = fullname.lastIndexOf(" ");*/

        /*const firstNameLowercase = newStudent.firstNameTrimmed.toLowerCase();
        const firstNameCapitalised = newStudent.firstNameLowercase.substring(0,1).toUpperCase();*/
        
        
        
        /*const firstNameToLowercase = newStudent.firstName.toLowerCase();
        console.log(firstNameToLowercase);*/
        //it shows on the console properly but don't know how to show it on the table from the HTML
    });

    displayList();
}

function displayList() {
    // clear the list
    document.querySelector("#list tbody").innerHTML = "";

    // build a new list
    allStudents.forEach( displayStudent );
}

function displayStudent ( newStudent ) {
    // create clone
    const clone = document.querySelector("template#student").content.cloneNode(true);

    // set clone data
    clone.querySelector("[data-field=firstName]").textContent = newStudent.firstName;
    clone.querySelector("[data-field=lastName]").textContent = newStudent.lastName;
    clone.querySelector("[data-field=middleName]").textContent = newStudent.middleName;
    clone.querySelector("[data-field=nickname]").textContent = newStudent.nickname;
    //clone.querySelector("[data-field=imageFilename]").textContent = newStudent.; //imageFilename
    clone.querySelector("[data-field=house]").textContent = newStudent.house;

    // append clone to list
    document.querySelector("#list tbody").appendChild( clone );
}
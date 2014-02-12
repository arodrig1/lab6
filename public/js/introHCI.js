'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);

	$('#feelingBtn').click(randomFeeling);
}

function randomFeeling(e) {
	e.preventDefault();
	var data = {
		returnfields : 'sentence',
		limit : 1,
		display : 'text',
		jsonp : insertFeelingCallback
	};
	$.getJSON("http://api.wefeelfine.org:8080/ShowFeelings", data);
}

function insertFeelingCallback(result) {
	console.log(result);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	console.log("User clicked on project " + idNumber);

	$.get("/project/" + idNumber, insertDetailsCallback);
}

function insertDetailsCallback(result) {
	//console.log(result);
	var projectID = result['id'];
	var projectDiv = $('#project' + projectID).find('.details');
	var title = "<h3>" + result['title'] + "</h3>";
	var date = "<h4>" + result['date'] + "</h4>";
	var image = "<img class='detailsImage' src='" + result['image'] + "'>";
	projectDiv.html(title + date + image + result['summary']);
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	//console.log("User clicked on color button");
	e.preventDefault();

	$.get("/palette", changeColorsCallback);

}

function changeColorsCallback(result) {
	var colors = result['colors']['hex'];
	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);
}
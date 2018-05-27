function searchFilter(inpuElement, employeesJSON) {

	var currentFocus;
	/*Parse Employee JSON*/
	var employeesList = JSON.parse(employeesJSON);

	inpuElement
			.addEventListener(
					"input",
					function(e) {
						var createParentDiv, createChildDiv;
						var inputValue = this.value;

						/*close any already open lists of autocompleted values*/
						clearSearchList();
						if (!inputValue) {
							return false;
						}
						currentFocus = -1;

						/*create a DIV element that will contain search values*/
						createParentDiv = document.createElement("div");
						createParentDiv.setAttribute("id", this.id
								+ "searchFilter-list");
						createParentDiv.setAttribute("class",
								"searchFilter-items");
						/*append the div element as a child of the autocomplete container:*/
						this.parentNode.appendChild(createParentDiv);

						/*Iterating Employee list for search*/
						for ( var key in employeesList) {
							/*check if the item starts with the same letters as the text field value:*/
							if (employeesList[key]["name"].substr(0,
									inputValue.length).toUpperCase() == inputValue
									.toUpperCase()
									|| employeesList[key]["policyNumber"]
											.substr(0, inputValue.length) == inputValue) {
								/*create a DIV element for each matching element:*/
								createChildDiv = document.createElement("div");
								/*make the matching letters bold:*/

								createChildDiv.innerHTML = "<table width='700px' border='0'><tbody><tr><td colspan='3'><strong>"
										+ employeesList[key]["name"]
										+ "</strong></td></tr><tr><td><i class='fa fa-phone'></i> "
										+ employeesList[key]["phone"]
										+ "</td><td><i class='fa fa-at'></i> "
										+ employeesList[key]["email"]
										+ "</td><td><i class='fa fa-file-text'></i> Policy No. "
										+ employeesList[key]["policyNumber"]
										+ " | "
										+ employeesList[key]["policyNumber"]
										+ "</td></tr></tbody></table>";

								/*insert a input field that will hold the current array item's value:*/
								createChildDiv.innerHTML += "<input type='hidden' value='"
										+ employeesList[key]["name"] + "'>";
								/*execute a function when someone clicks on the item value (DIV element):*/
								createChildDiv
										.addEventListener(
												"click",
												function(e) {
													/*insert the value for the autocomplete text field:*/
													inpuElement.value = this
															.getElementsByTagName("input")[0].value;
													/*close the list of autocompleted values,
													(or any other open lists of autocompleted values:*/
													clearSearchList();
												});
								createParentDiv.appendChild(createChildDiv);
							}
						}
					});

	/*execute a function presses a key on the keyboard:*/
	inpuElement.addEventListener("keydown", function(e) {
		var x = document.getElementById(this.id + "searchFilter-list");
		if (x)
			x = x.getElementsByTagName("div");
		if (e.keyCode == 40) {
			/*If the arrow DOWN key is pressed,
			increase the currentFocus variable:*/
			currentFocus++;
			/*and and make the current item more visible:*/
			addActive(x);
		} else if (e.keyCode == 38) { //up
			/*If the arrow UP key is pressed,
			decrease the currentFocus variable:*/
			currentFocus--;
			/*and and make the current item more visible:*/
			addActive(x);
		} else if (e.keyCode == 13) {
			/*If the ENTER key is pressed, prevent the form from being submitted,*/
			e.preventDefault();
			if (currentFocus > -1) {
				/*and simulate a click on the "active" item:*/
				if (x)
					x[currentFocus].click();
			}
		}
	});
	function addActive(x) {
		/*a function to classify an item as "active":*/
		if (!x)
			return false;
		/*start by removing the "active" class on all items:*/
		removeActive(x);
		if (currentFocus >= x.length)
			currentFocus = 0;
		if (currentFocus < 0)
			currentFocus = (x.length - 1);
		/*add class "autocomplete-active":*/
		x[currentFocus].classList.add("searchFilter-active");
	}
	function removeActive(x) {
		/*a function to remove the "active" class from all autocomplete items:*/
		for (var i = 0; i < x.length; i++) {
			x[i].classList.remove("searchFilter-active");
		}
	}

	function clearSearchList(elmnt) {
		/*close all autocomplete lists in the document,
		except the one passed as an argument:*/
		var x = document.getElementsByClassName("searchFilter-items");
		for (var i = 0; i < x.length; i++) {
			if (elmnt != x[i] && elmnt != inpuElement) {
				x[i].parentNode.removeChild(x[i]);
			}
		}
	}
	/*execute a function when someone clicks in the document:*/
	document.addEventListener("click", function(e) {
		clearSearchList(e.target);
	});
}

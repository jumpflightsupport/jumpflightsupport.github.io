function SubmitButtonClicked(id) {
    var form = document.getElementById(id);
    var nameInput = document.getElementById("name");

    var savedName = nameInput.value;

    form.submit();

    alert("Report Submitted");
    // Reset all data other than the name
    form.reset();
    nameInput.value = savedName;
};

/* When the user clicks on the system button, 
it inputs the field into the input box */
function systemButtonClicked(elem, parent_id) {
    var systemInput = document.getElementById(parent_id);
    var btnDict = { "bay1": "Bay 1",
                    "bay2": "Bay 2",
                    "both": "Both Bays",
                    "aetherkey": "Aetherkey",
                    "mod": "MOD",
                    "tech": "Technician",
                    "dev": "Developer",
                    "tait": "TAIT" };

    systemInput.value = btnDict[elem.id];
}

/* When the user clicks on the current time button fill break time
input with the current local time */
function currentTimeButtonClicked(id) {
    var breakInput = document.getElementById(id);
    var currentTime = new Date().toLocaleString('en-US', {hour12: false});

    // Format the current Time
    currentTime = formatTime(currentTime);

    breakInput.value = currentTime;
}

/* Format the time stamp into a 5 length time [00:00] */
function formatTime(timeStamp) {
    var splitTime = timeStamp.split(" ")[1];
    var formatted = splitTime.slice(0,5);

    if (formatted.charAt(formatted.length - 1) === ":") {
        formatted = "0" + formatted.slice(0, formatted.length - 1);
    }

    return formatted;
}

/* When the user clicks on the selected drop down number
it fills that time segment in the input */
function dropDownBtn(elem) {
    var breakInput = document.getElementById("break");
    var dropBtn = document.getElementById(elem.classList + "drop");

    var breakValue = breakInput.value;
    var digit = elem.value;
    var index = elem.classList;
    var splitIndex = null;

    // Set undefined numbers to 0
    if (index == "h10") {
        splitIndex = 0;
    }
    if (index == "h1"){
        splitIndex = 1;
    }
    if (index == "m10") {
        splitIndex = 3;
    }
    if (index == "m1") {
        splitIndex = 4;
    }

    //if the length of breakvalue != 5, or doesn't have a colon, then = 00:00
    if (breakValue.length !== 5 || breakValue.indexOf(":") === -1) {
        breakValue = "00:00";
    }

    var newValue = breakValue.slice(0, splitIndex) + digit + breakValue.slice(splitIndex + 1, breakValue.length);

    //Set breakInput = time selected
    breakInput.value = newValue;
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropDownClick(id) {
    document.getElementById(id).classList.toggle("show");
}

//Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// Time input code
$(function(){     
    var d = new Date(),        
        h = d.getHours(),
        m = d.getMinutes();
    if(h < 10) h = '0' + h; 
    if(m < 10) m = '0' + m; 
    $('input[type="time"][value="now"]').each(function(){ 
      $(this).attr({'value': h + ':' + m});
    });
  });
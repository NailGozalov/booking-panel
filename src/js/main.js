const nextButton_1 = document.getElementById("nextButton_1");
const nextButton_2 = document.getElementById("nextButton_2");
const nextButton_3 = document.getElementById("nextButton_3");
const nextButton_4 = document.getElementById("nextButton_4");
const backButton_1 = document.getElementById("backButton_1");
const backButton_2 = document.getElementById("backButton_2");
const backButton_3 = document.getElementById("backButton_3");
const doctorCards = document.querySelectorAll(".doctor-card");
const step_1 = document.getElementById('step_1');
const step_2 = document.getElementById('step_2');
const step_3 = document.getElementById('step_3');
const step_4 = document.getElementById('step_4');
const serviceOptions = document.querySelectorAll(".service");
const prevMonthButton = document.querySelectorAll(".calendar_prev");
const nextMonthButton = document.querySelectorAll(".calendar_next");
const currentMonthElement = document.querySelectorAll(".currentMonth");
const augustCalendarPage = document.querySelector(".left_side_august");
const septemberCalendarPage = document.querySelector(".left_side_september");
const timeHeader = document.querySelector(".time_header h3");
const timeBody = document.querySelector(".time_body");
const dateButtons = document.querySelectorAll(".date-button");
const timeButtons = document.querySelectorAll(".time-button");
const staffInfoNote = document.querySelector(".staff_info h4");
const serviceInfoNote = document.querySelector(".service_info h4");
const dateInfoNote = document.querySelector(".date_info h4");
const priceInfoNote = document.querySelector(".price_info h4");
const select_error = document.querySelector(".select_error");
const select_error_2 = document.querySelector(".select_error_2");
const select_error_3 = document.querySelector(".select_error_3");
const validationError = document.querySelector(".error_4");
const complate = document.querySelector(".complate");
const exit_error = document.querySelector(".exit_error");
const exit_complate = document.querySelector(".exit_complate");
const overlay = document.getElementById("overlay");





let previousSelectedDoctor = null;
let selectedDoctor = null;
let selectedService = null;
let selectedTime = null;
let selectedDate = null;
let currentMonth = "August";


doctorCards.forEach(card => {
    card.addEventListener("click", () => {
        if (selectedDoctor) {
            selectedDoctor.classList.remove("selected");
        }

        if (selectedDoctor !== card) {
            selectedDoctor = card;
            selectedDoctor.classList.add("selected");

            
            selectedTime = null;
            timeButtons.forEach(timeButton => {
                timeButton.classList.remove("selected");
            });

            
            selectedDate = null;
            dateButtons.forEach(dateButton => {
                dateButton.classList.remove("selected");
            });
        } else {
            selectedDoctor = null;
        }
    });
});



serviceOptions.forEach(option => {
    option.addEventListener("click", () => {
        if (selectedService) {
            selectedService.classList.remove("selected");
        }

        if (selectedService !== option) {
            selectedService = option;
            selectedService.classList.add("selected");

            
            selectedTime = null;
            timeButtons.forEach(timeButton => {
                timeButton.classList.remove("selected");
            });

            timeBody.innerHTML = '';
            timeHeader.innerHTML = 'Select date';
            
            selectedDate = null;
            dateButtons.forEach(dateButton => {
                dateButton.classList.remove("selected");
            });

            currentMonth = "August";
            updateMonth();
        } else {
            selectedService = null;
        }
    });
});




nextButton_1.addEventListener("click", () => {
    if (selectedDoctor) {
        step_1.style.display = "none";
        step_2.style.display = "flex";
        if (previousSelectedDoctor !== selectedDoctor) {
            selectedService.classList.remove("selected");
            selectedService = null;

            selectedTime = null;
            timeButtons.forEach(timeButton => {
                timeButton.classList.remove("selected");
            });

            selectedDate = null;
            dateButtons.forEach(dateButton => {
                dateButton.classList.remove("selected");
            });
        }
    } else {
        select_error.style.visibility = "visible";
        select_error.style.opacity = "1";
        
        setTimeout(() => {
            select_error.style.visibility = "hidden";
            select_error.style.opacity = "0";
        }, 2000);
    }
});


nextButton_2.addEventListener("click", () => {
    if (selectedService) {
        step_1.style.display = "none";
        step_2.style.display = "none";
        step_3.style.display = "flex";
    
    } else  {
        select_error_2.style.visibility = "visible";
        select_error_2.style.opacity = "1";
        
        setTimeout(() => {
            select_error_2.style.visibility = "hidden";
            select_error_2.style.opacity = "0";
        }, 2000);
    }
});

backButton_1.addEventListener("click", () => {
    select_error.style.visibility = "hidden";
    select_error.style.opacity = "0";
    step_1.style.display = "flex";
    step_2.style.display = "none";

    if (selectedDoctor) {
        previousSelectedDoctor = selectedDoctor;
        selectedDoctor.classList.add("selected");
    }
});

backButton_2.addEventListener("click", () => {
    select_error_2.style.visibility = "hidden";
    select_error_2.style.opacity = "0";
    step_2.style.display = "flex";
    step_3.style.display = "none";

    if (selectedService) {
        selectedService.classList.add("selected");
    }
});

exit_error.addEventListener("click", () =>{
    validationError.style.display = "none";
    hideValidationError();
});

exit_complate.addEventListener("click", () =>{
    complate.style.display = "none";
    hideComplate();
});
// ********************RESULT***************
nextButton_4.addEventListener("click", () => {   
    
    if (selectedService) {
        
        const firstNameInput = document.getElementById("fname");
        const lastNameInput = document.getElementById("flastname");
        const emailInput = document.getElementById("femail");
        const phoneInput = document.getElementById("fphone");

        if (!firstNameInput.value || !lastNameInput.value || !emailInput.value || !phoneInput.value) {
            complate.style.display = "none"; 
            hideComplate ();
            validationError.style.display = "flex";
            showValidationError();

        }
        else{
            complate.style.display = "flex"; 
            showComplate ();
        }

        const emailRegex = /^[a-zA-Z][a-zA-Z0-9]*@[a-zA-Z]{1,20}\.[a-zA-Z]{1,5}$/;
        if (!emailRegex.test(emailInput.value)) {
            complate.style.display = "none"; 
            hideComplate ();
            validationError.style.display = "flex";
            showValidationError();
        }
    

        const customerData = {
            name: firstNameInput.value,
            surname: lastNameInput.value,
            email: emailInput.value,
            phone: phoneInput.value
        };

        const selectedDateTime = JSON.parse(localStorage.getItem('selectedDateTime'));

        const bookingData = {
            staff_id: selectedDoctor.getAttribute("id"),
            service_id: selectedService.getAttribute("id"),
            date: selectedDate,
            time: selectedDateTime.time,
            customer: customerData
        };
        
        console.log(bookingData);
    } else {
        complate.style.display = "none"; 
        hideComplate ();
        validationError.style.display = "flex";
        showValidationError();
    }
});




prevMonthButton.forEach(button => {
    button.addEventListener("click", () => {
        if (currentMonth === "September") {
            currentMonth = "August";
            updateMonth();
        }
    });
});

nextMonthButton.forEach(button => {
    button.addEventListener("click", () => {
        if (currentMonth === "August") {
            currentMonth = "September";
            updateMonth();
        }
    });
});


function updateMonth() {
    currentMonthElement.forEach(element => {
        element.textContent = currentMonth + " 2023";
    });

    if (currentMonth === "August") {
        augustCalendarPage.style.display = "block";
        septemberCalendarPage.style.display = "none";
    } else {
        augustCalendarPage.style.display = "none";
        septemberCalendarPage.style.display = "block";
    }
};


const time = [
    {
        "start_time": "09:00",
        "end_time": "09:30"
    },
    {
        "start_time": "09:30",
        "end_time": "10:00"
    },
    {
        "start_time": "10:00",
        "end_time": "10:30"
    },
    {
        "start_time": "10:30",
        "end_time": "11:00"
    },
    {
        "start_time": "11:30",
        "end_time": "12:00"
    },
    {
        "start_time": "12:30",
        "end_time": "13:00"
    },
    {
        "start_time": "13:30",
        "end_time": "14:00"
    },
    
];

const august_4 = document.querySelector(".left_side_august .randevu:nth-child(4)");
august_4.addEventListener("click", () => {
    timeHeader.textContent = "2023-08-04";
    updateTimeBoxes(0, 3);
});

const august_5 = document.querySelector(".left_side_august .randevu:nth-child(5)");
august_5.addEventListener("click", () => {
    timeHeader.textContent = "2023-08-05";
    updateTimeBoxes(3, 7);
});

const august_6 = document.querySelector(".left_side_august .randevu:nth-child(6)");
august_6.addEventListener("click", () => {
    timeHeader.textContent = "2023-08-06";
    updateTimeBoxes(1, 5);
});


const september_4 = document.querySelector(".left_side_september .randevu:nth-child(4)");
september_4.addEventListener("click", () => {
    timeHeader.textContent = "2023-09-04";
    updateTimeBoxes(1, 2);
});

const september_5 = document.querySelector(".left_side_september .randevu:nth-child(5)");
september_5.addEventListener("click", () => {
    timeHeader.textContent = "2023-09-05";
    updateTimeBoxes(2, 5);
});

const september_6 = document.querySelector(".left_side_september .randevu:nth-child(6)");
september_6.addEventListener("click", () => {
    timeHeader.textContent = "2023-09-06";
    updateTimeBoxes(4, 6);
});



function updateTimeBoxes(startIndex, count) {
    timeBody.innerHTML = '';
    const selectedTimes = time.slice(startIndex, startIndex + count);

    const dateHeader = timeHeader.textContent; 
    const dateParts = dateHeader.split('-'); 
    selectedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

    document.querySelectorAll(".time_box").forEach(timeBox => {
        timeBox.classList.remove("selected");
    });

    selectedTimes.forEach(timeSlot => {
        const timeBox = document.createElement("div");
        timeBox.classList.add("time_box", "time-button");
        timeBox.setAttribute("data-time", timeSlot.start_time);
        timeBox.setAttribute("data-date", selectedDate);
        timeBox.innerHTML = `
            <h2>${timeSlot.start_time} <br> ${timeSlot.end_time}</h2>
        `;
    
        timeBox.addEventListener("click", () => {
            document.querySelectorAll(".time_box").forEach(timeBox => {
                timeBox.classList.remove("selected");
            });
    
            timeBox.classList.add("selected");
    
            selectedTime = timeSlot.start_time;
            end_time_res = timeSlot.end_time;
            selectedDate = timeBox.getAttribute("data-date");
        });
    
        timeBody.appendChild(timeBox);
    });
    
}



nextButton_3.addEventListener("click", () => {
    if (selectedTime) {
        const selectedDoctorElement = document.querySelector(".doctor-card.selected");
        const selectedDoctorName = selectedDoctorElement.getAttribute("data_name");

        const selectedServiceName = selectedService.getAttribute("data_service");
        const selectedServicePrice = selectedService.getAttribute("data_price");
        
        staffInfoNote.textContent = `${selectedDoctorName}`;
        serviceInfoNote.textContent = `${selectedServiceName}`;
        dateInfoNote.textContent = `${selectedDate} / ${selectedTime} - ${end_time_res}`;
        priceInfoNote.textContent = `$${selectedServicePrice}`;

        step_3.style.display = "none";
        step_4.style.display = "flex";
    } else  {
        select_error_3.style.visibility = "visible";
        select_error_3.style.opacity = "1";
        
        setTimeout(() => {
            select_error_3.style.visibility = "hidden";
            select_error_3.style.opacity = "0";
        }, 2000);
    }
});



backButton_3.addEventListener("click", () => {
    step_3.style.display = "flex";
    step_4.style.display = "none";

    selectedTime = null;
    selectedDate = null;
    


    localStorage.removeItem('patientData');
});


dateButtons.forEach(dateButton => {
    dateButton.addEventListener("click", () => {
        
        dateButtons.forEach(btn => btn.classList.remove("selected"));
        
        dateButton.classList.add("selected");

       
        selectedDate = dateButton.getAttribute("data-date");

    });
});


timeButtons.forEach(timeButton => {
    timeButton.addEventListener("click", () => {
        timeButtons.forEach(btn => btn.classList.remove("selected"));
        
        timeButton.classList.add("selected");

        selectedTime = timeButton.getAttribute("data-time");
    });
});



function showValidationError() {
    overlay.style.display = "block";
    validationError.style.display = "block";
};

function hideValidationError() {
    overlay.style.display = "none";
    validationError.style.display = "none";
};

function showComplate() {
    overlay.style.display = "block";
    complate.style.display = "block";
};

function hideComplate() {
    overlay.style.display = "none";
    complate.style.display = "none";
};
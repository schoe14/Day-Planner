$(document).ready(function () {
    var startDate = moment();
    var values = [
        {
            timeVal: null,
            timeEl: $("#time1"),
            todoEl: $("#todo1"),
        },
        {
            timeVal: null,
            timeEl: $("#time2"),
            todoEl: $("#todo2"),
        },
        {
            timeVal: null,
            timeEl: $("#time3"),
            todoEl: $("#todo3")
        },
        {
            timeVal: null,
            timeEl: $("#time4"),
            todoEl: $("#todo4")
        },
        {
            timeVal: null,
            timeEl: $("#time5"),
            todoEl: $("#todo5")
        },
        {
            timeVal: null,
            timeEl: $("#time6"),
            todoEl: $("#todo6")
        },
        {
            timeVal: null,
            timeEl: $("#time7"),
            todoEl: $("#todo7")
        },
        {
            timeVal: null,
            timeEl: $("#time8"),
            todoEl: $("#todo8")
        },
        {
            timeVal: null,
            timeEl: $("#time9"),
            todoEl: $("#todo9")
        }
    ]

    // Display sticky header that shows today's day & date when scroll down
    window.onscroll = function () { displayHeader() };
    var header = document.getElementById("today");
    var sticky = header.offsetTop;
    function displayHeader() {
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }

    // Display current day & date and hours for the scheduler
    function setTimes() {
        let currentDay = startDate.format('dddd');
        let currentDate = startDate.format('MMMM Do YYYY');
        let today = startDate.format("MMM Do YY");

        $("#today").text(currentDay + ", " + currentDate);

        var hours = 9;

        values.forEach(function (element) {
            let temp = startDate.clone().startOf('day').add(hours, 'hours');
            element.timeVal = temp;
            element.timeEl.text(temp.format("h A"));
            element.timeEl.attr("value", today);
            hours++;
        })
    }

    // Dinamically display colors associated with each hour
    function colorCode() {
        values.forEach(function (element) {
            element.todoEl.css("height", "80px");

            // Comparing each hour on the scheduler and current time in that day
            let eachHour = element.timeVal.format("H");
            let currentTime = startDate.format("H");

            // Comparing day on the scheduler and today
            let then = startDate.format("YYYY-MM-DD");
            let now = moment().format("YYYY-MM-DD");

            if ((eachHour - currentTime < 0 && now == then) || now > then == true) {
                element.todoEl.css("background-color", "#d3d3d3");
            }
            else if (eachHour - currentTime == 0 && now == then) {
                element.todoEl.css("background-color", "#FF6347");
            }
            else {
                element.todoEl.css("background-color", "#90ee90");
            }
        })
    }

    var arr = [];
    var storedValues = JSON.parse(localStorage.getItem("data"));

    // If a button is clicked, input will be saved in local storage
    $(".btn-primary").on("click", function (e) {
        let userInput = $(this).closest('div.row').find("textarea[class='form-control']").val().trim();
        let timeTargeted = $(this).closest('div.row').find('.time');
        let timeForTodo = timeTargeted.text() + ", " + timeTargeted.attr("value");

        if (storedValues !== null) arr = storedValues;

        for (var i = 0; i < arr.length; i++) {
            if (arr[i].time == timeForTodo) arr.splice(i, 1);
        }

        arr.push({ "time": timeForTodo, "todo": userInput });
        localStorage.setItem("data", JSON.stringify(arr));
    })

    // Display stored todos in input fields even when the application is refreshed
    function displayTodos() {
        values.forEach(function (element) {
            let timeForTodo = element.timeEl.text() + ", " + element.timeEl.attr("value");
            let todoDisplayed = element.todoEl;
            todoDisplayed.val("");
            if (storedValues !== null) {
                for (var i = 0; i < storedValues.length; i++) {
                    if (storedValues[i].time == timeForTodo) todoDisplayed.val(storedValues[i].todo);
                }
            }
        });
    }

    $(".btn-outline-primary").on("click", function (e) {
        let btnValue = $(this).text();
        if (btnValue == "Previous Day") {
            this.startDate = startDate.subtract(1, "days");
        }
        if (btnValue == "Next Day") {
            this.startDate = startDate.add(1, "days");
        }
        setTimes();
        colorCode();
        displayTodos();
    })

    setTimes();
    colorCode();
    displayTodos();

})
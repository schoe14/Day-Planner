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

    // Display current day & date and times for the scheduler
    function setTimes() {
        let currentDay = startDate.format('dddd');
        let currentDate = startDate.format('MMMM Do YYYY');
        let today = startDate.format("MMM Do YY");

        $("#today").text(currentDay + ", " + currentDate);

        var hours = 9;
        
        values.forEach(function (element) {
            let temp = startDate.clone().startOf('day').add(hours, 'hours');
            // element.timeVal.text(startDate.startOf('day').add(hours, 'hours'));
            element.timeVal = temp;
            // console.log(element.timeVal);
            element.timeEl.text(temp.format("h A"));
            // element.timeEl.text(element.timeVal.format("h A"));
            element.timeEl.attr("value", today);
            hours++;
            
        })

        values.forEach(function (element) {
            console.log(element.timeVal);
        })
    }

    // Dinamically display colors associated with time
    function colorCode() {
        values.forEach(function (element) {
            element.todoEl.css("height", "80px");

            let then = element.timeVal.format("MMM Do YY");
            let now = moment().format("MMM Do YY");
            
            // if (then.isBefore(now) == true) {
            //     element.todoEl.css("background-color", "gray");
            // }
            // else if (then.diff(now, "hours") < 1) {
            //     element.todoEl.css("background-color", "red");
            //     console.log(then.diff(now, "minutes") < 60)
            // }

            // console.log(element.timeVal.format("H"));
            // console.log(startDate.format("H"));
            console.log(now);
            console.log(then);
            console.log(now > then);
            

            // if(now > then) {
            //     console
            // }

            if (element.timeVal.format("H") - startDate.format("H") < 0) {
                element.todoEl.css("background-color", "gray");
            }
            
            else if (element.timeVal.format("H") - startDate.format("H") == 0) {
                element.todoEl.css("background-color", "red");
            }
            else {
                element.todoEl.css("background-color", "green");

            }
        })
    }

    var arr = [];
    var storedValues = JSON.parse(localStorage.getItem("data"));

    // If a button is clicked, input will be saved in local storage
    $(".btn-primary").on("click", function (e) {
        let userInput = $(this).closest('div.row').find("input[class='form-control']").val();
        // let timeForTodo = $(this).closest('div.row').find('.time').text() + ", " + today;
        let timeTargeted = $(this).closest('div.row').find('.time');
        let timeForTodo = timeTargeted.text() + ", " + timeTargeted.attr("value");

        if (storedValues !== null) arr = storedValues;

        for (var i = 0; i < arr.length; i++) {
            if (arr[i].time == timeForTodo) arr.splice(i, 1);
        }
        arr.push({ "time": timeForTodo, "todo": userInput });
        localStorage.setItem("data", JSON.stringify(arr));
        console.log(timeForTodo);
        console.log(userInput);
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
        let btnValue = $(e.target).text();
        if (btnValue == "Previous Day") {
            this.startDate = startDate.subtract(1, "days");
        }
        if (btnValue == "Next Day") {
            this.startDate = startDate.add(1, "days");
        }
        setTimes();
        colorCode();
        displayTodos();
        values.forEach(function (e) {
            console.log(e.timeVal)
        })
    })




    // localStorage.clear();

    setTimes();
    colorCode();
    displayTodos();

})
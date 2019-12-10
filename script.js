$(document).ready(function () {
    var values = [
        {
            timeVal: moment().startOf('day').add(9, 'hours'),
            timeEl: $("#time1"),
            todoEl: $("#todo1")
        },
        {
            timeVal: moment().startOf('day').add(10, 'hours'),
            timeEl: $("#time2"),
            todoEl: $("#todo2")
        },
        {
            timeVal: moment().startOf('day').add(11, 'hours'),
            timeEl: $("#time3"),
            todoEl: $("#todo3")
        },
        {
            timeVal: moment().startOf('day').add(12, 'hours'),
            timeEl: $("#time4"),
            todoEl: $("#todo4")
        },
        {
            timeVal: moment().startOf('day').add(13, 'hours'),
            timeEl: $("#time5"),
            todoEl: $("#todo5")
        },
        {
            timeVal: moment().startOf('day').add(14, 'hours'),
            timeEl: $("#time6"),
            todoEl: $("#todo6")
        },
        {
            timeVal: moment().startOf('day').add(15, 'hours'),
            timeEl: $("#time7"),
            todoEl: $("#todo7")
        },
        {
            timeVal: moment().startOf('day').add(16, 'hours'),
            timeEl: $("#time8"),
            todoEl: $("#todo8")
        },
        {
            timeVal: moment().startOf('day').add(17, 'hours'),
            timeEl: $("#time9"),
            todoEl: $("#todo9")
        }
    ]

    // Display current day & date and times for the scheduler
    function setTimes() {
        var today = moment().format('dddd');
        var currentDate = moment().format('MMMM Do YYYY');
        $("#today").text(today + ", " + currentDate);

        values.forEach(function (element) {
            element.timeEl.text(element.timeVal.format("h A"));
        })
    }

    // Dinamically display colors associated with time
    function colorCode() {
        values.forEach(function (element) {
            if (element.timeVal.format("H") - moment().format("H") < 0) {
                element.todoEl.css("background-color", "gray");
            }
            else if (element.timeVal.format("H") - moment().format("H") == 0) {
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
    $(".btn").on("click", function (e) {
        let userInput = $(this).closest('div.row').find("input[class='todo']").val();
        let timeForTodo = $(this).closest('div.row').find('.time').text();
        var storedValues = JSON.parse(localStorage.getItem("data"));

        if (storedValues !== null) arr = storedValues;

        for (var i = 0; i < arr.length; i++) {
            if (arr[i].time == timeForTodo) arr.splice(i, 1);
        }
        arr.push({ "time": timeForTodo, "todo": userInput });
        localStorage.setItem("data", JSON.stringify(arr));

        console.log(timeForTodo);
        console.log(userInput);
    })

    function displayTodos() {
        values.forEach(function (element) {
            console.log(element.timeEl.text());
            if (storedValues !== null) {
                for (var i = 0; i < storedValues.length; i++) {
                    if (storedValues[i].time == element.timeEl.text()) element.todoEl.val(storedValues[i].todo);
                }
            }
        });

    }


    // localStorage.clear();
    // arr = [];


    setTimes();
    colorCode();
    displayTodos();

})
var questions = [{
            ques: "This character is still alive:",
            ans: ["Khal Drogo", "Queen Margery Tyrell", "Rickon Stark", "Tormund Giantsbane"],
            name: "alive",
            correct: "Tormund Giantsbane",
            divClass: ".alive"
        },
        {
            ques: "Daenerys Stormborn of the House Targaryen is also known as The Mother of ______________.",
            ans: ["Stags", "Dragons", "Direwolves", "Lions"],
            name: "daenerys",
            correct: "Dragons",
            divClass: ".daenerys"
        },
        {
            ques: "Who said: 'A ruler who kills those devoted to her is not a ruler who inspires devotion'?",
            ans: ["Jorah Mormont", "Tyrion Lannister", "Daario Naharis", "Grey Worm"],
            name: "ruler",
            correct: "Tyrion Lannister",
            divClass: ".ruler"
        },
        {
            ques: "A ____________ always pays his debts.",
            ans: ["Lannister", "Stark", "Baratheon", "Frey"],
            name: "debts",
            correct: "Lannister",
            divClass: ".debts"
        },
        {
            ques: "Who was it that cut Jaime Lannister's hand off?",
            ans: ["Locke", "Brienne of Tarth", "Theon Greyjoy", "Qyburn"],
            name: "hand",
            correct: "Locke",
            divClass: ".hand"
        },
        {
            ques: "What is a phrase commonly used at the end of a eulogy for a member of the Night's Watch?",
            ans: ["'And now it is over.'", "'And now his watch has ended.'", "'And until he reawakens.'", "'And now his watch is over.'"],
            name: "eulogy",
            correct: "'And now his watch has ended.'",
            divClass: ".eulogy"
        },
        {
            ques: "Jamie Lannister is known as the 'Kingslayer' for the murder of which king?",
            ans: ["King Joffrey Baratheon", "King Rober Baratheon", "King Robb Stark", "King Aerys II"],
            name: "jaime",
            correct: "King Aerys II",
            divClass: ".jaime"
        },
        {
            ques: "Lord Eddard 'Ned' Stark was beheaded by which character?",
            ans: ["Petyr 'Littlefinger' Baelish", " Joffrey Baratheon", "Cersei Lannister", "Ilyn Payne"],
            name: "beheaded",
            correct: "Ilyn Payne",
            divClass: ".beheaded"
        },
        {
            ques: "Peter Dinklage portrays Tyrion of House...",
            ans: ["Martell", "Tyrell", "Lannister", "Tully"],
            name: "tyrion",
            correct: "Lannister",
            divClass: ".tyrion"
        },
        {
            ques: "Which is NOT a Noble House in the series?",
            ans: ["House Stark", "House Lannister", "House Devian", "House Targaryen"],
            name: "houses",
            correct: "House Devian",
            divClass: ".houses"
        }
    ] // end questions object

var labels = ["first", "second", "third", "forth"];

// click to start then display quesions
var startGame = $("#start-btn").on('click', function() {
    $(this).parent().hide();
    $('.container').show();
    countdown(60);
    questionDisplay();
});

// function for displaying questions
var questionDisplay = function() {
    $(".questions :not('#sub-but')").empty();
    // loops through the 10 questions 
    for (var j = 0; j < 10; j++) {
        $('.questions').prepend('<div class="' + questions[j].name + '"></div>');
        $(questions[j].divClass).append('<div class ="ques-title">' + questions[j].ques + '</div>');
        // loops through answers for each radio button
        for (var i = 0; i <= 3; i++) {
            $(questions[j].divClass).append('<input type="radio"  name="' + questions[j].name + '" value="' + questions[j].ans[i] + '"/><label for="' + labels[i] + '">' + questions[j].ans[i] + '</label>');
        }
        $('.questions').prepend('<hr />');
    }
}


// function for countdown timer
var countdown = function(seconds) {

    var timer = setInterval(function() {
        seconds = seconds - 1;
        $("#time-remain").html(seconds);

        if (seconds <= 0) {
            $('.container').fadeOut(500);
            var correctAnswers = 0;
            var wrongAnswers = 0;
            var unAnswered = 0;

            // loop through correctArray & radioName to match html elements & answers
            for (var i = 0; i < 10; i++) {

                if ($('input:radio[name="' + questions[i].name + '"]:checked').val() === questions[i].correct) {

                    correctAnswers++;
                    console.log("this is correct! number:" + i)
                } else {
                    wrongAnswers++;
                    console.log("this is wrong! number:" + i)
                };
            }
            $('#correctTimesUp').append(correctAnswers);
            // display wrongAnswers
            $('#wrongTimesUp').append(wrongAnswers);
            $('#timesUp').fadeIn(1000).show();

            // alert("Times Up!");
            clearInterval(timer);
            return;
        }
    }, 1000);

    // click event for submit button to stop timer
    $('#sub-but').on('click', function() {
        clearInterval(timer);
    })
}; // end countdown


// function to grade quiz once submit button is clicked
var gradeQuiz = $('#sub-but').on('click', function() {

    var correctAnswers = 0;
    var wrongAnswers = 0;
    var unAnswered = 0;

    // loop through correctArray & radioName to match html elements & answers
    for (var i = 0; i < 10; i++) {

        if ($('input:radio[name="' + questions[i].name + '"]:checked').val() === questions[i].correct) {

            correctAnswers++;
        } else {
            wrongAnswers++;
        };
    };

    // once submit is clicked...
    // tests
    // stop timer
    countdown();
    // fade out questions
    $('.container').fadeOut(500);
    // show answerScreen
    $('#answerScreen').show();
    // display correctAnswers
    $('#correctScreen').append(correctAnswers);
    // display wrongAnswers
    $('#wrongScreen').append(wrongAnswers);

}); // end gradeQuiz
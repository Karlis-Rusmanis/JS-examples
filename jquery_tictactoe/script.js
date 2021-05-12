$( function() {
    let count = 0;
    let links = $('#app a');    //ar $ saīsināti apzīmē jQuery tekstu. Tas atrod elementus ar tādu id
    links.click(function (event) {   //iekavās raskta ko grib atrast tāpat kā css, un tālāk click ir tas pats kas js event listener
        event.preventDefault();     //lai klikšķinot nelektu uz lapas augšu katru reizi

        if ($(this).text() != '') {     //ja laukā jau ir vērtība, tad nevar pa virsu tur neko uzrakstīt
            return;
        }

        let turn = 'x';

        if (count % 2 != 0) {
            turn = 'o';  //klikšķinot uz kādu rūtiņu tiks ielikts x
        } 
        $(this).text(turn);

        count++;

        const win_combinations = [      //šos nemainīs tpc konstantes
            [0, 1, 2],      //pārbaude pa rindām
            [3, 4, 5],
            [6, 7, 8],

            [0, 3, 6],      //pa kolonnām
            [1, 4, 7],
            [2, 5, 8],

            [0, 4, 8],      //pa diagonālēm
            [2, 4, 6],
        ];

        for (combination of win_combinations) {     //katrā reizē viens no kombināciju masīviem
            if (links.eq(combination[0]).text() == turn &&      //un katra masīva elementa tekstuālā vērtība tiek salīdzināta ar gājienā ielikto vērtību
                links.eq(combination[1]).text() == turn &&
                links.eq(combination[2]).text() == turn) 
                {
                    console.log('winner is ' + turn);
                    links.eq(combination[0]).addClass('red');
                    links.eq(combination[1]).addClass('red');
                    links.eq(combination[2]).addClass('red');
                    $("#dialog").dialog("open").find('strong').text(turn);  //šis ir priekš uzlecošā loga un atrod vēl tagus strong un pieliek tur tekstu ar uzvarētāja teksta vērtību
                }
        }


    });


    $( "#dialog" ).dialog({
        autoOpen: false,
        show: {
            effect: "blind",
            duration: 1000
        },
        hide: {
            effect: "explode",
            duration: 1000
        }
    });

    $('.reset').click(function () {
        links.text('');
        count = 0;
        links.removeClass('red');
    });

    $(document).tooltip();  //lielāks paskaidrojums, uzbīdot uz laukiem vai linkiem rādās

    $( "#draggable" ).draggable();  //lai var ksutināt elementu
    $('.task_list').sortable();

    let template = $('.template');
    $('.add-task').click(function (event) {
        event.preventDefault();
        //let input = $(document.createElement('input'));     //definē input lauku
        //input.attr('type', 'text').attr('name', 'todo[]');      //pievieno tam atribūtus

        let todo = template.clone().removeClass('template');  //uztaisa kopiju, tikai noņem klasi template, jo tas template uztaisīja to elementu neredzamu
        $('#tasks .task_list').append(todo);       //todo id elementā kur iekšā ir div tags tiks pievienoti tie input lauki
    });

    $('#tasks').submit(function (event) {
        event.preventDefault();
        let data = $(this).serialize();     //this satur formu; serialaze visus laukus saņem un ieraksta iekš mainīgā data
        $.post('api.php', data).done(function (response) {
            console.log(response);
        });       
    });
} );
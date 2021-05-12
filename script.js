'use strict';   //izsauks kļūdas vai vēl viskko konsolē

function ElementCreator () {    //šī ir tā kā jauna klase
    let app = document.querySelector('#app');
    this.values = JSON.parse(localStorage.getItem('values'));   //saņem visas vērtības un ieraksta local storage
    if (typeof this.values != 'object' || this.values == null) {
        this.values = {};
    }

    this.amount = localStorage.getItem('amount');   //šo izpilda, lai no localstorage paņemtu skaitu cik pogas ir jāizvada, kad pārlādē lapu
    if (this.amount == null) {
        this.amount = 42;   //defaultā tad no sākuma būs 42 pogas
    }
     
    let obj = this; //objekts satur elementcreator klasi
    let addButton = function (id, number) {     //ja šo funkciju nelietos ārpus klases, tad viņu var defināt er let, jo tad viņa būs kā private ar php
        let button = document.createElement('a');
        button.setAttribute('href', '#');   //atribūta nosaukumu un vērtību norāda iekavās
        button.textContent = number;
        button.classList.add('btn');    //pievieno klasi

        if (number % 3 == 0) {      //katrs trešais elements sarkans būs
            button.classList.add('red');
        }

        button.addEventListener('click', function () {      //pārtver notikumu, ka uz kādas pogas ir uzklikšķināts
            number++;   //palielina vērtību par viens
            this.textContent = number;      
            obj.values[id] = number;
            if (number % 3 == 0) {
                button.classList.add('red');
            }  else {
                button.classList.remove('red');
            }
            localStorage.setItem("values", JSON.stringify(obj.values));     //uzstāda vērtību
            console.log(this.textContent);      //this saturēs to elementu uz kura tika uzspiests

        });

        app.append(button);
    };

    this.addAllButtons = function () {
        localStorage.setItem('amount', this.amount);    //ieraksta localstorage pogu skaitu, lai pārlādējot lapu tas daudzums nemainītos, kāds tika uzstādīts
        app.textContent = '';  //visas pogas kas bija pazudīs, ja tiek mainīts pogu skaits
        for (let i = 1; i <= this.amount; i++) {
            if (this.values[i]) {
                addButton(i, html.values[i]);
            }
            else {
                addButton(i, i);
            }
        }
    }
};

let html = new ElementCreator();    //izveido html objektu

html.addAllButtons();

document.getElementById("42_task_form").addEventListener('submit', function(event) {
    event.preventDefault(); //neļauj notikt defaultai darbībai kam būtu jānotiek. Šajā gadījumā forma nesubmitojas
    let input = this.querySelector('[name=number]');    //this šeit ir pati forma kas tika submitota
    html.amount = input.value;

    this.values = {};   //html objekta saturs anulēsies uz tukšu un storage iztīrīts, bet tikai tad kad submitā maina vērtību
    localStorage.clear();

    html.addAllButtons(html.amount);

    input.value = '';
});


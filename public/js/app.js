let deferredInstallPrompt = null;
const botaoInstalar = document.getElementById('btInstalar');

let initialiseUI = function () {

    botaoInstalar.removeAttribute('hidden');
    botaoInstalar.addEventListener('click', function () {

        deferredInstallPrompt.prompt();

        deferredInstallPrompt.userChoice.then((choice) => {

            if (choice.outcome === 'accepted') {

                console.log("Usuário aceitou a instalação");

            } else {

                console.log("Usuário não aceitou a instalação");

            }

        });

    });

}

window.addEventListener('beforeinstallprompt', gravarEvento);

function gravarEvento(evt) {
    deferredInstallPrompt = evt;
}

var ajax = new XMLHttpRequest();

ajax.open("GET", "./mock/dados.json", true);

ajax.send();

var heroes = []

ajax.onreadystatechange = function () {

    if (ajax.readyState == 4 && ajax.status == 200) {

        var data = ajax.responseText;

        var data_json = JSON.parse(data);

        var conteudo = document.getElementById('content_result');

        if (data_json.length == 0) {
            conteudo.innerHTML = '<div class="row"><div class="col-12"><div class="alert alert-danger" role="alert">Nenhum digimon encontrado!</div></div></div>';
        } else {
            var html_conteudo = "";
            heroes = data_json;
            var heroe = {}
            for (var i = 0; i < data_json.length; i++) {
                if (data_json.length == 0) {
                    html_conteudo += '<div class="row"><div class="col-12"><div class="alert alert-primary" role="alert">Nenhum heroi encontrado!</div></div></div>';
                } else {
                    heroe = data_json[i]

                    html_conteudo += cardDota(heroe);
                }
            }
            conteudo.innerHTML = html_conteudo;
            cache_cards(data_json);
        }

    }

}

$(document).on('click', '#verMaisMenos', function () {
    var bioID = $(this).parent().find('p').attr('id')
    var texto = ""
    heroes.map(heroe => {
        if (heroe.name == bioID) {
            texto = heroe.bio;
            return;
        }
    })
    if ($(this).text() == "Ver Mais") {
        $(`#${bioID}`).text(texto);
        $(this).text('Ver Menos')
    }
    else {
        $(`#${bioID}`).text(texto.substring(0,150));
        $(this).text('Ver Mais')
    }
});

var cardDota = function (heroe) {

    var htmlRoles = '';

    heroe.roles.forEach(role => {
        htmlRoles += `
        
        <div class="badge badge-md badge-danger text-uppercase mr-2 mt-2">${role}</div>

        `;
    });

    return `
    
    <div class="col-12 mb-5">
        <div class="card bg-primary border-light shadow-soft">

            <div class="card-header p-2 bg-primary shadow-inset border border-light mt-2 mx-2 mb-0 position-relative">

                <div class="position-absolute m-1">
                    <div class="text-center">
                        <div class="icon icon-shape-sm shadow-inset border border-light rounded-circle bg-white">
                            <span class="icon icon icon-shape-xs shadow-soft border border-light rounded-circle bg-white">
                                <img class="img-fluid rounded-circle" src="${heroe.attribute_img}" alt="Jo portrait">
                            </span>
                        </div>
                    </div>
                </div>

                <img src="${heroe.image}" class="card-img-top rounded-top" alt="Designer desk">

            </div>

            <div class="card-body p-3">

                <div class="accordion shadow-soft rounded" id="accordionBio">
                    <div class="card card-sm card-body bg-primary border-light mb-0 rounded">

                        <div id="heading${heroe.id}">
                            <a class="accordion-panel-header collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${heroe.id}" aria-expanded="false" aria-controls="collapse${heroe.id}">
                                <span class="h6 mb-0 font-weight-bold">
                                    <h3 class="mb-0 card-title">${heroe.localized_name}</h3>
                                </span>
                                <span class="icon"><span class="fas fa-plus text-danger"></span></span>
                            </a>
                        </div>

                        <div id="collapse${heroe.id}" class="accordion-collapse collapse" aria-labelledby="heading${heroe.id}" data-bs-parent="#accordionBio">
                            <p class="mx-1 mt-3 mb-2">
                                ${heroe.bio}
                            </p>
                        </div>

                    </div>
                </div>

            </div>

            <div class="card-footer pt-1 pb-3 border-top d-flex justify-content-between align-items-start">

                <div>
                    <div class="d-flex flex-wrap">
                        ${htmlRoles}
                    </div>
                </div>

            </div>

        </div>
    </div>
    `;

}

//Cache conteúdo dinâmico
var cache_cards = function (data_json) {

    if ('caches' in window) {

        caches.delete('dota-app-conteudo').then(function () {

            console.log('Deletando cache de conteúdo antigo');

            if (data_json.length > 0) {

                var files = ['./mock/dados.json'];

                //Entrando na categoria
                for (var i = 0; i < data_json.length; i++) {

                    //Entrando no item
                    for (var j = 0; j < data_json[i].length; j++) {
                        if (files.indexOf(data_json[i].image) == -1) {
                            files.push(data_json[i].image);
                        }
                    }
                }

                caches.open('dota-app-conteudo').then(function (cache) {

                    cache.addAll(files).then(function () {
                        console.log("Arquivos de conteúdo cacheados!");
                    });

                });
            }

        });

    }
}

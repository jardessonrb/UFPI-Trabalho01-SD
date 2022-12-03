$(document).ready(function(){
    $("button").click(function() {
        let nomeUsuario = document.getElementById("input-search").value;
        if(!nomeUsuario){
            alert("Digite um nome de usuário");
            return;
        }

        buscarInformacoesUsuario(nomeUsuario);
    });
});

$(document).ready(function(){
    $("#seta").click(function() {
        let linkRepositoriosElement = document.getElementById("p-link-repositorios");
        const link = linkRepositoriosElement.dataset.linkRepositorios;
        buscarRepositorios(1, link);
    });
});

function buscarRepositorios(pagina, link){
    if(!pagina){
        pagina = 1;
    }

    link = link+`?page=${pagina}&per_page=4`;
    console.log(link)
    $.get(link, ()  => {
    }).done(data => {
        preencherRepositoriosDoUsuario(data);
    }).fail(error => {
        falhaAoBuscarDados(error);
    });
}

function buscarInformacoesUsuario(nomeUsuario){
    $.get("https://api.github.com/users/"+nomeUsuario, ()  => {
    }).done(data => {
        preencherComDadosDoUsuario(data);
    }).fail(error => {
        falhaAoBuscarDados(error);
    });
}

function preencherRepositoriosDoUsuario(data){
    $("#repos-container").empty();
    for (let index = 0; index < data.length; index++) {
        const nomeRepositorio = data[index].name;
        const linguagemRepositorio = data[index].language;
        const linkRepositorio = data[index].html_url;

        const divConteudo = `<div class="repos-content">
                                <p>${nomeRepositorio}</p>
                                <p>Feito em ${linguagemRepositorio}</p>
                                <a href="${linkRepositorio}" id="link-repositorio">Ver no GitHub</a>
                            </div>`;
        $("#repos-container").append(divConteudo);
    }
    let qntRepositoriosElement = document.getElementById("qnt-repositorios");
    let qntRepositorios = qntRepositoriosElement.innerHTML;

    $("#paginacao-container").empty();
    for (let i = 1; i <= Math.ceil(qntRepositorios/4); i++) {
        $("#paginacao-container").append(`<span class="link-paginacao" onClick="buscarNovosRepositoriosPorPagina(${i})">${i}</span>`);
    }

    let paginacaoContainer = document.getElementById("paginacao-container");
    paginacaoContainer.style.display = "block";
}

function buscarNovosRepositoriosPorPagina(pagina){
    let linkRepositoriosElement = document.getElementById("p-link-repositorios");
    const link = linkRepositoriosElement.dataset.linkRepositorios;
    buscarRepositorios(pagina, link);
}

function preencherComDadosDoUsuario(dados){
    let imagemElement = document.getElementById("foto");
    let repositoriosElement = document.getElementById("repos");
    let nomeUsuarioElement  = document.getElementById("nome-usuario");
    let qntRepositoriosElement = document.getElementById("qnt-repositorios");
    let pLinkRepositoriosElement = document.getElementById("p-link-repositorios");

    const urlFotoUsuarioDado     = dados.avatar_url;
    const nomeUsuarioDado        = dados.name;
    const urlRepositoriosDado    = dados.repos_url;
    const qntRepositorioPublicos = dados.public_repos;

    imagemElement.src = urlFotoUsuarioDado;
    nomeUsuarioElement.innerHTML = nomeUsuarioDado;
    qntRepositoriosElement.innerHTML = qntRepositorioPublicos;
    repositoriosElement.style.display = "block";
    pLinkRepositoriosElement.dataset.linkRepositorios = urlRepositoriosDado;
}

function falhaAoBuscarDados(dados){
    console.log(dados);
}
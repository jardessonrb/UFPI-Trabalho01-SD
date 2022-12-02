$(document).ready(function(){
    $("button").click(function() {
        let input = document.getElementById("input-search");
        popularTelaComInformacoesDeUsuario(input.value);
    });
});

function popularTelaComInformacoesDeUsuario(nomeUsuario){
    var teste = "Nem mudou";
    var dados = $.get("https://api.github.com/users/"+nomeUsuario, ()  => {

    }).done(data => {
        console.log(data)
    }).fail(error => {
        console.log({erro: "sim", error})
    })
    return dados;
}
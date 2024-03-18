const $ = element => document.querySelector(element);

const encriptador = $('#btn-encriptar');
const desencriptar = $("#btn-desencriptar");
const imputText = $("#entrada-texto");
const outText = $(".salida-texto");
const aside = $(".container");
const parrafoSalida = $("#parrafo-salida");
const copiar = $(".copiar");

function encriptarTexto(texto){
    const vocales = {
        'a' : "%qrt%",
        'e': "@lpq",
        'i': "wqpl&",
        'o': "yry%",
        'u': "ufat"
    }
    for (const vocal in vocales) {
        texto = texto.replace(RegExp(vocal, 'g'), vocales[vocal]);
    }

    return texto;
}
function desencriptarTexto(texto) {

    texto = texto.replace(/%qrt%/g,"a");
    texto = texto.replace(/@lpq/g ,"e");
    texto = texto.replace(/wqpl&/g ,"i");
    texto = texto.replace(/yry%/g ,"o");
    texto = texto.replace(/ufat/g ,"u");

    return texto;
} 

function estadoBotones(bool){
    if (bool) {
        encriptador.removeAttribute("disabled", "disabled");
        desencriptar.removeAttribute("disabled", "disabled");
    }else{
        encriptador.setAttribute("disabled", "disabled");
        desencriptar.setAttribute("disabled", "disabled");
    }
}
function impresionPorCaracter(texto) {
    let arrayTexto = texto.split("");
    let contador = 0;
    let intervalos;

    if (contador < arrayTexto.length) {
        estadoBotones(false)

        intervalos = setInterval(() => {
            parrafoSalida.textContent += arrayTexto[contador];
            contador++;
            
            if (contador >= arrayTexto.length) {
                clearInterval(intervalos);
                contador=0;

                estadoBotones(true);

                copiar.style.display='inline-block';
            }
    }, 5);
    } else{
        alert('Ha ocurrido un error en nuesto sistema, intentalo mas tarde.');
    }
}
function imprimirTexto(texto, funcion){

    if(!imputText.value){
        alert('Por favor ingresa una frase o palabra para continuar.')
    }
    else{
        imputText.value = "";

        aside.style.display = "none";
        outText.style.display = "block";

        let msj=funcion(texto);
        parrafoSalida.textContent="";

        return impresionPorCaracter(msj);
    }
};
function Copiar(){
    const imgcopiar='<img src="Recursos/Icon/Sin título-1.png" alt="Botoncopiar">';
    const imgcopiado='<img src="Recursos/Icon/Sin título-2.png" alt="Botoncopiado">';

    let texto = outText.textContent.trim().replace(/\s+/g, ' ');

    navigator.clipboard.writeText(texto);
    copiar.innerHTML=imgcopiado;

    setTimeout(() => {
        copiar.innerHTML=imgcopiar;
    }, 3000);
}

//Eventos
encriptador.addEventListener("click", ()=>{
    imprimirTexto(imputText.value, encriptarTexto);
});
desencriptar.addEventListener("click", ()=>{
    imprimirTexto(imputText.value, desencriptarTexto);
});
copiar.addEventListener("click", ()=>{
    Copiar();
});

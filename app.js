const CotizarSeguro = () => {
    let marca = document.querySelector("#Marca").value;
    let year = document.querySelector("#year").value;
    let basico = document.querySelector("#RadioBasico");
    let completo = document.querySelector("#RadioCompleto");

    let divResumen = document.querySelector("#resumen");
    let divResultado = document.querySelector("#resultado");

    let plan = "";

    if (basico.checked) {
        plan = "basico";
    } else if (completo.checked) {
        plan = "completo";
    }


    if (marca === '' ||
        year === '' ||
        plan === '') {
        mostrarError("#msj-error-cotizador", "Falta seleccionar algunas opciones");
        return;
    }
    
    let cotizacion = { marca, year, plan };
    document.querySelector("#msj").style.display = "none";

    divResumen.style.backgroundColor = "#FFF";
    divResumen.style.display = "block";

    divResumen.innerHTML = `<div style="text-align:center">
                                <img src="img/spinner.gif" width=150 height=100>
                                </div>`;
    
    setTimeout(() => {
        divResumen.style.backgroundColor = "#4F52FF";
        divResumen.className = "divResumen textoResumen mb-3";
        divResumen.innerHTML = `
                            <h3>Resumen de Cotizacion:</h3>
                            <ul>
                            <li>Marca: ${mayuscula(marca)}</li>
                            <li>Plan: ${mayuscula(plan)}</li>
                            <li>Año del Auto: ${year}</li>
                            </ul>
                            `;
        let cotizacionFinal = cotizar(cotizacion);
        divResultado.style.display = "block";
        divResultado.className = "divResultado";
        divResultado.innerHTML = `<p class"textoCotizacion">$ ${cotizacionFinal}</p>`;
    }, 3000);

    const enJson = JSON.stringify(cotizacion);
    console.log(enJson);
    localStorage.setItem("cotizacion", enJson);

};

const cotizar = (cotizacion) => {
    const { marca, year, plan } = cotizacion;
    let resultado = 3000;

    const diferenciaYear = diferencia(year);
    resultado -= ((diferenciaYear * 3) * resultado) / 100;

    resultado = calcularMarca(marca) * resultado;
    const IncrementoPlan = obtenerPlan(plan);
    resultado = parseFloat(IncrementoPlan * resultado).toFixed(2);
    return resultado;
    
};

const obtenerPlan = plan => {
    return (plan === 'basico') ? 1.20 : 1.50;
};
const calcularMarca = marca => {
    let incremento;


    switch (marca) {
        case 'Peugeot': incremento = 1.30; break;
        case 'Chevrolet': incremento = 1.15; break;
        case 'Ford': incremento = 1.05; break;
        case 'Fiat': incremento = 1.0; break;
    };
    return incremento;
};

const diferencia = (year) => {
    return new Date().getFullYear() - year;
};

const mayuscula = (palabra) => {
    return palabra.charAt(0).toUpperCase() + palabra.slice(1);
};

const mostrarError = (elemento, mensaje) => {
    divError = document.querySelector(elemento);
    divError.innerHTML = `<p class="alert alert-danger error">${mensaje}</p>`;
    setTimeout(() => { divError.innerHTML = ``; }, 2000);
};

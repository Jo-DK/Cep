import {Service} from './modules/service.js';

const Input = document.getElementById('input-cep');
const cells = document.querySelectorAll('#table td');


/**
 * O Evento keydown vai ser usado como uma mascara, 
 * para garantir que só numeros possam ser digitados
 */
Input.addEventListener('keydown', function(e){
    if(checkKey(e)){
        e.preventDefault()
    }
})


/**
 * Requisitamos a API assim que o oitavo digito é inserido 
 */
Input.addEventListener('keyup', async function(){

    if(8 == this.value.length)
    {
        this.disabled = true;
        const cep = this.value;
        clean()
        const request = await Service.getCep(cep);

        if(request.erro)
            alert(`O cep ${cep} não foi localizado`);
        else
            populate(request)

        this.disabled = false;
    }
})

/**
 * Populando os campos da tabela com o retorno da api
 * aproveitando que eles possuem os mesmo nomes dos ids desses campos
 */
function populate(request)
{
    for(let field in request){
        let el = document.getElementById(field);
        if(el)
            el.innerHTML = request[field];
    }
}

/**
 * limpar a tabela e o input
 */
function clean(){
    Input.value = '';
    cells.forEach(function(el){
        el.innerHTML = '';
    }) 
}

/** 
 * Verificar se o digito não é numerico ou 
 * também não é algum comando útil como o backspace */
function checkKey({key})
{
    return !key.match(/^\d$/) && 
    key !== 'Backspace' && 
    key !== 'ArrowLeft' && 
    key !== 'ArrowRight'
}
export const Service = {

    get: async function(url)
    {
        const resp = await fetch(url);
        return await resp.json();
    },

    getCep: async function(cep)
    {
        return await this.get(`http://viacep.com.br/ws/${cep}/json/`);
    }
}
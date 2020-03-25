const connection = require('../database/connection'); 

module.exports = {
 
    async index(request,response)
    {
        const {page = 1} = request.query; //paginação //vem pela url ?=page
        const [count] = await connection('incidents').count(); //retorna a primeira posição do array(faz isso pq o array só tem uma posição poderia ser usado Count[0])
        response.header('X-Total-Count', count['count(*)']); 

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=','incidents.ong_id')
        .limit(5)
        .offset((page -1)*5)
        .select(['incidents.*',
         'ongs.name',
          'ongs.email', 
          'ongs.whatsapp', 
          'ongs.city', 
          'ongs.uf' ]); //itens por página
        return response.json(incidents); 
    },

    async create(request, response)
    {
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization;  

        const [id] = await connection('incidents').insert(
            {
                title, 
                description, 
                value,
                ong_id
            }); 
        return response.json({id}); 
    },

    async delete(request, response)
    {
        const {id} = request.params; 
        const ong_id = request.headers.authorization;  

        const incident = await connection('incidents').where('id', id).select('ong_id').first(); 

        if(incident.ong_id !== ong_id)
        {
            return response.status(401).json({erro: 'Operation not Permitted'}); //retorna o status 401 'não autorizado'
        }

        await connection('incidents').where('id', id).delete(); 
        return response.status('204').send(); 
    }
}; 
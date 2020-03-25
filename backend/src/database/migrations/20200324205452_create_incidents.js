
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table)
    {
        table.increments();//id c/ autoincremento 

        table.string('title').notNullable(); 
        table.string('description').notNullable(); 
        table.string('value').notNullable(); 
    
        table.string('ong_id').notNullable(); //chave estrangeira // foreing key
        table.foreign('ong_id').references('id').inTable('ongs'); //criação da associação da chave estrangeira // link foreing key with her table
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents'); 
  
};

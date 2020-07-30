const conn = require("../db/dbQuery");

const obtenerDatosConEmail = async (email) => {
    const query = ` SELECT nombre, clave, id, privilegios 
                    FROM public.usuarios
                    WHERE nombre LIKE $1`;
    try {
        const { rows } = await conn.query(query, [email]);
        const dbResponse = rows[0];
        return dbResponse;
    } catch (error) {
        console.log("[userDAO][obtenerDatosConEmail] Error "+error);
    }
};

const darDeAltaUsuario = async (values) => {
    const query = ` INSERT INTO public.usuarios(
        nombre, clave, privilegios)
        VALUES($1, $2, $3)
        returning *`;
    try {
        const { rows } = await conn.query(query, values);
        const dbResponse = rows[0];
        return dbResponse;
    } catch (error) {
        console.log("[userDAO][darDeAltaUsuario] Error "+error);
    }
};

const listUsers = async (pagina) => {
    const numColumnas = 2;
    const query1 = ` SELECT count(id) as numcols
                    FROM public.usuarios`;
    
    const query2 = ` SELECT id, nombre
                    FROM public.usuarios
                    offset $1 limit $2`;
    pagina = pagina * numColumnas;
    const values = [pagina, numColumnas];
    try {
        let { rows } = await conn.query(query1);
        let result = await conn.query(query2, values);
        console.log(rows);
        if((pagina + numColumnas) > rows.numcols){
            result.rows.push({ultimaPagina: true});
        }else{
            result.rows.push({ultimaPagina: false});
        }
        console.log(result.rows);
        return result.rows;
    } catch (error) {
        console.log("[userDAO][listUsers] Error "+error);
    }
};

module.exports = {
    obtenerDatosConEmail, darDeAltaUsuario, listUsers
};
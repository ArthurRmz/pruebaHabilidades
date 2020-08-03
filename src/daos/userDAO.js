const conn = require("../db/dbQuery");

const obtenerDatosPorId = async (id) => {
    const query = ` SELECT id, nombre, rfc, direccion, telefono, website, correo, clave 
                    FROM usuarios
                    WHERE id = $1`;
    try {
        const { rows } = await conn.query(query, [id]);
        const dbResponse = rows[0];
        return dbResponse;
    } catch (error) {
        console.log("[userDAO][obtenerDatosPorId] Error "+error);
    }
};

const obtenerDatosConCorreoRfc = async (datos) => {
    const query = ` SELECT id, nombre, rfc, direccion, telefono, website, correo, clave
                    FROM usuarios
                    WHERE correo LIKE $1
                    OR rfc LIKE $2`;
    try {
        const { rows } = await conn.query(query, datos);
        const dbResponse = rows[0];
        return dbResponse;
    } catch (error) {
        console.log(`[userDAO][obtenerDatosConCorreoRfc] Error ${error}`);
    }
};

const darDeAltaUsuario = async (values) => {
    const query = ` INSERT INTO usuarios(
        nombre, correo, rfc, clave)
        VALUES($1, $2, $3, $4)
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
    darDeAltaUsuario, listUsers, obtenerDatosConCorreoRfc, obtenerDatosPorId
};
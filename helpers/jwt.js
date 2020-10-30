const jwt = require('jsonwebtoken');


const generarJWT = ( iud ) => {

    return new Promise((resolve, reject )=> {
    
    //Puedo agregar mas datos en el payload
    const payload = {
        uid
    };

    jwt.sign( 
        payload, 
        process.env.JWT_SECRET, 
        { expiresIn: '12h'},
        (error, token )=>{
            if( error ) {
                console.log(error);
                reject ( 'No se pudo generar el JWT' ) ;
            }
            else {
                resolve ( token );
            }
        })
    });

}

module.exports = {
    generarJWT,
}
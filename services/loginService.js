const db = require('../utilities/db');
const security = require('../utilities/security');

async function login(entitie){
    const rows = await db.query(
      `SELECT userId,email,userName,active
      FROM user WHERE email=? and password=?;`,
      [entitie.email, security.encriptar(entitie.password)]
    );
    if(rows.length > 0){
      return rows[0];
    }else{
      return null;
    }
  }

  module.exports = {
    login,
  }

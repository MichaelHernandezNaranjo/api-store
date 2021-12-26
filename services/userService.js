const db = require('../utilities/db');
const helper = require('../helper');
const config = require('../config');

async function getAll(page = 1, search = ''){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT userId, email, userName, active, createDate FROM user WHERE userName LIKE ? OR email LIKE ? LIMIT ?,?;`,
      ['%' + search + '%','%' + search + '%', offset, config.listPerPage]
      );
      const rows2 = await db.query(
      `SELECT COUNT(*) count FROM user WHERE userName LIKE ? OR email LIKE ?;`,
      ['%' + search + '%','%' + search + '%']
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page: parseInt(page), limit: config.listPerPage, count: helper.emptyOrRows(rows2)[0].count, search: search};
    return {
      data,
      meta
    };
  }

  async function get(userId){
    const rows = await db.query(
      `SELECT userId, email, userName, active=1 as active , createDate FROM user where userId = ?`,
      [userId]
    );
    return rows[0];
  }

async function create(entitie){
    const res = await db.query(
      `INSERT INTO user
      (email,userName,password,active,createDate)
      VALUES
      (?,?,?,?,?);
      `,
      [
        entitie.email,
        entitie.userName,
        entitie.password,
        entitie.active,
        entitie.createDate
      ]
    );
    console.log(res);
    if (res.affectedRows) {
      return res.insertId;
    }
    return 0;
  }

  async function update(userId, entitie){
    const result = await db.query(
      `UPDATE user
      SET email=?,userName=?,active=?
      WHERE userId=?`,
      [
        entitie.email, entitie.userName, entitie.active, userId
      ]
    );
    if (result.affectedRows) {
      return true;
    }
    return false;
  }

  async function updatePassword(userId, password){
    const result = await db.query(
      `UPDATE user
      SET password=?
      WHERE userId=?`,
      [
        password, userId
      ]
    );
    if (result.affectedRows) {
      return true;
    }
    return false;
  }

  async function remove(userId){
    const result = await db.query(
      `DELETE FROM user WHERE userId=?`, 
      [userId]
    );
    if (result.affectedRows) {
      return true;
    }
    return false;
  }

  module.exports = {
    getAll,
    get,
    create,
    update,
    updatePassword,
    remove
  }
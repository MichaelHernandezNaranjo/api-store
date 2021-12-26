const db = require('../utilities/db');
const helper = require('../helper');
const config = require('../config');

async function getAll(page = 1, search = ''){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT roleId, name FROM role WHERE name LIKE ? LIMIT ?,?;`,
      ['%' + search + '%', offset, config.listPerPage]
    );
    const rows2 = await db.query(
      `SELECT COUNT(*) count FROM role WHERE name LIKE ?;`,
      ['%' + search + '%']
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page: parseInt(page), limit: config.listPerPage, count: helper.emptyOrRows(rows2)[0].count, search: search};
    return {
      data,
      meta
    };
  }

  async function get(roleId){
    const rows = await db.query(
      `SELECT roleId, name FROM role where roleId = ?`,
      [roleId]
    );
    return rows[0];
  }

async function create(entitie){
    const res = await db.query(
      `INSERT INTO role
      (name)
      VALUES
      (?);
      `,
      [
        entitie.name
      ]
    );
    console.log(res);
    if (res.affectedRows) {
      return res.insertId;
    }
    return 0;
  }

  async function update(roleId, entitie){
    const result = await db.query(
      `UPDATE role
      SET name=?
      WHERE roleId=?`,
      [
        entitie.name, roleId
      ]
    );
    if (result.affectedRows) {
      return true;
    }
    return false;
  }

  async function remove(roleId){
    const result = await db.query(
      `DELETE FROM role WHERE roleId=?`, 
      [roleId]
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
    remove
  }
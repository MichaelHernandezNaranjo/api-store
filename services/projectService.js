const db = require('../utilities/db');
const helper = require('../helper');
const config = require('../config');

async function getAll(page = 1, search = ''){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT projectId, name, description, active, createDate, createUserId FROM project WHERE name LIKE ? OR description LIKE ? LIMIT ?,?;`,
      ['%' + search + '%','%' + search + '%', offset, config.listPerPage]
      );
      const rows2 = await db.query(
      `SELECT COUNT(*) count FROM project WHERE name LIKE ? OR description LIKE ?;`,
      ['%' + search + '%','%' + search + '%']
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page: parseInt(page), limit: config.listPerPage, count: helper.emptyOrRows(rows2)[0].count, search: search};
    return {
      data,
      meta
    };
  }

  async function get(projectId){
    const rows = await db.query(
      `SELECT projectId, name, description, active, createDate, createUserId FROM project where projectId = ?`,
      [projectId]
    );
    return rows[0];
  }

async function create(entitie){
    const res = await db.query(
      `INSERT INTO project
      (name,description,active,createDate,createUserId)
      VALUES
      (?,?,?,?,?);
      `,
      [
        entitie.name,
        entitie.description,
        entitie.active,
        entitie.createDate,
        entitie.createUserId
      ]
    );
    console.log(res);
    if (res.affectedRows) {
      return res.insertId;
    }
    return 0;
  }

  async function update(projectId, entitie){
    const result = await db.query(
      `UPDATE project
      SET name=?,description=?,active=?
      WHERE projectId=?`,
      [
        entitie.name, entitie.description, entitie.active, projectId
      ]
    );
    if (result.affectedRows) {
      return true;
    }
    return false;
  }

  async function remove(projectId){
    const result = await db.query(
      `DELETE FROM project WHERE projectId=?`, 
      [projectId]
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
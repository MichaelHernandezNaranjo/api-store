const db = require('../utilities/db');
const helper = require('../helper');
const config = require('../config');

async function getAll(projectId, page = 1, search = ''){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT projectId, statusId, name, active, createDate, createUserId FROM status WHERE projectId=? and name LIKE ? LIMIT ?,?;`,
      [projectId,'%' + search + '%', offset, config.listPerPage]
      );
      const rows2 = await db.query(
      `SELECT COUNT(*) count FROM status WHERE projectId=? and name LIKE ?;`,
      [projectId, '%' + search + '%']
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page: parseInt(page), limit: config.listPerPage, count: helper.emptyOrRows(rows2)[0].count, search: search};
    return {
      data,
      meta
    };
  }

  async function get(projectId, statusId){
    const rows = await db.query(
      `SELECT projectId, statusId, name, active, createDate, createUserId FROM status where projectId=? and statusId=?`,
      [projectId, statusId]
    );
    return rows[0];
  }

async function create(entitie){
  var statusId = await next(entitie.projectId);
    const res = await db.query(
      `INSERT INTO status
      (projectId,statusId,name,active,createDate,createUserId)
      VALUES
      (?,?,?,?,?,?);
      `,
      [
        entitie.projectId,
        statusId,
        entitie.name,
        entitie.active,
        entitie.createDate,
        entitie.createUserId
      ]
    );
    console.log(res);
    if (res.affectedRows) {
      return statusId;
    }
    return 0;
  }

  async function update(projectId,statusId, entitie){
    const result = await db.query(
      `UPDATE status
      SET name=?,active=?
      WHERE projectId=? and statusId=?`,
      [
        entitie.name, entitie.active, projectId, statusId
      ]
    );
    if (result.affectedRows) {
      return true;
    }
    return false;
  }

  async function remove(projectId, statusId){
    const result = await db.query(
      `DELETE FROM status WHERE projectId=? and statusId=?`, 
      [projectId,statusId]
    );
    if (result.affectedRows) {
      return true;
    }
    return false;
  }

  async function next(projectId){
    const rows = await db.query(
      `select max(statusId) statusId from status where projectId=?`, 
      [projectId]
    );
    return parseInt(rows[0].statusId == 0 ? 1 : rows[0].statusId + 1);
  }

  module.exports = {
    getAll,
    get,
    create,
    update,
    remove
  }
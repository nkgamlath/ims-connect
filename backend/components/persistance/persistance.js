// persistence.js
const db = require('./db');

class Persistence {
    //prepare sql field names
    static parseSqlFieldNames(field_names) {
        field_names.reverse();

        if (field_names === undefined) return "";

        let sql = "";
        let values = "";

        while (field_names.length > 0) {
            let field = field_names.pop();

            if (field_names.length == 0) {
                sql = sql + "" + field + ""
                values = values + "?" + ""
            } else {
                sql = sql + "" + field + ","
                values = values + "?" + ","
            }

        }
        return [sql, values];
    }
    //prepare sql where clause
    static parseSqlWhere(field_names) {
        field_names.reverse();
        //field_names = Object.keys(obj);
        //field_values = Object.values(obj);

        if (field_names === undefined) return "";

        let sql = "";

        while (field_names.length > 0) {
            let field = field_names.pop();

            if (field_names.length == 0) {
                sql = sql + "" + field + " = ?"
            } else {
                sql = sql + "" + field + " = ? and "
            }

        }
        return sql;
    }

    static parseToSqlUpdate(field_names) {
        field_names.reverse();

        if (field_names === undefined ) return "";

        let sql = "";

        while (field_names.length > 0) {
            let field = field_names.pop();

            if (field_names.length == 0) {
                sql = sql + "" + field + " = ?"
            } else {
                sql = sql + "" + field + " = ?,"
            }

        }
        return sql;
    }

    // Create a new record
    static createRecord(table, dataObject) {
        return new Promise((resolve, reject) => {
            let qPass = Persistence.parseSqlFieldNames(Object.keys(dataObject));
            const sql = `INSERT INTO ` + table + ` (` + qPass[0] + `) VALUES (` + qPass[1] + `)`;
            console.log(sql, dataObject);
            //const params = [table, Object.keys(dataObject).join(','), Object.values(dataObject).join(',')];
            const params = Object.values(dataObject);
            console.log(params);
            db.run(sql, params, function ( err) {
                if (err) {
                    //return callback(err);
                    reject(err);
                }
                //callback(null, this.lastID);
                resolve(this.lastID);
            });

        });
    }

    static updateRecord(table, id,  dataObject) {
        return new Promise((resolve, reject) => {
            let qPass = Persistence.parseToSqlUpdate(Object.keys(dataObject));
            const sql = `UPDATE ` + table + ` SET ` + qPass + ` WHERE id = ` + id + ``;
            console.log(sql, dataObject);
            //const params = [table, Object.keys(dataObject).join(','), Object.values(dataObject).join(',')];
            const params = Object.values(dataObject);
            console.log(params);
            db.run(sql, params, function ( err) {
                if (err) {
                    //return callback(err);
                    reject(err);
                }
                //callback(null, this.lastID);
                console.log(this);
                resolve(true);
            });

        });
    }

    // Get a record by properties using AND
    static getRecord(table, dataObject) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ` + table + ` where ` + Persistence.parseSqlWhere(Object.keys(dataObject));
            console.log(sql);

            const params = Object.values(dataObject);
            console.log(params);
            db.all(sql, params, function (err, rows) {
                if (err) {
                    //return callback(err);
                    reject(err);
                }

                // console.log( rows);
                // if(!rows){
                //     resolve(null);
                // }

                console.log(rows.length, rows);
                if (rows.length == 0) {
                    resolve(null);
                }else{
                    resolve(rows[0]);
                }
                
                //callback(null, rows[0]);
            });
        });
    }

    // Get a record by properties using AND
    static listRecords(table, dataObject) {
        console.log("db.listRecords",table, dataObject);
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM ` + table;
            let params = [];

            console.log("check req data is null")
            if (dataObject != null) {
                console.log("data object is not null");
                sql = sql + ` where ` + Persistence.parseSqlWhere(Object.keys(dataObject));
                params = Object.values(dataObject);
            }
            
            console.log(sql);
            console.log(params);

            db.all(sql, params, function (err, rows) {
                if (err) {
                    console.log(err)
                    reject(err);
                }
                console.log(rows.length, rows);
                resolve(rows);
            });
        });
    }

    //list record with sql
    static listRecordsWithSQL(sql, params) {
        console.log("db.listRecords",sql, params);
        return new Promise((resolve, reject) => {
            console.log(sql);
            console.log(params);

            db.all(sql, params, function (err, rows) {
                if (err) {
                    console.log(err)
                    reject(err);
                }
                console.log(rows.length, rows);
                resolve(rows);
            });
        });
    }

    static countRecords(table, dataObject) {
        console.log("db.listRecords",table, dataObject);
        return new Promise((resolve, reject) => {
            let sql = `SELECT count(*) as c FROM ` + table;
            let params = [];
            
            console.log("check req data is null")
            if (dataObject != null) {
                console.log("data object is not null");
                sql = sql + ` where ` + Persistence.parseSqlWhere(Object.keys(dataObject));
                params = Object.values(dataObject);
            }
            
            console.log(sql);
            console.log(params);

            db.all(sql, params, function (err, rows) {
                if (err) {
                    console.log(err)
                    reject(err);
                }
                console.log("rs", rows.length, rows,);
                if(rows.length > 0){
                    resolve(rows[0].c)
                }
                resolve(0);
            });
        });
    }



    //check login
    static getUserByAccountCredential(username, password) {
        const userAccountTable = "user_accounts";
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM user_accounts where username = ? and password = ?`;
            db.all(sql, [username, password], function (err, rows) {
                if (err) {
                    //return callback(err);
                    reject(err);
                }
                console.log(rows.length, rows);
                resolve(rows[0]);
                //callback(null, rows[0]);
            });

            // setTimeout(() => {
            //     if (userId === 1) {
            //         const data = { id: 1, name: 'John Doe' };
            //         resolve(data); // Resolve the promise with the data
            //     } else {
            //         reject(new Error('User not found')); // Reject the promise with an error
            //     }
            // }, 1000); // Simulate a 1-second delay
        });


    }




    // Get a user by ID
    static getUserById(id, callback) {
        const sql = `SELECT * FROM users WHERE id = ?`;
        db.get(sql, [id], (err, row) => {
            if (err) {
                return callback(err);
            }
            callback(null, row);
        });
    }

    // Update a user by ID
    static updateUser(id, name, email, callback) {
        const sql = `UPDATE users SET name = ?, email = ? WHERE id = ?`;
        db.run(sql, [name, email, id], function (err) {
            if (err) {
                return callback(err);
            }
            callback(null, this.changes);
        });
    }

    // Delete a user by ID
    static deleteUser(id, callback) {
        const sql = `DELETE FROM users WHERE id = ?`;
        db.run(sql, [id], function (err) {
            if (err) {
                return callback(err);
            }
            callback(null, this.changes);
        });
    }
}

module.exports = Persistence;
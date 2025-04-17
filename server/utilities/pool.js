import mysql from 'mysql2'

// Nest Ibadan Pool Database Connection
export const poolNESTIB = mysql
  .createPool({
    host: process.env.DB_HOSTNESTIB,
    user: process.env.DB_USERNESTIB,
    password: process.env.DB_PASSWORDNESTIB,
    database: process.env.DB_NAMENESTIB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  })
  .promise()

// ASABA Ibadan Pool Database Connection
export const poolASABA = mysql
  .createPool({
    host: process.env.DB_HOSTASABA,
    user: process.env.DB_USERASABA,
    password: process.env.DB_PASSWORDASABA,
    database: process.env.DB_NAMEASABA,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  })
  .promise()

// Royalparklane Pool Database Connection
export const poolROYALPARKLANE = mysql
  .createPool({
    host: process.env.DB_HOSTROYALPARKLANE,
    user: process.env.DB_USERROYALPARKLANE,
    password: process.env.DB_PASSWORDROYALPARKLANE,
    database: process.env.DB_NAMEROYALPARKLANE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  })
  .promise()

// KANO Pool Database Connection
export const poolKANO = mysql
  .createPool({
    host: process.env.DB_HOSTKANO,
    user: process.env.DB_USERKANO,
    password: process.env.DB_PASSWORDKANO,
    database: process.env.DB_NAMEKANO,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  })
  .promise()

// PLATINUM Pool Database Connection
export const poolPLATINUM = mysql
  .createPool({
    host: process.env.DB_HOSTPLATINUM,
    user: process.env.DB_USERPLATINUM,
    password: process.env.DB_PASSWORDPLATINUM,
    database: process.env.DB_NAMEPLATINUM,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  })
  .promise()

// HYATTI Pool Database Connection
export const poolHYATTI = mysql
  .createPool({
    host: process.env.DB_HOSTHYATTI,
    user: process.env.DB_USERHYATTI,
    password: process.env.DB_PASSWORDHYATTI,
    database: process.env.DB_NAMEHYATTI,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  })
  .promise()

// SMITHCITY Pool Database Connection
export const poolSMITHCITY = mysql
  .createPool({
    host: process.env.DB_HOSTSMITHCITY,
    user: process.env.DB_USERSMITHCITY,
    password: process.env.DB_PASSWORDSMITHCITY,
    database: process.env.DB_NAMESMITHCITY,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  })
  .promise()

// NESTGARKI Pool Database Connection
export const poolNESTGARKI = mysql
  .createPool({
    host: process.env.DB_HOSTNESTGARKI,
    user: process.env.DB_USERNESTGARKI,
    password: process.env.DB_PASSWORDNESTGARKI,
    database: process.env.DB_NAMENESTGARKI,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  })
  .promise()

// IMPERIAL Pool Database Connection
export const poolIMPERIAL = mysql
  .createPool({
    host: process.env.DB_HOSTIMPERIAL,
    user: process.env.DB_USERIMPERIAL,
    password: process.env.DB_PASSWORDIMPERIAL,
    database: process.env.DB_NAMEIMPERIAL,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  })
  .promise()

// ELVIS Pool Database Connection
export const poolELVIS = mysql
  .createPool({
    host: process.env.DB_HOSTELVIS,
    user: process.env.DB_USERELVIS,
    password: process.env.DB_PASSWORDELVIS,
    database: process.env.DB_NAMEELVIS,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  })
  .promise()

// ASOKORO Pool Database Connection
export const poolASOKORO = mysql
  .createPool({
    host: process.env.DB_HOSTASOKORO,
    user: process.env.DB_USERASOKORO,
    password: process.env.DB_PASSWORDASOKORO,
    database: process.env.DB_NAMEASOKORO,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  })
  .promise()

// TRANSTELL Pool Database Connection
export const poolTRANSTELL = mysql
  .createPool({
    host: process.env.DB_HOSTTRANSTELL,
    user: process.env.DB_USERTRANSTELL,
    password: process.env.DB_PASSWORDTRANSTELL,
    database: process.env.DB_NAMETRANSTELL,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  })
  .promise()

// IKEJARES Pool Database Connection
export const poolIKEJARES = mysql
  .createPool({
    host: process.env.DB_HOSTIKEJARES,
    user: process.env.DB_USERIKEJARES,
    password: process.env.DB_PASSWORDIKEJARES,
    database: process.env.DB_NAMEIKEJARES,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  })
  .promise()

//

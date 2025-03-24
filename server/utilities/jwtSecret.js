import crypto from 'crypto'

// Json webtoken
export const jwtSecret = crypto.randomBytes(64).toString('hex')

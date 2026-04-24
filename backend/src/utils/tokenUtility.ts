import crypto from "node:crypto";

export class tokenUtility {
  generateToken() {
    return crypto.randomBytes(32).toString('hex');
  }
  hashToken(token: string) {
    const hash = crypto.createHash("sha256"); 
    hash.update(token);
    return hash.digest("hex");
  }

  
/**
 * @param {string} plainToken
 * @param {string} storedHash 
 */
  verifyToken(plainToken: string, storedHash: string) {
  // 1. Hash the incoming token
  const receivedHash = crypto.createHash('sha256')
    .update(plainToken)
    .digest(); 

  // 2. Convert stored hash string back to a Buffer
  const expectedHash = Buffer.from(storedHash, 'hex');

  // 3. Compare using timingSafeEqual
  if (receivedHash.length !== expectedHash.length) {
    return false;
  }

  return crypto.timingSafeEqual(receivedHash, expectedHash);
}
}

const { randomBytes } = require("crypto");

function generateCoupon() {
  const charSet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const couponLength = 12; // Adjust the length as needed
  let coupon = "";

  for (let i = 0; i < couponLength; i++) {
    const randomBytesValue = randomBytes(1).readUInt8(0);
    const randomIndex = randomBytesValue % charSet.length;
    coupon += charSet.charAt(randomIndex);
  }

  return coupon;
}

module.exports = { generateCoupon };

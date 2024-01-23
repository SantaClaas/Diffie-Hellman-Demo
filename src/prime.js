/**
 * Checks if number is prime
 * @param {number} number
 * @returns {boolean} true if number is prime, false otherwise
 */
export function isPrime(number) {
  if (number === 2) {
    return true;
  }
  if (number % 2 === 0) {
    return false;
  }

  for (let i = 3; i < Math.sqrt(number); i += 2) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

// export function findNextPrime(number) {
//   if(number < 2) {
//     return 2;
//   }

//   let nextPrime = number + 1;

// }

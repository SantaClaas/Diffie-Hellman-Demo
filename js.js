const secretInput = document.getElementById("secret");
const publicKeyPInput = document.getElementById("g");
const publicKeyNInput = document.getElementById("n");

// Doing somewhat of a signal and dervied signals in JS here so functions don't have verbs
function getSecret() {
  const secret = secretInput.value;

  return Number.parseInt(secret);
}

function ourPublicKey() {
  const p = Number.parseInt(publicKeyPInput.value);
  const n = Number.parseInt(publicKeyNInput.value);
  const secret = getSecret();

  const ourPublicKey = n ** secret % p;

  return ourPublicKey;
}

function sharedPublicKey() {
  const p = Number.parseInt(publicKeyPInput.value);
  const g = Number.parseInt(publicKeyNInput.value);

  return { p, g };
}

secretInput.addEventListener("input", (event) => {
  const value = Number.parseInt(event.target.value);

  if (Number.isNaN(value)) {
    console.debug("Not a number");
    return;
  }

  console.debug("Secret: ", value);
});

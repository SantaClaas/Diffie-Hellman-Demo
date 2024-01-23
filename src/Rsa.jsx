import { createEffect, createSignal } from "solid-js";
import Input from "./Input";
import { isPrime } from "./prime";

function Rsa() {
  // Pick two prime numbers
  const [p, setP] = createSignal(5);
  const [q, setQ] = createSignal(14);
  let prime1Input, prime2Input;

  createEffect(() => {
    if (!prime1Input) return;

    prime1Input.value = p();
  });
  createEffect(() => {
    if (!prime2Input) return;

    prime2Input.value = q();
  });

  const [isFindingPrimeNumber, setIsFindingPrimeNumber] = createSignal(false);

  function setPrimeNumber(setter, getter) {
    return (event) => {
      let value = event.target.value * 1;
      const isReduce = value < getter();
      if (isPrime(value)) {
        setter(value);
        return;
      }

      setIsFindingPrimeNumber(true);
      while (!isPrime(value)) {
        value += isReduce ? -1 : 1;
      }
      setIsFindingPrimeNumber(false);

      setter(value);
    };
  }

  // Encryption
  const publicKey = [5, 14];

  const [plainText, setPlainText] = createSignal(0);

  const cypherText = () => plainText() ** publicKey[0] % publicKey[1];

  // Decryption
  const privateKey = [11, 14];
  const decryptedPlainText = () =>
    cypherText() ** privateKey[0] % privateKey[1];

  return (
    <main>
      <h1 class="text-4xl">RSA Demo</h1>
      <h2 class="text-3xl">Pick two prime numbers</h2>
      <Input
        id="prime1"
        type="number"
        label="Prime Number 1"
        value={p()}
        ref={prime1Input}
        disabled={isFindingPrimeNumber()}
        min="2"
        onChange={setPrimeNumber(setP, p)}
      />
      <Input
        id="prime2"
        type="number"
        label="Prime Number 2"
        value={q()}
        ref={prime2Input}
        disabled={isFindingPrimeNumber()}
        min="2"
        onChange={setPrimeNumber(setQ, q)}
      />

      <h2 class="text-3xl">Encryption</h2>
      <Input
        id="plain-text"
        type="number"
        label="Plain Text"
        value={plainText()}
        onChange={(event) => {
          setPlainText(event.target.value * 1);
        }}
      />
      <p>Cypher text: {cypherText()}</p>
      <h2 class="text-3xl">Decryption</h2>
      <p>Decrypted plain text: {decryptedPlainText()}</p>
    </main>
  );
}

export default Rsa;

import { createSignal } from "solid-js";
import solidLogo from "./assets/solid.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function isPrime(number) {
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

function App() {
  const [privateKey, setPrivateKey] = createSignal(null);
  const [g, setG] = createSignal(5);
  // Usually 2000 or 4000 bits long
  const [n, setN] = createSignal(23);

  const ourPublicKey = () => Math.pow(g(), privateKey()) % n();
  function handlePrivateKeyInput(event) {
    if (event.target.value > n()) {
      console.debug("Private key has to be smaller than n");
      return;
    }
    if (event.target.value < 1) {
      console.debug("Private key has to be bigger than 0");
      return;
    }

    setPrivateKey(event.target.value);
  }

  const [theirPublicKey, setTheirPublicKey] = createSignal(null);

  const sharedSecret = () => {
    if (!theirPublicKey()) {
      return null;
    }

    return Math.pow(theirPublicKey(), privateKey()) % n();
  };

  return (
    <main>
      <h1>Diffie Hellman Demo</h1>

      <ol>
        <li>
          <h2>Decide on a public key (g, n) and a private key</h2>
          <fieldset>
            <legend>Public Key</legend>
            <label for="g">g</label>
            <input
              type="number"
              id="g"
              min="0"
              value={g()}
              onInput={(event) => setG(event.target.value * 1)}
            />
            <label for="n">n</label>
            <input
              type="number"
              id="n"
              min="0"
              value={n()}
              onInput={(event) => setN(event.target.value * 1)}
            />
          </fieldset>
          <label for="private-key">Private Key</label>
          <input
            type="number"
            id="private-key"
            min={1}
            max={n()}
            onInput={handlePrivateKeyInput}
          />
          <p>Has to be between 1 and n</p>
        </li>
        <li>
          <h2>Compute the public key</h2>
          <p>
            g<sup>privateKey</sup> mod n
          </p>
          <p>
            {g()}
            <sup>{privateKey()}</sup> mod {n()} ={" "}
            {ourPublicKey() || "Please enter a private key"}
          </p>
        </li>

        <li>
          <h2>Exchange the public keys</h2>
          <label for="ours">Ours</label>
          <input type="number" id="ours" value={ourPublicKey()} disabled />

          <label for="theirs">Theirs</label>
          <input
            type="number"
            id="theirs"
            onInput={(event) => setTheirPublicKey(event.target.value)}
          />
        </li>

        <li>
          <h2>Compute the shared secret</h2>
          <p>
            theirPublicKey<sup>privateKey</sup> mod n
          </p>
          <p>
            {theirPublicKey()}
            <sup>{privateKey()}</sup> mod {n()} =
            {sharedSecret() || "Please enter their public key"}
          </p>
        </li>
      </ol>
    </main>
  );
}

export default App;

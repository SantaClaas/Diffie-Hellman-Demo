import { createEffect, createSignal } from "solid-js";
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

function Input({ id, label, ...properties }) {
  return (
    <>
      <label for={id} class="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div class="mt-2">
        <input
          type="number"
          id={id}
          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200"
          {...properties}
        />
      </div>
    </>
  );
}

function Step({ children }) {
  return (
    <section class="col-span-3 grid grid-cols-subgrid">{children}</section>
  );
}

function Variable({
  variableName,
  id,
  textClass = "text-gray-500 sm:text-sm",
  ...properties
}) {
  return (
    <div className="mt-2 flex rounded-md shadow-sm">
      <label
        for={id}
        class={`inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 ${textClass} `}
      >
        {variableName}
      </label>
      <input
        type="number"
        id={id}
        class="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200"
        {...properties}
      />
    </div>
  );
}

function App() {
  const [alicePrivateKey, setPrivateKey] = createSignal(null);
  const [g, setG] = createSignal(5);
  // Usually 2000 or 4000 bits long
  const [n, setN] = createSignal(23);

  const alicePublicKey = () =>
    alicePrivateKey() ? Math.pow(g(), alicePrivateKey()) % n() : null;
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

  const [bobPublicKey, setBobPublicKey] = createSignal(null);

  const sharedSecret = () => {
    if (!bobPublicKey()) {
      return null;
    }

    return Math.pow(bobPublicKey(), alicePrivateKey()) % n();
  };

  let alicePublicKeyInput;

  createEffect(() => {
    if (!alicePublicKeyInput || !alicePublicKey()) {
      return;
    }

    alicePublicKeyInput.value = alicePublicKey();
  });

  // Hiding public key for simplicity but make it optionally visible later
  const isPublicKeyHidden = true;
  // TODO add public and private area
  return (
    <main class="grid grid-cols-3 gap-4">
      <h1 class="text-4xl col-span-3">Diffie Hellman Demo</h1>

      <h2 class="text-3xl">Alice</h2>
      <h2 class="text-3xl">Public</h2>
      <h2 class="text-3xl">Bob</h2>

      <section class="col-start-2">
        <h3 class="text-2xl">1. Decide on a Public Key</h3>
        <p class="text-blue-500 font-bold col-start-2">
          Public Key: (g = {g()}, n = {n()}){" "}
        </p>
        {!isPublicKeyHidden && (
          <fieldset>
            <legend>Public Key</legend>

            <Variable
              id="g"
              variableName="g"
              min={0}
              value={g()}
              onInput={(event) => setG(event.target.value * 1)}
            />
            <Variable
              id="n"
              variableName="n"
              min={0}
              value={n()}
              onInput={(event) => setN(event.target.value * 1)}
            />
          </fieldset>
        )}
      </section>
      <section class="col-start-1">
        <h3 class="text-2xl">2. Decide on a private key</h3>
        <div class="col-start-1 row-start-2">
          <Variable
            id="private-key"
            variableName="a"
            textClass="text-red-500 font-bold text-2xl"
            min={1}
            max={n()}
            onInput={handlePrivateKeyInput}
          />
          <p>
            A number between 1 and{" "}
            <span class="text-blue-500 font-bold">n = {n()}</span>
          </p>
        </div>
      </section>

      <section class="col-start-1">
        <h3 class="text-2xl">3. Compute the public key</h3>
        <p class="font-semibold">
          Public Key <br />
          <span class="font-bold text-blue-500 italic">A</span> ={" "}
          <span class="font-bold text-blue-500">g</span>
          <sup class="font-bold text-lg text-red-500">a</sup> mod{" "}
          <span class="font-bold text-blue-500">n</span>
        </p>

        <p class="font-semibold">
          {/* "A" just for spacing */}
          <span class="font-bold text-blue-500 text-transparent">A</span> ={" "}
          <span class="font-bold text-blue-500">{g()}</span>
          <sup class="font-bold text-lg text-red-500">
            {alicePrivateKey() || "a"}
          </sup>{" "}
          mod <span class="font-bold text-blue-500">{n()}</span>
        </p>
        <p class="font-semibold">
          {/* "A" just for spacing */}
          <span class="font-bold text-blue-500 text-transparent">A</span> ={" "}
          <span class="font-bold text-blue-500">{alicePublicKey() ?? "?"}</span>{" "}
          {!alicePublicKey() && (
            <span class="font-normal">
              {" "}
              (Please enter a private key{" "}
              <span class="text-red-500 font-bold">a</span>)
            </span>
          )}
        </p>
      </section>

      <section class="row-start-6 col-start-2">
        <h3 class="text-2xl col-span-3">4. Exchange the public keys</h3>

        <div>
          <Variable
            id="alicePublicKey"
            variableName="A"
            textClass="text-blue-500 font-bold text-xl italic"
            ref={alicePublicKeyInput}
            disabled
          />
        </div>

        <div>
          <Variable
            id="bobPublicKey"
            variableName="B"
            textClass="text-blue-500 font-bold text-xl italic"
            onInput={(event) => setBobPublicKey(event.target.value * 1)}
          />
        </div>
      </section>

      <section class="row-start-7">
        <h3 class="text-2xl">Compute the shared secret</h3>

        <p class="font-semibold">
          Shared Secret <br />
          <span class="font-bold text-red-500 italic">s</span> ={" "}
          <span class="font-bold text-blue-500 italic">B</span>
          <sup class="font-bold text-lg text-red-500">a</sup> mod{" "}
          <span class="font-bold text-blue-500">n</span>
        </p>

        <p class="font-semibold">
          {/* "A" just for spacing */}
          <span class="font-bold text-blue-500 text-transparent">B</span> ={" "}
          <span class="font-bold text-blue-500 italic">
            {bobPublicKey() || "B"}
          </span>
          <sup class="font-bold text-lg text-red-500">
            {alicePrivateKey() || "a"}
          </sup>{" "}
          mod <span class="font-bold text-blue-500">{n()}</span>
        </p>
        <p class="font-semibold">
          {/* "A" just for spacing */}
          <span class="font-bold text-blue-500 text-transparent">B</span> ={" "}
          {function () {
            if (!alicePublicKey())
              return (
                <span class="font-normal">
                  {" "}
                  (Please enter a private key{" "}
                  <span class="text-red-500 font-bold">a</span>)
                </span>
              );

            if (!bobPublicKey())
              return (
                <span class="font-normal">
                  {" "}
                  (Please enter Bob's public key{" "}
                  <span class="text-blue-500 font-bold italic">B</span>)
                </span>
              );

            return (
              <span class="text-red-500 font-bold italic">
                {sharedSecret()}
              </span>
            );
          }}
        </p>
      </section>
    </main>
  );
}

export default App;

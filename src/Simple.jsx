import Input from "./Input";
import { Variable } from "./Complete";
import { createSignal } from "solid-js";

function Simple() {
  // Usually 2000 or 4000 bits long
  const [n, setN] = createSignal(23n);
  const [g, setG] = createSignal(5n);

  const [alicePrivateKey, setAlicePrivateKey] = createSignal(null);
  const alicePublicKey = () =>
    alicePrivateKey() ? g() ** alicePrivateKey() % n() : null;

  const [bobPublicKey, setBobPublicKey] = createSignal(null);
  function handlePrivateKeyInput(setPrivateKey) {
    return (event) => {
      if (event.target.value > n()) {
        console.debug("Private key has to be smaller than n");

        return;
      }

      if (event.target.value < 1n) {
        console.debug("Private key has to be bigger than 0");
        return;
      }

      setPrivateKey(BigInt(event.target.value));
    };
  }

  const sharedSecret = () => {
    if (!bobPublicKey() || !alicePrivateKey()) {
      return null;
    }

    return bobPublicKey() ** alicePrivateKey() % n();
  };

  let alicePrivateKeyInput;
  let bobPublicKeyInput;
  return (
    <main class="w-max mx-auto">
      <div class="mb-3">
        <h1>Denke dir eine Zahl zwischen 1 und 23</h1>
        <p>Aber sag sie niemanden!</p>
        <Variable
          id="alice"
          label="Privater Schlüssel"
          variableName="a"
          textClass="text-red-500 font-bold text-2xl"
          min={1}
          max={23}
          step={1}
          onInput={handlePrivateKeyInput(setAlicePrivateKey)}
        />
      </div>
      <div class="mb-5">
        <p class="font-semibold">
          Das Ergebnis Claas mitteilen:
          <br />
          <span class="font-bold text-blue-500 italic">A</span> ={" "}
          <span class="font-bold text-blue-500">g</span>
          <sup class="font-bold text-lg text-red-500">a</sup> mod{" "}
          <span class="font-bold text-blue-500">n</span>
        </p>

        <p class="font-semibold">
          {/* "A" just for spacing */}
          <span class="font-bold text-blue-500 text-transparent">A</span> ={" "}
          <span class="font-bold text-blue-500">{g().toString()}</span>
          <sup class="font-bold text-lg text-red-500">
            {alicePrivateKey()?.toString() || "a"}
          </sup>{" "}
          mod <span class="font-bold text-blue-500">{n().toString()}</span>
        </p>
        <p class="font-semibold">
          {/* "A" just for spacing */}
          <span class="font-bold text-blue-500 text-transparent">A</span> ={" "}
          <span class="font-bold text-blue-500">
            {alicePublicKey()?.toString() ?? "?"}
          </span>{" "}
          {!alicePublicKey() && (
            <span class="font-normal">
              {" "}
              (Bitte eine Zahl <span class="text-red-500 font-bold">
                a
              </span>{" "}
              eingeben)
            </span>
          )}
        </p>
      </div>

      <div class="mb-3">
        <h3>Zahl von Claas:</h3>
        <Variable
          id="bobPublicKey"
          variableName="B"
          textClass="text-blue-500 font-bold text-xl italic"
          onInput={(event) => {
            setBobPublicKey(BigInt(event.target.value));
          }}
          ref={bobPublicKeyInput}
        />
      </div>

      <div class="col-start-1">
        <p class="font-semibold">
          Unser Geheimnis <br />
          <span class="font-bold text-red-500 italic">s</span> ={" "}
          <span class="font-bold text-blue-500 italic">B</span>
          <sup class="font-bold text-lg text-red-500">a</sup> mod{" "}
          <span class="font-bold text-blue-500">n</span>
        </p>

        <p class="font-semibold">
          {/* "A" just for spacing */}
          <span class="font-bold text-blue-500 text-transparent">B</span> ={" "}
          <span class="font-bold text-blue-500 italic">
            {bobPublicKey()?.toString() || "B"}
          </span>
          <sup class="font-bold text-lg text-red-500">
            {alicePrivateKey()?.toString() || "a"}
          </sup>{" "}
          mod <span class="font-bold text-blue-500">{n().toString()}</span>
        </p>
        <p class="font-semibold">
          {/* "A" just for spacing */}
          <span class="font-bold text-blue-500 text-transparent">B</span> ={" "}
          {function () {
            if (!alicePrivateKey())
              return (
                <span class="font-normal">
                  {" "}
                  (Bitte gib eine Zahl{" "}
                  <span class="text-red-500 font-bold">a</span> ein)
                </span>
              );

            if (!bobPublicKey())
              return (
                <span class="font-normal">
                  {" "}
                  (Bitte Claas' Zahl{" "}
                  <span class="text-blue-500 font-bold italic">B</span>{" "}
                  eingeben)
                </span>
              );

            return (
              <span class="text-red-500 font-bold italic">
                {sharedSecret()?.toString()}
              </span>
            );
          }}
        </p>
      </div>
    </main>
  );
}

export default Simple;

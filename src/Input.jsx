function Input({ id, label, ...properties }) {
  return (
    <>
      <label for={id} class="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div class="mt-2">
        <input
          id={id}
          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200"
          {...properties}
        />
      </div>
    </>
  );
}

export default Input;

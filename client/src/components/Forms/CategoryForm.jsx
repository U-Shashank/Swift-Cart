import React, { useState } from 'react';

const CategoryForm = ({name, handleSubmit}) => {
  const [value, setValue] = useState(name ? name : "")
  return (
    <form className="min-w-[300px] sm:w-1/2 mx-auto p-4 bg-white text-black shadow-md rounded-md">
      <div className="mb-4">
        <input
          id="categoryInput"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder='Enter new category'
        />
      </div>
      <button
        type="button"
        onClick={() => {
            setValue("")
            handleSubmit(value)
        }}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
      >
        Submit
      </button>
    </form>
  );
};

export default CategoryForm;

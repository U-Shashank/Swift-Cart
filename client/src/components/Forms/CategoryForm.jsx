import { useState } from 'react';

const CategoryForm = ({ handleSubmit, name = '', buttonText = 'Submit' }) => {
  const [value, setValue] = useState(name);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(value);
    setValue('');
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter category name"
          className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <button 
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-2 sm:px-6 rounded transition duration-200"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
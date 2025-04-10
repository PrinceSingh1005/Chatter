const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
    return (
      <div className="flex gap-4 mb-4">
        <div className="flex items-center">
          <label className={`flex items-center gap-2 cursor-pointer ${
            selectedGender === "male" ? "text-blue-600 font-medium" : "text-gray-700"
          }`}>
            <span>Male</span>
            <input
              type="radio"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={selectedGender === "male"}
              onChange={() => onCheckboxChange("male")}
            />
          </label>
        </div>
  
        <div className="flex items-center">
          <label className={`flex items-center gap-2 cursor-pointer ${
            selectedGender === "female" ? "text-blue-600 font-medium" : "text-gray-700"
          }`}>
            <span>Female</span>
            <input
              type="radio"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={selectedGender === "female"}
              onChange={() => onCheckboxChange("female")}
            />
          </label>
        </div>
      </div>
    );
  };
  
  export default GenderCheckbox;
/**
 * Customer input form component
 */
import { useState } from "react";

const CustomerForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    sex: "Male",
    age: "",
    annual_income: "",
    spending_score: "",
    purchase_frequency: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate form
  const validate = () => {
    const newErrors = {};

    if (!formData.sex) {
      newErrors.sex = "Sex is required";
    }

    if (!formData.age || formData.age < 18 || formData.age > 100) {
      newErrors.age = "Age must be between 18 and 100";
    }

    if (!formData.annual_income || formData.annual_income < 0) {
      newErrors.annual_income = "Annual income must be positive";
    }

    if (
      !formData.spending_score ||
      formData.spending_score < 1 ||
      formData.spending_score > 100
    ) {
      newErrors.spending_score = "Spending score must be between 1 and 100";
    }

    if (!formData.purchase_frequency || formData.purchase_frequency < 0) {
      newErrors.purchase_frequency = "Purchase frequency must be positive";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      // Convert to numbers
      const data = {
        sex: formData.sex,
        age: parseInt(formData.age),
        annual_income: parseFloat(formData.annual_income),
        spending_score: parseInt(formData.spending_score),
        purchase_frequency: parseInt(formData.purchase_frequency),
      };
      onSubmit(data);
    }
  };

  return (
    <div className="glass rounded-2xl shadow-2xl p-4 sm:p-6 border border-white/30 backdrop-blur-xl animate-slideInLeft">
      <div className="flex items-center mb-4 sm:mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mr-3 shadow-xl">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          📝 Customer Information
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        {/* Sex */}
        <div>
          <label
            htmlFor="sex"
            className="block text-sm font-medium text-gray-700 mb-1">
            Sex
          </label>
          <select
            id="sex"
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.sex ? "border-red-500" : "border-gray-300"
            }`}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.sex && (
            <p className="text-red-500 text-sm mt-1">{errors.sex}</p>
          )}
        </div>

        {/* Age */}
        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700 mb-1">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.age ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter age (18-100)"
          />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age}</p>
          )}
        </div>

        {/* Annual Income */}
        <div>
          <label
            htmlFor="annual_income"
            className="block text-sm font-medium text-gray-700 mb-1">
            Annual Income (in thousands)
          </label>
          <input
            type="number"
            id="annual_income"
            name="annual_income"
            value={formData.annual_income}
            onChange={handleChange}
            step="0.1"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.annual_income ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter annual income (e.g., 65.5)"
          />
          {errors.annual_income && (
            <p className="text-red-500 text-sm mt-1">{errors.annual_income}</p>
          )}
        </div>

        {/* Spending Score */}
        <div>
          <label
            htmlFor="spending_score"
            className="block text-sm font-medium text-gray-700 mb-1">
            Spending Score (1-100)
          </label>
          <input
            type="number"
            id="spending_score"
            name="spending_score"
            value={formData.spending_score}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.spending_score ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter spending score (1-100)"
          />
          {errors.spending_score && (
            <p className="text-red-500 text-sm mt-1">{errors.spending_score}</p>
          )}
        </div>

        {/* Purchase Frequency */}
        <div>
          <label
            htmlFor="purchase_frequency"
            className="block text-sm font-medium text-gray-700 mb-1">
            Purchase Frequency (per year)
          </label>
          <input
            type="number"
            id="purchase_frequency"
            name="purchase_frequency"
            value={formData.purchase_frequency}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.purchase_frequency ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter purchase frequency"
          />
          {errors.purchase_frequency && (
            <p className="text-red-500 text-sm mt-1">
              {errors.purchase_frequency}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 sm:py-4 px-4 rounded-xl font-bold text-white text-base sm:text-lg shadow-xl transition-all transform ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:scale-105 hover:shadow-2xl"
          }`}>
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              🚀 Predict Segment
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;

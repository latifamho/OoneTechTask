import { Search } from "lucide-react";
import { BsSearch } from "react-icons/bs";

export function Input({
  icon,
  label,
  type,
  id,
  variant,
  focus,
  error,
  nameInput,
  register,
  ...props
}) {
  return (
    <div className="relative w-full group">
      <div
        className={`relative border border-border/[0.3] rounded-md ${
          error ? "border-red-500" : "border-gray-300"
        } focus-within:border-border focus-within:border-2`}
      >
        <input
          type={type}
          id={id}
          className={`block w-full px-3 py-3 bg-transparent appearance-none focus:outline-none peer 
            ${variant === "filled" ? "bg-gray-50" : ""}
            ${error ? "text-red-500" : "text-text"}
            pl-10 // Add padding to prevent text overlap with icon
          `}
          {...register(nameInput)}
          {...props}
        />

        <BsSearch
          size={14}
          className="absolute right-5 top-4 opacity-0 peer-focus:opacity-100 transition-opacity duration-200 text-gray-400"
        />

        <label
          htmlFor={id}
          className={`absolute flex gap-2 text-[9px] items-center top-3 px-5 transition-all duration-200 transform origin-top-left bg-white
            peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-text
            ${
              props.value || props.defaultValue
                ? "-translate-y-7 scale-75 left-3"
                : "left-5"
            }
            ${error ? "text-red-500" : "text-text/[0.5]"}
          `}
        >
          <span>{label}</span>
        </label>

        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none peer-focus:opacity-0 opacity-100 transition-opacity duration-200">
          <Search size={14} className="text-gray-400" />
        </div>
      </div>
      {error && (
        <span className="block mt-1 ml-3 text-xs text-red-500">{error}</span>
      )}
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import { useField } from "formik";
import { Input } from "@nextui-org/react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const CustomInput = ({ 
  label, 
  label_style, 
  isRequired, 
  classNames, 
  isDisabled, 
  type, 
  ...props 
}) => {
  const [field, meta] = useField(props);
  const [isVisible, setIsVisible] = useState(false); // For password visibility toggle
  const errorField = useRef();

  useEffect(() => {
    if (meta.touched && meta.error) {
      errorField.current?.classList.remove("error-slide-exit-animation");
    }
  }, [meta.touched, meta.error]);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const getInputType = () => {
    if (type === "password") return isVisible ? "text" : "password";
    if (type === "file") return "file";
    return type || "text";
  };

  return (
    <div>
      {label && (
        <label
          htmlFor={label.replace(/\s+/g, "-").toLowerCase()}
          className={`mb-1 font-satoshi font-medium block text-[14px] ${label_style || ""}`}
        >
          {label}
        </label>
      )}
      <div className="position-relative">
        <Input
          isRequired={isRequired}
          id={label && label.replace(/\s+/g, "-").toLowerCase()}
          {...field}
          {...props}
          type={getInputType()}
          isDisabled={isDisabled}
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "placeholder:text-gray5",
              "text-white",
            ],
            base: [
              "border-gray w-full"
            ],
            innerWrapper: [
              "bg-black8",
              "px-[12px]",
              "rounded-[8px]",
              "text-white",
              "hover:bg-black4",
            ],
            inputWrapper: [
              "bg-black8",
              "rounded-[8px]",
              "px-0",
              "text-white",
              "hover:bg-black4",
            ],
          }}
          className={`rounded-[8px] border border-gray ${meta.touched && meta.error ? "border border-danger" : ""}`}
          endContent={type === "password" && (
            <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
              {isVisible ? (
                <FaEye className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          )}
        />
        {meta.touched && meta.error && (
          <div
            ref={errorField}
            className={`error text-[12px] text-danger mt-1 ${meta.touched && meta.error ? "error-slide-enter-animation" : ""} ${!meta.error ? "error-slide-exit-animation" : ""}`}
          >
            {meta.touched && meta.error}
          </div>
        )}
      </div>
      {type === "file" && (
        <div className="mt-2 text-[14px] text-white">
          {field.value && field.value.name ? field.value.name : "No file chosen"}
        </div>
      )}
    </div>
  );
};

export default CustomInput;

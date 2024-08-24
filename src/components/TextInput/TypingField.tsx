import React, { useCallback, useEffect, useRef } from "react";
import Textarea from "react-expanding-textarea";
import './TypingField.css';
const TypingField = ({ value, onChange }) => {
  const textareaRef = useRef(null);

  const handleChange = useCallback((e) => {
    onChange(e.target.value);
    console.log("Changed value to: ", e.target.value);
  }, [onChange]);

  return (
    <>
      <Textarea
        className="textarea"
        id="my-textarea"
        name="pet[notes]"
        value={value}
        onChange={handleChange}
        placeholder="Comment here"
        ref={textareaRef}
      />
    </>
  );
};

export default TypingField;

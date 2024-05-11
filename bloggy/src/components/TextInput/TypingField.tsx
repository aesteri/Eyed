import React, { useCallback, useEffect, useRef } from "react";
import Textarea from "react-expanding-textarea";
import './TypingField.css';
const TypingField = () => {
  const textareaRef = useRef(null);

  const handleChange = useCallback((e) => {
    console.log("Changed value to: ", e.target.value);
  }, []);

  return (
    <>
      <Textarea
        className="textarea"
        id="my-textarea"
        name="pet[notes]"
        onChange={handleChange}
        placeholder="Comment here"
        ref={textareaRef}
      />
    </>
  );
};

export default TypingField;

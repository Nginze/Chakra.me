import React, { useState } from "react";
import "../../styles/Rule.css";

const Rule = ({ rule, description }) => {
  const [showExplanation, setShowExplanation] = useState(false);
  return (
    <div id="rule">
      <div
        onClick={() => setShowExplanation(!showExplanation)}
        className="rule-statement"
      >
        <span>{rule}</span>
        <span
          class="iconify"
          data-icon="bx:chevron-down"
          data-width="15"
        ></span>
      </div>
      {showExplanation && <div className="explanation">{description}</div>}
    </div>
  );
};

export default Rule;

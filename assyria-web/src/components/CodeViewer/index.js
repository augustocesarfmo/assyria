import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-json'; // need this to read json syntax

// import './styles.css';

export default function CodeViewer({ code, language }) {
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <pre>
      <code
        style={{ whiteSpace: 'pre-wrap' }}
        className={`language-${language}`}
      >
        {code}
      </code>
    </pre>
  );
}

CodeViewer.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

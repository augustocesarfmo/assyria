import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import { Viewer, Worker } from '@react-pdf-viewer/core';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import HowToUseFile from './how-to-use.pdf';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';

import { Container } from './styles';

function HowToUse({ pageName }) {
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;

  useEffect(() => {
    document.title = 'How to Use | Spatial Workspace';
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {pageName}
      </Typography>

      <div
        style={{
          alignItems: 'center',
          backgroundColor: '#eeeeee',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          display: 'flex',
          padding: '4px',
          color: 'black',
        }}
      >
        <Toolbar />
      </div>
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          color: '#fff !important',
        }}
      >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
          <Viewer fileUrl={HowToUseFile} plugins={[toolbarPluginInstance]} />
        </Worker>
      </div>
    </Container>
  );
}

HowToUse.propTypes = {
  pageName: PropTypes.string.isRequired,
};

export default HowToUse;

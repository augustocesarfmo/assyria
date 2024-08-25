import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import FormLabel from '@material-ui/core/FormLabel';
import Chip from '@material-ui/core/Chip';
import AttachmentIcon from '@material-ui/icons/Attachment';

import { Container } from './styles';

function ButtonImportXlsx({
  className,
  file,
  handleFileChange,
  handleDeleteFile,
  setModalVisible,
}) {
  const inputFile = useRef(null); // Input file reference

  useEffect(() => {
    if (!file) {
      inputFile.current.value = null;
      return;
    }

    setModalVisible(true);
  }, [file, setModalVisible]);

  function handleClick() {
    if (file) {
      setModalVisible(true);
      return;
    }

    inputFile.current.click();
  }

  return (
    <Container className={className}>
      <FormLabel component="legend">Attached file</FormLabel>

      <input
        onChange={handleFileChange}
        style={{ display: 'none' }}
        type="file"
        ref={inputFile}
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      />

      <Chip
        onClick={handleClick}
        icon={<AttachmentIcon />}
        label={file ? file.name : 'Click here to import a file'}
        onDelete={file ? handleDeleteFile : null}
        variant={file ? 'default' : 'outlined'}
      />
    </Container>
  );
}

ButtonImportXlsx.propTypes = {
  className: PropTypes.string,
  file: PropTypes.shape({
    name: PropTypes.string,
  }),
  handleFileChange: PropTypes.func.isRequired,
  handleDeleteFile: PropTypes.func.isRequired,
  setModalVisible: PropTypes.func.isRequired,
};

ButtonImportXlsx.defaultProps = {
  className: null,
  file: null,
};

export default ButtonImportXlsx;

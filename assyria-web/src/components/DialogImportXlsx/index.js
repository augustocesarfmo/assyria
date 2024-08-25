import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import xlsx from 'xlsx'; // For read xlsx files
import RadioButtonsGroup from '~/components/RadioButtonsGroup'; // RadioButtonsGroup
import AlertDialog from '~/components/AlertDialog';

import { read } from '~/services/xlsx';

import { Container } from './styles';

function DialogImportXlsx({
  children,
  file,
  setFile,
  setData,
  open,
  setOpen,
  submitButton,
}) {
  const [wb, setWb] = useState(null); // Caches the attached .xslx file
  const [sheets, setSheets] = useState([]); // Array with the name of available spreadsheets
  const [option, setOption] = useState(0); // Selected option sheet

  /**
   * Reads the .xlsx data as JSON and arranges the selectable columns.
   */
  const readXlsx = useCallback(() => {
    const result = read(wb, option);

    setData(result); // Ignores the first line (columns names)
  }, [wb, option, setData]);

  /**
   * Reads selected file as binary.
   * @param {Object} archive File object.
   */
  function loadFile(archive) {
    const reader = new FileReader();

    reader.onload = evt => {
      /* Parse data (binary) */
      const bstr = evt.target.result;

      const tmp_wb = xlsx.read(bstr, { type: 'binary' });

      setWb(tmp_wb); // Caches the worbook for possible spreadsheet changes
    };

    reader.readAsBinaryString(archive);
  }

  useEffect(() => {
    if (!wb) return;

    setSheets(wb.SheetNames); // Stores the name of available spreadsheets
    readXlsx(wb); // Reads the .xlsx data as JSON
  }, [wb, option, readXlsx]);

  useEffect(() => {
    if (!file) {
      setOption(0);
      return;
    }

    loadFile(file);
  }, [file]);

  function handleFileChange(e) {
    const result = e.target.files[0];
    setOption(0); // Sets default option

    // console.log(file.name);

    if (setFile) setFile(result);
    loadFile(result);
  }

  return (
    <AlertDialog
      open={open}
      setOpen={setOpen}
      title="Attach a file .xlsx"
      submitButton={submitButton}
    >
      <Container>
        <input
          onChange={handleFileChange}
          type="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        />

        {sheets.length > 0 && (
          <>
            <RadioButtonsGroup
              handleChange={setOption}
              value={option}
              title="Sheet"
              options={sheets}
              helperText="You can switch to another sheet of interest"
            />

            {children && children}
          </>
        )}
      </Container>
    </AlertDialog>
  );
}

DialogImportXlsx.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  file: PropTypes.shape({}),
  setFile: PropTypes.func,
  setData: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  submitButton: PropTypes.func,
};

DialogImportXlsx.defaultProps = {
  file: null,
  setFile: null,
  submitButton: null,
};

export default DialogImportXlsx;

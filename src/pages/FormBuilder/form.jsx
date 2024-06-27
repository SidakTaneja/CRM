import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import { FormControl, FormLabel, RadioGroup, Radio } from '@mui/material';
import { InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { getLayout } from '../../hooks/API/api';

const Form = ({ entity_id, entity_name }) => {
    const [formValues, setFormValues] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState(null);

    // const formData = {
    //     "rows": [
    //         [
    //             {
    //                 "name": "name",
    //                 "type": "radio"
    //             },
    //             {
    //                 "pika": "active",
    //                 "type": "checkbox"
    //             }
    //         ],
    //         [
    //             {
    //                 "Start Time": "fee",
    //                 "type": "text"
    //             },
    //             {
    //                 "End Time": "id",
    //                 "type": "text"
    //             }
    //         ]
    //     ]
    // };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getLayout(entity_id, 'list');
                console.log(result.layout_data, entity_name)
                setFormData(result.layout_data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [entity_id]);

    const handleInputChange = (fieldId, value) => {
        setFormValues({
            ...formValues,
            [fieldId]: value
        });
    };

    const handleCheckboxChange = (fieldId) => (event) => {
        setFormValues({
            ...formValues,
            [fieldId]: event.target.checked ? 1 : 0
        });
    };

    const handleRadioChange = (fieldId) => (event) => {
        setFormValues({
            ...formValues,
            [fieldId]: event.target.value
        });
    };

    const handleSelectChange = (fieldId) => (event) => {
        setFormValues({
            ...formValues,
            [fieldId]: event.target.value
        });
    };

    const handleDateChange = (fieldId) => (event) => {
        setFormValues({
            ...formValues,
            [fieldId]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const errors = {};
        formData.rows.forEach(row => {
            row.forEach(field => {
                const fieldEntries = Object.entries(field).filter(([key, value]) => key !== 'type');
                const fieldLabel = fieldEntries[0][0];
                const fieldName = fieldEntries[0][1];

                if (!formValues[fieldName] && field.type !== 'checkbox' && field.type !== 'radio') {
                    errors[fieldName] = 'This field is required';
                }
            });
        });
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        const formDataJSON = JSON.stringify(formValues, null, 2);
        console.log('Form Data:', formDataJSON);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                {formData?.rows?.map((row, rowIndex) => (
                    row.map((field, columnIndex) => {
                        const fieldEntries = Object.entries(field).filter(([key, value]) => key !== 'type');
                        const fieldLabel = fieldEntries[0][0];
                        const fieldName = fieldEntries[0][1];

                        return (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                key={`${rowIndex}-${columnIndex}`}
                                style={{
                                    gridRow: rowIndex + 1,
                                    gridColumn: columnIndex + 1,
                                }}
                            >
                                <Box marginBottom="10px">
                                    {field.type === 'text' && (
                                        <TextField
                                            fullWidth
                                            id={fieldName}
                                            label={fieldLabel}
                                            variant="outlined"
                                            value={formValues[fieldName] || ''}
                                            onChange={(e) => handleInputChange(fieldName, e.target.value)}
                                            error={Boolean(formErrors[fieldName])}
                                            helperText={formErrors[fieldName]}
                                        />
                                    )}
                                    {field.type === 'checkbox' && (
                                        <FormControlLabel
                                            control={<Checkbox
                                                checked={formValues[fieldName] === 1}
                                                onChange={handleCheckboxChange(fieldName)}
                                            />}
                                            label={fieldLabel}
                                        />
                                    )}
                                    {field.type === 'radio' && (
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">{fieldLabel}</FormLabel>
                                            <RadioGroup
                                                aria-label={fieldLabel}
                                                name={fieldName}
                                                value={formValues[fieldName] || ''}
                                                onChange={handleRadioChange(fieldName)}
                                            >
                                                {field.options.map(option => (
                                                    <FormControlLabel
                                                        key={option.value}
                                                        value={option.value}
                                                        control={<Radio />}
                                                        label={option.label}
                                                    />
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                    )}
                                    {field.type === 'select' && (
                                        <FormControl fullWidth>
                                            <InputLabel id={`${fieldName}-label`}>{fieldLabel}</InputLabel>
                                            <Select
                                                labelId={`${fieldName}-label`}
                                                id={fieldName}
                                                value={formValues[fieldName] || ''}
                                                onChange={handleSelectChange(fieldName)}
                                                variant="outlined"
                                            >
                                                {field.options.map(option => (
                                                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    )}
                                    {field.type === 'date' && (
                                        <TextField
                                            fullWidth
                                            id={fieldName}
                                            label={fieldLabel}
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={formValues[fieldName] || ''}
                                            onChange={handleDateChange(fieldName)}
                                            variant="outlined"
                                        />
                                    )}
                                </Box>
                            </Grid>
                        );
                    })
                ))}
            </Grid>
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </form>
    );
};

export default Form;
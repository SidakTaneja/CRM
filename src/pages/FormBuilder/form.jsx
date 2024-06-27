import React, { useState } from 'react';
import { Box, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import { FormControl, FormLabel, RadioGroup, Radio } from '@mui/material';
import { InputLabel, Select, MenuItem, Grid } from '@mui/material';

const Form = () => {
    const [formValues, setFormValues] = useState({});
    const [formErrors, setFormErrors] = useState({});

    const formData = {
        "rows": [
            [
                {
                    "name": { label: 'Name', type: 'text' }
                },
                {
                    "boom": { label: 'Pika', type: 'text' }
                }
            ],
            [
                {
                    "shuru": { label: 'Start Time', type: 'text' }
                },
                {
                    "khatam": { label: 'End Time', type: 'text' }
                }
            ]
        ]
    };

    const handleInputChange = (fieldId, value) => {
        setFormValues({
            ...formValues,
            [fieldId]: value
        });
    };

    const handleCheckboxChange = (fieldId) => (event) => {
        setFormValues({
            ...formValues,
            [fieldId]: event.target.checked
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
        formData.rows.flat().forEach(row => {
            const [fieldId, fieldData] = Object.entries(row)[0];
            if (!formValues[fieldId]) {
                errors[fieldId] = 'This field is required';
            }
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
                {formData.rows.map((row, rowIndex) => (
                    row.map((field, columnIndex) => {
                        const [fieldId, fieldData] = Object.entries(field)[0];

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
                                    {fieldData.type === 'text' && (
                                        <TextField
                                            fullWidth
                                            id={fieldId}
                                            label={fieldData.label}
                                            variant="outlined"
                                            value={formValues[fieldId] || ''}
                                            onChange={(e) => handleInputChange(fieldId, e.target.value)}
                                            error={Boolean(formErrors[fieldId])}
                                            helperText={formErrors[fieldId]}
                                        />
                                    )}
                                    {fieldData.type === 'checkbox' && (
                                        <FormControlLabel
                                            control={<Checkbox
                                                checked={Boolean(formValues[fieldId])}
                                                onChange={handleCheckboxChange(fieldId)}
                                            />}
                                            label={fieldData.label}
                                        />
                                    )}
                                    {fieldData.type === 'radio' && (
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">{fieldData.label}</FormLabel>
                                            <RadioGroup
                                                aria-label={fieldData.label}
                                                name={fieldId}
                                                value={formValues[fieldId] || ''}
                                                onChange={handleRadioChange(fieldId)}
                                            >
                                                {fieldData.options.map(option => (
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
                                    {fieldData.type === 'select' && (
                                        <FormControl fullWidth>
                                            <InputLabel id={`${fieldId}-label`}>{fieldData.label}</InputLabel>
                                            <Select
                                                labelId={`${fieldId}-label`}
                                                id={fieldId}
                                                value={formValues[fieldId] || ''}
                                                onChange={handleSelectChange(fieldId)}
                                                variant="outlined"
                                            >
                                                {fieldData.options.map(option => (
                                                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    )}
                                    {fieldData.type === 'date' && (
                                        <TextField
                                            fullWidth
                                            id={fieldId}
                                            label={fieldData.label}
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={formValues[fieldId] || ''}
                                            onChange={handleDateChange(fieldId)}
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
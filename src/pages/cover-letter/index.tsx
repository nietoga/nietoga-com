import { Box, Button, TextField, Typography } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Layout } from '@nietoga/nietoga-com/components/layout';
import { Meta, Title } from '@nietoga/nietoga-com/components/page';

import styles from './cover-letter.module.css';

interface CoverLetterFormData {
    template: string;
    [key: string]: string;
}

interface GeneratedField {
    name: string;
    label: string;
}

const CoverLetterGenerator = () => {
    const [fields, setFields] = useState<GeneratedField[]>([]);
    const { register, getValues, formState } = useForm<CoverLetterFormData>();

    console.log(formState);

    const getFieldsMock = (template: string): string[] => {
        // TODO: fix Hiring Manager's Name case
        return ["Hiring Manager's Name", 'Company Name', 'Your Name'];
    };

    const generateFieldName = (fieldName: string) => {
        return fieldName.replace("'", '');
    };

    const renderFields = () => {
        if (fields.length) {
            return (
                <>
                    <Typography>Fill the missing fields:</Typography>
                    {fields.map((field) => (
                        <TextField
                            key={field.name}
                            label={field.label}
                            fullWidth
                            type="text"
                            {...register(field.name)}
                        />
                    ))}
                    <Button type="submit" variant="contained">
                        Generate
                    </Button>
                </>
            );
        }
    };

    const handleCreateForm = () => {
        const template = getValues('template');
        if (template) {
            // TODO: get fields and generate form
            const fieldNames = getFieldsMock(template);
            const newFields = fieldNames.map((fieldName) => {
                return {
                    label: fieldName,
                    name: generateFieldName(fieldName),
                };
            });
            setFields(newFields);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <Layout>
            <Title title="Cover letter generator" />
            <Meta
                name="description"
                content="Cover letter generator to apply for a job"
            />
            <Box>
                <p>
                    You can use this tool to generate a cover letter based on a
                    template provided by Chat-gpt or similar tools. Paste your
                    template in the text are and you can generate fields to fill
                    the missing parts of your cover letter
                </p>
                <div className={styles.container}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <TextField
                            id="template"
                            fullWidth
                            placeholder="Paste your template here"
                            multiline
                            maxRows={10}
                            variant="filled"
                            {...register('template')}
                        />
                        <Button
                            variant="contained"
                            onClick={handleCreateForm}
                            // TODO: change to validate if template has a value
                            disabled={!formState.isDirty}
                        >
                            Create form
                        </Button>
                        {renderFields()}
                    </form>
                    <TextField
                        // value="result"
                        placeholder="Paste and generate your cover letter..."
                    />
                </div>
            </Box>
        </Layout>
    );
};

export default CoverLetterGenerator;

'use client';

import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { usePython } from 'react-py';

import { CopyToClipboard } from '@nietoga/nietoga-com/components/copyToClipboard';
import { downloadFile } from '@nietoga/nietoga-com/utils/downloadFile';
import { readFile as readFileContents } from '@nietoga/nietoga-com/utils/readFile';

import { Collapsible } from '../collapsible/collapsible';
import { Logs } from '../logs';
import styles from './etlForm.module.css';
import { FormContainer } from './formContainer';

const requiredErrorMsg = 'This field is required ';

interface FormData {
    inputFile: FileList;
    code: string;
}

export const ETLForm = () => {
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<FormData>();

    const onInputError = (field: keyof typeof errors) => {
        if (errors[field]) {
            return {
                error: true,
                helperText: errors[field]?.message,
            };
        }
    };

    const {
        writeFile,
        readFile,
        isReady,
        isRunning,
        runPython,
        stdout,
        stderr,
    } = usePython();

    const { query } = useRouter();

    useEffect(() => {
        if (!Array.isArray(query.code)) {
            const code = query.code ?? '';
            setValue('code', code);
        }
    }, [query.code, setValue]);

    const [permalink, setPermalink] = useState<string>();

    const generatePermalink = useCallback(() => {
        const data = getValues();
        const code = encodeURIComponent(data.code);
        setPermalink(`${window.location.origin}/etl?code=${code}`);
    }, [getValues]);

    const onSubmit = useCallback(
        async (data: FormData) => {
            const fileContents = await readFileContents(data.inputFile[0]);
            await writeFile('./input_file.csv', fileContents);
            await runPython(data.code);

            // @ts-ignore
            // The readFile method is not typed properly.
            // Says it returns void, but it actually returns a string.
            const outputContents: string = await readFile('./output_file.csv');
            downloadFile('output_file.csv', outputContents);
        },
        [readFile, runPython, writeFile]
    );

    if (isRunning) {
        return (
            <FormContainer className={styles['loader']}>
                <CircularProgress />
                <span>Running...</span>
            </FormContainer>
        );
    }

    if (!isReady) {
        return (
            <FormContainer className={styles['loader']}>
                <CircularProgress />
                <h3>Loading...</h3>
            </FormContainer>
        );
    }

    return (
        <FormContainer>
            <form
                className={styles['etl-form']}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Typography variant="h2" align="center">
                    ETL form
                </Typography>
                <div className={styles['field']}>
                    <label htmlFor="inputFile">File: </label>
                    <TextField
                        id="inputFile"
                        type="file"
                        variant="standard"
                        {...register('inputFile', {
                            required: requiredErrorMsg,
                        })}
                        {...onInputError('inputFile')}
                    ></TextField>
                </div>

                <Collapsible
                    header="code"
                    hiddenContent={
                        <TextField
                            id="code"
                            fullWidth
                            placeholder="Enter your code here"
                            multiline
                            maxRows={10}
                            variant="filled"
                            {...register('code', {
                                required: requiredErrorMsg,
                            })}
                            {...onInputError('code')}
                        />
                    }
                />

                <Button
                    className={styles['button']}
                    type="submit"
                    variant="contained"
                >
                    Submit
                </Button>
                <Button
                    className={styles['button']}
                    type="button"
                    variant="contained"
                    onClick={generatePermalink}
                >
                    Create Permalink
                </Button>

                {permalink ? <CopyToClipboard text={permalink} /> : null}

                <Logs title="Logs" logs={stdout} />
                <Logs title="Error logs" logs={stderr} />
            </form>
        </FormContainer>
    );
};

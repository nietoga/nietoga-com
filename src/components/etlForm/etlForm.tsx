import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { usePython } from 'react-py';

import { downloadFile } from '@nietoga/nietoga-com/utils/downloadFile';
import { readFile as readFileContents } from '@nietoga/nietoga-com/utils/readFile';

import { Collapsible } from '../collapsible/collapsible';
import { Logs } from '../logs';
import styles from './etlForm.module.css';
import { FormContainer } from './formContainer';

const sampleCode = `
import pandas as pd

root_folder = "."

data = pd.read_csv(root_folder + "/input_file.csv")
print(data)
newData = data[data["age"] > 18]
newData.to_csv(root_folder + "/output_file.csv", index=False)
`;

interface FormData {
    input_file: FileList;
    code: string;
}

export const ETLForm = () => {
    const { register, handleSubmit } = useForm<FormData>();

    const {
        writeFile,
        readFile,
        isReady,
        isRunning,
        runPython,
        stdout,
        stderr,
    } = usePython();

    const onSubmit = useCallback(
        async (data: FormData) => {
            const fileContents = await readFileContents(data.input_file[0]);
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
                    <label htmlFor="input_file">File: </label>
                    <TextField
                        id="input_file"
                        type="file"
                        variant="standard"
                        {...register('input_file', { required: true })}
                    ></TextField>
                </div>

                <Collapsible
                    header="code"
                    hiddenContent={
                        <TextField
                            fullWidth
                            id="code"
                            defaultValue={sampleCode}
                            placeholder="Enter your code here"
                            multiline
                            maxRows={10}
                            variant="filled"
                            {...register('code', { required: true })}
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
                <Logs title="Logs" logs={stdout} />
                <Logs title="Error logs" logs={stderr} />
            </form>
        </FormContainer>
    );
};

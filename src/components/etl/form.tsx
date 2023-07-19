import { downloadFile } from '@nietoga/nietoga-com/utils/downloadFile';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { usePython } from 'react-py';

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

export const Form = () => {
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
            const fr = new FileReader();

            fr.onload = async () => {
                const fileContents = String(fr.result);
                await writeFile('./input_file.csv', fileContents);
                await runPython(data.code);

                // @ts-ignore
                // The readFile method is not typed properly.
                // Says it returns void, but it actually returns a string.
                const outputContents: string = await readFile(
                    './output_file.csv'
                );
                downloadFile('output_file.csv', outputContents);
            };

            fr.readAsText(data.input_file[0]);
        },
        [readFile, runPython, writeFile]
    );

    if (isRunning) {
        return <span>Running...</span>;
    }

    if (!isReady) {
        return <span>Loading...</span>;
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="input_file">Input File: </label>
                <input
                    id="input_file"
                    type="file"
                    accept="text/csv"
                    {...register('input_file', { required: true })}
                />
                <br />
                <label htmlFor="code">Code: </label>
                <textarea
                    id="code"
                    {...register('code', { required: true })}
                    defaultValue={sampleCode}
                />
                <br />
                <input type="submit" value="Submit" />
            </form>

            <div>
                <h1>Logs</h1>
                <pre id="logs">{stdout}</pre>
            </div>

            <div>
                <h1>Error logs</h1>
                <pre id="logs">{stderr}</pre>
            </div>
        </>
    );
};

export default Form;

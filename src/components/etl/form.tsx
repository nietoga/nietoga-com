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

export const Form = () => {
    const { register, handleSubmit } = useForm();
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
            if (!isReady) {
                console.log('skipping');
                return;
            }

            const fr = new FileReader();
            fr.onload = async () => {
                const fileContents = String(fr.result);
                await writeFile('./input_file.csv', fileContents);
                console.log('wrote file');

                console.log('executing python');
                await runPython(data.code);

                // @ts-ignore
                const outputContents: string = await readFile(
                    './output_file.csv'
                );
                downloadFile('output_file.csv', outputContents);
            };

            fr.readAsText(data.input_file[0]);
        },
        [isReady, readFile, runPython, writeFile]
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
                    type="file"
                    accept="text/csv"
                    {...register('input_file', { required: true })}
                />
                <br />
                <label htmlFor="code">Code: </label>
                <textarea
                    {...register('code', { required: true })}
                    defaultValue={sampleCode}
                />
                <br />
                <input type="submit" value="Submit" />
            </form>

            <div>
                <h1>Logs</h1>
                <pre id="logs">{stdout}</pre>
                <h1>Error logs</h1>
                <pre id="logs">{stderr}</pre>
            </div>
            <div></div>
        </>
    );
};

export default Form;

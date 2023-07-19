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

const downloadFile = (filename: string, text: string) => {
    const element = document.createElement('a');
    element.setAttribute(
        'href',
        'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
    );
    element.setAttribute('download', filename);

    element.style.display = 'none';

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};

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

    /**
     * Cargar archivo
     * Ejecutar
     * Leer archivo
     * Enviar a browser
     */

    const onSubmit = useCallback(
        async (data: object) => {
            if (!isReady) {
                console.log('skipping');
                return;
            }

            const fr = new FileReader();
            fr.onload = async () => {
                const fileContents = fr.result;
                await writeFile('./input_file.csv', fileContents);
                console.log('wrote file');

                console.log('executing python');
                await runPython(data.code);

                readFile('./output_file.csv')?.then((data) =>
                    downloadFile('output_file.csv', data)
                );
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

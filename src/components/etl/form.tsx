import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { usePython } from 'react-py';

import { CopyToClipboard } from '@nietoga/nietoga-com/components/copyToClipboard';
import { downloadFile } from '@nietoga/nietoga-com/utils/downloadFile';
import { readFile as readFileContents } from '@nietoga/nietoga-com/utils/readFile';

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
    const { register, getValues, setValue, handleSubmit } = useForm<FormData>();
    const { query, route } = useRouter();

    const {
        writeFile,
        readFile,
        isReady,
        isRunning,
        runPython,
        stdout,
        stderr,
    } = usePython();

    useEffect(() => {
        if (!Array.isArray(query.code)) {
            const code = query.code ?? '';
            setValue('code', code);
        }
    }, [query.code, setValue]);

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

    const [generatedUrl, setGeneratedUrl] = useState<string>();

    const generateUrl = useCallback(() => {
        const data = getValues();
        const code = encodeURIComponent(data.code);
        setGeneratedUrl(`${route}?code=${code}`);
    }, [route, getValues]);

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

            <button type="button" onClick={generateUrl}>
                Create Share URL
            </button>

            {generatedUrl ? <CopyToClipboard text={generatedUrl} /> : null}

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

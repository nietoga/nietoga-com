export const readFile = (file: Blob): Promise<string> => {
    return new Promise((resolve) => {
        const fr = new FileReader();

        fr.onload = async () => {
            const fileContents = String(fr.result);
            resolve(fileContents);
        };

        fr.readAsText(file);
    });
};

interface Props {
    autoGenerate?: boolean,
    output?: string,
    children: any,
}

export const PyRepl = ({autoGenerate, output, children}: Props) => {
    return <>
        {/* @ts-ignore */}
        <py-repl auto-generate={autoGenerate || undefined} output={output}>
            {children}
            {/* @ts-ignore */}
        </py-repl>
    </>
}

export default PyRepl;

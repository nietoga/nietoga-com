interface Props {
    src?: string,
    output?: string,
    stderr?: string,
    children: any,
}

export const PyScript = ({src, output, stderr, children}: Props) => {
    return <>
        {/* @ts-ignore */}
        <py-script src={src} output={output} stderr={stderr}>
            {children}
            {/* @ts-ignore */}
        </py-script>
    </>
}

export default PyScript;

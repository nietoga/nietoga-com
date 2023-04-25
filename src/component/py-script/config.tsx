interface Props {
    config: object
}

export const PyConfig = ({config}: Props) => {
    return <>
        {/* @ts-ignore */}
        <py-config type="json">
            {JSON.stringify(config)}
            {/* @ts-ignore */}
        </py-config>
    </>
}

export default PyConfig;

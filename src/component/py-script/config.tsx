export const PyConfig = ({config}) => {
    return <>
        {/* @ts-ignore */}
        <py-config type="json">
            {JSON.stringify(config)}
            {/* @ts-ignore */}
        </py-config>
    </>
}

export default PyConfig;

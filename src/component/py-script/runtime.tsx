import Head from "next/head";
import Script from "next/script";

export const PyScriptRuntime = ({children}) => {
    return <>
        <Head>
            <link rel="stylesheet" href="https://pyscript.net/latest/pyscript.css"/>
        </Head>
        <Script src="https://pyscript.net/latest/pyscript.js"/>
        {children}
    </>
}

export default PyScriptRuntime;

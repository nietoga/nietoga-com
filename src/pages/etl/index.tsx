import { PythonProvider } from 'react-py';

import { ETLForm } from '@nietoga/nietoga-com/components/etlForm';
import { Layout } from '@nietoga/nietoga-com/components/layout';
import { Meta, Title } from '@nietoga/nietoga-com/components/page';

export const Index = () => {
    return (
        <Layout>
            <Title title="ETL" />
            <Meta
                name="description"
                content="Page for executing ETL operations using py-script"
            />
            <main>
                <PythonProvider packages={{ official: ['pandas'] }}>
                    <ETLForm />
                </PythonProvider>
            </main>
        </Layout>
    );
};

export default Index;

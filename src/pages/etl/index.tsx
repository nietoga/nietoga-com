import { Form } from '@nietoga/nietoga-com/components/etl';
import { Layout } from '@nietoga/nietoga-com/components/layout';
import { Meta, Title } from '@nietoga/nietoga-com/components/page';
import { PythonProvider } from 'react-py';

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
                    <Form />
                </PythonProvider>
            </main>
        </Layout>
    );
};

export default Index;

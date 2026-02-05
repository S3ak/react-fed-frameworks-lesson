import Card from '../../card/Card';

export default function ProductListPageSkeleton() {
    return (
        <div>
            <h1>Produktliste</h1>
            <p>(Side: {1})</p>
            <p>Søkefilter: </p>

            <section title="search section">
                <input type="text" disabled />
            </section>
            <ul>
                {[1, 2, 3].map((i) => (
                    <div key={i} >
                        <Card title="...loading">abc</Card>
                    </div>
                ))}
            </ul>
        </div>
    );
}

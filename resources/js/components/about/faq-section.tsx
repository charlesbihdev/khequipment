const faqs = [
    {
        question:
            'What financing options are available for purchasing heavy-duty equipment?',
        answer: 'We accept installment payments for select products, subject to terms and conditions. Contact our sales team to discuss available options.',
    },
    {
        question: 'Can you assist with equipment delivery and logistics?',
        answer: 'Yes, we provide equipment delivery and logistics services for selected locations. Fees may apply depending on the destination.',
    },
    {
        question:
            'How do I get in touch with your sales and support team for inquiries or assistance?',
        answer: 'You can contact our sales and support team by phone, email, WhatsApp, or by visiting our contact section for assistance.',
    },
];

export function FaqSection() {
    return (
        <section className="bg-background py-20 sm:py-28">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="text-2xl font-semibold text-muted-foreground">
                        F.A.Q
                    </p>
                    <h2 className="mt-2 text-5xl leading-tight font-extrabold sm:text-6xl">
                        Frequently Asked{' '}
                        <span className="text-brand-gold">Questions</span>
                    </h2>
                </div>

                <div className="mt-12 space-y-5">
                    {faqs.map((item) => (
                        <article
                            key={item.question}
                            className="rounded-md border border-border bg-card p-6 shadow-sm"
                        >
                            <h3 className="text-2xl font-bold">
                                {item.question}
                            </h3>
                            <p className="mt-3 text-lg leading-8 text-muted-foreground">
                                {item.answer}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

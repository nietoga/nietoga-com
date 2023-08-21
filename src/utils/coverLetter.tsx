interface Field {
    tag: string;
    label: string;
    name: string;
    value?: string;
}

export const parse = (text: string): Field[] => {
    const tags = text.match(/\[[\w\s]+]/g) ?? [];
    const fields = [];

    for (const tag of tags) {
        const label = tag.slice(1, -1).trim();

        fields.push({
            tag,
            label,
            name: label.toLowerCase().replaceAll(' ', '_'),
        });
    }

    return fields;
};

export const replace = (text: string, replacements: Field[]): string => {
    let result = text;

    for (const replacement of replacements) {
        result = result.replaceAll(
            replacement.tag,
            replacement.value ?? 'MISSING_VALUE'
        );
    }

    return result;
};

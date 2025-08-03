export const generateDarkColors = (): string => {
    const darkColors = [
        '#1f2937',
        '#374151',
        '#4b5563',
        '#1e40af',
        '#1d4ed8',
        '#2563eb',
        '#dc2626',
        '#b91c1c',
        '#991b1b',
        '#059669',
        '#047857',
        '#065f46',
        '#7c2d12',
        '#9a3412',
        '#ea580c',
        '#7c3aed',
        '#6d28d9',
        '#5b21b6',
        '#be185d',
        '#9d174d',
        '#831843',
        '#0f766e',
        '#0d9488',
        '#115e59',
        '#365314',
        '#4d7c0f',
        '#65a30d',
        '#facc15',
        '#eab308',
        '#ca8a04',
    ];

    const randomIndex = Math.floor(Math.random() * darkColors.length);
    return darkColors[randomIndex];
};
type FormPayload = Record<string, unknown>;

export function withMethodSpoof<T extends FormPayload>(
    data: T,
    action: string,
): T & { _method?: string } {
    const query = action.includes('?') ? action.split('?')[1] : '';
    const method = new URLSearchParams(query).get('_method');

    return method ? { ...data, _method: method.toLowerCase() } : data;
}

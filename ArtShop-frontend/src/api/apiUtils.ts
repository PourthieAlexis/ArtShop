//responsable de la vérification de la présence du token
export function AddHeader(token: string | null, contentType: string = 'application/json') {
    const headers: { [key: string]: string } = {
        'Content-Type': contentType,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return { headers };
}

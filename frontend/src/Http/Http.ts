export class Http {
    private static BASE_URL: string = "http://localhost:5000";

    static async post(data: any, token = "") {
        const headers = new Headers();
        headers.append("content-Type", "application/json");
        headers.append("token", token);
        const result = await fetch(`${Http.BASE_URL}/graphql`, { method: "POST", body: JSON.stringify(data), headers });
        return result.json();
    }
}

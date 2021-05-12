export class Http {
    private static BASE_URL: string = "https://demo-project-creatopy.herokuapp.com/graphql"

    static async post(data: any, token = "") {
        const headers = new Headers();
        headers.append("content-Type", "application/json");
        headers.append("token", token);
        const result = await fetch(`${Http.BASE_URL}`, { method: "POST", body: JSON.stringify(data), headers });
        return result.json();
    }
}

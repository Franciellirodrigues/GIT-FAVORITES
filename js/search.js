export class GithubSearch {
    static consultOrder(user) {
        const urlUser = `https://api.github.com/users/${user}`;
        return fetch(urlUser)
            .then((response) => response.json())
            .then(({ login, name, public_repos, followers }) => ({
                login,
                name,
                public_repos,
                followers,
            }));
    }
}
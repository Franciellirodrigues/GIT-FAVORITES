import { GithubSearch } from './search.js';
import { Screen } from './screen.js';

export class Data extends Screen {
    constructor(root) {
        super(root);
        this.registeredUsers;
    }

    async validateOrder(requestedUser) {
        try {
            if (!requestedUser) {
                throw new Error('Busca inválida! Por favor digite algo!');
            }

            const alreadyExists = this.registeredUsers.find(
                (user) =>
                    user.login.toLowerCase() == requestedUser.toLowerCase()
            );

            if (alreadyExists) {
                throw new Error('Usuário já cadastrado!');
            }

            const newUser = await GithubSearch.consultOrder(requestedUser);

            if (!newUser.login) {
                throw new Error('Usuário não encontrado!');
            }

            return this.addUser(newUser);
        } catch (erro) {
            alert(erro);
        }
    }

    addUser(newUser) {
        this.registeredUsers = [newUser, ...this.registeredUsers];

        this.saveUsers();
        return this.updateTable(this.registeredUsers);
    }

    saveUsers() {
        localStorage.setItem('@git-fav', JSON.stringify(this.registeredUsers));
    }

    loadUsers() {
        this.registeredUsers =
            JSON.parse(localStorage.getItem('@git-fav')) || [];
    }

    deleteUser(userToBeDeleted) {
        this.registeredUsers = this.registeredUsers.filter(
            (users) => users.login != userToBeDeleted
        );
        this.updateTable(this.registeredUsers);
        this.saveUsers();
    }
}
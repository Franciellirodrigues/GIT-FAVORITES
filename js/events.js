import { Data } from './data.js';

export class Events extends Data {
    constructor(root) {
        super(root);
        this.favoriteButton = root.querySelector('#search button');
        this.searchField = root.querySelector('#search input');

        this.loadUsers();
        this.updateTable(this.registeredUsers);
        this.addEventToRemove();
        this.attemptToAdd();
    }

    attemptToAdd() {
        this.favoriteButton.onclick = (e) => this.receiveOrder.call(this, e);
        this.searchField.onkeydown = (e) => this.addByEnterKey.call(this, e);
    }

    addByEnterKey(e) {
        if (e.key == 'Enter') {
            this.receiveOrder(e);
        }
    }

    async receiveOrder(e) {
        let userSearch;

        const theEventWasTriggeredByTheEnter = e.currentTarget.id;

        if (theEventWasTriggeredByTheEnter) {
            userSearch = e.currentTarget.value;
            e.currentTarget.value = '';
        } else {
            userSearch = e.currentTarget.parentNode.children[1].value;
            e.currentTarget.parentNode.children[1].value = '';
        }

        const response = await this.validateOrder(userSearch);

        if (response) {
            this.addEventToRemove();
        }
    }

    addEventToRemove() {
        const removeButtons = Array.from(
            this.root.querySelectorAll(
                'table tbody.filled-tbody button.remove-user'
            )
        );

        removeButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const reallyWantToDelete = confirm('Realmente deseja excluir?');

                if (reallyWantToDelete) {
                    const userOfThisButton = button.parentNode.parentNode
                        .querySelector('span')
                        .textContent.replace('/', '');

                    this.deleteUser(userOfThisButton);
                    this.addEventToRemove();
                }
            });
        });
    }
}
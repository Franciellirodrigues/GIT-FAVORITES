export class Screen {
    constructor(root) {
        this.root = root;
        this.tbody = root.querySelector('table tbody.filled-tbody');
    }

    trModel() {
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>
          <img
          src="https://github.com/maykbrito.png"
          alt="Foto de Mayk Brito"
          />
          <a href="https://github.com/maykbrito" target="_blank">
            <p>Mayk Brito</p>
            <span>/maykbrito</span>
          </a>
        </td>
        <td class="repositories">123</td>
        <td class="followers">1234</td>
        <td>
        <button class="remove-user">Remover</button>
        </td>
        `;

        tr.classList.add('user');
        return tr;
    }

    updateTable(registeredUsers) {
        const hasSavedUsers = registeredUsers.length;

        this.clearTable();

        if (!hasSavedUsers) {
            this.showEmptyTable();
        } else {
            this.showFilledTable();
            registeredUsers.forEach((user) => {
                const trTemplate = this.trModel();
                const newTr = this.changeContent(trTemplate, user);
                this.tbody.append(newTr);
            });
            return 'screen is showing users';
        }
    }

    clearTable() {
        const tbodyLines = Array.from(this.tbody.children);
        tbodyLines.forEach((tr) => tr.remove());
    }

    changeContent(tr, user) {
        tr.querySelector('img').src = `https://github.com/${user.login}.png`;
        tr.querySelector('img').alt = `Foto de ${user.name}`;
        tr.querySelector('a').href = `https://github.com/${user.login}`;
        tr.querySelector('a p').textContent = `${user.name}`;
        tr.querySelector('a span').textContent = `/${user.login}`;
        tr.querySelector(
            'td.repositories'
        ).textContent = `${user.public_repos}`;
        tr.querySelector('td.followers').textContent = `${user.followers}`;

        return tr;
    }

    showEmptyTable() {
        const emptyTable = this.root.querySelector('div.table-container');
        const emptyTbody = this.root.querySelector('table tbody.empty-tbody');
        const filledTbody = this.root.querySelector('table tbody.filled-tbody');

        emptyTable.classList.add('table-container-table-filled');
        emptyTbody.classList.remove('hidden');
        filledTbody.classList.add('hidden');
    }

    showFilledTable() {
        const emptyTable = this.root.querySelector('div.table-container');
        const emptyTbody = this.root.querySelector('table tbody.empty-tbody');
        const filledTbody = this.root.querySelector('table tbody.filled-tbody');

        emptyTable.classList.remove('table-container-table-filled');
        emptyTbody.classList.add('hidden');
        filledTbody.classList.remove('hidden');
    }
}
const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {

    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: '1',
                name: 'Anees',
                room: 'Node Course'
            },
            {
                id: '2',
                name: 'Abeer',
                room: 'Node Course'
            },
            {
                id: '3',
                name: 'Amber',
                room: 'React Course'
            },
            {
                id: '4',
                name: 'Humaira',
                room: 'React Course'
            }
        ];
    });

    it('should add new user', () => {
        let users = new Users();

        const user = {
            id: '123',
            name: 'Anees',
            room: 'The Office Fans'
        };

        const result = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should return list for node course', () => {
        const userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Anees', 'Abeer']);
    });

    it('should return list for react course', () => {
        const userList = users.getUserList('React Course');
        expect(userList).toEqual(['Amber', 'Humaira']);
    });

    it('should find a user', () => {

        const userId = users.users[1].id;

        const user = users.getUser(userId);

        expect(user).toEqual({ ...users.users[1] });
    });

    it('should not find a user ', () => {
        const user = users.getUser('12345');
        expect(user).toNotExist();
    });

    it('should remove a user', () => {
        const userId = users.users[2].id;

        const user = users.removeUser(userId);

        expect(user.id).toBe(userId);

        expect(users.users.length).toBe(3);
    });

    it('should not remove a user', () => {
        const userId = '99';

        const user = users.removeUser(userId);

        expect(user).toNotExist();

        expect(users.users.length).toBe(4);
    });
});
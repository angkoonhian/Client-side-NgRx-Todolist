export class Todos {
    constructor(public user: string, public name: string, public details: string, 
        public category: string, public completed: boolean, public image: ArrayBuffer | string) {}
}
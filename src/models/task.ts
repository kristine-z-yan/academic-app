class Task {
    text: string
    completed: boolean
    id: number

    constructor(todoText: string) {
        this.text = todoText;
        this.completed = false
        this.id = Math.floor(Math.random()*100);
    }
}

export default Task;
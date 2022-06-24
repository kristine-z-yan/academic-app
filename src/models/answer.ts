class Answer {
    id: number
    answer: string
    isCorrect: boolean

    constructor(id: number, answer: string, isCorrect: boolean) {
        this.id = id;
        this.answer = answer;
        this.isCorrect = isCorrect;
    }
}

export default Answer;
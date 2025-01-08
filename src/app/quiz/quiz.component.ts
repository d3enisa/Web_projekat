import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz',
  standalone: true,
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  imports: [CommonModule],
})
export class QuizComponent implements OnInit, OnDestroy {
  // Režim igre: 'quiz' ili 'snake'
  currentMode: string = 'quiz';

  // Kviz podaci
  questions = [
    {
      question: 'Ko je režirao film "Interstellar"?',
      answers: ['Christopher Nolan', 'Quentin Tarantino', 'Martin Scorsese'],
      correctAnswer: 'Christopher Nolan',
    },
    {
      question: 'Koji glumac igra glavnu ulogu u filmu "Iron Man"?',
      answers: ['Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo'],
      correctAnswer: 'Robert Downey Jr.',
    },
    {
      question: 'Koji je prvi film iz serijala "Harry Potter"?',
      answers: [
        'Harry Potter and the Chamber of Secrets',
        'Harry Potter and the Philosopher\'s Stone',
        'Harry Potter and the Prisoner of Azkaban',
      ],
      correctAnswer: 'Harry Potter and the Philosopher\'s Stone',
    },
  ];

  currentQuestionIndex: number = 0;
  score: number = 0;
  selectedAnswer: string | null = null;
  showResults: boolean = false;

  // Zmija podaci
  grid: number[] = Array(400).fill(0);
  snake: number[] = [21, 20];
  food: number = Math.floor(Math.random() * 400);
  direction: string = 'right';
  interval: any;
  gameOver: boolean = false;
  snakeScore: number = 0;

  private keydownListener: any;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {

    this.keydownListener = this.renderer.listen('window', 'keydown', (e) =>
      this.changeDirection(e)
    );
  }

  ngOnDestroy(): void {

    if (this.keydownListener) {
      this.keydownListener();
    }
  }

  // Funkcije za kviz
  checkAnswer(answer: string): void {
    this.selectedAnswer = answer;
    if (answer === this.questions[this.currentQuestionIndex].correctAnswer) {
      this.score++;
    }
  }

  nextQuestion(): void {
    this.selectedAnswer = null;
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.showResults = true;
    }
  }

  restartQuiz(): void {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.selectedAnswer = null;
    this.showResults = false;
  }


  switchToQuiz(): void {
    this.currentMode = 'quiz';
    clearInterval(this.interval);
  }

  startSnakeGame(): void {
    this.currentMode = 'snake';
    this.snake = [21, 20];
    this.direction = 'right';
    this.food = Math.floor(Math.random() * 400);
    this.snakeScore = 0;
    this.gameOver = false;
    this.interval = setInterval(() => this.moveSnake(), 200);
  }

  // Funkcije za zmiju
  moveSnake(): void {
    if (this.gameOver) {
      clearInterval(this.interval);
      return;
    }

    const head = this.snake[0];
    let newHead: number | undefined;

    switch (this.direction) {
      case 'right':
        newHead = head + 1;
        if (newHead % 20 === 0) this.endGame();
        break;
      case 'left':
        newHead = head - 1;
        if (head % 20 === 0) this.endGame();
        break;
      case 'up':
        newHead = head - 20;
        if (newHead < 0) this.endGame();
        break;
      case 'down':
        newHead = head + 20;
        if (newHead >= 400) this.endGame();
        break;
    }

    if (newHead === undefined || this.snake.includes(newHead)) {
      this.endGame();
      return;
    }

    this.snake.unshift(newHead);

    if (newHead === this.food) {
      this.snakeScore++;
      this.food = Math.floor(Math.random() * 400);
    } else {
      this.snake.pop();
    }
  }

  changeDirection(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        if (this.direction !== 'down') this.direction = 'up';
        break;
      case 'ArrowDown':
        if (this.direction !== 'up') this.direction = 'down';
        break;
      case 'ArrowLeft':
        if (this.direction !== 'right') this.direction = 'left';
        break;
      case 'ArrowRight':
        if (this.direction !== 'left') this.direction = 'right';
        break;
    }
  }

  endGame(): void {
    this.gameOver = true;
    clearInterval(this.interval);
  }
}

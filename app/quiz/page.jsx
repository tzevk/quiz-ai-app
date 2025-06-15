'use client'

import { useState, useEffect } from 'react'
import QuizTimer from '@/components/QuizTimer'
import QuizProgress from '@/components/QuizProgress'
import QuestionCard from '@/components/QuestionCard'
import NavigationButtons from '@/components/NavigationButtons'
import QuestionDots from '@/components/QuestionDots'
import '@/styles/quiz.css'

export default function QuizPage() {
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(60 * 60) // 60 minutes

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch('/api/questions')
      const data = await res.json()

      const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 50).map(q => ({
        ...q,
        options: shuffleArray([...q.options])
      }))
      setQuestions(shuffled)
    }

    fetchQuestions()
  }, [])

  useEffect(() => {
    if (timeLeft <= 0) handleSubmit()
    const interval = setInterval(() => setTimeLeft(t => t - 1), 1000)
    return () => clearInterval(interval)
  }, [timeLeft])

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5)

  const handleAnswer = (index, option) => {
    setAnswers(prev => ({ ...prev, [index]: option }))
  }

  const handleSubmit = () => {
    // Send results to backend
    console.log('Submitting:', answers)
  }

  return (
    <div className="quiz-container">
      <QuizTimer timeLeft={timeLeft} />
      <QuizProgress current={Object.keys(answers).length} total={50} />
      {questions.length > 0 && (
        <QuestionCard
          question={questions[currentIndex]}
          index={currentIndex}
          selected={answers[currentIndex]}
          onAnswer={handleAnswer}
        />
      )}
      <QuestionDots
        total={questions.length}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        answered={answers}
      />
      <NavigationButtons
        index={currentIndex}
        total={questions.length}
        onPrev={() => setCurrentIndex(i => i - 1)}
        onNext={() => setCurrentIndex(i => i + 1)}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
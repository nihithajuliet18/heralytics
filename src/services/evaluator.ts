import { CaseQuestion, QuestionResult, Submission } from '../types';

export function normalizeText(val: string | number): string {
  if (typeof val === 'number') return val.toString();
  return val
    .trim()
    .toLowerCase()
    .replace(/[,\s_#\-]/g, '');
}

export function evaluateQuestion(
  question: CaseQuestion,
  userAnswer: string | number
): { isCorrect: boolean; pointsAwarded: number; feedback: string } {
  if (userAnswer === undefined || userAnswer === null || userAnswer === '') {
    return {
      isCorrect: false,
      pointsAwarded: 0,
      feedback: 'No answer submitted.'
    };
  }

  if (question.type === 'number') {
    const parsedUser = typeof userAnswer === 'number' ? userAnswer : parseFloat(userAnswer.toString().replace(/,/g, ''));
    const parsedTarget = typeof question.correctAnswer === 'number' ? question.correctAnswer : parseFloat(question.correctAnswer.toString().replace(/,/g, ''));

    if (!isNaN(parsedUser) && !isNaN(parsedTarget)) {
      const isClose = Math.abs(parsedUser - parsedTarget) < 0.01;
      if (isClose) {
        return {
          isCorrect: true,
          pointsAwarded: question.points,
          feedback: 'Verified through numerical evidence analysis.'
        };
      }
    }
  }

  const normUser = normalizeText(userAnswer);
  const normTarget = normalizeText(question.correctAnswer);

  if (normUser === normTarget) {
    return {
      isCorrect: true,
      pointsAwarded: question.points,
      feedback: 'Correct finding corroborated by forensic records.'
    };
  }

  if (question.acceptedAlternates && question.acceptedAlternates.length > 0) {
    for (const alt of question.acceptedAlternates) {
      if (normUser === normalizeText(alt)) {
        return {
          isCorrect: true,
          pointsAwarded: question.points,
          feedback: 'Correct finding corroborated by forensic records.'
        };
      }
    }
  }

  return {
    isCorrect: false,
    pointsAwarded: 0,
    feedback: 'Finding contradicts available dataset records.'
  };
}

export function gradeCaseSubmission(
  participantId: string,
  caseId: string,
  questions: CaseQuestion[],
  answers: Record<string, string | number>,
  attemptNumber: number,
  usedHints: string[],
  passingPercentage: number = 70,
  hintPenalty: number = 3
): Submission {
  let scoreEarned = 0;
  let maxScore = 0;
  const questionResults: QuestionResult[] = [];

  for (const q of questions) {
    maxScore += q.points;
    const ans = answers[q.id];
    const res = evaluateQuestion(q, ans);

    let finalPoints = res.pointsAwarded;
    // Apply hint penalty if hint was accessed
    if (finalPoints > 0 && usedHints.includes(q.id)) {
      finalPoints = Math.max(0, finalPoints - hintPenalty);
    }

    scoreEarned += finalPoints;

    questionResults.push({
      questionId: q.id,
      userAnswer: ans ?? '',
      isCorrect: res.isCorrect,
      pointsAwarded: finalPoints,
      feedback: res.feedback,
      correctAnswer: q.type === 'multiple_choice' ? q.correctAnswer : undefined
    });
  }

  const percentage = maxScore > 0 ? (scoreEarned / maxScore) * 100 : 0;
  const passed = percentage >= passingPercentage;

  return {
    id: `sub-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    participantId,
    caseId,
    timestamp: Date.now(),
    attemptNumber,
    answers,
    scoreEarned,
    maxScore,
    passed,
    questionResults
  };
}

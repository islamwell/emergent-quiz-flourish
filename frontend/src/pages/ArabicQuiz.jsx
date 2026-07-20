import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  RotateCcw,
  ChevronLeft,
  CheckCircle,
  XCircle,
  Play,
  Pause,
} from "lucide-react";
import {
  getSessionQuestions,
  DIFFICULTIES,
  TYPE_LABELS,
} from "../data/quizData";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const PAIR_STYLES = [
  { bg: "bg-emerald-50", border: "border-emerald-400", text: "text-emerald-800" },
  { bg: "bg-blue-50", border: "border-blue-400", text: "text-blue-800" },
  { bg: "bg-violet-50", border: "border-violet-400", text: "text-violet-800" },
  { bg: "bg-amber-50", border: "border-amber-400", text: "text-amber-800" },
];

// ─── Type Badge ───────────────────────────────────────────────────────────────

function TypeBadge({ type }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-semibold uppercase tracking-widest">
      {TYPE_LABELS[type]}
    </span>
  );
}

// ─── Feedback Box ─────────────────────────────────────────────────────────────

function FeedbackBox({
  correct,
  explanation,
  onNext,
  isLast,
  timeLeft,
  isPaused,
  onPauseToggle,
}) {
  const progressPercent = ((4000 - timeLeft) / 4000) * 100;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-5 border-2 space-y-4 transition-all ${
        correct
          ? "bg-emerald-50 border-emerald-300 dark:bg-emerald-950/20 dark:border-emerald-900/40"
          : "bg-red-50 border-red-300 dark:bg-red-950/20 dark:border-red-900/40"
      }`}
    >
      <div className="flex items-start gap-3">
        {correct ? (
          <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        ) : (
          <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
        )}
        <div>
          <p
            className={`font-semibold text-sm ${
              correct ? "text-emerald-800 dark:text-emerald-300" : "text-red-800 dark:text-red-300"
            }`}
          >
            {correct ? "Correct!" : "Not quite!"}
          </p>
          <p className="text-sm text-foreground/70 mt-1 leading-relaxed">
            {explanation}
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 relative z-10">
        <button
          onClick={onPauseToggle}
          className="h-11 px-4 rounded-xl border border-border bg-background text-foreground hover:bg-secondary text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
        >
          {isPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
          {isPaused ? "Resume" : "Pause"}
        </button>
        <button
          onClick={onNext}
          className="flex-1 h-11 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
        >
          {isLast
            ? "See Results 🏆"
            : isPaused
            ? "Next Question"
            : `Next (Auto in ${Math.ceil(timeLeft / 1000)}s)`}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Auto-advance progress line (increasing in length) */}
      {!isPaused && !isLast && (
        <div
          className={`absolute bottom-0 left-0 h-1 transition-all ease-linear ${
            correct ? "bg-emerald-500" : "bg-red-500"
          }`}
          style={{ width: `${progressPercent}%`, transitionDuration: "50ms" }}
        />
      )}
    </div>
  );
}

// ─── Question: True / False ───────────────────────────────────────────────────

function TrueFalseQ({ question, onAnswer, answered, chosenOption }) {
  const [chosen, setChosen] = useState(null);

  useEffect(() => {
    if (!answered) setChosen(null);
  }, [answered]);

  const pick = (val) => {
    if (answered) return;
    setChosen(val);
    onAnswer(val === question.answer, val);
  };

  const currentChoice = answered ? chosenOption : chosen;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <p className="font-arabic text-5xl sm:text-6xl text-primary leading-loose" dir="rtl">
          {question.arabic}
        </p>
        <p className="text-base text-foreground/80 leading-relaxed max-w-md mx-auto">
          {question.statement}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
        {[true, false].map((val) => {
          let cls =
            "h-16 text-base font-bold rounded-2xl border-2 transition-all duration-200 ";
          if (answered) {
            if (val === question.answer)
              cls += "bg-emerald-500 border-emerald-500 text-white";
            else if (val === currentChoice)
              cls += "bg-red-500 border-red-500 text-white";
            else
              cls += "opacity-30 bg-secondary border-border text-muted-foreground";
          } else {
            cls +=
              "bg-secondary hover:bg-primary hover:text-primary-foreground hover:border-primary border-border text-foreground cursor-pointer";
          }
          return (
            <button
              key={String(val)}
              className={cls}
              onClick={() => pick(val)}
              disabled={answered}
            >
              {val ? "TRUE  ✓" : "FALSE  ✗"}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Question: Multiple Choice ────────────────────────────────────────────────

function MultipleChoiceQ({ question, onAnswer, answered, chosenOption }) {
  const [chosen, setChosen] = useState(null);

  useEffect(() => {
    if (!answered) setChosen(null);
  }, [answered]);

  const pick = (i) => {
    if (answered) return;
    setChosen(i);
    onAnswer(i === question.answer, i);
  };

  const currentChoice = answered ? chosenOption : chosen;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <p className="font-arabic text-5xl sm:text-6xl text-primary leading-loose" dir="rtl">
          {question.arabic}
        </p>
        <p className="text-sm text-muted-foreground">{question.question}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.options.map((opt, i) => {
          let cls =
            "p-4 rounded-2xl border-2 text-left text-sm font-medium transition-all duration-200 ";
          if (answered) {
            if (i === question.answer)
              cls += "bg-emerald-50 border-emerald-400 text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-900";
            else if (i === currentChoice)
              cls += "bg-red-50 border-red-400 text-red-800 dark:bg-red-950/20 dark:border-red-900";
            else
              cls += "opacity-30 bg-secondary border-border text-muted-foreground";
          } else {
            cls +=
              "bg-secondary hover:bg-primary/10 hover:border-primary border-border text-foreground cursor-pointer";
          }
          return (
            <button
              key={i}
              className={cls}
              onClick={() => pick(i)}
              disabled={answered}
            >
              <span className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-background/50 text-xs font-bold">
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Question: Synonyms / Antonyms ───────────────────────────────────────────

function SynAntQ({ question, onAnswer, answered, chosenOption }) {
  const [chosen, setChosen] = useState(null);

  useEffect(() => {
    if (!answered) setChosen(null);
  }, [answered]);

  const pick = (i) => {
    if (answered) return;
    setChosen(i);
    onAnswer(i === question.answer, i);
  };

  const currentChoice = answered ? chosenOption : chosen;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-1">
        <p className="font-arabic text-5xl sm:text-6xl text-primary leading-loose" dir="rtl">
          {question.arabic}
        </p>
        <p className="text-sm text-muted-foreground italic">
          &ldquo;{question.arabicMeaning}&rdquo;
        </p>
        <p className="text-base text-foreground/80 mt-2">{question.question}</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {question.options.map((opt, i) => {
          let cls =
            "p-4 rounded-2xl border-2 transition-all duration-200 text-center ";
          if (answered) {
            if (i === question.answer)
              cls += "bg-emerald-50 border-emerald-400 text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-900";
            else if (i === currentChoice)
              cls += "bg-red-50 border-red-400 text-red-800 dark:bg-red-950/20 dark:border-red-900";
            else
              cls += "opacity-30 bg-secondary border-border text-muted-foreground";
          } else {
            cls +=
              "bg-secondary hover:bg-primary/10 hover:border-primary border-border text-foreground cursor-pointer";
          }
          return (
            <button
              key={i}
              className={cls}
              onClick={() => pick(i)}
              disabled={answered}
            >
              <p className="font-arabic text-2xl text-primary" dir="rtl">
                {opt}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {question.optionMeanings[i]}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Question: Fill in the Blank ─────────────────────────────────────────────

function FillBlankQ({ question, onAnswer, answered, chosenOption }) {
  const [chosen, setChosen] = useState(null);

  useEffect(() => {
    if (!answered) setChosen(null);
  }, [answered]);

  const pick = (i) => {
    if (answered) return;
    setChosen(i);
    onAnswer(i === question.answer, i);
  };

  const currentChoice = answered ? chosenOption : chosen;

  return (
    <div className="space-y-7">
      <div className="rounded-2xl bg-secondary/80 border border-border p-6 text-center space-y-3">
        <p
          className="font-arabic text-2xl sm:text-3xl text-foreground leading-loose"
          dir="rtl"
        >
          {question.sentence}
        </p>
        <p className="text-sm text-muted-foreground italic">{question.translation}</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {question.options.map((opt, i) => {
          let cls =
            "p-4 rounded-2xl border-2 transition-all duration-200 text-center ";
          if (answered) {
            if (i === question.answer)
              cls += "bg-emerald-50 border-emerald-400 text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-900";
            else if (i === currentChoice)
              cls += "bg-red-50 border-red-400 text-red-800 dark:bg-red-950/20 dark:border-red-900";
            else
              cls += "opacity-30 bg-secondary border-border text-muted-foreground";
          } else {
            cls +=
              "bg-secondary hover:bg-primary/10 hover:border-primary border-border text-foreground cursor-pointer";
          }
          return (
            <button
              key={i}
              className={cls}
              onClick={() => pick(i)}
              disabled={answered}
            >
              <p className="font-arabic text-2xl text-primary" dir="rtl">
                {opt}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {question.optionMeanings[i]}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Question: Word Matching ──────────────────────────────────────────────────

function MatchingQ({ question, onAnswer, answered }) {
  const [rightItems] = useState(() =>
    shuffleArray(
      question.pairs.map((p, i) => ({ ...p, originalIndex: i }))
    )
  );
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matched, setMatched] = useState([]);
  const [shake, setShake] = useState(false);
  const [strikes, setStrikes] = useState(0);

  const matchedLeft = matched.map((m) => m.leftIndex);
  const matchedRight = matched.map((m) => m.rightIndex);

  const handleLeft = (i) => {
    if (answered || matchedLeft.includes(i)) return;
    setSelectedLeft(i === selectedLeft ? null : i);
  };

  const handleRight = (item, ri) => {
    if (answered || matchedRight.includes(ri) || selectedLeft === null) return;
    if (item.originalIndex === selectedLeft) {
      const next = [
        ...matched,
        { leftIndex: selectedLeft, rightIndex: ri, matchIdx: matched.length },
      ];
      setMatched(next);
      setSelectedLeft(null);
      if (next.length === question.pairs.length) {
        onAnswer(true, true);
      }
    } else {
      setShake(true);
      setStrikes((s) => s + 1);
      setTimeout(() => {
        setShake(false);
        setSelectedLeft(null);
      }, 600);
    }
  };

  const revealAndSkip = () => {
    onAnswer(false, false);
  };

  return (
    <div className="space-y-5">
      <p className="text-sm text-foreground/80 text-center">{question.question}</p>
      {shake && (
        <p className="text-center text-red-500 text-xs font-medium">
          Incorrect pair — try again!
        </p>
      )}
      <div className="grid grid-cols-2 gap-3">
        {/* Left: Arabic */}
        <div className="space-y-2">
          <p className="text-center text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
            Arabic
          </p>
          {question.pairs.map((pair, li) => {
            const entry = matched.find((m) => m.leftIndex === li);
            const ps = entry ? PAIR_STYLES[entry.matchIdx] : null;
            let cls =
              "w-full p-3 rounded-xl border-2 transition-all duration-200 text-center ";
            if (entry) {
              cls += `${ps.bg} ${ps.border} ${ps.text} opacity-70`;
            } else if (selectedLeft === li) {
              cls += "bg-primary/15 border-primary text-primary";
            } else {
              cls +=
                "bg-secondary hover:bg-primary/10 hover:border-primary border-border cursor-pointer text-foreground";
            }
            return (
              <button
                key={li}
                className={cls}
                onClick={() => handleLeft(li)}
                disabled={!!entry || answered}
              >
                <span className="font-arabic text-xl" dir="rtl">
                  {pair.arabic}
                </span>
              </button>
            );
          })}
        </div>
        {/* Right: English */}
        <div className="space-y-2">
          <p className="text-center text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
            English
          </p>
          {rightItems.map((item, ri) => {
            const entry = matched.find((m) => m.rightIndex === ri);
            const ps = entry ? PAIR_STYLES[entry.matchIdx] : null;
            let cls =
              "w-full p-3 rounded-xl border-2 transition-all duration-200 text-center text-sm font-medium ";
            if (entry) {
              cls += `${ps.bg} ${ps.border} ${ps.text} opacity-70`;
            } else if (selectedLeft !== null) {
              cls +=
                "bg-secondary hover:bg-primary/10 hover:border-primary border-border cursor-pointer text-foreground";
            } else {
              cls += "bg-secondary border-border text-muted-foreground opacity-60";
            }
            return (
              <button
                key={ri}
                className={cls}
                onClick={() => handleRight(item, ri)}
                disabled={!!entry || answered}
              >
                {item.english}
              </button>
            );
          })}
        </div>
      </div>
      {strikes >= 3 && !answered && matched.length < question.pairs.length && (
        <button
          onClick={revealAndSkip}
          className="w-full py-2.5 rounded-xl border border-border text-muted-foreground text-xs hover:bg-secondary transition-colors"
        >
          I&apos;m stuck — skip this question
        </button>
      )}
    </div>
  );
}

// ─── Question: Odd One Out ────────────────────────────────────────────────────

function OddOneOutQ({ question, onAnswer, answered, chosenOption }) {
  const [chosen, setChosen] = useState(null);

  useEffect(() => {
    if (!answered) setChosen(null);
  }, [answered]);

  const pick = (i) => {
    if (answered) return;
    setChosen(i);
    onAnswer(i === question.answer, i);
  };

  const currentChoice = answered ? chosenOption : chosen;

  return (
    <div className="space-y-7">
      <p className="text-base text-foreground/80 text-center">{question.question}</p>
      <div className="grid grid-cols-2 gap-4">
        {question.options.map((opt, i) => {
          let cls = "p-5 rounded-2xl border-2 transition-all duration-200 text-center ";
          if (answered) {
            if (i === question.answer)
              cls += "bg-emerald-50 border-emerald-400 text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-900";
            else if (i === currentChoice)
              cls += "bg-red-50 border-red-400 text-red-800 dark:bg-red-950/20 dark:border-red-900";
            else
              cls += "opacity-30 bg-secondary border-border text-muted-foreground";
          } else {
            cls +=
              "bg-secondary hover:bg-primary/10 hover:border-primary border-border text-foreground cursor-pointer hover:-translate-y-0.5";
          }
          return (
            <button
              key={i}
              className={cls}
              onClick={() => pick(i)}
              disabled={answered}
            >
              <p className="font-arabic text-3xl text-primary mb-1" dir="rtl">
                {opt}
              </p>
              <p className="text-xs text-muted-foreground">
                {question.optionMeanings[i]}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Question: Emoji Clue ─────────────────────────────────────────────────────

function EmojiClueQ({ question, onAnswer, answered, chosenOption }) {
  const [chosen, setChosen] = useState(null);

  useEffect(() => {
    if (!answered) setChosen(null);
  }, [answered]);

  const pick = (i) => {
    if (answered) return;
    setChosen(i);
    onAnswer(i === question.answer, i);
  };

  const currentChoice = answered ? chosenOption : chosen;

  return (
    <div className="space-y-7">
      <div className="flex justify-center gap-5">
        {question.emojis.map((em, i) => (
          <span
            key={i}
            className="text-5xl sm:text-6xl select-none drop-shadow-sm"
          >
            {em}
          </span>
        ))}
      </div>
      <p className="text-base text-foreground/80 text-center">{question.question}</p>
      <div className="grid grid-cols-2 gap-3">
        {question.options.map((opt, i) => {
          let cls =
            "p-4 rounded-2xl border-2 transition-all duration-200 text-center ";
          if (answered) {
            if (i === question.answer)
              cls += "bg-emerald-50 border-emerald-400 text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-900";
            else if (i === currentChoice)
              cls += "bg-red-50 border-red-400 text-red-800 dark:bg-red-950/20 dark:border-red-900";
            else
              cls += "opacity-30 bg-secondary border-border text-muted-foreground";
          } else {
            cls +=
              "bg-secondary hover:bg-primary/10 hover:border-primary border-border text-foreground cursor-pointer";
          }
          return (
            <button
              key={i}
              className={cls}
              onClick={() => pick(i)}
              disabled={answered}
            >
              <p className="font-arabic text-2xl text-primary" dir="rtl">
                {opt}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {question.optionMeanings[i]}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Question: Category Sort ──────────────────────────────────────────────────

function CategorySortQ({ question, onAnswer, answered }) {
  const [assignments, setAssignments] = useState({});
  const [selected, setSelected] = useState(null);

  const allAssigned =
    Object.keys(assignments).length === question.words.length;

  const handleWord = (wi) => {
    if (answered) return;
    setSelected(selected === wi ? null : wi);
  };

  const handleCategory = (ci) => {
    if (answered || selected === null) return;
    setAssignments((prev) => ({ ...prev, [selected]: ci }));
    setSelected(null);
  };

  const checkAnswers = () => {
    const correct = question.words.every((w, i) => assignments[i] === w.category);
    onAnswer(correct, correct);
  };

  return (
    <div className="space-y-5">
      <p className="text-sm text-foreground/80 text-center">{question.question}</p>

      {/* Word pool */}
      <div className="rounded-xl border-2 border-dashed border-border/60 p-3 min-h-16">
        <p className="text-[10px] text-center text-muted-foreground mb-2 uppercase tracking-widest">
          Tap word → tap category below
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {question.words.map((w, wi) => {
            if (assignments[wi] !== undefined) return null;
            const isSel = selected === wi;
            return (
              <button
                key={wi}
                onClick={() => handleWord(wi)}
                disabled={answered}
                className={`px-3 py-2 rounded-xl border-2 transition-all duration-200 ${
                  isSel
                    ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                    : "bg-secondary border-border hover:border-primary text-foreground"
                }`}
              >
                <span className="font-arabic text-lg block" dir="rtl">
                  {w.arabic}
                </span>
                <span className="text-[10px] text-muted-foreground">{w.english}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category buckets */}
      <div className="grid grid-cols-2 gap-3">
        {question.categories.map((cat, ci) => {
          const wordsHere = question.words.filter(
            (_, i) => assignments[i] === ci
          );
          let bucketCls =
            "rounded-xl border-2 p-3 min-h-20 transition-all duration-200 ";
          if (!answered && selected !== null) {
            bucketCls +=
              "border-primary/50 bg-primary/5 cursor-pointer hover:bg-primary/10";
          } else {
            bucketCls += "border-border bg-secondary/40";
          }
          return (
            <div
              key={ci}
              className={bucketCls}
              onClick={() => handleCategory(ci)}
            >
              <p
                className="font-arabic text-xs font-semibold text-primary text-center mb-2"
                dir="rtl"
              >
                {cat}
              </p>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {wordsHere.map((w) => {
                  const wi = question.words.indexOf(w);
                  const isCorrect = w.category === ci;
                  let wCls = "px-2 py-1 rounded-lg text-xs font-medium ";
                  if (answered) {
                    wCls += isCorrect
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : "bg-red-100 text-red-800 border border-red-300";
                  } else {
                    wCls += "bg-background border border-border text-foreground";
                  }
                  return (
                    <span key={wi} className={wCls}>
                      <span className="font-arabic" dir="rtl">
                        {w.arabic}
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {allAssigned && !answered && (
        <button
          onClick={checkAnswers}
          className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
        >
          Check My Answers →
        </button>
      )}
    </div>
  );
}

// ─── Question Renderer ────────────────────────────────────────────────────────

function QuestionRenderer({ question, onAnswer, answered, chosenOption }) {
  switch (question.type) {
    case "true-false":
      return (
        <TrueFalseQ
          question={question}
          onAnswer={onAnswer}
          answered={answered}
          chosenOption={chosenOption}
        />
      );
    case "multiple-choice":
      return (
        <MultipleChoiceQ
          question={question}
          onAnswer={onAnswer}
          answered={answered}
          chosenOption={chosenOption}
        />
      );
    case "synonyms":
    case "antonyms":
      return (
        <SynAntQ
          question={question}
          onAnswer={onAnswer}
          answered={answered}
          chosenOption={chosenOption}
        />
      );
    case "fill-blank":
      return (
        <FillBlankQ
          question={question}
          onAnswer={onAnswer}
          answered={answered}
          chosenOption={chosenOption}
        />
      );
    case "matching":
      return (
        <MatchingQ
          question={question}
          onAnswer={onAnswer}
          answered={answered}
        />
      );
    case "odd-one-out":
      return (
        <OddOneOutQ
          question={question}
          onAnswer={onAnswer}
          answered={answered}
          chosenOption={chosenOption}
        />
      );
    case "emoji-clue":
      return (
        <EmojiClueQ
          question={question}
          onAnswer={onAnswer}
          answered={answered}
          chosenOption={chosenOption}
        />
      );
    case "category-sort":
      return (
        <CategorySortQ
          question={question}
          onAnswer={onAnswer}
          answered={answered}
        />
      );
    default:
      return null;
  }
}

// ─── Quiz Landing ─────────────────────────────────────────────────────────────

function QuizLanding({ onStart }) {
  const [selected, setSelected] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const items = JSON.parse(localStorage.getItem("nq_quiz_history") || "[]");
      setHistory(items);
    } catch {}
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("nq_quiz_history");
    setHistory([]);
  };

  const types = [
    "True / False",
    "Multiple Choice",
    "Synonyms",
    "Antonyms",
    "Fill in the Blank",
    "Word Matching",
    "Odd One Out",
    "Emoji Clue",
    "Category Sort",
  ];

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center py-16 px-5 bg-background">
      <div className="max-w-2xl w-full mx-auto">
        {/* Hero */}
        <div className="text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Arabic Language Quiz
          </span>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-semibold text-foreground leading-tight">
            Test Your Arabic <span className="text-primary">Knowledge</span>
          </h1>
          <p
            className="mt-3 font-arabic text-3xl text-primary/80 leading-loose"
            dir="rtl"
          >
            اِخْتَبِرْ نَفْسَكَ
          </p>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto text-sm">
            9 unique question types · 9 questions per session · Choose your level
          </p>
          {/* Type chips */}
          <div className="mt-5 flex flex-wrap gap-2 justify-center">
            {types.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full bg-secondary text-xs text-muted-foreground border border-border"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Difficulty cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {DIFFICULTIES.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelected(d.id)}
              className={`rounded-2xl border-2 p-6 text-left transition-all duration-200 ${
                selected === d.id
                  ? "border-primary bg-primary/10 shadow-lg -translate-y-1"
                  : "border-border bg-secondary/50 hover:border-primary/40 hover:bg-secondary"
              }`}
            >
              <span className="text-3xl">{d.icon}</span>
              <h3 className="font-display text-xl font-semibold text-foreground mt-3">
                {d.label}
              </h3>
              <p
                className="font-arabic text-base text-muted-foreground mt-0.5"
                dir="rtl"
              >
                {d.labelAr}
              </p>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                {d.description}
              </p>
            </button>
          ))}
        </div>

        {/* Start button */}
        <button
          onClick={() => selected && onStart(selected)}
          disabled={!selected}
          className={`w-full h-14 rounded-2xl font-semibold text-base transition-all duration-200 ${
            selected
              ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              : "bg-secondary text-muted-foreground cursor-not-allowed border border-border"
          }`}
        >
          {selected
            ? `Start ${
                DIFFICULTIES.find((d) => d.id === selected)?.label
              } Quiz →`
            : "Select a difficulty to begin"}
        </button>

        {/* History section */}
        {history.length > 0 && (
          <div className="mt-12 rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg text-foreground">Your Quiz History</h3>
              <button
                onClick={clearHistory}
                className="text-xs font-semibold text-muted-foreground hover:text-destructive transition-colors"
              >
                Clear History
              </button>
            </div>
            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {history.map((h, i) => {
                const grade =
                  h.pct >= 89 ? "A" : h.pct >= 78 ? "B" : h.pct >= 67 ? "C" : h.pct >= 56 ? "D" : "F";
                const badgeColor =
                  h.pct >= 78
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                    : h.pct >= 56
                    ? "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                    : "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400";
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-secondary/30 border border-border/50 text-sm"
                  >
                    <div>
                      <p className="font-semibold text-foreground capitalize">{h.difficulty} level</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {new Date(h.date).toLocaleDateString(undefined, { dateStyle: "medium" })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-foreground">
                        {h.score} / {h.total} ({h.pct}%)
                      </span>
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold ${badgeColor}`}
                      >
                        {grade}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Quiz Results ─────────────────────────────────────────────────────────────

function QuizResults({ score, total, results, difficulty, onRestart, onChangeDifficulty }) {
  const pct = Math.round((score / total) * 100);
  const grade =
    pct >= 89 ? "A" : pct >= 78 ? "B" : pct >= 67 ? "C" : pct >= 56 ? "D" : "F";
  const gradeColor =
    pct >= 78
      ? "text-emerald-600 dark:text-emerald-400"
      : pct >= 56
      ? "text-amber-600 dark:text-amber-400"
      : "text-red-600 dark:text-red-400";
  const diffLabel =
    DIFFICULTIES.find((d) => d.id === difficulty)?.label || difficulty;

  const msg =
    pct === 100
      ? "Flawless! You are a true scholar of Arabic. 🌟"
      : pct >= 78
      ? "Excellent work! Your Arabic vocabulary is impressive. 📚"
      : pct >= 56
      ? "Good effort! Keep studying and you will master it soon. 💪"
      : "Don't be discouraged — every scholar started as a beginner. 🌱";

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center py-16 px-5 bg-background">
      <div className="max-w-md w-full mx-auto space-y-8">
        {/* Grade display */}
        <div className="text-center">
          <div className={`font-display text-9xl font-bold ${gradeColor}`}>
            {grade}
          </div>
          <div className="mt-1 text-5xl font-semibold text-foreground">
            {score}{" "}
            <span className="text-muted-foreground text-2xl">/ {total}</span>
          </div>
          <div className="mt-1 text-muted-foreground text-sm">
            {pct}% correct · {diffLabel} level
          </div>
          <p className="mt-4 text-base text-foreground/80 max-w-xs mx-auto">
            {msg}
          </p>
        </div>

        {/* Breakdown */}
        <div className="rounded-2xl border border-border bg-secondary/40 p-5 space-y-2">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-3">
            Question Breakdown
          </p>
          {results.map((r, i) => (
            <div key={i} className="flex items-center gap-3">
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  r.correct
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                    : "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300"
                }`}
              >
                {r.correct ? "✓" : "✗"}
              </span>
              <span className="text-sm text-foreground/80 flex-1">
                {TYPE_LABELS[r.type]}
              </span>
              <span
                className={`text-xs font-medium ${
                  r.correct ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"
                }`}
              >
                {r.correct ? "Correct" : "Incorrect"}
              </span>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onRestart}
            className="h-12 rounded-2xl border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <RotateCcw className="h-4 w-4" /> Try Again
          </button>
          <button
            onClick={onChangeDifficulty}
            className="h-12 rounded-2xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors text-sm"
          >
            Change Level
          </button>
        </div>

        {/* WhatsApp Share */}
        <a
          href={`https://wa.me/?text=${encodeURIComponent(
            `I scored ${score}/${total} (Grade ${grade}) on the NurulQuran Arabic Language Quiz! 🌙⭐\nCan you beat me? Try it at ${window.location.origin}/quiz`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full h-11 rounded-2xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#25D366" }}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white shrink-0">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
          </svg>
          Share on WhatsApp
        </a>
      </div>
    </div>
  );
}

// ─── Main Quiz Page ───────────────────────────────────────────────────────────

const ArabicQuiz = () => {
  const [phase, setPhase] = useState("landing"); // landing | quiz | results
  const [difficulty, setDifficulty] = useState(null);
  const [sessionQs, setSessionQs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(null);
  const [chosenOption, setChosenOption] = useState(null);
  const [results, setResults] = useState([]);

  // Auto-advance states
  const [timeLeft, setTimeLeft] = useState(4000);
  const [isPaused, setIsPaused] = useState(false);

  const handleStart = (diff) => {
    const qs = getSessionQuestions(diff);
    setDifficulty(diff);
    setSessionQs(qs);
    setCurrentIndex(0);
    setAnswered(false);
    setLastCorrect(null);
    setChosenOption(null);
    setResults([]);
    setPhase("quiz");
  };

  const handleAnswer = (correct, rawAnswer) => {
    const q = sessionQs[currentIndex];
    setLastCorrect(correct);
    setChosenOption(rawAnswer);
    setAnswered(true);
    setResults((prev) => [...prev, { type: q.type, correct }]);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= sessionQs.length) {
      // Save current attempt to history in localStorage
      const finalResults = [...results];
      const score = finalResults.filter((r) => r.correct).length;
      const newAttempt = {
        date: new Date().toISOString(),
        difficulty,
        score,
        total: sessionQs.length,
        pct: Math.round((score / sessionQs.length) * 100),
      };
      try {
        const prev = JSON.parse(localStorage.getItem("nq_quiz_history") || "[]");
        localStorage.setItem("nq_quiz_history", JSON.stringify([newAttempt, ...prev].slice(0, 50)));
      } catch (e) {
        console.error("Failed to save history:", e);
      }
      setPhase("results");
    } else {
      setCurrentIndex((i) => i + 1);
      setAnswered(false);
      setLastCorrect(null);
      setChosenOption(null);
      setTimeLeft(4000);
      setIsPaused(false);
    }
  };

  // Auto-advance Timer logic
  useEffect(() => {
    if (!answered || isPaused || phase !== "quiz") return;

    const interval = 50; // tick every 50ms for smooth progress bar
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= interval) {
          clearInterval(timer);
          handleNext();
          return 4000;
        }
        return prev - interval;
      });
    }, interval);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answered, isPaused, currentIndex, phase, results]);

  const score = results.filter((r) => r.correct).length;
  const currentQ = sessionQs[currentIndex];
  const progress = sessionQs.length
    ? ((currentIndex + (answered ? 1 : 0)) / sessionQs.length) * 100
    : 0;

  if (phase === "landing") {
    return <QuizLanding onStart={handleStart} />;
  }

  if (phase === "results") {
    return (
      <QuizResults
        score={score}
        total={sessionQs.length}
        results={results}
        difficulty={difficulty}
        onRestart={() => handleStart(difficulty)}
        onChangeDifficulty={() => setPhase("landing")}
      />
    );
  }

  // ── Quiz Phase ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-[calc(100vh-72px)] bg-background">
      {/* Sticky progress bar */}
      <div className="sticky top-[72px] z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-2xl mx-auto px-5 py-3 flex items-center gap-3">
          <button
            onClick={() => setPhase("landing")}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-secondary"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-muted-foreground shrink-0">
            {currentIndex + 1}&thinsp;/&thinsp;{sessionQs.length}
          </span>
          <span className="text-sm font-semibold text-emerald-600 shrink-0">
            ✓&thinsp;{score}
          </span>
        </div>
      </div>

      {/* Question area */}
      <div className="max-w-2xl mx-auto px-5 py-10 space-y-6">
        {currentQ && (
          <>
            {/* Type + difficulty badge */}
            <div className="flex items-center gap-2 flex-wrap">
              <TypeBadge type={currentQ.type} />
              <span className="text-xs text-muted-foreground capitalize">
                {difficulty}
              </span>
            </div>

            {/* Question card — key forces remount on question change */}
            <div
              key={currentQ.id}
              className="rounded-3xl bg-card border border-border p-6 sm:p-8 shadow-sm"
            >
              <QuestionRenderer
                question={currentQ}
                onAnswer={handleAnswer}
                answered={answered}
                chosenOption={chosenOption}
              />
            </div>

            {/* Feedback & Auto-advance Bar */}
            {answered && (
              <FeedbackBox
                correct={lastCorrect}
                explanation={currentQ.explanation}
                onNext={handleNext}
                isLast={currentIndex + 1 >= sessionQs.length}
                timeLeft={timeLeft}
                isPaused={isPaused}
                onPauseToggle={() => setIsPaused((p) => !p)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ArabicQuiz;

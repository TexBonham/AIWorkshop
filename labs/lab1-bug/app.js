// Grade calculator logic. Loaded by index.html (the app) and tests.html (the tests).

function parseScores(text) {
  const parts = String(text).split(/[\s,;]+/);
  const scores = [];
  for (let i = 0; i <= parts.length - 1; i++) {
    const part = parts[i].trim();
    if (part === "") {
      continue;
    }
    const pieces = part.split("/");
    const earned = Number(pieces[0]);
    let possible = 100;
    if (pieces.length === 2) {
      possible = Number(pieces[1]);
    }
    if (!Number.isFinite(earned) || !Number.isFinite(possible) || possible <= 0 || pieces.length > 2) {
      continue;
    }
    scores.push({ earned: earned, possible: possible });
  }
  return scores;
}

function percent(score) {
  return (score.earned / score.possible) * 100;
}

function categoryAverage(scores, dropLowest) {
  if (scores.length === 0) {
    return null;
  }
  let used = scores;
  if (dropLowest && scores.length > 1) {
    let lowestIndex = 0;
    for (let i = 1; i < scores.length; i++) {
      if (percent(scores[i]) < percent(scores[lowestIndex])) {
        lowestIndex = i;
      }
    }
    used = scores.filter(function (score, index) {
      return index !== lowestIndex;
    });
  }
  let total = 0;
  for (const score of used) {
    total += percent(score);
  }
  return total / used.length;
}

function weightedTotal(categories) {
  let weightSum = 0;
  let pointSum = 0;
  for (const category of categories) {
    if (category.average === null) {
      continue;
    }
    weightSum += category.weight;
    pointSum += category.average * category.weight;
  }
  if (weightSum === 0) {
    return null;
  }
  return pointSum / weightSum;
}

function letterGrade(value) {
  if (value === null) {
    return "—";
  }
  if (value >= 89.5) {
    return "A";
  }
  if (value >= 79.5 && value < 89.5) {
    return "B";
  }
  if (value >= 69.5 && value < 79.5) {
    return "C";
  }
  if (value >= 59.5 && value < 69.5) {
    return "D";
  }
  return "F";
}

function formatPercent(value) {
  if (value === null) {
    return "—";
  }
  return (Math.round(value * 10) / 10).toFixed(1) + "%";
}

function summarize(inputs) {
  const categories = [];
  for (const input of inputs) {
    const scores = parseScores(input.scores);
    categories.push({
      name: input.name,
      weight: Number(input.weight) || 0,
      dropLowest: Boolean(input.dropLowest),
      scores: scores,
      average: categoryAverage(scores, Boolean(input.dropLowest))
    });
  }
  const total = weightedTotal(categories);
  return { categories: categories, total: total, letter: letterGrade(total) };
}

const App = {
  parseScores: parseScores,
  percent: percent,
  categoryAverage: categoryAverage,
  weightedTotal: weightedTotal,
  letterGrade: letterGrade,
  formatPercent: formatPercent,
  summarize: summarize
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = App;
}

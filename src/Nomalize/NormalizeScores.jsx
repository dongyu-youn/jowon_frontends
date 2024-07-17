// components/NormalizeScores.js
export const normalize = (value, min, max) => (value - min) / (max - min);

export const normalizeUserScores = (users) => {
  const minMaxValues = users.reduce(
    (acc, user) => {
      acc.minGrade = Math.min(acc.minGrade, user.score.grade);
      acc.maxGrade = Math.max(acc.maxGrade, user.score.grade);
      acc.minCommit = Math.min(acc.minCommit, user.score.github_commit_count);
      acc.maxCommit = Math.max(acc.maxCommit, user.score.github_commit_count);
      acc.minBaekjoon = Math.min(acc.minBaekjoon, user.score.baekjoon_score);
      acc.maxBaekjoon = Math.max(acc.maxBaekjoon, user.score.baekjoon_score);
      acc.minProgrammers = Math.min(
        acc.minProgrammers,
        user.score.programmers_score
      );
      acc.maxProgrammers = Math.max(
        acc.maxProgrammers,
        user.score.programmers_score
      );
      acc.minCertificate = Math.min(
        acc.minCertificate,
        user.score.certificate_count
      );
      acc.maxCertificate = Math.max(
        acc.maxCertificate,
        user.score.certificate_count
      );
      return acc;
    },
    {
      minGrade: Infinity,
      maxGrade: -Infinity,
      minCommit: Infinity,
      maxCommit: -Infinity,
      minBaekjoon: Infinity,
      maxBaekjoon: -Infinity,
      minProgrammers: Infinity,
      maxProgrammers: -Infinity,
      minCertificate: Infinity,
      maxCertificate: -Infinity,
    }
  );

  return users.map((user) => ({
    ...user,
    normalizedScore: {
      grade: normalize(
        user.score.grade,
        minMaxValues.minGrade,
        minMaxValues.maxGrade
      ),
      github_commit_count: normalize(
        user.score.github_commit_count,
        minMaxValues.minCommit,
        minMaxValues.maxCommit
      ),
      baekjoon_score: normalize(
        user.score.baekjoon_score,
        minMaxValues.minBaekjoon,
        minMaxValues.maxBaekjoon
      ),
      programmers_score: normalize(
        user.score.programmers_score,
        minMaxValues.minProgrammers,
        minMaxValues.maxProgrammers
      ),
      certificate_count: normalize(
        user.score.certificate_count,
        minMaxValues.minCertificate,
        minMaxValues.maxCertificate
      ),
    },
  }));
};

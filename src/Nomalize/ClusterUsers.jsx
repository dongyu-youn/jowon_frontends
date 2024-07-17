// components/ClusterUsers.js
import { kmeans } from "../utils/kmeas"; // K-means 알고리즘을 사용

export const clusterUsersIntoTeams = (normalizedUsers, numTeams) => {
  const vectors = normalizedUsers.map((user) => [
    user.normalizedScore.grade,
    user.normalizedScore.github_commit_count,
    user.normalizedScore.baekjoon_score,
    user.normalizedScore.programmers_score,
    user.normalizedScore.certificate_count,
  ]);

  return new Promise((resolve, reject) => {
    kmeans.clusterize(vectors, { k: numTeams }, (err, res) => {
      if (err) reject(err);
      else {
        const teams = res.map((cluster) =>
          cluster.clusterInd.map((index) => normalizedUsers[index])
        );
        resolve(teams);
      }
    });
  });
};

// utils/kmeans.js
export const kmeans = (data, k) => {
  const centroids = initializeCentroids(data, k);
  let assignments = new Array(data.length);
  let oldAssignments = new Array(data.length);

  while (!arraysEqual(assignments, oldAssignments)) {
    oldAssignments = [...assignments];
    for (let i = 0; i < data.length; i++) {
      assignments[i] = findClosestCentroid(data[i], centroids);
    }
    updateCentroids(data, assignments, centroids);
  }

  const clusters = Array.from({ length: k }, () => []);
  for (let i = 0; i < assignments.length; i++) {
    clusters[assignments[i]].push(data[i]);
  }
  return clusters;
};

const initializeCentroids = (data, k) => {
  const centroids = [];
  for (let i = 0; i < k; i++) {
    centroids.push([...data[Math.floor(Math.random() * data.length)]]);
  }
  return centroids;
};

const findClosestCentroid = (point, centroids) => {
  let minDist = Infinity;
  let closest = 0;
  for (let i = 0; i < centroids.length; i++) {
    const dist = euclideanDistance(point, centroids[i]);
    if (dist < minDist) {
      minDist = dist;
      closest = i;
    }
  }
  return closest;
};

const euclideanDistance = (point1, point2) => {
  return Math.sqrt(
    point1.reduce(
      (sum, value, index) => sum + Math.pow(value - point2[index], 2),
      0
    )
  );
};

const updateCentroids = (data, assignments, centroids) => {
  const sums = Array.from({ length: centroids.length }, () =>
    new Array(centroids[0].length).fill(0)
  );
  const counts = new Array(centroids.length).fill(0);

  for (let i = 0; i < data.length; i++) {
    const cluster = assignments[i];
    counts[cluster]++;
    for (let j = 0; j < data[i].length; j++) {
      sums[cluster][j] += data[i][j];
    }
  }

  for (let i = 0; i < centroids.length; i++) {
    for (let j = 0; j < centroids[i].length; j++) {
      centroids[i][j] = counts[i] === 0 ? 0 : sums[i][j] / counts[i];
    }
  }
};

const arraysEqual = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

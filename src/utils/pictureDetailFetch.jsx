import axiosInstance from "./axiosInstance";

// 대회 세부 정보를 가져오는 함수
export const fetchVideoDetails = async (id) => {
  try {
    const response = await axiosInstance.get(
      `http://127.0.0.1:8000/contests/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching video details:", error);
    throw error;
  }
};

// 사용자의 지원 상태를 확인하는 함수
export const checkUserApplyStatus = async (videoId) => {
  try {
    const response = await axiosInstance.get(
      "http://127.0.0.1:8000/users/me/apply/"
    );
    const isApply = response.data.some((fav) => fav.id === videoId);
    return isApply;
  } catch (error) {
    console.error("Error checking apply status:", error);
    throw error;
  }
};

// 선택된 항목 업데이트 함수
export const updateSelectedChoices = async (selectedChoices, contestId) => {
  try {
    await axiosInstance.put(
      "http://127.0.0.1:8000/users/update-selected-choices/",
      {
        selected_choices: selectedChoices,
        contest_id: contestId,
      }
    );
    console.log("Selected choices updated");
  } catch (error) {
    console.error("Error updating selected choices:", error);
    throw error;
  }
};

// 예측 요청을 보내는 함수
export const fetchPredictions = async (userData, selectedChoices) => {
  try {
    const newPredictions = [];
    for (const user of userData) {
      const studentData = {
        grade: user.score.grade,
        github_commit_count: user.score.github_commit_count,
        baekjoon_score: user.score.baekjoon_score,
        programmers_score: user.score.programmers_score,
        certificate_count: user.score.certificate_count,
        senior: user.score.senior,
        depart: user.score.depart,
        courses_taken: user.score.courses_taken,
        major_field: user.score.major_field,
        bootcamp_experience: user.score.bootcamp_experience,
        in_school_award_cnt: user.score.in_school_award_cnt,
        out_school_award_cnt: user.score.out_school_award_cnt,
        coding_test_score: user.score.coding_test_score,
        certificate_score: user.score.certificate_score,
        aptitude_test_score: selectedChoices
          .map(Number)
          .reduce((acc, val) => acc + val, 0),
      };

      const response = await axiosInstance.post(
        "http://127.0.0.1:8000/users/students/predict/",
        studentData
      );
      newPredictions.push({
        user_id: user.id,
        user_name: user.username,
        avatar: user.avatar,
        department: user.department,
        predictions: response.data,
      });
    }
    newPredictions.sort(
      (a, b) =>
        b.predictions["GCGF 혁신 아이디어 공모"] -
        a.predictions["GCGF 혁신 아이디어 공모"]
    );
    return newPredictions;
  } catch (error) {
    console.error("Error fetching predictions:", error);
    throw error;
  }
};

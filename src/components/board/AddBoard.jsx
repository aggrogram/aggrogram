// React 라이브러리
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

// 상태관리 컨텍스트
import { AggrogramContext } from "../../contexts/AggrogramContext.jsx";

// supabase
import { uploadPost } from "../../api/supabasePost.js";

// sweetalert2 라이브러리
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import BoardForm from "./BoardForm.jsx";

const AddBoard = () => {
  const { setPosts } = useContext(AggrogramContext);
  const navigate = useNavigate();

  // post 등록 함수
  const handleUploadPost = async (postObj) => {
    const { error: postUploadError } = await uploadPost(postObj);
    if (postUploadError) throw postUploadError;

    setPosts((prev) => [...prev, postObj]);

    Swal.fire({
      title: "등록이 완료되었습니다.",
      confirmButtonColor: "#fc913a",
      confirmButtonText: "확인"
    }).then(() => {
      navigate("/");
    });
  };

  return <BoardForm onSubmit={handleUploadPost} isEditMode={false} postId={null} />;
};

export default AddBoard;

import Swal from 'sweetalert2';

// 날짜를 인자로 받아 제목에 표시해주는 것이 더 좋습니다.
export const showTodoInput = async (date) => {
    const { value: text } = await Swal.fire({
        title: `${date}의 할 일 추가`,
        input: "textarea",
        inputPlaceholder: "할 일을 입력하세요...",
        inputAttributes: {
            "aria-label": "Type your message here"
        },
        showCancelButton: true,
        confirmButtonText: '추가'
    });

  //(취소 시 undefined 반환)
    return text;
};
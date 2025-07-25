import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { FaRegCircle, FaRegCheckCircle, FaPlusCircle } from 'react-icons/fa';

// 모달 스타일링
const customModalStyles = {
    overlay: { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        background: '#2c2c2e',
        border: 'none',
        borderRadius: '15px',
        padding: '25px',
        color: 'white',
    },
};

// 모달 내부 요소 스타일
const ModalHeader = styled.h2`
    margin-top: 0;
    margin-bottom: 20px;
`;
const TodoList = styled.ul`
    list-style: none;
    padding: 0;
`;
const TodoItem = styled.li`
    display: flex;
    align-items: center;
    padding: 10px 5px;
    font-size: 16px;
    cursor: pointer;
    border-bottom: 1px solid #444;

    span {
        flex-grow: 1;
        margin-left: 15px;
        text-decoration: ${props => props.completed ? 'line-through' : 'none'};
        color: ${props => props.completed ? '#888' : 'white'};
    }
`;
const AddTodoButton = styled.button`
    display: flex;
    align-items: center;
    width: 100%;
    background: #3a3a3c;
    border: none;
    border-radius: 8px;
    color: white;
    padding: 15px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;

    span {
        margin-left: 10px;
    }
`;

// Modal의 root 엘리먼트 설정 (웹 접근성)
Modal.setAppElement('#root');

function TodoModal({ isOpen, onRequestClose, date, todosForDate, onAddTodo, onToggleTodo, onEditTodo }) {
    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customModalStyles}
        contentLabel="Todo List Modal"
    >
    <ModalHeader>{date.format('YYYY년 M월 D일')}</ModalHeader>
        <TodoList>
            {todosForDate.map(todo => (
                <TodoItem key={todo.id} completed={todo.completed}>
                {/* 체크박스 아이콘 */}
                <div onClick={() => onToggleTodo(date, todo.id)}>
                    {todo.completed ? <FaRegCheckCircle color="limegreen" size={22} /> : <FaRegCircle size={22} />}
                </div>
                {/* 할 일 텍스트 (클릭 시 수정) */}
                <span onClick={() => onEditTodo(date, todo.id, todo.text)}>{todo.text}</span>
            </TodoItem>
            ))}
        </TodoList>
        <AddTodoButton onClick={() => onAddTodo(date)}>
            <FaPlusCircle />
            <span>할 일을 추가하세요</span>
        </AddTodoButton>
    </Modal>
    );
}

export default TodoModal;
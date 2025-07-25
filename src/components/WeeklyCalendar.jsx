import React, { useState, useEffect, useMemo } from 'react'; // useEffect 추가
import styled from 'styled-components';
import dayjs from 'dayjs';
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from 'react-icons/fa';
import Swal from 'sweetalert2';

import { showTodoInput } from '../hooks/inputToDOList';
import TodoModal from './TodoModal';


// --- Styled Components (이전과 동일) ---
const CalendarContainer = styled.div`
  padding: 20px;  
  font-family: sans-serif;
  width: 100%;
  max-width: 900px;
  margin: auto;
`;
const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #fff; // 글자색 추가
`;
const NavButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #ccc; // 아이콘 색상 변경
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 15px;

  &:hover {
    color: #fff; // 호버 시 색상 변경
  }
`;
const WeekContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const DayCard = styled.div`
  width: 13%;
  min-height: 150px;
  border: 2px solid ${props => props.isToday ? '#87CEFA' : '#555'}; // 색상 변경
  background-color: #3a3a3c; // 배경색 추가
  color: #fff; // 글자색 추가
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  transition: box-shadow 0.2s;
  &:hover { box-shadow: 0 4px 8px rgba(0,0,0,0.4); }
`;
const DateNumber = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`;
const DayCardTodoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 11px;
  text-align: center;
`;
const DayCardTodoItem = styled.li`
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;


// --- React Component (localStorage 연동) ---

function WeeklyCalendar() {
  //현재 날짜 저장
  const [currentDate, setCurrentDate] = useState(dayjs());
  // TO-DO 리스트 저장(localStorage 이용)
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : {};
  });

  //  모달 제어를 위한 상태 추가
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // todos 상태 실시간 반영
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]); 

  //currentDate 바뀔때만 week 배열 계산
  const weekDays = useMemo(() => {
    const startOfWeek = currentDate.startOf('week');
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(startOfWeek.add(i, 'day'));
    }
    return week;
  }, [currentDate]);

  // 이전 주 버튼 클릭
  const handlePrevWeek = () => {
    setCurrentDate(currentDate.subtract(7, 'day'));
  };
  // 다음 주 버튼 클릭
  const handleNextWeek = () => {
    setCurrentDate(currentDate.add(7, 'day'));
  };

  //날짜 클릭 시 모달을 여는 함수
  const handleDateClick = (day) => {
    setSelectedDate(day);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedDate(null);
  };

  //날짜 카드 클릭(TO-DO 리스트 추가)
  // ✅ 할 일 추가 함수 (SweetAlert2 사용)
  const handleAddTodo = async (day) => {
    const dateKey = day.format('YYYY-MM-DD');
    const { value: text } = await Swal.fire({
      title: `${dateKey}의 할 일 추가`,
      input: 'text',
      inputPlaceholder: '할 일을 입력하세요...',
      showCancelButton: true,
      confirmButtonText: '추가',
    });

    if (text) {
      const newTodo = {
        id: Date.now(), // 고유 ID로 현재 시간 사용
        text: text,
        completed: false,
      };
      const existingTodos = todos[dateKey] || [];
      setTodos({
        ...todos,
        [dateKey]: [...existingTodos, newTodo],
      });
    }
  };
  //  할 일 완료/미완료 토글 함수
  const handleToggleTodo = (day, todoId) => {
    const dateKey = day.format('YYYY-MM-DD');
    const updatedTodos = todos[dateKey].map(todo =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos({
      ...todos,
      [dateKey]: updatedTodos,
    });
  };

  //  할 일 수정 함수
  const handleEditTodo = async (day, todoId, currentText) => {
    const dateKey = day.format('YYYY-MM-DD');
    const { value: newText } = await Swal.fire({
      title: '할 일 수정',
      input: 'text',
      inputValue: currentText,
      showCancelButton: true,
      confirmButtonText: '수정',
    });

    if (newText && newText !== currentText) {
      const updatedTodos = todos[dateKey].map(todo =>
        todo.id === todoId ? { ...todo, text: newText } : todo
      );
      setTodos({
        ...todos,
        [dateKey]: updatedTodos,
      });
    }
  };

  return (
    <CalendarContainer>
      <Header>
        <NavButton onClick={handlePrevWeek}>
          <FaArrowAltCircleUp/>
        </NavButton>
        <h2>{currentDate.format('YYYY년 M월')}</h2>
        <NavButton onClick={handleNextWeek}>
          <FaArrowAltCircleDown/>
        </NavButton>
      </Header>

      <WeekContainer>
        {weekDays.map((day, index) => {
          const dateKey = day.format('YYYY-MM-DD');
          const dayTodos = todos[dateKey] || [];
          const isToday = day.isSame(dayjs(), 'day');

          return (
            <DayCard key={index} isToday={isToday} onClick={() => handleDateClick(day)}>
              <DateNumber>{day.date()}</DateNumber>
              {/* ✅ 2. To-Do 내용(text)을 직접 표시하도록 변경 */}
              <DayCardTodoList>
                {dayTodos.slice(0, 3).map(todo => (
                  <DayCardTodoItem key={todo.id}>{todo.text}</DayCardTodoItem>
                ))}
              </DayCardTodoList>
            </DayCard>
          );
        })}
      </WeekContainer>
      {/* 모달 렌더링 (selectedDate가 있을 때만) */}
      {selectedDate && (
        <TodoModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          date={selectedDate}
          todosForDate={todos[selectedDate.format('YYYY-MM-DD')] || []}
          onAddTodo={handleAddTodo}
          onToggleTodo={handleToggleTodo}
          onEditTodo={handleEditTodo}
        />
      )}
    </CalendarContainer>
  );
}

export default WeeklyCalendar;
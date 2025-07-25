import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css'; // 시계 기본 CSS

const ClockContainer = styled.div`
    margin-bottom: 40px; /* 캘린더와의 간격 */

  /* 시계판 스타일 커스터마이징 */
    .react-clock__face {
        border-color: white;
    }
    .react-clock__hand__body {
        background-color: white;
    }
    .react-clock__second-hand__body {
        background-color: red; /* 초침 색상 변경 */
    }
`;

function AnalogClock() {
    const [value, setValue] = useState(new Date());

    useEffect(() => {
    // 1초마다 시간을 업데이트하여 시계가 움직이도록 함
        const interval = setInterval(() => setValue(new Date()), 1000);

    // 컴포넌트가 언마운트될 때 인터벌 정리
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <ClockContainer>
            <Clock value={value} size={250} />
        </ClockContainer>
    );
}

export default AnalogClock;
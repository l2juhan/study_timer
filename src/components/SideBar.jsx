import React from 'react';
import styled from 'styled-components';

// 사이드바 전체를 감싸는 컨테이너
const SidebarContainer = styled.div`
    position: fixed; /* 화면에 고정 */
    top: 20px; /* 화면 상단에서 20px 아래에 위치 */
    left: 20px; /* 화면 왼쪽에서 20px 오른쪽에 위치 */
    width: 160px;
    height: auto; /* 높이를 내용물에 맞게 자동 조절 */
    background-color: #FFF;
    padding: 10px 0; /* 상하 패딩 조정 */

  /* --- 아래 속성들이 주요 변경점입니다 --- */
    border-radius: 12px; /* 모서리를 둥글게 */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* 그림자 효과 */
    border-right: none; /* 오른쪽 경계선 제거 */
`;

// MenuList와 MenuItem은 이전과 동일합니다.
const MenuList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const MenuItem = styled.li`
    padding: 12px 25px;
    font-size: 14px;
    font-weight: 600;
    color: #495057;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

    &:hover {
        background-color: #e9ecef;
        color: #212529;
    }
`;

function Sidebar() {
    const menuItems = ['HOME', 'TODO LIST', 'STOPWATCH', 'TIMER','PORMODORO'];

    return (
        <SidebarContainer>
            <MenuList>
                {menuItems.map((item, index) => (
            <MenuItem key={index}>{item}</MenuItem>
            ))}
        </MenuList>
    </SidebarContainer>
);
}

export default Sidebar;
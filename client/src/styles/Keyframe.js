import styled, { keyframes } from 'styled-components';

export const fade_move_down = keyframes`
 0% {
-webkit-transform:translate(0, -10px);
opacity: 0;
}
 50% {
opacity: 1;
}
 100% {
-webkit-transform:translate(0, 10px);
opacity: 0;
}
`;

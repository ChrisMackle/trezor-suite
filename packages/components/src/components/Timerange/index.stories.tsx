import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Timerange, timerangeGlobalStyles } from './index';
import { storiesOf } from '@storybook/react';
import { select, number, text } from '@storybook/addon-knobs';
import { infoOptions } from '../../support/storybook';

const GlobalStyle = createGlobalStyle`
    ${timerangeGlobalStyles}
`;

const Center = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 100px 0px;
    background: #eee;
`;

Center.displayName = 'CenterWrapper';

storiesOf('Timerange', module).add(
    'Timerange',
    () => {
        const placement: any = select(
            'Placement',
            {
                Top: 'top',
                Bottom: 'bottom',
                Left: 'left',
                Right: 'right',
            },
            'bottom'
        );

        return (
            <Center>
                <GlobalStyle />
                <Timerange />
            </Center>
        );
    },
    {
        info: {
            ...infoOptions,
            text: `
        ~~~js
        import { Timerange } from 'trezor-ui-components';
        ~~~
        *<Timerange> is based on [react-datepicker](https://github.com/Hacker0x01/react-datepicker/) component.*
        `,
        },
    }
);

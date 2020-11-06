import React from 'react';
import styled from 'styled-components';
import { Timerange } from './index';
import { storiesOf } from '@storybook/react';

const TooltipWrapper = styled.div`
    width: 400px;
    height: 200px;
    text-align: center;
    padding: 5rem 0px;
    margin: 5px;
`;

storiesOf('Tooltip', module).add(
    'All',
    () => {
        return (
            <>
                <Timerange data-test="tooltip-timerange" />
            </>
        );
    },
    {
        options: {
            showPanel: false,
        },
    }
);

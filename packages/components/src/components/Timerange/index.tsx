import React, { useState, useRef, useLayoutEffect } from 'react';
import styled, { css } from 'styled-components';
import DatePicker from 'react-datepicker';
import colors from '../../config/colors';
import { style as timerangeGlobalStyles } from './index.style';
import { FONT_SIZE, FONT_WEIGHT } from '../../config/variables';

const StyledTimerange = styled.div`
    width: 340px;
    display: flex;
    flex-direction: column;
    background: ${colors.NEUE_BG_WHITE};
    border-radius: 4px;
`;
const Separator = styled.div`
    width: 50px;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
`;
const Inputs = styled.div`
    display: flex;
    width: 340px;
    padding: 10px;
    border-bottom: 1px solid ${colors.NEUE_STROKE_GREY};

    & .react-datepicker-popper {
        display: none;
    }
`;
const Input = styled.div`
    width: 150px;
`;
const Calendar = styled.div`
    width: 340px;
    padding: 10px;
`;

type Props = {};

const Timerange = ({ ...rest }: Props) => {
    const today = new Date();
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates: any) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };
    return (
        <StyledTimerange>
            <Inputs>
                <Input>
                    <DatePicker
                        selected={startDate}
                        onChange={(date: any) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                    />
                </Input>
                <Separator>-</Separator>
                <Input>
                    <DatePicker
                        selected={endDate}
                        onChange={(date: any) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                    />
                </Input>
            </Inputs>
            <Calendar>
                <DatePicker
                    selected={startDate}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                    maxDate={today}
                />
            </Calendar>
        </StyledTimerange>
    );
};

export { Timerange, Props as TimerangeProps, timerangeGlobalStyles };

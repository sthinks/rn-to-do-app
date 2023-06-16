import React from 'react';
import { View, Text } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

const ProgressBar = ({ progress }) => {
    const radius = 50; // Daire yarıçapı
    const strokeWidth = 10; // İlerleme çubuğu kalınlığı
    const circumference = 2 * Math.PI * radius; // Dairenin çevresi

    const progressValue = progress * circumference; // İlerlemenin uzunluğu

    return (
        <View>
            <Svg width={radius * 2} height={radius * 2}>
                <Circle
                    cx={radius}
                    cy={radius}
                    r={radius - strokeWidth / 2}
                    fill="transparent"
                    stroke="#E7F4FF" // İlerleme çubuğu rengi
                    strokeWidth={strokeWidth}
                />
                <Circle
                    cx={radius}
                    cy={radius}
                    r={radius - strokeWidth / 2}
                    fill="transparent"
                    stroke="#008FFF" // Arka plan rengi (siyah)
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - progressValue}
                />
            </Svg>
            <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{`${Math.round(progress * 100)}%`}</Text>
            </View>
        </View>
    );
};

export default ProgressBar;

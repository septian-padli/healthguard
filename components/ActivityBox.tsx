import { HugeiconsIcon } from '@hugeicons/react-native';
import React from 'react';
import { Text, View } from 'react-native';

interface ActivityBoxProps {
    icon: any;
    iconSize?: number;
    iconColor?: string;
    title: string;
    value: string;
    layout: string;
    style: any;
    bg: string;
}

const ActivityBox: React.FC<ActivityBoxProps> = ({
    icon,
    iconSize = 32,
    iconColor = 'white',
    title,
    layout = 'row',
    value,
    style,
    bg
}) => {
    return (
        <View className={`${bg} p-2 rounded-xl flex gap-2 ${layout === 'row' ? 'flex-row' : 'flex-col'}`}>
            <View style={style}>
                <HugeiconsIcon strokeWidth={2} icon={icon} className={iconColor ? `text-${iconColor}` : 'text-white'} size={iconSize} />
            </View>
            <View className="flex flex-col">
                <Text className="font-jakartaMedium leading-tight mb-1 text-gray-900">{title}</Text>
                <Text className="font-jakartaSemiBold leading-tight text-gray-500 text-sm">{value}</Text>
            </View>
        </View>
    );
};

export default ActivityBox;
